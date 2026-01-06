'use client'

import { motion } from 'framer-motion'
import { FadeIn, TechStackTicker, IntegrationsTicker, GridOverlay, TechnicalLabel, BOSVisual } from '@/components'

const services = [
  {
    num: '01',
    title: 'Business systems built to spec',
    description: 'CRMs, platforms, and internal tools designed around your workflows.',
  },
  {
    num: '02',
    title: 'Voice and chat agents that work 24/7',
    description: 'Custom AI that handles calls, qualifies leads, and books appointments.',
  },
  {
    num: '03',
    title: 'Workflows that run without you',
    description: 'Connect systems, eliminate manual tasks, and build processes that scale.',
  },
  {
    num: '04',
    title: 'AI strategy without the jargon',
    description: 'Assess operations, identify opportunities, and build executable roadmaps.',
  },
]

const process = [
  { num: '01', title: 'Diagnose', desc: 'Understanding your business, not just requirements.' },
  { num: '02', title: 'Design', desc: 'Clear scope, timeline, and cost before any code.' },
  { num: '03', title: 'Build', desc: 'Short cycles with regular check-ins. Weekly progress.' },
  { num: '04', title: 'Support', desc: 'Launch isn\'t the end. We optimise as you grow.' },
]

const testimonials = [
  {
    quote: 'They helped us automate our whole sales process and built us a website that represents the business brilliantly.',
    author: 'Jason Wides',
    company: 'Greenstar Solar',
  },
  {
    quote: 'We have an AI assistant who answers the phone, grabs details and books jobs. We capture every client possible.',
    author: 'Austin Eszcori',
    company: 'Detail Dynamics',
  },
  {
    quote: 'Working with Cold Lava has allowed us to rethink our client delivery systems.',
    author: 'Harry Bennett',
    company: 'LCB',
  },
]

