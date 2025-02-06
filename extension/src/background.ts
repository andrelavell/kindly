let offscreenReady = false;

// Create or get the offscreen document
async function getOffscreenDocument() {
  try {
    // Check if document already exists
    const existing = await chrome.offscreen.hasDocument();
    console.log('Offscreen document exists:', existing);
    
    if (existing) {
      return;
    }

    console.log('Creating offscreen document...');
    await chrome.offscreen.createDocument({
      url: '/offscreen.html',  // Make sure path is correct
      reasons: ['IFRAME_SCRIPTING'],
      justification: 'Token exchange handling'
    });
    console.log('Offscreen document created successfully');
  } catch (error) {
    console.error('Error managing offscreen document:', error);
    throw error;
  }
}

// Listen for offscreen document ready message
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'OFFSCREEN_READY') {
    console.log('Received ready signal from offscreen document');
    offscreenReady = true;
    sendResponse({ success: true });
    return false;
  }
});

// Forward token exchange requests to offscreen document
chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
  if (message.type === 'EXCHANGE_TOKEN') {
    try {
      console.log('Received token exchange request');
      
      // Double check offscreen document exists
      const hasDocument = await chrome.offscreen.hasDocument();
      if (!hasDocument) {
        console.log('Offscreen document not found, creating...');
        await getOffscreenDocument();
      }
      
      // Wait for offscreen document to be ready
      let retries = 0;
      while (!offscreenReady && retries < 10) {
        console.log(`Waiting for offscreen document... (attempt ${retries + 1}/10)`);
        await new Promise(resolve => setTimeout(resolve, 100));
        retries++;
      }

      if (!offscreenReady) {
        throw new Error('Offscreen document not ready after retries');
      }

      console.log('Creating port connection for token exchange');
      const port = chrome.runtime.connect({ name: 'token_exchange' });
      
      // Listen for disconnection
      port.onDisconnect.addListener(() => {
        console.log('Port disconnected in background script');
        if (chrome.runtime.lastError) {
          console.error('Port error:', chrome.runtime.lastError);
        }
      });
      
      // Listen for the response
      port.onMessage.addListener((response) => {
        console.log('Received response from offscreen document:', response);
        sendResponse(response);
        port.disconnect();
      });

      console.log('Sending token exchange request through port');
      port.postMessage({
        type: 'EXCHANGE_TOKEN',
        idToken: message.idToken
      });

      return true; // Keep message channel open
    } catch (error) {
      console.error('Token exchange error in background:', error);
      sendResponse({ success: false, error: error.message });
    }
  }
  return false;
});

// Initialize offscreen document on startup
console.log('Background script starting...');
getOffscreenDocument().catch(console.error);

// Also initialize on install
chrome.runtime.onInstalled.addListener(() => {
  console.log('Extension installed/updated');
  offscreenReady = false;
  getOffscreenDocument().catch(console.error);
});
