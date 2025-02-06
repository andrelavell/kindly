import { auth } from '../utils/firebase';
import { onAuthStateChanged, User } from 'firebase/auth';

const MERCHANTS_URL = 'https://kindly-merchant-data.s3.us-east-2.amazonaws.com/merchants.json';
let cachedMerchants: any[] | null = null;
// Initialize auth state on background script load
async function initializeAuthState() {
  try {
    // Check Firebase current user
    const user = auth.currentUser;
    if (user) {
      console.log('Kindly Background: Found Firebase user on init');
      await persistAuthState(user);
      await broadcastStoredAuthState();
    }

    // Set up persistent auth state listener for future changes
    onAuthStateChanged(auth, async (user) => {
      console.log('Kindly Background: Auth state changed:', user ? 'logged in' : 'logged out');
      if (user) {
        await persistAuthState(user);
      } else {
        await chrome.storage.local.remove(['kindlyAuthState']);
      }
      await broadcastStoredAuthState();
    });
  } catch (error) {
    console.error('Kindly Background: Error initializing auth state:', error);
  }
}

// Persist auth state to storage
async function persistAuthState(user: User | null) {
  const authState = user ? { 
    uid: user.uid, 
    email: user.email,
    emailVerified: user.emailVerified
  } : null;

  try {
    await chrome.storage.local.set({ kindlyAuthState: authState });
    console.log('Kindly Background: Persisted auth state:', authState);
  } catch (error) {
    console.error('Kindly Background: Error persisting auth state:', error);
  }
}

// Broadcast current auth state from storage to all tabs
async function broadcastStoredAuthState() {
  try {
    const { kindlyAuthState } = await chrome.storage.local.get(['kindlyAuthState']);
    console.log('Kindly Background: Broadcasting stored auth state:', kindlyAuthState);
    
    chrome.tabs.query({}, (tabs) => {
      tabs.forEach(tab => {
        if (tab.id) {
          chrome.tabs.sendMessage(tab.id, { 
            type: 'AUTH_STATE_CHANGED',
            user: kindlyAuthState
          }).catch(() => {
            // Ignore errors - content script may not be loaded on all tabs
          });
        }
      });
    });
  } catch (error) {
    console.error('Kindly Background: Error broadcasting auth state:', error);
  }
}

// Initialize auth state when background script loads
initializeAuthState();

// Function to fetch merchants data
async function fetchMerchants() {
  console.log('Kindly Background DEBUG: Starting fetchMerchants');
  try {
    if (cachedMerchants) {
      console.log('Kindly Background DEBUG: Found cached data:', {
        length: cachedMerchants.length,
        sample: cachedMerchants[0]
      });
      return cachedMerchants;
    }

    console.log('Kindly Background DEBUG: No cache, fetching from:', MERCHANTS_URL);
    const response = await fetch(MERCHANTS_URL);
    console.log('Kindly Background DEBUG: Fetch response status:', response.status);
    
    const data = await response.json();
    console.log('Kindly Background DEBUG: Parsed JSON data length:', data.length);
    console.log('Kindly Background DEBUG: First item:', data[0]);
    
    // Cache the data
    cachedMerchants = data;
    const merchantCount = data[0]?.metadata ? data.length - 1 : data.length;
    console.log('Kindly Background DEBUG: Cached', merchantCount, 'merchants');
    console.log('Kindly Background DEBUG: Sample merchants:', data.slice(0, 3));
    
    return data;
  } catch (error) {
    console.error('Kindly Background DEBUG: Error in fetchMerchants:', error);
    console.error('Kindly Background DEBUG: Error stack:', error.stack);
    return null;
  }
}

// Listen for messages from content script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log('Kindly Background DEBUG: Message received:', {
    type: message.type,
    sender: sender.url
  });
  
  if (message.type === 'FETCH_MERCHANTS') {
    console.log('Kindly Background DEBUG: Processing FETCH_MERCHANTS request');
    // Fetch merchants and send response
    fetchMerchants().then(data => {
      console.log('Kindly Background DEBUG: Sending response to content script:', {
        dataLength: data?.length,
        hasData: !!data,
        sampleMerchant: data?.[0]
      });
      sendResponse(data);
    }).catch(error => {
      console.error('Kindly Background DEBUG: Error in message handler:', error);
      sendResponse(null);
    });
    return true;
  }

  if (message.type === 'GET_AUTH_STATE') {
    console.log('Kindly Background DEBUG: Processing GET_AUTH_STATE request');
    
    // Keep service worker alive with a no-op fetch
    fetch('https://kindly-merchant-data.s3.us-east-2.amazonaws.com/merchants.json', { method: 'HEAD' })
      .catch(() => {}); // Ignore errors, just keeping worker alive
    
    // Get fresh state from storage and ensure response is sent
    (async () => {
      try {
        const result = await chrome.storage.local.get(['kindlyAuthState']);
        const storedUser = result.kindlyAuthState;
        console.log('Kindly Background DEBUG: Found stored auth state:', storedUser);
        sendResponse({ user: storedUser });
      } catch (error) {
        console.error('Kindly Background DEBUG: Error getting auth state:', error);
        sendResponse({ user: null });
      }
    })();
    return true;
  }
  
  // Handle auth state changes from other contexts
  if (message.type === 'AUTH_STATE_CHANGED') {
    console.log('Kindly Background DEBUG: Received auth state change:', message.user);
    // Chain operations and keep worker alive
    (async () => {
      try {
        await persistAuthState(message.user);
        await broadcastStoredAuthState();
        sendResponse({ success: true });
      } catch (error) {
        console.error('Kindly Background DEBUG: Error handling auth change:', error);
        sendResponse({ success: false });
      }
    })();
    return true;
  }
});
