'use client'

import React, { useEffect, useState, memo } from 'react'
import Image from 'next/image'

/* ---------------------------------------------------------------
   Constants
   --------------------------------------------------------------- */

// World Cup 2026 opening match date - June 11, 2026
const WORLD_CUP_DATE = new Date('2026-06-11T00:00:00-04:00').getTime()

/* ---------------------------------------------------------------
   Types
   --------------------------------------------------------------- */

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

/* ---------------------------------------------------------------
   Helpers
   --------------------------------------------------------------- */

function calculateTimeLeft(): TimeLeft {
  const now = Date.now()
  const diff = WORLD_CUP_DATE - now

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 }
  }

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((diff % (1000 * 60)) / 1000),
  }
}

/* ---------------------------------------------------------------
   DigitPair -- Two rounded digit boxes side by side with label
   --------------------------------------------------------------- */

const DigitPair = memo(function DigitPair({
  value,
  label,
}: {
  value: number
  label: string
}) {
  const digits = value.toString().padStart(2, '0')
  return (
    <div className="flex flex-col items-center" style={{ gap: '3px' }}>
      <div className="flex" style={{ gap: '2px' }}>
        {digits.split('').map((d, i) => (
          <span
            key={i}
            className="flex items-center justify-center font-mono font-bold text-white"
            style={{
              width: 'var(--digit-w)',
              height: 'var(--digit-h)',
              borderRadius: '5px',
              background: 'rgba(255,255,255,0.12)',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
              border: '1px solid rgba(255,255,255,0.1)',
              fontSize: 'var(--digit-font)',
              lineHeight: 1,
            }}
          >
            {d}
          </span>
        ))}
      </div>
      <span
        className="font-semibold uppercase tracking-wider"
        style={{ color: 'rgba(255,255,255,0.55)', fontSize: 'var(--label-font)' }}
      >
        {label}
      </span>
    </div>
  )
})

/* ---------------------------------------------------------------
   ColonSeparator
   --------------------------------------------------------------- */

function ColonSeparator({ className = '' }: { className?: string }) {
  return (
    <span
      className={`font-mono font-bold flex items-center justify-center ${className}`}
      style={{
        fontSize: 'var(--digit-font)',
        height: 'var(--digit-h)',
        color: 'rgba(255,255,255,0.4)',
        lineHeight: 1,
      }}
      aria-hidden="true"
    >
      :
    </span>
  )
}

/* ---------------------------------------------------------------
   CountdownTimer
   --------------------------------------------------------------- */

const CountdownTimer = memo(function CountdownTimer({
  timeLeft,
  ariaLabel,
}: {
  timeLeft: TimeLeft
  ariaLabel: string
}) {
  return (
    <div
      className="flex items-start"
      style={{ gap: 'var(--timer-gap)' }}
      role="timer"
      aria-label={ariaLabel}
      suppressHydrationWarning
    >
      <DigitPair value={timeLeft.days} label="Days" />
      <ColonSeparator />
      <DigitPair value={timeLeft.hours} label="Hrs" />
      <ColonSeparator />
      <DigitPair value={timeLeft.minutes} label="Min" />
      <ColonSeparator className="hidden sm:flex" />
      <div className="hidden sm:block">
        <DigitPair value={timeLeft.seconds} label="Sec" />
      </div>
    </div>
  )
})

/* ---------------------------------------------------------------
   WorldCupHeaderBanner
   --------------------------------------------------------------- */

