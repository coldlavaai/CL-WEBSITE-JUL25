'use client'

interface TechnicalLabelProps {
  children: React.ReactNode
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
  className?: string
}

const positionClasses = {
  'top-left': 'top-4 left-4',
  'top-right': 'top-4 right-4',
  'bottom-left': 'bottom-4 left-4',
  'bottom-right': 'bottom-4 right-4',
}

export function TechnicalLabel({
  children,
  position = 'top-left',
  className = ''
}: TechnicalLabelProps) {
  return (
    <div
      className={`absolute ${positionClasses[position]} font-mono text-[10px] uppercase tracking-[0.15em] text-white/20 ${className}`}
    >
      {children}
    </div>
  )
}
