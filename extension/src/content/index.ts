// Content script for merchant detection and popup injection

import { isLoggedIn } from './auth';
import { createAuthForm } from './auth-form';
import { authService } from '../services/auth';
import { auth } from '../utils/firebase';
import { signOut, onAuthStateChanged, sendEmailVerification } from 'firebase/auth';

console.log('Kindly: Content script loaded');

const MERCHANTS_URL = 'https://kindly-merchant-data.s3.us-east-2.amazonaws.com/merchants.json';
const KINDLY_AFFILIATE_ID = 'kindly123';

interface Merchant {
  domain: string;
  merchant: string;
  network: string;
  affiliateLink: string;
  commissionType: string;
  commissionValue: string;
}

let merchantsData: Merchant[] = [];

// Calculate donation amount (half of commission value)
const getDonationPercentage = (merchant: Merchant): string => {
  if (merchant.commissionType === 'fixed') {
    // For fixed commission, extract the number from the string (e.g. "$100.00" -> 100.00)
    const commissionNum = parseFloat(merchant.commissionValue.replace(/[^0-9.]/g, ''));
    // Calculate half and format with dollar sign
    const donationNum = (commissionNum / 2).toFixed(2);
    return `$${donationNum}`;
  } else {
    // For percentage commission
    const commissionNum = parseFloat(merchant.commissionValue.replace('%', ''));
    // Calculate half and format to at most 2 decimal places
    const donationNum = (commissionNum / 2).toFixed(2);
    return `${donationNum}%`;
  }
};

// Fetch merchants data
const fetchMerchants = async () => {
  console.log('Kindly DEBUG: Starting fetchMerchants');
  try {
    // Use the background script to fetch the data
    console.log('Kindly DEBUG: Sending FETCH_MERCHANTS message to background');
    const data = await new Promise((resolve, reject) => {
      chrome.runtime.sendMessage({ type: 'FETCH_MERCHANTS' }, response => {
        if (chrome.runtime.lastError) {
          console.error('Kindly DEBUG: Runtime error:', chrome.runtime.lastError);
          reject(chrome.runtime.lastError);
          return;
        }
        if (response && response.error) {
          console.error('Kindly DEBUG: Fetch error:', response.error);
          reject(new Error(response.error));
          return;
        }
        resolve(response);
      });
    });

    if (!data || !Array.isArray(data)) {
      console.error('Kindly DEBUG: Invalid data format:', data);
      return false;
    }
    
    merchantsData = data;
    console.log('Kindly DEBUG: Merchant data loaded:', {
      count: merchantsData.length,
      sample: merchantsData.slice(0, 3)
    });
    return true;
  } catch (error) {
    console.error('Kindly DEBUG: Error in fetchMerchants:', error);
    console.error('Kindly DEBUG: Error stack:', error.stack);
    return false;
  }
};

// Check if we're on a supported merchant site and return the merchant data
const isSupportedMerchant = () => {
  console.log('Kindly DEBUG: Starting isSupportedMerchant check');
  const currentDomain = window.location.hostname.replace('www.', '');
  console.log('Kindly DEBUG: Current domain after www removal:', currentDomain);
  console.log('Kindly DEBUG: Original hostname:', window.location.hostname);
  console.log('Kindly DEBUG: Full URL:', window.location.href);
  console.log('Kindly DEBUG: Number of merchants to check:', merchantsData.length);
  
  if (!merchantsData.length) {
    console.error('Kindly DEBUG: No merchant data available!');
    return null;
  }
  
  console.log('Kindly DEBUG: First few merchants:', merchantsData.slice(0, 3));
  
  const merchant = merchantsData.find(m => {
    if (!m.domain) {
      console.error('Kindly DEBUG: Merchant missing domain:', m);
      return false;
    }
    const matches = currentDomain.includes(m.domain);
    // Only log when there's a match
    if (matches) {
      console.log('Kindly DEBUG: Found matching merchant:', {
        merchantDomain: m.domain,
        currentDomain
      });
    }
    return matches;
  });
  
  console.log('Kindly DEBUG: Merchant match result:', merchant);
  return merchant || null;
};

