"use client";

import { motion as m } from "motion/react";
import { cn } from "@/lib/utils";
import { SectionHeading } from "@/components/shared/section-heading";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { motion as motionPresets } from "@/lib/constants";
import { Compass, Target, Rocket, TrendingUp } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Discovery",
    description:
      "We dive deep into your brand, audience, and goals. Through research and conversation, we build a strategic foundation that ensures every decision is informed.",
    icon: Compass,
    accent: "var(--accent-blue)",
  },
  {
    number: "02",
    title: "Strategy",
    description:
      "We craft a custom plan combining web, SEO, and social media into a unified approach. No cookie-cutter solutions — every strategy is built for your specific growth trajectory.",
    icon: Target,
    accent: "var(--primary)",
  },
  {
    number: "03",
    title: "Execution",
    description:
      "Our team builds, optimizes, and launches with obsessive attention to detail. We don't just deliver — we craft experiences that leave lasting impressions.",
    icon: Rocket,
    accent: "var(--accent-green)",
  },
  {
    number: "04",
    title: "Growth",
    description:
      "We monitor, iterate, and scale what works. Continuous optimization means your digital presence compounds over time, driving results long after launch.",
    icon: TrendingUp,
    accent: "var(--accent-orange)",
  },
];

export function ProcessSection() {
  return (
    <section className="py-24 md:py-32 lg:py-40">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label="How we work"
          title="A process built for results"
          description="Four phases that take your brand from concept to measurable growth."
        />

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-8 top-0 hidden h-full w-px bg-gradient-to-b from-transparent via-[var(--surface-border)] to-transparent md:left-1/2 md:block" />

          <div className="space-y-12 md:space-y-24">
            {steps.map((step, i) => {
              const Icon = step.icon;
              const isEven = i % 2 === 0;

              return (
                <ScrollReveal
                  key={step.number}
                  delay={i * 0.1}
                  direction={isEven ? "left" : "right"}
                >
                  <div
                    className={cn(
                      "relative flex flex-col gap-8 md:flex-row md:items-center",
                      !isEven && "md:flex-row-reverse"
                    )}
                  >
                    {/* Content side */}
                    <div
                      className={cn(
                        "flex-1",
                        isEven ? "md:pr-16 md:text-right" : "md:pl-16"
                      )}
                    >
                      <span
                        className="mb-3 inline-block font-mono text-xs font-medium tracking-[0.2em]"
                        style={{ color: step.accent }}
                      >
                        {step.number}
                      </span>
                      <h3 className="text-2xl font-bold tracking-tight md:text-3xl">
                        {step.title}
                      </h3>
                      <p className="mt-3 text-sm leading-relaxed text-[var(--text-secondary)] md:text-base">
                        {step.description}
                      </p>
                    </div>

                    {/* Center node */}
                    <div className="relative hidden md:flex md:items-center md:justify-center">
                      <m.div
                        whileInView={{ scale: [0.8, 1] }}
                        viewport={{ once: true }}
                        className="relative z-10 flex size-14 items-center justify-center rounded-2xl border border-[var(--surface-border)] bg-[var(--surface-secondary)]"
                      >
                        <Icon
                          className="size-5"
                          style={{ color: step.accent }}
                        />
                        {/* Glow ring */}
                        <div
                          className="absolute inset-0 -z-10 rounded-2xl opacity-20 blur-xl"
                          style={{ background: step.accent }}
                        />
                      </m.div>
                    </div>

                    {/* Empty space for alignment */}
                    <div className="hidden flex-1 md:block" />
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
