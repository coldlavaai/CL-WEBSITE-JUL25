'use client'

import Image from 'next/image'

// All logos - we'll use one continuous set that loops infinitely
const allLogos = [
  { name: 'React', path: '/logos/react.svg' },
  { name: 'Next.js', path: '/logos/nextjs.png' },
  { name: 'TypeScript', path: '/logos/typescript.svg' },
  { name: 'Node.js', path: '/logos/nodejs.svg' },
  { name: 'Supabase', path: '/logos/supabase.svg' },
  { name: 'PostgreSQL', path: '/logos/postgresql.svg' },
  { name: 'OpenAI', path: '/logos/openai.svg' },
  { name: 'Claude', path: '/logos/claude.svg' },
  { name: 'Anthropic', path: '/logos/anthropic.svg' },
  { name: 'ElevenLabs', path: '/logos/elevenlabs.svg' },
  { name: 'Twilio', path: '/logos/twilio.svg' },
  { name: 'Telegram', path: '/logos/telegram.svg' },
  { name: 'WhatsApp', path: '/logos/whatsapp.svg' },
  { name: 'Shopify', path: '/logos/shopify.svg' },
  { name: 'WordPress', path: '/logos/wordpress.svg' },
  { name: 'Vercel', path: '/logos/vercel.svg' },
  { name: 'AWS', path: '/logos/aws.svg' },
  { name: 'Docker', path: '/logos/docker.svg' },
  { name: 'GitHub', path: '/logos/github.png' },
  { name: 'n8n', path: '/logos/n8n.svg' },
  { name: 'Google', path: '/logos/google.svg' },
  { name: 'Stripe', path: '/logos/stripe.svg' },
  { name: 'Cal.com', path: '/logos/cal.svg' },
  { name: 'Tailwind CSS', path: '/logos/tailwind.svg' },
]

function InfiniteTicker({ logos, reverse = false }: { logos: typeof allLogos; reverse?: boolean }) {
  // Triple the logos for truly seamless infinite scroll
  const tripleLogos = [...logos, ...logos, ...logos]

  return (
    <div className="relative overflow-hidden">
      {/* Gradient overlays */}
      <div className="absolute left-0 top-0 bottom-0 w-40 bg-gradient-to-r from-black via-black/80 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-40 bg-gradient-to-l from-black via-black/80 to-transparent z-10 pointer-events-none" />

      {/* Infinite ticker - uses CSS animation for smoothness */}
      <div
        className={`flex gap-16 ${reverse ? 'animate-ticker-reverse' : 'animate-ticker'}`}
        style={{ width: 'max-content' }}
      >
        {tripleLogos.map((logo, index) => (
          <div
            key={index}
            className="flex-shrink-0 flex items-center justify-center h-20 w-40 group"
          >
            <Image
              src={logo.path}
              alt={logo.name}
              width={160}
              height={80}
              className="h-16 w-auto object-contain brightness-0 invert opacity-60 group-hover:brightness-100 group-hover:invert-0 group-hover:opacity-100 transition-all duration-300"
              unoptimized
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export function TechTicker() {
  // Split logos for top/bottom tickers
  const midpoint = Math.ceil(allLogos.length / 2)
  const topLogos = allLogos.slice(0, midpoint)
  const bottomLogos = allLogos.slice(midpoint)

  return (
    <div className="py-4 space-y-8">
      {/* Top ticker - scrolls left */}
      <InfiniteTicker logos={topLogos} />

      {/* Bottom ticker - scrolls right */}
      <InfiniteTicker logos={bottomLogos} reverse />
    </div>
  )
}
