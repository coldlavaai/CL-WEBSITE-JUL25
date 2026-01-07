'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'

const screenshots = [
  {
    id: 1,
    feature: 'Lead Management & Analytics',
    capability: 'Real-time tracking',
    path: '/screenshots/dbr-dashboard.png',
    description: 'Database reactivation workflows with automated lead scoring, response tracking, and pipeline analytics',
    applications: ['Sales teams', 'Marketing automation', 'Customer reactivation'],
  },
  {
    id: 2,
    feature: 'Customer Communications Hub',
    capability: 'Messaging & CRM',
    path: '/screenshots/detail-dynamics-comms.png',
    description: 'Centralized customer messaging with activity tracking, job management, and contact history across all channels',
    applications: ['Customer service', 'Field operations', 'Client relations'],
  },
  {
    id: 3,
    feature: 'Global Distribution Network',
    capability: 'Contact visualization',
    path: '/screenshots/global-logistics.png',
    description: 'Interactive mapping of contacts, suppliers, and distribution channels with geographic intelligence',
    applications: ['Supply chain', 'Logistics', 'International operations'],
  },
  {
    id: 4,
    feature: 'Document & Compliance Management',
    capability: 'Certification tracking',
    path: '/screenshots/document-management.png',
    description: 'Organized document library with certification tracking, expiry alerts, and compliance status monitoring',
    applications: ['Quality assurance', 'Compliance teams', 'Operations'],
  },
  {
    id: 5,
    feature: 'Geographic Lead Intelligence',
    capability: 'Territory mapping',
    path: '/screenshots/greenstar-map.png',
    description: 'Interactive territory mapping with lead distribution, density analysis, and geographic opportunity tracking',
    applications: ['Sales planning', 'Territory management', 'Market analysis'],
  },
]

export function BOSScreenshotCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)

  // Auto-advance carousel every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setDirection(1)
      setCurrentIndex((prev) => (prev + 1) % screenshots.length)
    }, 5000)

    return () => clearInterval(interval)
  }, []) // Empty deps - use functional state update to avoid stale closures

  const handleNext = () => {
    setDirection(1)
    setCurrentIndex((prev) => (prev + 1) % screenshots.length)
  }

  const handlePrev = () => {
    setDirection(-1)
    setCurrentIndex((prev) => (prev - 1 + screenshots.length) % screenshots.length)
  }

  const handleDotClick = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1)
    setCurrentIndex(index)
  }

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -1000 : 1000,
      opacity: 0,
    }),
  }

  const currentScreenshot = screenshots[currentIndex]

  return (
    <div className="relative w-full">
      {/* Main screenshot container */}
      <div className="relative">
        {/* Screenshot display with architectural frame */}
        <div className="relative aspect-[16/10] rounded-lg overflow-hidden border border-white/10 bg-black/40 backdrop-blur-sm">
          {/* Corner brackets - architectural framing */}
          <div className="absolute -top-1 -left-1 w-6 h-6 border-l-2 border-t-2 border-cyan-500/40 z-10" />
          <div className="absolute -top-1 -right-1 w-6 h-6 border-r-2 border-t-2 border-cyan-500/40 z-10" />
          <div className="absolute -bottom-1 -left-1 w-6 h-6 border-l-2 border-b-2 border-cyan-500/40 z-10" />
          <div className="absolute -bottom-1 -right-1 w-6 h-6 border-r-2 border-b-2 border-cyan-500/40 z-10" />

          {/* Subtle grid overlay */}
          <div
            className="absolute inset-0 opacity-[0.02] pointer-events-none z-[1]"
            style={{
              backgroundImage: `
                linear-gradient(rgba(6, 182, 212, 0.5) 1px, transparent 1px),
                linear-gradient(90deg, rgba(6, 182, 212, 0.5) 1px, transparent 1px)
              `,
              backgroundSize: '24px 24px',
            }}
          />

          {/* Screenshot carousel with smooth transitions */}
          <div className="relative w-full h-full overflow-hidden">
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: 'spring', stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 },
                }}
                className="absolute inset-0 flex items-center justify-center p-4"
              >
                <div className="relative w-full h-full">
                  <Image
                    src={currentScreenshot.path}
                    alt={currentScreenshot.feature}
                    fill
                    className="object-contain"
                    priority={currentIndex === 0}
                    unoptimized
                  />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation arrows - minimal and precise */}
          <button
            onClick={handlePrev}
            className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center bg-black/60 border border-white/10 hover:border-cyan-500/60 hover:bg-black/80 transition-all group rounded"
            aria-label="Previous screenshot"
          >
            <svg
              className="w-4 h-4 text-white/40 group-hover:text-cyan-500 transition-colors"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={handleNext}
            className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center bg-black/60 border border-white/10 hover:border-cyan-500/60 hover:bg-black/80 transition-all group rounded"
            aria-label="Next screenshot"
          >
            <svg
              className="w-4 h-4 text-white/40 group-hover:text-cyan-500 transition-colors"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Capability badge - floating technical indicator */}
          <motion.div
            key={`badge-${currentIndex}`}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="absolute top-4 left-4 z-10"
          >
            <div className="flex items-center gap-2 px-3 py-1.5 bg-black/80 border border-cyan-500/30 backdrop-blur-sm rounded">
              <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-pulse" />
              <span className="font-mono text-[10px] text-cyan-500/90 uppercase tracking-wider">
                {currentScreenshot.capability}
              </span>
            </div>
          </motion.div>
        </div>

        {/* Compact info display below screenshot */}
        <div className="mt-6">
          {/* Feature name and navigation */}
          <div className="flex items-start justify-between gap-4 mb-3">
            <motion.div
              key={`info-${currentIndex}`}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="flex-1"
            >
              <h3 className="text-white/90 font-medium text-lg mb-1">
                {currentScreenshot.feature}
              </h3>
              <p className="text-white/40 text-sm leading-relaxed">
                {currentScreenshot.description}
              </p>
            </motion.div>

            {/* Minimal dot navigation */}
            <div className="flex items-center gap-2 pt-1">
              {screenshots.map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleDotClick(index)}
                  className="group relative"
                  aria-label={`Go to screenshot ${index + 1}`}
                >
                  <div
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentIndex
                        ? 'bg-cyan-500'
                        : 'bg-white/20 group-hover:bg-cyan-500/40'
                    }`}
                  />
                  {/* Progress ring for active dot */}
                  {index === currentIndex && (
                    <svg className="absolute inset-0 -m-1.5 w-5 h-5 -rotate-90" viewBox="0 0 20 20">
                      <motion.circle
                        cx="10"
                        cy="10"
                        r="8"
                        fill="none"
                        stroke="rgba(6, 182, 212, 0.3)"
                        strokeWidth="1"
                        strokeDasharray="50"
                        initial={{ strokeDashoffset: 50 }}
                        animate={{ strokeDashoffset: 0 }}
                        transition={{ duration: 5, ease: 'linear' }}
                        key={`progress-${currentIndex}`}
                      />
                    </svg>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Applications tags */}
          <motion.div
            key={`apps-${currentIndex}`}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="flex flex-wrap gap-2"
          >
            {currentScreenshot.applications.map((app, idx) => (
              <span
                key={idx}
                className="px-2 py-0.5 text-[10px] font-mono text-cyan-500/60 border border-cyan-500/20 rounded uppercase tracking-wider"
              >
                {app}
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  )
}
