import { FadeIn, StaggerChildren, StaggerItem, TechStackTicker, IntegrationsTicker, GridOverlay, TechnicalLabel, BOSVisual } from '@/components'

const services = [
  {
    title: 'Business systems built to spec',
    description: 'CRMs, platforms, and internal tools designed around your workflows. No adapting your business to fit the software.',
    featured: true, // Make this one bigger
  },
  {
    title: 'Voice and chat agents that work 24/7',
    description: 'Custom-built AI that handles calls, qualifies leads, books appointments, and answers questions — trained on your business, in your tone.',
  },
  {
    title: 'Workflows that run without you',
    description: 'Connect your systems, eliminate manual tasks, and build processes that scale. From simple integrations to complex multi-step automation.',
  },
  {
    title: 'AI strategy without the jargon',
    description: 'Not sure where to start with AI? We assess your operations, identify opportunities, and build a roadmap you can actually execute.',
    wide: true, // Make this span 2 columns
  },
]

const process = [
  {
    num: '01',
    title: 'Diagnose',
    description: 'We start by understanding your business, not just your requirements.',
  },
  {
    num: '02',
    title: 'Design',
    description: 'Clear scope, timeline, and cost before we write a line of code.',
  },
  {
    num: '03',
    title: 'Build',
    description: 'We build in short cycles with regular check-ins. You see progress weekly.',
  },
  {
    num: '04',
    title: 'Support',
    description: 'Launch isn\'t the end. We optimise and evolve as your business grows.',
  },
]

const testimonials = [
  {
    quote: 'Things have completely changed for the better. They helped us automate our whole sales process and built us a website that represents the business brilliantly.',
    name: 'Jason Wides',
    company: 'Greenstar Solar',
    featured: true,
  },
  {
    quote: 'We have an AI assistant who answers the phone, grabs details and books jobs. We capture every client possible.',
    name: 'Austin Eszcori',
    company: 'Detail Dynamics',
  },
  {
    quote: 'Working with Cold Lava has allowed us to rethink our client delivery systems and reshape the way our industry works with data.',
    name: 'Harry Bennett',
    company: 'LCB',
  },
  {
    quote: 'The team\'s knowledge of AI and system development coupled with their work ethic made them the perfect partners.',
    name: 'Mat Cunningham',
    company: 'Upmarket Hotels & Leisure',
  },
  {
    quote: 'Incredibly efficient, knowledgeable, and easy to work with. Delivered everything on time, and often ahead of schedule.',
    name: 'Jack Castle',
  },
]

