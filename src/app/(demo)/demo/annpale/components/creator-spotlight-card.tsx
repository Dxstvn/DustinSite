'use client'

import { useState } from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { TiltCard } from './tilt-card'

/** Validate that an image URL is safe to use. */
function isSafeImageUrl(url: string): boolean {
  // Allow local paths (public directory assets)
  if (url.startsWith('/') && !url.startsWith('//')) return true
  try {
    const parsed = new URL(url)
    if (parsed.protocol !== 'https:') return false
    const allowedHostPatterns = [
      /\.supabase\.co$/,
      /\.supabase\.in$/,
      /supabase\.co$/,
    ]
    return allowedHostPatterns.some((pattern) => pattern.test(parsed.hostname))
  } catch {
    return false
  }
}

interface CreatorSpotlightCardProps {
  name: string
  category: string
  /** Display price, e.g. "$25" */
  price: string
  /** Tailwind gradient classes for the placeholder background (default provided). */
  imagePlaceholder?: string
  /** Optional image URL. When provided, replaces the gradient placeholder. */
  image?: string
  verified?: boolean
  /** When true, renders at larger featured size with a badge. */
  featured?: boolean
  /** Click handler for navigating to creator profile. */
  onClick?: () => void
}

/**
 * CreatorSpotlightCard -- premium 3:4 portrait card with duotone hover
 * and a "Book Now" CTA that slides up from below the card.
 *
 * Uses TiltCard for subtle 3D perspective on mousemove.
 */
export function CreatorSpotlightCard({
  name,
  category,
  price,
  imagePlaceholder = 'from-purple-100 to-pink-50',
  image,
  verified = false,
  featured = false,
  onClick,
}: CreatorSpotlightCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <TiltCard className="flex-shrink-0">
      <div
        className={cn(
          'group relative aspect-[3/4] rounded-2xl overflow-hidden',
          'w-[280px]',
          'cursor-pointer',
        )}
        style={{
          boxShadow: 'var(--rd-shadow-md)',
          transform: isHovered ? 'scale(1.05)' : 'scale(1)',
          transition: 'transform 300ms ease, box-shadow 300ms ease',
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={onClick}
        role={onClick ? 'link' : undefined}
        tabIndex={onClick ? 0 : undefined}
        onKeyDown={onClick ? (e: React.KeyboardEvent) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            onClick()
          }
        } : undefined}
      >
        {/* Creator image or gradient placeholder */}
        {image && isSafeImageUrl(image) ? (
          <Image
            src={image}
            alt={name}
            fill
            sizes="280px"
            className="object-cover"
          />
        ) : (
          <div
            className={cn(
              'absolute inset-0',
              `bg-gradient-to-br ${imagePlaceholder}`,
            )}
          />
        )}

        {/* Featured badge */}
        {featured && (
          <div className="absolute top-4 left-4 z-10">
            <span
              className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold text-white"
              style={{
                background: 'linear-gradient(135deg, #0038A8, #9333EA, #EC4899)',
              }}
            >
              Featured
            </span>
          </div>
        )}

        {/* Bottom gradient for text legibility */}
        <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/60 to-transparent" />

        {/* Content */}
        <div className="absolute inset-x-0 bottom-0 p-5 z-10">
          <div className="flex items-center gap-1.5">
            <h3 className="text-lg font-bold text-white leading-tight truncate">
              {name}
            </h3>
            {verified && (
              <svg
                className="w-4 h-4 flex-shrink-0 text-[var(--rd-blue)]"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-label="Verified"
              >
                <path
                  fillRule="evenodd"
                  d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </div>
          <p
            className="mt-1 text-xs font-semibold uppercase tracking-[0.12em]"
            style={{ color: 'var(--rd-gold)' }}
          >
            {category}
          </p>
          <p className="mt-1 text-sm text-white/80">Starting at {price}</p>
        </div>

      </div>
    </TiltCard>
  )
}
