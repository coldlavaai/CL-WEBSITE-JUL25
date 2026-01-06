'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const EMAILS_PER_SECOND = 4050925

function getEmailsSentToday(): number {
  const now = new Date()
  const startOfDay = new Date(now)
  startOfDay.setHours(0, 0, 0, 0)
  const secondsElapsed = (now.getTime() - startOfDay.getTime()) / 1000
  return Math.floor(EMAILS_PER_SECOND * secondsElapsed)
}

function formatNumber(num: number): string {
  // Always show in millions for maximum impact with comma separator
  if (num >= 1_000_000) {
    const millions = (num / 1_000_000).toFixed(1)
    // Add comma separator for thousands
    return millions.replace(/\B(?=(\d{3})+(?!\d))/g, ',') + 'M'
  }
  return num.toLocaleString()
}

export function FooterTicker() {
  const [count, setCount] = useState<number>(0)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    setCount(getEmailsSentToday())

    // Update every 100ms for smooth ticking
    const interval = setInterval(() => {
      setCount(getEmailsSentToday())
    }, 100)

    return () => clearInterval(interval)
  }, [])

  // Avoid hydration mismatch - show nothing until mounted
  if (!mounted) {
    return (
      <div className="flex items-baseline gap-2 font-mono text-xs text-white/30">
        <span className="text-[10px] text-cyan-500/40 uppercase tracking-wider">📧</span>
        <span className="text-cyan-400/50 tabular-nums">—</span>
        <span className="text-white/20">emails sent globally today</span>
      </div>
    )
  }

  return (
    <div className="relative flex items-baseline gap-2 font-mono text-xs">
      {/* Corner bracket accent */}
      <div className="absolute -top-1 -left-2 w-2 h-2 border-l border-t border-cyan-500/20" />

      {/* Email icon with subtle label */}
      <span className="text-[10px] text-cyan-500/40 uppercase tracking-wider">📧</span>

      {/* Animated count */}
      <motion.span
        key={Math.floor(count / 1000000)} // Trigger animation on significant changes
        initial={{ opacity: 0.7 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="text-cyan-400 font-semibold tabular-nums tracking-tight"
      >
        {formatNumber(count)}
      </motion.span>

      {/* Label */}
      <span className="text-white/30 font-light">emails sent globally today</span>

      {/* Subtle glow effect */}
      <div className="absolute inset-0 bg-cyan-500/5 blur-xl -z-10 opacity-40" />
    </div>
  )
}
