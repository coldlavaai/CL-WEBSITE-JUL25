'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'

const process = [
  { num: '01', title: 'Diagnose', desc: 'Understanding your business, not just requirements.' },
  { num: '02', title: 'Design', desc: 'Clear scope, timeline, and cost before any code.' },
  { num: '03', title: 'Build', desc: 'Short cycles with regular check-ins. Weekly progress.' },
  { num: '04', title: 'Support', desc: 'Launch isn\'t the end. We optimise as you grow.' },
]

// ProcessOrbit Component - Grid-Based Layout with Progressive Fill Animation
export function ProcessOrbit() {
  const [activeCard, setActiveCard] = useState<number>(0)
  const [progress, setProgress] = useState<number>(0)
  const radius = 190
  const circumference = 2 * Math.PI * radius

  useEffect(() => {
    // Track orbit progress and update active card + progress bar
    // 9-second orbit: Diagnose(0-2.25s), Design(2.25-4.5s), Build(4.5-6.75s), Support(6.75-9s)
    const orbitDuration = 9000
    const startTime = Date.now()

    const updateHighlight = () => {
      const elapsed = (Date.now() - startTime) % orbitDuration
      const progressValue = elapsed / orbitDuration

      // Update progress bar (0 to 1)
      setProgress(progressValue)

      // Update active card - ONE box always lit, switches to next when progress reaches it
      // Each card stays lit for a full quarter of the cycle
      let activeIndex
      if (progressValue < 0.25) activeIndex = 0  // Diagnose (0° - 90°)
      else if (progressValue < 0.5) activeIndex = 1  // Design (90° - 180°)
      else if (progressValue < 0.75) activeIndex = 2  // Build (180° - 270°)
      else activeIndex = 3  // Support (270° - 360°)

      setActiveCard(activeIndex)
    }

    const interval = setInterval(updateHighlight, 16) // ~60fps
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative w-full max-w-[1100px] mx-auto px-4 py-12">
      {/* Grid Container */}
      <div
        className="grid gap-6 md:gap-8 relative"
        style={{
          gridTemplateColumns: '1fr auto 1fr',
          gridTemplateRows: 'auto auto auto',
          gridTemplateAreas: `
            ". diagnose ."
            "support centre design"
            ". build ."
          `
        }}
      >
        {/* Circular Progress Path - Progressive Fill */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px] h-[480px] pointer-events-none z-0 hidden md:block">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 400 400">
            <defs>
              {/* Glow filter for progress bar */}
              <filter id="progressGlow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
              {/* Gradient for progress bar - cyan/blue */}
              <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgba(6, 182, 212, 0.6)" />
                <stop offset="50%" stopColor="rgba(6, 182, 212, 1)" />
                <stop offset="100%" stopColor="rgba(6, 182, 212, 0.8)" />
              </linearGradient>
              {/* Radial gradients for quadrant fills - cyan with depth */}
              <radialGradient id="quadrantGradient1" cx="50%" cy="50%">
                <stop offset="0%" stopColor="rgba(6, 182, 212, 0.25)" />
                <stop offset="50%" stopColor="rgba(6, 182, 212, 0.15)" />
                <stop offset="100%" stopColor="rgba(6, 182, 212, 0.05)" />
              </radialGradient>
              <radialGradient id="quadrantGradient2" cx="50%" cy="50%">
                <stop offset="0%" stopColor="rgba(6, 182, 212, 0.25)" />
                <stop offset="50%" stopColor="rgba(6, 182, 212, 0.15)" />
                <stop offset="100%" stopColor="rgba(6, 182, 212, 0.05)" />
              </radialGradient>
              <radialGradient id="quadrantGradient3" cx="50%" cy="50%">
                <stop offset="0%" stopColor="rgba(6, 182, 212, 0.25)" />
                <stop offset="50%" stopColor="rgba(6, 182, 212, 0.15)" />
                <stop offset="100%" stopColor="rgba(6, 182, 212, 0.05)" />
              </radialGradient>
              <radialGradient id="quadrantGradient4" cx="50%" cy="50%">
                <stop offset="0%" stopColor="rgba(6, 182, 212, 0.25)" />
                <stop offset="50%" stopColor="rgba(6, 182, 212, 0.15)" />
                <stop offset="100%" stopColor="rgba(6, 182, 212, 0.05)" />
              </radialGradient>
            </defs>

            {/* Dimmed background circle - dotted - cyan/blue */}
            <circle
              cx="200"
              cy="200"
              r={radius}
              fill="none"
              stroke="rgba(6, 182, 212, 0.15)"
              strokeWidth="2.5"
              strokeDasharray="6 6"
            />

            {/* Quadrant gradient fills - build up and STAY filled as progress moves through */}
            {/* Path 1: Top-Left in rotated view (270° to 360°) - fills last */}
            <path
              d="M 200 10 A 190 190 0 0 1 390 200 L 200 200 Z"
              fill="url(#quadrantGradient1)"
              opacity={progress < 0.75 ? 0 : (progress - 0.75) * 4}
              style={{ transition: 'opacity 0.1s ease' }}
            />
            {/* Path 2: Top-Right in rotated view (0° to 90°) - fills first */}
            <path
              d="M 390 200 A 190 190 0 0 1 200 390 L 200 200 Z"
              fill="url(#quadrantGradient2)"
              opacity={progress < 0.25 ? progress * 4 : 1}
              style={{ transition: 'opacity 0.1s ease' }}
            />
            {/* Path 3: Bottom-Right in rotated view (90° to 180°) - fills second */}
            <path
              d="M 200 390 A 190 190 0 0 1 10 200 L 200 200 Z"
              fill="url(#quadrantGradient3)"
              opacity={progress < 0.25 ? 0 : progress < 0.5 ? (progress - 0.25) * 4 : 1}
              style={{ transition: 'opacity 0.1s ease' }}
            />
            {/* Path 4: Bottom-Left in rotated view (180° to 270°) - fills third */}
            <path
              d="M 10 200 A 190 190 0 0 1 200 10 L 200 200 Z"
              fill="url(#quadrantGradient4)"
              opacity={progress < 0.5 ? 0 : progress < 0.75 ? (progress - 0.5) * 4 : 1}
              style={{ transition: 'opacity 0.1s ease' }}
            />

            {/* Full progressive circle fill */}
            <circle
              cx="200"
              cy="200"
              r={radius}
              fill="none"
              stroke="url(#progressGradient)"
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={circumference * (1 - progress)}
              filter="url(#progressGlow)"
              style={{
                transition: 'stroke-dashoffset 0.016s linear',
              }}
            />
          </svg>
        </div>

        {/* Card: Diagnose (Top) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ gridArea: 'diagnose' }}
          className="justify-self-center relative z-10"
        >
          <ProcessCard step={process[0]} isActive={activeCard === 0} position="top" />
        </motion.div>

        {/* Card: Design (Right) */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{ gridArea: 'design' }}
          className="justify-self-start self-center relative z-10"
        >
          <ProcessCard step={process[1]} isActive={activeCard === 1} position="right" />
        </motion.div>

        {/* Card: Build (Bottom) */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{ gridArea: 'build' }}
          className="justify-self-center relative z-10"
        >
          <ProcessCard step={process[2]} isActive={activeCard === 2} position="bottom" />
        </motion.div>

        {/* Card: Support (Left) */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          style={{ gridArea: 'support' }}
          className="justify-self-end self-center relative z-10"
        >
          <ProcessCard step={process[3]} isActive={activeCard === 3} position="left" />
        </motion.div>

        {/* Centre: Cold Lava Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{ gridArea: 'centre' }}
          className="justify-self-center self-center relative z-10 w-32 h-32 md:w-36 md:h-36 rounded-full border border-cyan-500/20 flex items-center justify-center overflow-hidden"
        >
          {/* Gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-black/80 to-black/90" />

          {/* Inner glow */}
          <div className="absolute inset-0 rounded-full bg-cyan-500/5 blur-xl" />

          {/* Subtle grid pattern */}
          <div
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: 'linear-gradient(rgba(6, 182, 212, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(6, 182, 212, 0.3) 1px, transparent 1px)',
              backgroundSize: '8px 8px'
            }}
          />

          {/* Corner brackets */}
          <div className="absolute top-3 left-3 w-4 h-4 border-l border-t border-cyan-500/30" />
          <div className="absolute top-3 right-3 w-4 h-4 border-r border-t border-cyan-500/30" />
          <div className="absolute bottom-3 left-3 w-4 h-4 border-l border-b border-cyan-500/30" />
          <div className="absolute bottom-3 right-3 w-4 h-4 border-r border-b border-cyan-500/30" />

          {/* Cold Lava Logo */}
          <div className="relative w-16 h-16 md:w-20 md:h-20">
            <Image
              src="/Cold Lava Logo/Cold Lava - Icon.png"
              alt="Cold Lava"
              fill
              className="object-contain"
              priority
            />
          </div>
        </motion.div>
      </div>
    </div>
  )
}

