"use client"

import { PoolBar } from "./pool-bar"
import { MultiOutcomeBar, type OutcomeSegment } from "./multi-outcome-bar"

interface MarketBarProps {
  marketType: "binary" | "multi"
  probWi?: number
  outcomes?: OutcomeSegment[]
  showLabels?: boolean
  showBarIcons?: boolean
  size?: "sm" | "lg"
  className?: string
  labels?: [string, string]
  colors?: [string, string]
}

export function MarketBar({
  marketType,
  probWi,
  outcomes,
  showLabels,
  showBarIcons,
  size = "sm",
  className,
  labels,
  colors,
}: MarketBarProps) {
  if (marketType === "multi" && outcomes && outcomes.length > 0) {
    return (
      <MultiOutcomeBar
        outcomes={outcomes}
        showLabels={showLabels}
        showBarIcons={showBarIcons}
        size={size}
        className={className}
      />
    )
  }

  return (
    <PoolBar
      probWi={probWi ?? 0.5}
      showLabels={showLabels}
      size={size}
      className={className}
      labels={labels}
      colors={colors}
    />
  )
}
