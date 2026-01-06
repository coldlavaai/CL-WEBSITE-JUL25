'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface PremiumHeroTitleProps {
  contentDelay?: number
  swapDelay?: number
}

export function PremiumHeroTitle({
  contentDelay = 0.8,
  swapDelay = 1.5,
}: PremiumHeroTitleProps) {
  const [displayWord, setDisplayWord] = useState('Wants')
  const [phase, setPhase] = useState<'showing' | 'deleting' | 'typing' | 'complete'>('showing')
  const [showCursor, setShowCursor] = useState(true)

  useEffect(() => {
    const startSwap = setTimeout(() => {
      setPhase('deleting')
    }, swapDelay * 1000)

    return () => clearTimeout(startSwap)
  }, [swapDelay])

  useEffect(() => {
    if (phase === 'deleting') {
      if (displayWord.length > 0) {
        const timeout = setTimeout(() => {
          setDisplayWord(displayWord.slice(0, -1))
        }, 50) // Fast deletion
        return () => clearTimeout(timeout)
      } else {
        // Done deleting, start typing
        setPhase('typing')
      }
    }

    if (phase === 'typing') {
      const targetWord = 'Needs'
      if (displayWord.length < targetWord.length) {
        const timeout = setTimeout(() => {
          setDisplayWord(targetWord.slice(0, displayWord.length + 1))
        }, 80) // Typing speed
        return () => clearTimeout(timeout)
      } else {
        // Done typing
        setPhase('complete')
      }
    }
  }, [phase, displayWord])

  const isComplete = phase === 'complete'

  return (
    <motion.h1
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: contentDelay,
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-[-0.03em] leading-[0.9] mb-8 max-w-5xl"
    >
      We Build The{' '}
      <span className="block text-white/40 italic font-light">Systems</span>
      <span className="block">Your Business</span>
      <span className="block relative inline-block">
        Actually{' '}
        <span className={`relative inline-block transition-colors duration-300 ${isComplete ? 'text-cyan-500' : ''}`}>
          {displayWord}
        </span>
        {showCursor && (
          <span className="inline-block w-1 h-[0.9em] bg-cyan-500 animate-blink ml-1 align-middle" />
        )}
      </span>
    </motion.h1>
  )
}
