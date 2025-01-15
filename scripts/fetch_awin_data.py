import json
import requests
import time
import os

def get_commission_rates(advertiser_id, access_token):
    url = f'https://api.awin.com/publishers/1818430/commissiongroups?advertiserId={advertiser_id}&accessToken={access_token}'
    response = requests.get(url, headers={'accept': '*/*'})
    if response.status_code == 200:
        return response.json()
    return None

def get_active_advertisers(access_token):
    url = f'https://api.awin.com/publishers/1818430/programmes?accessToken={access_token}&relationship=joined'
    response = requests.get(url, headers={'accept': '*/*'})
    if response.status_code == 200:
        return response.json()
    return None

def get_previous_merchants():
    try:
        with open('../awin-approved.json', 'r') as f:
            data = json.load(f)
            return {m['id']: m['name'] for m in data}
    except FileNotFoundError:
        return {}

access_token = "2d212bf1-ca95-4540-8c50-8e90b8261c69"

# Get previous merchant data
previous_merchants = get_previous_merchants()

# Get fresh data from API
advertisers = get_active_advertisers(access_token)

# Save raw advertisers data
with open('../awin_advertisers.json', 'w') as f:
    json.dump(advertisers, f, indent=2)

complete_data = []
new_merchants = []

for advertiser in advertisers:
    advertiser_id = advertiser['id']
    if advertiser_id not in previous_merchants:
        new_merchants.append(f"- {advertiser['name']} (ID: {advertiser_id})")
    
    commission_data = get_commission_rates(advertiser_id, access_token)
    
    # Add commission data to the advertiser info
    advertiser_info = advertiser.copy()
    advertiser_info['commission_rates'] = commission_data
    complete_data.append(advertiser_info)
    
    # Sleep briefly to avoid rate limiting
    time.sleep(1)

# Save the complete data
merchant_data = []
for merchant in complete_data:
    # Keep all original fields and add network
    merchant_info = {
        'id': str(merchant['id']),  # Convert to string to match CJ format
        'name': merchant['name'],
        'network': 'awin',
        'description': merchant.get('description', ''),
        'displayUrl': merchant.get('displayUrl', ''),
        'logoUrl': merchant.get('logoUrl', ''),
        'affiliateLink': merchant.get('clickThroughUrl', ''),
        'currencyCode': merchant.get('currencyCode', ''),
        'status': merchant.get('status', ''),
        'category': {
            'parent': merchant.get('primarySector', ''),
            'child': ''  # AWIN doesn't provide subcategories
        },
        'primaryRegion': merchant.get('primaryRegion', {}).get('name', ''),
        'validDomains': merchant.get('validDomains', [])
    }
    merchant_data.append(merchant_info)

with open('../awin-approved.json', 'w') as f:
    json.dump(merchant_data, f, indent=2)

# Print summary
if new_merchants:
    print(f"\n{len(new_merchants)} new merchant(s) added:")
    print("\n".join(new_merchants))
else:
    print("\nNo new merchants added.")

print(f"\nTotal merchants: {len(complete_data)}")
