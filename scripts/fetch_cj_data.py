import xml.etree.ElementTree as ET
import json
import requests
import time
import os

# Get the project root directory (parent of scripts directory)
PROJECT_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CJ_APPROVED_FILE = os.path.join(PROJECT_ROOT, 'cj-approved.json')

# CJ.com API configuration
API_TOKEN = '6ay1sz7r3jq7j0g1egr9986pmx'
BASE_URL = 'https://advertiser-lookup.api.cj.com/v2/advertiser-lookup'
REQUESTOR_CID = '7382070'
WEBSITE_ID = '101335466'  # Website ID for link generation

def safe_find_text(element, path, default=''):
    """Safely find and return text from an XML element."""
    found = element.find(path)
    return found.text if found is not None else default

def get_previous_merchants():
    """Get previously saved merchant data."""
    try:
        with open(CJ_APPROVED_FILE, 'r') as f:
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

def get_affiliate_link(advertiser_id):
    """Get the main affiliate link for a specific advertiser."""
    url = 'https://link-search.api.cj.com/v2/link-search'
    
    params = {
        'website-id': WEBSITE_ID,
        'advertiser-ids': advertiser_id,
        'link-type': 'Text Link',
        'records-per-page': 1
    }
    
    headers = {
        'Authorization': f'Bearer {API_TOKEN}',
        'Accept': 'application/xml'
    }
    
    try:
        response = requests.get(url, params=params, headers=headers)
        
        if response.status_code == 200:
            root = ET.fromstring(response.text)
            links = root.find('links')
            
            if links is not None and len(links.findall('link')) > 0:
                link = links.find('link')
                click_url = link.find('clickUrl')
                if click_url is not None and click_url.text:
                    return click_url.text
            
        elif response.status_code == 429:  # Rate limit hit
            print("Rate limit hit, waiting 60 seconds...")
            time.sleep(60)
            return get_affiliate_link(advertiser_id)
            
        return None
    except Exception as e:
        print(f"Error fetching link for advertiser {advertiser_id}: {str(e)}")
        return None

def fetch_advertisers():
    """Fetch all advertisers from CJ.com API."""
    all_advertisers = []
    page = 1
    records_per_page = 50
    
    while True:
        response = requests.get(
            f"{BASE_URL}?requestor-cid={REQUESTOR_CID}&advertiser-ids=joined&page-number={page}&records-per-page={records_per_page}",
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
                    'status': safe_find_text(advertiser, 'account-status'),
                    'validDomains': clean_domain(safe_find_text(advertiser, 'program-url')),
                    'category': {
                        'parent': safe_find_text(advertiser, 'primary-category/parent'),
                        'child': safe_find_text(advertiser, 'primary-category/child')
                    },
                    'seven_day_epc': safe_find_text(advertiser, 'seven-day-epc'),
                    'three_month_epc': safe_find_text(advertiser, 'three-month-epc'),
                    'network_rank': safe_find_text(advertiser, 'network-rank'),
                    'mobile_tracking': safe_find_text(advertiser, 'mobile-tracking-certified') == 'true',
                    'cookieless_tracking': safe_find_text(advertiser, 'cookieless-tracking-enabled') == 'true',
                    'actions': []
                }
                
                # Get affiliate link for this advertiser
                affiliate_link = get_affiliate_link(advertiser_data['id'])
                if affiliate_link:
                    advertiser_data['affiliateLink'] = affiliate_link
                
                # Extract commission actions
                actions = advertiser.find('actions')
                if actions is not None:
                    for action in actions.findall('action'):
                        action_data = {
                            'name': safe_find_text(action, 'n'),
                            'type': safe_find_text(action, 'type'),
                            'id': safe_find_text(action, 'id'),
                            'commission': {}
                        }
                        
                        # Extract commission details
                        commission = action.find('commission')
                        if commission is not None:
                            default = commission.find('default')
                            if default is not None:
                                action_data['commission']['default'] = {
                                    'value': default.text,
                                    'type': default.get('type', 'percentage')
                                }
                            
                            # Extract item-specific commissions
                            for item in commission.findall('itemlist'):
                                if item.text and item.get('name'):
                                    action_data['commission'][item.get('name')] = {
                                        'value': item.text,
                                        'id': item.get('id')
                                    }
                        
                        advertiser_data['actions'].append(action_data)
                
                all_advertisers.append(advertiser_data)
            
            print(f"Page {page}: Retrieved {len(advertisers_on_page)} advertisers")
            
            # If we got fewer records than requested, we're on the last page
            if len(advertisers_on_page) < records_per_page:
                break
                
            page += 1
        else:
            print(f"Error fetching page {page}: {response.status_code}")
            break
        
        # Sleep briefly between pages to avoid rate limiting
        time.sleep(1)
    
    return all_advertisers

def main():
    """Main function to fetch and save CJ.com advertisers data."""
    try:
        # Get previous merchant data
        previous_merchants = get_previous_merchants()
        
        print("\nFetching advertisers from CJ.com API...")
        advertisers = fetch_advertisers()
        
        if not advertisers:
            print("Error: No advertisers fetched from API")
            return
        
        # Track new merchants
        new_merchants = []
        for advertiser in advertisers:
            if advertiser['id'] not in previous_merchants:
                new_merchants.append(f"- {advertiser['name']} (ID: {advertiser['id']})")
        
        # Save the complete data atomically
        if atomic_write_json(CJ_APPROVED_FILE, advertisers):
            print(f"Successfully wrote {len(advertisers)} merchants to file")
            
            # Print summary
            if new_merchants:
                print(f"\n{len(new_merchants)} new merchant(s) added:")
                print("\n".join(new_merchants))
            else:
                print("\nNo new merchants added.")
            
            print(f"\nTotal merchants: {len(advertisers)}")
            
            # Update combined merchants file
            import update_merchants
            update_merchants.update_merchants()
        else:
            print("Failed to write merchants to file")
            
    except Exception as e:
        print(f"Error in main function: {str(e)}")

if __name__ == '__main__':
    main()
