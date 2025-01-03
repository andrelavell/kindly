# Community Feed Component Documentation

## Overview
The Community Feed is a real-time display component that shows recent donations made through shopping activities. It creates a live, dynamic feed of user donations, their impacts, and the associated stores.

## Core Functionality

### Constants
- `MAX_IMPACTS`: Maximum number of impacts shown in the feed (currently 3)

### Amount Generation
```typescript
generateAmount(store: string): number
```
- Generates realistic purchase amounts for each store
- Uses store-specific base amounts:
  - Amazon: $35
  - Target: $45
  - Walmart: $40
  - Best Buy: $85
  - Apple: $120
  - Nike: $65
  - Starbucks: $8
  - Barnes & Noble: $25
  - Home Depot: $55
  - Whole Foods: $50
  - Default for unlisted stores: $30

- Calculation:
  1. Takes base amount for store
  2. Applies random multiplier between 0.5 and 1.5
  3. Adds random cents (0-99)
  4. Returns final amount rounded to 2 decimal places

### Donation Calculation
- Random percentage between 2-5% of purchase amount
- Formula: `amount * (2 + Math.random() * 3) / 100`
- Examples:
  - 2% (minimum): $100 purchase = $2.00 donation
  - 3.5% (middle): $100 purchase = $3.50 donation
  - 5% (maximum): $100 purchase = $5.00 donation

### Impact Messages
Organized into three tiers based on donation amount:

#### Small Donations ($0-5)
Used for donations under $5, includes messages like:
- "supported local food banks"
- "helped fund youth education"
- "supported clean water initiatives"
- [See impactsByRange.small for full list]

#### Medium Donations ($5-15)
Used for donations between $5-15, includes messages like:
- "supported families in need"
- "funded job training programs"
- "supported education initiatives"
- [See impactsByRange.medium for full list]

#### Large Donations ($15+)
Used for donations over $15, includes messages like:
- "supported global health initiatives"
- "helped fund education programs"
- "supported humanitarian aid"
- [See impactsByRange.large for full list]

### Impact Generation
```typescript
generateImpact(timestamp?: number): Impact
```
Creates a new impact entry with:
1. Random store selection
2. Generated purchase amount
3. Calculated donation
4. Random first name + last initial using faker.js
5. Impact message based on donation amount

### Animation and Transitions
The feed uses Framer Motion for smooth animations:

#### New Items
- Fade in (opacity: 0 to 1)
- Slide down (y: -20 to 0)
- Layout transitions for existing items

#### Live Indicator
- Continuous pulse animation
- Scale: [1, 1.5, 1]
- Duration: 2 seconds
- Infinite repeat
- Green glow effect using box-shadow

#### Gradient Overlay
- Indicates more content below
- Animated opacity: [1, 0.8, 1]
- Subtle y-axis movement: [0, 2, 0]
- 3-second animation cycle

### Time Display
- Shows "Just now" for first 5 seconds
- Then shows "Xs ago"
- Updates every second using useEffect interval

### Feed Updates
- Initializes with 3 impacts at different timestamps
- Updates every 4 seconds with a new impact
- Maintains maximum of 3 items (removes oldest)

### Visual Design
- Cards:
  - White to light gray gradient background
  - Shadow effect: `shadow-[0_8px_30px_rgba(0,0,0,0.12)]`
  - Subtle border: `border-gray-200/60`
  - Hover effects:
    - Enhanced shadow
    - Scale up by 1.02
    - Darker border
  - Smooth transitions (200ms duration)

### Component Structure
```tsx
ImpactCard
- Store logo (with brand color background)
- User name
- Store name
- Time ago
- Donation amount (rose-500 color)
- Purchase amount
- Impact message
```

## Dependencies
- @faker-js/faker: For generating random user names
- framer-motion: For animations
- tailwindcss: For styling
- React hooks: useState, useEffect

## Important Notes
1. The feed is designed to be real-time and self-updating
2. All monetary values are in USD
3. Store logos and colors should be provided via storeBrands utility
4. Impact messages are carefully worded to be general rather than specific
5. Time displays are relative and auto-updating

## Potential Customization Points
1. Adjust MAX_IMPACTS for different number of visible items
2. Modify baseAmounts for different store price ranges
3. Change donation percentage range (currently 2-5%)
4. Add/modify impact messages in impactsByRange
5. Adjust animation timings and effects
6. Modify update interval (currently 4 seconds)

## Warning
Be careful when modifying:
1. The donation calculation logic
2. The impact message selection logic
3. The animation system
4. The time update intervals
These are core to the component's functionality and user experience.
