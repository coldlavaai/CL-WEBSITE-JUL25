# Cold Lava Website Redesign - Session Notes
**Date:** 2026-01-06
**Branch:** redesign
**Status:** Active development, NOT deployed to main yet

---

## Session Overview
Continued website redesign work focusing on:
1. Scroll progress indicators (top + right side)
2. Mouse coordinate display system
3. Process section circular visualization improvements
4. Hero section spacing optimization
5. Ticker speed synchronization
6. UI polish and refinements

---

## ✅ Completed Changes

### 1. Scroll Progress Bars
**Location:** `src/components/ScrollProgressBar.tsx`

- Created dual progress bars:
  - **Top bar**: Cyan gradient bar (left to right) showing scroll progress
  - **Right bar**: Cyan gradient bar (top to bottom) showing scroll progress
- Both use Framer Motion's `useScroll` and `useSpring` for smooth animation
- Hidden default browser scrollbar via CSS in `src/styles/globals.css`

**CSS changes in globals.css:**
```css
html {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
html::-webkit-scrollbar {
  display: none;
}
```

### 2. Mouse Coordinates System
**Location:** `src/components/MouseCoordinates.tsx`

**Final Configuration:**
- **Display format:** 4 digits (0000)
- **Max values:** X=9999, Y=9999
- **Y calculation:** Mouse Y + Scroll Y (no decimals - uses Math.floor)
- **Position:** Top-left corner, fixed
- **Layout:** Logo on left → separator line → coordinates on right
- **Styling:** Cyan accents, architectural brackets, corner details

**Key Implementation:**
```tsx
const totalY = Math.min(Math.floor(coords.y + scrollY), 9999)
const displayX = Math.min(Math.floor(coords.x), 9999)
// Display with: String(value).padStart(4, '0')
```

### 3. Cursor Animation
**Location:** `src/app/page.tsx` (hero section)

**Implementation:**
- Changed from `animate-pulse` to `animate-blink` (true blinking cursor)
- Position: Inline at end of "Actually Needs" text
- Size: Scales with text using `h-[0.9em]`
- Animation: Custom blink keyframe in tailwind.config.js

**Tailwind config addition:**
```js
animation: {
  'blink': 'blink 1s step-end infinite',
}
keyframes: {
  blink: {
    '0%, 50%': { opacity: '1' },
    '51%, 100%': { opacity: '0' },
  },
}
```

### 4. Ticker Speed Synchronization
**Location:** `src/components/TechTicker.tsx` and `tailwind.config.js`

**Problem:** TechStackTicker (11 logos) appeared slower than IntegrationsTicker (18 logos) despite same 45s duration

**Solution:**
- Created new animation: `animate-ticker-fast` with 28s duration
- Modified LogoTicker component to accept `speed` prop
- TechStackTicker now uses `speed="fast"`
- Both tickers now have matching perceived scroll speed

**Code changes:**
```tsx
function LogoTicker({ logos, speed = 'normal' }: { logos: Logo[]; speed?: 'normal' | 'fast' })
const animationClass = speed === 'fast' ? 'animate-ticker-fast' : 'animate-ticker'
```

### 5. Hero Section Optimization
**Location:** `src/app/page.tsx`

**Goal:** Fit all hero elements in one viewport (1920x1080) at 100% zoom without scrolling

**Changes made:**
- Section height: `min-h-screen` → `min-h-[85vh]`
- Container padding: `py-32` → `py-16`
- Headline sizes: `text-6xl md:text-8xl lg:text-9xl` → `text-5xl md:text-7xl lg:text-8xl`
- Eyebrow margin: `mb-12` → `mb-8`
- Headline margin: `mb-12` → `mb-8`
- Subhead size: `text-xl md:text-2xl` → `text-lg md:text-xl`
- Subhead margin: `mb-16` → `mb-10`
- CTA margin: `mb-20` → `mb-12`
- CTA button padding: `px-10 py-5` → `px-8 py-4`
- Ticker spacing: Integrated with `pt-6 mt-6`, label `mb-3`

**Elements now visible in one viewport:**
1. Main headline
2. Subheading
3. "Talk to us" CTA button
4. TechStackTicker
5. Technical labels (EST. 2024, Liverpool, UK)

