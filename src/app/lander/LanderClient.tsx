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
  'Construction / Trades',
  'Professional Services',
  'Financial Services',
  'Solar / Renewables',
  'Recruitment / Staffing',
  'Property / Real Estate',
  'E-commerce / Retail',
  'Other',
]

const TEAM_SIZES = ['1–10', '11–50', '51–200', '200+']

const BOTTLENECKS = [
  'Admin & data entry',
  'Customer communications',
  'Scheduling & dispatch',
  'Reporting & compliance',
  'Sales & lead follow-up',
  'Recruitment & onboarding',
  'Other',
]

const OBJECTIONS = [
  {
    pain: '“I’ve tried AI tools and they didn’t work.”',
    answer:
      'Off-the-shelf wrappers break the moment they hit your workflow. We build custom agents trained on your processes, tools, and data — so they behave like staff, not chatbots.',
  },
  {
    pain: '“I don’t have the technical skills in-house.”',
    answer:
      'Fully managed. No servers to run, no prompts to tune, no infrastructure you need to understand. We build it, deploy it, monitor it, and maintain it.',
  },
  {
    pain: '“What about security and my data?”',
    answer:
      'Your data stays in your own Postgres. Row-level security, permissioned access, full audit logs. We already run systems handling RTW documents, payroll, and compliance records under UK GDPR.',
  },
  {
    pain: '“How do I know it’ll actually save money?”',
    answer:
      'The audit is free and specific. We quantify hours and £ against real roles in your business before any engagement. If the numbers aren’t there, we tell you.',
  },
]

