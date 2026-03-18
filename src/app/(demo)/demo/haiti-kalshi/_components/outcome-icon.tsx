"use client"

import { useState } from "react"
import Image from "next/image"
import { Check, X, TrendingUp, TrendingDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { getOutcomeColorVar } from "../_lib/outcome-colors"

const SIZES = {
  xs: { circle: "size-4", icon: "size-2.5", img: "size-4", text: "text-[6px]" },
  sm: { circle: "size-5", icon: "size-3", img: "size-5", text: "text-[7px]" },
  md: { circle: "size-6", icon: "size-3.5", img: "size-6", text: "text-[8px]" },
  lg: { circle: "size-8", icon: "size-4", img: "size-8", text: "text-[10px]" },
  xl: { circle: "size-9", icon: "size-5", img: "size-9", text: "text-[11px]" },
  "2xl": { circle: "size-10", icon: "size-5", img: "size-10", text: "text-xs" },
} as const

interface OutcomeIconProps {
  iconUrl?: string | null
  label?: string
  colorKey?: string | null
  sortOrder?: number
  size?: keyof typeof SIZES
  className?: string
}

export function OutcomeIcon({
  iconUrl,
  label,
  colorKey,
  sortOrder = 0,
  size = "sm",
  className,
}: OutcomeIconProps) {
  const s = SIZES[size]
  const [imgError, setImgError] = useState(false)

  if (iconUrl && !imgError) {
    return (
      <span
        className={cn(
          "relative inline-flex items-center justify-center rounded-full overflow-hidden shrink-0 border border-border-default bg-bg-hover/30",
          s.circle,
          className
        )}
      >
        <Image
          src={iconUrl}
          alt={label ?? ""}
          fill
          className="object-cover"
          onError={() => setImgError(true)}
        />
      </span>
    )
  }

  if (iconUrl && imgError && label) {
    const initials = label.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase()
    return (
      <span
        className={cn(
          "inline-flex items-center justify-center rounded-full shrink-0 bg-bg-hover border border-border-default font-bold text-text-muted",
          s.circle,
          s.text,
          className
        )}
      >
        {initials}
      </span>
    )
  }

  const isWi = sortOrder === 0 && (!label || label === "Wi")
  if (isWi) {
    return (
      <span
        className={cn(
          "inline-flex items-center justify-center rounded-full bg-emerald-500/15 shrink-0",
          s.circle,
          className
        )}
      >
        <Check className={cn("text-emerald-500", s.icon)} strokeWidth={3} />
      </span>
    )
  }

  const isNon = sortOrder === 1 && (!label || label === "Non")
  if (isNon) {
    return (
      <span
        className={cn(
          "inline-flex items-center justify-center rounded-full bg-red-500/15 shrink-0",
          s.circle,
          className
        )}
      >
        <X className={cn("text-red-500", s.icon)} strokeWidth={3} />
      </span>
    )
  }

  if (sortOrder === 0 && label === "Monte") {
    return (
      <span
        className={cn(
          "inline-flex items-center justify-center rounded-full bg-emerald-500/15 shrink-0",
          s.circle,
          className
        )}
      >
        <TrendingUp className={cn("text-emerald-500", s.icon)} strokeWidth={2.5} />
      </span>
    )
  }

  if (sortOrder === 1 && label === "Desann") {
    return (
      <span
        className={cn(
          "inline-flex items-center justify-center rounded-full bg-red-500/15 shrink-0",
          s.circle,
          className
        )}
      >
        <TrendingDown className={cn("text-red-500", s.icon)} strokeWidth={2.5} />
      </span>
    )
  }

  const colorIdx = colorKey ?? String(sortOrder)
  return (
    <span
      className={cn(
        "inline-block rounded-full shrink-0",
        s.circle,
        className
      )}
      style={{
        backgroundColor: `var(${getOutcomeColorVar(colorIdx)})`,
      }}
    />
  )
}
