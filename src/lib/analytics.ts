/**
 * Performance monitoring and Web Vitals reporting
 * Tracks Core Web Vitals: LCP, FID, CLS, FCP, TTFB
 */

export interface WebVitalMetric {
  id: string
  name: string
  value: number
  rating: 'good' | 'needs-improvement' | 'poor'
  delta: number
  navigationType: string
}

/**
 * Report Web Vitals to analytics
 * Called automatically by Next.js when metrics are available
 */
export function reportWebVitals(metric: WebVitalMetric) {
  // Log in development
  if (process.env.NODE_ENV === 'development') {
    console.log(`[Web Vital] ${metric.name}:`, {
      value: Math.round(metric.value),
      rating: metric.rating,
      delta: Math.round(metric.delta),
    })
  }

  // Send to analytics in production
  if (typeof window !== 'undefined' && process.env.NODE_ENV === 'production') {
    // Track with dataLayer (Google Analytics / GTM)
    if ('dataLayer' in window) {
      ;(window as any).dataLayer = (window as any).dataLayer || []
      ;(window as any).dataLayer.push({
        event: 'web_vitals',
        metric_name: metric.name,
        metric_value: Math.round(metric.value),
        metric_rating: metric.rating,
        metric_delta: Math.round(metric.delta),
      })
    }

    // Track with Facebook Pixel
    if ('fbq' in window && typeof (window as any).fbq === 'function') {
      ;(window as any).fbq('trackCustom', 'WebVital', {
        name: metric.name,
        value: Math.round(metric.value),
        rating: metric.rating,
      })
    }

    // Can also send to custom analytics endpoint
    // fetch('/api/analytics/vitals', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(metric),
    // }).catch(() => {})
  }
}

/**
 * Track custom events
 */
export function trackEvent(eventName: string, properties?: Record<string, any>) {
  if (typeof window === 'undefined') return

  // Google Analytics / GTM
  if ('dataLayer' in window) {
    ;(window as any).dataLayer = (window as any).dataLayer || []
    ;(window as any).dataLayer.push({
      event: eventName,
      ...properties,
    })
  }

  // Facebook Pixel
  if ('fbq' in window && typeof (window as any).fbq === 'function') {
    ;(window as any).fbq('trackCustom', eventName, properties)
  }

  // Console log in development
  if (process.env.NODE_ENV === 'development') {
    console.log(`[Event] ${eventName}:`, properties)
  }
}

/**
 * Track page views
 */
export function trackPageView(url: string) {
  if (typeof window === 'undefined') return

  // Google Analytics / GTM
  if ('dataLayer' in window) {
    ;(window as any).dataLayer = (window as any).dataLayer || []
    ;(window as any).dataLayer.push({
      event: 'page_view',
      page_url: url,
    })
  }

  // Facebook Pixel
  if ('fbq' in window && typeof (window as any).fbq === 'function') {
    ;(window as any).fbq('track', 'PageView')
  }
}
