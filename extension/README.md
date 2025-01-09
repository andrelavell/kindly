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
   ├── Create new tab with Kindly's affiliate tag
   ├── Wait for tab to load (cookie set)
   ├── Close the new tab
   ├── Keep original tab unchanged
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
           ├── Follow "No Existing Affiliate" flow above
           └── Show Success State
   ```

### Cookie Management
- Amazon affiliate cookies persist for 24 hours
- Opening and closing tab ensures cookie is set
- Original shopping experience remains uninterrupted
- No page refreshes required

### States & Persistence

1. **Success State**
   - Shows "Donation Activated!" message
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

### Visual Design & UI States

### 1. Initial State (Activate Button)
```
┌────────────────────────────┐
│    🎁 Activate Donation    │
│                           │
│    Support charity with   │
│    your Amazon purchase   │
│                           │
│    [Activate Now Button]  │
└────────────────────────────┘
```
- Clean, minimal design
- Prominent "Activate Now" button
- Soft background color (#F9FAFB)
- Heart icon in brand color
- Rounded corners (12px)
- Subtle drop shadow

### 2. Choice Dialog
```
┌────────────────────────────┐
│   Choose Your Impact 🤝    │
│                           │
│ [Support Creator Button]  │
│    Keep current affiliate │
│                           │
│ [Support Charity Button]  │
│    Switch to Kindly      │
│                           │
│    [Close Button]         │
└────────────────────────────┘
```
- Modal overlay with blur effect
- Equal prominence for both options
- Clear explanatory text
- Easy-to-close design
- Hover states for buttons
- Consistent brand styling

### 3. Success State
```
┌────────────────────────────┐
│   ✨ Donation Active! ✨   │
│                           │
│    Your purchase will     │
│    support charity        │
│                           │
│    [View Impact Button]   │
└────────────────────────────┘
```
- Celebratory animation
- Green success color (#10B981)
- Checkmark icon
- Temporary toast notification
- Auto-dismissing after 3s
- Optional persistent badge

### 4. Login/Signup Prompt
```
┌────────────────────────────┐
│   Join Kindly to Start    │
│                           │
│ [Continue with Google]    │
│                           │
│ [Continue with Email]     │
│                           │
│ Already have an account?  │
│ [Sign In]                │
└────────────────────────────┘
```
- Clean authentication form
- Social login options
- Email/password fields
- Password requirements
- Error state handling
- Loading states for buttons

### Design System
- **Colors**
  - Primary: #6366F1 (Indigo)
  - Success: #10B981 (Green)
  - Warning: #F59E0B (Yellow)
  - Error: #EF4444 (Red)
  - Text: #111827 (Near Black)
  - Background: #F9FAFB (Light Gray)

- **Typography**
  - Font: Inter
  - Headings: 18px/24px
  - Body: 14px/20px
  - Buttons: 16px/24px
  - Semi-bold for headings
  - Regular for body text

- **Spacing**
  - Padding: 16px
  - Gap: 12px
  - Margins: 8px/16px
  - Button height: 40px

- **Animations**
  - Transitions: 150ms ease
  - Success animation: 300ms
  - Fade effects: 200ms
  - Loading spinner: 750ms

### Accessibility
- High contrast ratios (WCAG AA)
- Keyboard navigation support
- Screen reader friendly
- Focus states for all interactive elements
- Aria labels and roles
- Reduced motion support

### Firebase Authentication & Persistence

### Overview
The extension requires users to be authenticated to function. Firebase Authentication is used with persistent login to ensure users remain logged in across browser sessions.

### Authentication Flow

1. **Initial Check**
   ```
   On Extension Load:
   ├── Check Firebase Auth State
   │   ├── If logged in → Enable extension features
   │   └── If not logged in → Show login/signup prompt
   └── Initialize persistent authentication
   ```

2. **Persistence Implementation**
   ```
   Firebase Configuration:
   ├── Use browserLocalPersistence
   │   └── Credentials persist even after browser restart
   ├── Enable offline persistence
   │   └── Works without internet connection
   └── Automatic session restoration
       └── No manual re-login required
   ```

3. **User Session Management**
   - Sessions persist across browser restarts
   - Automatic token refresh
   - Silent authentication refresh
   - Background state synchronization

### Security & Privacy

1. **Token Management**
   - Secure token storage in browser
   - Automatic token rotation
   - Encrypted local storage

2. **Error Handling**
   ```
   Authentication Errors:
   ├── Network issues → Retry with exponential backoff
   ├── Invalid tokens → Force re-authentication
   └── Session expiry → Silent refresh
   ```

### Implementation Details

```javascript
// Firebase persistence configuration
await setPersistence(auth, browserLocalPersistence);

// Auth state listener
onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in
    enableExtensionFeatures();
  } else {
    // User is signed out
    showLoginPrompt();
  }
});
```

### Implementation Notes

- Success State is stored in extension storage
- Only URL parameters are checked for affiliate tags
- No cookie manipulation required
- Page redirects only happen when applying Kindly's affiliate tag
- Creator support choice keeps original URL
- All states managed through extension storage
- Console logs show detected affiliate tags for debugging
