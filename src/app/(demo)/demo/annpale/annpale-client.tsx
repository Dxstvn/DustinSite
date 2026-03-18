'use client'

import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import Image from 'next/image'
import { ArrowRight, ChevronLeft, ChevronRight, Play, Mail, User, Search, PenLine, Video } from 'lucide-react'

import { SectionHeading } from './components/section-heading'
import { CulturalDivider } from './components/cultural-divider'
import { CreatorSpotlightCard } from './components/creator-spotlight-card'
import { FilmStrip } from './components/film-strip'
import {
  CreatorGallery,
  CreatorGalleryItem,
} from './components/creator-gallery'
import { WorldCupBanner } from './components/world-cup-banner'
import { WorldCupHeaderBanner } from './components/world-cup-header-banner'
import { HowItWorksModal } from './components/how-it-works-modal'
import { translations, STATIC_CREATORS } from './data/mock-data'
import type { FeaturedCreator } from './data/mock-data'

gsap.registerPlugin(ScrollTrigger)

/* ---------------------------------------------------------------
   Props
   --------------------------------------------------------------- */

interface AnnPaleClientProps {
  creators: FeaturedCreator[]
}

/* ---------------------------------------------------------------
   Translation helper
   --------------------------------------------------------------- */

function t(key: string, params?: Record<string, string | number>): string {
  const parts = key.split('.')
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let value: any = translations
  for (const part of parts) {
    value = value?.[part]
  }
  if (typeof value !== 'string') return key
  if (params) {
    let result = value
    for (const [k, v] of Object.entries(params)) {
      result = result.replace(`{${k}}`, String(v))
    }
    return result
  }
  return value
}

/* ---------------------------------------------------------------
   Sub-components
   --------------------------------------------------------------- */

/** Rotating overline that cycles between translated phrases. */
function RotatingOverline({ phrases }: { phrases: string[] }) {
  const [index, setIndex] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>
    const interval = setInterval(() => {
      setVisible(false)
      timeoutId = setTimeout(() => {
        setIndex((prev) => (prev + 1) % phrases.length)
        setVisible(true)
      }, 500)
    }, 4000)
    return () => {
      clearInterval(interval)
      clearTimeout(timeoutId)
    }
  }, [phrases.length])

  return (
    <p
      className="hero-overline-v2 text-[0.6875rem] font-semibold uppercase opacity-0"
      style={{
        letterSpacing: '0.2em',
        color: 'var(--rd-gold)',
      }}
    >
      <span
        style={{
          opacity: visible ? 1 : 0,
          transition: 'opacity 0.5s ease-in-out',
          display: 'inline-block',
        }}
      >
        {phrases[index]}
      </span>
    </p>
  )
}

/** Animated hero headline with per-word stagger and gold shimmer on accent. */
function HeroHeadlineV2({ words, accentWord }: { words: string[]; accentWord: string }) {
  return (
    <h1
      className="font-extrabold"
      style={{
        fontSize: 'clamp(3rem, 5vw + 1rem, 4.5rem)',
        letterSpacing: '-0.04em',
        lineHeight: 1.0,
        color: 'var(--rd-text)',
      }}
    >
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          className="hero-word inline-block opacity-0"
          style={
            word.toLowerCase() === accentWord.toLowerCase()
              ? {
                  background:
                    'linear-gradient(90deg, #D4A853 0%, #f0d78c 25%, #D4A853 50%, #f0d78c 75%, #D4A853 100%)',
                  backgroundSize: '200% auto',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  animation: 'shimmerGold 4s linear infinite',
                }
              : undefined
          }
        >
          {word}
          {i < words.length - 1 ? '\u00A0' : ''}
        </span>
      ))}
    </h1>
  )
}

/** Silhouette SVG for mosaic portrait cells. */
function SilhouetteSvg() {
  return (
    <svg
      viewBox="0 0 80 80"
      className="absolute bottom-4 left-1/2 -translate-x-1/2 w-20 h-20 opacity-[0.15]"
      aria-hidden="true"
    >
      <circle cx="40" cy="28" r="14" fill="white" />
      <ellipse cx="40" cy="68" rx="24" ry="18" fill="white" />
    </svg>
  )
}

