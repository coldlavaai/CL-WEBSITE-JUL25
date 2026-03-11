'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { GridOverlay, ScrollProgressBar, TechnicalLabel } from '@/components'
import type { MarketingSection, ContentSection, FAQ, PageType } from '@/data/pseo'

// ─── Architectural Button (matching homepage) ─────────────────────
function ArchitecturalButton({
  href,
  children,
  variant = 'primary',
  className = '',
}: {
  href: string
  children: React.ReactNode
  variant?: 'primary' | 'secondary'
  className?: string
}) {
  const isPrimary = variant === 'primary'
  return (
    <a
      href={href}
      target={href.startsWith('http') ? '_blank' : undefined}
      rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
      className={`group relative inline-block ${className}`}
    >
      <div className="absolute -inset-2 border border-cyan-500/20 group-hover:border-[#C9A962]/40 transition-all duration-500" />
      <div className="absolute -top-1 -left-1 w-4 h-4 border-l border-t border-cyan-500/40 group-hover:border-[#C9A962]/70 transition-all duration-500" />
      <div className="absolute -bottom-1 -right-1 w-4 h-4 border-r border-b border-cyan-500/40 group-hover:border-[#C9A962]/70 transition-all duration-500" />
      <div
        className={`relative px-8 py-4 font-medium overflow-hidden ${
          isPrimary ? 'bg-white text-black' : 'bg-white/5 text-white border border-white/10'
        }`}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#C9A962] to-[#D4B76E] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out" />
        <span className="relative z-10 flex items-center justify-center gap-3 group-hover:text-black transition-colors duration-300">
          <span>{children}</span>
          <svg
            className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </span>
        <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12" />
      </div>
    </a>
  )
}

// ─── Architectural Card ───────────────────────────────────────────
function ArchCard({
  children,
  className = '',
  delay = 0,
}: {
  children: React.ReactNode
  className?: string
  delay?: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={`group relative bg-white/[0.02] border border-white/5 p-6 md:p-7 hover:border-cyan-500/30 hover:bg-white/[0.03] transition-all duration-500 ${className}`}
    >
      <div className="absolute top-0 left-0 w-4 h-4 border-l border-t border-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="absolute top-0 right-0 w-4 h-4 border-r border-t border-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="absolute bottom-0 left-0 w-4 h-4 border-l border-b border-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="absolute bottom-0 right-0 w-4 h-4 border-r border-b border-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-[0.02] transition-opacity duration-500 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(6, 182, 212, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(6, 182, 212, 0.3) 1px, transparent 1px)',
          backgroundSize: '20px 20px',
        }}
      />
      {children}
    </motion.div>
  )
}

// ─── Difficulty/Impact Badge ──────────────────────────────────────
function Badge({ label, variant }: { label: string; variant: 'difficulty' | 'cost' | 'impact' }) {
  const colours = {
    difficulty: {
      beginner: 'border-green-500/30 text-green-400/80',
      intermediate: 'border-yellow-500/30 text-yellow-400/80',
      advanced: 'border-red-500/30 text-red-400/80',
    },
    cost: {
      free: 'border-green-500/30 text-green-400/80',
      low: 'border-cyan-500/30 text-cyan-400/80',
      medium: 'border-yellow-500/30 text-yellow-400/80',
      high: 'border-red-500/30 text-red-400/80',
    },
    impact: {
      high: 'border-cyan-500/30 text-cyan-400/80',
      medium: 'border-white/20 text-white/60',
      low: 'border-white/10 text-white/40',
    },
  } as Record<string, Record<string, string>>

  const colourMap = colours[variant] || {}
  const cls = colourMap[label.toLowerCase()] || 'border-white/10 text-white/40'

  return (
    <span className={`inline-block px-2 py-0.5 border text-[10px] font-mono uppercase tracking-wider ${cls}`}>
      {label}
    </span>
  )
}

