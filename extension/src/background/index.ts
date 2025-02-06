/// <reference types="chrome"/>

// Background service worker
console.log('Kindly: Background script loaded');

interface Merchant {
  domain: string;
  merchant: string;
  network: string;
  affiliateLink: string;
  commissionType: string;
  commissionValue: string;
}

const MERCHANTS_URL = 'https://kindly-merchant-data.s3.us-east-2.amazonaws.com/merchants.json';
const CACHE_KEY = 'kindly_merchants_cache';
const CACHE_EXPIRY = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

async function loadFromCache(): Promise<Merchant[] | null> {
  try {
    const data = await chrome.storage.local.get(CACHE_KEY);
    if (!data[CACHE_KEY]) return null;

    const { merchants, timestamp } = data[CACHE_KEY];
    if (Date.now() - timestamp > CACHE_EXPIRY) return null;

    return merchants;
  } catch (error) {
    console.error('Kindly: Cache read error:', error);
    return null;
  }
}

async function saveToCache(merchants: Merchant[]): Promise<void> {
  try {
    await chrome.storage.local.set({
      [CACHE_KEY]: {
        merchants,
        timestamp: Date.now()
      }
    });
  } catch (error) {
    console.error('Kindly: Cache write error:', error);
  }
}

// Function to fetch merchants data
async function fetchMerchants(forceRefresh = false): Promise<Merchant[]> {
  try {
    // Check cache first unless force refresh is requested
    if (!forceRefresh) {
      const cached = await loadFromCache();
      if (cached) {
        console.log('Kindly: Using cached merchant data');
        return cached;
      }
    }

    // Fetch fresh data
    console.log('Kindly: Fetching fresh merchant data from:', MERCHANTS_URL);
    const response = await fetch(MERCHANTS_URL, {
      method: 'GET',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'omit',
      headers: {
        'Accept': 'application/json',
        'Origin': chrome.runtime.getURL(''),
        'Cache-Control': 'no-cache'
      }
    });
    
    console.log('Kindly: Fetch response status:', response.status);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    if (!Array.isArray(data)) {
      throw new Error('Received data is not an array');
    }
    
    // Skip metadata if present
    const merchants = data[0]?.metadata ? data.slice(1) : data;
    if (merchants.length === 0) {
      throw new Error('No merchant data available');
    }
    
    // Cache the fresh data
    await saveToCache(merchants);
    return merchants;
  } catch (error) {
    console.error('Kindly Background DEBUG: Error in fetchMerchants:', error);
    
    // If fetch fails, try to use expired cache as fallback
    const expired = await loadFromCache();
    if (expired) {
      console.log('Kindly: Using expired cache as fallback');
      return expired;
    }
    
    throw error;
  }
}

// Initialize by fetching merchants data with retry logic
async function initializeMerchants(retries = 3, delay = 5000) {
  for (let i = 0; i < retries; i++) {
    try {
      const data = await fetchMerchants(true);
      console.log('Kindly: Successfully loaded merchant data on startup');
      return data;
    } catch (error) {
      console.error(`Kindly: Retry ${i + 1}/${retries} failed:`, error);
      if (i < retries - 1) await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
  console.error('Kindly: All retries failed to load merchant data');
}

// Start initialization
initializeMerchants();

// Listen for messages from content script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'FETCH_MERCHANTS') {
    fetchMerchants()
      .then(merchants => {
        console.log('Kindly: Successfully fetched merchants for content script');
        sendResponse(merchants);
      })
      .catch(error => {
        console.error('Kindly: Error fetching merchants for content script:', error);
        sendResponse({ error: error.message });
      });
    return true; // Will respond asynchronously
  }
  return false;
});

// Listen for tab updates
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  console.log('Kindly: Tab updated', { tabId, changeInfo, tab });
  
  if (changeInfo.status === 'complete' && tab.url) {
    console.log('Kindly: Page loaded, checking if merchant site');
    
    // Check if we should show the popup
    chrome.storage.local.get(['donationActive', 'lastPopupShown'], (result) => {
      console.log('Kindly: Current state', result);
      
      const now = Date.now();
      const showAfter = result.lastPopupShown ? result.lastPopupShown + (24 * 60 * 60 * 1000) : 0; // 24 hours

      if (!result.donationActive && (!result.lastPopupShown || now > showAfter)) {
        console.log('Kindly: Sending show popup message');
        // Send message to content script to show popup
        chrome.tabs.sendMessage(tabId, { type: 'SHOW_POPUP' }).catch(error => {
          console.log('Kindly: Error sending message', error);
        });
        // Update last shown time
        chrome.storage.local.set({ lastPopupShown: now });
      } else {
        console.log('Kindly: Not showing popup - already active or recently closed');
      }
    });
  }
});

// Listen for messages from content script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log('Kindly: Received message:', message);
  
  switch (message.type) {
    case 'ACTIVATE_DONATION':
      chrome.storage.local.set({ donationActive: true });
      console.log('Kindly: Donation activated');
      break;

    case 'OPEN_CAUSE_SELECTOR':
      // Open popup.html in a new tab
      chrome.tabs.create({ url: 'popup.html' });
      console.log('Kindly: Opening cause selector');
      break;

    case 'LOGOUT':
      // Clear storage and notify all tabs
      chrome.storage.local.clear(() => {
        console.log('Kindly: Storage cleared on logout');
        // Notify all tabs about logout
        chrome.tabs.query({}, (tabs) => {
          tabs.forEach(tab => {
            if (tab.id) {
              chrome.tabs.sendMessage(tab.id, { type: 'USER_LOGGED_OUT' }).catch(() => {
                // Ignore errors for inactive tabs
              });
            }
          });
        });
      });
      break;

    case 'GET_ACTIVE_TAB':
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        sendResponse({ tab: tabs[0] });
      });
      return true; // Keep the message channel open for async response

    case 'OPEN_AFFILIATE_LINK':
      // Open affiliate link in pinned tab
      chrome.tabs.create({
        url: message.url,
        pinned: true,
        active: false
      }).then(tab => {
        // Listen for tab to finish loading
        chrome.tabs.onUpdated.addListener(function listener(tabId, info) {
          if (tabId === tab.id && info.status === 'complete') {
            // Remove the listener
            chrome.tabs.onUpdated.removeListener(listener);
            
            // Close the tab after a delay
            setTimeout(() => {
              chrome.tabs.remove(tab.id!);
              sendResponse({ success: true });
            }, 1000);
          }
        });
      });
      return true; // Keep the message channel open for async response
  }
});