// Get current affiliate tag from URL only
const getCurrentAffiliateTag = () => {
  console.log('Kindly: Checking for affiliate tag in URL...');

  // Only check URL parameters
  const urlParams = new URLSearchParams(window.location.search);
  const tagFromUrl = urlParams.get('tag');
  
  if (tagFromUrl) {
    if (tagFromUrl !== KINDLY_AFFILIATE_ID) {
      console.log('Kindly: Found affiliate in URL:', tagFromUrl);
      return tagFromUrl;
    } else {
      console.log('Kindly: Found Kindly affiliate in URL');
    }
  } else {
    console.log('Kindly: No affiliate tag in URL');
  }

  return null;
};

// Check if Kindly's affiliate is active
const isKindlyActive = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const tagFromUrl = urlParams.get('tag');
  
  if (tagFromUrl === KINDLY_AFFILIATE_ID) {
    console.log('Kindly: Found Kindly affiliate in URL');
    return true;
  }

  console.log('Kindly: Kindly affiliate not active');
  return false;
};

// Storage keys for tracking popup state
const ACTIVATION_STORAGE_KEY = 'kindly_domain_activations';
const MANUAL_CLOSE_KEY = 'kindly_manual_closes';

const getDomainActivations = async (): Promise<Record<string, number>> => {
  return new Promise((resolve) => {
    chrome.storage.local.get([ACTIVATION_STORAGE_KEY], (result) => {
      resolve(result[ACTIVATION_STORAGE_KEY] || {});
    });
  });
};

const getManualCloses = async (): Promise<Record<string, number>> => {
  return new Promise((resolve) => {
    chrome.storage.local.get([MANUAL_CLOSE_KEY], (result) => {
      resolve(result[MANUAL_CLOSE_KEY] || {});
    });
  });
};

const setDomainActivation = async (domain: string) => {
  const activations = await getDomainActivations();
  activations[domain] = Date.now();
  chrome.storage.local.set({ [ACTIVATION_STORAGE_KEY]: activations });
};

const setManualClose = async (domain: string) => {
  const closes = await getManualCloses();
  closes[domain] = Date.now();
  chrome.storage.local.set({ [MANUAL_CLOSE_KEY]: closes });
};

const shouldShowPopup = async (domain: string): Promise<boolean> => {
  // Don't show on non-merchant sites
  if (!isSupportedMerchant()) return false;

  const [activations, manualCloses] = await Promise.all([
    getDomainActivations(),
    getManualCloses()
  ]);

  const lastActivation = activations[domain];
  const lastClose = manualCloses[domain];
  const now = Date.now();
  const HOURS_24 = 24 * 60 * 60 * 1000;

  // If there's an active donation, don't show popup
  if (lastActivation && (now - lastActivation) < HOURS_24) {
    return false;
  }

  // If manually closed within 24 hours, don't show popup
  if (lastClose && (now - lastClose) < HOURS_24) {
    return false;
  }

  // Show popup in all other cases
  return true;
};