// ─── Marketing Ideas Section ──────────────────────────────────────
function MarketingIdeasRenderer({ sections }: { sections: MarketingSection[] }) {
  return (
    <div className="space-y-16">
      {sections.map((section, sIdx) => (
        <motion.div
          key={sIdx}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
        >
          {/* Section Header */}
          <div className="flex items-center gap-4 mb-8">
            <div className="w-1 h-8 bg-cyan-500/60" />
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight">{section.section_title}</h2>
          </div>

          {/* Ideas Grid */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {section.ideas.map((idea, iIdx) => (
              <ArchCard key={idea.number} delay={iIdx * 0.03}>
                {/* Idea Number */}
                <div className="flex items-center gap-2 mb-3">
                  <span className="font-mono text-[10px] text-cyan-500/60 tracking-wider">
                    {String(idea.number).padStart(2, '0')}
                  </span>
                  <div className="flex-1 h-px bg-gradient-to-r from-white/10 to-transparent" />
                </div>

                {/* Title */}
                <h3 className="text-base md:text-lg font-semibold mb-2 leading-tight">{idea.title}</h3>

                {/* Description */}
                <p className="text-white/60 text-sm leading-relaxed mb-4">{idea.description}</p>

                {/* Badges */}
                <div className="flex flex-wrap gap-2 border-t border-white/5 pt-3">
                  <Badge label={idea.difficulty} variant="difficulty" />
                  <Badge label={idea.cost} variant="cost" />
                  <Badge label={idea.impact} variant="impact" />
                </div>
              </ArchCard>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  )
}

// ─── Article Sections Renderer ────────────────────────────────────
function ArticleSectionsRenderer({ sections }: { sections: ContentSection[] }) {
  return (
    <div className="space-y-12">
      {sections.map((section, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, delay: idx * 0.05 }}
        >
          <ArchCard>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-1 h-8 bg-cyan-500/60" />
              <h2 className="text-xl md:text-2xl font-semibold">{section.heading}</h2>
            </div>
            <div className="text-white/60 text-sm md:text-base leading-relaxed space-y-4">
              {section.content.split('\n\n').map((para, pIdx) => (
                <p key={pIdx}>{para}</p>
              ))}
            </div>
          </ArchCard>
        </motion.div>
      ))}
    </div>
  )
}

// ─── FAQ Renderer ─────────────────────────────────────────────────
function FAQRenderer({ faqs }: { faqs: FAQ[] }) {
  if (faqs.length === 0) return null
  return (
    <section className="py-16 md:py-24 border-t border-white/5 relative">
      <GridOverlay spacing={48} opacity={0.01} />
      <div className="container-default max-w-4xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="h-px w-12 bg-cyan-500/40" />
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-cyan-500/60">FAQ</p>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Frequently asked <span className="text-cyan-400">questions</span>
          </h2>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <ArchCard key={idx} delay={idx * 0.05}>
              <div className="flex items-start gap-3 mb-3">
                <span className="text-cyan-500 mt-1 flex-shrink-0">→</span>
                <h3 className="text-base md:text-lg font-semibold">{faq.question}</h3>
              </div>
              <p className="text-white/60 text-sm md:text-base leading-relaxed pl-6">{faq.answer}</p>
            </ArchCard>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── CTA Section ──────────────────────────────────────────────────
function CTASection({ cta }: { cta: string }) {
  return (
    <section className="py-16 md:py-24 border-t border-white/5 relative overflow-hidden">
      <GridOverlay spacing={32} opacity={0.015} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-3xl" />

      <div className="container-default max-w-3xl relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {/* Corner-bracketed box */}
          <div className="relative border border-white/5 p-8 md:p-12">
            <div className="absolute top-0 left-0 w-6 h-6 border-l-2 border-t-2 border-cyan-500/30" />
            <div className="absolute top-0 right-0 w-6 h-6 border-r-2 border-t-2 border-cyan-500/30" />
            <div className="absolute bottom-0 left-0 w-6 h-6 border-l-2 border-b-2 border-cyan-500/30" />
            <div className="absolute bottom-0 right-0 w-6 h-6 border-r-2 border-b-2 border-cyan-500/30" />

            <div className="absolute -top-3 left-8 bg-black px-3">
              <span className="font-mono text-[9px] text-cyan-500/40 uppercase tracking-wider">
                Next Step
              </span>
            </div>

            <p className="text-xl md:text-2xl lg:text-3xl font-light text-white/90 mb-8 leading-relaxed">
              {cta}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <ArchitecturalButton href="https://cal.com/coldlava/discovery-call">
                Book a free demo
              </ArchitecturalButton>
              <ArchitecturalButton href="mailto:hello@coldlava.ai" variant="secondary">
                hello@coldlava.ai
              </ArchitecturalButton>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// ─── Back to Home Link ────────────────────────────────────────────
function BackLink() {
  return (
    <Link
      href="/"
      className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white transition-colors group"
    >
      <svg
        className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform duration-300"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 17l-5-5m0 0l5-5m-5 5h12" />
      </svg>
      <span>Back to Cold Lava</span>
    </Link>
  )
}

// ─── Main Client Component ────────────────────────────────────────
interface PSEOPageClientProps {
  page: {
    title: string
    slug: string
    meta_description: string
    target_keyword: string
    intro: string
    cta: string
  }
  pageType: PageType
  marketingSections: MarketingSection[]
  contentSections: ContentSection[]
  faqs: FAQ[]
}

export function PSEOPageClient({
  page,
  pageType,
  marketingSections,
  contentSections,
  faqs,
}: PSEOPageClientProps) {
  return (
    <div className="relative">
      <ScrollProgressBar />

      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="relative min-h-[60vh] flex items-center border-b border-white/5 overflow-hidden">
        <GridOverlay spacing={32} opacity={0.015} />
        <TechnicalLabel position="bottom-right">Cold Lava AI</TechnicalLabel>

        {/* Subtle glow */}
        <div className="absolute top-1/4 -left-1/4 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-3xl" />

        {/* Dimension lines */}
        <div className="absolute left-0 top-1/4 w-px h-1/2 bg-gradient-to-b from-transparent via-cyan-500/20 to-transparent" />
        <div className="absolute right-0 top-1/3 w-px h-1/3 bg-gradient-to-b from-transparent via-cyan-500/20 to-transparent" />

        <div className="container-default relative z-10 pt-28 pb-16 md:pb-24">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="mb-8"
          >
            <BackLink />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="font-mono text-[10px] md:text-xs uppercase tracking-[0.3em] text-cyan-500/60 mb-6"
          >
            {page.target_keyword}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] mb-8 max-w-4xl"
          >
            {page.title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-base md:text-lg lg:text-xl text-white/60 max-w-3xl leading-relaxed"
          >
            {page.intro}
          </motion.p>

          {/* Decorative border */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="mt-10 border-t border-white/5 pt-6"
          >
            <p className="font-mono text-[10px] uppercase tracking-wider text-white/20">
              By <span className="text-cyan-500/40">Cold Lava AI</span> · United Kingdom
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Content ──────────────────────────────────────── */}
      {pageType === 'marketing-ideas' && marketingSections.length > 0 && (
        <section className="py-16 md:py-24 border-b border-white/5 relative">
          <GridOverlay spacing={48} opacity={0.01} />
          <div className="container-default max-w-6xl relative z-10">
            <MarketingIdeasRenderer sections={marketingSections} />
          </div>
        </section>
      )}

      {pageType === 'article' && contentSections.length > 0 && (
        <section className="py-16 md:py-24 border-b border-white/5 relative">
          <GridOverlay spacing={48} opacity={0.01} />
          <div className="container-default max-w-4xl relative z-10">
            <ArticleSectionsRenderer sections={contentSections} />
          </div>
        </section>
      )}

      {pageType === 'calculator' && (
        <section className="py-16 md:py-24 border-b border-white/5 relative">
          <GridOverlay spacing={48} opacity={0.01} />
          <div className="container-default max-w-3xl relative z-10 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="relative border border-cyan-500/20 bg-cyan-500/5 p-8 md:p-12">
                <div className="absolute top-0 left-0 w-5 h-5 border-l-2 border-t-2 border-cyan-500/30" />
                <div className="absolute bottom-0 right-0 w-5 h-5 border-r-2 border-b-2 border-cyan-500/30" />
                <div className="absolute -top-3 left-8 bg-black px-3">
                  <span className="font-mono text-[9px] text-cyan-500/60 uppercase tracking-wider">
                    Calculator Tool
                  </span>
                </div>
                <p className="text-xl md:text-2xl text-white/80 font-light leading-relaxed mb-6">
                  This calculator is coming soon. In the meantime, our team can run these numbers for you on a quick call.
                </p>
                <ArchitecturalButton href="https://cal.com/coldlava/discovery-call">
                  Get your free calculation
                </ArchitecturalButton>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* ── FAQ ──────────────────────────────────────────── */}
      <FAQRenderer faqs={faqs} />

      {/* ── CTA ──────────────────────────────────────────── */}
      <CTASection cta={page.cta} />
    </div>
  )
}
