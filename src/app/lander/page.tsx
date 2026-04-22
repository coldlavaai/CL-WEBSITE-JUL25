import type { Metadata } from 'next'
import { LanderClient } from './LanderClient'

export const metadata: Metadata = {
  title: 'Free AI ROI Audit | Cold Lava',
  description:
    'We install custom-built AI systems into UK businesses to cut cost, automate roles, and streamline operations. Answer 4 questions and get a free ROI audit.',
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
  alternates: { canonical: 'https://coldlava.ai/lander' },
  openGraph: {
    title: 'Free AI ROI Audit | Cold Lava',
    description:
      'Answer 4 questions. See exactly where AI can cut cost, which roles can be automated, and what you would save in the first 90 days.',
    url: 'https://coldlava.ai/lander',
    type: 'website',
  },
}

export default function LanderPage() {
  return <LanderClient />
}
