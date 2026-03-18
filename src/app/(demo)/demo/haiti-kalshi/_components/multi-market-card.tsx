"use client"

import { motion } from "framer-motion"
import { Users, Flame, Newspaper } from "lucide-react"
import { cardEntrance } from "../_lib/animations"
import { cn } from "@/lib/utils"
import { getOutcomeColorVar } from "../_lib/outcome-colors"
import { OutcomeIcon } from "./outcome-icon"
import { Badge } from "./ui/badge"
import { MultiOutcomeBar, type OutcomeSegment } from "./multi-outcome-bar"
import { CountdownTimer } from "./countdown-timer"
import { SportsLiveBadge } from "./sports-live-badge"

const CATEGORY_LABELS: Record<string, string> = {
  "espò": "Espò",
  politik: "Politik",
  "divètisman": "Divètisman",
  meteo: "Evenman Natir\u00E8l",
  ekonomi: "Ekonomi",
  kripto: "Kripto",
  monn: "Monn",
  dyaspora: "Dyaspora",
  "lòt": "Lòt",
}

function formatVolume(n: number): string {
  if (n >= 10000) return `${(n / 1000).toFixed(0)}K+`
  if (n >= 1000) return `${(n / 1000).toFixed(1)}K`
  return `${n}`
}

interface MultiMarketCardProps {
  slug: string
  title: string
  description?: string
  category: string
  outcomes: OutcomeSegment[]
  volume: number
  closeAt?: Date
  isTrending?: boolean
  className?: string
  newsSnippet?: string
  isLive?: boolean
}

export function MultiMarketCard({
  slug,
  title,
  description,
  category,
  outcomes,
  volume,
  closeAt,
  isTrending = false,
  className,
  newsSnippet,
  isLive = false,
}: MultiMarketCardProps) {
  const catBadgeClass = `cat-badge-${category}`
  const sorted = [...outcomes].sort((a, b) => b.probability - a.probability)
  const top3 = sorted.slice(0, 3)
  const remaining = sorted.length - 3

  return (
    <motion.div variants={cardEntrance}>
      <div
        className={cn(
          "group block card-glass card-interactive rounded-xl p-5 relative overflow-hidden cursor-pointer",
          isTrending
            ? "border-l-[3px] border-l-accent-gold/60 glow-gold-hover"
            : "glow-teal-hover",
          className
        )}
      >
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border-divider to-transparent" />

        <div className="flex items-start justify-between gap-2 mb-3">
          <span
            className={cn(
              "inline-flex items-center rounded-md border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide",
              catBadgeClass
            )}
          >
            {CATEGORY_LABELS[category] ?? category}
          </span>
          <div className="flex items-center gap-1.5">
            {isTrending && (
              <Badge variant="gold" className="gap-1">
                <Flame className="size-3" />
                Cho!
              </Badge>
            )}
            <Badge variant="secondary" className="text-[10px]">
              {outcomes.length} opsyon
            </Badge>
          </div>
        </div>

        <h3 className="text-lg font-semibold text-text-primary leading-tight mb-2 line-clamp-2 group-hover:text-brand-primary-hover transition-colors duration-200">
          {title}
        </h3>

        {description && (
          <p className="text-xs text-text-muted leading-relaxed line-clamp-1 mb-2">
            {description}
          </p>
        )}

        {newsSnippet && (
          <p className="text-[11px] text-text-muted leading-relaxed line-clamp-1 mb-2 flex items-center gap-1.5">
            <Newspaper className="size-3 shrink-0" />
            {newsSnippet}
          </p>
        )}

        <div className="flex flex-col gap-1.5 mb-3">
          {top3.map((o) => {
            const colorIdx = o.colorKey ?? String(o.sortOrder)
            return (
              <div key={o.id} className="flex items-center gap-2">
                <OutcomeIcon
                  iconUrl={o.iconUrl}
                  label={o.label}
                  colorKey={o.colorKey}
                  sortOrder={o.sortOrder}
                  size="xs"
                />
                <span className="text-sm text-text-secondary truncate flex-1">
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
          {remaining > 0 && (
            <span className="text-xs text-text-muted pl-[18px]">
              +{remaining} lòt opsyon
            </span>
          )}
        </div>

        <MultiOutcomeBar outcomes={outcomes} showLabels={false} size="sm" className="mb-3" />

        <div className="flex items-center justify-between text-sm text-text-muted mt-1">
          <span className="inline-flex items-center gap-1">
            <Users className="size-3.5" />
            {formatVolume(volume)} moun
          </span>
          {isLive ? <SportsLiveBadge /> : closeAt && <CountdownTimer closeAt={closeAt} compact />}
        </div>
      </div>
    </motion.div>
  )
}
