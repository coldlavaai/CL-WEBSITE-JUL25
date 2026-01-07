# Website Architecture Plan - [CLIENT NAME]

**Client:** [Client Name]
**Project:** [Project Name]
**Date:** [Date]
**Prepared by:** Oliver Tatler / Cold Lava AI Ltd

---

## Executive Summary

**Project Overview:**
[Auto-generated based on Q1.2 - What does your company do?]

**Primary Goal:**
[From Q2.1 - #1 goal of website]

**Timeline:**
[From Q8.3 - When do you need website launched]

**Budget:**
[From Q8.1 - Total budget]

**Tech Stack:**
- **Framework:** Next.js 14 (TypeScript)
- **Styling:** TailwindCSS
- **Hosting:** Vercel
- **Database:** [If needed: Supabase / None]
- **CMS:** [If needed: Sanity / Built-in / None]
- **Analytics:** [Based on Q7.2 selections]

---

## Table of Contents

1. [Business Requirements](#business-requirements)
2. [Technical Architecture](#technical-architecture)
3. [Site Structure & Pages](#site-structure--pages)
4. [Features & Functionality](#features--functionality)
5. [Design System](#design-system)
6. [Integrations](#integrations)
7. [Analytics & Tracking](#analytics--tracking)
8. [Security & Compliance](#security--compliance)
9. [SEO Strategy](#seo-strategy)
10. [Project Timeline](#project-timeline)
11. [Deliverables](#deliverables)
12. [Ongoing Support](#ongoing-support)
13. [Budget Breakdown](#budget-breakdown)

---

## 1. Business Requirements

### 1.1 Company Overview

**Company Name:** [Q1.1]
**Industry:** [Derived from Q1.2]
**Target Audience:** [From Q3.1 - demographics]
**Market Type:** [Q3.2 - B2B or B2C]

**Unique Selling Proposition:**
[From Q1.3]

**Competitors:**
[From Q1.4 - List 2-3 competitor websites]

### 1.2 Website Goals

**Primary Goal:** [From Q2.1]

**Success Metrics:**
[From Q2.3 - How you'll measure success]

**Secondary Goals:**
[From Q2.2 - List all selected secondary goals]

### 1.3 Current Situation

**Existing Website:** [Q2.4 - Yes/No + URL if applicable]

**What's Working:**
[From Q2.5]

**Pain Points to Solve:**
[From Q2.6]

---

## 2. Technical Architecture

### 2.1 Technology Stack

```
Frontend Framework: Next.js 14.2.35
├── React: 18.3.1
├── TypeScript: 5.9.3
└── App Router (file-based routing)

Styling:
├── TailwindCSS 3.4.19
├── Custom design system (client brand colors)
└── Framer Motion (animations) [IF Q5.2 = "Yes"]

Backend:
[IF LEAD CAPTURE OR E-COMMERCE:]
├── Next.js API Routes
├── Supabase (PostgreSQL database)
└── [Other integrations based on Q6.1]

Deployment:
├── Vercel (hosting + CDN)
├── Automatic deployments from Git
└── SSL certificate (HTTPS) included

Development Tools:
├── ESLint (code quality)
├── Prettier (code formatting)
└── [IF complex project: Vitest (testing)]
```

**Why This Stack:**
- ✅ Same proven stack as Cold Lava website (A★★ grade)
- ✅ Excellent performance (Core Web Vitals optimized)
- ✅ SEO-friendly (Server-Side Rendering)
- ✅ Scalable (handles [Q9.5 traffic expectation])
- ✅ Cost-effective (£0/month infrastructure)

### 2.2 Architecture Diagram

```
User Browser
    ↓
Vercel CDN (Global)
    ↓
Next.js Application
    ├── Public Pages (SSR/SSG)
    ├── API Routes
    │   ├── /api/contact [IF contact form]
    │   ├── /api/leads [IF lead capture]
    │   └── [Other APIs based on requirements]
    └── [IF needed: Protected Dashboard]

External Services:
├── Google Analytics 4 [IF Q7.2 includes GA4]
├── Facebook Pixel [IF Q7.2 includes FB]
├── [Other tracking from Q7.2]
[IF DATABASE NEEDED:]
├── Supabase (Database)
[IF CMS NEEDED:]
├── [CMS choice from Q6.2]
[IF E-COMMERCE:]
└── Stripe / Shopify [Payment processing]
```

### 2.3 Security Architecture

**Content Security Policy (CSP):**
- XSS protection
- Clickjacking prevention
- Secure third-party script loading

**Data Security:**
[IF Q6.7 = handles sensitive data:]
- HTTPS enforced (SSL certificate)
- [IF payments: PCI DSS compliant via Stripe]
- [IF health data: HIPAA compliance measures]
- Secure environment variables

**GDPR Compliance:** [Q6.8]
[IF Yes:]
- Cookie consent banner
- Privacy policy page
- Terms & conditions page
- Cookie policy page
- Right to data deletion

---

## 3. Site Structure & Pages

### 3.1 Site Map

Based on Q4.1 selections:

```
coldlava.ai [replace with client domain]
│
├── / (Homepage)
│
[FOR EACH CHECKED PAGE IN Q4.1, ADD:]
├── /about
├── /services [OR /products if e-commerce]
│   ├── /services/[service-1]
│   ├── /services/[service-2]
│   └── /services/[service-3]
├── /portfolio [OR /case-studies]
├── /blog [IF Q4.6 = Yes]
│   └── /blog/[post-slug]
├── /contact
├── /pricing [IF checked]
├── /team [IF checked]
├── /testimonials [IF checked]
├── /faq [IF checked]
├── /careers [IF checked]
│
[LEGAL PAGES - ALWAYS INCLUDE:]
├── /privacy
├── /terms
└── /cookies

[IF ANALYTICS DASHBOARD REQUESTED:]
└── /analytics (password protected)
    ├── /analytics/login
    └── /analytics/leads
```

### 3.2 Page Details

#### Homepage
**Goal:** [From Q6.6 - What should happen when landing on homepage]

**Layout:** [From Q5.4 - Homepage layout preference]

**Sections:**
1. Hero Section
   - [From Q5.4 layout choice]
   - Headline: [To be written based on Q1.3 USP]
   - Subheadline: [Value proposition]
   - CTA: [Based on Q2.1 primary goal]

2. [IF Q4.1 includes Services/Products:]
   Services/Products Overview
   - Grid/Cards showing [Q4.3 number] services/products
   - Brief description for each
   - Link to detailed pages

3. [IF Q2.2 includes "Showcase portfolio":]
   Featured Work / Case Studies
   - 3-6 highlighted projects
   - Results-focused descriptions

4. [IF Q2.2 includes "Display testimonials":]
   Social Proof Section
   - Customer testimonials
   - Logos of clients (if provided)
   - [Optional: Video testimonials]

5. [IF Q2.1 = "Generate leads":]
   Call to Action Section
   - Strong CTA for [booking/contact/download]
   - Benefits of taking action
   - Low-friction conversion path

6. [IF Q4.6 = Yes blog:]
   Latest Blog Posts
   - 3 most recent articles
   - Link to full blog

[REPEAT SIMILAR STRUCTURE FOR EACH PAGE FROM Q4.1]

---

## 4. Features & Functionality

### 4.1 Core Features (From Q4.5)

#### Lead Capture

[IF any lead capture options checked in Q4.5:]

**Contact Form:**
- Location: [/contact page + possibly homepage]
- Fields:
  - Name (required)
  - Email (required)
  - [IF B2B: Company name]
  - [IF phone needed: Phone number]
  - Message (required)
- Validation: Client-side + server-side (Zod schema)
- Submission: Sends to [Q7.5 - where leads go]
- Tracking: Fires "generate_lead" event to analytics

[IF Q4.7 = Yes lead capture popup:]
**Lead Capture Popup:**
- Trigger: [Q4.7 trigger choice - time/scroll/exit]
- [IF time trigger: After [X] seconds from Q4.7]
- Offer: [Q4.7 - What you'll give visitors]
- Fields: Name, Email, [optional phone]
- Storage: Supabase database
- [IF Q7.6 = Yes: Clearbit company identification]
- [IF Q7.7 = Yes: Instant notification to [Q7.5 destination]]

#### Booking & Scheduling

[IF Q4.5 includes booking:]

**Appointment Booking:**
- Integration: Cal.com [or Calendly if client preference]
- Locations: [List pages where booking button appears]
- CTA: "[Book a Call]" buttons
- Tracking: Fires "initiate_booking" event

#### Content Features

[IF Q4.5 includes Blog:]
**Blog System:**
- CMS: [Q6.2 choice or built-in if simple]
- Frequency: [Q4.6 - how often you'll publish]
- Features:
  - [ ] Categories/tags
  - [ ] Search functionality
  - [ ] Social sharing buttons
  - [ ] Author profiles [IF team blog]
  - [ ] Comments [IF Q4.5 checked]
  - [ ] Related posts
- SEO: Auto-generated sitemap, meta tags, schema markup

[IF Q4.5 includes Testimonials:]
**Testimonials/Reviews:**
- Display: Rotating carousel or grid
- Content: [From client or request via form]
- [Optional: Third-party integration like Trustpilot]

[IF Q4.5 includes Case Studies:]
**Portfolio/Case Studies:**
- Layout: Grid with filters (by industry, service, etc.)
- Template: [Problem → Solution → Results]
- Media: Images, videos, metrics

#### Interactive Features

[IF Q4.5 includes Live Chat:]
**Live Chat:**
- Platform: [Crisp / Intercom / Tawk.to]
- Availability: [Define hours or "always on" bot]
- Fallback: Contact form if offline

[IF Q4.5 includes Chatbot:]
**AI Chatbot:**
- Platform: [Custom or third-party like Intercom]
- Capabilities: [Define what it can answer]
- Escalation: To human or contact form

[IF Q4.5 includes Interactive calculators:]
**Custom Calculator/Tool:**
- Type: [Define based on client needs]
- Example: ROI calculator, pricing estimator, etc.
- Implementation: Custom React component

#### E-commerce (If Applicable)

[IF Q4.5 includes e-commerce features:]
**Online Store:**
- Platform: [Shopify integration OR WooCommerce OR custom]
- Products: [Q4.3 - number of products]
- Payment: Stripe (credit card, Apple Pay, Google Pay)
- Features:
  - [ ] Product catalog with images
  - [ ] Filters/search
  - [ ] Shopping cart
  - [ ] Checkout flow
  - [ ] Order confirmation emails
  - [ ] [IF checked: Customer accounts]
  - [ ] Inventory management
  - [ ] Shipping calculation

### 4.2 Unique Features

[IF Q5.3 = Yes to "wow" feature:]
**Custom Interactive Feature:**
[From Q5.3 description]

**Implementation:**
[Describe how it will work technically]

**Examples from Cold Lava:**
- ISS Tracker (live space station location)
- Real-time data widgets
- Interactive 3D elements
- Custom animations

**For Your Site:**
[Propose specific feature based on industry]
- Finance: Live stock ticker or crypto prices
- Travel: Live weather or flight deals
- E-commerce: Product recommendation engine
- B2B: ROI calculator or savings estimator

---

## 5. Design System

### 5.1 Visual Identity

**Brand Colors:** [From Q1.8]
```css
Primary: [Hex code]
Secondary: [Hex code]
Accent: [Hex code]
```

**Typography:**
- Font Family: [If provided in brand guidelines, otherwise suggest]
- Responsive scaling using `clamp()` (fluid typography)
- Hierarchy: Display → Headline → Subhead → Body

**Design Style:** [From Q5.1]
[Describe aesthetic - modern/bold/classic/dark/playful/luxury]

**Inspiration:** [From Q4.9 - websites client loves]

### 5.2 Component Library

**Reusable Components:**
- Buttons (Primary, Secondary, Outline)
- Form inputs (Text, Email, Textarea, Select)
- Cards (Service cards, blog cards, etc.)
- Navigation (Desktop, Mobile, Sticky)
- Footer
- Modals/Popups
- [IF blog: Blog post layout]
- [IF testimonials: Testimonial card]

### 5.3 Animations & Motion

[IF Q5.2 = "Yes"]
**Animation Style:**
- Smooth scrolling (Lenis) [like Cold Lava site]
- Fade-in on scroll (Framer Motion)
- Hover effects on buttons/cards
- Page transitions
- [IF requested: Parallax effects]

[IF Q5.2 = "Minimal"]
**Animation Style:**
- Subtle transitions (0.3s ease)
- Hover effects only
- No smooth scrolling

[IF Q5.2 = "No"]
**Animation Style:**
- No animations (instant, performant)
- Focus on speed and accessibility

### 5.4 Responsive Design

**Breakpoints:**
- Mobile: 320px - 768px (priority: [Q6.6 mobile/desktop split])
- Tablet: 768px - 1024px
- Desktop: 1024px+

**Mobile-First Approach:**
[IF Q6.6 = "Mostly mobile"]
- Design for mobile first, enhance for desktop
- Touch-friendly tap targets (44px minimum)
- Optimized images for mobile

---

## 6. Integrations

### 6.1 Third-Party Services

Based on Q6.1 selections:

[FOR EACH CHECKED INTEGRATION, ADD:]

**[Service Name]:**
- Purpose: [Why it's needed]
- Implementation: [API, embed, etc.]
- Data flow: [What data is sent/received]
- Cost: [Free tier / Paid]

**Example:**

**CRM Integration (Salesforce):**
- Purpose: Automatically add leads from website to Salesforce
- Implementation: Webhook to Salesforce API
- Data flow: Contact form → Supabase → Salesforce
- Authentication: OAuth 2.0
- Cost: Included in client's existing Salesforce plan

### 6.2 Payment Processing

[IF E-COMMERCE OR BOOKING WITH PAYMENT:]

**Payment Gateway:** Stripe
- Supported methods: Credit card, Apple Pay, Google Pay
- Security: PCI DSS compliant (Stripe handles)
- Currency: [Based on client location]
- Test mode: Available for testing before launch

---

## 7. Analytics & Tracking

### 7.1 Tracking Infrastructure

**Tracking System:** Cold Lava Template
- Centralized tracking API (`src/lib/tracking.ts`)
- Single source of truth for all events
- Type-safe TypeScript interfaces

**Platforms:** [From Q7.2]

[FOR EACH SELECTED PLATFORM:]

**Google Analytics 4:**
- Property: [To be created]
- Measurement ID: G-XXXXXXXXX
- Events tracked:
  - Page views
  - Scroll depth (25%, 50%, 75%, 100%)
  - Time on page (30s, 60s, 120s, 300s)
  - [From Q2.3: success metric events]
  - Booking clicks
  - Form submissions
  - Outbound link clicks

**Facebook Pixel:**
- Pixel ID: [To be created]
- Events:
  - PageView
  - ViewContent (service pages)
  - InitiateCheckout (booking clicks)
  - Lead (form submissions)
  - Contact (phone/email clicks)
- Audience building: [IF Q7.4 includes Facebook Ads]
  - Website visitors (180 days)
  - Engaged users (30+ seconds or 2+ pages)
  - Service viewers (by service type)

[IF Q7.3 = Yes session recordings:]
**Microsoft Clarity:**
- Project: [To be created]
- Features:
  - Session recordings (watch visitor behavior)
  - Heatmaps (see where users click)
  - Rage clicks detection
  - Dead clicks detection
- Privacy: GDPR compliant, auto-masks sensitive data

### 7.2 Custom Events

**Conversion Events:**
[Based on Q2.1 primary goal and Q2.3 success metrics]

[Example if primary goal = "Generate leads"]
- `generate_lead` - Contact form submitted
- `initiate_booking` - Cal.com link clicked
- `download_resource` - PDF/guide downloaded [IF Q4.5 includes downloads]
- `high_intent_user` - Viewed 3+ pages or spent 2+ minutes

**Engagement Events:**
- ISS tracker interaction [IF using custom widget]
- Video plays [IF Q4.5 includes video]
- Calculator usage [IF Q4.5 includes calculator]
- [Service name] viewed (for each service page)

### 7.3 Analytics Dashboard

[IF client wants self-service analytics:]

**Dashboard URL:** [domain]/analytics
**Authentication:** Password protected (cookie-based)
**Features:**
- Tracking status overview
- Quick links to GA4, Facebook, etc.
- [IF lead capture: Lead viewer with CSV export]
- Web Vitals monitoring

[IF Q7.2 includes advanced features:]
**Advanced Analytics:**
- Real-time visitor count
- Conversion funnel visualization
- [Requires GA4 API integration - additional cost]

---

## 8. Security & Compliance

### 8.1 Security Measures

**Content Security Policy (CSP):**
```javascript
// next.config.js
{
  "default-src": "'self'",
  "script-src": "'self' 'unsafe-inline' [tracking domains]",
  "connect-src": "'self' [API domains]",
  "img-src": "'self' data: https:",
  "frame-src": "'self' [e.g., cal.com, youtube]"
}
```

**Additional Security:**
- X-Content-Type-Options: nosniff
- X-Frame-Options: DENY
- X-XSS-Protection: 1; mode=block
- Referrer-Policy: strict-origin-when-cross-origin
- HTTPS enforced (SSL certificate via Vercel)

[IF handles sensitive data from Q6.7:]
**Data Protection:**
- All API routes validate input (prevents injection attacks)
- Environment variables for secrets (never in code)
- [IF payments: PCI DSS compliant via Stripe]
- [IF health data: HIPAA compliance measures]
- Rate limiting on API routes (prevents abuse)

### 8.2 GDPR Compliance

[IF Q6.8 = Yes:]

**Required Pages:**
- ✅ Privacy Policy (custom for [client name])
- ✅ Terms & Conditions
- ✅ Cookie Policy

**Cookie Consent Banner:**
- Appears on first visit
- Options: Accept All / Reject All / Customize
- Respects user choice
- Updates GTM consent mode

**User Rights:**
- Right to access data
- Right to deletion [IF collecting personal data]
- Contact: [client email for data requests]

**Analytics Consent:**
- Tracking only loads after consent
- Google Consent Mode v2 compatible

---

## 9. SEO Strategy

[IF Q6.4 = "Yes - critical" or "Yes - nice to have"]

### 9.1 Technical SEO

**On-Page SEO:**
- ✅ Semantic HTML5 (proper heading hierarchy)
- ✅ Meta titles and descriptions (custom per page)
- ✅ Open Graph tags (social sharing previews)
- ✅ Twitter Card tags
- ✅ Canonical URLs
- ✅ Alt text for all images
- ✅ Descriptive URLs (/services/solar-panel-installation)

**Structured Data (Schema.org):**
- Organization schema
- LocalBusiness schema [IF local business]
- Service schema (for each service)
- Article schema [IF blog]
- BreadcrumbList schema
- [IF e-commerce: Product schema]

**Performance SEO:**
- Server-Side Rendering (SSR) for instant indexing
- Optimized images (WebP format, lazy loading)
- Minified CSS/JS
- Core Web Vitals optimization:
  - LCP < 2.5s (Largest Contentful Paint)
  - FID < 100ms (First Input Delay)
  - CLS < 0.1 (Cumulative Layout Shift)

**Auto-Generated SEO Assets:**
- `/sitemap.xml` (auto-updates when adding pages)
- `/robots.txt` (controls search engine crawling)

### 9.2 Keyword Strategy

**Target Keywords:** [From Q6.5]

[List 5-10 keywords provided]

**Keyword Mapping:**
[Map each keyword to specific pages]

Example:
- "solar panel installation Liverpool" → /services/installation
- "best solar panels UK" → /services/solar-panels
- "solar panel cost" → /pricing

**Content Strategy:**
[IF Q4.6 = Yes blog]
- Blog topics targeting long-tail keywords
- Publishing frequency: [Q4.6 frequency]
- Focus: [From Q3.3 - problems you solve]

### 9.3 Local SEO

[IF applicable for local business]

**Google Business Profile:**
- Ensure NAP (Name, Address, Phone) matches website
- Link website in profile
- Encourage reviews

**Local Schema:**
- LocalBusiness structured data
- Address, phone, hours
- Service area [if service-based]

---

## 10. Project Timeline

### Phase 1: Setup & Planning (Week 1)

**Day 1-2: Foundation**
- [x] Create Next.js project
- [x] Set up Git repository
- [x] Copy Cold Lava template structure
- [x] Install dependencies
- [x] Configure environment variables

**Day 3-5: Branding**
- [ ] Implement client brand colors
- [ ] Add logo and favicon
- [ ] Create design system (Tailwind config)
- [ ] Set up typography
- [ ] Build component library foundation

### Phase 2: Development (Week 2-[X])

[Calculate based on Q4.1 pages count and Q4.5 features complexity]

**Core Pages:** [X days]
- [ ] Homepage
- [ ] [List all pages from Q4.1]

**Features:** [X days]
- [ ] [List all features from Q4.5]

**Integrations:** [X days]
- [ ] [List all integrations from Q6.1]

### Phase 3: Content & Testing (Week [X])

**Content Population:**
- [ ] Write/import page copy [OR "Client provides"]
- [ ] Add images/videos
- [ ] Populate services/products
- [ ] Create blog posts [IF applicable]

**Testing:**
- [ ] Cross-browser testing (Chrome, Safari, Firefox, Edge)
- [ ] Mobile device testing (iOS, Android)
- [ ] Form submission testing
- [ ] Payment testing [IF e-commerce]
- [ ] Analytics verification
- [ ] Lighthouse audit (target: 90+ all categories)
- [ ] Accessibility testing

### Phase 4: Launch (Week [X])

**Pre-Launch:**
- [ ] Client final review
- [ ] Load production environment variables
- [ ] Set up custom domain
- [ ] Configure DNS

**Launch Day:**
- [ ] Deploy to production (Vercel)
- [ ] Verify all features working
- [ ] Submit sitemap to Google Search Console
- [ ] Test analytics tracking in production
- [ ] Monitor for errors (Sentry)

**Post-Launch (Week 1):**
- [ ] Client training session
- [ ] Documentation handoff
- [ ] Monitor analytics
- [ ] Address any issues

**Total Duration:** [X] weeks
**Start Date:** [Date]
**Launch Date:** [Date]

---

## 11. Deliverables

### 11.1 Website Assets

**Code Repository:**
- GitHub repository access
- Well-commented, production-ready code
- README with setup instructions

**Deployed Website:**
- Production URL: [domain]
- Vercel dashboard access
- Automatic deployments configured

**Design Assets:**
- Component library
- Design system documentation
- Brand color palette
- Typography scale

### 11.2 Third-Party Accounts

**Analytics Accounts:**
[List all accounts set up based on Q7.2]
- Google Analytics 4 property
- Facebook Business Manager (Pixel)
- [Others...]

**Developer Accounts:**
- Vercel project
- [IF database: Supabase project]
- [IF CMS: CMS account]
- [Others from Q6.1]

### 11.3 Documentation

**Technical Documentation:**
- `PROJECT_SETUP.md` - Development environment setup
- `DEPLOYMENT.md` - How to deploy updates
- `.env.local.example` - Environment variables template
- Architecture diagram

**User Documentation:**
[IF Q9.1 = "Yes - teach me how"]
- Content update guide
- How to add blog posts [IF blog]
- How to view analytics
- How to manage leads [IF lead capture]
- Troubleshooting guide

**Legal Documents:**
- Privacy Policy (customized for [client])
- Terms & Conditions
- Cookie Policy

### 11.4 Training

[IF Q9.2 includes training needs:]

**Training Session:** [X] hours
- Screen-share walkthrough
- How to update content
- How to view analytics
- How to manage leads
- Q&A session
- Recorded for future reference

---

## 12. Ongoing Support

[IF Q8.2 = "Yes" or "Maybe"]

### 12.1 Monthly Support Plan

**Tier 1: Basic (£50/month)**
- Minor content updates (up to 2 hours/month)
- Security updates
- Uptime monitoring
- Email support (48-hour response)

**Tier 2: Standard (£100/month)**
- Content updates (up to 4 hours/month)
- Monthly analytics report
- SEO monitoring
- Priority email support (24-hour response)
- Quarterly performance audit

**Tier 3: Premium (£150/month)**
- Unlimited minor updates
- Weekly analytics reports
- Active SEO optimization
- Blog post writing (1-2 per month)
- Priority support (same-day response)
- Monthly strategy call

**Custom Plan:**
[Define based on Q8.2 needs]

### 12.2 One-Time Services

**Available as needed:**
- New page creation: £200-500 per page
- New feature development: £500-2000
- Design refresh: £1000-3000
- Migration/data import: £300-1000
- Integration setup: £200-800
- Emergency fixes: £150/hour

---

## 13. Budget Breakdown

### 13.1 Development Costs

[Based on Q8.1 total budget]

**Project Phases:**
```
Setup & Planning:          £[X]
Design & Branding:         £[X]
Core Pages Development:    £[X]
Features Development:      £[X]
Integrations:              £[X]
Content Population:        £[X]
Testing & QA:              £[X]
Launch & Training:         £[X]
                          ─────
TOTAL:                     £[Total from Q8.1]
```

### 13.2 Third-Party Costs

**Monthly (Ongoing):**
```
Vercel Hosting:            £0  (Free tier)
Domain Name:               £10-20/year
[IF DATABASE:]
Supabase:                  £0  (Free tier, up to 500MB)
[IF CMS:]
[CMS Name]:                £[X]/month

[IF ANALYTICS:]
Google Analytics 4:        £0  (Free unlimited)
Facebook Pixel:            £0  (Free)
Microsoft Clarity:         £0  (Free)

[IF INTEGRATIONS:]
[List each paid integration from Q6.1]

                          ─────
MONTHLY TOTAL:             £[X]/month
ANNUAL TOTAL:              £[X]/year
```

**One-Time:**
```
SSL Certificate:           £0  (Included with Vercel)
[IF PREMIUM TOOLS:]
[Tool name]:               £[X]

                          ─────
ONE-TIME TOTAL:            £[X]
```

### 13.3 Optional Add-Ons

**If you want to upgrade later:**
- Lead capture system: +£200
- Advanced analytics dashboard: +£400
- Blog/CMS: +£400
- E-commerce: +£800-2000
- Custom integrations: £300-1000 each
- [Q5.3 "wow" feature]: £[X] [IF not included in base]

---

## 14. Success Metrics & KPIs

[Based on Q2.3 - How you'll measure success]

**Month 1 Goals:**
- Website launches successfully
- Zero critical errors
- [From Q2.3 metrics, set baseline targets]

**Month 3 Goals:**
- [Define specific targets based on Q2.3]
- Example: 100+ leads captured
- Example: 1000+ unique visitors
- Example: [X] booking conversions

**Month 6 Goals:**
- [Define growth targets]
- Example: 50% increase in leads
- Example: Ranking on page 1 for [primary keyword]
- Example: 5% conversion rate

**How We'll Track:**
- Monthly analytics reports
- [IF support plan: Quarterly strategy calls]
- Dashboard at [domain]/analytics

---

## 15. Project Risks & Mitigation

**Potential Risks:**

**1. Content Delays**
- Risk: Client content not ready on time
- Impact: Delays launch
- Mitigation: Content deadline 2 weeks before launch
- [From Q4.2 - if "No - need content writing", offer content service]

**2. Scope Creep**
- Risk: Additional features requested mid-project
- Impact: Timeline/budget overrun
- Mitigation: Clear scope document, change request process

**3. Third-Party Integration Issues**
- Risk: [Q6.1 integrations] API changes or downtime
- Impact: Features not working
- Mitigation: Fallback options, staging environment testing

**4. Browser/Device Compatibility**
- Risk: Issues on specific devices [Q6.6 mobile/desktop split]
- Impact: Poor user experience
- Mitigation: Comprehensive testing plan, progressive enhancement

---

## 16. Next Steps

### Immediate Actions

**Client:**
1. Review this architecture plan
2. Confirm all requirements are captured
3. Provide brand assets (logo, colors, fonts)
4. [IF Q4.2 = content needed: Prepare content or confirm content writing service]
5. Approve budget and timeline
6. Sign proposal and provide 50% deposit

**Cold Lava:**
1. Set up project repository
2. Create all third-party accounts
3. Begin Phase 1 setup
4. Schedule kickoff call

### Communication Plan

**Weekly Updates:**
- Progress report every [Day]
- Staging site link for review
- Feedback/approval requests

**Key Milestones:**
- Week 1: Design mockups ready
- Week [X]: Core pages live on staging
- Week [X]: All features complete
- Week [X]: Final review
- Week [X]: Launch

**Contact:**
- Project Manager: Oliver Tatler
- Email: oliver@otdm.net
- Phone: +44 151 541 6933
- Meeting Link: https://cal.com/coldlava/

---

## 17. Sign-Off

**Prepared by:**
Oliver Tatler
Cold Lava AI Ltd
oliver@otdm.net

**Client Approval:**

Name: _______________________________

Signature: _______________________________

Date: _______________________________

---

**Once approved, we'll kick off the project and deliver an exceptional website that drives results for your business!**

---

*Architecture Plan Version: 1.0*
*Based on Cold Lava A★★ Template*
*Last Updated: 2026-01-07*
