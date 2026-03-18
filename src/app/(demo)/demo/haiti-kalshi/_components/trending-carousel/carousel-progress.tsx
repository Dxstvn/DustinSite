"use client"

import { cn } from "@/lib/utils"

interface CarouselProgressProps {
  current: number
  total: number
  className?: string
}

export function CarouselProgress({ current, total, className }: CarouselProgressProps) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <div className="flex items-center gap-1.5">
        {Array.from({ length: total }).map((_, i) => (
          <button
            key={i}
            type="button"
            className={cn(
              "rounded-full transition-all duration-300",
              i === current
                ? "w-6 h-2 bg-brand-primary"
                : "size-2 bg-border-hover hover:bg-border-focus"
            )}
            aria-label={`Ale nan ${i + 1}`}
          />
        ))}
      </div>

      <span className="text-xs text-text-muted tabular-nums">
        {current + 1} nan {total}
      </span>
    </div>
  )
}
