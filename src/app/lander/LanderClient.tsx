'use client'

import { useEffect, useState, FormEvent } from 'react'
import { motion } from 'framer-motion'
import Cal, { getCalApi } from '@calcom/embed-react'
import { FadeIn } from '@/components'

type FormState = {
  name: string
  email: string
  phone: string
  company: string
  industry: string
  teamSize: string
  bottleneck: string
  context: string
}

const INITIAL: FormState = {
  name: '',
  email: '',
  phone: '',
  company: '',
  industry: '',
  teamSize: '',
  bottleneck: '',
  context: '',
}

const INDUSTRIES = [
  'Construction or Trades',
  'Professional Services',
  'Financial Services',
  'Solar or Renewables',
  'Recruitment or Staffing',
  'Property or Real Estate',
  'E commerce or Retail',
  'Other',
]

const TEAM_SIZES = ['1 to 10', '11 to 50', '51 to 200', '200 plus']

const BOTTLENECKS = [
  'Admin and data entry',
  'Customer communications',
  'Scheduling and dispatch',
  'Reporting and compliance',
  'Sales and lead follow up',
  'Recruitment and onboarding',
  'Other',
]

const HOW_IT_WORKS = [
  {
    num: '01',
    title: 'We talk',
    sub: '30 minutes.',
    bullets: [
      'You tell us how the business actually runs',
      'Where time is leaking, what you have already tried',
      'No pitch deck, no pressure',
    ],
  },
  {
    num: '02',
    title: 'We audit',
    sub: 'Written report within 48 hours.',
    bullets: [
      'Shortlist of processes AI can take off your team in 90 days',
      'Hours reclaimed per role, with £ figures against current payroll',
      'The stack we would use, and where we would push back if it is not the right fit',
    ],
  },
  {
    num: '03',
    title: 'You scale',
    sub: 'Fixed scope. Fixed timeline.',
    bullets: [
      'We build, deploy, and maintain. You do not hire a technical team',
      'Your existing staff get leverage, not replaced',
      'Growth without adding headcount or wage bill',
    ],
  },
]

const OBJECTIONS = [
  {
    pain: '“Are you replacing my team?”',
    answer:
      'No. The point is to give the team you already have more leverage. We automate the repetitive admin so they can focus on the work that actually moves the business.',
  },
  {
    pain: '“I have tried AI tools and they did not stick.”',
    answer:
      'Off the shelf tools break the moment they hit a real workflow. We build custom systems trained on your processes and integrated with the tools you already run.',
  },
  {
    pain: '“We do not have the technical skills.”',
    answer:
      'Fully managed. We audit, design, build, deploy, and maintain. Your team uses it, we run it. No servers, no prompts, no ops overhead.',
  },
  {
    pain: '“How do I know it is worth it?”',
    answer:
      'If we do not save you £50,000 a year in payroll, you do not pay. Simple as that.',
  },
]

