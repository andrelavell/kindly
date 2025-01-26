import json
import requests
import time
import os
import xml.etree.ElementTree as ET
from urllib.parse import urlparse
import datetime
import base64

# Get the project root directory (parent of scripts directory)
PROJECT_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
RAKUTEN_APPROVED_FILE = os.path.join(PROJECT_ROOT, 'rakuten-approved.json')
APPROVED_MERCHANTS_FILE = os.path.join(PROJECT_ROOT, 'approved-merchants.json')
RAKUTEN_ADVERTISERS_FILE = os.path.join(PROJECT_ROOT, 'rakuten_advertisers.json')
RAKUTEN_CATEGORIES_FILE = os.path.join(PROJECT_ROOT, 'rakuten_categories.json')

# Rakuten API configuration
CLIENT_ID = 'zHPPHp6Vn4uvTeEWuVzOPJb1M5MAc8N8'
CLIENT_SECRET = 'G8LmQeXnePIBHHmt4ThRUh2UR7MdkStq'
ACCESS_TOKEN = 'Mv6jxJgXoghrCo2TItjQtR8IIip25C07'
BASE_URL = 'https://api.linksynergy.com/linklocator/1.0'

# Manual affiliate links for merchants where API doesn't return links
MANUAL_AFFILIATE_LINKS = {
    '50407': {
        'name': 'ChicMe US',
        'link': 'https://click.linksynergy.com/fs-bin/click?id=zfJlPkCWHLQ&offerid=1329800&type=3'
    },
    '38726': {
        'name': 'FlowerShopping.com',
        'link': 'https://click.linksynergy.com/fs-bin/click?id=zfJlPkCWHLQ&offerid=801368&type=3'
    },
    '815': {
        'name': 'Sharper Image',
        'link': 'https://click.linksynergy.com/fs-bin/click?id=zfJlPkCWHLQ&offerid=1429613.10000942&type=3'
    }
}

def get_auth_token():
    """Get a new authentication token."""
    auth_url = 'https://api.linksynergy.com/token'
    
    # Create token-key by base64 encoding client_id:client_secret
    token_key = base64.b64encode(f"{CLIENT_ID}:{CLIENT_SECRET}".encode()).decode()
    
    headers = {
        'Authorization': f'Basic {token_key}',
        'Content-Type': 'application/x-www-form-urlencoded',
    }
    data = {
        'grant_type': 'client_credentials',
        'scope': '4425236'
    }
    
    try:
        response = requests.post(auth_url, headers=headers, data=data)
        if response.status_code == 200:
            return response.json().get('access_token')
        else:
            print(f"Error getting auth token: {response.status_code}")
            return None
    except Exception as e:
        print(f"Error getting auth token: {str(e)}")
        return None

def make_request(url, headers=None):
    """Make a request with token refresh on 401."""
    global ACCESS_TOKEN
    if headers is None:
        headers = {}
    
    headers['Authorization'] = f'Bearer {ACCESS_TOKEN}'
    response = requests.get(url, headers=headers)
    
    if response.status_code == 401:  # Token expired
        new_token = get_auth_token()
        if new_token:
            ACCESS_TOKEN = new_token
            headers['Authorization'] = f'Bearer {ACCESS_TOKEN}'
            response = requests.get(url, headers=headers)
    
    return response

def get_previous_merchants():
    """Get previously saved merchant data."""
    try:
        with open(RAKUTEN_APPROVED_FILE, 'r') as f:
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

def get_advertisers():
    """Fetch only approved advertisers from Rakuten API."""
    url = f'{BASE_URL}/getMerchByAppStatus/approved'
    headers = {
        'accept': 'application/xml',
    }
    
    try:
        response = make_request(url, headers)
        
        if response.status_code == 200:
            # Parse XML response
            root = ET.fromstring(response.text)
            merchants = []
            
            # Extract merchant data from XML
            # The response has ns1:return elements for each merchant
            for merchant in root.findall('.//{http://endpoint.linkservice.linkshare.com/}return'):
                merchant_data = {
                    'id': merchant.find('.//{http://endpoint.linkservice.linkshare.com/}mid').text if merchant.find('.//{http://endpoint.linkservice.linkshare.com/}mid') is not None else '',
                    'name': merchant.find('.//{http://endpoint.linkservice.linkshare.com/}name').text if merchant.find('.//{http://endpoint.linkservice.linkshare.com/}name') is not None else '',
                    'categories': merchant.find('.//{http://endpoint.linkservice.linkshare.com/}categories').text.strip() if merchant.find('.//{http://endpoint.linkservice.linkshare.com/}categories') is not None else '',
                    'offer': {
                        'name': merchant.find('.//{http://endpoint.linkservice.linkshare.com/}offerName').text if merchant.find('.//{http://endpoint.linkservice.linkshare.com/}offerName') is not None else '',
                        'commission': merchant.find('.//{http://endpoint.linkservice.linkshare.com/}commissionTerms').text if merchant.find('.//{http://endpoint.linkservice.linkshare.com/}commissionTerms') is not None else ''
                    }
                }
                merchants.append(merchant_data)
            
            return merchants
        elif response.status_code == 429:  # Rate limit
            print("Rate limit hit, waiting 60 seconds...")
            time.sleep(60)
            return get_advertisers()
        else:
            print(f"Error fetching advertisers: {response.status_code}")
            return None
            
    except Exception as e:
        print(f"Error fetching advertisers: {str(e)}")
        return None

