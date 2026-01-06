# Session Notes - January 6, 2026
## Cold Lava Website Redesign - Process Section & BOS Updates

---

## COMPLETED WORK

### 1. Process Section - Orbital Animation
**File**: `/Users/oliver/Documents/internal/cl-website-jul25/src/app/page.tsx`

#### ProcessOrbit Component (lines 64-306)
- **Progressive circular fill animation** - starts at 12 o'clock, fills entire circle clockwise over 9 seconds
- **Blue progress bar** (cyan #06b6d4) with glow effect
- **Quadrant gradient fills** that build up and STAY filled as progress moves through:
  - Quadrant 1 (Top-Right): 0-25% progress
  - Quadrant 2 (Bottom-Right): 25-50% progress
  - Quadrant 3 (Bottom-Left): 50-75% progress
  - Quadrant 4 (Top-Left): 75-100% progress
- **SVG implementation** using strokeDasharray and strokeDashoffset
- **Radius**: 190px, **Circumference**: 2 * PI * 190 = ~1194px

#### Process Cards with Gold Highlights
**Gold accent color**: `#C9A962` (rgb(201, 169, 98))

**Card highlighting behavior**:
- **ONE box always lit** - never zero boxes active
- Sequential timing:
  - Diagnose: 0-25% progress (0° - 90°)
  - Design: 25-50% progress (90° - 180°)
  - Build: 50-75% progress (180° - 270°)
  - Support: 75-100% progress (270° - 360°)

**Gold effects when active** (ProcessCard component, lines 309-473):
- Border: `rgba(201, 169, 98, 0.5)`
- Box shadow: `0 0 30px rgba(201, 169, 98, 0.2), inset 0 0 20px rgba(201, 169, 98, 0.08)`
- Background glow gradient: `from-[#C9A962]/15 via-[#C9A962]/8`
- Corner brackets: `border-[#C9A962]/80`
- Step number bar: `rgba(201, 169, 98, 0.7)`
- Step number text: `rgba(201, 169, 98, 1)`
- Title text: `rgba(201, 169, 98, 0.95)`
- Connector line: gold when active, cyan when inactive
- Grid pattern: gold when active

**When inactive**: Normal white/gray colors with subtle blue accents

### 2. Floating Trust Badges
**Component**: `FloatingTrustBadges` (lines 475-543)
**Location**: Around Process orbital diagram

#### Design - Technical Coordinate Aesthetic
```
[ • GDPR Compliant ] ────
```
- Brackets `[ ]` in white/20
- Dot indicator (cyan-500/40)
- Monospace text (10px, white/30, uppercase)
- Technical line decoration (gradient fade)

#### Positioning Strategy
**4 fixed positions** (corners, well outside diagram):
- Top-left: `top-[5%] left-[8%]`
- Top-right: `top-[8%] right-[10%]`
- Bottom-left: `bottom-[8%] left-[12%]`
- Bottom-right: `bottom-[5%] right-[8%]`

#### 10 Trust Messages (cycling through)
1. GDPR Compliant
2. Code Ownership
3. Full Transparency
4. Source Control
5. Documentation Included
6. No Vendor Lock-in
7. Security First
8. Cloud-Native
9. Regular Updates
10. Ongoing Support

#### Animation Behavior
- **Always 4 badges visible** - one at each position
- Messages **rotate through each position** with 6-second transitions
- Opacity animation: `[0, 0, 0.4, 0.4, 0]`
- Staggered timing so messages cycle continuously
- Each position shows 2-3 different messages over time
- `z-index: 20` to ensure proper layering
- Only visible on **XL screens** (`hidden xl:block`)

### 3. Testimonials Section Update
**Title changed**: "Satisfied customers" → "Working with ColdLava"
**Layout**: Reverted to original architectural grid (not carousel)
- Kept the masonry grid layout with varied column spans
- Architectural frames with corner brackets
- Hover effects with cyan accents
- Location: lines 993-1089

### 4. Center Logo in Process Diagram
**Replaced text** "Core Continuous Development" with Cold Lava logo
**Logo path**: `/Cold Lava Logo/Cold Lava - Icon.png`
**Implementation**: Next.js Image component with `fill` and `object-contain`
**Size**: w-16 h-16 md:w-20 md:h-20
**Container**: Circular with cyan border, gradient background, grid pattern, corner brackets

---

## TECHNICAL DETAILS

### Animation Timing
- **Process orbit cycle**: 9 seconds (9000ms)
- **Update interval**: 16ms (~60fps)
- **Card transition**: 0.5s ease
- **Trust badge cycle**: 6s per message
- **Trust badge fade**: opacity transitions with easeInOut

### Color Palette Used
- **Cyan/Blue** (primary): `#06b6d4` / `rgb(6, 182, 212)` / `cyan-500`
- **Gold** (accent): `#C9A962` / `rgb(201, 169, 98)`
- **Background**: Black with various opacity levels
- **Text**: White with various opacity levels (90%, 70%, 40%, 30%, 20%)

### State Management
```javascript
const [activeCard, setActiveCard] = useState<number>(0)
const [progress, setProgress] = useState<number>(0)
```

### SVG Gradients
- `progressGradient`: Linear gradient for progress bar (cyan)
- `quadrantGradient1-4`: Radial gradients for quadrant fills (cyan)
- `progressGlow`: Gaussian blur filter for glow effect

---

## GIT COMMIT DETAILS

**Branch**: `redesign`
**Commit**: `a637de3`
**Message**: "Add Process orbital animation and floating trust badges"

**Files Changed** (11 files, 1599 insertions, 396 deletions):
- `src/app/page.tsx` - Main changes
- `src/components/Navigation.tsx`
- `src/components/TechTicker.tsx`
- `src/components/index.ts`
- `src/components/BOSVisual.tsx` (new)
- `src/components/GridOverlay.tsx` (new)
- `src/components/MouseCoordinates.tsx` (new)
- `src/components/ScrollProgressBar.tsx` (new)
- `src/components/TechnicalLabel.tsx` (new)
- `src/styles/globals.css`
- `tailwind.config.js`

**Pushed to**: `origin/redesign`

**Preview URL**:
```
https://cl-website-jul25-git-redesign-olivers-projects-a3cbd2e0.vercel.app?x-vercel-protection-bypass=0NT10GBenuYX9r9dXc03YVU0zXbywL49&cb=1736204400000
```

---

## PENDING WORK

### BOS Section - Screenshot Carousel

#### Screenshots Received (4 images)
User has provided 4 screenshots to be added to the BOS section in a carousel:

1. **Liverpool Cotton Brokers - Financial Dashboard**
   - File: First uploaded image
   - Content: Financial management overview, market data, Xero/QuickBooks integrations
   - Theme: Dark blue/navy
   - Key data: Revenue £2.85M, Expenses £1.25M, Net Profit £1.60M
   - Sensitive data: Company name, transaction details (Shanghai Textile Mills, Maersk Line, Delta Cotton Co., HSBC), specific amounts

2. **Detail Dynamics - Communications CRM**
   - File: Second uploaded image
   - Content: Customer messaging interface, contact details, job tracking
   - Theme: Dark blue
   - **HIGHLY SENSITIVE DATA**:
     - Customer email: emmamynard2025@gmail.com
     - Phone: +447376422046
     - Address: Unit 17, Stanley Court, Terminus Road, Chichester, PO19 8TX
     - Customer name: emma mynard
     - Job details: Ford Fiesta maintenance booking

3. **Liverpool Cotton Brokers - Invoices**
   - File: Third uploaded image
   - Content: Invoice management, customer invoices & payments
   - Theme: Same dark blue as #1
   - Sensitive data: Istanbul Textile Exchange, Turkish Mills Ltd, specific invoice amounts (£780K, £642K)

4. **Greenstar Solar - Location Intelligence**
   - File: Fourth uploaded image
   - Content: Database reactivation platform, UK lead distribution map
   - Theme: Dark with green accents
   - Data: 865 total leads, £369,227 pipeline value, 157 won, 192 quoted, 171 new
   - Map shows real UK locations with lead markers

#### User Decision on Data Obscuring
- **Current approach**: Upload as-is first to see how they look
- **Will decide later**: Whether to blur/obscure sensitive data
- **Trial and error**: Test appearance before obscuring

#### Carousel Requirements (to be implemented)
- Display area: Right side of BOS description
- Style: Match Cold Lava technical aesthetic
- Features needed:
  - Smooth transitions
  - Navigation controls (dots/arrows)
  - Proper aspect ratio handling (images have different sizes)
  - Auto-play or manual only (TBD)
  - Dark theme to match site

#### Next Steps
1. Create carousel component for BOS section
2. Add the 4 images to the carousel
3. Review appearance with client
4. Implement data obscuring if needed (blur, pixelate, or mask sensitive info)
5. Final styling adjustments

---

## SECTION STRUCTURE REFERENCE

### Process Section (lines 713-844)
```
PROCESS SECTION
├── Section Header (left-aligned)
│   ├── Technical label: "Process / Methodology"
│   └── Heading: "No surprises. No black boxes."
├── Orbital Visualization Container
│   ├── FloatingTrustBadges (4 positions, cycling messages)
│   ├── ProcessOrbit Component
│   │   ├── SVG Circle (progress bar + quadrant fills)
│   │   ├── Card: Diagnose (top, 12 o'clock)
│   │   ├── Card: Design (right, 3 o'clock)
│   │   ├── Card: Build (bottom, 6 o'clock)
│   │   ├── Card: Support (left, 9 o'clock)
│   │   └── Center: Cold Lava Logo
│   └── Bottom annotation: "Continuous Development Cycle"
└── Philosophy/002 Box (centered below)
```

---

## CODE SNIPPETS FOR REFERENCE

### Process Card Highlighting Logic
```javascript
// Update active card - ONE box always lit, switches to next when progress reaches it
// Each card stays lit for a full quarter of the cycle
let activeIndex
if (progressValue < 0.25) activeIndex = 0  // Diagnose (0° - 90°)
else if (progressValue < 0.5) activeIndex = 1  // Design (90° - 180°)
else if (progressValue < 0.75) activeIndex = 2  // Build (180° - 270°)
else activeIndex = 3  // Support (270° - 360°)
```

### SVG Progress Bar (Quadrant shifted correctly)
```javascript
{/* Path 2: Top-Right in rotated view (0° to 90°) - fills first */}
<path
  d="M 390 200 A 190 190 0 0 1 200 390 L 200 200 Z"
  fill="url(#quadrantGradient2)"
  opacity={progress < 0.25 ? progress * 4 : 1}
/>
```

---

## DESIGN DECISIONS MADE

1. **Gold vs Cyan**: Gold (#C9A962) for active process cards, Cyan for everything else
2. **Quadrant order**: Fixed rotation issue - top-right fills first (not top-left)
3. **Trust badges**: 4 positions only (not 8) to avoid crowding
4. **Badge visibility**: Always visible, just cycling messages (not all fading to zero)
5. **Testimonials**: Kept grid layout (rejected carousel as too cumbersome)
6. **Card background**: Gold gradient glow when active for stronger visual impact

---

## USER PREFERENCES NOTED

- Wants subtle, not in-your-face design elements
- Appreciates technical, coordinate-style aesthetics
- Prefers continuous visibility over gaps (always something visible)
- Values spacing and avoiding crowding
- Iterative approach - test, review, adjust
- Direct feedback style: "No, it's still not working" → pivot quickly

---

## FILES TO REVIEW FOR CAROUSEL WORK

When implementing BOS carousel:
- Current BOS section location in page.tsx (search for "BOS" or "Business Operating System")
- Consider using existing BOSVisual component or create new carousel
- Match styling to existing sections (GridOverlay, technical labels, etc.)
- Framer Motion for animations
- Next.js Image component for optimized images

---

## IMPORTANT NOTES

- Dev server running on port 3000 (task b38d4fa)
- Working in `redesign` branch
- All changes committed and pushed
- Context running low (6%) - this file preserves all details for continuation
- User expects trial-and-error approach for BOS carousel
- Data obscuring decision deferred until after seeing carousel implementation
