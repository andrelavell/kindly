// Content script for Amazon detection and popup injection
import './content.css';

console.log('Kindly: Content script loaded');

const AMAZON_DOMAIN = 'amazon.com';
const KINDLY_AFFILIATE_ID = 'kindly123';

// Check if we're on Amazon
const isAmazonSite = () => {
  const isAmazon = window.location.hostname.includes(AMAZON_DOMAIN);
  console.log('Kindly: Is Amazon site?', isAmazon, window.location.hostname);
  return isAmazon;
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

// Show success state popup
const showSuccessState = () => {
  const popup = document.createElement('div');
  popup.id = 'kindly-success-popup';
  popup.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    width: 360px;
    background: white;
    border-radius: 12px;
    box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
    border: 1px solid #E5E7EB;
    z-index: 999999;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  `;

  popup.innerHTML = `
    <!-- Extension Header -->
    <div style="
      background: #f1f3f4;
      border-top-left-radius: 12px;
      border-top-right-radius: 12px;
      border-bottom: 1px solid #E5E7EB;
    ">
      <div style="
        display: flex;
        align-items: center;
        padding: 12px 16px;
        gap: 8px;
      ">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color: #4B5563;">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
        </svg>
        <span style="
          font-size: 16px;
          font-weight: 500;
          color: #4B5563;
        ">Kindly</span>
      </div>
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
            font-size: 14px;
            font-weight: 500;
            color: #16A34A;
            margin-bottom: 4px;
          ">Donation Activated!</div>
          <div style="
            font-size: 13px;
            color: #6B7280;
            line-height: 1.4;
          ">Up to 2.6% of your purchases will go to your selected cause below.</div>
        </div>
      </div>

      <!-- Selected Cause -->
      <div style="
        background: #F9FAFB;
        border: 1px solid #E5E7EB;
        border-radius: 8px;
        padding: 12px;
        margin-bottom: 16px;
      ">
        <div style="
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 8px;
        ">
          <span style="
            font-size: 13px;
            font-weight: 500;
            color: #6B7280;
          ">Your Selected Cause</span>
        </div>
        <div style="
          display: flex;
          align-items: center;
          justify-content: space-between;
        ">
          <div style="
            display: flex;
            align-items: center;
            gap: 8px;
          ">
            <div style="
              width: 32px;
              height: 32px;
              background: #F43F5E;
              border-radius: 6px;
              display: flex;
              align-items: center;
              justify-content: center;
            ">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
            </div>
            <div>
              <div style="
                font-size: 14px;
                font-weight: 500;
                color: #111827;
              ">Save the Children</div>
              <div style="
                font-size: 12px;
                color: #6B7280;
              ">Children's Rights</div>
            </div>
          </div>
          <button id="kindly-change-cause-success" style="
            padding: 6px 12px;
            background: white;
            border: 1px solid #E5E7EB;
            border-radius: 6px;
            font-size: 12px;
            font-weight: 500;
            color: #4B5563;
            cursor: pointer;
            transition: all 0.2s;
          ">Change</button>
        </div>
      </div>

      <!-- Close button -->
      <button id="kindly-close-success" style="
        width: 100%;
        padding: 8px;
        background: #F3F4F6;
        border: none;
        border-radius: 6px;
        font-size: 13px;
        font-weight: 500;
        color: #4B5563;
        cursor: pointer;
        transition: all 0.2s;
      ">Close</button>
    </div>
  `;

  document.body.appendChild(popup);

  // Add event listeners
  document.getElementById('kindly-close-success')?.addEventListener('click', () => {
    popup.remove();
  });

  document.getElementById('kindly-change-cause-success')?.addEventListener('click', () => {
    chrome.runtime.sendMessage({ type: 'OPEN_CAUSE_SELECTOR' });
  });

  // Auto-hide after 5 seconds
  setTimeout(() => {
    if (document.body.contains(popup)) {
      popup.style.animation = 'fadeOut 0.3s ease-out';
      popup.addEventListener('animationend', () => popup.remove());
    }
  }, 5000);
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
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
        ">Support Creator</button>
        <button id="kindly-support-charity" style="
          padding: 8px 16px;
          background: #F43F5E;
          color: white;
          border: none;
          border-radius: 8px;
          font-weight: 500;
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
const createDonationPopup = () => {
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
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  `;

  // Add popup content
  container.innerHTML = `
    <div style="background: #f43f5e; color: white; padding: 12px 16px; border-radius: 8px 8px 0 0; display: flex; justify-content: space-between; align-items: center;">
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
        <div style="width: 80px; height: 80px; margin: 0 auto 24px;">
          <img 
            src="https://joinkindly.org/_next/image?url=%2Fimages%2Fcauses%2Fsusan-g-komen-logo.png&w=128&q=75"
            alt="Susan G Komen"
            style="width: 100%; height: 100%; object-fit: contain; border-radius: 8px; background: white;"
          />
        </div>
        <h3 style="color: #2D3648; font-size: 20px; font-weight: 600; margin-bottom: 8px; line-height: 1.2;">
          Get up to 2.6% donated to Susan G Komen
        </h3>
        <p style="color: rgba(45, 54, 72, 0.7); font-size: 14px;">
          For Breast Cancer Research
        </p>
      </div>
      <button id="kindly-activate" style="
        width: 100%;
        background: #f43f5e;
        color: white;
        padding: 12px;
        border-radius: 6px;
        font-weight: 600;
        font-size: 14px;
        border: none;
        cursor: pointer;
      ">
        Activate Donation
      </button>
      <button id="kindly-change-cause" style="
        width: 100%;
        color: #f43f5e;
        padding: 8px;
        font-weight: 500;
        font-size: 14px;
        border: none;
        background: none;
        cursor: pointer;
        margin-top: 8px;
      ">
        Change cause
      </button>
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

  document.getElementById('kindly-activate')?.addEventListener('click', handleActivateClick);

  document.getElementById('kindly-change-cause')?.addEventListener('click', (e) => {
    e.preventDefault();
    // Open popup for cause selection
    chrome.runtime.sendMessage({ type: 'OPEN_CAUSE_SELECTOR' });
  });
};

// Handle activate button click
const handleActivateClick = (e?: Event) => {
  e?.preventDefault();
  
  const affiliateTag = getCurrentAffiliateTag();
  console.log('Kindly: Handling activate click, affiliate tag:', affiliateTag);

  if (affiliateTag) {
    createAffiliateChoiceDialog(affiliateTag);
  } else {
    // No existing affiliate, directly apply Kindly's tag
    console.log('Kindly: No existing affiliate, applying Kindly tag');
    const newUrl = new URL(window.location.href);
    newUrl.searchParams.set('tag', KINDLY_AFFILIATE_ID);
    chrome.storage.local.set({ donationActive: true });
    window.location.href = newUrl.toString();
  }
};

// Initialize
console.log('Kindly: Starting initialization');
if (isAmazonSite()) {
  console.log('Kindly: On Amazon, checking state');
  
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
}

// Listen for messages from background script
chrome.runtime.onMessage.addListener((message) => {
  console.log('Kindly: Received message:', message);
  if (message.type === 'SHOW_POPUP') {
    console.log('Kindly: Show popup message received');
    createDonationPopup();
  }
});
