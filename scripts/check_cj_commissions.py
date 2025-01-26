import json

def check_commissions():
    with open('cj-approved.json', 'r') as f:
        merchants = json.load(f)
    
    missing_default = []
    non_percentage = []
    
    for merchant in merchants:
        has_default = False
        for action in merchant.get('actions', []):
            commission = action.get('commission', {})
            if 'default' in commission:
                has_default = True
                # Check if it's not a percentage
                if not commission['default']['value'].endswith('%'):
                    non_percentage.append((merchant['name'], commission['default']['value']))
                break
        
        if not has_default:
            missing_default.append(merchant['name'])
    
    print(f"\nMerchants without default commission ({len(missing_default)}):")
    for name in missing_default:
        print(f"- {name}")
        
    print(f"\nMerchants with non-percentage default commission ({len(non_percentage)}):")
    for name, value in non_percentage:
        print(f"- {name}: {value}")

if __name__ == '__main__':
    check_commissions()
