import xml.etree.ElementTree as ET
import json
import requests

# CJ.com API configuration
API_TOKEN = '6ay1sz7r3jq7j0g1egr9986pmx'
BASE_URL = 'https://advertiser-lookup.api.cj.com/v2/advertiser-lookup'
REQUESTOR_CID = '7382070'

def safe_find_text(element, path, default=''):
    """Safely find and return text from an XML element."""
    found = element.find(path)
    return found.text if found is not None else default

def fetch_advertisers():
    """Fetch all advertisers from CJ.com API."""
    all_advertisers = []
    
    # Fetch both pages
    for page in range(1, 3):
        response = requests.get(
            f"{BASE_URL}?requestor-cid={REQUESTOR_CID}&advertiser-ids=joined&page-number={page}&records-per-page=50",
            headers={
                'Authorization': f'Bearer {API_TOKEN}',
                'Accept': 'application/xml'
            }
        )
        
        if response.status_code == 200:
            # Parse XML response
            root = ET.fromstring(response.text)
            advertisers = root.find('advertisers')
            
            # Extract advertiser data
            for advertiser in advertisers.findall('advertiser'):
                advertiser_data = {
                    'id': safe_find_text(advertiser, 'advertiser-id'),
                    'name': safe_find_text(advertiser, 'advertiser-name'),
                    'status': safe_find_text(advertiser, 'account-status'),
                    'url': safe_find_text(advertiser, 'program-url'),
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
            
            print(f"Page {page}: Retrieved {len(advertisers.findall('advertiser'))} advertisers")
        else:
            print(f"Error fetching page {page}: {response.status_code}")
    
    return all_advertisers

def save_advertisers(advertisers):
    """Save advertisers data to a JSON file."""
    with open('cj_advertisers.json', 'w') as f:
        json.dump(advertisers, f, indent=2)
    print(f"Saved {len(advertisers)} advertisers to cj_advertisers.json")

def main():
    """Main function to fetch and save CJ.com advertisers data."""
    print("Fetching advertisers from CJ.com API...")
    advertisers = fetch_advertisers()
    save_advertisers(advertisers)
    
    # Print some statistics
    categories = {}
    for advertiser in advertisers:
        category = f"{advertiser['category']['parent']} > {advertiser['category']['child']}"
        categories[category] = categories.get(category, 0) + 1
    
    print("\nAdvertiser Categories:")
    for category, count in sorted(categories.items(), key=lambda x: x[1], reverse=True):
        print(f"- {category}: {count} advertisers")

if __name__ == '__main__':
    main()
