// Handle token fetching in the popup
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'GET_CUSTOM_TOKEN') {
    fetch('https://auth.joinkindly.org/auth/custom-token', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-Extension-ID': chrome.runtime.id,
        'Origin': `chrome-extension://${chrome.runtime.id}`
      },
      credentials: 'include',
      body: JSON.stringify({ idToken: message.idToken })
    })
    .then(async response => {
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to get custom token: ${response.status} ${errorText}`);
      }
      return response.text();
    })
    .then(token => {
      sendResponse({ success: true, customToken: token });
    })
    .catch(err => {
      console.error('Token fetch error:', err);
      sendResponse({ success: false, error: err.message });
    });
    return true;
  }
  return false;
});
