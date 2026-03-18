'use client'

import { cn } from '@/lib/utils'

/**
 * Twelve distinct placeholder gradients that evoke video thumbnail
 * variety without using real images.
 */
const THUMB_GRADIENTS = [
  'from-purple-100 to-pink-50',
  'from-blue-50 to-purple-100',
  'from-pink-50 to-purple-50',
  'from-purple-200 to-blue-100',
  'from-pink-100 to-purple-100',
  'from-purple-50 to-pink-100',
  'from-blue-100 to-pink-50',
  'from-purple-100 to-purple-50',
  'from-pink-50 to-blue-50',
  'from-purple-50 to-blue-100',
  'from-pink-100 to-blue-50',
  'from-blue-50 to-pink-100',
]

/**
 * FilmStrip -- CSS-only continuous horizontal scroll of placeholder
 * video thumbnails.
 *
 * Renders 12 items duplicated (24 total) for a seamless infinite loop.
 * Hover pauses the scroll.  Edge masks fade thumbnails in/out.
 */
export function FilmStrip() {
  const thumbs = [...THUMB_GRADIENTS, ...THUMB_GRADIENTS]

  return (
    <div
      className="group w-screen relative left-1/2 -translate-x-1/2 overflow-hidden"
      style={{
        maskImage:
          'linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)',
        WebkitMaskImage:
          'linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)',
      }}
    >
      <div
        className="flex gap-4 w-max group-hover:[animation-play-state:paused]"
        style={{ animation: 'filmStripScroll 30s linear infinite' }}
      >
        {thumbs.map((gradient, i) => (
          <div
            key={i}
            className={cn(
              'w-[200px] h-[280px] rounded-lg flex-shrink-0 bg-gradient-to-br',
              gradient,
            )}
          />
        ))}
      </div>
    </div>
  )
}
