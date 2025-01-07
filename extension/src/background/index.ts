/// <reference types="chrome"/>

// Background service worker
console.log('Kindly: Background script loaded');

// Clear any existing state on startup
chrome.storage.local.clear(() => {
  console.log('Kindly: Storage cleared on startup');
});

// Listen for tab updates
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  console.log('Kindly: Tab updated', { tabId, changeInfo, tab });
  
  if (changeInfo.status === 'complete' && tab.url?.includes('amazon.com')) {
    console.log('Kindly: Amazon page loaded, checking popup state');
    
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

    case 'GET_ACTIVE_TAB':
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        sendResponse({ tab: tabs[0] });
      });
      return true; // Keep the message channel open for async response
  }
});
