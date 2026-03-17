"use client";

import { type ReactNode } from "react";
import { motion as m } from "motion/react";
import { cn } from "@/lib/utils";
import { motion as motionPresets } from "@/lib/constants";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  duration?: number;
  once?: boolean;
}

const directionOffsets = {
  up: { y: 40, x: 0 },
  down: { y: -40, x: 0 },
  left: { x: 60, y: 0 },
  right: { x: -60, y: 0 },
  none: { x: 0, y: 0 },
};

export function ScrollReveal({
  children,
  className,
  delay = 0,
  direction = "up",
  duration = motionPresets.duration.slower,
  once = true,
}: ScrollRevealProps) {
  const offset = directionOffsets[direction];

  return (
    <m.div
      initial={{ opacity: 0, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once, margin: "-80px" }}
      transition={{
        duration,
        delay,
        ease: motionPresets.ease.outExpo,
      }}
      className={cn(className)}
    >
      {children}
    </m.div>
  );
}
