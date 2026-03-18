"use client"

import { useMemo, useState, useEffect, useRef } from "react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"
import { getOutcomeColorVar } from "../../_lib/outcome-colors"
import { computeNiceTicks } from "../../_lib/chart-utils"
import { OddsTooltip } from "../odds-tooltip"

interface OddsChartMiniProps {
  snapshots: Array<{
    created_at: string
    implied_prob_wi: number | null
    outcome_probs: Array<{ id: string; prob: number }> | null
  }>
  marketType: "binary" | "multi"
  outcomes?: Array<{
    id: string
    label: string
    colorKey: string | null
    sortOrder: number
  }>
  height?: number
  className?: string
}

function formatTimeShort(timestamp: string): string {
  const d = new Date(timestamp)
  return d.toLocaleDateString("fr-HT", { day: "numeric", month: "short" })
}


export function OddsChartMini({
  snapshots,
  marketType,
  outcomes,
  height = 100,
  className,
}: OddsChartMiniProps) {
  const isMulti = marketType === "multi"
  const sortedOutcomes = useMemo(
    () => outcomes ? [...outcomes].sort((a, b) => a.sortOrder - b.sortOrder) : [],
    [outcomes]
  )

  const chartData = useMemo(() => {
    if (isMulti) {
      return snapshots.map((s) => {
        const point: Record<string, unknown> = { timestamp: s.created_at }
        if (s.outcome_probs) {
          if (Array.isArray(s.outcome_probs)) {
            for (const op of s.outcome_probs) {
              point[op.id] = op.prob
            }
          } else if (typeof s.outcome_probs === "object") {
            for (const [id, prob] of Object.entries(s.outcome_probs as Record<string, number>)) {
              point[id] = Number(prob)
            }
          }
        }
        return point
      })
    }
    return snapshots.map((s) => ({
      timestamp: s.created_at,
      wi: s.implied_prob_wi ?? 0.5,
      non: 1 - (s.implied_prob_wi ?? 0.5),
    }))
  }, [snapshots, isMulti])

  const domain = useMemo(() => {
    if (snapshots.length < 2) return [0, 1] as [number, number]
    let min = 1, max = 0
    if (isMulti) {
      for (const s of snapshots) {
        if (s.outcome_probs) {
          if (Array.isArray(s.outcome_probs)) {
            for (const op of s.outcome_probs) {
              min = Math.min(min, op.prob)
              max = Math.max(max, op.prob)
            }
          } else if (typeof s.outcome_probs === "object") {
            for (const prob of Object.values(s.outcome_probs as Record<string, number>)) {
              const p = Number(prob)
              min = Math.min(min, p)
              max = Math.max(max, p)
            }
          }
        }
      }
    } else {
      for (const s of snapshots) {
        const wi = s.implied_prob_wi ?? 0.5
        const non = 1 - wi
        min = Math.min(min, wi, non)
        max = Math.max(max, wi, non)
      }
    }
    const spread = max - min
    const padding = spread > 0 ? spread * 0.15 : 0.05
    const lo = Math.max(0, Math.floor((min - padding) * 20) / 20)
    const hi = Math.min(1, Math.ceil((max + padding) * 20) / 20)
    return [lo, hi] as [number, number]
  }, [snapshots, isMulti])

  const yTicks = useMemo(() => computeNiceTicks(domain), [domain])

  const containerRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  if (snapshots.length < 2) {
    return (
      <div
        className={className}
        style={{ height, touchAction: "pan-y" }}
        data-chart-area=""
      >
        <div className="h-full w-full rounded-lg bg-bg-hover/20 flex items-center justify-center">
          <span className="text-xs text-text-muted">Pa gen done</span>
        </div>
      </div>
    )
  }

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ height, touchAction: "pan-y" }}
      data-chart-area=""
      onClick={(e) => { e.preventDefault(); e.stopPropagation() }}
      onPointerDown={(e) => { e.stopPropagation() }}
    >
      {isVisible && <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
        <LineChart data={chartData} margin={{ top: 4, right: 36, left: 4, bottom: 4 }}>
          <CartesianGrid
            vertical={false}
            stroke="var(--color-text-muted)"
            strokeOpacity={0.15}
            strokeDasharray="3 3"
          />
          <XAxis
            dataKey="timestamp"
            tickFormatter={formatTimeShort}
            tick={{ fontSize: 10, fill: "var(--color-text-muted)" }}
            axisLine={false}
            tickLine={false}
            minTickGap={50}
          />
          <YAxis
            orientation="right"
            domain={domain}
            ticks={yTicks}
            tickFormatter={(v: number) => `${(v * 100).toFixed(0)}%`}
            tick={{ fontSize: 10, fill: "var(--color-text-muted)" }}
            axisLine={false}
            tickLine={false}
            width={32}
          />
          <Tooltip
            content={<OddsTooltip isBinary={!isMulti} />}
            position={{ y: 0 }}
            labelFormatter={(t) =>
              new Date(String(t)).toLocaleDateString("fr-HT", {
                day: "numeric",
                month: "short",
                hour: "2-digit",
                minute: "2-digit",
              })
            }
          />
          {isMulti
            ? sortedOutcomes.slice(0, 4).map((o) => {
                const colorIdx = o.colorKey ?? String(o.sortOrder)
                return (
                  <Line
                    key={o.id}
                    type="monotone"
                    dataKey={o.id}
                    name={o.label}
                    stroke={`var(${getOutcomeColorVar(colorIdx)})`}
                    strokeWidth={1.5}
                    dot={false}
                    isAnimationActive={false}
                  />
                )
              })
            : (
              <>
                <Line
                  type="monotone"
                  dataKey="wi"
                  name="Wi"
                  stroke="var(--color-brand-primary)"
                  strokeWidth={2}
                  dot={false}
                  isAnimationActive={false}
                />
                <Line
                  type="monotone"
                  dataKey="non"
                  name="Non"
                  stroke="var(--color-accent-gold)"
                  strokeWidth={2}
                  dot={false}
                  isAnimationActive={false}
                />
              </>
            )}
        </LineChart>
      </ResponsiveContainer>}
    </div>
  )
}
