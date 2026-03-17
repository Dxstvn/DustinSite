"use client";

import { cn } from "@/lib/utils";
import { ScrollReveal } from "./scroll-reveal";

interface SectionHeadingProps {
  label?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({
  label,
  title,
  description,
  align = "center",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "mb-16 md:mb-20",
        align === "center" && "text-center",
        className
      )}
    >
      {label && (
        <ScrollReveal>
          <span className="mb-4 inline-block font-mono text-xs font-medium uppercase tracking-[0.2em] text-[var(--text-tertiary)]">
            {label}
          </span>
        </ScrollReveal>
      )}
      <ScrollReveal delay={0.1}>
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
          {title}
        </h2>
      </ScrollReveal>
      {description && (
        <ScrollReveal delay={0.2}>
          <p
            className={cn(
              "mt-4 text-lg text-[var(--text-secondary)] md:text-xl",
              align === "center" && "mx-auto max-w-2xl"
            )}
          >
            {description}
          </p>
        </ScrollReveal>
      )}
    </div>
  );
}