export default function RedesignDemo() {
  return (
    <>
      {/* Hero Section - Asymmetric Layout */}
      <section className="min-h-screen flex items-center relative overflow-hidden pt-20 grid-bg">
        <GridOverlay spacing={32} opacity={0.02} />
        <TechnicalLabel position="top-left">53.4084°N, 2.9916°W</TechnicalLabel>
        <TechnicalLabel position="top-right">Version 2.0.26</TechnicalLabel>
        <TechnicalLabel position="bottom-right">Liverpool, UK</TechnicalLabel>

        <div className="container-default">
          <div className="max-w-4xl"> {/* Left-aligned instead of centered */}
            <FadeIn>
              <p className="text-xs sm:text-sm uppercase tracking-[0.2em] text-white/40 mb-6 font-mono">
                AI consultancy & software development
              </p>
            </FadeIn>

            <FadeIn delay={0.1}>
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-semibold tracking-[-0.02em] leading-[0.95] mb-8">
                We Build The Systems Your Business Actually Needs
              </h1>
            </FadeIn>

            <FadeIn delay={0.2}>
              <p className="text-xl sm:text-2xl text-white/50 max-w-2xl mb-12 leading-relaxed">
                Custom software, AI agents, and automation for UK businesses ready to scale beyond generic tools.
              </p>
            </FadeIn>

            <FadeIn delay={0.3}>
              <div className="flex gap-4 mb-20">
                <a
                  href="https://cal.com/coldlava/discovery-call"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary glow-orange-sm"
                >
                  Talk to us
                </a>
                <a
                  href="#work"
                  className="btn-secondary"
                >
                  View our work
                </a>
              </div>
            </FadeIn>

            <FadeIn delay={0.4}>
              <p className="text-xs text-white/20 mb-6 uppercase tracking-widest font-mono">
                Modern stack. Serious security. UK-based.
              </p>
              <TechStackTicker />
            </FadeIn>
          </div>
        </div>

        {/* Subtle gradient orb - moved to left side */}
        <div
          className="absolute top-1/3 left-0 w-[600px] h-[600px] md:w-[900px] md:h-[900px] rounded-full opacity-10 blur-3xl pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(249,115,22,0.4) 0%, transparent 70%)',
          }}
        />
      </section>

      {/* Positioning Statement */}
      <section className="py-16 md:py-20 border-t border-white/5">
        <div className="container-default max-w-4xl">
          <FadeIn>
            <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-8 md:p-12 text-center">
              <p className="text-2xl md:text-3xl text-white/80 italic leading-relaxed mb-4">
                "Custom solutions for how you work, not how Silicon Valley thinks you should."
              </p>
              <p className="text-white/40 text-sm">— Oliver, Head Developer</p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Services Section - Bento Grid */}
      <section id="services" className="py-24 md:py-32 border-t border-white/5">
        <div className="container-default max-w-6xl">
          <div className="mb-16 text-center">
            <FadeIn>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight">
                Systems that work around your business
              </h2>
            </FadeIn>
          </div>

          {/* Bento Grid - varying sizes */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {services.map((service, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div
                  className={`
                    group relative bg-white/[0.03] hover:bg-white/[0.06] border border-white/5 hover:border-white/10
                    rounded-2xl p-6 md:p-8 transition-all duration-300 card-lift
                    ${service.featured ? 'md:row-span-2' : ''}
                    ${service.wide ? 'md:col-span-2' : ''}
                  `}
                >
                  <span className="absolute top-6 right-6 font-mono text-xs text-white/20">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="text-lg md:text-xl font-medium mb-3 group-hover:text-white transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-white/50 text-sm md:text-base leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={0.4}>
            <div className="text-center mt-16 md:mt-20 max-w-3xl mx-auto">
              <p className="text-white/40 italic text-base md:text-lg leading-relaxed mb-3">
                "They helped us automate our whole sales process and built us a website that represents the business brilliantly."
              </p>
              <p className="text-white/30 text-sm">— Jason Wides</p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* BOS Section - Diagonal Split with New Visual */}
      <section id="bos" className="py-24 md:py-32 border-t border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 via-transparent to-transparent pointer-events-none" />
        <GridOverlay spacing={20} opacity={0.015} />

        <div className="container-default max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <FadeIn>
              <div className="relative">
                <div className="absolute -top-4 -left-4 w-1 h-24 bg-orange-500/30" />

                <p className="text-sm uppercase tracking-[0.2em] text-orange-500 mb-4 font-mono glow-orange-subtle">
                  Coming 2026
                </p>

                <h2 className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight mb-2">
                  BOS
                </h2>
                <p className="text-xl md:text-2xl text-white/50 mb-6">
                  Business Operating System
                </p>

                <p className="text-lg text-white/70 mb-8 leading-relaxed">
                  We built BOS because CRMs are broken. An AI-native operating system designed for how modern businesses actually run.
                </p>

                <ul className="space-y-3 mb-10">
                  {[
                    'Not another CRM. A complete operating system.',
                    'AI built in from the start, not bolted on.',
                    'One system instead of twelve integrations.',
                    'Built for operators, not administrators.',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-white/50">
                      <span className="text-orange-500 mt-0.5 font-mono text-sm">—</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href="https://cal.com/coldlava/discovery-call"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-accent inline-block glow-orange-sm"
                >
                  Talk to us
                </a>
                <p className="text-sm text-white/30 mt-3 font-mono">
                  For operators done stitching together tools.
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div className="relative rounded-2xl border border-white/5 bg-white/[0.01] overflow-hidden">
                <BOSVisual />
              </div>
            </FadeIn>
          </div>

          {/* One-liner testimonial */}
          <FadeIn delay={0.3}>
            <div className="text-center mt-16 md:mt-20 max-w-3xl mx-auto">
              <p className="text-white/40 italic text-base md:text-lg leading-relaxed mb-3">
                "Working with Cold Lava has allowed us to rethink our client delivery systems and reshape the way our industry works with data."
              </p>
              <p className="text-white/30 text-sm">— Harry Bennett, LCB</p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Integrations Ticker */}
      <section className="py-16 border-t border-white/5">
        <div className="container-default">
          <FadeIn>
            <p className="text-xs text-white/20 mb-6 text-center uppercase tracking-widest font-mono">
              We integrate with the tools you already use
            </p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <IntegrationsTicker />
          </FadeIn>
        </div>
      </section>

      {/* Process Section - Horizontal Timeline */}
      <section className="py-24 md:py-32 border-t border-white/5">
        <div className="container-default max-w-6xl">
          <div className="mb-16 text-center">
            <FadeIn>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight mb-6">
                No surprises. No black boxes.
              </h2>
            </FadeIn>
            <FadeIn delay={0.1}>
              <p className="text-lg text-white/50 leading-relaxed max-w-2xl mx-auto">
                Every project follows a clear structure — whether it's a two-week automation or a six-month platform build.
              </p>
            </FadeIn>
          </div>

          {/* Horizontal timeline grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8 relative">
            {/* Connection line */}
            <div className="hidden md:block absolute top-12 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/30 to-transparent" />

            {process.map((step, i) => (
              <FadeIn key={i} delay={i * 0.15}>
                <div className="relative bg-white/[0.02] border border-white/5 rounded-2xl p-6 md:p-8 card-lift">
                  {/* Large decorative number */}
                  <span className="absolute -top-4 -left-2 text-6xl font-bold text-white/[0.03] font-mono">
                    {step.num}
                  </span>

                  <span className="relative text-orange-500 font-mono text-sm">{step.num}</span>
                  <h3 className="text-xl md:text-2xl font-semibold mt-3 mb-3">{step.title}</h3>
                  <p className="text-white/50 leading-relaxed text-sm">{step.description}</p>

                  {/* Connection dot */}
                  <div className="hidden md:block absolute -top-[1px] left-1/2 -translate-x-1/2 w-2 h-2 bg-orange-500 rounded-full" />
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={0.6}>
            <p className="text-center text-white/30 mt-16 text-lg font-mono">
              Good, fast, cheap. Pick two. We optimise for good.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Work / Testimonials Section - Staggered Grid */}
      <section id="work" className="py-24 md:py-32 border-t border-white/5">
        <div className="container-default max-w-6xl">
          <div className="mb-16 text-center">
            <FadeIn>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight mb-4">
                Satisfied customers
              </h2>
            </FadeIn>
            <FadeIn delay={0.1}>
              <p className="text-lg text-white/50 max-w-2xl mx-auto">
                We&apos;ve built systems for vehicle detailing, renewable energy, landscaping, and more.
              </p>
            </FadeIn>
          </div>

          <FadeIn delay={0.2}>
            <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 mb-20">
              <img
                src="/client-logos/UpmarketLeisure-Logo.png"
                alt="Upmarket Hotels & Leisure"
                className="h-10 md:h-12 w-auto opacity-90 hover:opacity-100 transition-all brightness-0 invert"
              />
              <img
                src="/client-logos/DetailDynamics-Logo.png"
                alt="Detail Dynamics"
                className="h-10 md:h-12 w-auto opacity-90 hover:opacity-100 transition-all"
              />
              <img
                src="/client-logos/LCB-Logo.png"
                alt="LCB"
                className="h-10 md:h-12 w-auto opacity-90 hover:opacity-100 transition-all"
              />
              <img
                src="/client-logos/Greenstar-Logo.png"
                alt="Greenstar Solar"
                className="h-10 md:h-12 w-auto opacity-90 hover:opacity-100 transition-all"
              />
            </div>
          </FadeIn>

          {/* Masonry-style testimonials */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-auto">
            {testimonials.map((testimonial, i) => (
              <FadeIn key={i} delay={0.3 + i * 0.1}>
                <div
                  className={`
                    bg-white/[0.02] border border-white/5 rounded-2xl p-6 md:p-8 card-lift
                    ${testimonial.featured ? 'md:col-span-2 lg:col-span-2' : ''}
                  `}
                >
                  <div className="text-orange-500/40 text-5xl leading-none mb-4 font-serif">"</div>
                  <p className="text-base md:text-lg text-white/60 italic leading-relaxed mb-6">
                    {testimonial.quote}
                  </p>
                  <div>
                    <p className="text-white/70 font-medium">{testimonial.name}</p>
                    {testimonial.company && (
                      <p className="text-white/30 text-sm mt-1 font-mono">{testimonial.company}</p>
                    )}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section - Diagonal Split */}
      <section id="contact" className="py-24 md:py-32 border-t border-white/5 relative overflow-hidden grid-bg-dense">
        <GridOverlay spacing={20} opacity={0.015} />
        <TechnicalLabel position="bottom-left">EST. 2024</TechnicalLabel>

        <div className="container-default max-w-5xl">
          <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
            <FadeIn>
              <div>
                <h2 className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight mb-6">
                  Let&apos;s talk
                </h2>
                <p className="text-lg text-white/50 mb-4 leading-relaxed">
                  Ready to build something? Book a discovery call or send us a message.
                </p>
                <p className="text-lg text-white/50 leading-relaxed">
                  No pitch decks, no pressure.
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div className="space-y-4">
                <a
                  href="https://cal.com/coldlava/discovery-call"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary w-full glow-orange-sm"
                >
                  Book a discovery call
                </a>
                <a href="mailto:hello@coldlava.ai" className="btn-secondary w-full font-mono">
                  hello@coldlava.ai
                </a>
                <p className="text-sm text-white/30 text-center mt-6">
                  We work best with UK businesses ready to invest in systems that last.
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
    </>
  )
}
