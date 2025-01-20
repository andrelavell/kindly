import xml.etree.ElementTree as ET
import json
import requests
import time
import os

# Get the project root directory (parent of scripts directory)
PROJECT_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CJ_DECLINED_FILE = os.path.join(PROJECT_ROOT, 'cj-declined.json')

# CJ.com API configuration
API_TOKEN = '6ay1sz7r3jq7j0g1egr9986pmx'
BASE_URL = 'https://advertiser-lookup.api.cj.com/v2/advertiser-lookup'
REQUESTOR_CID = '7382070'

def safe_find_text(element, path, default=''):
    """Safely find and return text from an XML element."""
    found = element.find(path)
    return found.text if found is not None else default

def get_previous_merchants():
    """Get previously saved merchant data."""
    try:
        with open(CJ_DECLINED_FILE, 'r') as f:
            data = json.load(f)
            return {m['id']: m['name'] for m in data}
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

def clean_domain(url):
    """Clean a URL to get just the domain and create wildcard version."""
    # Remove protocol
    domain = url.replace('https://', '').replace('http://', '')
    # Remove trailing slash and www
    domain = domain.rstrip('/').replace('www.', '')
    return [
        {'domain': domain},
        {'domain': f'*.{domain}'}
    ]

def fetch_declined_advertisers():
    """Fetch declined advertisers from CJ.com API."""
    all_advertisers = []
    page = 1
    records_per_page = 50
    
    while True:
        response = requests.get(
            f"{BASE_URL}?requestor-cid={REQUESTOR_CID}&advertiser-ids=notjoined&page-number={page}&records-per-page={records_per_page}",
            headers={
                'Authorization': f'Bearer {API_TOKEN}',
                'Accept': 'application/xml'
            }
        )
        
        if response.status_code == 200:
            # Parse XML response
            root = ET.fromstring(response.text)
            advertisers = root.find('advertisers')
            advertisers_on_page = advertisers.findall('advertiser')
            
            if not advertisers_on_page:  # No more advertisers found
                break
                
            # Extract advertiser data
            for advertiser in advertisers_on_page:
                advertiser_data = {
                    'id': safe_find_text(advertiser, 'advertiser-id'),
                    'name': safe_find_text(advertiser, 'advertiser-name'),
                    'network': 'cj',
                    'status': 'declined',
                    'validDomains': clean_domain(safe_find_text(advertiser, 'program-url')),
                    'category': {
                        'parent': safe_find_text(advertiser, 'primary-category/parent'),
                        'child': safe_find_text(advertiser, 'primary-category/child')
                    },
                    'seven_day_epc': safe_find_text(advertiser, 'seven-day-epc'),
                    'three_month_epc': safe_find_text(advertiser, 'three-month-epc'),
                    'network_rank': safe_find_text(advertiser, 'network-rank'),
                    'mobile_tracking': safe_find_text(advertiser, 'mobile-tracking-certified') == 'true',
                    'cookieless_tracking': safe_find_text(advertiser, 'cookieless-tracking-enabled') == 'true'
                }
                
                all_advertisers.append(advertiser_data)
            
            print(f"Processed page {page}")
            page += 1
            
            # Rate limiting - pause between requests
            time.sleep(1)
            
        elif response.status_code == 429:  # Rate limit hit
            print("Rate limit hit, waiting 60 seconds...")
            time.sleep(60)
            continue
            
        else:
            print(f"Error: Status code {response.status_code}")
            print(response.text)
            break
    
    return all_advertisers

def main():
    """Main function to fetch and save declined CJ.com advertisers data."""
    print("Fetching declined advertisers from CJ.com...")
    previous_merchants = get_previous_merchants()
    
    advertisers = fetch_declined_advertisers()
    
    if advertisers:
        print(f"\nFound {len(advertisers)} declined advertisers")
        
        # Sort advertisers by name
        advertisers.sort(key=lambda x: x['name'].lower())
        
        # Save to file
        if atomic_write_json(CJ_DECLINED_FILE, advertisers):
            print(f"\nSaved declined advertisers data to {CJ_DECLINED_FILE}")
            
            # Print new merchants
            current_merchants = {a['id']: a['name'] for a in advertisers}
            new_merchants = set(current_merchants.keys()) - set(previous_merchants.keys())
            
            if new_merchants:
                print("\nNew declined merchants:")
                for merchant_id in new_merchants:
                    print(f"- {current_merchants[merchant_id]}")
            else:
                print("\nNo new declined merchants found")
    else:
        print("No declined advertisers data retrieved")

if __name__ == '__main__':
    main()
