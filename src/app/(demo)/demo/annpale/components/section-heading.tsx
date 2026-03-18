'use client'

import { useRef } from 'react'
import { cn } from '@/lib/utils'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)

interface SectionHeadingProps {
  /** Primary heading text (displayed first / larger). */
  title?: string
  /** Secondary text displayed below at reduced weight. */
  subtitle?: string
  /** A word within the title string to accent in gold. */
  accentWord?: string
  align?: 'left' | 'center'
  /** Small uppercase label above the heading. */
  overline?: string
  /** When true, uses light text colours for dark backgrounds. */
  dark?: boolean
}

/**
 * SectionHeading -- display heading with animated word entrance.
 *
 * Each word of the title line animates in on scroll via GSAP
 * ScrollTrigger with a staggered fade-up.  An optional `accentWord`
 * receives the brand gold colour.
 */
export function SectionHeading({
  title = '',
  subtitle = '',
  accentWord,
  align = 'left',
  overline,
  dark = false,
}: SectionHeadingProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const words = containerRef.current?.querySelectorAll('.rd-word')
      if (!words?.length) return

      gsap.fromTo(
        words,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.05,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 85%',
            once: true,
          },
        },
      )
    },
    { scope: containerRef },
  )

  // Split title text into words, optionally wrapping the accent word
  const titleWords = title.split(' ')

  return (
    <div
      ref={containerRef}
      className={cn('space-y-3', align === 'center' && 'text-center')}
    >
      {overline && (
        <p
          className="text-[0.6875rem] font-semibold uppercase tracking-[0.12em]"
          style={{
            color: dark
              ? 'rgba(168, 85, 247, 0.7)'
              : 'rgba(147, 51, 234, 0.7)',
          }}
        >
          {overline}
        </p>
      )}

      <h2
        className="text-display font-extrabold tracking-[-0.04em] leading-[1.0]"
        style={{ color: dark ? 'var(--rd-text-light)' : 'var(--rd-text)' }}
      >
        {titleWords.map((word, i) => {
          const isAccent =
            accentWord &&
            word.toLowerCase().replace(/[^a-z\u00e0\u00e8\u00f2\u00f9\u00e9\u00ea\u00ee\u00f4\u00fb\u00e7]/gi, '') ===
              accentWord.toLowerCase().replace(/[^a-z\u00e0\u00e8\u00f2\u00f9\u00e9\u00ea\u00ee\u00f4\u00fb\u00e7]/gi, '')

          return (
            <span
              key={`${word}-${i}`}
              className="rd-word inline-block opacity-0"
              style={isAccent ? { color: 'var(--rd-gold)' } : undefined}
            >
              {word}
              {i < titleWords.length - 1 ? '\u00A0' : ''}
            </span>
          )
        })}
      </h2>

      {subtitle && (
        <p
          className="text-h4 font-normal"
          style={{
            color: dark
              ? 'hsla(270, 5%, 98%, 0.6)'
              : 'var(--rd-text-muted)',
          }}
        >
          {subtitle}
        </p>
      )}
    </div>
  )
}
