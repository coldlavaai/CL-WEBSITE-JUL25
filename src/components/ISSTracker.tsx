'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface ISSPosition {
  latitude: string
  longitude: string
}

interface ISSResponse {
  message: string
  timestamp: number
  iss_position: ISSPosition
}

export function ISSTracker() {
  const [location, setLocation] = useState<string>('')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    const fetchISSLocation = async () => {
      try {
        // Get ISS coordinates
        const issResponse = await fetch('http://api.open-notify.org/iss-now.json')
        const issData: ISSResponse = await issResponse.json()
        const { latitude, longitude } = issData.iss_position

        // Convert to location name using BigDataCloud
        const geoResponse = await fetch(
          `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
        )
        const geoData = await geoResponse.json()

        // Get the best available name
        const locationName =
          geoData.countryName ||
          geoData.locality ||
          geoData.principalSubdivision ||
          geoData.ocean ||
          'International Waters'

        setLocation(locationName)
      } catch (error) {
        console.error('Failed to fetch ISS location:', error)
        setLocation('Location unavailable')
      }
    }

    // Fetch immediately
    fetchISSLocation()

    // Then every 5 seconds (ISS moves fast!)
    const interval = setInterval(fetchISSLocation, 5000)

    return () => clearInterval(interval)
  }, [])

  // Avoid hydration mismatch
  if (!mounted) {
    return (
      <div className="flex items-baseline gap-2 font-mono text-xs text-white/30">
        <span className="text-[10px] text-cyan-500/40 uppercase tracking-wider">🛰️</span>
        <span className="text-white/20">ISS currently over:</span>
        <span className="text-cyan-400/50 min-w-[120px]">—</span>
      </div>
    )
  }

  return (
    <div className="relative flex items-baseline gap-2 font-mono text-xs">
      {/* Corner bracket accent */}
      <div className="absolute -top-1 -left-2 w-2 h-2 border-l border-t border-cyan-500/20" />

      {/* ISS satellite icon */}
      <span className="text-[10px] text-cyan-500/40 uppercase tracking-wider">🛰️</span>

      {/* Label */}
      <span className="text-white/30 font-light">ISS currently over:</span>

      {/* Animated location */}
      <AnimatePresence mode="wait">
        <motion.span
          key={location}
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 5 }}
          transition={{ duration: 0.4 }}
          className="text-cyan-400 font-semibold min-w-[120px]"
        >
          {location || '...'}
        </motion.span>
      </AnimatePresence>

      {/* Subtle glow effect */}
      <div className="absolute inset-0 bg-cyan-500/5 blur-xl -z-10 opacity-40" />
    </div>
  )
}
