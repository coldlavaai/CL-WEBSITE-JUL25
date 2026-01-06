'use client'

import { useEffect } from 'react'
import { printConsoleMessage } from '@/lib/consoleMessage'

export function ConsoleEasterEgg() {
  useEffect(() => {
    printConsoleMessage()
  }, [])

  return null
}