export function WorldCupHeaderBanner({ compact = false, isIframe = false, onMoreInfo }: { compact?: boolean; isIframe?: boolean; onMoreInfo?: () => void }) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null)

  useEffect(() => {
    setTimeLeft(calculateTimeLeft())
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const sizeClass = compact ? 'wc-banner-compact' : 'wc-banner-large'

  return (
    <>
      <style>
        {`
          @property --banner-h { syntax: '<length>'; inherits: true; initial-value: 78px; }
          @property --digit-w { syntax: '<length>'; inherits: true; initial-value: 26px; }
          @property --digit-h { syntax: '<length>'; inherits: true; initial-value: 34px; }
          @property --digit-font { syntax: '<length>'; inherits: true; initial-value: 17px; }
          @property --label-font { syntax: '<length>'; inherits: true; initial-value: 8px; }
          @property --timer-gap { syntax: '<length>'; inherits: true; initial-value: 5px; }
          @property --crest-size { syntax: '<length>'; inherits: true; initial-value: 40px; }
          @property --team-font { syntax: '<length>'; inherits: true; initial-value: 14px; }
          @property --subtitle-font { syntax: '<length>'; inherits: true; initial-value: 11px; }
          @property --btn-font { syntax: '<length>'; inherits: true; initial-value: 13px; }
          @property --btn-px { syntax: '<length>'; inherits: true; initial-value: 14px; }
          @property --btn-py { syntax: '<length>'; inherits: true; initial-value: 7px; }
          @property --btn-h { syntax: '<length>'; inherits: true; initial-value: 34px; }
          @property --btn2-px { syntax: '<length>'; inherits: true; initial-value: 18px; }
          @property --btn2-h { syntax: '<length>'; inherits: true; initial-value: 38px; }

          .wc-banner-compact {
            --digit-w: 22px;
            --digit-h: 28px;
            --digit-font: 14px;
            --label-font: 7px;
            --timer-gap: 4px;
            --banner-h: 64px;
            --crest-size: 32px;
            --team-font: 12px;
            --subtitle-font: 10px;
            --btn-font: 12px;
            --btn-px: 12px;
            --btn-py: 6px;
            --btn-h: 30px;
            --btn2-px: 16px;
            --btn2-h: 34px;
          }
          @media (min-width: 480px) {
            .wc-banner-compact {
              --digit-w: 26px;
              --digit-h: 34px;
              --digit-font: 16px;
              --label-font: 8px;
              --timer-gap: 6px;
              --banner-h: 74px;
              --crest-size: 38px;
              --btn-font: 13px;
              --btn-px: 20px;
              --btn-py: 8px;
              --btn-h: 34px;
            }
          }
          @media (min-width: 640px) {
            .wc-banner-compact {
              --digit-w: 28px;
              --digit-h: 36px;
              --digit-font: 18px;
              --label-font: 9px;
              --timer-gap: 10px;
              --banner-h: 84px;
              --crest-size: 44px;
              --btn-font: 14px;
              --btn-px: 20px;
              --btn-py: 8px;
              --btn-h: 36px;
              --btn2-px: 16px;
              --btn2-h: 36px;
            }
          }

          .wc-banner-large {
            --digit-w: 26px;
            --digit-h: 34px;
            --digit-font: 17px;
            --label-font: 8px;
            --timer-gap: 5px;
            --banner-h: 78px;
            --crest-size: 40px;
            --team-font: 14px;
            --subtitle-font: 11px;
            --btn-font: 13px;
            --btn-px: 14px;
            --btn-py: 7px;
            --btn-h: 34px;
            --btn2-px: 18px;
            --btn2-h: 38px;
          }
          @media (min-width: 480px) {
            .wc-banner-large {
              --digit-w: 44px;
              --digit-h: 58px;
              --digit-font: 27px;
              --label-font: 12px;
              --timer-gap: 10px;
              --banner-h: 126px;
              --crest-size: 65px;
              --team-font: 20px;
              --subtitle-font: 15px;
              --btn-font: 18px;
              --btn-px: 28px;
              --btn-py: 12px;
              --btn-h: 48px;
              --btn2-px: 28px;
              --btn2-h: 52px;
            }
          }
          @media (min-width: 640px) {
            .wc-banner-large {
              --digit-w: 48px;
              --digit-h: 61px;
              --digit-font: 31px;
              --label-font: 13px;
              --timer-gap: 17px;
              --banner-h: 143px;
              --crest-size: 75px;
              --team-font: 20px;
              --subtitle-font: 16px;
              --btn-font: 18px;
              --btn-px: 32px;
              --btn-py: 14px;
              --btn-h: 52px;
              --btn2-px: 28px;
              --btn2-h: 52px;
            }
          }
        `}
      </style>

      <div
        className={`${sizeClass} relative w-full overflow-hidden`}
        role="banner"
        aria-label="World Cup countdown"
        suppressHydrationWarning
        style={{
          zoom: isIframe ? 0.65 : undefined,
          transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        {/* Background */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(100deg, #001845 0%, #0d1b3a 35%, #150a28 65%, #1a0520 100%)',
          }}
        />

        {/* Subtle radial glows */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 40% 100% at 0% 50%, rgba(191,149,63,0.20) 0%, transparent 70%)',
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 40% 100% at 100% 50%, rgba(212,175,55,0.15) 0%, transparent 70%)',
          }}
        />

        {/* Top gold line */}
        <div
          className="absolute top-0 left-0 right-0 h-[2px]"
          style={{
            background:
              'linear-gradient(to right, #AA771C 0%, #BF953F 20%, #FCF6BA 45%, #F7EF8A 50%, #FCF6BA 55%, #BF953F 80%, #AA771C 100%)',
          }}
        />

        {/* Content */}
        <div
          className="relative container mx-auto flex items-center justify-between px-4"
          style={{ height: 'var(--banner-h)' }}
        >
          {/* Left: Haiti crest */}
          <div className="flex items-center flex-shrink-0 gap-2 sm:gap-3">
            <div
              className="relative flex-shrink-0 overflow-hidden rounded-full"
              style={{
                width: 'var(--crest-size)',
                height: 'var(--crest-size)',
              }}
            >
              <Image
                src="/demo/annpale/les-grenadiers-logo.png"
                alt="Les Grenadiers crest"
                width={88}
                height={88}
                className="object-contain"
                style={{
                  width: '100%',
                  height: '100%',
                  filter: 'drop-shadow(0 2px 8px rgba(0,56,168,0.4))',
                }}
              />
            </div>

            {/* Team name -- in iframe: show from sm+, otherwise lg+ only */}
            <div className="hidden lg:flex flex-col">
              <span
                className="font-bold uppercase tracking-wider text-white"
                style={{ letterSpacing: '0.1em', fontSize: 'var(--team-font)' }}
              >
                Les Grenadiers
              </span>
              <span
                className="font-medium"
                style={{ color: 'rgba(255,255,255,0.5)', fontSize: 'var(--subtitle-font)' }}
              >
                FIFA World Cup 2026
              </span>
            </div>
          </div>

          {/* Center: Countdown timer */}
          {timeLeft && (
            <CountdownTimer
              timeLeft={timeLeft}
              ariaLabel={`${timeLeft.days} days, ${timeLeft.hours} hours, ${timeLeft.minutes} minutes until World Cup`}
            />
          )}

          {/* Right: CTA buttons */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              type="button"
              className="rounded-full font-bold text-white hover:scale-[1.03] hover:shadow-lg flex items-center justify-center"
              style={{
                background: 'linear-gradient(135deg, #9333EA, #EC4899)',
                fontSize: 'var(--btn-font)',
                paddingLeft: 'var(--btn-px)',
                paddingRight: 'var(--btn-px)',
                paddingTop: 'var(--btn-py)',
                paddingBottom: 'var(--btn-py)',
                minHeight: 'var(--btn-h)',
                boxShadow: '0 4px 14px -2px rgba(147,51,234,0.35)',
                transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
              }}
            >
              <span className="hidden sm:inline">Donate Now</span>
              <span className="sm:hidden">Donate</span>
            </button>

            <button
              type="button"
              className="hidden sm:flex items-center rounded-full font-semibold text-white/90 hover:text-white hover:bg-white/10"
              style={{
                border: '1px solid rgba(255,255,255,0.2)',
                fontSize: 'var(--btn-font)',
                paddingLeft: 'var(--btn2-px)',
                paddingRight: 'var(--btn2-px)',
                minHeight: 'var(--btn2-h)',
                transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
              }}
              onClick={() => onMoreInfo?.()}
            >
              More Info
            </button>
          </div>
        </div>

        {/* Bottom accent line */}
        <div
          className="absolute bottom-0 left-0 right-0 h-[1px]"
          style={{
            background:
              'linear-gradient(to right, transparent, rgba(147,51,234,0.3), rgba(236,72,153,0.3), transparent)',
          }}
        />
      </div>
    </>
  )
}
