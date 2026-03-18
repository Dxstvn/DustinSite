"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { OutcomeIcon } from "./outcome-icon";

export interface PoolBarOutcome {
  id: string;
  label: string;
  probability: number;
  colorKey: string | null;
  sortOrder: number;
  iconUrl?: string | null;
}

interface PoolBarProps {
  probWi?: number;
  outcomes?: PoolBarOutcome[];
  className?: string;
  showLabels?: boolean;
  size?: "sm" | "lg";
  variant?: "full" | "compact" | "bar";
  labels?: [string, string];
  colors?: [string, string];
  showProbBar?: boolean;
  poolMultipliers?: Record<string, number | null>;
}

function deriveBinaryOutcomes(
  probWi: number,
  labels?: [string, string],
  colors?: [string, string]
): PoolBarOutcome[] {
  const labelA = labels?.[0] ?? "Wi";
  const labelB = labels?.[1] ?? "Non";
  return [
    { id: "wi", label: labelA, probability: probWi, colorKey: colors ? "0" : null, sortOrder: 0 },
    { id: "non", label: labelB, probability: 1 - probWi, colorKey: colors ? "1" : null, sortOrder: 1 },
  ];
}

function ProbabilityBar({ probability }: { probability: number }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  const pct = Math.max(2, Math.min(100, probability * 100));

  return (
    <div className="flex-1 min-w-8 h-1.5 rounded-full bg-bg-hover/40 overflow-hidden">
      <div
        className="h-full rounded-full bg-outcome-text/60"
        style={{
          width: mounted ? `${pct}%` : "0%",
          transition: "width 0.5s cubic-bezier(0.165, 0.84, 0.44, 1)",
        }}
      />
    </div>
  );
}

function OutcomeRow({
  outcome,
  showMultiplier,
  compact,
  showProbBar,
  poolMultiplier,
}: {
  outcome: PoolBarOutcome;
  showMultiplier: boolean;
  compact: boolean;
  showProbBar: boolean;
  poolMultiplier?: number | null;
}) {
  const pct = Math.max(0, Math.min(1, outcome.probability)) * 100;
  const multiplier = poolMultiplier !== undefined
    ? (poolMultiplier != null ? poolMultiplier.toFixed(2) : "\u2014")
    : (outcome.probability > 0 ? (1 / outcome.probability).toFixed(2) : "\u2014");

  return (
    <div className="flex items-center gap-3">
      <OutcomeIcon
        iconUrl={outcome.iconUrl}
        label={outcome.label}
        colorKey={outcome.colorKey}
        sortOrder={outcome.sortOrder}
        size="lg"
      />
      <span
        className={cn(
          "font-semibold text-text-primary min-w-0 truncate",
          compact ? "text-xs" : "text-sm"
        )}
      >
        {outcome.label}
      </span>

      {showProbBar && <ProbabilityBar probability={outcome.probability} />}

      {showMultiplier && !compact && (
        <span className="text-xs text-text-muted tabular-nums font-medium w-12 text-right">
          {multiplier}x
        </span>
      )}

      <span className="inline-flex items-center justify-center rounded-full border border-outcome-border bg-outcome-bg px-2.5 py-0.5 text-xs font-bold tabular-nums text-outcome-text min-w-[48px] text-center">
        {pct.toFixed(0)}%
      </span>
    </div>
  );
}

function BarFill({
  sorted,
  size,
  className,
}: {
  sorted: PoolBarOutcome[];
  size: "sm" | "lg";
  className?: string;
}) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  const barHeight = size === "lg" ? "h-3" : "h-2";

  return (
    <div className={cn("w-full", className)}>
      <div className={cn("relative w-full overflow-hidden rounded-full bg-bg-hover/40 flex gap-0.5", barHeight)}>
        {sorted.map((o) => (
          <div
            key={o.id}
            className="rounded-full bg-brand-primary/60 will-change-[width]"
            style={{
              width: mounted
                ? `${Math.max(0, Math.min(1, o.probability)) * 100}%`
                : "0%",
              transition: "width 0.5s cubic-bezier(0.165, 0.84, 0.44, 1)",
              opacity: 0.3 + o.probability * 0.7,
            }}
          />
        ))}
      </div>
    </div>
  );
}

export function PoolBar({
  probWi,
  outcomes: outcomeProp,
  className,
  showLabels = true,
  size = "sm",
  variant = "full",
  labels,
  colors,
  showProbBar = true,
  poolMultipliers,
}: PoolBarProps) {
  const outcomes =
    outcomeProp ??
    deriveBinaryOutcomes(probWi ?? 0.5, labels, colors);

  const sorted = [...outcomes].sort((a, b) => a.sortOrder - b.sortOrder);
  const isCompact = variant === "compact";
  const showMultiplier = variant === "full";

  if (variant === "bar" || !showLabels) {
    return <BarFill sorted={sorted} size={size} className={className} />;
  }

  return (
    <div className={cn("flex flex-col", size === "lg" ? "gap-3" : "gap-2", className)}>
      {sorted.map((o) => (
        <OutcomeRow key={o.id} outcome={o} showMultiplier={showMultiplier} compact={isCompact} showProbBar={showProbBar} poolMultiplier={poolMultipliers?.[o.id]} />
      ))}
    </div>
  );
}
