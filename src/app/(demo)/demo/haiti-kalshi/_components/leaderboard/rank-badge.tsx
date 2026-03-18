import { cn } from "@/lib/utils"
import { Crown } from "lucide-react"

const rankStyles: Record<number, string> = {
  1: "bg-accent-gold/20 text-accent-gold border-accent-gold/40",
  2: "bg-slate-400/15 text-slate-300 border-slate-400/30",
  3: "bg-amber-700/15 text-amber-600 border-amber-700/30",
}

export function RankBadge({
  rank,
  size = "sm",
  className,
}: {
  rank: number
  size?: "sm" | "md" | "lg"
  className?: string
}) {
  const sizeClass =
    size === "lg"
      ? "size-10 text-base"
      : size === "md"
        ? "size-8 text-sm"
        : "size-6 text-[10px]"

  if (rank <= 3) {
    return (
      <span
        className={cn(
          "inline-flex items-center justify-center rounded-full border font-bold tabular-nums shrink-0",
          sizeClass,
          rankStyles[rank],
          rank === 1 && "dark:bg-accent-gold/20 dark:text-accent-gold dark:border-accent-gold/40",
          className
        )}
      >
        {rank === 1 && size === "lg" ? (
          <Crown className="size-5" />
        ) : (
          rank
        )}
      </span>
    )
  }

  return (
    <span
      className={cn(
        "inline-flex items-center justify-center rounded-full font-mono font-medium text-text-muted tabular-nums shrink-0",
        sizeClass,
        className
      )}
    >
      {rank}
    </span>
  )
}