/** Enhanced mosaic grid with hover effects for the hero right panel. */
function CreatorMosaicV2({ creators }: { creators?: FeaturedCreator[] }) {
  const ref = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      if (!ref.current) return
      const mm = gsap.matchMedia()

      mm.add('(min-width: 1024px)', () => {
        const cells = ref.current?.querySelectorAll('.mosaic-cell-v2')
        if (!cells) return

        cells.forEach((cell, i) => {
          const rate = 0.05 + i * 0.03
          gsap.to(cell, {
            yPercent: -rate * 100,
            ease: 'none',
            scrollTrigger: {
              trigger: ref.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          })
        })
      })
    },
    { scope: ref },
  )

  const creatorImages = creators?.slice(0, 6) ?? []

  const cells: Array<{
    area: string
    gradient: string
    radius: string
    hasSilhouette?: boolean
    hasVideo?: boolean
    hasCategory?: boolean
    isFeatured: boolean
    creatorIdx: number
  }> = [
    { area: 'a', gradient: 'from-purple-200 to-blue-100', radius: '1.5rem', hasSilhouette: true, isFeatured: true, creatorIdx: 0 },
    { area: 'b', gradient: 'from-pink-100 to-purple-100', radius: '1rem', hasVideo: true, isFeatured: false, creatorIdx: 1 },
    { area: 'c', gradient: 'from-blue-50 to-purple-100', radius: '1.25rem', hasSilhouette: true, isFeatured: false, creatorIdx: 2 },
    { area: 'd', gradient: 'from-purple-100 to-pink-50', radius: '2rem', hasSilhouette: true, isFeatured: false, creatorIdx: 3 },
    { area: 'e', gradient: 'from-pink-50 to-purple-50', radius: '1rem', hasCategory: true, isFeatured: false, creatorIdx: 4 },
    { area: 'f', gradient: 'from-purple-50 to-pink-100', radius: '1.5rem', isFeatured: false, creatorIdx: 5 },
  ]

  return (
    <>
      <style>
        {`@media (hover: hover) {
  .mosaic-cell-v2 {
    transition: transform 300ms ease-out, box-shadow 300ms ease-out;
  }
  .mosaic-cell-v2:hover {
    transform: scale(1.03);
    box-shadow: var(--rd-shadow-xl);
  }
  .mosaic-cell-v2 .mosaic-name-badge {
    transform: translateY(100%);
    transition: transform 300ms ease-out;
  }
  .mosaic-cell-v2:hover .mosaic-name-badge {
    transform: translateY(0);
  }
}`}
      </style>
      <div
        ref={ref}
        className="w-full h-full"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gridTemplateRows: 'repeat(4, 1fr)',
          gridTemplateAreas: '"a a b" "a a b" "c d d" "e d f"',
          gap: '16px',
          minHeight: '480px',
        }}
      >
        {cells.map((cell) => {
          const creator = creatorImages[cell.creatorIdx]
          const hasImage = !!creator?.coverImage || !!creator?.avatar

          return (
            <div
              key={cell.area}
              className={`mosaic-cell-v2 bg-gradient-to-br ${cell.gradient} relative overflow-hidden opacity-0`}
              style={{
                gridArea: cell.area,
                borderRadius: cell.radius,
                boxShadow: 'var(--rd-shadow-md)',
              }}
            >
              {hasImage && (
                <Image
                  src={creator.coverImage || creator.avatar}
                  alt={creator.name}
                  fill
                  sizes="(max-width:1024px) 0px, 33vw"
                  className="object-cover"
                  style={{ borderRadius: 'inherit' }}
                  {...(cell.area === 'a' ? { priority: true } : {})}
                />
              )}

              {!hasImage && (
                <div
                  className="absolute inset-0 bg-white/10 backdrop-blur-[2px] ring-1 ring-white/20"
                  style={{ borderRadius: 'inherit' }}
                />
              )}
              {hasImage && (
                <div
                  className="absolute inset-0 ring-1 ring-white/20"
                  style={{ borderRadius: 'inherit' }}
                />
              )}

              {cell.hasSilhouette && !hasImage && <SilhouetteSvg />}

              {cell.isFeatured && (
                <span
                  className="absolute top-3 left-3 text-[10px] font-bold px-2.5 py-1 rounded-full text-white z-10"
                  style={{ background: 'linear-gradient(135deg, #0038A8, #9333EA, #EC4899)' }}
                >
                  Featured
                </span>
              )}

              {hasImage && !cell.hasVideo && (
                <div
                  className="mosaic-name-badge absolute bottom-0 left-0 right-0 p-3"
                  style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 100%)' }}
                >
                  <p className="text-xs font-semibold text-white">{creator.name}</p>
                  <p className="text-[10px] text-white/70">{creator.category}</p>
                </div>
              )}

              {cell.hasVideo && (
                <>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center animate-pulse"
                      style={{ backgroundColor: 'rgba(255,255,255,0.85)' }}
                    >
                      <svg width="14" height="16" viewBox="0 0 14 16" fill="none" className="ml-0.5" aria-hidden="true">
                        <path d="M13 8L1 15V1L13 8Z" fill="var(--rd-purple)" stroke="var(--rd-purple)" strokeWidth="1.5" strokeLinejoin="round" />
                      </svg>
                    </div>
                  </div>
                  <span
                    className="absolute top-3 right-3 text-xs font-mono font-semibold px-2 py-0.5 rounded-full"
                    style={{ backgroundColor: 'rgba(0,0,0,0.5)', color: '#fff' }}
                  >
                    0:15
                  </span>
                  <p className="absolute bottom-3 left-3 text-xs font-medium text-white/90">
                    {creator?.name ?? 'Wyclef Jean'}
                  </p>
                </>
              )}

              {cell.hasCategory && (
                <span
                  className="absolute top-3 left-3 text-[10px] font-semibold rounded-full px-2 py-0.5 backdrop-blur"
                  style={{ color: 'var(--rd-gold)', backgroundColor: 'rgba(0,0,0,0.3)' }}
                >
                  {creator?.category ?? 'Mizik'}
                </span>
              )}
            </div>
          )
        })}
      </div>
    </>
  )
}

/* ---------------------------------------------------------------
   Hero Video Cards -- phone-shaped fanned video cards
   --------------------------------------------------------------- */

const HERO_VIDEOS = [
  {
    id: 'hero-1',
    videoUrl:
      'https://yijizsscwkvepljqojkz.supabase.co/storage/v1/object/public/creator-videos/homepage/hero-video-1.mp4',
    posterUrl:
      'https://yijizsscwkvepljqojkz.supabase.co/storage/v1/object/public/creator-videos/homepage/hero-video-1-poster.webp',
    creatorName: 'Jean-Ricner Bellegarde',
    category: 'Esp\u00f2',
  },
  {
    id: 'hero-2',
    videoUrl:
      'https://yijizsscwkvepljqojkz.supabase.co/storage/v1/object/public/creator-videos/homepage/hero-video-2.mp4',
    posterUrl:
      'https://yijizsscwkvepljqojkz.supabase.co/storage/v1/object/public/creator-videos/homepage/hero-video-2-poster.webp',
    creatorName: 'Frantzdy Pierrot',
    category: 'Esp\u00f2',
  },
  {
    id: 'hero-3',
    videoUrl:
      'https://yijizsscwkvepljqojkz.supabase.co/storage/v1/object/public/creator-videos/homepage/hero-video-3.mp4',
    posterUrl:
      'https://yijizsscwkvepljqojkz.supabase.co/storage/v1/object/public/creator-videos/homepage/hero-video-3-poster.webp',
    creatorName: 'Johnny Placide',
    category: 'Esp\u00f2',
  },
] as const

const HERO_CARD_TRANSFORMS = [
  { rotation: -8, x: -140, y: 15, z: 1 },
  { rotation: 0, x: 0, y: 0, z: 2 },
  { rotation: 8, x: 140, y: 15, z: 3 },
] as const

