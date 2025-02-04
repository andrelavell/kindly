// Content script for merchant detection and popup injection
import './content.css';
import { isLoggedIn } from './auth';
import { createAuthForm } from './auth-form';

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

// Calculate donation percentage (half of commission value)
const getDonationPercentage = (merchant: Merchant): string => {
  // Remove any % sign and convert to number
  const commissionNum = parseFloat(merchant.commissionValue.replace('%', ''));
  // Calculate half and format to at most 2 decimal places
  const donationNum = (commissionNum / 2).toFixed(2);
  return `${donationNum}%`;
};

// Fetch merchants data
const fetchMerchants = async () => {
  console.log('Kindly DEBUG: Starting fetchMerchants');
  try {
    // Use the background script to fetch the data
    console.log('Kindly DEBUG: Sending FETCH_MERCHANTS message to background');
    const data = await chrome.runtime.sendMessage({ type: 'FETCH_MERCHANTS' });
    console.log('Kindly DEBUG: Received response from background:', data);
    
    if (data && Array.isArray(data)) {
      // Check if first item is metadata
      console.log('Kindly DEBUG: First item in data:', data[0]);
      if (data[0]?.metadata) {
        console.log('Kindly DEBUG: Found metadata, slicing array');
        merchantsData = data.slice(1);
      } else {
        console.log('Kindly DEBUG: No metadata found, using full array');
        merchantsData = data;
      }
      console.log('Kindly DEBUG: Merchant data sample:', merchantsData[0]);
      console.log('Kindly: Loaded', merchantsData.length, 'merchants');
    } else {
      console.error('Kindly: Invalid merchants data received:', data);
    }
  } catch (error) {
    console.error('Kindly DEBUG: Error in fetchMerchants:', error);
    console.error('Kindly DEBUG: Error stack:', error.stack);
  }
};

