"use client"

import { useRef, useState, useEffect, useMemo } from "react"
import { cn } from "@/lib/utils"
import { getOutcomeColorVar } from "../_lib/outcome-colors"
import { OutcomeIcon } from "./outcome-icon"
import { useAutoFitCount } from "../_hooks/useAutoFitCount"
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "./ui/popover"

export interface OutcomeSegment {
  id: string
  label: string
  probability: number
  colorKey: string | null
  sortOrder: number
  iconUrl?: string | null
}

interface MultiOutcomeBarProps {
  outcomes: OutcomeSegment[]
  className?: string
  showLabels?: boolean
  showBarIcons?: boolean
  size?: "sm" | "lg"
}

function OutcomeChip({ o }: { o: OutcomeSegment }) {
  const colorIdx = o.colorKey ?? String(o.sortOrder)
  return (
    <span className="inline-flex items-center gap-1.5 text-xs tabular-nums whitespace-nowrap">
      <OutcomeIcon
        iconUrl={o.iconUrl}
        label={o.label}
        colorKey={o.colorKey}
        sortOrder={o.sortOrder}
        size="lg"
      />
      <span className="font-medium text-text-secondary">{o.label}</span>
      <span
        className="font-bold"
        style={{ color: `var(${getOutcomeColorVar(colorIdx)})` }}
      >
        {(o.probability * 100).toFixed(0)}%
      </span>
    </span>
  )
}

export function MultiOutcomeBar({
  outcomes,
  className,
  showLabels = true,
  showBarIcons = false,
  size = "sm",
}: MultiOutcomeBarProps) {
  const barHeight = size === "lg" ? "h-4" : "h-2.5 md:h-3"
  const showOverlay = size === "lg"

  const sorted = useMemo(
    () => [...outcomes].sort((a, b) => b.probability - a.probability),
    [outcomes]
  )

  const minPct = size === "lg" ? 5 : 3

  const barRef = useRef<HTMLDivElement>(null)
  const [barWidth, setBarWidth] = useState(0)

  useEffect(() => {
    const bar = barRef.current
    if (!bar) return
    const ro = new ResizeObserver(([entry]) => setBarWidth(entry.contentRect.width))
    ro.observe(bar)
    return () => ro.disconnect()
  }, [])

  const containerRef = useRef<HTMLDivElement>(null)
  const measureRef = useRef<HTMLDivElement>(null)
  const visibleCount = useAutoFitCount(containerRef, measureRef, sorted.length)

  const isTruncated = visibleCount < sorted.length
  const hiddenCount = sorted.length - visibleCount

  return (
    <div className={cn("w-full", className)}>
      {showLabels && (
        <div ref={containerRef} className="relative mb-1.5 overflow-hidden">
          <div
            ref={measureRef}
            aria-hidden
            className="absolute top-0 left-0 flex items-center gap-3 pointer-events-none"
            style={{ visibility: "hidden", whiteSpace: "nowrap" }}
          >
            {sorted.map((o, i) => (
              <span key={o.id} data-chip-index={i}>
                <OutcomeChip o={o} />
              </span>
            ))}
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            {sorted.slice(0, visibleCount).map((o) => (
              <OutcomeChip key={o.id} o={o} />
            ))}
            {isTruncated && (
              <Popover>
                <PopoverTrigger asChild>
                  <button
                    type="button"
                    className="inline-flex items-center text-xs text-text-muted font-medium rounded-full px-2 py-0.5 transition-colors hover:bg-bg-hover hover:text-text-secondary cursor-pointer"
                  >
                    +{hiddenCount}
                  </button>
                </PopoverTrigger>
                <PopoverContent
                  side="bottom"
                  align="start"
                  className="w-64 p-2"
                >
                  <div className="flex flex-col gap-1">
                    {sorted.slice(visibleCount).map((o) => {
                      const colorIdx = o.colorKey ?? String(o.sortOrder)
                      return (
                        <div
                          key={o.id}
                          className="flex items-center gap-2.5 rounded-md px-2 py-1.5 hover:bg-bg-hover transition-colors"
                        >
                          <OutcomeIcon
                            iconUrl={o.iconUrl}
                            label={o.label}
                            colorKey={o.colorKey}
                            sortOrder={o.sortOrder}
                            size="sm"
                          />
                          <span className="flex-1 text-sm font-medium text-text-primary truncate">
                            {o.label}
                          </span>
                          <span
                            className="text-sm font-bold tabular-nums"
                            style={{ color: `var(${getOutcomeColorVar(colorIdx)})` }}
                          >
                            {(o.probability * 100).toFixed(0)}%
                          </span>
                        </div>
                      )
                    })}
                  </div>
                </PopoverContent>
              </Popover>
            )}
          </div>
        </div>
      )}
      <div ref={barRef} className={cn("relative w-full overflow-hidden rounded-full bg-bg-hover/40 flex gap-0.5", barHeight)}>
        {sorted.map((o) => {
          const pct = Math.max(minPct, o.probability * 100)
          const colorIdx = o.colorKey ?? String(o.sortOrder)
          const segmentPx = (pct / 100) * barWidth
          return (
            <div
              key={o.id}
              className="relative rounded-full will-change-[width] overflow-hidden"
              style={{
                width: `${pct}%`,
                backgroundColor: `var(${getOutcomeColorVar(colorIdx)})`,
                boxShadow: `0 0 8px var(${getOutcomeColorVar(colorIdx, "glow")}), inset 0 1px 0 rgba(255,255,255,0.15)`,
                transition: "width 0.3s cubic-bezier(0.165, 0.84, 0.44, 1)",
              }}
            >
              {showOverlay && segmentPx >= 28 && (
                <span className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-white tabular-nums drop-shadow-sm">
                  {(o.probability * 100).toFixed(0)}%
                </span>
              )}
            </div>
          )
        })}
      </div>
      {showBarIcons && sorted.some((o) => o.iconUrl) && (() => {
        const pickIconSize = (px: number) => {
          if (size !== "lg") return px >= 20 ? "xs" as const : null
          if (px >= 40) return "xl" as const
          if (px >= 34) return "lg" as const
          if (px >= 28) return "md" as const
          if (px >= 22) return "sm" as const
          if (px >= 16) return "xs" as const
          return null
        }
        return (
          <div className={cn("flex items-center gap-0.5", size === "lg" ? "mt-2" : "mt-1")} aria-hidden="true">
            {sorted.map((o) => {
              const pct = Math.max(minPct, o.probability * 100)
              const segmentPx = (pct / 100) * barWidth
              const iconSize = pickIconSize(segmentPx)
              return (
                <div
                  key={o.id}
                  className="flex justify-center"
                  style={{
                    width: `${pct}%`,
                    transition: "width 0.3s cubic-bezier(0.165, 0.84, 0.44, 1)",
                  }}
                >
                  {iconSize && (
                    <OutcomeIcon
                      iconUrl={o.iconUrl}
                      label={o.label}
                      colorKey={o.colorKey}
                      sortOrder={o.sortOrder}
                      size={iconSize}
                    />
                  )}
                </div>
              )
            })}
          </div>
        )
      })()}
    </div>
  )
}