function HeroVideoCards() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([null, null, null])

  const handleMouseEnter = useCallback((index: number) => {
    setHoveredIndex(index)
    const video = videoRefs.current[index]
    if (video) {
      video.play().catch(() => {})
    }
  }, [])

  const handleMouseLeave = useCallback(() => {
    setHoveredIndex(null)
    videoRefs.current.forEach((video) => {
      if (video) {
        video.pause()
        video.currentTime = 0
      }
    })
  }, [])

  return (
    <div
      className="relative flex items-center justify-center"
      style={{ minHeight: '600px', perspective: '1200px' }}
    >
      {HERO_VIDEOS.map((video, i) => {
        const transform = HERO_CARD_TRANSFORMS[i]
        const isHovered = hoveredIndex === i

        return (
          <div
            key={video.id}
            className="absolute"
            style={{
              top: '50%',
              left: '50%',
              zIndex: isHovered ? 10 : transform.z,
              transform: isHovered
                ? `translate(-50%, -50%) translateX(${transform.x}px) translateY(-10px) rotate(0deg)`
                : `translate(-50%, -50%) translateX(${transform.x}px) translateY(${transform.y}px) rotate(${transform.rotation}deg)`,
              transition: 'transform 400ms cubic-bezier(0.4, 0, 0.2, 1)',
            }}
            onMouseEnter={() => handleMouseEnter(i)}
            onMouseLeave={handleMouseLeave}
          >
            <div
              className="hero-video-card relative overflow-hidden shadow-2xl cursor-pointer opacity-0"
              style={{
                width: '280px',
                borderRadius: '2rem',
                aspectRatio: '9 / 16',
                transform: isHovered ? 'scale(1.12)' : undefined,
                transition: 'all 400ms cubic-bezier(0.4, 0, 0.2, 1)',
              }}
            >
              <img
                src={video.posterUrl}
                alt=""
                aria-hidden="true"
                className="absolute object-cover"
                style={{ inset: '-2px', width: 'calc(100% + 4px)', height: 'calc(100% + 4px)' }}
              />
              <video
                ref={(el) => { videoRefs.current[i] = el }}
                src={video.videoUrl}
                poster={video.posterUrl}
                muted
                loop
                playsInline
                preload="metadata"
                className="absolute object-cover"
                style={{ inset: '-2px', width: 'calc(100% + 4px)', height: 'calc(100% + 4px)' }}
              />

              <div
                className="absolute bottom-0 left-0 right-0 p-4 pointer-events-none"
                style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 100%)' }}
              >
                <span
                  className="inline-flex items-center gap-1 mb-1.5 px-2 py-0.5 rounded-full"
                  style={{
                    fontSize: '9px',
                    fontWeight: 700,
                    background: 'linear-gradient(135deg, #F59E0B, #EAB308)',
                    color: '#1a1a1a',
                    letterSpacing: '0.04em',
                    boxShadow: '0 1px 4px rgba(0,0,0,0.25)',
                  }}
                >
                  <span aria-hidden="true" style={{ fontSize: '10px' }}>&#9917;</span>
                  WC 2026
                </span>
                <p className="text-sm font-semibold text-white leading-tight">{video.creatorName}</p>
                <span
                  className="inline-block mt-1 text-[10px] font-semibold px-2 py-0.5 rounded-full"
                  style={{ background: 'linear-gradient(135deg, #9333EA, #EC4899)', color: '#fff' }}
                >
                  {video.category}
                </span>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

function HeroVideoCardsMobile() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([null, null, null])
  const [activeIndex, setActiveIndex] = useState(0)
  const [autoPlayEnabled, setAutoPlayEnabled] = useState(true)

  useEffect(() => {
    const conn = (navigator as unknown as { connection?: { downlink?: number } }).connection
    if (conn && typeof conn.downlink === 'number' && conn.downlink < 1.5) {
      setAutoPlayEnabled(false)
    }
  }, [])

  useEffect(() => {
    const container = scrollRef.current
    if (!container) return

    let rafId: number
    const handleScroll = () => {
      cancelAnimationFrame(rafId)
      rafId = requestAnimationFrame(() => {
        const cardWidth = 260
        const gap = 16
        const idx = Math.round(container.scrollLeft / (cardWidth + gap))
        setActiveIndex(Math.max(0, Math.min(idx, HERO_VIDEOS.length - 1)))
      })
    }

    container.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      container.removeEventListener('scroll', handleScroll)
      cancelAnimationFrame(rafId)
    }
  }, [])

  useEffect(() => {
    if (!autoPlayEnabled) return
    videoRefs.current.forEach((video, i) => {
      if (!video) return
      if (i === activeIndex) {
        video.play().catch(() => {})
      } else {
        video.pause()
        video.currentTime = 0
      }
    })
  }, [activeIndex, autoPlayEnabled])

  const handleCardTap = useCallback((index: number) => {
    if (autoPlayEnabled) return
    const video = videoRefs.current[index]
    if (!video) return
    if (video.paused) {
      video.play().catch(() => {})
    } else {
      video.pause()
    }
  }, [autoPlayEnabled])

  return (
    <>
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto scrollbar-hide"
        style={{
          scrollSnapType: 'x mandatory',
          WebkitOverflowScrolling: 'touch',
          padding: '0 calc((100vw - 260px) / 2)',
        }}
      >
        {HERO_VIDEOS.map((video, i) => (
          <div
            key={video.id}
            className="relative overflow-hidden shadow-2xl flex-shrink-0"
            style={{
              width: '260px',
              borderRadius: '2rem',
              aspectRatio: '9 / 16',
              scrollSnapAlign: 'center',
              transform: activeIndex === i ? 'scale(1)' : 'scale(0.85)',
              opacity: activeIndex === i ? 1 : 0.5,
              transition: 'transform 300ms ease, opacity 300ms ease',
            }}
            onClick={() => handleCardTap(i)}
          >
            <img
              src={video.posterUrl}
              alt=""
              aria-hidden="true"
              className="absolute object-cover"
              style={{ inset: '-2px', width: 'calc(100% + 4px)', height: 'calc(100% + 4px)' }}
            />
            <video
              ref={(el) => { videoRefs.current[i] = el }}
              src={video.videoUrl}
              poster={video.posterUrl}
              muted
              loop
              playsInline
              preload={activeIndex === i ? 'auto' : 'metadata'}
              className="absolute object-cover"
              style={{ inset: '-2px', width: 'calc(100% + 4px)', height: 'calc(100% + 4px)' }}
            />

            <div
              className="absolute bottom-0 left-0 right-0 p-4 pointer-events-none"
              style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 100%)' }}
            >
              <span
                className="inline-flex items-center gap-1 mb-1.5 px-2 py-0.5 rounded-full"
                style={{
                  fontSize: '9px',
                  fontWeight: 700,
                  background: 'linear-gradient(135deg, #F59E0B, #EAB308)',
                  color: '#1a1a1a',
                  letterSpacing: '0.04em',
                  boxShadow: '0 1px 4px rgba(0,0,0,0.25)',
                }}
              >
                <span aria-hidden="true" style={{ fontSize: '10px' }}>&#9917;</span>
                WC 2026
              </span>
              <p className="text-sm font-semibold text-white leading-tight">{video.creatorName}</p>
              <span
                className="inline-block mt-1 font-semibold px-2 py-0.5 rounded-full"
                style={{ fontSize: '10px', background: 'linear-gradient(135deg, #9333EA, #EC4899)', color: '#fff' }}
              >
                {video.category}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center gap-2 mt-4">
        {HERO_VIDEOS.map((_, i) => (
          <div
            key={i}
            style={{
              width: activeIndex === i ? '24px' : '8px',
              height: '8px',
              borderRadius: '4px',
              background: activeIndex === i
                ? 'linear-gradient(135deg, #9333EA, #EC4899)'
                : 'rgba(147,51,234,0.2)',
              transition: 'all 300ms ease',
            }}
          />
        ))}
      </div>
    </>
  )
}

function MobileCreatorCarousel({ creators }: { creators?: FeaturedCreator[] }) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [activeIdx, setActiveIdx] = useState(0)

  const cards =
    creators && creators.length > 0
      ? creators.slice(0, 6).map((c) => ({
          name: c.name,
          category: c.category,
          image: c.coverImage || c.avatar,
          gradient: 'from-purple-200 to-pink-100',
        }))
      : STATIC_CREATORS.slice(0, 6).map((c) => ({
          name: c.name,
          category: c.category,
          image: c.avatar as string | undefined,
          gradient: c.imagePlaceholder,
        }))

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    const onScroll = () => {
      const scrollLeft = el.scrollLeft
      const cardWidth = 200 + 12
      const idx = Math.round(scrollLeft / cardWidth)
      setActiveIdx(Math.min(idx, cards.length - 1))
    }
    el.addEventListener('scroll', onScroll, { passive: true })
    return () => el.removeEventListener('scroll', onScroll)
  }, [cards.length])

  return (
    <div className="lg:hidden">
      <div
        ref={scrollRef}
        className="mosaic-cell-v2 opacity-0 overflow-x-auto scrollbar-hide flex gap-3 px-4"
        style={{
          scrollSnapType: 'x mandatory',
          maskImage:
            'linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)',
          WebkitMaskImage:
            'linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)',
        }}
      >
        {cards.map((card, i) => (
          <div
            key={`${card.name}-${i}`}
            className="w-[200px] flex-shrink-0 aspect-[3/4] rounded-2xl relative overflow-hidden snap-start"
            style={{ boxShadow: 'var(--rd-shadow-lg)' }}
          >
            {card.image ? (
              <Image src={card.image} alt={card.name} fill sizes="200px" className="object-cover" />
            ) : (
              <div className={`absolute inset-0 bg-gradient-to-br ${card.gradient}`} />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-3">
              <p className="text-sm font-semibold text-white">{card.name}</p>
              <p className="text-[11px] text-white/70">{card.category}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-center gap-2 mt-4" aria-hidden="true">
        {cards.map((_, i) => (
          <div
            key={i}
            className="w-2 h-2 rounded-full transition-all duration-300"
            style={{
              background:
                i === activeIdx
                  ? 'linear-gradient(135deg, #0038A8, #9333EA, #EC4899)'
                  : 'rgba(147, 51, 234, 0.2)',
              transform: i === activeIdx ? 'scale(1.3)' : 'scale(1)',
            }}
          />
        ))}
      </div>
    </div>
  )
}

function TrustRowV2({
  creators,
  trustJoin,
  trustFans,
  trustRating,
}: {
  creators?: FeaturedCreator[]
  trustJoin: string
  trustFans: string
  trustRating: string
}) {
  const avatarCreators = creators?.slice(0, 3)
  const hasRealAvatars = avatarCreators && avatarCreators.length > 0 && avatarCreators[0].avatar

  const firstNames = hasRealAvatars
    ? avatarCreators.map((c) => c.name.split(' ')[0])
    : ['Wyclef', 'Garcelle', 'Jimmy']

  return (
    <div className="flex items-center gap-3">
      <div className="flex -space-x-2">
        {hasRealAvatars
          ? avatarCreators.map((c) => (
              <Image
                key={c.id}
                src={c.avatar}
                alt={c.name}
                width={32}
                height={32}
                className="w-8 h-8 rounded-full ring-2 ring-white object-cover"
              />
            ))
          : ['bg-purple-200', 'bg-pink-200', 'bg-blue-200'].map((bg, i) => (
              <div key={i} className={`w-8 h-8 rounded-full ring-2 ring-white ${bg}`} />
            ))}
      </div>
      <div>
        <p className="text-sm font-medium" style={{ color: 'var(--rd-text)' }}>
          {trustJoin} {firstNames[0]}, {firstNames[1]} {trustFans}
        </p>
        <p className="text-xs flex items-center gap-1" style={{ color: 'var(--rd-text-muted)' }}>
          <span style={{ color: 'var(--rd-gold)' }}>&#9733;&#9733;&#9733;&#9733;&#9733;</span>
          {' '}{trustRating}
          <svg width="12" height="12" viewBox="0 0 16 16" fill="none" className="inline-block ml-0.5" aria-hidden="true">
            <circle cx="8" cy="8" r="8" fill="var(--rd-purple)" />
            <path d="M5 8.5L7 10.5L11 6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </p>
      </div>
    </div>
  )
}

function TestimonialBlock({ testimonials }: { testimonials: { quote: string; fan: string; creator: string; fanAvatar: string; creatorAvatar: string; fanGradient: string; creatorGradient: string }[] }) {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 mt-24 md:mt-36 text-center">
      <div
        className="font-serif select-none mt-[-1rem]"
        style={{ fontSize: '72px', color: 'var(--rd-gold)', opacity: 0.3, lineHeight: '0.6' }}
        aria-hidden="true"
      >
        &ldquo;
      </div>

      <div className="relative h-[280px] md:h-[240px]">
        {testimonials.map((item, i) => (
          <div
            key={item.fan}
            className="absolute inset-0 flex flex-col items-center justify-start"
            style={{ animation: 'quoteRotate 12s ease-in-out infinite', animationDelay: `${i * 4}s`, opacity: 0 }}
          >
            <blockquote>
              <p className="text-2xl md:text-3xl font-semibold max-w-3xl mx-auto" style={{ color: 'var(--rd-text)' }}>
                {item.quote}
              </p>
            </blockquote>

            <div className="flex items-center justify-center gap-3 mt-8">
              {item.fanAvatar ? (
                <Image src={item.fanAvatar} alt={item.fan} width={56} height={56} className="w-14 h-14 rounded-full object-cover" />
              ) : (
                <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${item.fanGradient}`} />
              )}
              <svg width="20" height="18" viewBox="0 0 20 18" fill="none" aria-hidden="true">
                <path d="M10 17L8.55 15.7C3.4 11.12 0 8.1 0 4.5C0 1.42 2.42 0 5 0C6.74 0 8.41 0.81 10 2.08C11.59 0.81 13.26 0 15 0C17.58 0 20 1.42 20 4.5C20 8.1 16.6 11.12 11.45 15.7L10 17Z" fill="var(--rd-red)" />
              </svg>
              {item.creatorAvatar ? (
                <Image src={item.creatorAvatar} alt={item.creator} width={56} height={56} className="w-14 h-14 rounded-full object-cover" />
              ) : (
                <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${item.creatorGradient}`} />
              )}
            </div>

            <p className="mt-4" style={{ color: 'var(--rd-text)' }}>
              <span className="font-semibold">{item.fan}</span>
              <span className="font-normal ml-2" style={{ color: 'var(--rd-text-muted)' }}>&rarr; {item.creator}</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ---------------------------------------------------------------
   CTA Signup Section
   --------------------------------------------------------------- */

function CTASignupSection() {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'submitting'>('idle')
  const [focusedField, setFocusedField] = useState<string | null>(null)
  const sectionRef = useRef<HTMLDivElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!cardRef.current) return
    const card = cardRef.current
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (mq.matches) {
      card.style.opacity = '1'
      card.style.transform = 'none'
      return
    }
    card.style.opacity = '0'
    card.style.transform = 'translateY(32px) scale(0.96)'
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          requestAnimationFrame(() => {
            card.style.transition = 'opacity 0.7s cubic-bezier(0.16,1,0.3,1), transform 0.7s cubic-bezier(0.16,1,0.3,1)'
            card.style.opacity = '1'
            card.style.transform = 'translateY(0) scale(1)'
          })
          observer.disconnect()
        }
      },
      { threshold: 0.15 }
    )
    observer.observe(card)
    return () => observer.disconnect()
  }, [])

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault()
      if (!email || !firstName || status === 'submitting') return
      setStatus('submitting')
      // Demo no-op -- just reset after delay
      setTimeout(() => setStatus('idle'), 1500)
    },
    [email, firstName, status]
  )

  const glassInputStyle = (field: string): React.CSSProperties => ({
    width: '100%',
    padding: '14px 16px 14px 42px',
    borderRadius: '12px',
    border: `1px solid ${focusedField === field ? 'rgba(255,255,255,0.35)' : 'rgba(255,255,255,0.12)'}`,
    background: 'rgba(255, 255, 255, 0.1)',
    color: 'white',
    fontSize: '0.95rem',
    fontFamily: 'inherit',
    outline: 'none',
    transition: 'border-color 0.2s, box-shadow 0.2s',
    boxShadow: focusedField === field ? '0 0 0 3px rgba(255,255,255,0.07)' : 'none',
    opacity: status === 'submitting' ? 0.6 : 1,
  })

  const iconStyle: React.CSSProperties = {
    position: 'absolute',
    left: '14px',
    top: '50%',
    transform: 'translateY(-50%)',
    width: '18px',
    height: '18px',
    color: 'rgba(255,255,255,0.4)',
    pointerEvents: 'none',
  }

  const canSubmit = firstName.trim() && email.trim() && status !== 'submitting'

  return (
    <>
      <style>{`
        @keyframes ctaFloat1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(12px, -18px) scale(1.05); }
          66% { transform: translate(-8px, 10px) scale(0.97); }
        }
        @keyframes ctaFloat2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          40% { transform: translate(-14px, 14px) scale(1.04); }
          70% { transform: translate(10px, -12px) scale(0.96); }
        }
        @keyframes ctaFloat3 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(16px, 10px) scale(1.03); }
        }
        @keyframes ctaPulse {
          0%, 100% { opacity: 0.25; }
          50% { opacity: 0.4; }
        }
        @keyframes ctaSpin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @media (prefers-reduced-motion: reduce) {
          .cta-orb { animation: none !important; }
        }
        .cta-glass-input::placeholder { color: rgba(255,255,255,0.4); }
        .cta-glass-input:focus::placeholder { color: rgba(255,255,255,0.3); }
        @media (max-width: 520px) {
          .cta-form-row { flex-direction: column !important; }
          .cta-form-row > * { flex: 1 1 auto !important; width: 100% !important; min-width: 0 !important; }
          .cta-submit-btn { width: 100% !important; }
        }
      `}</style>

      <div
        ref={sectionRef}
        className="text-center"
        style={{
          background: 'linear-gradient(135deg, #0038A8, #9333EA, #EC4899)',
          paddingTop: '96px',
          paddingBottom: '0',
          position: 'relative',
          overflow: 'hidden',
        }}
        aria-label="Sign up section"
      >
        {/* Floating atmospheric orbs */}
        <div className="cta-orb" aria-hidden="true" style={{ position: 'absolute', top: '10%', left: '8%', width: '220px', height: '220px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(147,51,234,0.5) 0%, transparent 70%)', filter: 'blur(60px)', animation: 'ctaFloat1 7s ease-in-out infinite, ctaPulse 5s ease-in-out infinite', pointerEvents: 'none' }} />
        <div className="cta-orb" aria-hidden="true" style={{ position: 'absolute', bottom: '15%', right: '5%', width: '180px', height: '180px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(236,72,153,0.5) 0%, transparent 70%)', filter: 'blur(55px)', animation: 'ctaFloat2 8s ease-in-out infinite 1s, ctaPulse 6s ease-in-out infinite 2s', pointerEvents: 'none' }} />
        <div className="cta-orb" aria-hidden="true" style={{ position: 'absolute', top: '40%', right: '20%', width: '160px', height: '160px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,56,168,0.45) 0%, transparent 70%)', filter: 'blur(50px)', animation: 'ctaFloat3 6.5s ease-in-out infinite 0.5s, ctaPulse 7s ease-in-out infinite 1s', pointerEvents: 'none' }} />

        <div style={{ maxWidth: '780px', margin: '0 auto', padding: '0 20px 96px', position: 'relative', zIndex: 1 }}>
          <h2 className="text-white font-extrabold" style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', letterSpacing: '-0.03em', lineHeight: 1.1, margin: 0 }}>
            {t('homepage.cta.headline')}
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '1.125rem', marginTop: '16px', lineHeight: 1.5 }}>
            {t('homepage.cta.subheadline')}
          </p>

          <div
            ref={cardRef}
            style={{
              marginTop: '40px',
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(24px) saturate(1.2)',
              WebkitBackdropFilter: 'blur(24px) saturate(1.2)',
              border: '1px solid rgba(255, 255, 255, 0.18)',
              borderRadius: '20px',
              padding: '40px 36px',
              boxShadow: '0 12px 40px rgba(0, 0, 0, 0.2), 0 2px 8px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255, 255, 255, 0.15)',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div aria-hidden="true" style={{ position: 'absolute', top: 0, left: '10%', right: '10%', height: '1px', background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent)', pointerEvents: 'none' }} />

            <form onSubmit={handleSubmit} aria-label="Sign up form" style={{ display: 'flex', flexDirection: 'column', gap: '14px', alignItems: 'center' }}>
              <div className="cta-form-row" style={{ display: 'flex', gap: '10px', width: '100%', maxWidth: '520px', flexDirection: 'row' }}>
                <div style={{ position: 'relative', flex: '1 1 0%', minWidth: 0 }}>
                  <label htmlFor="cta-first-name" className="sr-only">First name</label>
                  <User aria-hidden="true" style={iconStyle} />
                  <input id="cta-first-name" type="text" required placeholder={t('homepage.cta.firstNamePlaceholder')} value={firstName} onChange={(e) => setFirstName(e.target.value)} onFocus={() => setFocusedField('firstName')} onBlur={() => setFocusedField(null)} disabled={status === 'submitting'} autoComplete="given-name" className="cta-glass-input" style={glassInputStyle('firstName')} />
                </div>
                <div style={{ position: 'relative', flex: '1 1 0%', minWidth: 0 }}>
                  <label htmlFor="cta-last-name" className="sr-only">Last name</label>
                  <User aria-hidden="true" style={iconStyle} />
                  <input id="cta-last-name" type="text" placeholder={t('homepage.cta.lastNamePlaceholder')} value={lastName} onChange={(e) => setLastName(e.target.value)} onFocus={() => setFocusedField('lastName')} onBlur={() => setFocusedField(null)} disabled={status === 'submitting'} autoComplete="family-name" className="cta-glass-input" style={glassInputStyle('lastName')} />
                </div>
              </div>

              <div className="cta-form-row" style={{ display: 'flex', gap: '10px', width: '100%', maxWidth: '520px', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
                <div style={{ position: 'relative', flex: '1 1 240px', minWidth: '0' }}>
                  <label htmlFor="cta-email" className="sr-only">Email address</label>
                  <Mail aria-hidden="true" style={iconStyle} />
                  <input id="cta-email" type="email" required placeholder={t('homepage.cta.emailPlaceholder')} value={email} onChange={(e) => setEmail(e.target.value)} onFocus={() => setFocusedField('email')} onBlur={() => setFocusedField(null)} disabled={status === 'submitting'} autoComplete="email" className="cta-glass-input" style={glassInputStyle('email')} />
                </div>

                <button
                  type="submit"
                  disabled={!canSubmit}
                  className="group cta-submit-btn"
                  style={{
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                    padding: '14px 28px', borderRadius: '12px', border: 'none', background: 'white', color: '#7C3AED',
                    fontSize: '0.95rem', fontWeight: 600, fontFamily: 'inherit',
                    cursor: !canSubmit ? 'not-allowed' : 'pointer',
                    transition: 'transform 0.2s cubic-bezier(0.16,1,0.3,1), box-shadow 0.2s, background 0.2s',
                    opacity: !canSubmit ? 0.7 : 1, whiteSpace: 'nowrap', flex: '0 0 auto', outline: 'none',
                    boxShadow: '0 2px 12px rgba(124, 58, 237, 0.2)',
                  }}
                  onMouseEnter={(e) => { if (canSubmit) { e.currentTarget.style.transform = 'scale(1.03)'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(255,255,255,0.25)' } }}
                  onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = 'none' }}
                  onMouseDown={(e) => { if (canSubmit) { e.currentTarget.style.transform = 'scale(0.97)' } }}
                  onMouseUp={(e) => { if (canSubmit) { e.currentTarget.style.transform = 'scale(1.03)' } }}
                  onFocus={(e) => { e.currentTarget.style.boxShadow = '0 0 0 3px rgba(255,255,255,0.3)' }}
                  onBlur={(e) => { e.currentTarget.style.boxShadow = 'none' }}
                >
                  {status === 'submitting' ? (
                    <>
                      <span style={{ width: '18px', height: '18px', border: '2px solid rgba(124,58,237,0.25)', borderTopColor: '#7C3AED', borderRadius: '50%', display: 'inline-block', animation: 'ctaSpin 0.6s linear infinite' }} />
                      <span>{t('homepage.cta.submittingButton')}</span>
                    </>
                  ) : (
                    <>
                      <span>{t('homepage.cta.submitButton')}</span>
                      <ArrowRight className="transition-transform group-hover:translate-x-1" style={{ width: '18px', height: '18px' }} />
                    </>
                  )}
                </button>
              </div>

              <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.8rem', marginTop: '8px', letterSpacing: '0.01em' }}>
                {t('homepage.cta.noSpam')}
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

/* ---------------------------------------------------------------
   Main page component
   --------------------------------------------------------------- */

export function AnnPaleClient({ creators }: AnnPaleClientProps) {
  const heroRef = useRef<HTMLElement>(null)
  const stepsRef = useRef<HTMLDivElement>(null)
  const [heroVisible, setHeroVisible] = useState(true)
  const [isIframe, setIsIframe] = useState(false)
  const [howItWorksOpen, setHowItWorksOpen] = useState(false)

  useLayoutEffect(() => {
    if (typeof window !== 'undefined' && window.self !== window.top) {
      setIsIframe(true)
    }
  }, [])

  const OVERLINE_PHRASES = useMemo(() => [
    t('homepage.overlines.phrase1'),
    t('homepage.overlines.phrase2'),
    t('homepage.overlines.phrase3'),
    t('homepage.overlines.phrase4'),
  ], [])

  const STEPS = useMemo(() => [
    { number: '01', action: t('homepage.steps.step1Action'), description: t('homepage.steps.step1Desc'), icon: Search },
    { number: '02', action: t('homepage.steps.step2Action'), description: t('homepage.steps.step2Desc'), icon: PenLine },
    { number: '03', action: t('homepage.steps.step3Action'), description: t('homepage.steps.step3Desc'), icon: Video },
  ], [])

  const TESTIMONIALS = useMemo(() => [
    { quote: t('homepage.testimonials.quote1'), fan: 'Marie Jean-Baptiste', creator: 'Wyclef Jean', fanAvatar: '/demo/annpale/creators/fan-1.jpg', creatorAvatar: '/demo/annpale/creators/wyclef-jean.jpg', fanGradient: 'from-pink-100 to-purple-100', creatorGradient: 'from-purple-200 to-blue-100' },
    { quote: t('homepage.testimonials.quote2'), fan: 'Jean-Pierre Duval', creator: 'Rutshelle Guillaume', fanAvatar: '/demo/annpale/creators/fan-2.jpg', creatorAvatar: '/demo/annpale/creators/rutshelle-guillaume.jpg', fanGradient: 'from-blue-100 to-purple-100', creatorGradient: 'from-pink-100 to-purple-100' },
    { quote: t('homepage.testimonials.quote3'), fan: 'Sophie Laurent', creator: 'Carel Pedre', fanAvatar: '/demo/annpale/creators/fan-3.jpg', creatorAvatar: '/demo/annpale/creators/carel-pedre.jpg', fanGradient: 'from-purple-100 to-pink-100', creatorGradient: 'from-blue-50 to-purple-100' },
  ], [])

  const CATEGORIES = useMemo(() => [
    t('homepage.creators.categories.all'),
    t('homepage.creators.categories.music'),
    t('homepage.creators.categories.comedy'),
    t('homepage.creators.categories.sports'),
    t('homepage.creators.categories.acting'),
    t('homepage.creators.categories.politics'),
  ], [])

  const creatorCards = creators.length > 0
    ? creators.map((creator, i) => ({
        id: creator.id as string | null,
        name: creator.name,
        category: creator.category,
        price: `$${creator.price}`,
        verified: creator.verified,
        image: creator.coverImage || creator.avatar,
        featured: i === 0,
        imagePlaceholder: STATIC_CREATORS[i % STATIC_CREATORS.length].imagePlaceholder,
      }))
    : STATIC_CREATORS.map((creator, i) => ({
        id: null as string | null,
        name: creator.name,
        category: creator.category,
        price: creator.price,
        verified: creator.verified,
        image: creator.avatar as string | undefined,
        featured: i === 0,
        imagePlaceholder: creator.imagePlaceholder,
      }))

  /* Hero on-mount animation + scroll-triggered sections */
  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia()

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

        tl.fromTo('.hero-overline-v2', { opacity: 0 }, { opacity: 1, duration: 0.3 })
          .fromTo('.hero-word', { opacity: 0, y: 30 }, { opacity: 1, y: 0, stagger: 0.04, duration: 0.5 }, '-=0.1')
          .fromTo('.hero-creole-sub', { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.4 }, '-=0.2')
          .fromTo('.hero-fade', { opacity: 0, y: 20 }, { opacity: 1, y: 0, stagger: 0.12, duration: 0.5 }, '-=0.2')
          .fromTo(
            '.hero-video-card',
            { scale: 0.8, opacity: 0, rotateY: 30 },
            {
              scale: 1, opacity: 1, rotateY: 0,
              stagger: 0.1, duration: 0.6, ease: 'back.out(1.2)',
              onComplete: () => {
                document.querySelectorAll('.hero-video-card').forEach(el => el.classList.remove('opacity-0'))
              },
            },
            '-=0.5',
          )

        if (document.querySelector('.mosaic-cell-v2')) {
          tl.fromTo('.mosaic-cell-v2', { scale: 0.95, opacity: 0 }, { scale: 1, opacity: 1, stagger: 0.06, duration: 0.5 }, '-=0.6')
        }

        if (stepsRef.current) {
          const items = stepsRef.current.querySelectorAll('.step-item')
          gsap.fromTo(
            items,
            { opacity: 0, y: 40 },
            {
              opacity: 1, y: 0, duration: 0.6, stagger: 0.15, ease: 'power3.out',
              scrollTrigger: { trigger: stepsRef.current, start: 'top 80%', once: true },
            },
          )
        }
      })

      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set('.hero-word, .hero-fade, .hero-creole-sub, .hero-overline-v2, .hero-video-card, .mosaic-cell-v2', { opacity: 1, y: 0, scale: 1 })
        document.querySelectorAll('.hero-video-card').forEach(el => el.classList.remove('opacity-0'))
        if (stepsRef.current) {
          gsap.set(stepsRef.current.querySelectorAll('.step-item'), { opacity: 1, y: 0 })
        }
      })
    })

    return () => ctx.revert()
  }, [])

  useEffect(() => {
    const el = heroRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => setHeroVisible(entry.isIntersecting),
      { threshold: 0.05, rootMargin: '-80px 0px 0px 0px' }
    )
    const raf = requestAnimationFrame(() => observer.observe(el))
    return () => {
      cancelAnimationFrame(raf)
      observer.disconnect()
    }
  }, [])

  return (
    <>
      <style>
        {`
    .rd-hero-content-wrap { padding-top: 2rem; }
    @media (min-width: 768px) { .rd-hero-content-wrap { padding-top: 2.5rem; } }
    @media (min-width: 1024px) {
      .rd-hero-content-wrap { padding-top: 3rem; }
      .rd-hero-grid-v2 { grid-template-columns: 45% 55%; }
    }
  `}
      </style>

      <main>
        {/* World Cup Header Banner */}
        <section style={{ position: 'sticky', top: 0, zIndex: 35 }} aria-label="World Cup countdown header">
          <WorldCupHeaderBanner compact={!heroVisible} isIframe={isIframe} onMoreInfo={() => setHowItWorksOpen(true)} />
        </section>

        {/* HERO */}
        <section ref={heroRef} className="relative" style={{ backgroundColor: 'var(--rd-bg)' }} aria-label="Hero">
          <div className="absolute inset-0 pointer-events-none" aria-hidden="true" style={{ background: 'radial-gradient(ellipse 50% 50% at 75% 25%, rgba(147,51,234,0.10), transparent 70%)' }} />
          <div className="absolute inset-0 pointer-events-none" aria-hidden="true" style={{ background: 'radial-gradient(ellipse 40% 40% at 20% 70%, rgba(236,72,153,0.06), transparent 60%)' }} />
          <div className="absolute inset-0 pointer-events-none" aria-hidden="true" style={{ background: 'radial-gradient(ellipse 30% 30% at 50% 0%, rgba(0,56,168,0.04), transparent 50%)' }} />

          <div className="rd-hero-content-wrap relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-12">
            <div className="rd-hero-grid-v2 grid grid-cols-1 gap-12 lg:gap-8 items-center">
              <div className="space-y-5">
                <RotatingOverline phrases={OVERLINE_PHRASES} />
                <HeroHeadlineV2 words={t('homepage.hero.headline').split(' ')} accentWord={t('homepage.hero.accentWord')} />
                <p className="hero-creole-sub opacity-0 text-xl font-medium italic" style={{ color: 'var(--rd-text-muted)' }}>
                  {t('homepage.hero.subtitle')}
                </p>
                <p className="hero-fade text-lg md:text-xl font-normal max-w-lg opacity-0" style={{ color: 'var(--rd-text-muted)' }}>
                  {t('homepage.hero.description')}
                </p>

                <div className="hero-fade opacity-0 flex items-center gap-2">
                  <span className="text-base" aria-hidden="true">&#x1F1ED;&#x1F1F9;</span>
                  <p className="text-sm font-medium" style={{ color: 'var(--rd-text-muted)' }}>
                    {t('homepage.hero.worldCupPrefix')}{' '}
                    <span style={{ color: 'var(--rd-gold)' }} className="font-semibold">{t('homepage.hero.worldCupHighlight')}</span>{' '}
                    {t('homepage.hero.worldCupSuffix')}
                  </p>
                </div>

                <div className="hero-fade opacity-0 flex flex-col sm:flex-row gap-3">
                  <button type="button" className="group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold text-white text-base transition-all duration-200 hover:scale-[1.02] hover:shadow-lg hover:shadow-purple-500/25" style={{ background: 'linear-gradient(135deg, #0038A8, #9333EA, #EC4899)' }}>
                    {t('homepage.hero.primaryCTA')}
                    <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </button>
                  <button type="button" className="group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold text-base transition-all duration-200 border-2 hover:border-purple-400" style={{ color: 'var(--rd-text)', borderColor: 'rgba(147,51,234,0.25)' }} onClick={() => setHowItWorksOpen(true)}>
                    <Play className="w-4 h-4" />
                    {t('homepage.hero.secondaryCTA')}
                  </button>
                </div>

                <div className="hero-fade opacity-0">
                  <TrustRowV2
                    creators={creators}
                    trustJoin={t('homepage.hero.trustJoin')}
                    trustFans={t('homepage.hero.trustFans')}
                    trustRating={t('homepage.hero.trustRating')}
                  />
                </div>
              </div>

              <div className="hidden lg:block">
                <HeroVideoCards />
              </div>
              <div className="lg:hidden py-8 hero-video-card opacity-0">
                <HeroVideoCardsMobile />
              </div>
            </div>
          </div>
        </section>

        {/* CREATORS */}
        <section className="pt-16 md:pt-24 pb-24 md:pb-36" style={{ backgroundColor: 'var(--rd-bg-dark)' }} aria-label="Featured creators">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeading title={t('homepage.creators.heading')} subtitle="" overline={t('homepage.creators.overline')} dark />

            <div className="mt-10 overflow-x-auto scrollbar-hide" style={{ maskImage: 'linear-gradient(to right, transparent 0%, black 2%, black 98%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 2%, black 98%, transparent 100%)' }}>
              <div className="flex gap-3 pb-2">
                {CATEGORIES.map((cat, i) => (
                  <button
                    key={`cat-${i}`}
                    type="button"
                    className="flex-shrink-0 px-5 py-2 rounded-full text-sm font-medium transition-all"
                    style={{
                      background: i === 0 ? 'linear-gradient(135deg, #0038A8, #9333EA, #EC4899)' : undefined,
                      backgroundColor: i === 0 ? undefined : 'var(--rd-bg-dark-card)',
                      color: i === 0 ? '#fff' : 'var(--rd-text-light)',
                    }}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="group/gallery relative mt-8">
            <CreatorGallery>
              {creatorCards.map((creator) => (
                <CreatorGalleryItem key={creator.name}>
                  <CreatorSpotlightCard
                    name={creator.name}
                    category={creator.category}
                    price={creator.price}
                    verified={creator.verified}
                    imagePlaceholder={creator.imagePlaceholder}
                    image={creator.image}
                    featured={creator.featured}
                  />
                </CreatorGalleryItem>
              ))}
            </CreatorGallery>

            <button className="hidden lg:flex absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/90 backdrop-blur shadow-md items-center justify-center opacity-0 group-hover/gallery:opacity-100 transition-opacity" type="button" aria-label="Scroll left">
              <ChevronLeft className="w-5 h-5 text-gray-700" />
            </button>
            <button className="hidden lg:flex absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/90 backdrop-blur shadow-md items-center justify-center opacity-0 group-hover/gallery:opacity-100 transition-opacity" type="button" aria-label="Scroll right">
              <ChevronRight className="w-5 h-5 text-gray-700" />
            </button>
          </div>

          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-10 flex justify-end">
            <a href="#" className="inline-flex items-center gap-1.5 text-sm font-medium transition-colors hover:underline" style={{ color: 'var(--rd-text-light)' }}>
              {t('homepage.creators.seeAll')}
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-center gap-4 mt-12">
            <div className="flex -space-x-3">
              {creators.length === 0 && (
                <>
                  <div className="w-10 h-10 rounded-full ring-2 ring-white/20 bg-purple-200" />
                  <div className="w-10 h-10 rounded-full ring-2 ring-white/20 bg-pink-200" />
                  <div className="w-10 h-10 rounded-full ring-2 ring-white/20 bg-blue-200" />
                </>
              )}
            </div>
            <p className="text-sm text-white/80 text-center sm:text-left">
              <span className="font-semibold text-white">
                {creators.length > 0 ? creators[0].name : 'Wyclef Jean'}
              </span>
              {' '}{t('homepage.creators.endorsement')}{' '}
              <span className="font-semibold" style={{ color: 'var(--rd-gold)' }}>
                {t('homepage.creators.teamName')}
              </span>
            </p>
          </div>

          <WorldCupBanner transparent />
        </section>

        {/* HOW IT WORKS */}
        <section className="pt-24 md:pt-36 pb-12 md:pb-16" style={{ backgroundColor: 'var(--rd-bg)' }} aria-label="How it works">
          <div ref={stepsRef} className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-0 text-center">
              {STEPS.map((step, i) => (
                <div key={step.number} className="step-item opacity-0 relative flex flex-col items-center">
                  {i > 0 && (
                    <div className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 w-px h-24" style={{ backgroundColor: 'hsl(270, 5%, 85%)' }} />
                  )}
                  <div className="mb-2 flex items-center justify-center rounded-full" style={{ width: 56, height: 56, background: 'linear-gradient(135deg, rgba(147, 51, 234, 0.1), rgba(236, 72, 153, 0.1))' }}>
                    <step.icon size={28} style={{ color: '#9333EA' }} strokeWidth={1.8} />
                  </div>
                  <span className="font-extrabold" style={{ fontSize: 'clamp(80px, 10vw, 96px)', lineHeight: '1', background: 'linear-gradient(135deg, #0038A8, #9333EA, #EC4899)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                    {step.number}
                  </span>
                  <p className="text-xl md:text-2xl font-bold mt-2" style={{ color: 'var(--rd-text)' }}>{step.action}</p>
                  <p className="text-base mt-3 max-w-xs mx-auto" style={{ color: 'var(--rd-text-muted)' }}>{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section className="pt-12 md:pt-16 pb-24 md:pb-36" style={{ backgroundColor: 'var(--rd-bg)' }} aria-label="Testimonials">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-12">
            <SectionHeading title={t('homepage.testimonials.heading')} subtitle="" overline={t('homepage.testimonials.overline')} align="center" />
          </div>

          <FilmStrip />
          <TestimonialBlock testimonials={TESTIMONIALS} />

          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 my-16">
            <CulturalDivider animated />
          </div>
        </section>

        {/* CTA */}
        <CTASignupSection />
      </main>

      <HowItWorksModal open={howItWorksOpen} onOpenChange={setHowItWorksOpen} />
    </>
  )
}
