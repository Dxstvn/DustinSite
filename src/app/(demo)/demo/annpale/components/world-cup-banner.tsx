'use client'

import { useEffect, useState, useCallback } from 'react'

/**
 * WorldCupBanner -- full-bleed promotional section for Haiti's World Cup
 * campaign. Dark flag-inspired gradient background with glass countdown
 * pills, progress bar with percentage, and gradient CTA button.
 */

// World Cup 2026 opening match date - June 11, 2026
const WORLD_CUP_DATE = new Date('2026-06-11T00:00:00-04:00').getTime()

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

function calculateTimeLeft(): TimeLeft {
  const diff = WORLD_CUP_DATE - Date.now()
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 }
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((diff % (1000 * 60)) / 1000),
  }
}

function pad(n: number): string {
  return n.toString().padStart(2, '0')
}

function formatCurrency(amount: number): string {
  if (amount >= 1000) {
    const k = amount / 1000
    return `$${k % 1 === 0 ? k.toFixed(0) : k.toFixed(1)}K`
  }
  return `$${amount.toFixed(0)}`
}

export function WorldCupBanner({ transparent = false }: { transparent?: boolean }) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null)

  useEffect(() => {
    setTimeLeft(calculateTimeLeft())
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  // Static demo donation stats
  const raised = 18400
  const goal = 30000
  const pct = Math.min(Math.round((raised / goal) * 100), 100)

  return (
    <div
      className="overflow-hidden"
      style={transparent ? undefined : {
        background:
          'linear-gradient(135deg, #0038A8 0%, #0d1b3a 50%, #D21034 100%)',
      }}
    >
      {/* Metallic gold top border */}
      {!transparent && (
        <div
          className="h-1.5"
          style={{
            background:
              'linear-gradient(to right, #AA771C 0%, #BF953F 20%, #FCF6BA 45%, #F7EF8A 50%, #FCF6BA 55%, #BF953F 80%, #AA771C 100%)',
          }}
        />
      )}

      <div className={transparent ? 'py-8 md:py-10' : 'py-12 md:py-16'}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col gap-8 md:flex-row md:items-center md:gap-10">
          {/* Left: headline */}
          <div className="flex items-center gap-4 md:flex-1 min-w-0">
            <span className="text-2xl flex-shrink-0" role="img" aria-label="Haitian flag">
              <svg viewBox="0 0 36 24" className="w-10 h-7" aria-hidden="true">
                <rect width="36" height="12" fill="#0038A8" />
                <rect y="12" width="36" height="12" fill="#D21034" />
                <rect x="13" y="7" width="10" height="10" rx="1" fill="white" />
              </svg>
            </span>
            <h2 className="text-xl md:text-2xl font-bold text-white">
              Support Les Grenadiers at the World Cup 2026
            </h2>
          </div>

          {/* Center: live countdown + progress */}
          <div className="flex flex-col gap-3 md:flex-1">
            <div className="flex items-center gap-3">
              <div className="flex gap-2 text-sm font-mono font-semibold text-white">
                {timeLeft ? (
                  <>
                    <span className="bg-white/10 backdrop-blur-sm rounded-lg px-2.5 py-1.5">
                      {pad(timeLeft.days)}d
                    </span>
                    <span className="bg-white/10 backdrop-blur-sm rounded-lg px-2.5 py-1.5">
                      {pad(timeLeft.hours)}h
                    </span>
                    <span className="bg-white/10 backdrop-blur-sm rounded-lg px-2.5 py-1.5">
                      {pad(timeLeft.minutes)}m
                    </span>
                  </>
                ) : (
                  <>
                    <span className="bg-white/10 backdrop-blur-sm rounded-lg px-2.5 py-1.5">--d</span>
                    <span className="bg-white/10 backdrop-blur-sm rounded-lg px-2.5 py-1.5">--h</span>
                    <span className="bg-white/10 backdrop-blur-sm rounded-lg px-2.5 py-1.5">--m</span>
                  </>
                )}
              </div>
            </div>

            {/* Progress bar */}
            <div className="h-3 w-full rounded-full overflow-hidden" style={{ backgroundColor: 'rgba(255,255,255,0.15)' }}>
              <div
                className="h-full rounded-full"
                style={{
                  width: `${pct}%`,
                  background: 'linear-gradient(to right, #9333EA, #EC4899)',
                  transition: 'width 0.5s ease-out',
                }}
              />
            </div>
            <div className="flex justify-between items-center">
              <p className="text-sm" style={{ color: 'rgba(255,255,255,0.8)' }}>
                {formatCurrency(raised)} raised of {formatCurrency(goal)} goal
              </p>
              <p className="text-sm font-semibold" style={{ color: 'rgba(255,255,255,0.8)' }}>
                {pct}%
              </p>
            </div>
          </div>

          {/* Right: CTA */}
          <div className="flex-shrink-0">
            <button
              type="button"
              className="w-full md:w-auto px-8 py-3 rounded-full text-base font-bold text-white transition-all hover:scale-[1.02] hover:shadow-lg"
              style={{
                background: 'linear-gradient(135deg, #9333EA, #EC4899)',
              }}
            >
              Donate Now
            </button>
          </div>
        </div>
      </div>

      {/* Metallic gold bottom border */}
      {!transparent && (
        <div
          className="h-1.5"
          style={{
            background:
              'linear-gradient(to right, #AA771C 0%, #BF953F 20%, #FCF6BA 45%, #F7EF8A 50%, #FCF6BA 55%, #BF953F 80%, #AA771C 100%)',
          }}
        />
      )}
    </div>
  )
}
