"use client"

import { Crown, TrendingUp, ChevronRight } from "lucide-react"
import { Avatar, AvatarFallback } from "../ui/avatar"
import { RankBadge } from "./rank-badge"
import { PnlIndicator } from "./pnl-indicator"
import type { GlobalLeaderboardEntry } from "../../_types/leaderboard"

const podiumCardStyles: Record<number, string> = {
  1: "border-accent-gold/40 ring-1 ring-accent-gold/20",
  2: "border-slate-400/30",
  3: "border-amber-700/25",
}

function PodiumCard({ entry }: { entry: GlobalLeaderboardEntry }) {
  const isFirst = entry.rank === 1
  return (
    <div
      className={`relative card-glass rounded-xl p-4 flex flex-col items-center gap-2 min-w-[160px] shrink-0 snap-center ${
        podiumCardStyles[entry.rank] ?? ""
      } ${isFirst ? "glow-gold" : ""}`}
    >
      {isFirst && (
        <Crown className="size-5 text-accent-gold absolute top-2 right-2" />
      )}
      <RankBadge rank={entry.rank} size="md" />
      <Avatar className="size-10">
        <AvatarFallback className="text-sm bg-brand-primary-muted text-brand-primary">
          {entry.display_name.slice(0, 2).toUpperCase()}
        </AvatarFallback>
      </Avatar>
      <p className="text-sm font-semibold text-text-primary truncate max-w-[140px]">
        {entry.display_name}
      </p>
      <PnlIndicator amount={entry.net_pnl} size="md" />
      <div className="flex items-center gap-3 text-[11px] text-text-muted">
        <span>{entry.total_bets} paryaj</span>
        <span>{entry.win_rate}% genyen</span>
      </div>
    </div>
  )
}

function RunnerRow({ entry }: { entry: GlobalLeaderboardEntry }) {
  return (
    <div className="flex items-center gap-3 px-3 py-2.5">
      <RankBadge rank={entry.rank} />
      <Avatar className="size-6">
        <AvatarFallback className="text-[9px] bg-brand-primary-muted text-brand-primary">
          {entry.display_name.slice(0, 2).toUpperCase()}
        </AvatarFallback>
      </Avatar>
      <span className="flex-1 text-sm font-medium text-text-primary truncate min-w-0">
        {entry.display_name}
      </span>
      <PnlIndicator amount={entry.net_pnl} size="sm" />
    </div>
  )
}

interface GlobalLeaderboardProps {
  entries: GlobalLeaderboardEntry[]
}

export function GlobalLeaderboard({ entries }: GlobalLeaderboardProps) {
  if (entries.length < 3) return null

  const podium = entries.slice(0, 3)
  const runners = entries.slice(3)

  return (
    <section className="py-6" aria-label="Klasman">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <TrendingUp className="size-5 text-brand-primary" />
          Top Parye
        </h2>
        <span
          className="text-sm text-brand-primary hover:text-brand-primary-hover transition-colors flex items-center gap-0.5 cursor-pointer"
        >
          We tout
          <ChevronRight className="size-4" />
        </span>
      </div>

      <div className="flex gap-3 overflow-x-auto pb-2 snap-x snap-mandatory scrollbar-none md:grid md:grid-cols-3 md:overflow-visible">
        {podium.map((entry) => (
          <PodiumCard key={entry.user_id} entry={entry} />
        ))}
      </div>

      {runners.length > 0 && (
        <div className="card-glass rounded-xl mt-3 divide-y divide-border-divider">
          {runners.map((entry) => (
            <RunnerRow key={entry.user_id} entry={entry} />
          ))}
        </div>
      )}
    </section>
  )
}
