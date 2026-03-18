'use client'

import { useRef, useCallback } from 'react'
import { cn } from '@/lib/utils'

interface TiltCardProps {
  children: React.ReactNode
  className?: string
  /** Maximum rotation in degrees (default 4). */
  maxTilt?: number
}

/**
 * TiltCard -- lightweight CSS-only 3D tilt on mousemove.
 *
 * Maps the pointer position relative to the card center to a rotateX /
 * rotateY transform capped at +/- maxTilt degrees.  Resets smoothly on
 * mouse leave via a CSS transition.
 *
 * Uses ref-based DOM manipulation instead of setState to avoid
 * triggering React re-renders on every mousemove (~60fps).
 */
export function TiltCard({ children, className, maxTilt = 4 }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null)

  const handleMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const el = ref.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2 // -1 to 1
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2
      el.style.transform = `perspective(1000px) rotateX(${-y * maxTilt}deg) rotateY(${x * maxTilt}deg)`
      el.style.willChange = 'transform'
    },
    [maxTilt],
  )

  const handleLeave = useCallback(() => {
    const el = ref.current
    if (!el) return
    el.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)'
    el.style.transition = 'transform 400ms ease-out'
    el.style.willChange = 'auto'
  }, [])

  const handleEnter = useCallback(() => {
    const el = ref.current
    if (!el) return
    el.style.transition = 'none'
  }, [])

  return (
    <div
      ref={ref}
      className={cn('inline-block', className)}
      onMouseMove={handleMove}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      {children}
    </div>
  )
}
