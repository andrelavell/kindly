/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/*!*********************************!*\
  !*** ./src/background/index.ts ***!
  \*********************************/

/// <reference types="chrome"/>
// Background service worker
console.log('Kindly: Background script loaded');
const MERCHANTS_URL = 'https://kindly-merchant-data.s3.us-east-2.amazonaws.com/merchants.json';
let cachedMerchants = null;
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
    }
    catch (error) {
        console.error('Kindly Background DEBUG: Error in fetchMerchants:', error);
        console.error('Kindly Background DEBUG: Error stack:', error.stack);
        return null;
    }
}
// Clear any existing state on startup
chrome.storage.local.clear(() => {
    console.log('Kindly: Storage cleared on startup');
});
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
        // Return true to indicate we will send a response asynchronously
        return true;
    }
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
            }
            else {
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
                            chrome.tabs.remove(tab.id);
                            sendResponse({ success: true });
                        }, 1000);
                    }
                });
            });
            return true; // Keep the message channel open for async response
    }
});

/******/ })()
;
//# sourceMappingURL=background.js.map