def get_advertiser_details(advertiser_id):
    """Get additional details for a specific advertiser."""
    url = f"{BASE_URL}/getMerchByID/{advertiser_id}"
    headers = {
        'Authorization': f'Bearer {ACCESS_TOKEN}',
        'Accept': 'application/xml'
    }
    
    try:
        response = make_request(url, headers)
        
        if response.status_code == 200:
            root = ET.fromstring(response.text)
            return_elem = root.find('.//{http://endpoint.linkservice.linkshare.com/}return')
            
            if return_elem is not None:
                # Extract offer details
                offer_elem = return_elem.find('.//{http://endpoint.linkservice.linkshare.com/}offer')
                commission = ''
                if offer_elem is not None:
                    commission_terms = offer_elem.find('.//{http://endpoint.linkservice.linkshare.com/}commissionTerms')
                    commission = commission_terms.text if commission_terms is not None else ''
                
                # Get categories
                categories = return_elem.find('.//{http://endpoint.linkservice.linkshare.com/}categories')
                categories_text = categories.text.strip() if categories is not None and categories.text else ''
                
                # Get name
                name_elem = return_elem.find('.//{http://endpoint.linkservice.linkshare.com/}name')
                name = name_elem.text if name_elem is not None else ''
                
                return {
                    'name': name,
                    'categories': categories_text,
                    'offer': {'commission': commission}
                }
            
        elif response.status_code == 429:  # Rate limit
            print("Rate limit hit, waiting 60 seconds...")
            time.sleep(60)
            return get_advertiser_details(advertiser_id)
        else:
            print(f"Error fetching advertiser details: {response.status_code}")
            return None
            
    except Exception as e:
        print(f"Error fetching advertiser details: {str(e)}")
        return None

def get_advertiser_links(advertiser_id):
    """Get affiliate links for a specific advertiser."""
    # First check if we have manual links for this advertiser
    if str(advertiser_id) in MANUAL_AFFILIATE_LINKS:
        return [{'clickURL': MANUAL_AFFILIATE_LINKS[str(advertiser_id)]['link'], 'landURL': '', 'text': 'Shop at ' + get_advertiser_details(advertiser_id)['name']}]
    
    # Get today's date in MMDDYYYY format for the API
    today = datetime.datetime.now().strftime('%m%d%Y')
    
    url = f"{BASE_URL}/getTextLinks/{advertiser_id}/-1/01012015/{today}/-1/1"
    headers = {
        'Authorization': f'Bearer {ACCESS_TOKEN}',
        'Accept': 'application/xml'
    }
    
    try:
        response = make_request(url, headers)
        
        if response.status_code == 200:
            root = ET.fromstring(response.text)
            links = []
            
            # Extract link data from XML
            for link in root.findall('.//{http://endpoint.linkservice.linkshare.com/}return'):
                click_url = link.find('.//{http://endpoint.linkservice.linkshare.com/}clickURL').text if link.find('.//{http://endpoint.linkservice.linkshare.com/}clickURL') is not None else ''
                if click_url and '&subid=0' in click_url:
                    click_url = click_url.replace('&subid=0', '')
                
                link_data = {
                    'clickURL': click_url,
                    'landURL': link.find('.//{http://endpoint.linkservice.linkshare.com/}landURL').text if link.find('.//{http://endpoint.linkservice.linkshare.com/}landURL') is not None else '',
                    'text': link.find('.//{http://endpoint.linkservice.linkshare.com/}textDisplay').text if link.find('.//{http://endpoint.linkservice.linkshare.com/}textDisplay') is not None else ''
                }
                links.append(link_data)
            
            return links
            
        elif response.status_code == 429:  # Rate limit
            print("Rate limit hit, waiting 60 seconds...")
            time.sleep(60)
            return get_advertiser_links(advertiser_id)
        else:
            print(f"Error fetching advertiser links: {response.status_code}")
            return None
            
    except Exception as e:
        print(f"Error fetching advertiser links: {str(e)}")
        return None

def get_category_mappings():
    """Load category mappings from the JSON file."""
    try:
        with open(RAKUTEN_CATEGORIES_FILE, 'r') as f:
            data = json.load(f)
            return data.get('networks', {}).get('US', {}).get('categories', {})
    except Exception as e:
        print(f"Warning: Could not load category mappings: {str(e)}")
        return {}