export default function Home() {
  return (
    <div className="relative">
      {/* HERO - Massive Typography */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <GridOverlay spacing={32} opacity={0.015} />

        {/* Technical Annotations */}
        <TechnicalLabel position="top-left">53.4084°N, 2.9916°W</TechnicalLabel>
        <TechnicalLabel position="top-right">v2.0.26</TechnicalLabel>
        <TechnicalLabel position="bottom-left">EST. 2024</TechnicalLabel>
        <TechnicalLabel position="bottom-right">Liverpool, UK</TechnicalLabel>

        {/* Orange glow (subtle) */}
        <div className="absolute top-1/4 -left-1/4 w-[800px] h-[800px] bg-orange-500/5 rounded-full blur-3xl" />

        <div className="container-default relative z-10 py-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-6xl"
          >
            {/* Eyebrow */}
            <p className="font-mono text-[10px] md:text-xs uppercase tracking-[0.3em] text-white/30 mb-12">
              AI Consultancy & Software Development
            </p>

            {/* MASSIVE Headline */}
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-[-0.03em] leading-[0.9] mb-12 max-w-5xl">
              We Build The{' '}
              <span className="block text-white/40 italic font-light">Systems</span>
              <span className="block">Your Business</span>
              <span className="block relative">
                Actually Needs
                <span className="absolute -right-4 top-0 w-1 h-full bg-orange-500" />
              </span>
            </h1>

            {/* Subhead */}
            <p className="text-xl md:text-2xl text-white/50 max-w-2xl mb-16 leading-relaxed font-light">
              Custom software, AI agents, and automation for UK businesses ready to scale beyond generic tools.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 mb-20">
              <a
                href="https://cal.com/coldlava/discovery-call"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative px-8 py-4 bg-white text-black font-medium overflow-hidden"
              >
                <span className="relative z-10">Talk to us</span>
                <div className="absolute inset-0 bg-orange-500 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
              </a>
              <a
                href="#work"
                className="px-8 py-4 border border-white/10 hover:border-white/30 transition-colors font-medium font-mono text-sm"
              >
                View our work →
              </a>
            </div>

            {/* Tech Stack Ticker */}
            <div>
              <p className="font-mono text-[10px] uppercase tracking-wider text-white/20 mb-4">
                Modern stack. Serious security. UK-based.
              </p>
              <TechStackTicker />
            </div>
          </motion.div>
        </div>

        {/* Dimension line (decorative) */}
        <div className="absolute right-0 top-1/2 w-px h-32 bg-orange-500/20" />
      </section>

      {/* SERVICES - Asymmetric Grid */}
      <section id="services" className="py-32 border-t border-white/5 relative">
        <div className="container-default">
          {/* Section Header */}
          <div className="mb-20">
            <p className="font-mono text-xs uppercase tracking-wider text-white/30 mb-4">
              Services
            </p>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight max-w-3xl">
              Systems that work around your business
            </h2>
          </div>

          {/* Service Cards - Split Layout */}
          <div className="grid md:grid-cols-12 gap-6">
            {/* Left Column - Featured (spans 7 cols) */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="md:col-span-7 bg-white/[0.02] border border-white/5 p-8 md:p-12 hover:border-orange-500/20 transition-all duration-500 group"
            >
              <span className="font-mono text-xs text-orange-500 mb-4 block">{services[0].num}</span>
              <h3 className="text-2xl md:text-3xl font-semibold mb-4 group-hover:text-orange-500 transition-colors">
                {services[0].title}
              </h3>
              <p className="text-white/50 text-lg leading-relaxed">
                {services[0].description}
              </p>
            </motion.div>

            {/* Right Column - Stack of 3 */}
            <div className="md:col-span-5 space-y-6">
              {services.slice(1).map((service, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white/[0.02] border border-white/5 p-6 hover:border-orange-500/20 transition-all duration-500 group"
                >
                  <span className="font-mono text-xs text-orange-500 mb-2 block">{service.num}</span>
                  <h3 className="text-lg font-semibold mb-2 group-hover:text-orange-500 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-white/50 text-sm leading-relaxed">
                    {service.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* BOS - Full Width Dramatic */}
      <section id="bos" className="py-40 border-t border-white/5 relative overflow-hidden bg-white/[0.01]">
        <GridOverlay spacing={24} opacity={0.02} />
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-transparent" />

        <div className="container-default relative">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            {/* Left - Content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-block px-3 py-1 border border-orange-500/30 bg-orange-500/5 mb-8">
                <span className="font-mono text-xs text-orange-500 uppercase tracking-wider">
                  Coming 2026
                </span>
              </div>

              <h2 className="text-6xl md:text-8xl font-bold mb-4 tracking-tight">
                BOS
              </h2>
              <p className="text-3xl text-white/40 mb-8 font-light">
                Business Operating System
              </p>

              <p className="text-xl text-white/60 mb-10 leading-relaxed max-w-xl">
                We built BOS because CRMs are broken. An AI-native operating system designed for how modern businesses actually run.
              </p>

              <ul className="space-y-4 mb-12">
                {[
                  'Not another CRM. A complete operating system.',
                  'AI built in from the start, not bolted on.',
                  'One system instead of twelve integrations.',
                  'Built for operators, not administrators.',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="text-orange-500 mt-1">→</span>
                    <span className="text-white/50">{item}</span>
                  </li>
                ))}
              </ul>

              <a
                href="https://cal.com/coldlava/discovery-call"
                className="inline-block px-8 py-4 bg-orange-500 text-white font-medium hover:bg-orange-600 transition-colors"
              >
                Join waitlist
              </a>
            </motion.div>

            {/* Right - Visual */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <BOSVisual />
            </motion.div>
          </div>
        </div>
      </section>

      {/* INTEGRATIONS */}
      <section className="py-20 border-t border-white/5">
        <div className="container-default">
          <p className="font-mono text-xs text-white/20 text-center uppercase tracking-wider mb-8">
            We integrate with the tools you already use
          </p>
          <IntegrationsTicker />
        </div>
      </section>

      {/* PROCESS - Timeline */}
      <section className="py-32 border-t border-white/5 relative">
        <div className="container-default">
          <div className="mb-20">
            <p className="font-mono text-xs uppercase tracking-wider text-white/30 mb-4">
              Process
            </p>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight">
              No surprises.
              <br />
              No black boxes.
            </h2>
          </div>

          {/* Timeline */}
          <div className="grid md:grid-cols-4 gap-8 relative">
            {/* Connection Line */}
            <div className="hidden md:block absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/30 to-transparent" />

            {process.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="relative pt-8"
              >
                {/* Dot */}
                <div className="absolute top-0 left-0 w-2 h-2 bg-orange-500 rounded-full" />

                <span className="font-mono text-xs text-orange-500 mb-3 block">{step.num}</span>
                <h3 className="text-2xl font-semibold mb-3">{step.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>

          <p className="font-mono text-sm text-white/30 text-center mt-20">
            Good, fast, cheap. Pick two. We optimise for good.
          </p>
        </div>
      </section>

      {/* TESTIMONIALS - Editorial */}
      <section id="work" className="py-32 border-t border-white/5">
        <div className="container-default">
          <div className="mb-20">
            <p className="font-mono text-xs uppercase tracking-wider text-white/30 mb-4">
              Testimonials
            </p>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight">
              Satisfied customers
            </h2>
          </div>

          {/* Client Logos */}
          <div className="flex flex-wrap items-center gap-12 mb-20 opacity-60">
            <img src="/client-logos/DetailDynamics-Logo.png" alt="Detail Dynamics" className="h-8" />
            <img src="/client-logos/Greenstar-Logo.png" alt="Greenstar Solar" className="h-8" />
            <img src="/client-logos/LCB-Logo.png" alt="LCB" className="h-8" />
            <img src="/client-logos/UpmarketLeisure-Logo.png" alt="Upmarket" className="h-8 brightness-0 invert" />
          </div>

          {/* Testimonial Cards */}
          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`border border-white/5 p-8 ${i === 0 ? 'md:col-span-2' : ''}`}
              >
                <p className="text-xl md:text-2xl text-white/70 italic mb-6 leading-relaxed">
                  "{t.quote}"
                </p>
                <div className="flex items-center gap-4">
                  <div>
                    <p className="font-semibold">{t.author}</p>
                    <p className="text-sm text-white/40 font-mono">{t.company}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT - Split */}
      <section id="contact" className="py-32 border-t border-white/5 relative">
        <GridOverlay spacing={32} opacity={0.015} />

        <div className="container-default relative">
          <div className="grid md:grid-cols-2 gap-20">
            <div>
              <p className="font-mono text-xs uppercase tracking-wider text-white/30 mb-4">
                Contact
              </p>
              <h2 className="text-5xl md:text-7xl font-bold mb-8">
                Let's talk
              </h2>
              <p className="text-xl text-white/50 mb-6">
                Ready to build something? Book a discovery call or send us a message.
              </p>
              <p className="text-white/40">
                No pitch decks, no pressure.
              </p>
            </div>

            <div className="flex flex-col justify-center gap-4">
              <a
                href="https://cal.com/coldlava/discovery-call"
                className="w-full px-8 py-5 bg-white text-black text-center font-medium hover:bg-orange-500 hover:text-white transition-all duration-300"
              >
                Book a discovery call
              </a>
              <a
                href="mailto:hello@coldlava.ai"
                className="w-full px-8 py-5 border border-white/10 text-center font-mono text-sm hover:border-white/30 transition-colors"
              >
                hello@coldlava.ai
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