// Check if we're on a supported merchant site
const isSupportedMerchant = () => {
  console.log('Kindly DEBUG: Starting isSupportedMerchant check');
  const currentDomain = window.location.hostname.replace('www.', '');
  console.log('Kindly DEBUG: Current domain after www removal:', currentDomain);
  console.log('Kindly DEBUG: Original hostname:', window.location.hostname);
  console.log('Kindly DEBUG: Full URL:', window.location.href);
  console.log('Kindly DEBUG: Number of merchants to check:', merchantsData.length);
  
  if (!merchantsData.length) {
    console.error('Kindly DEBUG: No merchant data available!');
    return false;
  }
  
  console.log('Kindly DEBUG: First few merchants:', merchantsData.slice(0, 3));
  
  const merchant = merchantsData.find(m => {
    if (!m.domain) {
      console.error('Kindly DEBUG: Merchant missing domain:', m);
      return false;
    }
    const matches = currentDomain.includes(m.domain);
    console.log('Kindly DEBUG: Checking merchant:', {
      merchantDomain: m.domain,
      currentDomain,
      matches
    });
    return matches;
  });
  
  console.log('Kindly DEBUG: Merchant match result:', merchant);
  return merchant !== undefined;
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

// Show processing state
const ACTIVATION_STORAGE_KEY = 'kindly_domain_activations';

const getDomainActivations = (): Record<string, number> => {
  const stored = localStorage.getItem(ACTIVATION_STORAGE_KEY);
  return stored ? JSON.parse(stored) : {};
};

const setDomainActivation = (domain: string) => {
  const activations = getDomainActivations();
  activations[domain] = Date.now();
  localStorage.setItem(ACTIVATION_STORAGE_KEY, JSON.stringify(activations));
};

const isDomainActivated = (domain: string): boolean => {
  const activations = getDomainActivations();
  const lastActivation = activations[domain];
  if (!lastActivation) return false;
  
  const hoursSinceActivation = (Date.now() - lastActivation) / (1000 * 60 * 60);
  return hoursSinceActivation < 24;
};

const showProcessingState = () => {
  // Remove the original popup
  document.getElementById('kindly-popup')?.remove();
  const popup = document.createElement('div');
  popup.id = 'kindly-processing-popup';
  popup.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    width: 360px;
    background: white;
    border-radius: 10px;
    box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
    border: 1px solid #E5E7EB;
    z-index: 999999;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif !important;
    overflow: hidden;
  `;

  popup.innerHTML = `
    <!-- Extension Header -->
    <div style="background: #e11d48; color: white; padding: 12px 16px; display: flex; justify-content: space-between; align-items: center;">
      <div style="display: flex; align-items: center; gap: 6px;">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="white" stroke="currentColor" stroke-width="2">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
        </svg>
        <span style="font-weight: 600; font-size: 15px !important; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important;">KINDLY</span>
      </div>
      <button id="kindly-close-processing" style="color: white; padding: 4px; line-height: 0; border: none; background: none; cursor: pointer;">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M18 6L6 18M6 6l12 12"></path>
        </svg>
      </button>
    </div>

    <!-- Content -->
    <div style="padding: 16px;">
      <div style="
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 12px;
        margin-bottom: 16px;
      ">
        <svg width="24" height="24" viewBox="0 0 24 24" style="animation: spin 1s linear infinite;">
          <style>
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          </style>
          <circle cx="12" cy="12" r="10" stroke="#e11d48" stroke-width="2" fill="none" opacity="0.25"/>
          <path d="M12 2a10 10 0 0 1 10 10" stroke="#e11d48" stroke-width="2" fill="none"/>
        </svg>
        <span style="
          font-size: 15px !important;
          color: #6B7280;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important;
        ">Processing...</span>
      </div>
    </div>
  `;

  document.body.appendChild(popup);

  // Add event listener for close button
  document.getElementById('kindly-close-processing')?.addEventListener('click', () => {
    popup.remove();
  });

  return popup;
};

// Show success state popup
const showSuccessState = (merchant: Merchant) => {
  // Record domain activation
  setDomainActivation(window.location.hostname);
  // Remove any existing popups
  document.getElementById('kindly-popup')?.remove();
  document.getElementById('kindly-processing-popup')?.remove();

  const popup = document.createElement('div');
  popup.id = 'kindly-success-popup';
  popup.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    width: 360px;
    background: white;
    border-radius: 10px;
    box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
    border: 1px solid #E5E7EB;
    z-index: 999999;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif !important;
    overflow: hidden;
  `;

  popup.innerHTML = `
    <!-- Extension Header -->
    <div style="background: #e11d48; color: white; padding: 12px 16px; display: flex; justify-content: space-between; align-items: center;">
      <div style="display: flex; align-items: center; gap: 6px;">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="white" stroke="currentColor" stroke-width="2">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
        </svg>
        <span style="font-weight: 600; font-size: 15px !important; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important;">KINDLY</span>
      </div>
      <button id="kindly-close-success" style="color: white; padding: 4px; line-height: 0; border: none; background: none; cursor: pointer;">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M18 6L6 18M6 6l12 12"></path>
        </svg>
      </button>
    </div>

    <!-- Content -->
    <div style="padding: 16px;">
      <!-- Success Message -->
      <div style="
        display: flex;
        align-items: flex-start;
        gap: 8px;
        margin-bottom: 16px;
      ">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color: #16A34A; flex-shrink: 0; margin-top: 2px;">
          <path d="M20 6L9 17l-5-5"></path>
        </svg>
        <div>
          <div style="
            font-size: 16px !important;
            font-weight: 500 !important;
            color: #16A34A;
            margin-bottom: 4px;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important;
          ">Offer Activated!</div>
          <div style="
            font-size: 15px !important;
            color: #6B7280;
            line-height: 1.4;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important;
          ">Purchases will now generate up to a ${getDonationPercentage(merchant)} donation to Susan G Komen</div>
        </div>
      </div>


    </div>
  `;

  document.body.appendChild(popup);

  // Add event listener
  document.getElementById('kindly-close-success')?.addEventListener('click', () => {
    popup.remove();
  });


};

// Create and inject the affiliate choice dialog
const createAffiliateChoiceDialog = (affiliateTag: string) => {
  const dialog = document.createElement('div');
  dialog.id = 'kindly-affiliate-dialog';
  dialog.style.cssText = `
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: white;
    padding: 24px;
    border-radius: 12px;
    box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
    z-index: 1000000;
    width: 400px;
    max-width: 90vw;
  `;

  dialog.innerHTML = `
    <div class="text-center">
      <div style="margin-bottom: 16px;">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin: 0 auto; color: #F43F5E;">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
        </svg>
      </div>
      <h3 style="font-size: 18px; font-weight: 600; color: #111827; margin-bottom: 8px;">We've detected another affiliate</h3>
      <p style="color: #4B5563; margin-bottom: 20px;">
        We've detected another affiliate connected to your purchase (${affiliateTag}). This might support a website or creator you recently visited.
      </p>
      <div style="display: flex; gap: 12px; justify-content: center; margin-bottom: 16px;">
        <button id="kindly-support-creator" style="
          padding: 8px 16px;
          background: white;
          color: #4B5563;
          border: 1px solid #F43F5E;
          border-radius: 8px;
          font-weight: 500 !important;
          cursor: pointer;
          transition: all 0.2s;
        ">Support Creator</button>
        <button id="kindly-support-charity" style="
          padding: 8px 16px;
          background: #F43F5E;
          color: white;
          border: none;
          border-radius: 8px;
          font-weight: 500 !important;
          cursor: pointer;
          transition: background-color 0.2s;
        ">Donate to Charity</button>
      </div>
      <p style="
        font-size: 12px;
        color: #6B7280;
        line-height: 1.4;
        margin-top: 16px;
        padding: 12px;
        background: #F9FAFB;
        border-radius: 6px;
      ">
        If you choose to donate to charity, the affiliate commission from your purchase will be received by Kindly and donated to your selected cause.
      </p>
    </div>
  `;

  // Add overlay
  const overlay = document.createElement('div');
  overlay.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 999999;
  `;

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

// Create and inject the popup
const createDonationPopup = async () => {
  // Check if domain is already activated
  if (isDomainActivated(window.location.hostname)) {
    return;
  }

  // Check if user is logged in
  const loggedIn = await isLoggedIn();
  if (!loggedIn) {
    console.log('Kindly: User not logged in');
  }
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
  container.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    width: 320px;
    background: white;
    border-radius: 8px;
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
    z-index: 999999;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif !important;
  `;

  // Add popup content
  container.innerHTML = `
    <div style="background: #e11d48; color: white; padding: 12px 16px; display: flex; justify-content: space-between; align-items: center;">
      <div style="display: flex; align-items: center; gap: 6px;">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="white" stroke="currentColor" stroke-width="2">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
        </svg>
        <span style="font-weight: 600;">KINDLY</span>
      </div>
      <button id="kindly-close" style="color: white; padding: 4px; line-height: 0; border: none; background: none; cursor: pointer;">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M18 6L6 18M6 6l12 12" />
        </svg>
      </button>
    </div>
    <div style="padding: 24px;">
      <div style="text-align: center; margin-bottom: 24px;">
        ${loggedIn ? `
          <div style="width: 80px; height: 80px; margin: 0 auto 24px;">
            <img 
              src="https://joinkindly.org/_next/image?url=%2Fimages%2Fcauses%2Fsusan-g-komen-logo.png&w=128&q=75"
              alt="Susan G Komen"
              style="width: 100%; height: 100%; object-fit: contain; border-radius: 8px; background: white;"
            />
          </div>
          <h3 style="color: #2D3648; font-size: 20px !important; font-weight: 600 !important; margin-bottom: 8px; line-height: 1.2 !important; letter-spacing: normal !important; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important;">
            Get up to ${getDonationPercentage(currentMerchant)} donated to Susan G Komen
          </h3>
          <p style="color: rgba(45, 54, 72, 0.7); font-size: 14px !important; letter-spacing: normal !important; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important;">
            For Breast Cancer Research
          </p>
        </div>
        <button id="kindly-activate" style="
          width: 100%;
          background: #e11d48;
          color: white;
          padding: 12px;
          border-radius: 6px;
          font-weight: 600 !important;
          font-size: 14px !important;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important;
          border: none;
          cursor: pointer;
        ">
          Activate Donation
        </button>
        <button id="kindly-change-cause" style="
          width: 100%;
          color: #e11d48;
          padding: 8px;
          font-weight: 500 !important;
          font-size: 14px !important;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important;
          border: none;
          background: none;
          cursor: pointer;
          margin-top: 8px;
        ">
          Change cause
        </button>
      ` : createAuthForm().html}

    </div>
  `;

  // Add to page
  document.body.appendChild(container);

  // Add event listeners
  document.getElementById('kindly-close')?.addEventListener('click', (e) => {
    e.preventDefault();
    container.remove();
    // Store that user has closed the popup
    chrome.storage.local.set({ popupClosed: Date.now() });
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
      chrome.storage.local.set({ donationActive: true });
      showSuccessState(currentMerchant);
    }
  } catch (error) {
    console.error('Kindly: Error opening affiliate tab:', error);
  }
};

// Initialize
console.log('Kindly: Starting initialization');

// Fetch merchants first
fetchMerchants().then(() => {
  console.log('Kindly: Merchants fetched, checking if supported site');
  if (isSupportedMerchant()) {
    console.log('Kindly: On supported merchant site, checking state');
    
    // Check if Kindly is already active
    if (isKindlyActive()) {
      console.log('Kindly: Already active, showing success state');
      showSuccessState();
    } else {
      // Check if donation is active or popup was recently closed
      chrome.storage.local.get(['donationActive', 'popupClosed'], (result) => {
        console.log('Kindly: Storage state:', result);
        
        if (result.donationActive) {
          console.log('Kindly: Donation active in storage, showing success state');
          showSuccessState();
        } else {
          const now = Date.now();
          const showAfter = result.popupClosed ? result.popupClosed + (24 * 60 * 60 * 1000) : 0;

          if (!result.popupClosed || now > showAfter) {
            console.log('Kindly: Showing popup');
            setTimeout(createDonationPopup, 1000);
          } else {
            console.log('Kindly: Popup recently closed, not showing');
          }
        }
      });
    }
  } else {
    console.log('Kindly: Not a supported merchant site');
  }
});

// Listen for messages from background script
chrome.runtime.onMessage.addListener((message) => {
  console.log('Kindly: Received message:', message);
  if (message.type === 'SHOW_POPUP') {
    console.log('Kindly: Show popup message received');
    createDonationPopup();
  }
});
