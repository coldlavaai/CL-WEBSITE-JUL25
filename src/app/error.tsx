'use client'

import { useEffect } from 'react'
import Link from 'next/link'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log error to console in development
    console.error('Application error:', error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="relative max-w-2xl w-full p-8">
        {/* Architectural frame */}
        <div className="absolute -top-2 -left-2 w-12 h-12 border-t-2 border-l-2 border-cyan-500/40" />
        <div className="absolute -top-2 -right-2 w-12 h-12 border-t-2 border-r-2 border-cyan-500/40" />
        <div className="absolute -bottom-2 -left-2 w-12 h-12 border-b-2 border-l-2 border-cyan-500/40" />
        <div className="absolute -bottom-2 -right-2 w-12 h-12 border-b-2 border-r-2 border-cyan-500/40" />

        <div className="relative bg-black/95 border border-cyan-500/20 p-12 rounded-lg">
          {/* Error badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-500/10 border border-red-500/30 rounded mb-6">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            <span className="font-mono text-xs text-red-500 uppercase tracking-wider">
              System Error
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Something went wrong
          </h1>

          <p className="text-white/60 text-lg mb-8 leading-relaxed">
            We encountered an unexpected error. This has been logged and we'll look into it.
          </p>

          {/* Error details in dev mode */}
          {process.env.NODE_ENV === 'development' && (
            <div className="mb-8 p-4 bg-red-500/5 border border-red-500/20 rounded font-mono text-xs text-red-400 overflow-auto">
              <div className="mb-2 text-red-500 font-semibold">Development Info:</div>
              <div className="text-white/40">{error.message}</div>
              {error.digest && (
                <div className="mt-2 text-white/30">Digest: {error.digest}</div>
              )}
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={reset}
              className="group relative px-6 py-3 bg-cyan-500 hover:bg-cyan-400 text-black font-medium rounded transition-all duration-300 overflow-hidden"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                Try again
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </span>
              <div className="absolute inset-0 bg-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>

            <Link
              href="/"
              className="px-6 py-3 text-center border border-white/20 hover:border-cyan-500/50 text-white/70 hover:text-white font-medium rounded transition-all duration-300"
            >
              Go home
            </Link>
          </div>

          {/* Technical decoration */}
          <div className="mt-8 pt-6 border-t border-white/5">
            <p className="text-[10px] font-mono text-white/30 text-center">
              Error ID: {error.digest || 'N/A'} · Cold Lava AI Ltd
            </p>
          </div>
        </div>

        {/* Subtle grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.02] pointer-events-none"
          style={{
            backgroundImage: 'linear-gradient(rgba(6, 182, 212, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(6, 182, 212, 0.5) 1px, transparent 1px)',
            backgroundSize: '32px 32px'
          }}
        />
      </div>
    </div>
  )
}
