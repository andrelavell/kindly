# Affiliate Network Data Manager

## Overview
This tool automatically fetches and updates information about approved merchants from multiple affiliate networks (AWIN and CJ Affiliate).

## File Structure
### Scripts
- `fetch_awin_data.py` - Fetches AWIN merchant data
- `fetch_cj_data.py` - Fetches CJ Affiliate merchant data
- `run-awin` - Command-line shortcut for AWIN updates
- `run-cj` - Command-line shortcut for CJ updates

### Data Files
- `awin-approved.json` - Processed AWIN merchant data
- `cj-approved.json` - Processed CJ merchant data

## Merchant Data Structure
Both networks use a consistent data structure:
```json
{
    "id": "merchant_id",
    "name": "Merchant Name",
    "network": "awin|cj",
    "description": "Merchant description",
    "displayUrl": "https://merchant.com",
    "logoUrl": "https://path/to/logo.png",
    "affiliateLink": "https://affiliate.link/...",
    "status": "Active",
    "primarySector": "Category",
    "primaryRegion": "United States of America"
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
run-awin  # Update AWIN merchants
run-cj    # Update CJ merchants
```

## Network-Specific Details

### AWIN
- Publisher ID: 7382070
- Affiliate links format: `https://www.awin1.com/awclick.php?mid=[merchant_id]&id=1818430`

### CJ Affiliate
- Publisher ID: 7382070
- Affiliate links format: XML-based from API response

## Automatic Updates
Run either script anytime to:
- Fetch current approved merchants
- Track new merchants added since last run
- Update merchant information and affiliate links
- Generate new version of the data file

## Location
All files are located in: `/Users/deandremoore/Desktop/kindly/`
