import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Solar BOS | Business Operating System for Solar Installers',
  description: 'Purpose-built business management platform for UK solar installation companies. CRM, quoting, job management, and compliance tracking in one system.',
  alternates: {
    canonical: 'https://coldlava.ai/solar-bos',
  },
  openGraph: {
    title: 'Solar BOS | Business Operating System for Solar Installers',
    description: 'Purpose-built business management platform for UK solar installation companies. CRM, quoting, job management in one system.',
    url: 'https://coldlava.ai/solar-bos',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Solar BOS - Business Operating System for UK Solar Installers by Cold Lava',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Solar BOS | Business Operating System for Solar Installers',
    description: 'Purpose-built business management for UK solar companies. CRM, quoting, job management, and compliance tracking.',
  },
}

export default function SolarBOSLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
