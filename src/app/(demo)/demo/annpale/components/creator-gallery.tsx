'use client'

import type { ReactNode } from 'react'

interface CreatorGalleryProps {
  children: ReactNode
}

/**
 * CreatorGallery -- edge-to-edge horizontal scroll container for
 * CreatorSpotlightCards (or any children).
 *
 * Breaks out of the parent container to span the full viewport width,
 * uses scroll-snap for a satisfying swipe, and hides the scrollbar.
 */
export function CreatorGallery({ children }: CreatorGalleryProps) {
  return (
    <div className="w-screen relative left-1/2 -translate-x-1/2">
      <div
        className="flex gap-6 overflow-x-auto scrollbar-hide px-4 sm:px-6 lg:px-8 py-4"
        style={{
          scrollSnapType: 'x mandatory',
          WebkitOverflowScrolling: 'touch',
        }}
      >
        {/* Wrap each child in a snap-aligned flex item */}
        {children}
      </div>
    </div>
  )
}

/**
 * Wrapper for individual gallery items to enforce scroll-snap alignment.
 * Use this around each CreatorSpotlightCard inside CreatorGallery.
 */
export function CreatorGalleryItem({ children }: { children: ReactNode }) {
  return (
    <div className="flex-shrink-0" style={{ scrollSnapAlign: 'start' }}>
      {children}
    </div>
  )
}
