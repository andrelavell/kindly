import json
import os
from datetime import datetime

# Get the project root directory (parent of scripts directory)
PROJECT_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

SOURCE_FILES = {
    'cj': os.path.join(PROJECT_ROOT, 'cj-approved.json'),
    'awin': os.path.join(PROJECT_ROOT, 'awin-approved.json'),
    'direct': os.path.join(PROJECT_ROOT, 'direct-approved.json')
}
OUTPUT_FILE = os.path.join(PROJECT_ROOT, 'approved-merchants.json')

def load_json_file(filepath):
    """Load and parse a JSON file."""
    try:
        with open(filepath, 'r') as f:
            return json.load(f)
    except FileNotFoundError:
        print(f"Warning: {os.path.basename(filepath)} not found")
        return []
    except json.JSONDecodeError:
        print(f"Warning: {os.path.basename(filepath)} contains invalid JSON")
        return []

def update_merchants():
    """Combine all merchant files into one master file."""
    # Dictionary to track merchant counts by network
    network_counts = {'cj': 0, 'awin': 0, 'direct': 0}
    all_merchants = []
    
    # Load and combine all merchant files
    for source, filepath in SOURCE_FILES.items():
        merchants = load_json_file(filepath)
        network_counts[source] = len(merchants)
        all_merchants.extend(merchants)
    
    # Sort merchants by name
    all_merchants.sort(key=lambda x: x.get('name', '').lower())
    
    # Create metadata comment
    total_merchants = len(all_merchants)
    current_time = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    metadata = {
        "metadata": {
            "total_merchants": total_merchants,
            "network_counts": network_counts,
            "last_updated": current_time,
            "_comment": "This is an auto-generated file. Do not edit directly."
        }
    }
    
    # Save combined merchants to output file
    try:
        with open(OUTPUT_FILE, 'w') as f:
            # Write metadata as first item
            json.dump([metadata] + all_merchants, f, indent=2)
        print(f"Updated approved-merchants.json with {total_merchants} merchants")
    except Exception as e:
        print(f"Error saving {os.path.basename(OUTPUT_FILE)}: {str(e)}")

if __name__ == '__main__':
    update_merchants()
