import json

# Load the current approved merchants
with open('awin-approved.json', 'r') as f:
    current = json.load(f)
    current_ids = set(m['id'] for m in current)
    current_names = {m['id']: m['name'] for m in current}

# Load the raw response with all merchants
with open('raw_awin_response.json', 'r') as f:
    raw = json.load(f)
    raw_ids = set(m['id'] for m in raw)
    raw_names = {m['id']: m['name'] for m in raw}

# Find missing merchants
missing_ids = raw_ids - current_ids

print("\nMissing merchants:")
for merchant_id in missing_ids:
    print(f"- {raw_names[merchant_id]} (ID: {merchant_id})")
