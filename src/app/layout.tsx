import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import { SmoothScroll, Navigation, Footer, CookieBanner, StickyCTA } from '@/components'
import { ConsoleEasterEgg } from '@/components/ConsoleEasterEgg'
import { DynamicFavicon } from '@/components/DynamicFavicon'
import { OrganizationSchema, LocalBusinessSchema, ServiceSchema, WebsiteSchema, BreadcrumbSchema } from '@/components/StructuredData'
import { GoogleTagManager, TrackingScripts } from '@/components/tracking'
import { LeadCaptureProvider } from '@/components/LeadCapture/LeadCaptureProvider'
import '@/styles/globals.css'

// Export Web Vitals reporting for Next.js
export { reportWebVitals } from '@/lib/analytics'

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-montserrat',
  display: 'swap',
})

// Viewport configuration (separate from metadata as per Next.js 14+)
export const viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
}

export const metadata: Metadata = {
  metadataBase: new URL('https://coldlava.ai'),
  title: {
    default: 'Cold Lava | Bespoke Software Development & AI Solutions',
    template: '%s | Cold Lava',
  },
  description: 'Bespoke Business Operating Systems, custom CRMs, AI voice agents and workflow automation for UK businesses. We build systems that let you focus on growth.',
  keywords: [
    'bespoke software development',
    'AI automation',
    'business automation',
    'Business Operating System',
    'BOS',
    'custom CRM development',
    'AI voice agents',
    'workflow automation',
    'n8n automation',
    'database reactivation',
    'AI consultancy UK',
    'software development United Kingdom',
    'Cold Lava',
  ],
  authors: [{ name: 'Cold Lava AI Ltd' }],
  creator: 'Cold Lava AI Ltd',
  publisher: 'Cold Lava AI Ltd',
  alternates: {
    canonical: 'https://coldlava.ai',
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: 'https://coldlava.ai',
    siteName: 'Cold Lava',
    title: 'Cold Lava | Bespoke Software Development & AI Solutions',
    description: 'Bespoke Business Operating Systems, custom CRMs, AI voice agents and workflow automation for UK businesses ready to scale.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Cold Lava - Bespoke Software Development and AI Automation for UK Businesses',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@coldlavaai',
    creator: '@coldlavaai',
    title: 'Cold Lava | Bespoke Software Development & AI Solutions',
    description: 'Bespoke Business Operating Systems, custom CRMs, AI voice agents and workflow automation for UK businesses ready to scale.',
    images: [
      {
        url: '/og-image.jpg',
        alt: 'Cold Lava - Bespoke Software Development and AI Automation for UK Businesses',
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code', // Replace with actual verification code
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={montserrat.variable}>
      <head>
        <OrganizationSchema />
        <LocalBusinessSchema />
        <ServiceSchema />
        <WebsiteSchema />
        <BreadcrumbSchema />
        <GoogleTagManager />
      </head>
      <body className="font-sans antialiased overflow-x-hidden">
        <ConsoleEasterEgg />
        <DynamicFavicon />
        <TrackingScripts />
        <LeadCaptureProvider />
        <SmoothScroll>
          <Navigation />
          <main>{children}</main>
          <Footer />
          <CookieBanner />
          <StickyCTA />
          <div className="grain" aria-hidden="true" />
        </SmoothScroll>
      </body>
    </html>
  )
}
