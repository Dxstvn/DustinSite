'use client'

import { useRef } from 'react'
import { cn } from '@/lib/utils'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)

interface CulturalDividerProps {
  /** Animate the band in on scroll (scaleX from left). */
  animated?: boolean
  className?: string
}

/**
 * CulturalDivider -- a 4 px horizontal band painted with a metallic
 * gold shimmer gradient.  When `animated` is true GSAP ScrollTrigger
 * sweeps it in from the left edge.
 */
export function CulturalDivider({ animated = false, className }: CulturalDividerProps) {
  const ref = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      if (!animated || !ref.current) return

      gsap.fromTo(
        ref.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: ref.current,
            start: 'top 90%',
            once: true,
          },
        },
      )
    },
    { scope: ref, dependencies: [animated] },
  )

  return (
    <div
      ref={ref}
      className={cn('h-1 w-full my-0', className)}
      style={{
        background:
          'linear-gradient(to right, #AA771C 0%, #BF953F 20%, #FCF6BA 45%, #F7EF8A 50%, #FCF6BA 55%, #BF953F 80%, #AA771C 100%)',
        transformOrigin: 'left',
        ...(animated ? { transform: 'scaleX(0)' } : {}),
      }}
      role="separator"
      aria-hidden="true"
    />
  )
}
