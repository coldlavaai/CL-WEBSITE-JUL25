'use client'

import { useEffect } from 'react'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log critical error
    console.error('Critical application error:', error)
  }, [error])

  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0, backgroundColor: '#000', color: '#fff', fontFamily: 'system-ui, sans-serif' }}>
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem'
        }}>
          <div style={{ maxWidth: '600px', textAlign: 'center' }}>
            <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>⚠️</h1>
            <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Critical Error</h2>
            <p style={{ color: '#888', marginBottom: '2rem', lineHeight: '1.6' }}>
              A critical error occurred. Please refresh the page or contact support if the issue persists.
            </p>

            {process.env.NODE_ENV === 'development' && (
              <div style={{
                marginBottom: '2rem',
                padding: '1rem',
                backgroundColor: 'rgba(239, 68, 68, 0.1)',
                border: '1px solid rgba(239, 68, 68, 0.3)',
                borderRadius: '8px',
                textAlign: 'left',
                fontSize: '0.875rem',
                fontFamily: 'monospace',
                color: '#ef4444'
              }}>
                <div style={{ marginBottom: '0.5rem', fontWeight: 'bold' }}>Development Info:</div>
                <div>{error.message}</div>
                {error.digest && <div style={{ marginTop: '0.5rem', opacity: 0.7 }}>Digest: {error.digest}</div>}
              </div>
            )}

            <button
              onClick={reset}
              style={{
                padding: '0.75rem 1.5rem',
                backgroundColor: '#06b6d4',
                color: '#000',
                border: 'none',
                borderRadius: '4px',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: 'pointer',
                marginRight: '1rem'
              }}
            >
              Try again
            </button>

            <a
              href="/"
              style={{
                padding: '0.75rem 1.5rem',
                color: '#fff',
                textDecoration: 'none',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '4px',
                fontSize: '1rem',
                display: 'inline-block'
              }}
            >
              Go home
            </a>
          </div>
        </div>
      </body>
    </html>
  )
}
