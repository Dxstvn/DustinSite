"use client"

import { useState, useCallback, useEffect } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { useMediaQuery } from "@/hooks/use-media-query"
import { STEP_ILLUSTRATIONS } from "./how-it-works-illustrations"

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface HowItWorksModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

// ---------------------------------------------------------------------------
// Animation Variants
// ---------------------------------------------------------------------------

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 80 : -80,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -80 : 80,
    opacity: 0,
  }),
}

const TOTAL_STEPS = 3

// Step text content (hardcoded English for demo)
const STEPS = [
  {
    title: "Browse Creators",
    description:
      "Explore our collection of Haitian celebrities, musicians, athletes, and influencers. Filter by category or search for your favorite.",
  },
  {
    title: "Write Your Story",
    description:
      "Tell your creator what makes this video special. Share the occasion, the person it's for, and any details that will make it unforgettable.",
  },
  {
    title: "Receive Your Video",
    description:
      "Your creator will record a personalized video within 7 days. Download it, share it, and watch the reaction unfold.",
  },
]

// ---------------------------------------------------------------------------
// Inner content
// ---------------------------------------------------------------------------

function HowItWorksContent({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState(0)
  const [direction, setDirection] = useState(1)
  const isDesktop = useMediaQuery("(min-width: 768px)")

  const isFirst = step === 0
  const isLast = step === TOTAL_STEPS - 1

  useEffect(() => {
    setStep(0)
    setDirection(1)
  }, [])

  const goNext = useCallback(() => {
    if (isLast) {
      onClose()
      return
    }
    setDirection(1)
    setStep((s) => s + 1)
  }, [isLast, onClose])

  const goPrev = useCallback(() => {
    if (isFirst) {
      onClose()
      return
    }
    setDirection(-1)
    setStep((s) => s - 1)
  }, [isFirst, onClose])

  const current = STEPS[step]
  const Illustration = STEP_ILLUSTRATIONS[step]

  return (
    <div
      className="flex flex-col outline-none"
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") goNext()
        if (e.key === "ArrowLeft") goPrev()
        if (e.key === "Escape") onClose()
      }}
      tabIndex={-1}
    >
      {/* Drag handle (mobile only) */}
      {!isDesktop && (
        <div className="flex justify-center pt-3 pb-1">
          <div
            className="rounded-full"
            style={{
              width: 48,
              height: 6,
              background: "linear-gradient(90deg, #DDD6FE 0%, #F9A8D4 100%)",
            }}
          />
        </div>
      )}

      {/* Illustration area */}
      <div
        className="relative overflow-hidden"
        style={{ height: !isDesktop ? 220 : 270 }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(147, 51, 234, 0.06) 0%, rgba(236, 72, 153, 0.03) 50%, transparent 100%)",
          }}
        />

        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={step}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="absolute inset-x-0 top-2 bottom-0"
          >
            <Illustration />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Text content */}
      <div className="px-6 pt-5 pb-2" style={{ minHeight: 100 }}>
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={step}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {/* Step number badge */}
            <div
              className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold tracking-wide mb-3"
              style={{
                background: "linear-gradient(135deg, rgba(147,51,234,0.1) 0%, rgba(236,72,153,0.1) 100%)",
                color: "#9333EA",
              }}
            >
              <span
                className="inline-block rounded-full"
                style={{
                  width: 5,
                  height: 5,
                  background: "linear-gradient(135deg, #9333EA, #EC4899)",
                }}
              />
              {step + 1} / {TOTAL_STEPS}
            </div>

            <h2
              className="text-xl font-bold tracking-tight mb-2"
              style={{ color: "#1F1535" }}
            >
              {current.title}
            </h2>
            <p
              className="text-sm leading-relaxed"
              style={{ color: "#6B6080" }}
            >
              {current.description}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Step indicator dots */}
      <div className="flex items-center justify-center gap-2 py-3">
        {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
          <div
            key={i}
            className="rounded-full"
            style={{
              width: i === step ? 24 : 8,
              height: 8,
              background:
                i === step
                  ? "linear-gradient(90deg, #9333EA, #EC4899)"
                  : "#E9D5FF",
              transition: "all 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
            }}
          />
        ))}
      </div>

      {/* Navigation buttons */}
      <div className="flex items-center justify-between px-6 pb-6 pt-3">
        <button
          type="button"
          onClick={goPrev}
          className="rounded-lg px-5 py-2.5 text-sm font-medium transition-colors"
          style={{
            color: "#8B7FA8",
            background: "transparent",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(147, 51, 234, 0.06)"
            e.currentTarget.style.color = "#6D28D9"
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "transparent"
            e.currentTarget.style.color = "#8B7FA8"
          }}
        >
          {isFirst ? "Close" : "Back"}
        </button>

        <button
          type="button"
          onClick={goNext}
          className={cn(
            "rounded-lg px-6 py-2.5 text-sm font-semibold text-white transition-all",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2",
          )}
          style={{
            background: "linear-gradient(135deg, #9333EA 0%, #EC4899 100%)",
            boxShadow: isLast
              ? "0 4px 20px rgba(147, 51, 234, 0.35), 0 2px 8px rgba(236, 72, 153, 0.2)"
              : "0 2px 10px rgba(147, 51, 234, 0.2)",
            transform: "scale(1)",
            transition: "all 0.2s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.03)"
            e.currentTarget.style.boxShadow =
              "0 6px 24px rgba(147, 51, 234, 0.4), 0 3px 12px rgba(236, 72, 153, 0.25)"
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)"
            e.currentTarget.style.boxShadow = isLast
              ? "0 4px 20px rgba(147, 51, 234, 0.35), 0 2px 8px rgba(236, 72, 153, 0.2)"
              : "0 2px 10px rgba(147, 51, 234, 0.2)"
          }}
        >
          {isLast ? "Get Started" : "Next"}
        </button>
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Exported modal -- plain overlay (no Radix Dialog/Sheet dependency)
// ---------------------------------------------------------------------------

export function HowItWorksModal({ open, onOpenChange }: HowItWorksModalProps) {
  const isDesktop = useMediaQuery("(min-width: 768px)")

  // Lock body scroll when open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [open])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={() => onOpenChange(false)}
        aria-hidden="true"
      />

      {/* Panel */}
      {isDesktop ? (
        /* Desktop: centered dialog */
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl overflow-hidden shadow-2xl"
          style={{ maxWidth: 460, width: '90vw' }}
          role="dialog"
          aria-modal="true"
          aria-label="How It Works"
        >
          <HowItWorksContent onClose={() => onOpenChange(false)} />
        </div>
      ) : (
        /* Mobile: bottom sheet */
        <div
          className="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl overflow-hidden shadow-2xl"
          style={{ maxHeight: '85dvh' }}
          role="dialog"
          aria-modal="true"
          aria-label="How It Works"
        >
          <HowItWorksContent onClose={() => onOpenChange(false)} />
        </div>
      )}
    </div>
  )
}
