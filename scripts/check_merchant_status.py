#!/usr/bin/env python3
import json
import os
import requests
import time
import base64
import xml.etree.ElementTree as ET

# Constants
BASE_URL = "https://api.linksynergy.com/linklocator/1.0"
UNAPPROVED_FILE = os.path.join(os.path.dirname(os.path.dirname(__file__)), "rakuten-unapproved.json")

# Rakuten API configuration
CLIENT_ID = 'zHPPHp6Vn4uvTeEWuVzOPJb1M5MAc8N8'
CLIENT_SECRET = 'G8LmQeXnePIBHHmt4ThRUh2UR7MdkStq'
ACCESS_TOKEN = 'Mv6jxJgXoghrCo2TItjQtR8IIip25C07'

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

def make_request(url, headers=None, max_retries=3):
    """Make a request with token refresh on 401 and retries on connection errors."""
    global ACCESS_TOKEN
    if headers is None:
        headers = {}
    
    headers['Authorization'] = f'Bearer {ACCESS_TOKEN}'
    
    for attempt in range(max_retries):
        try:
            response = requests.get(url, headers=headers)
            
            if response.status_code == 401:  # Token expired
                new_token = get_auth_token()
                if new_token:
                    ACCESS_TOKEN = new_token
                    headers['Authorization'] = f'Bearer {ACCESS_TOKEN}'
                    response = requests.get(url, headers=headers)
            
            return response
            
        except (requests.exceptions.ConnectionError, requests.exceptions.Timeout) as e:
            if attempt == max_retries - 1:  # Last attempt
                print(f"Failed after {max_retries} attempts: {str(e)}")
                return None
            print(f"Connection error, retrying ({attempt + 1}/{max_retries})...")
            time.sleep(2 ** attempt)  # Exponential backoff

def get_all_merchants_by_status():
    """Get all merchants grouped by their status."""
    # All possible status values from API
    statuses = [
        "approved",
        "approval extended",
        "wait",
        "temp removed",
        "temp rejected", 
        "perm removed",
        "perm rejected",
        "self removed"
    ]
    merchants_by_status = {}
    
    for status in statuses:
        # URL encode the status value
        encoded_status = requests.utils.quote(status)
        url = f"{BASE_URL}/getMerchByAppStatus/{encoded_status}"
        headers = {
            'Accept': 'application/xml'  # Request XML format
        }
        response = make_request(url, headers)
        
        if response is None:
            print(f"Skipping {status} due to connection error")
            continue
            
        print(f"\nResponse for {status}:")
        print(f"Status code: {response.status_code}")
        
        if response.status_code == 200:
            try:
                root = ET.fromstring(response.text)
                merchants = []
                
                # Use correct namespace in XPath
                ns = {'ns1': 'http://endpoint.linkservice.linkshare.com/'}
                for merchant in root.findall('.//ns1:return', ns):
                    mid = merchant.find('ns1:mid', ns)
                    name = merchant.find('ns1:name', ns)
                    if mid is not None and name is not None:
                        merchants.append({
                            'mid': mid.text,
                            'name': name.text
                        })
                merchants_by_status[status] = {str(m['mid']): m for m in merchants}
                print(f"Found {len(merchants)} merchants")
            except ET.ParseError as e:
                print(f"Error parsing XML for {status} merchants: {str(e)}")
        else:
            print(f"Error fetching {status} merchants: {response.status_code}")
            
        time.sleep(1)  # Rate limiting
        
    return merchants_by_status

def main():
    # Read unapproved merchants
    try:
        with open(UNAPPROVED_FILE, 'r') as f:
            data = json.load(f)
            unapproved = data.get('merchants', [])
    except Exception as e:
        print(f"Error reading unapproved merchants file: {str(e)}")
        return
    
    # Get all merchants by status
    print("Fetching current merchant statuses...")
    merchants_by_status = get_all_merchants_by_status()
    
    if not merchants_by_status:
        print("Failed to fetch merchant statuses")
        return
        
    # Track merchants by status
    status_counts = {}
    still_unapplied = []
    
    print("\nAnalyzing merchant statuses...")
    for merchant in unapproved:
        merchant_id = str(merchant.get('id'))
        merchant_name = merchant.get('name', 'Unknown')
        
        # Find merchant's status
        found_status = None
        for status, merchants in merchants_by_status.items():
            if merchant_id in merchants:
                found_status = status
                break
                
        if found_status:
            status_counts[found_status] = status_counts.get(found_status, 0) + 1
        else:
            status_counts['unknown'] = status_counts.get('unknown', 0) + 1
            still_unapplied.append(merchant)
    
    # Print summary
    print("\nStatus Summary:")
    for status, count in status_counts.items():
        print(f"{status}: {count} merchants")
    
    # Save merchants we still need to apply to
    if still_unapplied:
        output_file = os.path.join(os.path.dirname(UNAPPROVED_FILE), "rakuten-still-unapplied.json")
        try:
            with open(output_file, 'w') as f:
                json.dump({
                    "metadata": {
                        "total_unapplied": len(still_unapplied),
                        "last_updated": time.strftime("%Y-%m-%d")
                    },
                    "merchants": still_unapplied
                }, f, indent=2)
            print(f"\nSaved {len(still_unapplied)} unapplied merchants to {output_file}")
        except Exception as e:
            print(f"Error saving unapplied merchants: {str(e)}")
    else:
        print("\nNo merchants left to apply to!")

if __name__ == '__main__':
    main()
