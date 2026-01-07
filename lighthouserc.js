/**
 * Lighthouse CI configuration
 * Automated performance, accessibility, and SEO testing
 */
module.exports = {
  ci: {
    collect: {
      startServerCommand: 'npm run start',
      url: [
        'http://localhost:3000',
        'http://localhost:3000/privacy',
        'http://localhost:3000/terms',
        'http://localhost:3000/cookies',
      ],
      numberOfRuns: 3,
      settings: {
        // Run in headless mode
        chromeFlags: '--no-sandbox --disable-dev-shm-usage',
      },
    },
    assert: {
      preset: 'lighthouse:recommended',
      assertions: {
        // Performance
        'categories:performance': ['error', { minScore: 0.9 }],

        // Accessibility
        'categories:accessibility': ['error', { minScore: 0.95 }],

        // Best Practices
        'categories:best-practices': ['error', { minScore: 0.95 }],

        // SEO
        'categories:seo': ['error', { minScore: 0.95 }],

        // Core Web Vitals
        'first-contentful-paint': ['warn', { maxNumericValue: 2000 }],
        'largest-contentful-paint': ['warn', { maxNumericValue: 2500 }],
        'cumulative-layout-shift': ['error', { maxNumericValue: 0.1 }],
        'total-blocking-time': ['warn', { maxNumericValue: 300 }],

        // Resources
        'unused-javascript': ['warn', { maxLength: 0 }],
        'unused-css-rules': ['warn', { maxLength: 0 }],

        // Images
        'modern-image-formats': 'off', // Next.js handles this
        'uses-optimized-images': 'off', // Next.js handles this
        'offscreen-images': 'warn',

        // Network
        'uses-http2': 'warn',
        'uses-text-compression': 'warn',

        // Security (checked but not failed)
        'csp-xss': 'warn',
        'is-on-https': 'error',
      },
    },
    upload: {
      target: 'temporary-public-storage',
    },
  },
}
