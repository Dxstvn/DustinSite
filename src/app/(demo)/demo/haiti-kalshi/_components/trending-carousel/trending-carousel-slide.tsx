"use client"

import { Users, Coins, Flame, Newspaper } from "lucide-react"
import { formatHTGCompact } from "../../_lib/format-htg"
import { Badge } from "../ui/badge"
import { MarketBar } from "../market-bar"
import { CountdownTimer } from "../countdown-timer"
import { SportsLiveBadge } from "../sports-live-badge"
import { OddsChartMini } from "./odds-chart-mini"
import type { OutcomeSegment } from "../multi-outcome-bar"

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

export interface TrendingSlideData {
  slug: string
  title: string
  category: string
  marketType: "binary" | "multi"
  probWi: number
  totalPool: number
  totalBettors: number
  closeAt: string | null
  outcomes?: OutcomeSegment[]
  snapshots: Array<{
    created_at: string
    implied_prob_wi: number | null
    outcome_probs: Array<{ id: string; prob: number }> | null
  }>
  chartOutcomes?: Array<{
    id: string
    label: string
    colorKey: string | null
    sortOrder: number
  }>
  newsSnippet?: string
  isLive?: boolean
}

interface TrendingCarouselSlideProps {
  data: TrendingSlideData
  rank: number
}

export function TrendingCarouselSlide({ data, rank }: TrendingCarouselSlideProps) {
  return (
    <div
      className="group block h-full card-glass-hero card-interactive rounded-2xl p-5 md:p-6 overflow-hidden relative cursor-pointer"
      style={{
        boxShadow:
          "0 0 30px var(--color-brand-primary-glow), inset 0 1px 0 var(--color-border-default)",
      }}
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-primary/20 to-transparent" />

      <div className="flex flex-col md:flex-row gap-4 md:gap-6 h-full">
        <div className="flex-1 flex flex-col min-w-0 md:w-[55%]">
          <div className="flex items-center gap-2 mb-3">
            <Badge variant="gold" className="gap-1 text-[10px]">
              <Flame className="size-3" />
              #{rank + 1}
            </Badge>
            <span
              className={`inline-flex items-center rounded-md border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide cat-badge-${data.category}`}
            >
              {CATEGORY_LABELS[data.category] ?? data.category}
            </span>
          </div>

          <h3 className="text-xl md:text-2xl font-bold leading-tight text-text-primary group-hover:text-brand-primary-hover transition-colors mb-4 line-clamp-2">
            {data.title}
          </h3>

          {data.newsSnippet && (
            <p className="text-xs text-text-muted line-clamp-1 mb-3 flex items-center gap-1.5">
              <Newspaper className="size-3 shrink-0" />
              {data.newsSnippet}
            </p>
          )}

          <MarketBar
            marketType={data.marketType}
            probWi={data.probWi}
            outcomes={data.outcomes}
            size="lg"
            showLabels
            showBarIcons
            className="mb-4"
          />

          <div className="flex items-center gap-3 mt-auto text-sm">
            <span className="inline-flex items-center gap-1.5 text-accent-gold font-semibold tabular-nums">
              <Coins className="size-3.5" />
              {formatHTGCompact(data.totalPool)}
            </span>
            <span className="inline-flex items-center gap-1 text-text-muted tabular-nums">
              <Users className="size-3.5" />
              {data.totalBettors}
            </span>
            {data.isLive ? (
              <SportsLiveBadge />
            ) : data.closeAt ? (
              <CountdownTimer closeAt={new Date(data.closeAt)} compact />
            ) : null}
          </div>
        </div>

        <div className="md:w-[45%] flex items-center">
          <OddsChartMini
            snapshots={data.snapshots}
            marketType={data.marketType}
            outcomes={data.chartOutcomes}
            height={180}
            className="w-full rounded-lg bg-bg-hover/10 p-2"
          />
        </div>
      </div>
    </div>
  )
}
