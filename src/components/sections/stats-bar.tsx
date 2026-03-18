"use client";

import { useRef, useState, useEffect } from "react";
import { useMotionValue, useMotionTemplate, motion as m, useInView } from "motion/react";
import NumberFlow from "@number-flow/react";
import { cn } from "@/lib/utils";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { motion as motionPresets } from "@/lib/constants";

// --- Card Pattern (adapted from EvervaultCard) ---

const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
function generateRandomString(length: number) {
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

function StatCardPattern({
  mouseX,
  mouseY,
  randomString,
  accentFrom,
  accentTo,
  forceVisible,
}: {
  mouseX: ReturnType<typeof useMotionValue<number>>;
  mouseY: ReturnType<typeof useMotionValue<number>>;
  randomString: string;
  accentFrom: string;
  accentTo: string;
  forceVisible?: boolean;
}) {
  const maskImage = useMotionTemplate`radial-gradient(200px at ${mouseX}px ${mouseY}px, white, transparent)`;
  const style = { maskImage, WebkitMaskImage: maskImage };

  return (
    <div className="pointer-events-none">
      <div
        className={cn(
          "absolute inset-0 rounded-2xl [mask-image:linear-gradient(white,transparent)] group-hover/stat:opacity-50",
          forceVisible && "opacity-50"
        )}
      />
      <m.div
        className={cn(
          "absolute inset-0 rounded-2xl opacity-0 backdrop-blur-xl transition duration-500 group-hover/stat:opacity-100",
          forceVisible && "!opacity-100"
        )}
        style={{
          ...style,
          background: `linear-gradient(135deg, ${accentFrom}, ${accentTo})`,
        }}
      />
      <m.div
        className={cn(
          "absolute inset-0 rounded-2xl opacity-0 mix-blend-overlay transition duration-500 group-hover/stat:opacity-100",
          forceVisible && "!opacity-100"
        )}
        style={style}
      >
        <p className="absolute inset-x-0 h-full break-words whitespace-pre-wrap font-mono text-xs font-bold text-white/80 transition duration-500">
          {randomString}
        </p>
      </m.div>
    </div>
  );
}

// --- Stat Card ---

interface StatProps {
  value: number;
  suffix: string;
  label: string;
  delay: number;
  accentFrom: string;
  accentTo: string;
}

function StatCard({
  value,
  suffix,
  label,
  delay,
  accentFrom,
  accentTo,
  sweepTriggered,
}: StatProps & { sweepTriggered: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [displayValue, setDisplayValue] = useState(0);
  const [randomString, setRandomString] = useState("");
  const [isSweeping, setIsSweeping] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    setRandomString(generateRandomString(800));
  }, []);

  useEffect(() => {
    if (!isInView) return;
    const timer = setTimeout(() => setDisplayValue(value), delay * 1000);
    return () => clearTimeout(timer);
  }, [isInView, value, delay]);

  // Entrance sweep animation
  useEffect(() => {
    if (!sweepTriggered || !ref.current) return;

    const el = ref.current;
    const cardWidth = el.offsetWidth;
    const cardHeight = el.offsetHeight;
    const sweepDuration = 800; // ms
    const startTime = performance.now();

    setIsSweeping(true);
    mouseY.set(cardHeight / 2);

    let rafId: number;

    function animate(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / sweepDuration, 1);

      // Ease-out curve for a decelerating sweep
      const eased = 1 - Math.pow(1 - progress, 3);
      mouseX.set(eased * cardWidth);
      setRandomString(generateRandomString(800));

      if (progress < 1) {
        rafId = requestAnimationFrame(animate);
      } else {
        // Sweep complete — reset
        setIsSweeping(false);
        mouseX.set(0);
        mouseY.set(0);
      }
    }

    rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  }, [sweepTriggered, mouseX, mouseY]);

  function onMouseMove(e: React.MouseEvent) {
    const { left, top } = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - left);
    mouseY.set(e.clientY - top);
    setRandomString(generateRandomString(800));
  }

  return (
    <m.div
      ref={ref}
      onMouseMove={onMouseMove}
      className="group/stat relative overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03] p-8 text-center backdrop-blur-sm md:p-10"
      whileHover={{ y: -4 }}
      transition={{
        duration: motionPresets.duration.base,
        ease: motionPresets.ease.outExpo,
      }}
    >
      <StatCardPattern
        mouseX={mouseX}
        mouseY={mouseY}
        randomString={randomString}
        accentFrom={accentFrom}
        accentTo={accentTo}
        forceVisible={isSweeping}
      />

      <div className="relative z-10">
        <div className="flex items-baseline justify-center text-5xl font-bold tracking-tight text-white md:text-6xl lg:text-7xl">
          <NumberFlow
            value={displayValue}
            transformTiming={{ duration: 1200, easing: "cubic-bezier(0.19, 1, 0.22, 1)" }}
            spinTiming={{ duration: 1200, easing: "cubic-bezier(0.19, 1, 0.22, 1)" }}
          />
          <span className="text-gradient ml-0.5">{suffix}</span>
        </div>
        <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--text-tertiary)]">
          {label}
        </p>
      </div>
    </m.div>
  );
}

