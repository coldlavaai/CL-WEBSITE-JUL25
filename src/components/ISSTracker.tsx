'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { fetchWithTimeout } from '@/lib/fetchWithTimeout'
import { RateLimiter } from '@/lib/rateLimit'

interface ISSResponse {
  latitude: number
  longitude: number
  altitude: number
  velocity: number
  id: number
  name: string
  timestamp: number
}

// Rate limiter for geocoding API (1 call per 2 seconds)
const geocodeRateLimiter = new RateLimiter(0.5)

// Cache for geocoding results (avoid redundant API calls)
let geocodeCache: { [key: string]: string } = {}
let lastGeocodedCoords: { lat: number; lon: number } | null = null

/**
 * Check if coordinates have changed significantly (>100km)
 * Avoids unnecessary geocoding calls for small position changes
 */
function hasCoordinatesChangedSignificantly(lat: number, lon: number): boolean {
  if (!lastGeocodedCoords) return true

  const latDiff = Math.abs(lat - lastGeocodedCoords.lat)
  const lonDiff = Math.abs(lon - lastGeocodedCoords.lon)

  // ~1 degree = ~111km, so 1 degree threshold = ~111km movement
  return latDiff > 1 || lonDiff > 1
}

/**
 * Fallback: Determine ocean or continent from coordinates
 */
function getOceanOrContinent(lat: number, lon: number): string {
  // Simplified ocean/continent detection based on coordinate ranges

  // Over land (rough approximations)
  if (lat > 24 && lat < 50 && lon > -125 && lon < -65) return 'North America'
  if (lat > -35 && lat < 15 && lon > -82 && lon < -34) return 'South America'
  if (lat > 35 && lat < 71 && lon > -10 && lon < 40) return 'Europe'
  if (lat > -35 && lat < 37 && lon > -20 && lon < 60) return 'Africa'
  if (lat > 8 && lat < 55 && lon > 60 && lon < 150) return 'Asia'
  if (lat > -45 && lat < -10 && lon > 110 && lon < 155) return 'Australia'

  // Over oceans
  if (lon > -180 && lon < -70) return 'Pacific Ocean'
  if (lon > -70 && lon < 20) return 'Atlantic Ocean'
  if (lon > 20 && lon < 120 && lat < 35) return 'Indian Ocean'
  if (lat > 60) return 'Arctic Ocean'
  if (lat < -60) return 'Southern Ocean'

  return 'International Waters'
}

export function ISSTracker() {
  const [location, setLocation] = useState<string>('')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    const fetchISSLocation = async () => {
      try {
        // Get ISS coordinates
        const issResponse = await fetchWithTimeout(
          'https://api.wheretheiss.at/v1/satellites/25544',
          {},
          8000
        )

        if (!issResponse.ok) {
          throw new Error(`ISS API returned ${issResponse.status}`)
        }

        const issData = await issResponse.json()
        const { latitude, longitude } = issData

        // Round to 1 decimal place for cache key (reduces API calls)
        const lat = Math.round(latitude * 10) / 10
        const lon = Math.round(longitude * 10) / 10
        const cacheKey = `${lat},${lon}`

        // Check cache first
        if (geocodeCache[cacheKey]) {
          setLocation(geocodeCache[cacheKey])
          return
        }

        // Only geocode if coordinates changed significantly (>100km)
        if (!hasCoordinatesChangedSignificantly(lat, lon)) {
          // Use fallback based on coordinates
          const fallbackLocation = getOceanOrContinent(lat, lon)
          setLocation(fallbackLocation)
          return
        }

        // Update last geocoded coordinates
        lastGeocodedCoords = { lat, lon }

        // Try OpenStreetMap Nominatim (free, more generous than geocode.xyz)
        try {
          const geoResponse = await geocodeRateLimiter.throttle(() =>
            fetchWithTimeout(
              `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`,
              {
                headers: {
                  'User-Agent': 'ColdLava-ISS-Tracker/1.0',
                },
              },
              8000
            )
          )

          if (geoResponse.ok) {
            const geoData = await geoResponse.json()

            // Extract location from Nominatim response
            const address = geoData.address || {}
            let locationName = 'International Waters'

            if (address.country) {
              locationName = address.country
            } else if (address.state) {
              locationName = address.state
            } else if (address.ocean) {
              locationName = address.ocean
            } else if (address.sea) {
              locationName = address.sea
            } else if (geoData.display_name) {
              // Use display_name as last resort (parse it)
              const parts = geoData.display_name.split(',')
              locationName = parts[parts.length - 1].trim() || 'International Waters'
            }

            // Cache the result
            geocodeCache[cacheKey] = locationName
            setLocation(locationName)
          } else {
            throw new Error('Geocoding failed')
          }
        } catch (geoError) {
          // Fallback to coordinate-based detection
          const fallbackLocation = getOceanOrContinent(lat, lon)
          geocodeCache[cacheKey] = fallbackLocation
          setLocation(fallbackLocation)
        }
      } catch (error) {
        console.error('Failed to fetch ISS location:', error)
        setLocation('Orbiting Earth')
      }
    }

    // Fetch immediately
    fetchISSLocation()

    // Then every 10 seconds (reduced from 5 to limit API calls)
    const interval = setInterval(fetchISSLocation, 10000)

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