const showProcessingState = () => {
  // Remove the original popup
  document.getElementById('kindly-popup')?.remove();
  const popup = document.createElement('div');
  popup.id = 'kindly-processing-popup';
  popup.className = 'kindly-popup';

  popup.innerHTML = `
    ${createKindlyHeader()}
    <div class="kindly-content">
      <div style="text-align: center;">
        <div style="display: flex; justify-content: center; margin-bottom: 16px;">
          <div style="width: 45px; height: 45px; display: flex; align-items: center; justify-content: center;">
            <svg class="kindly-spinner" viewBox="0 0 50 50" style="width: 45px; height: 45px;">
              <circle cx="25" cy="25" r="20" fill="none" stroke="#e11d48" stroke-width="5" stroke-linecap="round" />
            </svg>
          </div>
        </div>
        <h2 class="kindly-headline" style="margin-bottom: 5px;">
          Processing...
        </h2>
        <p style="color: #222 !important; font-family: Inter, sans-serif !important; font-size: 15px !important; text-align: center; line-height: 1.5em !important; margin-bottom: 24px !important;">
          Please wait while we activate your donation
        </p>
      </div>
    </div>
  `;

  // Add the spinner animation styles
  const style = document.createElement('style');
  style.textContent = `
    @keyframes kindly-spinner {
      0% { stroke-dasharray: 1, 150; stroke-dashoffset: 0; }
      50% { stroke-dasharray: 90, 150; stroke-dashoffset: -35; }
      100% { stroke-dasharray: 90, 150; stroke-dashoffset: -124; }
    }
    .kindly-spinner circle {
      animation: kindly-spinner 1.4s ease-in-out infinite;
      transform-origin: center;
    }
  `;
  document.head.appendChild(style);

  document.body.appendChild(popup);

  // Add event listener for close button
  document.getElementById('kindly-close-processing')?.addEventListener('click', () => {
    popup.remove();
    style.remove();
  });

  return popup;
};

// Show success state popup
export const showSuccessState = async (merchant: Merchant) => {
  // Check if success popup was already shown and closed
  const stored = await chrome.storage.local.get([`success_popup_closed_${window.location.hostname}`]);
  if (stored[`success_popup_closed_${window.location.hostname}`]) {
    console.log('Kindly DEBUG: Success popup already shown and closed for this domain');
    return;
  }
  // Record domain activation
  setDomainActivation(window.location.hostname);
  // Remove any existing popups
  document.getElementById('kindly-popup')?.remove();
  document.getElementById('kindly-processing-popup')?.remove();

  const popup = document.createElement('div');
  popup.id = 'kindly-success-popup';
  popup.className = 'kindly-popup';

  popup.innerHTML = `
    <div class="kindly-header">
      <div class="kindly-logo">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="white" stroke="currentColor" stroke-width="2">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
        </svg>
        <span>KINDLY</span>
      </div>
      <button id="kindly-close" class="kindly-close-button">×</button>
    </div>
    <!-- Content -->
    <div class="kindly-content">
      <div style="text-align: center;">
        <div style="display: flex; justify-content: center; margin-bottom: 16px;">
          <div style="background: #6EB352; width: 45px; height: 45px; border-radius: 28px; display: flex; align-items: center; justify-content: center;">
            <svg width="25" height="25" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 6L9 17L4 12" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
        </div>
        <h2 class="kindly-headline" style="margin-bottom: 5px;">
          Donation Activated!
        </h2>
        <p style="color: #222 !important; font-family: Inter, sans-serif !important; font-size: 15px !important; text-align: center; line-height: 1.5em !important; margin-bottom: 24px !important;">
          Purchases will now generate up to a ${getDonationPercentage(merchant)} donation to Susan G Komen
        </p>
      </div>
    </div>
  `;

  document.body.appendChild(popup);

  // Add event listener for close button
  document.getElementById('kindly-close')?.addEventListener('click', async () => {
    // Track that success popup was closed for this domain
    await chrome.storage.local.set({
      [`success_popup_closed_${window.location.hostname}`]: Date.now()
    });
    popup.remove();
  });

  // Add logout event listener
  document.getElementById('kindly-logout')?.addEventListener('click', async () => {
    try {
      await signOut(auth);
      window.location.reload();
    } catch (error) {
      console.error('Kindly: Error during logout:', error);
    }
  });

  // Add resend verification email listener
  document.getElementById('resend-verification')?.addEventListener('click', async () => {
    try {
      if (auth.currentUser) {
        await sendEmailVerification(auth.currentUser);
      }
      const button = document.getElementById('resend-verification');
      if (button) {
        button.textContent = 'Verification email sent!';
        button.className = 'kindly-button text-green-600 p-0 cursor-default';
        button.disabled = true;
      }
    } catch (error) {
      console.error('Kindly: Error sending verification email:', error);
    }
  });
};