// --- Stats Bar Section ---

const stats: StatProps[] = [
  {
    value: 50,
    suffix: "+",
    label: "Projects Delivered",
    delay: 0,
    accentFrom: "#7c6bf0",
    accentTo: "#3b82f6",
  },
  {
    value: 3,
    suffix: "x",
    label: "Average Traffic Growth",
    delay: 0.15,
    accentFrom: "#3b82f6",
    accentTo: "#22c55e",
  },
  {
    value: 98,
    suffix: "%",
    label: "Client Satisfaction",
    delay: 0.3,
    accentFrom: "#22c55e",
    accentTo: "#7c6bf0",
  },
  {
    value: 24,
    suffix: "/7",
    label: "Ongoing Support",
    delay: 0.45,
    accentFrom: "#f97316",
    accentTo: "#7c6bf0",
  },
];

export function StatsBar() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const sectionInView = useInView(sectionRef, { once: true, margin: "-50px" });
  const [sweepIndex, setSweepIndex] = useState(-1);

  useEffect(() => {
    if (!sectionInView) return;

    const timers: ReturnType<typeof setTimeout>[] = [];

    stats.forEach((_, i) => {
      timers.push(setTimeout(() => setSweepIndex(i), i * 150));
    });

    // Reset after last card's sweep completes
    timers.push(
      setTimeout(() => setSweepIndex(-1), stats.length * 150 + 800)
    );

    return () => timers.forEach(clearTimeout);
  }, [sectionInView]);

  return (
    <section
      ref={sectionRef}
      data-section-id="stats"
      data-theme="dark"
      className="dark relative bg-[var(--background)] py-24 md:py-32 lg:py-40"
    >
      {/* No top gradient — portfolio section (also dark) precedes directly */}

      {/* Noise texture */}
      <div className="noise absolute inset-0" />

      {/* Subtle glow */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(124, 107, 240, 0.08) 0%, transparent 60%)",
        }}
      />

      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <p className="mb-12 text-center font-mono text-xs uppercase tracking-[0.2em] text-[var(--text-tertiary)]">
            By the Numbers
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          {stats.map((stat, i) => (
            <ScrollReveal key={stat.label} delay={i * 0.1}>
              <StatCard {...stat} sweepTriggered={sweepIndex >= i} />
            </ScrollReveal>
          ))}
        </div>
      </div>

      {/* Gradient transition: dark → light */}
      <div className="absolute -bottom-32 left-0 right-0 h-32 bg-gradient-to-b from-[#0a0a0a] to-[#f5f3f0] md:-bottom-40 md:h-40" />
    </section>
  );
}
