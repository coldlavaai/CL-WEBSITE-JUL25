'use client'

interface GridOverlayProps {
  spacing?: number
  opacity?: number
}

export function GridOverlay({ spacing = 32, opacity = 0.02 }: GridOverlayProps) {
  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        backgroundImage: `radial-gradient(circle, rgba(255, 255, 255, ${opacity}) 1px, transparent 1px)`,
        backgroundSize: `${spacing}px ${spacing}px`,
      }}
    />
  )
}
