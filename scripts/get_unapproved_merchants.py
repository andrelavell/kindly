import json
import requests
import xml.etree.ElementTree as ET
import os

# Get the project root directory
PROJECT_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
RAKUTEN_UNAPPROVED_FILE = os.path.join(PROJECT_ROOT, 'rakuten-unapproved.json')
RAKUTEN_APPROVED_FILE = os.path.join(PROJECT_ROOT, 'rakuten-approved.json')

def get_approved_merchant_ids():
    try:
        with open(RAKUTEN_APPROVED_FILE, 'r') as f:
            data = json.load(f)
            return {m['id'] for m in data}
    except FileNotFoundError:
        return set()

def get_all_merchants():
    url = 'https://api.linksynergy.com/advertisersearch/1.0'
    headers = {
        'accept': 'application/xml',
        'authorization': 'Bearer mhZJBZPkuTzct6Xxxz6sVbL127FoQ9zu'
    }
    
    response = requests.get(url, headers=headers)
    root = ET.fromstring(response.text)
    
    merchants = []
    for merchant in root.findall('.//merchant'):
        mid = merchant.find('mid').text
        name = merchant.find('merchantname').text
        
        # Skip test accounts and non-relevant merchants
        skip_terms = ['test', 'Test:', 'O2O:', 'LinkShare USA', 'LinkShare Marketing']
        if any(term in name for term in skip_terms):
            continue
            
        merchants.append({
            'id': mid,
            'name': name
        })
    
    return merchants

def main():
    # Get approved merchant IDs
    approved_ids = get_approved_merchant_ids()
    
    # Get all merchants
    all_merchants = get_all_merchants()
    
    # Filter out approved merchants
    unapproved = [m for m in all_merchants if m['id'] not in approved_ids]
    
    # Sort by name
    unapproved.sort(key=lambda x: x['name'])
    
    # Add metadata
    output = {
        'metadata': {
            'total_unapproved': len(unapproved),
            'last_updated': '2025-01-24'
        },
        'merchants': unapproved
    }
    
    # Write to file
    with open(RAKUTEN_UNAPPROVED_FILE, 'w') as f:
        json.dump(output, f, indent=2)
    
    print(f"Found {len(unapproved)} unapproved merchants")
    print(f"Saved to {RAKUTEN_UNAPPROVED_FILE}")

if __name__ == '__main__':
    main()
