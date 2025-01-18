import json
import requests
import time
import os

# Get the project root directory (parent of scripts directory)
PROJECT_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
AWIN_DECLINED_FILE = os.path.join(PROJECT_ROOT, 'awin-declined.json')

def get_declined_advertisers(access_token):
    url = f'https://api.awin.com/publishers/1818430/programmes?accessToken={access_token}&relationship=rejected'
    print(f"Fetching from URL: {url}")
    response = requests.get(url, headers={'accept': '*/*'})
    print(f"Response status code: {response.status_code}")
    if response.status_code != 200:
        print(f"Error response: {response.text}")
    if response.status_code == 200:
        return response.json()
    return None

def atomic_write_json(filepath, data):
    """Write JSON data atomically using a temporary file."""
    temp_file = filepath + '.tmp'
    try:
        with open(temp_file, 'w') as f:
            json.dump(data, f, indent=2)
        os.replace(temp_file, filepath)  # Atomic operation
        return True
    except Exception as e:
        print(f"Error writing to {filepath}: {str(e)}")
        if os.path.exists(temp_file):
            os.remove(temp_file)
        return False

access_token = "2d212bf1-ca95-4540-8c50-8e90b8261c69"

# Get fresh data from API
declined_advertisers = get_declined_advertisers(access_token)

if declined_advertisers is None:
    print("Failed to fetch declined advertisers")
    exit(1)

print(f"\nProcessing {len(declined_advertisers)} declined merchants...")
complete_data = []

for advertiser in declined_advertisers:
    try:
        advertiser_id = advertiser['id']
        
        # Format advertiser info
        advertiser_info = {
            'id': str(advertiser_id),  # Convert to string to match CJ format
            'name': advertiser['name'],
            'network': 'awin',
            'description': advertiser.get('description', ''),
            'displayUrl': advertiser.get('displayUrl', ''),
            'logoUrl': advertiser.get('logoUrl', ''),
            'affiliateLink': advertiser.get('clickThroughUrl', ''),
            'currencyCode': advertiser.get('currencyCode', ''),
            'status': advertiser.get('status', ''),
            'category': {
                'parent': advertiser.get('primarySector', ''),
                'child': ''  # AWIN doesn't provide subcategories
            },
            'primaryRegion': advertiser.get('primaryRegion', {}).get('name', ''),
            'validDomains': advertiser.get('validDomains', []),
            'declineReason': advertiser.get('declineReason', ''),  # Additional field for declined merchants
            'declinedDate': advertiser.get('declinedDate', '')     # Additional field for declined merchants
        }
        complete_data.append(advertiser_info)
    except Exception as e:
        print(f"Error processing merchant {advertiser.get('name', 'Unknown')}: {str(e)}")
    time.sleep(1)  # Sleep briefly to avoid rate limiting

print(f"Successfully processed {len(complete_data)} declined merchants")

# Save the complete data atomically
if atomic_write_json(AWIN_DECLINED_FILE, complete_data):
    print(f"Successfully wrote {len(complete_data)} declined merchants to file")
else:
    print("Failed to write declined merchants to file")

# Print summary of declined merchants
if complete_data:
    print("\nDeclined Merchants:")
    for merchant in complete_data:
        print(f"- {merchant['name']}")
        if merchant.get('declineReason'):
            print(f"  Reason: {merchant['declineReason']}")
        if merchant.get('declinedDate'):
            print(f"  Date: {merchant['declinedDate']}")
        print("")
else:
    print("No declined merchants found")
