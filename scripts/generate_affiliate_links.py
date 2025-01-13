import xml.etree.ElementTree as ET
import json
import requests
import time

# CJ.com API configuration
API_TOKEN = '6ay1sz7r3jq7j0g1egr9986pmx'
WEBSITE_ID = '101335466'  # Your PID (Publisher ID)

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
                    return {
                        'url': click_url.text,
                        'name': link.find('link-name').text if link.find('link-name') is not None else '',
                        'description': link.find('description').text if link.find('description') is not None else '',
                        'commission': link.find('sale-commission').text if link.find('sale-commission') is not None else ''
                    }
            
        elif response.status_code == 429:  # Rate limit hit
            print("Rate limit hit, waiting 60 seconds...")
            time.sleep(60)
            return get_affiliate_link(advertiser_id)
            
        return None
    except Exception as e:
        print(f"Error fetching link for advertiser {advertiser_id}: {str(e)}")
        return None

def load_advertisers():
    """Load advertisers from the JSON file."""
    with open('cj_advertisers.json', 'r') as f:
        return json.load(f)

def save_affiliate_data(advertisers_with_links):
    """Save the complete data with affiliate links to a JSON file."""
    with open('cj_advertisers.json', 'w') as f:
        json.dump(advertisers_with_links, f, indent=2)

def main():
    print("Loading advertisers...")
    advertisers = load_advertisers()
    
    print("Fetching affiliate links for each advertiser...")
    links_added = 0
    
    for i, advertiser in enumerate(advertisers):
        print(f"\nProcessing {advertiser['name']} ({i+1}/{len(advertisers)})...")
        affiliate_data = get_affiliate_link(advertiser['id'])
        
        if affiliate_data:
            advertiser['affiliate'] = affiliate_data
            links_added += 1
            print(f"✓ Added affiliate link for {advertiser['name']}")
            print(f"  Link: {affiliate_data['url']}")
            print(f"  Commission: {affiliate_data['commission']}")
        else:
            advertiser['affiliate'] = None
            print(f"✗ No affiliate link found for {advertiser['name']}")
        
        # Add a small delay between requests to avoid rate limiting
        time.sleep(2.5)
    
    print("\nSaving data with affiliate links...")
    save_affiliate_data(advertisers)
    
    print(f"\nSummary:")
    print(f"- Total advertisers processed: {len(advertisers)}")
    print(f"- Affiliate links added: {links_added}")
    print(f"- Success rate: {(links_added/len(advertisers)*100):.1f}%")
    
    # Print sample of successful links
    print("\nSample of advertisers with affiliate links:")
    sample_count = 0
    for adv in advertisers:
        if adv.get('affiliate') and sample_count < 3:
            print(f"\n- {adv['name']}:")
            print(f"  Link: {adv['affiliate']['url']}")
            print(f"  Commission: {adv['affiliate']['commission']}")
            print(f"  Description: {adv['affiliate']['description']}")
            sample_count += 1

if __name__ == '__main__':
    main()