const DELIVERABLES = [
  'A shortlist of roles and tasks we can automate in the first 90 days',
  'Estimated hours and payroll reclaimed, broken down by function',
  'The stack we’d use — Claude, n8n, Supabase, Twilio — and why',
  'Honest timeline and fixed-scope cost, or a straight “not yet”',
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
          lead_magnet: 'AI ROI Audit',
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
      document.getElementById('book')?.scrollIntoView({ behavior: 'smooth' })
    } catch {
      setError('Something went wrong. Please email hello@coldlava.ai and we’ll pick it up directly.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="bg-black text-white">
      {/* ───────── HERO ───────── */}
      <section className="relative pt-32 pb-24 md:pt-40 md:pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-lava-500/[0.05] to-transparent pointer-events-none" />
        <div className="relative max-w-5xl mx-auto px-6 text-center">
          <FadeIn>
            <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-lava-500 border border-lava-500/30 rounded-full px-4 py-2">
              <span className="w-1.5 h-1.5 rounded-full bg-lava-500 animate-pulse" />
              Free ROI Audit
            </span>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h1 className="mt-8 text-display font-semibold tracking-tight">
              We install <span className="text-lava-500">custom-built AI</span> into your business to cut cost and streamline operations.
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="mt-8 text-subhead text-white/70 max-w-2xl mx-auto">
              Fixed scope. Fixed timeline. Built on the same stack powering live systems across construction, finance, solar, and recruitment.
            </p>
          </FadeIn>
          <FadeIn delay={0.3}>
            <a
              href="#audit"
              className="inline-flex items-center gap-2 mt-10 bg-lava-500 hover:bg-lava-600 text-black font-semibold px-8 py-4 rounded-full transition-colors"
            >
              Get my free AI ROI audit
              <span aria-hidden>→</span>
            </a>
          </FadeIn>
          <FadeIn delay={0.4}>
            <p className="mt-6 text-xs uppercase tracking-[0.2em] text-white/40">
              Trusted by UK operators — Aztec Landscapes · Eiles Finance · RML · Greenstar Solar
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ───────── AUDIT FORM ───────── */}
      <section id="audit" className="relative py-20 md:py-28 border-t border-white/5">
        <div className="max-w-3xl mx-auto px-6">
          <FadeIn>
            <h2 className="text-headline font-semibold tracking-tight text-center">
              Answer 4 quick questions.
            </h2>
            <p className="mt-4 text-white/60 text-center max-w-xl mx-auto">
              We’ll come back with exactly where AI can cut cost, which roles can be automated, and what you’d save in the first 90 days.
            </p>
          </FadeIn>

          <FadeIn delay={0.1}>
            <form
              onSubmit={handleSubmit}
              className="mt-12 space-y-6 bg-white/[0.02] border border-white/10 rounded-2xl p-6 md:p-10"
            >
              {/* Q1 */}
              <Field label="1. What industry are you in?" required>
                <select
                  required
                  value={form.industry}
                  onChange={(e) => update('industry', e.target.value)}
                  className={inputCls}
                >
                  <option value="">Select…</option>
                  {INDUSTRIES.map((i) => (
                    <option key={i} value={i}>{i}</option>
                  ))}
                </select>
              </Field>

              {/* Q2 */}
              <Field label="2. How many people are in the team?" required>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {TEAM_SIZES.map((s) => (
                    <button
                      type="button"
                      key={s}
                      onClick={() => update('teamSize', s)}
                      className={`py-3 rounded-lg border text-sm transition-colors ${
                        form.teamSize === s
                          ? 'border-lava-500 bg-lava-500/10 text-white'
                          : 'border-white/15 text-white/60 hover:border-white/30'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </Field>

              {/* Q3 */}
              <Field label="3. Which processes eat the most time right now?" required>
                <select
                  required
                  value={form.bottleneck}
                  onChange={(e) => update('bottleneck', e.target.value)}
                  className={inputCls}
                >
                  <option value="">Select…</option>
                  {BOTTLENECKS.map((b) => (
                    <option key={b} value={b}>{b}</option>
                  ))}
                </select>
              </Field>

              {/* Q4 */}
              <Field label="4. What’s the biggest bottleneck? (one sentence is fine)">
                <textarea
                  rows={3}
                  value={form.context}
                  onChange={(e) => update('context', e.target.value)}
                  className={inputCls}
                  placeholder="e.g. booking coordinators spending 3 hours a day on WhatsApp follow-ups"
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
                className="w-full bg-lava-500 hover:bg-lava-600 disabled:opacity-60 disabled:cursor-not-allowed text-black font-semibold py-4 rounded-full transition-colors"
              >
                {submitted ? '✓ Submitted — pick a time below' : submitting ? 'Sending…' : 'Submit & book my audit'}
              </button>
              <p className="text-xs text-white/40 text-center">
                We’ll never share your details. Reply-to address is Oliver, not a sales inbox.
              </p>
            </form>
          </FadeIn>
        </div>
      </section>

      {/* ───────── CAL.COM EMBED ───────── */}
      <section id="book" className="relative py-20 md:py-28 border-t border-white/5">
        <div className="max-w-5xl mx-auto px-6">
          <FadeIn>
            <h2 className="text-headline font-semibold tracking-tight text-center">
              {booked ? 'You’re booked in.' : 'Pick a time for your audit.'}
            </h2>
            <p className="mt-4 text-white/60 text-center max-w-2xl mx-auto">
              {booked
                ? 'Calendar invite is on its way. Oliver will send a short pre-call note with what to have ready. No pitch decks.'
                : '30 minutes with Oliver. Come with your current headcount and the top 2–3 roles or tasks eating the most time.'}
            </p>
          </FadeIn>

          {!booked && (
            <FadeIn delay={0.1}>
              <div className="mt-10 rounded-2xl overflow-hidden border border-white/10 bg-white">
                <Cal
                  namespace="discovery-call"
                  calLink="coldlava/discovery-call"
                  style={{ width: '100%', height: '700px', overflow: 'scroll' }}
                  config={{ layout: 'month_view' }}
                />
              </div>
            </FadeIn>
          )}

          {booked && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-10 bg-lava-500/5 border border-lava-500/30 rounded-2xl p-10 text-center"
            >
              <div className="text-5xl mb-4">✓</div>
              <p className="text-white/80 max-w-xl mx-auto">
                You’ll get a calendar invite within the next few seconds. If nothing arrives, email{' '}
                <a className="text-lava-500 underline" href="mailto:hello@coldlava.ai">hello@coldlava.ai</a>.
              </p>
            </motion.div>
          )}
        </div>
      </section>

      {/* ───────── OBJECTIONS ───────── */}
      <section className="relative py-24 md:py-32 border-t border-white/5">
        <div className="max-w-5xl mx-auto px-6">
          <FadeIn>
            <h2 className="text-headline font-semibold tracking-tight text-center max-w-3xl mx-auto">
              Here’s what stops most operators from implementing AI. We solve all of them.
            </h2>
          </FadeIn>
          <div className="mt-14 grid md:grid-cols-2 gap-5">
            {OBJECTIONS.map((o, i) => (
              <FadeIn key={o.pain} delay={i * 0.05}>
                <div className="h-full bg-white/[0.02] border border-white/10 rounded-2xl p-7">
                  <div className="flex items-start gap-3 mb-4">
                    <span className="text-red-400 font-mono text-lg leading-none mt-0.5">✗</span>
                    <p className="text-white/80 italic">{o.pain}</p>
                  </div>
                  <div className="flex items-start gap-3 border-t border-white/10 pt-4">
                    <span className="text-lava-500 font-mono text-lg leading-none mt-0.5">✓</span>
                    <p className="text-white/70 text-sm leading-relaxed">{o.answer}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── WHAT YOU GET ───────── */}
      <section className="relative py-24 md:py-32 border-t border-white/5 bg-white/[0.01]">
        <div className="max-w-4xl mx-auto px-6">
          <FadeIn>
            <h2 className="text-headline font-semibold tracking-tight text-center">
              What you get, specifically.
            </h2>
            <p className="mt-4 text-white/60 text-center">
              A written audit delivered within 48 hours of the call. Yours to keep either way.
            </p>
          </FadeIn>
          <ul className="mt-12 space-y-4">
            {DELIVERABLES.map((d, i) => (
              <FadeIn key={d} delay={i * 0.05}>
                <li className="flex items-start gap-4 bg-white/[0.02] border border-white/10 rounded-xl p-5">
                  <span className="shrink-0 w-6 h-6 rounded-full bg-lava-500/15 border border-lava-500/40 grid place-items-center text-lava-500 text-xs font-semibold">
                    {i + 1}
                  </span>
                  <p className="text-white/80">{d}</p>
                </li>
              </FadeIn>
            ))}
          </ul>
        </div>
      </section>

      {/* ───────── FINAL CTA ───────── */}
      <section className="relative py-24 md:py-32 border-t border-white/5">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <FadeIn>
            <h2 className="text-display font-semibold tracking-tight">
              Ready to see what AI can cut from your business?
            </h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="mt-6 text-white/60 text-subhead">
              Takes two minutes. Audit lands in your inbox within 48 hours.
            </p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <a
              href="#audit"
              className="inline-flex items-center gap-2 mt-10 bg-lava-500 hover:bg-lava-600 text-black font-semibold px-8 py-4 rounded-full transition-colors"
            >
              Get my free AI ROI audit
              <span aria-hidden>→</span>
            </a>
          </FadeIn>
        </div>
      </section>
    </div>
  )
}

const inputCls =
  'w-full bg-black/40 border border-white/15 rounded-lg px-4 py-3 text-white placeholder:text-white/30 focus:border-lava-500 focus:outline-none transition-colors'

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
        {label} {required && <span className="text-lava-500">*</span>}
      </label>
      {children}
    </div>
  )
}
