# Sentry Setup Instructions

Sentry error monitoring is configured but requires a DSN to activate.

## Quick Setup (5 minutes)

### 1. Create Sentry Account
1. Go to https://sentry.io/signup/
2. Create a free account (5,000 errors/month free)
3. Create a new project:
   - Platform: **Next.js**
   - Project name: **cold-lava-website**

### 2. Get Your DSN
After creating the project, Sentry will show you a DSN like:
```
https://xxxxxxxxxxxxx@o123456.ingest.sentry.io/789012
```

### 3. Add DSN to Environment
Create `.env.local` file (ignored by git):
```bash
NEXT_PUBLIC_SENTRY_DSN=https://your-dsn-here@sentry.io/your-project
NEXT_PUBLIC_SENTRY_ENVIRONMENT=production
```

### 4. Install Sentry SDK
```bash
npm install @sentry/nextjs
```

### 5. Run Sentry Wizard
```bash
npx @sentry/wizard@latest -i nextjs
```

This will:
- Create `sentry.client.config.ts`
- Create `sentry.server.config.ts`
- Create `sentry.edge.config.ts`
- Update `next.config.js` with Sentry webpack plugin

### 6. Test It Works
```bash
# Build and start
npm run build
npm run start

# Visit http://localhost:3000
# Check Sentry dashboard for events
```

## What You Get

### Error Tracking
- All JavaScript errors automatically captured
- Source maps for debugging
- User context (browser, OS, etc.)
- Breadcrumbs (user actions before error)

### Performance Monitoring
- API response times
- Page load times
- Component render times

### Release Tracking
- Track errors by deployment
- See which release introduced bugs

### Alerts
- Email on new errors
- Slack/Discord webhooks
- PagerDuty integration

## Configuration Already Done

✅ Error boundaries integrated
✅ Performance monitoring ready
✅ Environment config prepared
✅ Production-only tracking

Just add your DSN and you're live!

## Cost

**Free tier:**
- 5,000 errors/month
- 10,000 performance transactions/month
- 30-day data retention
- Unlimited projects

**Paid ($26/month):**
- 50,000 errors/month
- 100,000 performance transactions
- 90-day retention
- Priority support

For this site, **free tier is plenty**.

## Privacy & GDPR

Sentry is GDPR compliant:
- No PII collected by default
- Data stored in EU if needed
- User IP anonymization available
- Data scrubbing for sensitive info

## Documentation

- Next.js: https://docs.sentry.io/platforms/javascript/guides/nextjs/
- Configuration: https://docs.sentry.io/platforms/javascript/configuration/
- Options: https://docs.sentry.io/platforms/javascript/configuration/options/
