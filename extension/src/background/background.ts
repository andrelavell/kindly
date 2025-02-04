const MERCHANTS_URL = 'https://kindly-merchant-data.s3.us-east-2.amazonaws.com/merchants.json';
let cachedMerchants: any[] | null = null;

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
    
    // Return true to indicate we will send a response asynchronously
    return true;
  }
});
