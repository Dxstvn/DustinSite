"use client"

import { useState, useRef, useEffect } from "react"
import { OutcomeIcon } from "./outcome-icon"

const AUTO_HIDE_DELAY = 1500
const FADE_DURATION = 300

export interface OutcomeMeta {
  iconUrl?: string | null
  colorKey?: string | null
  sortOrder?: number
  label?: string
}

interface OddsTooltipProps {
  active?: boolean
  payload?: Array<{
    name: string
    value: number
    color: string
    dataKey: string
    payload: Record<string, unknown>
  }>
  label?: string
  isBinary?: boolean
  outcomeMeta?: Record<string, OutcomeMeta>
  persistent?: boolean
}

export function OddsTooltip({
  active,
  payload,
  label,
  outcomeMeta,
  persistent = false,
}: OddsTooltipProps) {
  const [visible, setVisible] = useState(true)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const isTouchRef = useRef(false)

  useEffect(() => {
    isTouchRef.current = window.matchMedia("(pointer: coarse)").matches
  }, [])

  const activityKey = payload?.[0]?.payload?.timestamp as string | undefined
  useEffect(() => {
    if (!isTouchRef.current || persistent) return

    setVisible(true)
    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => setVisible(false), AUTO_HIDE_DELAY)

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [activityKey, persistent])

  if (!active || !payload || payload.length === 0) return null

  const timestamp = payload[0]?.payload?.timestamp as string | undefined
  const formattedLabel = timestamp
    ? new Date(timestamp).toLocaleDateString("fr-HT", {
        day: "numeric",
        month: "short",
        hour: "2-digit",
        minute: "2-digit",
      })
    : label

  return (
    <div
      style={{
        opacity: visible ? 1 : 0,
        transition: `opacity ${FADE_DURATION}ms ease-out`,
      }}
    >
      <div className="card-glass-elevated rounded-xl px-4 py-3 shadow-xl border border-border-default max-w-[240px]">
        <p className="text-[11px] text-text-muted mb-2 tabular-nums font-medium">
          {formattedLabel}
        </p>
        <div className="flex flex-col gap-1.5">
          {payload.map((entry) => {
            const meta = outcomeMeta?.[entry.dataKey]
            return (
              <div key={entry.dataKey} className="flex items-center justify-between gap-4">
                <span className="flex items-center gap-2">
                  {meta ? (
                    <OutcomeIcon
                      iconUrl={meta.iconUrl}
                      label={meta.label ?? entry.name}
                      colorKey={meta.colorKey}
                      sortOrder={meta.sortOrder}
                      size="xs"
                    />
                  ) : (
                    <span
                      className="inline-block size-2.5 rounded-full shrink-0"
                      style={{ backgroundColor: entry.color }}
                    />
                  )}
                  <span className="text-sm text-text-primary font-medium truncate max-w-[120px]">{entry.name}</span>
                </span>
                <span
                  className="text-sm font-bold tabular-nums"
                  style={{ color: entry.color }}
                >
                  {(entry.value * 100).toFixed(1)}%
                </span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
