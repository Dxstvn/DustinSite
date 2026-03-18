import { cn } from "@/lib/utils"
import { formatHTGCompact } from "../../_lib/format-htg"

export function PnlIndicator({
  amount,
  size = "sm",
  className,
}: {
  amount: number
  size?: "sm" | "md" | "lg"
  className?: string
}) {
  const isPositive = amount > 0
  const isZero = amount === 0

  const sizeClass =
    size === "lg"
      ? "text-3xl font-bold"
      : size === "md"
        ? "text-lg font-semibold"
        : "text-sm font-medium"

  const colorClass = isZero
    ? "text-text-muted"
    : isPositive
      ? "text-success"
      : "text-danger-text"

  const prefix = isZero ? "" : isPositive ? "+" : ""
  const formatted = formatHTGCompact(Math.abs(amount))

  return (
    <span className={cn(sizeClass, colorClass, "tabular-nums", className)}>
      {prefix}
      {isPositive || isZero ? "" : "-"}
      {formatted}
    </span>
  )
}
