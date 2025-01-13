const axios = require('axios');

// CJ.com Personal Access Token
const API_TOKEN = '6ay1sz7r3jq7j0g1egr9986pmx';

// CJ.com Advertiser Lookup API base URL with query parameters
const BASE_URL = 'https://advertiser-lookup.api.cj.com/v2/advertiser-lookup';

async function getAdvertisers() {
  const allAdvertisers = [];
  
  try {
    // Get all pages
    for (let page = 1; page <= 2; page++) {
      try {
        // Try with JSON format first
        const jsonResponse = await axios({
          method: 'get',
          url: `${BASE_URL}?requestor-cid=7382070&advertiser-ids=joined&page-number=${page}&records-per-page=50`,
          headers: {
            'Authorization': `Bearer ${API_TOKEN}`,
            'Accept': 'application/json'
          }
        });

        console.log(`Page ${page} - JSON Response:`, jsonResponse.data);
        allAdvertisers.push(...jsonResponse.data.advertisers);
      } catch (jsonError) {
        console.error('JSON request failed, trying XML...');
        
        try {
          // Fall back to XML format
          const xmlResponse = await axios({
            method: 'get',
            url: `${BASE_URL}?requestor-cid=7382070&advertiser-ids=joined&page-number=${page}&records-per-page=50`,
            headers: {
              'Authorization': `Bearer ${API_TOKEN}`,
              'Accept': 'application/xml'
            }
          });

          console.log(`Page ${page} - Total Matched: ${xmlResponse.data.match(/total-matched="(\d+)"/)?.[1]}, Records Returned: ${xmlResponse.data.match(/records-returned="(\d+)"/)?.[1]}`);
          console.log(`Page ${page} - XML Response:`, xmlResponse.data);
        } catch (xmlError) {
          if (xmlError.response) {
            console.error(`Page ${page} - Error Response:`, {
              status: xmlError.response.status,
              data: xmlError.response.data,
              headers: xmlError.response.headers,
              url: xmlError.config.url
            });
          } else {
            console.error(`Page ${page} - Error:`, xmlError.message);
          }
        }
      }
    }
    console.log('Combined Advertisers:', allAdvertisers);
  } catch (error) {
    console.error('Error:', error.message);
  }
}

// Run the function
getAdvertisers();
