"use client";

import { useEffect, useRef, useState } from "react";
import { motion as m, useInView } from "motion/react";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { motion as motionPresets } from "@/lib/constants";

interface StatItemProps {
  value: number;
  suffix: string;
  label: string;
  delay: number;
}

function AnimatedStat({ value, suffix, label, delay }: StatItemProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    const timer = setTimeout(() => {
      const duration = 2000;
      const steps = 60;
      const stepValue = value / steps;
      let current = 0;
      let step = 0;

      const interval = setInterval(() => {
        step++;
        // Ease-out curve
        const progress = 1 - Math.pow(1 - step / steps, 3);
        current = Math.round(progress * value);
        setDisplayValue(current);

        if (step >= steps) {
          setDisplayValue(value);
          clearInterval(interval);
        }
      }, duration / steps);

      return () => clearInterval(interval);
    }, delay * 1000);

    return () => clearTimeout(timer);
  }, [isInView, value, delay]);

  return (
    <div ref={ref} className="text-center">
      <div className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
        <span>{displayValue}</span>
        <span className="text-gradient">{suffix}</span>
      </div>
      <p className="mt-2 font-mono text-xs uppercase tracking-[0.2em] text-[var(--text-tertiary)]">
        {label}
      </p>
    </div>
  );
}

const stats = [
  { value: 50, suffix: "+", label: "Projects Delivered" },
  { value: 3, suffix: "x", label: "Average Traffic Growth" },
  { value: 98, suffix: "%", label: "Client Satisfaction" },
  { value: 24, suffix: "/7", label: "Ongoing Support" },
];

export function StatsBar() {
  return (
    <section className="relative border-y border-[var(--surface-border)] bg-[var(--surface-secondary)]/30 py-20 md:py-24">
      {/* Subtle glow */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(124, 107, 240, 0.05) 0%, transparent 70%)",
        }}
      />

      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-12">
          {stats.map((stat, i) => (
            <ScrollReveal key={stat.label} delay={i * 0.1}>
              <AnimatedStat
                value={stat.value}
                suffix={stat.suffix}
                label={stat.label}
                delay={i * 0.15}
              />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
