'use client'

import { motion } from 'framer-motion'

export function BOSVisual() {
  return (
    <div className="relative h-full min-h-[500px] flex items-center justify-center">
      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 via-transparent to-transparent rounded-2xl" />

      {/* Main wireframe cube */}
      <div className="relative w-64 h-64">
        {/* Animated connection nodes */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-orange-500 rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}

        {/* Central system diagram */}
        <motion.svg
          viewBox="0 0 200 200"
          className="w-full h-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          {/* Outer frame */}
          <motion.rect
            x="20"
            y="20"
            width="160"
            height="160"
            fill="none"
            stroke="rgba(249, 115, 22, 0.3)"
            strokeWidth="1"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />

          {/* Inner connections */}
          <motion.line
            x1="100"
            y1="20"
            x2="100"
            y2="180"
            stroke="rgba(249, 115, 22, 0.2)"
            strokeWidth="1"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, delay: 0.5 }}
          />
          <motion.line
            x1="20"
            y1="100"
            x2="180"
            y2="100"
            stroke="rgba(249, 115, 22, 0.2)"
            strokeWidth="1"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, delay: 0.5 }}
          />

          {/* Corner nodes */}
          {[[20, 20], [180, 20], [20, 180], [180, 180], [100, 100]].map(([x, y], i) => (
            <motion.circle
              key={i}
              cx={x}
              cy={y}
              r="4"
              fill="#f97316"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1 + i * 0.1 }}
            />
          ))}

          {/* Orbiting elements */}
          <motion.circle
            cx="100"
            cy="100"
            r="50"
            fill="none"
            stroke="rgba(249, 115, 22, 0.15)"
            strokeWidth="1"
            strokeDasharray="4 4"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            style={{ originX: "100px", originY: "100px" }}
          />
        </motion.svg>

        {/* Floating particles */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute w-1 h-1 bg-orange-500/40 rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0, 0.6, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          />
        ))}
      </div>

      {/* Label */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center">
        <p className="font-mono text-xs text-orange-500/60 uppercase tracking-wider mb-1">
          System Architecture
        </p>
        <p className="text-[10px] text-white/20 font-mono">
          AI-NATIVE OPERATING SYSTEM
        </p>
      </div>
    </div>
  )
}
