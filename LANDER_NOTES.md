# /lander Landing Page — Living Notes

Working doc for the `coldlava.ai/lander` page. Update as decisions change.

---

## Where it lives

| Thing | Path |
|---|---|
| Server shell (metadata, noindex) | `src/app/lander/page.tsx` |
| Client component (all UI, form, Cal embed) | `src/app/lander/LanderClient.tsx` |
| Form submission endpoint | `src/app/api/leads/capture/route.ts` (shared) |
| CSP (must allow Cal.com) | `next.config.js` |
| Route | `https://coldlava.ai/lander` |
| `robots` | `noindex, nofollow` (kept out of SEO, for paid/social only) |

---

## Origin and positioning

- Inspired by Cam England's https://licenseandscale.com/lander. We kept the **structure** (hero, qualifier, objections, CTA) but rewrote the voice.
- Core positioning (Oliver, 2026-04-22):
  > "We talk to you, we audit your business, work out exactly what processes we can help with AI, and streamline your operations so you do not have to take on more staff. You do not fire anyone. You just do not have to hire to scale and grow."
- Headline: **SCALE WITHOUT HIRING. KEEP THE TEAM YOU HAVE.**
- Placeholder guarantee hook (from Cam): **"If it does not save you £50,000 a year in payroll, you do not pay."**
- Target: UK operators, 10 to 200 headcount. Construction, trades, finance, solar, professional services.

---

## Current section flow (5 sections)

1. **Hero** — badge, caps headline, guarantee hook, subhead, CTA, trust line
2. **Form** (Step 1) — 4 qualifier questions + contact. Posts to `/api/leads/capture` with a `qualifier` sub-object.
3. **Cal.com embed** (Step 2) — **only renders after form submit**. Auto-scrolls into view.
4. **How it works** — 3 steps (We talk / We audit / You scale) with deliverable bullets inline.
5. **Objections + final CTA** — 4 Q&A cards, then repeat headline and CTA.

---

## Voice and copy rules (strict)

- **Zero dashes** in visible copy. No `-`, `—`, `–`. Rewrite compounds ("off the shelf", "on site", "follow up", "30 minute call").
- **Caps for all H1 and section H2s.** Sub-headlines in mixed case.
- **No "free"** anywhere. The audit is paid (price TBD).
- No hype metrics, no emoji, no "1000+ clients" style claims.
- First-person plural ("we"), direct, UK English.
- Client references must be real: Aztec Landscapes, Eiles Finance, RML, Greenstar Solar.

---

## Brand tokens

- Background: `#000`
- Accent: **`cyan-500` (#06b6d4)** — matches live coldlava.ai, not the `lava-500` orange that's in `tailwind.config.js` but unused on the live site.
- Typography: Montserrat, Apple style scale from `tailwind.config.js` (`text-display`, `text-headline`, `text-subhead`).
- CTA: white fill, black text, cyan hover. Matches homepage button convention.

---

## Cal.com integration

- Package: `@calcom/embed-react` v1.5.3
- Public link: `cal.com/coldlava/discovery-call`
- Embed config: `namespace="discovery-call"`, `calLink="coldlava/discovery-call"`, `layout: "month_view"`, `height: 1000px`
- Event listener: `bookingSuccessful` → swaps the widget for a thank you panel (`booked` state)
- **CSP must allow** `https://app.cal.com` AND `https://cal.com` on `script-src`, `frame-src`, `connect-src`, `style-src`, `font-src`. If the widget ever goes blank again, check `next.config.js` CSP first.

---

## Form capture

- Endpoint: `POST /api/leads/capture`
- Payload shape:
  ```json
  {
    "name": "...", "email": "...", "phone": "...", "company": "...",
    "lead_magnet": "AI Operations Audit",
    "source": "/lander",
    "trigger": "manual",
    "qualifier": {
      "industry": "...", "teamSize": "...",
      "bottleneck": "...", "context": "..."
    }
  }
  ```
- **Known issue (not lander specific):** the capture endpoint writes to `data/leads.json` on the local filesystem. That file is ephemeral on Vercel so writes don't persist. Same issue affects all lead capture across the site. Fix separately (Supabase table or similar).

---

## Open decisions / placeholders

| Item | Status | Notes |
|---|---|---|
| Audit price | TBD | Shown as paid, no figure yet |
| £50k guarantee | Placeholder | Cam England's number, needs our own terms or be dropped |
| Case study numbers | None | "Aztec Landscapes · Eiles Finance · RML · Greenstar Solar" as text strip only. Logos + 1 real quote with £ or hours saved would lift this fast |
| Hide nav/footer? | Kept visible | Oliver was neutral. Lander convention is to hide; revisit if conversion lags |
| Post booking destination | Stays on page | Shows thank you panel. Could redirect to a dedicated `/thanks` if we want remarketing pixels to fire cleanly |
| Limited slots hook ("3 audits left this month") | Not added | Considered, not implemented. Only add if true |

---

## Commit history for this page

Check with: `git log --oneline -- src/app/lander/ next.config.js`

Key commits (most recent first):
- `9fd25c8` refactor(lander): caps hero, payroll guarantee hook, purge all dashes
- `4de728e` fix(lander): allow Cal.com through CSP, gate widget behind form submit
- `e6b9f8c` refactor(lander): match site brand, rewrite around "scale without hiring"
- `a90fde9` feat: add /lander landing page with Cal.com embed

---

## Fast iteration checklist

When changing copy:
1. Edit `src/app/lander/LanderClient.tsx`
2. Grep for dashes: `grep -nE "[a-z]-[a-z]|—|–" src/app/lander/LanderClient.tsx`
3. `npx next build` to catch type errors
4. Commit (`npm run dev` preview optional for copy only tweaks)

When changing structure or adding sections:
1. Consider whether it adds friction before the form (it probably does). Cut don't add.
2. If adding a third party embed, update CSP in `next.config.js` first.
3. Build, preview, commit.

When pushing changes:
- Git author must be `oliver@coldlava.ai` for Vercel auto deploy.
- Production URL populates in ~60 to 90 seconds after push to `main`.