// Create and inject the affiliate choice dialog
const createAffiliateChoiceDialog = (affiliateTag: string) => {
  const dialog = document.createElement('div');
  dialog.id = 'kindly-affiliate-dialog';
  dialog.className = 'kindly-popup kindly-dialog';

  dialog.innerHTML = `
    <div class="text-center">
      <div class="mb-4">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="mx-auto text-rose-500">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
        </svg>
      </div>
      <h3 class="text-lg font-semibold text-gray-900 mb-2">We've detected another affiliate</h3>
      <p class="text-gray-600 mb-5">
        We've detected another affiliate connected to your purchase (${affiliateTag}). This might support a website or creator you recently visited.
      </p>
      <div class="flex gap-3 justify-center mb-4">
        <button id="kindly-support-creator" class="kindly-button">Support Creator</button>
        <button id="kindly-support-charity" class="kindly-button kindly-button-primary">Donate to Charity</button>
      </div>
      <p class="text-xs text-gray-500 leading-relaxed mt-4 p-3 bg-gray-50 rounded-md">
        If you choose to donate to charity, the affiliate commission from your purchase will be received by Kindly and donated to your selected cause.
      </p>
    </div>
  `;

  // Add overlay
  const overlay = document.createElement('div');
  overlay.className = 'kindly-overlay';

  document.body.appendChild(overlay);
  document.body.appendChild(dialog);

  // Handle button clicks
  document.getElementById('kindly-support-creator')?.addEventListener('click', () => {
    overlay.remove();
    dialog.remove();
    showSuccessState();
    chrome.storage.local.set({ donationActive: true });
  });

  document.getElementById('kindly-support-charity')?.addEventListener('click', () => {
    overlay.remove();
    dialog.remove();
    // Apply Kindly's affiliate tag
    const newUrl = new URL(window.location.href);
    newUrl.searchParams.set('tag', KINDLY_AFFILIATE_ID);
    chrome.storage.local.set({ donationActive: true });
    window.location.href = newUrl.toString();
  });
};

// Create a consistent header for all popups
const createKindlyHeader = (includeClose = true) => `
  <div class="kindly-header">
    <div class="kindly-logo">
      <svg width="15" height="15" viewBox="0 0 24 24" fill="white" stroke="currentColor" stroke-width="2">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
      </svg>
      <span>KINDLY</span>
    </div>
    ${includeClose ? '<button id="kindly-suppress-close" class="kindly-close-button" style="background: none; border: none; color: white; font-size: 24px; cursor: pointer; padding: 0 8px;">×</button>' : ''}
  </div>
`;

