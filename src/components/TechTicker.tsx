'use client'

import Image from 'next/image'
import { useEffect, useRef } from 'react'

// Tech Stack - Engineering credibility logos
// Arranged to alternate: colored, white, colored, white, etc.
// White logos: Next.js, Vercel, GitHub
// Colored logos: TypeScript, React, Node.js, Python, Supabase, PostgreSQL, AWS, Docker
const techStackLogos = [
  { name: 'TypeScript', path: '/logos/typescript.svg' }, // colored (blue)
  { name: 'Next.js', path: '/logos/nextjs.png' }, // white
  { name: 'React', path: '/logos/react.svg' }, // colored (blue)
  { name: 'Vercel', path: '/logos/vercel.svg' }, // white
  { name: 'Node.js', path: '/logos/nodejs.svg' }, // colored (green)
  { name: 'GitHub', path: '/logos/github.png' }, // white
  { name: 'Python', path: '/logos/python.svg' }, // colored (blue/yellow)
  { name: 'Supabase', path: '/logos/supabase.svg' }, // colored (green)
  { name: 'PostgreSQL', path: '/logos/postgresql.svg' }, // colored (blue)
  { name: 'AWS', path: '/logos/aws.svg' }, // colored (orange)
  { name: 'Docker', path: '/logos/docker.svg' }, // colored (blue)
]

// Integrations - Business utility logos
// Arranged to alternate: colored, white, colored, white, etc.
// Pattern assumes roughly equal white/colored distribution
const integrationsLogos = [
  { name: 'HubSpot', path: '/logos/hubspot.png' }, // colored (orange)
  { name: 'Stripe', path: '/logos/stripe.svg' }, // white
  { name: 'Xero', path: '/logos/xero.png' }, // colored (blue)
  { name: 'Shopify', path: '/logos/shopify.svg' }, // white
  { name: 'Twilio', path: '/logos/twilio.svg' }, // colored (red)
  { name: 'OpenAI', path: '/logos/openai.svg' }, // white
  { name: 'WhatsApp', path: '/logos/whatsapp.svg' }, // colored (green)
  { name: 'Cal.com', path: '/logos/cal.svg' }, // white
  { name: 'Google', path: '/logos/google.png' }, // colored (multicolor)
  { name: 'Zapier', path: '/logos/zapier.png' }, // white
  { name: 'n8n', path: '/logos/n8n.svg' }, // colored (pink)
  { name: 'Make', path: '/logos/make.png' }, // white
  { name: 'Claude', path: '/logos/claude.svg' }, // colored (orange)
  { name: 'Airtable', path: '/logos/airtable.png' }, // white
  { name: 'Anthropic', path: '/logos/anthropic.svg' }, // colored (tan)
  { name: 'Retell', path: '/logos/retell.png' }, // white
  { name: 'ElevenLabs', path: '/logos/elevenlabs.svg' }, // colored
  { name: 'VAPI', path: '/logos/VAPIFULL.png' }, // white
]

type Logo = { name: string; path: string }

function LogoTicker({ logos, speed = 'normal' }: { logos: Logo[]; speed?: 'normal' | 'fast' }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const repeatedLogos = [...logos, ...logos, ...logos]
  const animationClass = speed === 'fast' ? 'animate-ticker-fast' : 'animate-ticker'

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const updateSpotlight = () => {
      const items = container.querySelectorAll('[data-logo-item]')

      // Find the logo closest to center
      const centerX = window.innerWidth / 2
      let closestLogo: Element | null = null
      let smallestDistance = Infinity

      items.forEach((item) => {
        const rect = item.getBoundingClientRect()
        const logoCenter = rect.left + rect.width / 2
        const distanceFromCenter = Math.abs(centerX - logoCenter)

        if (distanceFromCenter < smallestDistance) {
          smallestDistance = distanceFromCenter
          closestLogo = item
        }
      })

      // Apply color only to the closest logo
      items.forEach((item) => {
        const img = item.querySelector('.logo-img')
        if (!img) return

        if (item === closestLogo) {
          // Show color
          img.classList.remove('grayscale', 'opacity-60')
          img.classList.add('grayscale-0', 'opacity-100')
        } else {
          // Show grayscale
          img.classList.add('grayscale', 'opacity-60')
          img.classList.remove('grayscale-0', 'opacity-100')
        }
      })
    }

    // Update continuously as ticker animates
    const interval = setInterval(updateSpotlight, 50)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative overflow-hidden">
      {/* Subtle gradient edges */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

      <div
        ref={containerRef}
        className={`flex items-center ${animationClass} relative z-[1]`}
        style={{ width: 'max-content' }}
      >
        {repeatedLogos.map((logo, index) => (
          <div
            key={index}
            data-logo-item
            className="group flex-shrink-0 px-8 md:px-10"
          >
            <div className="h-12 w-32 flex items-center justify-center">
              <Image
                src={logo.path}
                alt={logo.name}
                width={140}
                height={48}
                className="logo-img h-10 w-auto max-w-full object-contain opacity-60 grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
                unoptimized
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export function TechStackTicker() {
  return (
    <div className="py-6">
      <LogoTicker logos={techStackLogos} speed="fast" />
    </div>
  )
}

export function IntegrationsTicker() {
  return (
    <div className="py-6">
      <LogoTicker logos={integrationsLogos} />
    </div>
  )
}

// Legacy export for backward compatibility
export function TechTicker() {
  return <TechStackTicker />
}
