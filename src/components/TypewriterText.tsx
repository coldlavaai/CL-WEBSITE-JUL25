'use client'

import { useState, useEffect } from 'react'

interface TypewriterTextProps {
  staticPrefix?: string
  words: string[]
  finalWord: string
  typingSpeed?: number
  deletingSpeed?: number
  pauseDuration?: number
  startDelay?: number
  className?: string
}

export function TypewriterText({
  staticPrefix = '',
  words,
  finalWord,
  typingSpeed = 100,
  deletingSpeed = 60,
  pauseDuration = 300,
  startDelay = 0,
  className = '',
}: TypewriterTextProps) {
  const [displayText, setDisplayText] = useState('')
  const [prefixComplete, setPrefixComplete] = useState(false)
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const [showCursor, setShowCursor] = useState(true)
  const [hasStarted, setHasStarted] = useState(startDelay === 0)

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
    if (!hasStarted || isComplete) return

    // First, type out the static prefix if it exists
    if (staticPrefix && !prefixComplete) {
      if (displayText.length < staticPrefix.length) {
        const timeout = setTimeout(() => {
          setDisplayText(staticPrefix.slice(0, displayText.length + 1))
        }, typingSpeed)
        return () => clearTimeout(timeout)
      } else {
        // Prefix complete, start word cycling
        setPrefixComplete(true)
        return
      }
    }

    // Now handle the word cycling
    const allWords = [...words, finalWord]
    const currentWord = allWords[currentWordIndex]
    const isLastWord = currentWordIndex === allWords.length - 1
    const fullText = staticPrefix + currentWord

    if (!isDeleting) {
      // Typing phase
      if (displayText.length < fullText.length) {
        const timeout = setTimeout(() => {
          setDisplayText(fullText.slice(0, displayText.length + 1))
        }, typingSpeed)
        return () => clearTimeout(timeout)
      } else {
        // Word complete
        if (isLastWord) {
          // Final word typed - finish animation (keep cursor visible)
          const timeout = setTimeout(() => {
            setIsComplete(true)
          }, 200)
          return () => clearTimeout(timeout)
        } else {
          // Start deleting after pause
          const timeout = setTimeout(() => {
            setIsDeleting(true)
          }, pauseDuration)
          return () => clearTimeout(timeout)
        }
      }
    } else {
      // Deleting phase - only delete the word part, keep the prefix
      if (displayText.length > staticPrefix.length) {
        const timeout = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1))
        }, deletingSpeed)
        return () => clearTimeout(timeout)
      } else {
        // Deletion complete - move to next word
        setIsDeleting(false)
        setCurrentWordIndex(currentWordIndex + 1)
      }
    }
  }, [
    displayText,
    isDeleting,
    currentWordIndex,
    isComplete,
    prefixComplete,
    staticPrefix,
    words,
    finalWord,
    typingSpeed,
    deletingSpeed,
    pauseDuration,
    hasStarted,
  ])

  return (
    <>
      {isComplete ? (
        <>
          {staticPrefix}
          <span className="text-cyan-500 transition-colors duration-300">{finalWord}</span>
        </>
      ) : (
        <span>{displayText}</span>
      )}
      {showCursor && hasStarted && (
        <span className="inline-block w-1 h-[0.9em] bg-cyan-500 animate-blink ml-1 align-middle" />
      )}
    </>
  )
}
