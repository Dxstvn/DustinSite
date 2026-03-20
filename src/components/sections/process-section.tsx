"use client";

import { useEffect, useRef, useState } from "react";
import { motion as m, AnimatePresence, useInView } from "motion/react";
import Image from "next/image";
import { ScrollReveal } from "@/components/shared/scroll-reveal";

import { Compass, Target, Rocket, TrendingUp } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Discovery",
    description:
      "We dive deep into your brand, audience, and goals. Through research and conversation, we build a strategic foundation that ensures every decision is informed.",
    icon: Compass,
    accent: "#3b82f6",
    accentBg: "rgba(59, 130, 246, 0.1)",
    imageSrc: "/images/process/discovery.png",
  },
  {
    number: "02",
    title: "Strategy",
    description:
      "We craft a custom plan combining web, SEO, and social media into a unified approach. No cookie-cutter solutions — every strategy is built for your specific growth trajectory.",
    icon: Target,
    accent: "#7c6bf0",
    accentBg: "rgba(124, 107, 240, 0.1)",
    imageSrc: "/images/process/strategy.png",
  },
  {
    number: "03",
    title: "Execution",
    description:
      "Our team builds, optimizes, and launches with obsessive attention to detail. We don't just deliver — we craft experiences that leave lasting impressions.",
    icon: Rocket,
    accent: "#22c55e",
    accentBg: "rgba(34, 197, 94, 0.1)",
    imageSrc: "/images/process/execution.png",
  },
  {
    number: "04",
    title: "Growth",
    description:
      "We monitor, iterate, and scale what works. Continuous optimization means your digital presence compounds over time, driving results long after launch.",
    icon: TrendingUp,
    accent: "#f97316",
    accentBg: "rgba(249, 115, 22, 0.1)",
    imageSrc: "/images/process/growth.png",
  },
];

function StepIndicator({
  step,
  isActive,
}: {
  step: (typeof steps)[0];
  isActive: boolean;
}) {
  return (
    <m.div
      className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-3xl border border-[var(--surface-border)]"
      animate={{
        borderColor: isActive ? step.accent : "var(--surface-border)",
        boxShadow: isActive
          ? `0 0 40px -10px ${step.accent}`
          : "0 0 0px transparent",
      }}
      transition={{ duration: 0.5 }}
    >
      {/* Background image with crossfade */}
      <AnimatePresence mode="sync">
        <m.div
          key={step.imageSrc}
          className="absolute inset-0"
          initial={{ opacity: 0, scale: 1.02 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
        >
          <Image
            src={step.imageSrc}
            alt={step.title}
            fill
            sizes="(min-width: 768px) 45vw, 100vw"
            className="object-cover"
            priority
          />
          {/* Color tint overlay matching step accent */}
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(to bottom, ${step.accent}33 0%, ${step.accent}1a 40%, rgba(10, 10, 10, 0.85) 100%)`,
            }}
          />
          {/* Base darkening overlay */}
          <div className="absolute inset-0 bg-black/15" />
        </m.div>
      </AnimatePresence>
    </m.div>
  );
}

function ProcessStep({
  step,
  index,
  onInView,
}: {
  step: (typeof steps)[0];
  index: number;
  onInView: (index: number) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, {
    margin: "-40% 0px -40% 0px",
  });

  useEffect(() => {
    if (isInView) {
      onInView(index);
    }
  }, [isInView, onInView, index]);

  return (
    <div
      ref={ref}
      className="flex min-h-[70vh] flex-col justify-center py-16 md:min-h-screen md:py-24"
    >
      <span
        className="mb-4 font-mono text-xs font-medium tracking-[0.2em]"
        style={{ color: step.accent }}
      >
        {step.number}
      </span>
      <h3 className="text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
        {step.title}
      </h3>
      <p className="mt-4 max-w-md text-base leading-relaxed text-[var(--text-secondary)] md:text-lg">
        {step.description}
      </p>
    </div>
  );
}

export function ProcessSection() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section data-section-id="process" className="py-24 md:py-32 lg:py-40">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-[var(--text-tertiary)]">
            How we work
          </p>
          <h2 className="max-w-lg text-3xl font-bold tracking-tight md:text-4xl">
            A process built for results
          </h2>
        </ScrollReveal>

        {/* Desktop: two-column sticky layout */}
        <div className="mt-16 hidden gap-16 md:flex">
          {/* Left: scrollable steps */}
          <div className="w-[55%]">
            {steps.map((step, i) => (
              <ProcessStep
                key={step.number}
                step={step}
                index={i}
                onInView={setActiveStep}
              />
            ))}
          </div>

          {/* Right: sticky visual */}
          <div className="w-[45%]">
            <div className="sticky top-[20%] h-[60vh]">
              <StepIndicator step={steps[activeStep]} isActive />
            </div>
          </div>
        </div>

        {/* Mobile: simple stack */}
        <div className="mt-12 space-y-12 md:hidden">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <ScrollReveal key={step.number} delay={i * 0.1}>
                <div className="overflow-hidden rounded-2xl border border-[var(--surface-border)] bg-[var(--surface-secondary)]">
                  {/* Mobile step image */}
                  <div className="relative h-40 w-full">
                    <Image
                      src={step.imageSrc}
                      alt={step.title}
                      fill
                      sizes="100vw"
                      className="object-cover"
                    />
                    <div
                      className="absolute inset-0"
                      style={{
                        background: `linear-gradient(to bottom, ${step.accent}26 0%, rgba(10, 10, 10, 0.7) 100%)`,
                      }}
                    />
                    <div className="absolute bottom-3 left-4 flex items-center gap-2">
                      <div
                        className="flex size-8 items-center justify-center rounded-lg backdrop-blur-sm"
                        style={{ backgroundColor: `${step.accent}33` }}
                      >
                        <Icon
                          className="size-4"
                          style={{ color: step.accent }}
                        />
                      </div>
                      <span
                        className="font-mono text-xs font-medium tracking-[0.2em]"
                        style={{ color: step.accent }}
                      >
                        {step.number}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold tracking-tight">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">
                      {step.description}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