### 6. Navigation Border Removal
**Location:** `src/components/Navigation.tsx`

**Change:** Removed `border-b border-white/5` from header when scrolled
- Removed from desktop header scrolled state
- Removed from mobile menu

**Reason:** User found the white line appearing on scroll to be "clunky"

### 7. Process Section - Circular Visualization
**Location:** `src/app/page.tsx` (lines 304-607)

**Current State:** Restored to previous version with:
- Circular orbital ring with animated SVG
- 4 process steps at cardinal points (0°, 90°, 180°, 270°)
- Animated particle orbiting continuously (8s loop)
- Connection lines from center to each step
- Step markers on the circle
- No center philosophy circle (removed per user request)
- Philosophy box below the visualization
- Testimonial at bottom

**Process Steps:**
1. **Diagnose (01)** - Top - "Understanding your business, not just requirements."
2. **Design (02)** - Right - "Clear scope, timeline, and cost before any code."
3. **Build (03)** - Bottom - "Short cycles with regular check-ins. Weekly progress."
4. **Support (04)** - Left - "Launch isn't the end. We optimise as you grow."

**Note:** User wants to take screenshots before further iterations on this section

---

## 🎨 Design System

### Color Palette
- **Primary accent:** Cyan (#06b6d4 - cyan-500)
- **Background:** Black (#000000)
- **Text:** White with varying opacity
- **Borders:** White with low opacity + cyan accents

### Typography
- **Font:** Montserrat (via Google Fonts)
- **Headline tracking:** -0.03em
- **Monospace elements:** For technical labels, coordinates, annotations

### Architectural Blueprint Aesthetic
- Corner brackets on cards and sections
- Dimension lines and technical annotations
- Grid overlays (very subtle opacity)
- "Philosophy / 001", "Process / Methodology" style labels
- Numbered elements (01-04)
- Technical coordinate system

### Animations
- Framer Motion for orchestrated animations
- Staggered delays for sequential reveals
- Hover states with cyan glow effects
- Continuous circular motion for process visualization
- Blinking cursor effect
- Scroll-triggered animations

---

## 📁 Key Files Modified

### Components
1. **`src/components/ScrollProgressBar.tsx`** - NEW
   - Dual progress bars (top + right)
   - Framer Motion scroll tracking

2. **`src/components/MouseCoordinates.tsx`**
   - 4-digit coordinate display
   - Logo + coordinates layout
   - Scroll position tracking

3. **`src/components/Navigation.tsx`**
   - Removed border on scroll
   - Right-aligned nav items only

4. **`src/components/TechTicker.tsx`**
   - Added speed prop
   - Dual animation speeds (28s fast, 45s normal)

5. **`src/components/index.ts`**
   - Added ScrollProgressBar export

### Pages
6. **`src/app/page.tsx`**
   - Hero section optimization (spacing, sizing)
   - Process section (circular visualization)
   - Cursor animation fix
   - CTA load animation

### Configuration
7. **`tailwind.config.js`**
   - Added `animate-blink` animation
   - Added `animate-ticker-fast` animation
   - Blink keyframes

8. **`src/styles/globals.css`**
   - Hidden default scrollbar
   - Maintains scroll functionality

---

## 🔧 Technical Implementation Details

### Coordinate Tracking System
```tsx
// MouseCoordinates.tsx
useEffect(() => {
  const handleMouseMove = (e: MouseEvent) => {
    setCoords({ x: e.clientX, y: e.clientY })
  }
  const handleScroll = () => {
    setScrollY(window.scrollY)
  }
  // ... event listeners
}, [])

const totalY = Math.min(Math.floor(coords.y + scrollY), 9999)
const displayX = Math.min(Math.floor(coords.x), 9999)
```

### Scroll Progress Tracking
```tsx
// ScrollProgressBar.tsx
const { scrollYProgress } = useScroll()
const scaleX = useSpring(scrollYProgress, {
  stiffness: 100,
  damping: 30,
  restDelta: 0.001
})
const scaleY = useSpring(scrollYProgress, { /* same config */ })
```

### Ticker Speed Calculation
- IntegrationsTicker: 18 logos / 45s = 0.4 logos/second
- TechStackTicker: 11 logos / 28s = 0.39 logos/second
- Nearly identical perceived speed

---

## 🚧 Known Issues / Notes

### Process Section
- User is taking screenshots of current state
- Further iterations planned after screenshots
- User wants to improve alignment and add dynamic lighting effects
- Concept approved, execution needs refinement

### Hero Section
- Successfully fits in one viewport now
- All elements visible without scrolling at 100% zoom
- Maintains premium feel despite reduced spacing

### Scrollbar
- Default scrollbar hidden globally
- Custom cyan progress bars on top + right
- User happy with this implementation

---

## 🎯 Next Steps (User's Intent)

1. Review process section screenshots
2. Continue iterating on process section design
3. Potential additions:
   - Dynamic lighting as particle passes through steps
   - Better card alignment around circle
   - Enhanced glow effects

---

## 💡 User Preferences & Feedback

### Likes
- Scroll progress bars (top + right) - "very nice"
- Ticker improvements - "that's an improvement for sure"
- Coordinate system concept (with adjustments)
- Architectural blueprint aesthetic
- Circular process visualization concept

### Dislikes
- Default browser scrollbar (now removed)
- White border line on header when scrolling (now removed)
- Original 7-digit coordinates (too long - now 4 digits)
- Process section too similar to Services section (working on differentiation)

### Design Direction
- High-end architectural blueprints
- Technical precision with mystique
- Interactive elements (coordinates, animations)
- Teal/cyan blue accent (#06b6d4)
- Premium, sleek, mysterious
- Avoid generic AI aesthetics

---

## 🔑 Important Context

### Deployment
- Working in `redesign` branch
- NOT merged to main yet
- User wants to finish and deploy "by end of day"

### Tech Stack
- Next.js 14 (App Router)
- Framer Motion
- Tailwind CSS
- Dark theme (#000000 background)
- Cyan accent color (#06b6d4)

### Development Environment
- localhost:3000 running via `npm run dev`
- Auto-recompiles on file changes
- Background task ID: b38d4fa

---

## 📝 Code Snippets for Reference

### Hero Section Structure (Current)
```tsx
<section className="relative min-h-[85vh] flex items-center overflow-hidden">
  <GridOverlay spacing={32} opacity={0.015} />
  <TechnicalLabel position="top-right">v2.0.26</TechnicalLabel>
  <TechnicalLabel position="bottom-left">EST. 2024</TechnicalLabel>
  <TechnicalLabel position="bottom-right">Liverpool, UK</TechnicalLabel>

  <div className="container-default relative z-10 py-16">
    <motion.div className="max-w-6xl">
      {/* Eyebrow: mb-8 */}
      {/* Headline: text-5xl md:text-7xl lg:text-8xl, mb-8 */}
      {/* Subhead: text-lg md:text-xl, mb-10 */}
      {/* CTA: mb-12, px-8 py-4 */}
      {/* Ticker: pt-6 mt-6, mb-3 */}
    </motion.div>
  </div>
</section>
```

### Cursor Implementation (Current)
```tsx
<span className="block relative inline-block">
  Actually Needs
  <span className="inline-block w-1 h-[0.9em] bg-cyan-500 animate-blink ml-1 align-middle" />
</span>
```

---

## 🎨 Visual Elements Checklist

- [x] Custom scroll progress bars (top + right)
- [x] Mouse coordinates (4 digits, logo + coords)
- [x] Blinking cursor on headline
- [x] CTA load animation (cyan sweep)
- [x] Synchronized tickers
- [x] Hidden default scrollbar
- [x] Optimized hero spacing
- [x] Circular process visualization
- [x] Architectural annotations throughout
- [x] Corner brackets on interactive elements
- [x] Grid overlays (subtle)
- [x] Technical labels (version, location, date)

---

## 📊 Performance Notes

- Scroll tracking runs at 60fps
- Framer Motion animations use GPU acceleration
- Custom scrollbar doesn't impact scroll performance
- Ticker spotlight updates every 50ms
- No layout shift issues reported

---

**End of Session Notes**
