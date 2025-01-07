# Kindly Chrome Extension

## Affiliate Detection & Donation Flow

### Initial Page Load

When a user visits Amazon.com, the extension follows this flow:

1. **Site Detection**
   - Check if current site is Amazon.com
   - If not Amazon.com, do nothing

2. **Affiliate Tag Check**
   - Check URL parameters for affiliate tags
   - Three possible states:
     1. Kindly's affiliate tag exists → Show Success State
     2. Another affiliate tag exists → Show Choice Dialog
     3. No affiliate tag exists → Show Activate Button

### Affiliate Detection Details

```
URL Parameter Check:
├── Look for 'tag' parameter
├── Parse value for affiliate ID
└── Compare against Kindly's affiliate ID
```

### Activation Flow

When user clicks "Activate Donation":

1. **No Existing Affiliate**
   ```
   If no affiliate tag was found:
   ├── Add Kindly's affiliate tag to URL
   ├── Redirect to new URL
   └── Show Success State
   ```

2. **Existing Affiliate Found**
   ```
   If another affiliate tag exists:
   └── Show Choice Dialog
       ├── Option 1: "Support Creator"
       │   └── Show message: "Your purchase will support the creator"
       │       (Keep original affiliate tag)
       │
       └── Option 2: "Donate to Charity"
           ├── Replace with Kindly's affiliate tag
           ├── Redirect to new URL
           └── Show Success State
   ```

### States & Persistence

1. **Success State**
   - Shows "Donation Activated!" message
   - Persists after page refresh
   - Stored in extension storage
   - Prevents popup from showing again

2. **Activate Button State**
   - Shows when donations aren't activated
   - Default state for new users
   - Shows when no affiliate tag is present

3. **Choice Dialog**
   - Shows when another affiliate tag is detected
   - Lets user choose between supporting creator or charity
   - Clean, informative interface

### Implementation Notes

- Success State is stored in extension storage
- Only URL parameters are checked for affiliate tags
- No cookie manipulation required
- Page redirects only happen when applying Kindly's affiliate tag
- Creator support choice keeps original URL
- All states managed through extension storage
- Console logs show detected affiliate tags for debugging