// ProcessCard Component - Compact & Refined
function ProcessCard({
  step,
  isActive,
  position
}: {
  step: typeof process[0]
  isActive: boolean
  position: 'top' | 'right' | 'bottom' | 'left'
}) {
  // Connector line direction based on position
  const connectorStyles = {
    top: 'bottom-[-24px] left-1/2 -translate-x-1/2 w-0.5 h-6',
    right: 'left-[-24px] top-1/2 -translate-y-1/2 h-0.5 w-6',
    bottom: 'top-[-24px] left-1/2 -translate-x-1/2 w-0.5 h-6',
    left: 'right-[-24px] top-1/2 -translate-y-1/2 h-0.5 w-6',
  }

  return (
    <div className="relative">
      {/* Connector line pointing to centre */}
      <motion.div
        animate={{
          opacity: isActive ? 0.4 : 0.2,
          background: isActive
            ? `linear-gradient(to ${position === 'top' || position === 'bottom' ? 'bottom' : 'right'}, rgba(201, 169, 98, 0.6), transparent)`
            : `linear-gradient(to ${position === 'top' || position === 'bottom' ? 'bottom' : 'right'}, rgba(6, 182, 212, 0.3), transparent)`,
        }}
        transition={{ duration: 0.4 }}
        className={`absolute ${connectorStyles[position]} hidden md:block`}
      />

      {/* Card */}
      <motion.div
        animate={{
          scale: isActive ? 1.02 : 1,
          borderColor: isActive ? 'rgba(201, 169, 98, 0.5)' : 'rgba(255, 255, 255, 0.08)',
          boxShadow: isActive
            ? '0 0 30px rgba(201, 169, 98, 0.2), inset 0 0 20px rgba(201, 169, 98, 0.08)'
            : '0 0 0px rgba(0, 0, 0, 0)',
        }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="relative bg-black/80 backdrop-blur-sm border p-3 w-full md:w-[200px]"
      >
        {/* Gold background glow when active */}
        <motion.div
          animate={{
            opacity: isActive ? 1 : 0,
          }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 bg-gradient-to-br from-[#C9A962]/15 via-[#C9A962]/8 to-transparent"
        />

        {/* Subtle grid pattern background */}
        <motion.div
          animate={{
            opacity: isActive ? 0.05 : 0.03,
          }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0"
          style={{
            backgroundImage: isActive
              ? 'linear-gradient(rgba(201, 169, 98, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(201, 169, 98, 0.5) 1px, transparent 1px)'
              : 'linear-gradient(rgba(6, 182, 212, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(6, 182, 212, 0.5) 1px, transparent 1px)',
            backgroundSize: '12px 12px'
          }}
        />

        {/* Corner brackets - refined */}
        <motion.div
          animate={{
            borderColor: isActive ? 'rgba(201, 169, 98, 0.8)' : 'rgba(6, 182, 212, 0.25)',
            opacity: isActive ? 1 : 0.6,
          }}
          transition={{ duration: 0.5 }}
          className="absolute -top-0.5 -left-0.5 w-3 h-3 border-l border-t"
        />
        <motion.div
          animate={{
            borderColor: isActive ? 'rgba(201, 169, 98, 0.8)' : 'rgba(6, 182, 212, 0.25)',
            opacity: isActive ? 1 : 0.6,
          }}
          transition={{ duration: 0.5 }}
          className="absolute -bottom-0.5 -right-0.5 w-3 h-3 border-r border-b"
        />

        {/* Step number header */}
        <div className="flex items-center gap-1.5 mb-2 relative z-10">
          <motion.div
            animate={{
              backgroundColor: isActive ? 'rgba(201, 169, 98, 0.7)' : 'rgba(6, 182, 212, 0.25)',
              height: isActive ? '18px' : '14px',
            }}
            transition={{ duration: 0.4 }}
            className="w-0.5"
          />
          <motion.span
            animate={{
              color: isActive ? 'rgba(201, 169, 98, 1)' : 'rgba(6, 182, 212, 0.6)',
            }}
            transition={{ duration: 0.4 }}
            className="font-mono text-[9px] tracking-[0.15em] uppercase"
          >
            {step.num}
          </motion.span>
          <motion.div
            animate={{
              background: isActive
                ? 'linear-gradient(to right, rgba(201, 169, 98, 0.2), transparent)'
                : 'linear-gradient(to right, rgba(6, 182, 212, 0.15), transparent)',
            }}
            transition={{ duration: 0.4 }}
            className="flex-1 h-px"
          />
        </div>

        {/* Title */}
        <motion.h3
          animate={{
            color: isActive ? 'rgba(201, 169, 98, 0.95)' : 'rgb(255, 255, 255)',
          }}
          transition={{ duration: 0.4 }}
          className="text-sm md:text-base font-bold mb-1.5 relative z-10 leading-tight"
        >
          {step.title}
        </motion.h3>

        {/* Description */}
        <motion.p
          animate={{
            color: isActive ? 'rgba(255, 255, 255, 0.65)' : 'rgba(255, 255, 255, 0.45)',
          }}
          transition={{ duration: 0.4 }}
          className="text-[11px] md:text-xs leading-relaxed relative z-10"
        >
          {step.desc}
        </motion.p>

        {/* Active state glow overlay */}
        <motion.div
          animate={{
            opacity: isActive ? 0.08 : 0,
          }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 bg-cyan-500 pointer-events-none"
        />

        {/* Active state corner highlights */}
        <motion.div
          animate={{
            opacity: isActive ? 0.4 : 0,
          }}
          transition={{ duration: 0.5 }}
          className="absolute top-0 left-0 w-8 h-8 bg-gradient-to-br from-cyan-500/20 to-transparent pointer-events-none"
        />
        <motion.div
          animate={{
            opacity: isActive ? 0.4 : 0,
          }}
          transition={{ duration: 0.5 }}
          className="absolute bottom-0 right-0 w-8 h-8 bg-gradient-to-tl from-cyan-500/20 to-transparent pointer-events-none"
        />
      </motion.div>
    </div>
  )
}

// Trust Principles Stack - Right Side
export function TrustPrinciplesStack() {
  const principles = [
    'GDPR Compliant',
    'Code Ownership',
    'Full Transparency',
    'Source Control',
    'Documentation Included',
    'No Vendor Lock-in',
    'Security First',
    'Cloud-Native',
  ]

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="absolute right-0 top-1/2 -translate-y-1/2 hidden xl:block"
    >
      {/* Subheading */}
      <div className="mb-4 flex items-center gap-2">
        <div className="w-6 h-px bg-cyan-500/20" />
        <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/20">
          We believe
        </p>
      </div>

      {/* Stacked principles */}
      <div className="space-y-2">
        {principles.map((principle, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: 10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.5 + idx * 0.05 }}
            className="flex items-center gap-2 group"
          >
            {/* Dot indicator */}
            <div className="w-1 h-1 bg-cyan-500/40 rounded-full group-hover:bg-cyan-500/60 transition-colors" />

            {/* Principle text */}
            <span className="font-mono text-[10px] text-white/30 group-hover:text-white/40 uppercase tracking-wider whitespace-nowrap transition-colors">
              {principle}
            </span>

            {/* Technical line decoration */}
            <div className="w-3 h-px bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
