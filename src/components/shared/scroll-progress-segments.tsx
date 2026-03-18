"use client";

import { motion as m, type MotionValue, useTransform } from "motion/react";
import { cn } from "@/lib/utils";

interface ScrollProgressSegmentsProps {
  /** Number of segments (e.g., number of cards/images) */
  count: number;
  /** Scroll progress value from 0 to 1 */
  progress: MotionValue<number>;
  className?: string;
}

/**
 * COLLINS-style segmented progress bar.
 * Shows N equal-width bars that fill sequentially based on scroll progress.
 */
export function ScrollProgressSegments({
  count,
  progress,
  className,
}: ScrollProgressSegmentsProps) {
  return (
    <div className={cn("flex items-center gap-1.5", className)}>
      {Array.from({ length: count }, (_, i) => (
        <Segment key={i} index={i} count={count} progress={progress} />
      ))}
    </div>
  );
}

function Segment({
  index,
  count,
  progress,
}: {
  index: number;
  count: number;
  progress: MotionValue<number>;
}) {
  const segmentStart = index / count;
  const segmentEnd = (index + 1) / count;

  const scaleX = useTransform(progress, [segmentStart, segmentEnd], [0, 1]);

  return (
    <div className="relative h-0.5 flex-1 overflow-hidden rounded-full bg-white/10">
      <m.div
        className="absolute inset-0 origin-left rounded-full bg-white/60"
        style={{ scaleX }}
      />
    </div>
  );
}
