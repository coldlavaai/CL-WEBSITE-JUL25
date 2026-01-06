'use client'

import { motion, AnimatePresence } from 'framer-motion'

interface StageCardProps {
  num: string
  title: string
  description: string
  isActive: boolean
  position: 'top' | 'bottom'
}

export function StageCard({ num, title, description, isActive, position }: StageCardProps) {
  return (
    <div className={`relative ${position === 'top' ? 'mb-8' : 'mt-8'}`}>
      {/* Connection line to wave */}
      <motion.div
        animate={{
          height: isActive ? '32px' : '24px',
          opacity: isActive ? 0.5 : 0.2,
        }}
        transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        className={`absolute left-1/2 -translate-x-1/2 w-px bg-gradient-to-b from-cyan-500/40 to-transparent ${
          position === 'top' ? 'top-full' : 'bottom-full rotate-180'
        }`}
      />

      {/* Card */}
      <motion.div
        animate={{
          opacity: isActive ? 1 : 0.4,
          scale: isActive ? 1 : 0.98,
          borderColor: isActive ? 'rgba(6, 182, 212, 0.4)' : 'rgba(255, 255, 255, 0.05)',
          boxShadow: isActive
            ? '0 0 40px rgba(6, 182, 212, 0.1)'
            : '0 0 0px rgba(0, 0, 0, 0)',
        }}
        transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        className="relative bg-black/80 backdrop-blur-sm border p-4 w-[180px]"
      >
        {/* Corner brackets */}
        <motion.div
          animate={{
            borderColor: isActive ? 'rgba(6, 182, 212, 0.6)' : 'rgba(6, 182, 212, 0.2)',
            opacity: isActive ? 1 : 0.5,
          }}
          transition={{ duration: 0.5 }}
          className="absolute top-0 left-0 w-3 h-3 border-l border-t"
        />
        <motion.div
          animate={{
            borderColor: isActive ? 'rgba(6, 182, 212, 0.6)' : 'rgba(6, 182, 212, 0.2)',
            opacity: isActive ? 1 : 0.5,
          }}
          transition={{ duration: 0.5 }}
          className="absolute bottom-0 right-0 w-3 h-3 border-r border-b"
        />

        {/* Subtle grid overlay */}
        <motion.div
          animate={{
            opacity: isActive ? 0.03 : 0.01,
          }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0"
          style={{
            backgroundImage: 'linear-gradient(rgba(6, 182, 212, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(6, 182, 212, 0.5) 1px, transparent 1px)',
            backgroundSize: '12px 12px'
          }}
        />

        {/* Active glow background */}
        <motion.div
          animate={{
            opacity: isActive ? 0.1 : 0,
          }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 via-cyan-500/10 to-transparent"
        />

        {/* Step number header */}
        <div className="flex items-center gap-2 mb-2 relative z-10">
          <motion.div
            animate={{
              backgroundColor: isActive ? 'rgba(6, 182, 212, 0.6)' : 'rgba(6, 182, 212, 0.2)',
              height: isActive ? '16px' : '12px',
            }}
            transition={{ duration: 0.4 }}
            className="w-0.5"
          />
          <motion.span
            animate={{
              color: isActive ? 'rgba(6, 182, 212, 1)' : 'rgba(6, 182, 212, 0.5)',
            }}
            transition={{ duration: 0.4 }}
            className="font-mono text-[9px] tracking-[0.15em] uppercase"
          >
            {num}
          </motion.span>
          <motion.div
            animate={{
              background: isActive
                ? 'linear-gradient(to right, rgba(6, 182, 212, 0.3), transparent)'
                : 'linear-gradient(to right, rgba(6, 182, 212, 0.1), transparent)',
            }}
            transition={{ duration: 0.4 }}
            className="flex-1 h-px"
          />
        </div>

        {/* Title */}
        <motion.h3
          animate={{
            color: isActive ? 'rgba(6, 182, 212, 0.95)' : 'rgb(255, 255, 255)',
          }}
          transition={{ duration: 0.4 }}
          className="text-sm md:text-base font-bold mb-2 relative z-10 leading-tight"
        >
          {title}
        </motion.h3>

        {/* Description - expands when active */}
        <AnimatePresence mode="wait">
          {isActive && (
            <motion.p
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4 }}
              className="text-[11px] md:text-xs leading-relaxed relative z-10 text-white/60 overflow-hidden"
            >
              {description}
            </motion.p>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