export function LanderClient() {
  const [form, setForm] = useState<FormState>(INITIAL)
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [booked, setBooked] = useState(false)

  useEffect(() => {
    ;(async () => {
      const cal = await getCalApi({ namespace: 'discovery-call' })
      cal('ui', { hideEventTypeDetails: false, layout: 'month_view' })
      cal('on', {
        action: 'bookingSuccessful',
        callback: () => setBooked(true),
      })
    })()
  }, [])

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setForm((f) => ({ ...f, [key]: value }))

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError(null)
    setSubmitting(true)
    try {
      const res = await fetch('/api/leads/capture', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          company: form.company,
          lead_magnet: 'AI Operations Audit',
          source: '/lander',
          trigger: 'manual',
          qualifier: {
            industry: form.industry,
            teamSize: form.teamSize,
            bottleneck: form.bottleneck,
            context: form.context,
          },
        }),
      })
      if (!res.ok) throw new Error('Request failed')
      setSubmitted(true)
      setTimeout(() => {
        document.getElementById('book')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 150)
    } catch {
      setError('Something went wrong. Please email hello@coldlava.ai and we will pick it up directly.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="bg-black text-white">
      {/* ───────── 1. HERO ───────── */}
      <section className="relative pt-32 pb-24 md:pt-40 md:pb-32 overflow-hidden">
        <div className="absolute top-1/4 -left-1/4 w-[400px] md:w-[800px] h-[400px] md:h-[800px] bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 -right-1/4 w-[400px] md:w-[700px] h-[400px] md:h-[700px] bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="relative max-w-5xl mx-auto px-6 text-center">
          <FadeIn>
            <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-cyan-500 border border-cyan-500/30 rounded-full px-4 py-2">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" />
              AI Operations Audit
            </span>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h1 className="mt-8 text-display font-semibold tracking-tight uppercase leading-[1.05]">
              Scale without hiring.{' '}
              <span className="text-cyan-500">Keep the team you have.</span>
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="mt-10 text-subhead text-white/80 max-w-2xl mx-auto font-medium uppercase tracking-wide">
              If it does not save you <span className="text-cyan-500">£50,000 a year</span> in payroll, you do not pay.
            </p>
          </FadeIn>
          <FadeIn delay={0.3}>
            <p className="mt-6 text-base md:text-lg text-white/60 max-w-2xl mx-auto">
              We audit your business, identify the processes AI can genuinely handle, and install the systems that let you grow without adding headcount or letting anyone go.
            </p>
          </FadeIn>
          <FadeIn delay={0.4}>
            <a href="#audit" className={primaryBtn}>
              Book my audit
              <span aria-hidden>→</span>
            </a>
          </FadeIn>
          <FadeIn delay={0.5}>
            <p className="mt-8 text-xs uppercase tracking-[0.25em] text-white/40">
              Trusted by UK operators. Aztec Landscapes · Eiles Finance · RML · Greenstar Solar
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ───────── 2. FORM ───────── */}
      <section id="audit" className="relative py-20 md:py-28 border-t border-white/5">
        <div className="max-w-3xl mx-auto px-6">
          <FadeIn>
            <p className="text-xs uppercase tracking-[0.25em] text-cyan-500 text-center">Step 1. Four questions</p>
            <h2 className="mt-4 text-headline font-semibold tracking-tight text-center uppercase">
              Tell us where the time is leaking.
            </h2>
            <p className="mt-4 text-white/60 text-center max-w-xl mx-auto">
              We will come back with exactly where AI can streamline your operations, so the team you already have can do more without you hiring.
            </p>
          </FadeIn>

          <FadeIn delay={0.1}>
            <form
              onSubmit={handleSubmit}
              className="mt-12 space-y-6 bg-white/[0.02] border border-white/10 rounded-2xl p-6 md:p-10"
            >
              <Field label="1. What industry are you in?" required>
                <select required value={form.industry} onChange={(e) => update('industry', e.target.value)} className={inputCls}>
                  <option value="">Select</option>
                  {INDUSTRIES.map((i) => (
                    <option key={i} value={i}>{i}</option>
                  ))}
                </select>
              </Field>

              <Field label="2. How many people are in the team?" required>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {TEAM_SIZES.map((s) => (
                    <button
                      type="button"
                      key={s}
                      onClick={() => update('teamSize', s)}
                      className={`py-3 rounded-lg border text-sm transition-colors ${
                        form.teamSize === s
                          ? 'border-cyan-500 bg-cyan-500/10 text-white'
                          : 'border-white/15 text-white/60 hover:border-white/30'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </Field>

              <Field label="3. Which processes eat the most time right now?" required>
                <select required value={form.bottleneck} onChange={(e) => update('bottleneck', e.target.value)} className={inputCls}>
                  <option value="">Select</option>
                  {BOTTLENECKS.map((b) => (
                    <option key={b} value={b}>{b}</option>
                  ))}
                </select>
              </Field>

              <Field label="4. What would you free your team up to do, if they were not buried in admin?">
                <textarea
                  rows={3}
                  value={form.context}
                  onChange={(e) => update('context', e.target.value)}
                  className={inputCls}
                  placeholder="e.g. spend more time on site instead of chasing paperwork"
                />
              </Field>

              <div className="pt-4 border-t border-white/10 grid md:grid-cols-2 gap-4">
                <Field label="Your name" required>
                  <input required value={form.name} onChange={(e) => update('name', e.target.value)} className={inputCls} />
                </Field>
                <Field label="Work email" required>
                  <input required type="email" value={form.email} onChange={(e) => update('email', e.target.value)} className={inputCls} />
                </Field>
                <Field label="Company">
                  <input value={form.company} onChange={(e) => update('company', e.target.value)} className={inputCls} />
                </Field>
                <Field label="Phone">
                  <input value={form.phone} onChange={(e) => update('phone', e.target.value)} className={inputCls} />
                </Field>
              </div>

              {error && <p className="text-red-400 text-sm">{error}</p>}

              <button
                type="submit"
                disabled={submitting || submitted}
                className="w-full bg-white hover:bg-cyan-500 disabled:opacity-60 disabled:cursor-not-allowed text-black font-semibold py-4 rounded-full transition-colors"
              >
                {submitted ? '✓ Submitted. Pick a time below' : submitting ? 'Sending' : 'Submit and pick a time'}
              </button>
              <p className="text-xs text-white/40 text-center">
                No spam. Replies come from Oliver directly, not a sales inbox.
              </p>
            </form>
          </FadeIn>
        </div>
      </section>

      {/* ───────── 3. CAL EMBED (revealed after submit) ───────── */}
      {submitted && (
        <section id="book" className="relative py-20 md:py-28 border-t border-white/5">
          <div className="max-w-5xl mx-auto px-6">
            <FadeIn>
              <p className="text-xs uppercase tracking-[0.25em] text-cyan-500 text-center">Step 2. 30 minutes</p>
              <h2 className="mt-4 text-headline font-semibold tracking-tight text-center uppercase">
                {booked ? 'You are booked in.' : 'Pick a time that suits you.'}
              </h2>
              <p className="mt-4 text-white/60 text-center max-w-2xl mx-auto">
                {booked
                  ? 'Calendar invite is on its way. Oliver will send a short note before the call with what to have ready. No pitch decks, no pressure.'
                  : 'A 30 minute call with Oliver. Come with roughly how your team is structured and the top 2 or 3 things eating their time.'}
              </p>
            </FadeIn>

            {!booked && (
              <FadeIn delay={0.1}>
                <div className="mt-10 rounded-2xl border border-white/10 bg-white">
                  <Cal
                    namespace="discovery-call"
                    calLink="coldlava/discovery-call"
                    style={{ width: '100%', height: '1000px' }}
                    config={{ layout: 'month_view' }}
                  />
                </div>
              </FadeIn>
            )}

            {booked && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-10 bg-cyan-500/5 border border-cyan-500/30 rounded-2xl p-10 text-center"
              >
                <div className="text-5xl mb-4 text-cyan-500">✓</div>
                <p className="text-white/80 max-w-xl mx-auto">
                  You will get a calendar invite within the next few seconds. If nothing arrives, email{' '}
                  <a className="text-cyan-500 underline" href="mailto:hello@coldlava.ai">hello@coldlava.ai</a>.
                </p>
              </motion.div>
            )}
          </div>
        </section>
      )}

      {/* ───────── 4. HOW IT WORKS ───────── */}
      <section className="relative py-24 md:py-32 border-t border-white/5 bg-white/[0.01]">
        <div className="max-w-5xl mx-auto px-6">
          <FadeIn>
            <p className="text-xs uppercase tracking-[0.25em] text-cyan-500 text-center">The whole process</p>
            <h2 className="mt-4 text-headline font-semibold tracking-tight text-center max-w-2xl mx-auto uppercase">
              Three steps. No pitch decks, no pressure.
            </h2>
          </FadeIn>
          <div className="mt-14 grid md:grid-cols-3 gap-5">
            {HOW_IT_WORKS.map((step, i) => (
              <FadeIn key={step.num} delay={i * 0.05}>
                <div className="h-full bg-white/[0.02] border border-white/10 rounded-2xl p-7 hover:border-cyan-500/30 transition-colors">
                  <div className="flex items-baseline justify-between">
                    <span className="text-cyan-500 font-mono text-sm">{step.num}</span>
                    <span className="text-xs text-white/40">{step.sub}</span>
                  </div>
                  <div className="mt-4 text-2xl font-semibold">{step.title}</div>
                  <ul className="mt-5 space-y-3">
                    {step.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-3 text-sm text-white/70 leading-relaxed">
                        <span className="text-cyan-500 mt-1 shrink-0">→</span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── 5. OBJECTIONS + FINAL CTA ───────── */}
      <section className="relative py-24 md:py-32 border-t border-white/5">
        <div className="max-w-5xl mx-auto px-6">
          <FadeIn>
            <p className="text-xs uppercase tracking-[0.25em] text-cyan-500 text-center">Common questions</p>
            <h2 className="mt-4 text-headline font-semibold tracking-tight text-center max-w-3xl mx-auto uppercase">
              What operators usually ask before we start.
            </h2>
          </FadeIn>
          <div className="mt-14 grid md:grid-cols-2 gap-5">
            {OBJECTIONS.map((o, i) => (
              <FadeIn key={o.pain} delay={i * 0.05}>
                <div className="h-full bg-white/[0.02] border border-white/10 rounded-2xl p-7">
                  <div className="flex items-start gap-3 mb-4">
                    <span className="text-white/40 font-mono text-lg leading-none mt-0.5">?</span>
                    <p className="text-white/80 italic">{o.pain}</p>
                  </div>
                  <div className="flex items-start gap-3 border-t border-white/10 pt-4">
                    <span className="text-cyan-500 font-mono text-lg leading-none mt-0.5">→</span>
                    <p className="text-white/70 text-sm leading-relaxed">{o.answer}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

          <div className="mt-24 max-w-3xl mx-auto text-center">
            <FadeIn>
              <h2 className="text-display font-semibold tracking-tight uppercase leading-[1.05]">
                Grow the business.{' '}
                <span className="text-cyan-500">Not the wage bill.</span>
              </h2>
            </FadeIn>
            <FadeIn delay={0.1}>
              <p className="mt-8 text-subhead text-white/80 uppercase tracking-wide font-medium">
                If it does not save you <span className="text-cyan-500">£50,000 a year</span> in payroll, you do not pay.
              </p>
            </FadeIn>
            <FadeIn delay={0.2}>
              <a href="#audit" className={primaryBtn}>
                Book my audit
                <span aria-hidden>→</span>
              </a>
            </FadeIn>
          </div>
        </div>
      </section>
    </div>
  )
}

const primaryBtn =
  'inline-flex items-center gap-2 mt-10 bg-white hover:bg-cyan-500 text-black font-semibold px-8 py-4 rounded-full transition-colors'

const inputCls =
  'w-full bg-black/40 border border-white/15 rounded-lg px-4 py-3 text-white placeholder:text-white/30 focus:border-cyan-500 focus:outline-none transition-colors'

function Field({
  label,
  required,
  children,
}: {
  label: string
  required?: boolean
  children: React.ReactNode
}) {
  return (
    <div>
      <label className="block text-sm text-white/70 mb-2">
        {label} {required && <span className="text-cyan-500">*</span>}
      </label>
      {children}
    </div>
  )
}
