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
                # Get the domain from program-url
                program_url = safe_find_text(advertiser, 'program-url')
                domain = program_url.replace('https://', '').replace('http://', '').replace('www.', '').rstrip('/').lower()
                
                # Get affiliate link
                advertiser_id = safe_find_text(advertiser, 'advertiser-id')
                affiliate_link = get_affiliate_link(advertiser_id)
                
                advertiser_data = {
                    'id': advertiser_id,
                    'merchant': safe_find_text(advertiser, 'advertiser-name'),
                    'network': 'cj',
                    'status': safe_find_text(advertiser, 'account-status'),
                    'domain': domain,
                    'category': safe_find_text(advertiser, 'primary-category/parent'),
                    'childCategory': safe_find_text(advertiser, 'primary-category/child'),
                    'currency': 'USD',  # CJ operates in USD
                    'region': 'United States',  # CJ's primary region
                    'commissionValue': '',  # Will be set when processing actions
                    'commissionType': '',  # Will be set when processing actions
                    'affiliateLink': affiliate_link if affiliate_link else ''
                }
                
                # Extract commission actions
                actions = advertiser.find('actions')
                if actions is not None:
                    for action in actions.findall('action'):
                        commission = action.find('commission')
                        if commission is not None:
                            default = commission.find('default')
                            if default is not None:
                                commission_type = default.get('type', '')
                                value = default.text.strip() if default.text else ''
                                
                                # If value ends with % and no explicit type, it's a percentage
                                if value.endswith('%'):
                                    advertiser_data['commissionValue'] = value
                                    advertiser_data['commissionType'] = 'percentage'
                                # If type is item-level or order-level, it's a fixed amount
                                elif commission_type in ['item-level', 'order-level'] and value:
                                    # Extract just the number, handling various currency formats
                                    amount = ''.join(c for c in value.split()[-1] if c.isdigit() or c == '.')
                                    advertiser_data['commissionValue'] = f"${amount}"
                                    advertiser_data['commissionType'] = 'fixed'
                                break  # Use the first default commission we find
                
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
        print("\nFetching advertisers from CJ.com API...")
        advertisers = fetch_advertisers()
        print(f"\nSuccessfully wrote {len(advertisers)} merchants to file\n")
        
        # Get previously saved merchant data
        previous_merchants = get_previous_merchants()
        
        # Check for new merchants
        new_merchants = []
        for advertiser in advertisers:
            if advertiser['id'] not in previous_merchants:
                new_merchants.append(f"- {advertiser['merchant']} (ID: {advertiser['id']})")
        
        # Save the complete data atomically
        if atomic_write_json(CJ_APPROVED_FILE, advertisers):
            if new_merchants:
                print("New merchants added:")
                print('\n'.join(new_merchants))
                print()
            else:
                print("No new merchants added.\n")
            
            # Update the combined merchants file
            import update_merchants
            update_merchants.update_merchants()
            
        else:
            print("Error: Failed to write to file")
            
    except Exception as e:
        print(f"Error in main function: {str(e)}")
        raise

if __name__ == '__main__':
    main()