// Show suppression dialog
const showSuppressionDialog = async () => {
  const dialog = document.createElement('div');
  dialog.id = 'kindly-suppression-dialog';
  dialog.className = 'kindly-popup';
  dialog.style.maxWidth = '400px';

  // Add styles for hover effect
  const style = document.createElement('style');
  style.textContent = `
    .kindly-suppress-button {
      cursor: pointer;
      transition: all 0.2s;
      font-size: 15px !important;
      width: 100% !important;
      border-radius: 8px !important;
      background: #fff !important;
      color: rgb(225, 29, 72) !important;
      border: 1px solid rgb(225, 29, 72) !important;
      margin-bottom: 1px !important;
      padding: 14px !important;
    }
    .kindly-suppress-button:hover {
      background: rgb(225, 29, 72) !important;
      color: white !important;
      font-weight: bold !important;
    }
  `;
  document.head.appendChild(style);

  dialog.innerHTML = `
    ${createKindlyHeader(true)}
    <div class="kindly-content" style="padding: 24px;">
      <h2 class="kindly-headline" style="text-align: center; margin-top: 20px !important; margin-bottom: 24px !important;">
        Suppress donation reminders for this site:
      </h2>
      <div style="display: flex; flex-direction: column; gap: 12px;">
        <button id="suppress-today" class="kindly-suppress-button">
          Today
        </button>
        <button id="suppress-month" class="kindly-suppress-button">
          This month
        </button>
        <button id="suppress-always" class="kindly-suppress-button">
          Always
        </button>
      </div>
    </div>
  `;

  document.body.appendChild(dialog);



  // Handle suppression choices
  const domain = window.location.hostname;
  const now = Date.now();

  document.getElementById('suppress-today')?.addEventListener('click', async () => {
    await chrome.storage.local.set({
      [`suppressed_${domain}`]: now + (24 * 60 * 60 * 1000) // 24 hours
    });
    dialog.remove();
  });

  document.getElementById('suppress-month')?.addEventListener('click', async () => {
    const endOfMonth = new Date();
    endOfMonth.setMonth(endOfMonth.getMonth() + 1);
    endOfMonth.setDate(0); // Last day of current month
    endOfMonth.setHours(23, 59, 59, 999);
    
    await chrome.storage.local.set({
      [`suppressed_${domain}`]: endOfMonth.getTime()
    });
    dialog.remove();
  });

  document.getElementById('suppress-always')?.addEventListener('click', async () => {
    await chrome.storage.local.set({
      [`suppressed_${domain}`]: 'forever'
    });
    dialog.remove();
  });

  // Add close button handler
  document.getElementById('kindly-suppress-close')?.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    dialog.remove();
  });

  // Click outside to cancel
  dialog.addEventListener('click', (e) => {
    if (e.target === dialog) {
      dialog.remove();
    }
  });
};

// Create and inject the popup
export const createDonationPopup = async () => {

  // Check if user is logged in
  const loggedIn = await isLoggedIn();
  console.log('Kindly: User login status:', loggedIn);
  // Find the current merchant
  const currentDomain = window.location.hostname.replace('www.', '');
  const currentMerchant = merchantsData.find(m => currentDomain.includes(m.domain));
  
  if (!currentMerchant) {
    console.error('Kindly: Could not find merchant data for popup');
    return;
  }
  console.log('Kindly: Creating popup');
  // Remove existing popup if any
  const existingPopup = document.getElementById('kindly-popup');
  if (existingPopup) {
    existingPopup.remove();
  }

  // Create container for the popup
  const container = document.createElement('div');
  container.id = 'kindly-popup';
  container.className = 'kindly-popup';

  // Add popup content
  container.innerHTML = `
    <div class="kindly-header">
      <div class="kindly-logo">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="white" stroke="currentColor" stroke-width="2">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
        </svg>
        <span>KINDLY</span>
      </div>
      <button id="kindly-close" class="kindly-close-button">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M18 6L6 18M6 6l12 12" />
        </svg>
      </button>
    </div>
    <div class="kindly-content">
      <div style="text-align: center; margin: 0;">
        ${loggedIn ? `
          <div style="display: flex; justify-content: center; margin-bottom: 10px;">
            <img 
              src="https://joinkindly.org/images/causes/susan-g-komen-logo.png"
              alt="Susan G Komen"
              style="width: 75px; height: 75px; object-fit: contain; border-radius: 8px; background: white;"
            />
          </div>
          <h2 class="kindly-headline" style="margin-bottom: 5px;">
            We'll donate ${getDonationPercentage(currentMerchant)} of this purchase to Susan G Komen
          </h2>
          <p style="color: #222 !important; font-family: Inter, sans-serif !important; font-size: 15px !important; text-align: center !important; margin: 0 0 10px 0 !important;">
            For Breast Cancer Research
          </p>
        </div>
        <button id="kindly-activate" class="kindly-button kindly-button-primary" style="margin-top: 15px !important; border-radius: 20px !important; height: 45px;">
          Activate Donation
        </button>
        <div style="display: flex; flex-direction: column; align-items: center; gap: 16px; margin-top: 0;">
          <a href="https://kindly.ai/causes" target="_blank" style="font-family: Inter, sans-serif; font-size: 15px; letter-spacing: 0; text-align: center; color: #e11d48; text-decoration: none;">
            Change Cause
          </a>
          <a href="#" id="kindly-logout" class="kindly-text-link">
            Logout
          </a>
        </div>
      ` : createAuthForm().html}

    </div>
  `;

  // Add to page
  document.body.appendChild(container);

  // Add event listeners
  document.getElementById('kindly-close')?.addEventListener('click', (e) => {
    e.preventDefault();
    showSuppressionDialog();
    container.remove();
    // Store that user has closed the popup
    chrome.storage.local.set({ popupClosed: Date.now() });
  });

  // Add logout handler
  document.getElementById('kindly-logout')?.addEventListener('click', async (e) => {
    e.preventDefault();
    try {
      // Logout from Supabase
      await signOut(auth);
      // Send message to background script to clear state
      await chrome.runtime.sendMessage({ type: 'LOGOUT' });
      // Show auth form with success message
      const header = `
        <div class="kindly-header">
          <div class="kindly-logo">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="white" stroke="currentColor" stroke-width="2">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
            <span>KINDLY</span>
          </div>
          <button id="kindly-close" class="kindly-close">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>
      `;
      container.innerHTML = header + createAuthForm('Successfully logged out').html;
      createAuthForm().setupListeners(container);
      // Add close button handler
      document.getElementById('kindly-close')?.addEventListener('click', () => {
        container.remove();
      });
    } catch (error) {
      console.error('Kindly: Error during logout:', error);
    }
  });

  if (loggedIn) {
    document.getElementById('kindly-activate')?.addEventListener('click', handleActivateClick);
    document.getElementById('kindly-change-cause')?.addEventListener('click', (e) => {
      e.preventDefault();
      chrome.runtime.sendMessage({ type: 'openOptionsPage' });
    });
  } else {
    createAuthForm().setupListeners(container);
  }
};

