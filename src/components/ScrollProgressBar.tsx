'use client'

import { useEffect, useState } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'

export function ScrollProgressBar() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  return (
    <>
      {/* Top progress bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-white/5 z-50 pointer-events-none">
        <motion.div
          className="h-full bg-gradient-to-r from-cyan-500 via-cyan-400 to-cyan-300 origin-left"
          style={{ scaleX }}
        />
      </div>

      {/* Top glow effect */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-2 pointer-events-none z-49"
        style={{
          background: 'linear-gradient(to bottom, rgba(6,182,212,0.1), transparent)',
          opacity: scrollYProgress
        }}
      />

      {/* Right side progress bar */}
      <div className="fixed top-0 right-0 bottom-0 w-1 bg-white/5 z-50 pointer-events-none">
        <motion.div
          className="w-full bg-gradient-to-b from-cyan-500 via-cyan-400 to-cyan-300 origin-top"
          style={{ scaleY }}
        />
      </div>

      {/* Right side glow effect */}
      <motion.div
        className="fixed top-0 right-0 bottom-0 w-2 pointer-events-none z-49"
        style={{
          background: 'linear-gradient(to left, rgba(6,182,212,0.1), transparent)',
          opacity: scrollYProgress
        }}
      />
    </>
  )
}
