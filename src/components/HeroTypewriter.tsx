'use client'

import { useState, useEffect } from 'react'

interface HeroTypewriterProps {
  startDelay?: number
  typingSpeed?: number
  deletingSpeed?: number
  pauseDuration?: number
}

export function HeroTypewriter({
  startDelay = 0,
  typingSpeed = 45,
  deletingSpeed = 30,
  pauseDuration = 400,
}: HeroTypewriterProps) {
  const [displayText, setDisplayText] = useState('')
  const [currentPhase, setCurrentPhase] = useState<'typing-full' | 'deleting-wants' | 'typing-needs' | 'complete'>('typing-full')
  const [hasStarted, setHasStarted] = useState(startDelay === 0)
  const [showCursor, setShowCursor] = useState(true)

  // Full text to type initially (with line break markers)
  const fullText = "We Build The |Systems|Your Business|Actually Wants"
  const lines = fullText.split('|')

  // Handle start delay
  useEffect(() => {
    if (startDelay > 0) {
      const timeout = setTimeout(() => {
        setHasStarted(true)
      }, startDelay)
      return () => clearTimeout(timeout)
    }
  }, [startDelay])

  useEffect(() => {
    if (!hasStarted) return

    if (currentPhase === 'typing-full') {
      // Type out the full headline
      if (displayText.length < fullText.length) {
        const timeout = setTimeout(() => {
          setDisplayText(fullText.slice(0, displayText.length + 1))
        }, typingSpeed)
        return () => clearTimeout(timeout)
      } else {
        // Full text typed, now pause before deleting "Wants"
        const timeout = setTimeout(() => {
          setCurrentPhase('deleting-wants')
        }, pauseDuration)
        return () => clearTimeout(timeout)
      }
    }

    if (currentPhase === 'deleting-wants') {
      // Delete "Wants" (5 characters)
      const targetText = "We Build The |Systems|Your Business|Actually "
      if (displayText.length > targetText.length) {
        const timeout = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1))
        }, deletingSpeed)
        return () => clearTimeout(timeout)
      } else {
        // Deletion complete, start typing "Needs"
        setCurrentPhase('typing-needs')
      }
    }

    if (currentPhase === 'typing-needs') {
      const finalText = "We Build The |Systems|Your Business|Actually Needs"
      if (displayText.length < finalText.length) {
        const timeout = setTimeout(() => {
          setDisplayText(finalText.slice(0, displayText.length + 1))
        }, typingSpeed)
        return () => clearTimeout(timeout)
      } else {
        // Animation complete
        setCurrentPhase('complete')
      }
    }
  }, [hasStarted, displayText, currentPhase, fullText, typingSpeed, deletingSpeed, pauseDuration])

  // Parse display text into lines
  const renderText = () => {
    const segments = displayText.split('|')
    const isComplete = currentPhase === 'complete'

    return (
      <>
        {/* Line 1: "We Build The " */}
        {segments[0] && <span>{segments[0]}</span>}{' '}

        {/* Line 2: "Systems" (italic/light) */}
        {segments[1] && (
          <span className="block text-white/40 italic font-light">
            {segments[1]}
          </span>
        )}

        {/* Line 3: "Your Business" */}
        {segments[2] && (
          <span className="block">
            {segments[2]}
          </span>
        )}

        {/* Line 4: "Actually Wants/Needs" with final word in cyan */}
        {segments[3] && (
          <span className="block relative inline-block">
            {segments[3].includes('Needs') ? (
              <>
                Actually <span className="text-cyan-500 transition-colors duration-300">Needs</span>
              </>
            ) : (
              segments[3]
            )}
          </span>
        )}
      </>
    )
  }

  return (
    <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-[-0.03em] leading-[0.9] mb-8 max-w-5xl">
      {renderText()}
      {showCursor && hasStarted && (
        <span className="inline-block w-1 h-[0.9em] bg-cyan-500 animate-blink ml-1 align-middle" />
      )}
    </h1>
  )
}