def update_approved_merchants(rakuten_data):
    """Update the approved-merchants.json file with the latest data."""
    try:
        # Read existing data
        with open(APPROVED_MERCHANTS_FILE, 'r') as f:
            data = json.load(f)
            
        # Get metadata
        metadata = data[0]['metadata']
        network_counts = metadata['network_counts']
        
        # Update Rakuten count
        network_counts['rakuten'] = len(rakuten_data)
        metadata['total_merchants'] = sum(network_counts.values())
        metadata['last_updated'] = datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        
        # Keep metadata and update direct merchants to new format
        new_data = [data[0]]
        
        # Add all non-Rakuten merchants
        for item in data[1:]:
            if item.get('network') == 'direct':
                # Update direct merchants to new format if they haven't been updated yet
                if 'name' in item:
                    item['merchant'] = item.pop('name')
            if item.get('network') != 'rakuten':
                new_data.append(item)
        
        # Add new Rakuten merchants
        new_data.extend(rakuten_data)
        
        # Sort by merchant name (case-insensitive)
        new_data = [new_data[0]] + sorted(new_data[1:], key=lambda x: x.get('merchant', '').lower())
        
        # Write updated data
        if atomic_write_json(APPROVED_MERCHANTS_FILE, new_data):
            print("Successfully updated approved-merchants.json")
        else:
            print("Failed to update approved-merchants.json")
            
    except Exception as e:
        print(f"Error updating approved-merchants.json: {str(e)}")

def main():
    # Get previous merchant data
    previous_merchants = get_previous_merchants()
    
    # Get fresh data from API
    advertisers = get_advertisers()
    
    if not advertisers:
        print("Failed to fetch advertisers")
        return
    
    print(f"Processing {len(advertisers)} merchants...")
    complete_data = []
    new_merchants = []
    missing_links = []
    
    for advertiser in advertisers:
        try:
            advertiser_id = str(advertiser['id'])
            
            # Get additional details for the advertiser
            details = get_advertiser_details(advertiser_id)
            
            if not details:
                continue
                
            # Get affiliate links for the advertiser
            links = get_advertiser_links(advertiser_id)
            
            if not links:
                missing_links.append(advertiser['name'])
                links = []
            
            # Get primary link (either manual or first API link)
            primary_link = None
            if links:
                primary_link = links[0]
            
            # Get domain from primary link or details
            domain = ''
            if primary_link and primary_link.get('landURL'):
                domain = primary_link['landURL'].replace('https://', '').replace('http://', '').split('/')[0]
                # Strip www. from domain
                if domain.startswith('www.'):
                    domain = domain[4:]
            elif details.get('domains'):
                domain = details['domains'][0] if details['domains'] else ''
                if domain.startswith('www.'):
                    domain = domain[4:]

            # Get category mappings
            category_mappings = get_category_mappings()
            
            # Format merchant data
            merchant_data = {
                'id': advertiser_id,
                'merchant': advertiser['name'],
                'network': 'rakuten',
                'status': 'Active',  # All merchants we get are approved/active
                'domain': domain,
                'category': details.get('categories', '').split()[0] if details.get('categories') else '',
                'childCategory': details.get('categories', '').split()[1] if details.get('categories', '').split()[1:] else '',
                'currency': 'USD',
                'region': 'United States',
                'affiliateLink': primary_link['clickURL'] if primary_link else ''
            }

            # Map category names if available
            category = str(merchant_data['category'])
            child_category = str(merchant_data['childCategory'])
            if category in category_mappings:
                merchant_data['category'] = category_mappings[category]
            if child_category in category_mappings:
                merchant_data['childCategory'] = category_mappings[child_category]
            
            # Format commission data
            commission = details.get('offer', {}).get('commission', '')
            if commission:
                if '%' in commission:
                    value = commission.split('%')[0].split('above')[-1].strip()
                    merchant_data['commissionValue'] = f"{value}%"
                    merchant_data['commissionType'] = 'percentage'
                elif 'flat' in commission.lower():
                    # Extract the flat commission amount
                    value = commission.split('above')[-1].strip().split()[0]
                    merchant_data['commissionValue'] = f"${value}"
                    merchant_data['commissionType'] = 'fixed'
                else:
                    value = commission.strip('$').strip()
                    merchant_data['commissionValue'] = f"${value}"
                    merchant_data['commissionType'] = 'fixed'
            else:
                merchant_data['commissionValue'] = ''
                merchant_data['commissionType'] = ''
            
            if advertiser_id not in previous_merchants:
                new_merchants.append(f"- {advertiser['name']} (ID: {advertiser_id})")
                
            complete_data.append(merchant_data)
            
            # Sleep briefly to avoid rate limiting
            time.sleep(1)
            
        except Exception as e:
            print(f"Error processing merchant {advertiser['name']}: {str(e)}")
            continue
    
    # Write data to file
    if atomic_write_json(RAKUTEN_APPROVED_FILE, complete_data):
        print(f"\nSuccessfully processed {len(complete_data)} merchants")
        print("Successfully wrote", len(complete_data), "merchants to file")
    else:
        print("Failed to write merchants to file")
        return
        
    # Update approved merchants
    update_approved_merchants(complete_data)
    
    if missing_links:
        print("\nMerchants missing affiliate links:")
        for name in missing_links:
            print(f"- {name}")
    
    if new_merchants:
        print("\nNew merchants found:")
        for merchant in new_merchants:
            print(merchant)

if __name__ == '__main__':
    main()