// Handle activate button click
const handleActivateClick = async (e?: Event) => {
  e?.preventDefault();
  
  // Get current merchant
  const currentDomain = window.location.hostname.replace('www.', '');
  const currentMerchant = merchantsData.find(m => currentDomain.includes(m.domain));
  
  if (!currentMerchant) {
    console.error('Kindly: Could not find merchant data for activation');
    return;
  }

  console.log('Kindly: Activating for merchant:', currentMerchant);
  
  try {
    // Show processing state
    showProcessingState();
    
    // Ask background script to open affiliate link
    const response = await chrome.runtime.sendMessage({
      type: 'OPEN_AFFILIATE_LINK',
      url: currentMerchant.affiliateLink
    });

    if (response?.success) {
      // Update local storage and show success state
      const currentDomain = window.location.hostname;
      chrome.storage.local.get(['domainDonations'], async (result) => {
        const domainDonations = result.domainDonations || {};
        domainDonations[currentDomain] = Date.now(); // Store timestamp instead of boolean
        await chrome.storage.local.set({ domainDonations });
        await showSuccessState(currentMerchant);
      });
    }
  } catch (error) {
    console.error('Kindly: Error opening affiliate tab:', error);
  }
};

// Initialize
console.log('Kindly: Starting initialization');

// Check login state and show appropriate UI
export const initialize = async () => {
  // First fetch merchants and check if we're on a supported site
  const merchantsLoaded = await fetchMerchants();
  if (!merchantsLoaded) {
    console.error('Kindly: Failed to load merchant data');
    return;
  }

  const currentDomain = window.location.hostname;

  // Check if popups are suppressed for this domain
  const suppressionKey = `suppressed_${currentDomain}`;
  const suppression = await chrome.storage.local.get([suppressionKey]);
  const suppressedUntil = suppression[suppressionKey];

  if (suppressedUntil) {
    if (suppressedUntil === 'forever') {
      console.log('Kindly: Popups permanently suppressed for this domain');
      return;
    }
    
    const now = Date.now();
    if (now < suppressedUntil) {
      console.log('Kindly: Popups temporarily suppressed for this domain');
      return;
    }
    
    // Clear expired suppression
    await chrome.storage.local.remove([suppressionKey]);
  }
  
  // Don't proceed if not on a supported merchant site
  const merchant = isSupportedMerchant();
  if (!merchant) {
    console.log('Kindly: Not a supported merchant site');
    return;
  }
  
  // Store merchant data for later use
  await chrome.storage.local.set({ currentMerchant: merchant });

  // Add styles before showing any popup
  if (!document.querySelector('link[href*="fonts.googleapis.com/css2?family=Inter"]')) {
    const linkEl = document.createElement('link');
    linkEl.rel = 'stylesheet';
    linkEl.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap';
    document.head.appendChild(linkEl);
  }

  if (!document.querySelector('style[data-kindly="true"]')) {
    const styleEl = document.createElement('style');
    styleEl.setAttribute('data-kindly', 'true');
    styleEl.textContent = `
      .kindly-popup {
        position: fixed !important;
        top: 20px !important;
        right: 20px !important;
        width: 360px !important;
        background: #ffffff !important;
        border-radius: 8px !important;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06) !important;
        z-index: 2147483647 !important;
        font-family: 'Inter', sans-serif !important;
      }
      .kindly-header {
        display: flex !important;
        align-items: center !important;
        justify-content: space-between !important;
        padding: 10px 17px !important;
        background: #e11d48 !important;
        color: white !important;
        border-top-left-radius: 8px !important;
        border-top-right-radius: 8px !important;
      }
      .kindly-logo {
        display: flex !important;
        align-items: center !important;
        gap: 8px !important;
        font-weight: 600 !important;
        font-size: 15px !important;
      }
      .kindly-logo span {
        font-family: 'Inter', sans-serif !important;
        letter-spacing: 0.05em !important;
        font-weight: normal !important;
        font-size: 13px !important;
      }
      .kindly-close-button {
        background: none !important;
        border: none !important;
        color: white !important;
        cursor: pointer !important;
        padding: 4px !important;
        position: absolute !important;
        top: 6px !important;
        right: 17px !important;
        font-size: 20px !important;
        font-weight: 500 !important;
        line-height: 1 !important;
      }
      .kindly-headline {
        font-family: 'Inter', sans-serif !important;
        font-size: 19px !important;
        font-weight: 700 !important;
        color: #222 !important;
        margin: 0 0 10px 0 !important;
        line-height: 1.2em !important;
        text-align: center !important;
        text-transform: none !important;
        letter-spacing: 0 !important;
      }
      .kindly-content {
        padding: 17px 23px !important;
      }
      .kindly-tabs {
        display: flex !important;
        gap: 8px !important;
        margin-bottom: 16px !important;
      }
      .kindly-tab {
        flex: 1 !important;
        padding: 8px !important;
        background: none !important;
        border: none !important;
        border-bottom: 2px solid #e5e7eb !important;
        color: #6b7280 !important;
        cursor: pointer !important;
        font-size: 15px !important;
        text-align: center !important;
        font-family: 'Inter', sans-serif !important;
        letter-spacing: normal !important;
        text-transform: none !important;
      }
      .kindly-tab.active {
        border-bottom-color: #e11d48 !important;
        color: #e11d48 !important;
      }
      .kindly-input {
        width: 100% !important;
        height: 40px !important;
        min-height: 40px !important;
        max-height: 40px !important;
        padding: 8px 12px !important;
        margin-bottom: 12px !important;
        border: 1px solid #e5e7eb !important;
        border-radius: 4px !important;
        font-size: 14px !important;
        font-weight: normal !important;
        text-align: left !important;
        line-height: 1.5 !important;
        box-sizing: border-box !important;
        font-family: 'Inter', sans-serif !important;
        letter-spacing: normal !important;
        background: #ffffff !important;
        background-color: #ffffff !important;
        color: #000000 !important;
      }
      .kindly-input:focus {
        background: #ffffff !important;
        background-color: #ffffff !important;
        border-color: #e11d48 !important;
        outline: none !important;
        box-shadow: 0 0 0 2px rgba(225, 29, 72, 0.2) !important;
        font-weight: normal !important;
      }
      .kindly-button {
        width: 100% !important;
        padding: 10px !important;
        border: none !important;
        border-radius: 4px !important;
        font-weight: bold !important;
        cursor: pointer !important;
        margin-bottom: 8px !important;
        text-align: center !important;
        font-size: 15px !important;
        font-family: 'Inter', sans-serif !important;
        text-transform: none !important;
        letter-spacing: 0 !important;
      }
      .kindly-button-primary {
        background: #e11d48 !important;
        color: white !important;
      }
      .kindly-button-secondary {
        background: white !important;
        border: 1px solid #e5e7eb !important;
        color: #374151 !important;
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
        gap: 8px !important;
      }
      .kindly-error {
        color: #ef4444 !important;
        font-size: 14px !important;
        margin-top: 8px !important;
      }
    `;
    document.head.appendChild(styleEl);
  }

  const loggedIn = await isLoggedIn();
  if (!loggedIn) {
    console.log('Kindly: User not logged in, showing auth form on supported site');
    
    const container = document.createElement('div');
    container.id = 'kindly-popup';
    container.className = 'kindly-popup';
    const authForm = createAuthForm();
    container.innerHTML = `
      ${createKindlyHeader()}
      <div class="kindly-content">
        ${authForm.html}
      </div>
    `;
    document.body.appendChild(container);
    document.getElementById('kindly-close')?.addEventListener('click', async () => {
      container.remove();
      await setManualClose(currentDomain);
    });
    // Set up auth form listeners
    authForm.setupListeners(container);
    return;
  }

  // User is logged in, proceed with normal flow
  console.log('Kindly: On supported merchant site, checking state');
    
  // Check if Kindly is already active
  if (isKindlyActive()) {
    console.log('Kindly: Already active, showing success state');
    const currentMerchant = merchantsData.find(m => currentDomain.includes(m.domain));
    if (currentMerchant) {
      await showSuccessState(currentMerchant);
    }
    return;
  }

  // Get domain activations
  const activations = await getDomainActivations();
  const lastActivation = activations[currentDomain];
  const now = Date.now();
  const HOURS_24 = 24 * 60 * 60 * 1000;

  // Show success state if there's an active donation
  if (lastActivation && (now - lastActivation) < HOURS_24) {
    console.log('Kindly: Active donation found, showing success state');
    const currentMerchant = merchantsData.find(m => currentDomain.includes(m.domain));
    if (currentMerchant) {
      await showSuccessState(currentMerchant);
    }
    return;
  }

  // Check if we should show the popup
  const shouldShow = await shouldShowPopup(currentDomain);
  if (shouldShow) {
    console.log('Kindly: Showing donation popup');
    setTimeout(createDonationPopup, 1000);
  } else {
    console.log('Kindly: Not showing popup - manually closed');
  }
};

initialize();

// Listen for messages from background script
chrome.runtime.onMessage.addListener((message) => {
  console.log('Kindly: Received message:', message);
  switch (message.type) {
    case 'SHOW_POPUP':
      console.log('Kindly: Show popup message received');
      createDonationPopup();
      break;

    case 'USER_LOGGED_OUT':
      console.log('Kindly: User logged out');
      // Remove any existing popups
      document.querySelectorAll('.kindly-popup').forEach(el => el.remove());
      break;
  }
});
