import json
import requests
import time
import os

# Get the project root directory (parent of scripts directory)
PROJECT_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
AWIN_APPROVED_FILE = os.path.join(PROJECT_ROOT, 'awin-approved.json')
AWIN_ADVERTISERS_FILE = os.path.join(PROJECT_ROOT, 'awin_advertisers.json')

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
        with open(AWIN_APPROVED_FILE, 'r') as f:
            data = json.load(f)
            return {m['id']: m['merchant'] for m in data}
    except FileNotFoundError:
        return {}

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

def parse_commission_data(commission_data):
    """Parse commission data to get the commission value and type."""
    if not commission_data:
        return '', ''
    
    try:
        # Get commission groups from the response
        commission_groups = commission_data.get('commissionGroups', [])
        if not commission_groups:
            return '', ''
        
        # Find the highest commission for each type
        highest_percentage = 0
        highest_fixed = 0
        
        for group in commission_groups:
            commission_type = group.get('type', '')
            
            if commission_type == 'percentage':
                percentage = group.get('percentage', 0)
                highest_percentage = max(highest_percentage, percentage)
            elif commission_type == 'fix':
                amount = group.get('amount', 0)
                highest_fixed = max(highest_fixed, amount)
        
        # Return the highest commission found (prefer percentage if both exist)
        if highest_percentage > 0:
            return f"{highest_percentage:.2f}%", 'percentage'
        elif highest_fixed > 0:
            return f"${highest_fixed:.2f}", 'fixed'
                
    except Exception as e:
        print(f"Error parsing commission data: {str(e)}")
    
    return '', ''

access_token = "2d212bf1-ca95-4540-8c50-8e90b8261c69"

# Get previous merchant data
previous_merchants = get_previous_merchants()

# Get fresh data from API
advertisers = get_active_advertisers(access_token)

# Save raw advertisers data
atomic_write_json(AWIN_ADVERTISERS_FILE, advertisers)

print(f"\nProcessing {len(advertisers)} merchants...")
complete_data = []
new_merchants = []

for advertiser in advertisers:
    try:
        advertiser_id = advertiser['id']
        if str(advertiser_id) not in previous_merchants:
            new_merchants.append(f"- {advertiser['name']} (ID: {advertiser_id})")
        
        commission_data = get_commission_rates(advertiser_id, access_token)
        commission_value, commission_type = parse_commission_data(commission_data)
        
        # Add commission data to the advertiser info
        advertiser_info = {
            'id': str(advertiser_id),  # Convert to string to match CJ format
            'merchant': advertiser['name'],
            'network': 'awin',
            'status': advertiser.get('status', ''),
            'domain': advertiser.get('displayUrl', '').lower().replace('www.', '').replace('http://', '').replace('https://', '').rstrip('/') if advertiser.get('displayUrl') else '',
            'category': advertiser.get('primarySector', ''),
            'childCategory': '',  # AWIN doesn't provide subcategories
            'currency': advertiser.get('currencyCode', ''),
            'region': 'United States' if advertiser.get('primaryRegion', {}).get('name') == 'United States of America' else advertiser.get('primaryRegion', {}).get('name', ''),
            'commissionValue': commission_value,
            'commissionType': commission_type,
            'affiliateLink': advertiser.get('clickThroughUrl', '')
        }
        complete_data.append(advertiser_info)
    except Exception as e:
        print(f"Error processing merchant {advertiser.get('name', 'Unknown')}: {str(e)}")
    time.sleep(1)  # Sleep briefly to avoid rate limiting

print(f"Successfully processed {len(complete_data)} merchants")

# Save the complete data atomically
if atomic_write_json(AWIN_APPROVED_FILE, complete_data):
    print(f"Successfully wrote {len(complete_data)} merchants to file")
else:
    print("Failed to write merchants to file")

# Print summary
if new_merchants:
    print(f"\n{len(new_merchants)} new merchant(s) added:")
    print("\n".join(new_merchants))
else:
    print("\nNo new merchants added.")

print(f"\nTotal merchants: {len(complete_data)}")

# Update combined merchants file
import update_merchants
update_merchants.update_merchants()
