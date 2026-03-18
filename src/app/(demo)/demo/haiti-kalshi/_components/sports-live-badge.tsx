"use client"

import { cn } from "@/lib/utils"

interface SportsLiveBadgeProps {
  period?: string
  className?: string
}

export function SportsLiveBadge({ period, className }: SportsLiveBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider",
        "bg-red-500/15 text-red-500 dark:bg-red-500/20 dark:text-red-400",
        className,
      )}
    >
      <span className="relative flex size-1.5">
        <span className="absolute inline-flex size-full animate-ping rounded-full bg-red-500 opacity-75" />
        <span className="relative inline-flex size-1.5 rounded-full bg-red-500" />
      </span>
      AN DIREK{period ? ` \u00B7 ${period}` : ""}
    </span>
  )
}
