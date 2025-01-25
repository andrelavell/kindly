# Affiliate Network Data Manager

## Overview
This tool automatically fetches and updates information about approved merchants from multiple affiliate networks (AWIN, CJ Affiliate, and Rakuten).

## File Structure
### Scripts
- `fetch_awin_data.py` - Fetches AWIN merchant data
- `fetch_awin_declined.py` - Fetches AWIN declined/rejected merchant data
- `fetch_cj_data.py` - Fetches CJ Affiliate merchant data
- `fetch_rakuten_data.py` - Fetches Rakuten merchant data
- `run-awin` - Command-line shortcut for AWIN updates
- `run-cj` - Command-line shortcut for CJ updates
- `run-rakuten` - Command-line shortcut for Rakuten updates

### Data Files
- `awin-approved.json` - Processed AWIN merchant data
- `awin-declined.json` - Processed AWIN declined merchant data
- `cj-approved.json` - Processed CJ merchant data
- `rakuten-approved.json` - Processed Rakuten merchant data

## Merchant Data Structure
All networks use a consistent data structure:
```json
{
    "id": "merchant_id",
    "name": "Merchant Name",
    "network": "awin|cj|rakuten",
    "description": "Merchant description",
    "validDomains": [{"domain": "merchant.com"}],
    "logoUrl": "https://path/to/logo.png",
    "affiliateLink": "https://affiliate.link/...",
    "status": "Active",
    "primaryRegion": "United States",
    "currencyCode": "USD"
}
```

## Usage
1. Ensure you have Python and the virtual environment set up:
```bash
python3 -m venv venv
./venv/bin/pip install requests
```

2. Run the scripts using the command-line shortcuts:
```bash
run-awin     # Update AWIN merchants
run-cj       # Update CJ merchants
run-rakuten  # Update Rakuten merchants
```

## Available Commands

We have several commands to manage our affiliate merchant data:

### Main Command

- `update-merchants`: Updates all merchant data from every network and combines them into a single file
  - Fetches latest merchants from CJ
  - Fetches latest merchants from AWIN
  - Fetches latest merchants from Rakuten
  - Combines CJ, AWIN, Rakuten, and direct merchants into `approved-merchants.json`

### Individual Network Commands

- `run-cj`: Updates only Commission Junction (CJ) merchants
  - Fetches latest data from CJ's API
  - Updates `cj-approved.json`
  - Automatically updates the combined `approved-merchants.json`

- `run-awin`: Updates only AWIN merchants
  - Fetches latest data from AWIN's API
  - Updates `awin-approved.json` and `awin-declined.json`
  - Automatically updates the combined `approved-merchants.json`

- `run-rakuten`: Updates only Rakuten merchants
  - Fetches latest data from Rakuten's API
  - Updates `rakuten-approved.json`
  - Automatically updates the combined `approved-merchants.json`

- `run-direct`: Updates master file with direct merchant changes
  - No API calls (just combines existing files)
  - Use after editing `direct-approved.json`
  - Updates the combined `approved-merchants.json`

### Output Files

- `approved-merchants.json`: Master file containing all approved merchants from all networks
- `cj-approved.json`: Commission Junction merchants only
- `awin-approved.json`: AWIN merchants only
- `awin-declined.json`: AWIN declined merchants only
- `rakuten-approved.json`: Rakuten merchants only
- `direct-approved.json`: Direct affiliate relationships (e.g., Amazon, eBay)

### Workflow

1. To update all merchant data at once:
```bash
update-merchants
```

2. To update a specific network:
```bash
run-cj       # For CJ merchants only
run-awin     # For AWIN merchants only
run-rakuten  # For Rakuten merchants only
run-direct   # After editing direct-approved.json
```

3. For direct merchants (Amazon, eBay, etc.):
   - Edit `direct-approved.json` manually
   - Run `run-direct` to refresh the combined file
   - Or run `update-merchants` to update everything

## Network-Specific Details

### AWIN
- Publisher ID: 7382070
- Affiliate links format: `https://www.awin1.com/awclick.php?mid=[merchant_id]&id=1818430`

### CJ Affiliate
- Publisher ID: 7382070
- Affiliate links format: XML-based from API response

### Rakuten
- Publisher ID: [Insert Publisher ID]
- Affiliate links format: [Insert Affiliate links format]

## Custom Tracking Parameters
Each network supports custom tracking parameters for member-specific tracking:

### Rakuten
- Parameter: `u1`
- Format: `&u1=member_123`
- Example:
```
https://click.linksynergy.com/fs-bin/click?id=XXX&offerid=YYY&type=3&subid=0&u1=member_123
```

### AWIN
- Parameter: `clickref`
- Format: `&clickref=member_123`
- Example:
```
https://www.awin1.com/cread.php?awinmid=XXX&awinaffid=YYY&clickref=member_123
```

### CJ Affiliate
- Parameter: `sid`
- Format: `&sid=member_123`
- Example:
```
http://www.jdoqocy.com/click-XXX-YYY?sid=member_123
```

## Automatic Updates
Run either script anytime to:
- Fetch current approved merchants
- Track new merchants added since last run
- Update merchant information and affiliate links
- Generate new version of the data file

## Location
All files are located in: `/Users/deandremoore/Desktop/kindly/`
