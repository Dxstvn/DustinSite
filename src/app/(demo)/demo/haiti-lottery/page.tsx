"use client";

import { motion as m, useInView, AnimatePresence } from "motion/react";
import { useRef, useEffect, useState, type ReactNode } from "react";

// ─── Design Tokens ──────────────────────────────────────────────────────────
const C = {
  bg: "#0A1628",
  bgAlt: "#0D1B2E",
  surface: "rgba(255,255,255,0.04)",
  surfaceBorder: "rgba(255,255,255,0.08)",
  blue: "#0D47A1",
  blueLight: "#1565C0",
  gold: "#D4AF37",
  goldLight: "#E8C84A",
  goldDark: "#B8941E",
  red: "#C62828",
  redLight: "#E53935",
  textPrimary: "#E8EDF5",
  textSecondary: "rgba(232,237,245,0.6)",
  textMuted: "rgba(232,237,245,0.4)",
} as const;

// ─── Drapo Pattern SVG (diamond/cross motif) ────────────────────────────────
const DRAPO_PATTERN = `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23D4AF37' fill-opacity='0.04'%3E%3Cpath d='M20 0L24 4L20 8L16 4Z'/%3E%3Cpath d='M0 20L4 16L8 20L4 24Z'/%3E%3Cpath d='M40 20L36 16L32 20L36 24Z'/%3E%3Cpath d='M20 32L24 36L20 40L16 36Z'/%3E%3Cpath d='M20 16L24 20L20 24L16 20Z' fill-opacity='0.06'/%3E%3C/g%3E%3C/svg%3E")`;

// ─── Utility: Animated Counter ──────────────────────────────────────────────
function AnimatedCounter({
  value,
  duration = 2,
  prefix = "",
  suffix = "",
}: {
  value: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const start = performance.now();
    const animate = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(eased * value));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [isInView, value, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {display.toLocaleString()}
      {suffix}
    </span>
  );
}

// ─── Glass Card ─────────────────────────────────────────────────────────────
function GlassCard({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl border backdrop-blur-sm ${className}`}
      style={{
        background: C.surface,
        borderColor: C.surfaceBorder,
      }}
    >
      {children}
    </div>
  );
}

// ─── Fade Up ────────────────────────────────────────────────────────────────
function FadeUp({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <m.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
    >
      {children}
    </m.div>
  );
}

// ─── Lottery Ball ───────────────────────────────────────────────────────────
function LotteryBall({
  number,
  size = 64,
  delay = 0,
  color,
}: {
  number: number;
  size?: number;
  delay?: number;
  color: string;
}) {
  return (
    <m.div
      initial={{ scale: 0, rotate: -180 }}
      whileInView={{ scale: 1, rotate: 0 }}
      viewport={{ once: true }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 15,
        delay,
      }}
      className="relative flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      {/* Outer glow */}
      <div
        className="absolute inset-0 rounded-full opacity-30 blur-md"
        style={{ background: color }}
        aria-hidden="true"
      />
      {/* Ball */}
      <div
        className="relative flex items-center justify-center rounded-full"
        style={{
          width: size,
          height: size,
          background: `radial-gradient(circle at 35% 30%, ${color}ee, ${color}99 60%, ${color}66)`,
          boxShadow: `0 4px 20px ${color}40, inset 0 -4px 12px rgba(0,0,0,0.3), inset 0 4px 8px rgba(255,255,255,0.2)`,
        }}
      >
        {/* Inner highlight */}
        <div
          className="absolute rounded-full"
          style={{
            width: size * 0.3,
            height: size * 0.2,
            top: size * 0.15,
            left: size * 0.2,
            background: "rgba(255,255,255,0.35)",
            filter: "blur(3px)",
          }}
          aria-hidden="true"
        />
        <span
          className="relative z-10 font-bold text-white"
          style={{
            fontSize: size * 0.38,
            fontFamily: "'JetBrains Mono', monospace",
            textShadow: "0 1px 3px rgba(0,0,0,0.3)",
          }}
        >
          {number}
        </span>
      </div>
    </m.div>
  );
}

// ─── Countdown Timer ────────────────────────────────────────────────────────
function CountdownTimer() {
  const [time, setTime] = useState({ d: 2, h: 14, m: 32, s: 9 });

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prev) => {
        let { d, h, m, s } = prev;
        s -= 1;
        if (s < 0) {
          s = 59;
          m -= 1;
        }
        if (m < 0) {
          m = 59;
          h -= 1;
        }
        if (h < 0) {
          h = 23;
          d -= 1;
        }
        if (d < 0) d = 0;
        return { d, h, m, s };
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const segments = [
    { value: time.d, label: "jou" },
    { value: time.h, label: "èdtan" },
    { value: time.m, label: "minit" },
    { value: time.s, label: "segonn" },
  ];

  return (
    <div className="flex items-center gap-2 md:gap-3">
      {segments.map((seg, i) => (
        <div key={seg.label} className="flex items-center gap-2 md:gap-3">
          <div className="flex flex-col items-center">
            <div
              className="flex items-center justify-center rounded-lg px-3 py-2 md:px-4 md:py-3"
              style={{
                background: "rgba(255,255,255,0.06)",
                border: `1px solid ${C.gold}30`,
              }}
            >
              <AnimatePresence mode="popLayout">
                <m.span
                  key={seg.value}
                  initial={{ y: -10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 10, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="block text-xl font-bold tabular-nums md:text-3xl"
                  style={{
                    color: C.gold,
                    fontFamily: "'JetBrains Mono', monospace",
                  }}
                >
                  {String(seg.value).padStart(2, "0")}
                </m.span>
              </AnimatePresence>
            </div>
            <span
              className="mt-1.5 text-[10px] uppercase tracking-wider md:text-xs"
              style={{ color: C.textMuted }}
            >
              {seg.label}
            </span>
          </div>
          {i < segments.length - 1 && (
            <span
              className="mb-5 text-xl font-bold md:text-2xl"
              style={{ color: `${C.gold}60` }}
            >
              :
            </span>
          )}
        </div>
      ))}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// SECTION 1: HERO / JACKPOT DISPLAY
// ═══════════════════════════════════════════════════════════════════════════
function HeroSection() {
  const ballColors = [C.blue, C.red, C.gold, C.blueLight, C.redLight, "#7B1FA2"];
  const heroBalls = [7, 23, 42, 15, 38, 9];

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 py-20">
      {/* Drapo pattern background */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{ backgroundImage: DRAPO_PATTERN }}
        aria-hidden="true"
      />

      {/* Ambient glows */}
      <div
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 size-[600px] rounded-full opacity-[0.08] blur-[150px]"
        style={{ background: C.gold }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-0 left-1/4 size-[400px] rounded-full opacity-[0.06] blur-[120px]"
        style={{ background: C.blue }}
        aria-hidden="true"
      />

      {/* Floating lottery balls — decorative */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        {heroBalls.map((num, i) => {
          const positions = [
            { top: "8%", left: "10%", ballSize: 44 },
            { top: "15%", right: "12%", ballSize: 52 },
            { top: "55%", left: "5%", ballSize: 38 },
            { top: "65%", right: "8%", ballSize: 48 },
            { bottom: "15%", left: "15%", ballSize: 42 },
            { bottom: "20%", right: "15%", ballSize: 36 },
          ];
          const { ballSize, ...cssPos } = positions[i];
          return (
            <m.div
              key={i}
              className="absolute hidden md:block"
              style={cssPos}
              animate={{
                y: [0, -12, 0, 8, 0],
                rotate: [0, 5, -3, 2, 0],
              }}
              transition={{
                duration: 6 + i * 0.8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <LotteryBall
                number={num}
                size={ballSize}
                delay={0.5 + i * 0.15}
                color={ballColors[i]}
              />
            </m.div>
          );
        })}
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center">
        {/* Logo/Badge */}
        <m.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="mb-6 flex items-center gap-2"
        >
          <div
            className="flex size-10 items-center justify-center rounded-xl"
            style={{
              background: `linear-gradient(135deg, ${C.gold}, ${C.goldDark})`,
              boxShadow: `0 4px 20px ${C.gold}40`,
            }}
          >
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              <path
                d="M11 1L13.5 8.5L21 11L13.5 13.5L11 21L8.5 13.5L1 11L8.5 8.5L11 1Z"
                fill="white"
              />
            </svg>
          </div>
          <span
            className="text-xs font-bold uppercase tracking-[0.2em]"
            style={{ color: C.gold }}
          >
            Repiblik d&apos;Ayiti
          </span>
        </m.div>

        {/* Title */}
        <m.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl font-black uppercase tracking-tight md:text-7xl lg:text-8xl"
          style={{
            fontFamily: "'Cabinet Grotesk', 'Inter', sans-serif",
            background: `linear-gradient(135deg, ${C.gold} 0%, ${C.goldLight} 40%, ${C.gold} 60%, ${C.goldDark} 100%)`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            filter: `drop-shadow(0 2px 20px ${C.gold}40)`,
          }}
        >
          Lotri Ayiti
        </m.h1>

        <m.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-2 text-sm uppercase tracking-[0.3em] md:text-base"
          style={{ color: C.textSecondary }}
        >
          Ayiti Grandeur &middot; Lotri Nasyonal
        </m.p>

        {/* Decorative line */}
        <m.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="my-8 h-px w-32"
          style={{
            background: `linear-gradient(to right, transparent, ${C.gold}, transparent)`,
          }}
        />

        {/* Jackpot */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
        >
          <p
            className="text-xs font-medium uppercase tracking-[0.2em]"
            style={{ color: C.textMuted }}
          >
            Gwo Lo Aktyèl
          </p>
          <p
            className="mt-3 text-4xl font-black tabular-nums tracking-tight md:text-6xl lg:text-7xl"
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              color: C.textPrimary,
              textShadow: `0 0 40px ${C.gold}20`,
            }}
          >
            <span style={{ color: C.gold }}>₲</span>{" "}
            <AnimatedCounter value={25000000} duration={2.5} />
          </p>
          <p
            className="mt-1 text-sm"
            style={{ color: C.textSecondary }}
          >
            Vennsenk milyon goud
          </p>
        </m.div>

        {/* Countdown */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.8 }}
          className="mt-10"
        >
          <p
            className="mb-4 text-center text-xs font-medium uppercase tracking-[0.2em]"
            style={{ color: C.textMuted }}
          >
            Pwochen Tiraj
          </p>
          <CountdownTimer />
        </m.div>

        {/* CTA */}
        <m.button
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="mt-10 flex min-h-12 items-center gap-2.5 rounded-xl px-8 py-3.5 text-sm font-bold uppercase tracking-wider text-white"
          style={{
            background: `linear-gradient(135deg, ${C.gold}, ${C.goldDark})`,
            boxShadow: `0 4px 24px ${C.gold}40, 0 0 0 1px ${C.gold}40`,
          }}
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <rect x="2" y="4" width="14" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
            <path d="M2 7H16" stroke="currentColor" strokeWidth="1.5" />
            <circle cx="9" cy="11" r="1.5" fill="currentColor" />
          </svg>
          Achte Tikè
        </m.button>

        {/* Scroll indicator */}
        <m.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="mt-16"
        >
          <m.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <svg width="20" height="12" viewBox="0 0 20 12" fill="none">
              <path
                d="M1 1L10 10L19 1"
                stroke={C.gold}
                strokeWidth="1"
                strokeOpacity="0.4"
                strokeLinecap="round"
              />
            </svg>
          </m.div>
        </m.div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// SECTION 2: TICKET PICKER / NUMBER SELECTION
// ═══════════════════════════════════════════════════════════════════════════

function DrumColumn({ value, index }: { value: number; index: number }) {
  return (
    <m.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
      className="flex flex-col items-center"
    >
      {/* Numbers above (faded) */}
      <div className="space-y-1 overflow-hidden" style={{ height: 52 }}>
        {[(value - 2 + 10) % 10, (value - 1 + 10) % 10].map((n, i) => (
          <div
            key={`above-${i}`}
            className="flex h-6 items-center justify-center text-base tabular-nums"
            style={{
              color: C.textMuted,
              opacity: i === 0 ? 0.2 : 0.4,
              fontFamily: "'JetBrains Mono', monospace",
            }}
          >
            {n}
          </div>
        ))}
      </div>

      {/* Selected number */}
      <div
        className="relative flex items-center justify-center rounded-xl"
        style={{
          width: 48,
          height: 56,
          background: "rgba(255,255,255,0.06)",
          border: `2px solid ${C.gold}`,
          boxShadow: `0 0 20px ${C.gold}30, inset 0 0 15px ${C.gold}10`,
        }}
      >
        <span
          className="text-2xl font-bold tabular-nums md:text-3xl"
          style={{
            color: C.gold,
            fontFamily: "'JetBrains Mono', monospace",
            textShadow: `0 0 10px ${C.gold}60`,
          }}
        >
          {value}
        </span>
      </div>

      {/* Numbers below (faded) */}
      <div className="space-y-1 overflow-hidden" style={{ height: 52 }}>
        {[(value + 1) % 10, (value + 2) % 10].map((n, i) => (
          <div
            key={`below-${i}`}
            className="flex h-6 items-center justify-center text-base tabular-nums"
            style={{
              color: C.textMuted,
              opacity: i === 0 ? 0.4 : 0.2,
              fontFamily: "'JetBrains Mono', monospace",
            }}
          >
            {n}
          </div>
        ))}
      </div>
    </m.div>
  );
}

function TicketPickerSection() {
  const selectedNumbers = [3, 7, 1, 9, 4, 2];
  const [activeSeries, setActiveSeries] = useState(0);

  return (
    <section className="relative overflow-hidden py-16 md:py-24">
      {/* Subtle drapo overlay */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{ backgroundImage: DRAPO_PATTERN }}
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-4xl px-4">
        <FadeUp>
          <div className="mb-10 text-center">
            <p
              className="text-xs font-medium uppercase tracking-[0.2em]"
              style={{ color: C.gold }}
            >
              Chwazi Nimewo
            </p>
            <h2
              className="mt-2 text-2xl font-bold md:text-3xl lg:text-4xl"
              style={{ color: C.textPrimary }}
            >
              Seleksyone 6 Chif Ou
            </h2>
            <p className="mt-2 text-sm" style={{ color: C.textSecondary }}>
              Chwazi nimewo pou pwochen tiraj la oswa kite sistèm nan chwazi pou ou
            </p>
          </div>
        </FadeUp>

        {/* Series selector */}
        <FadeUp delay={0.1}>
          <div className="mb-8 flex justify-center gap-3">
            {["Seri 1", "Seri 2"].map((label, i) => (
              <button
                key={label}
                onClick={() => setActiveSeries(i)}
                className="min-h-11 rounded-lg px-6 py-2.5 text-sm font-semibold transition-all duration-200"
                style={{
                  background:
                    activeSeries === i
                      ? `linear-gradient(135deg, ${C.blue}, ${C.blueLight})`
                      : "rgba(255,255,255,0.04)",
                  color: activeSeries === i ? "white" : C.textSecondary,
                  border: `1px solid ${activeSeries === i ? C.blue : C.surfaceBorder}`,
                  boxShadow:
                    activeSeries === i ? `0 4px 16px ${C.blue}40` : "none",
                }}
              >
                {label}
              </button>
            ))}
          </div>
        </FadeUp>

        {/* Drum columns */}
        <FadeUp delay={0.2}>
          <GlassCard className="p-6 md:p-8">
            <div className="flex items-center justify-center gap-3 md:gap-5">
              {selectedNumbers.map((num, i) => (
                <DrumColumn key={i} value={num} index={i} />
              ))}
            </div>

            {/* Quick pick button */}
            <div className="mt-8 flex justify-center">
              <m.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="flex min-h-11 items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold"
                style={{
                  background: "rgba(255,255,255,0.06)",
                  color: C.textSecondary,
                  border: `1px solid ${C.surfaceBorder}`,
                }}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <rect x="1" y="1" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.2" />
                  <rect x="10" y="1" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.2" />
                  <rect x="1" y="10" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.2" />
                  <rect x="10" y="10" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.2" />
                  <circle cx="3.5" cy="3.5" r="0.8" fill="currentColor" />
                  <circle cx="12.5" cy="3.5" r="0.8" fill="currentColor" />
                  <circle cx="12.5" cy="12.5" r="0.8" fill="currentColor" />
                  <circle cx="10.5" cy="12.5" r="0.8" fill="currentColor" />
                  <circle cx="14.5" cy="12.5" r="0.8" fill="currentColor" />
                  <circle cx="3.5" cy="12.5" r="0.8" fill="currentColor" />
                  <circle cx="12.5" cy="5.5" r="0.8" fill="currentColor" />
                  <circle cx="10.5" cy="3.5" r="0.8" fill="currentColor" />
                </svg>
                Chwazi Otomatik
              </m.button>
            </div>
          </GlassCard>
        </FadeUp>

        {/* Ticket Preview Card */}
        <FadeUp delay={0.3} className="mt-8">
          <div
            className="relative mx-auto max-w-md overflow-hidden rounded-2xl"
            style={{
              background: `linear-gradient(135deg, ${C.bg} 0%, #0F2035 100%)`,
              border: `2px solid ${C.gold}40`,
              boxShadow: `0 8px 40px rgba(0,0,0,0.4), 0 0 0 1px ${C.gold}15`,
            }}
          >
            {/* Guilloche-style border pattern (top strip) */}
            <div
              className="h-2"
              style={{
                background: `repeating-linear-gradient(90deg, ${C.gold}40 0px, ${C.gold}40 2px, transparent 2px, transparent 8px)`,
              }}
              aria-hidden="true"
            />

            <div className="p-6 md:p-8">
              {/* Header */}
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <p
                    className="text-[10px] font-bold uppercase tracking-[0.3em]"
                    style={{ color: C.gold }}
                  >
                    Lotri Ayiti
                  </p>
                  <p
                    className="text-[10px] uppercase tracking-wider"
                    style={{ color: C.textMuted }}
                  >
                    Tikè Ofisyèl
                  </p>
                </div>
                <div
                  className="flex size-8 items-center justify-center rounded-lg"
                  style={{
                    background: `linear-gradient(135deg, ${C.gold}, ${C.goldDark})`,
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M8 1L10 6L15 8L10 10L8 15L6 10L1 8L6 6L8 1Z"
                      fill="white"
                    />
                  </svg>
                </div>
              </div>

              {/* Numbers */}
              <div className="flex justify-center gap-2.5">
                {selectedNumbers.map((num, i) => (
                  <m.div
                    key={i}
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      type: "spring",
                      stiffness: 250,
                      damping: 12,
                      delay: 0.5 + i * 0.08,
                    }}
                    className="flex items-center justify-center rounded-lg"
                    style={{
                      width: 44,
                      height: 52,
                      background: `linear-gradient(180deg, ${C.gold}20 0%, ${C.gold}08 100%)`,
                      border: `1px solid ${C.gold}40`,
                    }}
                  >
                    <span
                      className="text-xl font-bold tabular-nums"
                      style={{
                        color: C.gold,
                        fontFamily: "'JetBrains Mono', monospace",
                      }}
                    >
                      {num}
                    </span>
                  </m.div>
                ))}
              </div>

              {/* Ticket details */}
              <div
                className="mt-6 flex items-center justify-between border-t pt-4 text-[11px]"
                style={{ borderColor: `${C.gold}15` }}
              >
                <div>
                  <span style={{ color: C.textMuted }}>Seri:</span>{" "}
                  <span style={{ color: C.textSecondary }}>
                    {activeSeries === 0 ? "Seri 1" : "Seri 2"}
                  </span>
                </div>
                <div>
                  <span style={{ color: C.textMuted }}>Pri:</span>{" "}
                  <span
                    className="font-bold tabular-nums"
                    style={{
                      color: C.gold,
                      fontFamily: "'JetBrains Mono', monospace",
                    }}
                  >
                    ₲ 100
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom guilloche strip */}
            <div
              className="h-2"
              style={{
                background: `repeating-linear-gradient(90deg, ${C.gold}40 0px, ${C.gold}40 2px, transparent 2px, transparent 8px)`,
              }}
              aria-hidden="true"
            />
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// SECTION 3: WINNING NUMBERS REVEAL
// ═══════════════════════════════════════════════════════════════════════════
function WinningNumbersSection() {
  const winningNumbers = [8, 14, 27, 33, 41, 5];
  const ballColors = [C.red, C.blue, C.gold, C.redLight, C.blueLight, "#7B1FA2"];

  const prizeTiers = [
    { match: "6/6 Nimewo", prize: "₲ 25,000,000", label: "Gwo Lo", highlight: true },
    { match: "5/6 Nimewo", prize: "₲ 500,000", label: "Dezyèm Pri", highlight: false },
    { match: "4/6 Nimewo", prize: "₲ 25,000", label: "Twazyèm Pri", highlight: false },
    { match: "3/6 Nimewo", prize: "₲ 1,000", label: "Katriyèm Pri", highlight: false },
  ];

  return (
    <section className="relative overflow-hidden py-16 md:py-24">
      {/* Celebration sparkle effects (CSS only) */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        {Array.from({ length: 20 }).map((_, i) => (
          <m.div
            key={i}
            className="absolute size-1 rounded-full"
            style={{
              background: i % 3 === 0 ? C.gold : i % 3 === 1 ? C.red : C.blue,
              left: `${5 + Math.random() * 90}%`,
              top: `${5 + Math.random() * 90}%`,
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1.5, 0],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="relative z-10 mx-auto max-w-4xl px-4">
        <FadeUp>
          <div className="mb-12 text-center">
            <p
              className="text-xs font-medium uppercase tracking-[0.2em]"
              style={{ color: C.gold }}
            >
              Rezilta
            </p>
            <h2
              className="mt-2 text-2xl font-bold md:text-3xl lg:text-4xl"
              style={{ color: C.textPrimary }}
            >
              Rezilta Dènye Tiraj
            </h2>
            <p className="mt-2 text-sm" style={{ color: C.textSecondary }}>
              Tiraj 28 Mas 2026 &middot; 8:00 PM
            </p>
          </div>
        </FadeUp>

        {/* Winning balls */}
        <FadeUp delay={0.1}>
          <GlassCard className="p-8 md:p-10">
            <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
              {winningNumbers.map((num, i) => (
                <LotteryBall
                  key={i}
                  number={num}
                  size={72}
                  delay={0.3 + i * 0.15}
                  color={ballColors[i]}
                />
              ))}
            </div>

            {/* Draw info */}
            <div
              className="mx-auto mt-8 flex max-w-sm items-center justify-between rounded-lg px-4 py-3"
              style={{ background: "rgba(255,255,255,0.03)" }}
            >
              <div className="text-center">
                <p
                  className="text-[10px] uppercase tracking-wider"
                  style={{ color: C.textMuted }}
                >
                  Dat Tiraj
                </p>
                <p
                  className="text-sm font-semibold"
                  style={{ color: C.textPrimary }}
                >
                  28 Mas 2026
                </p>
              </div>
              <div
                className="h-8 w-px"
                style={{ background: C.surfaceBorder }}
              />
              <div className="text-center">
                <p
                  className="text-[10px] uppercase tracking-wider"
                  style={{ color: C.textMuted }}
                >
                  Nimewo Tiraj
                </p>
                <p
                  className="text-sm font-semibold tabular-nums"
                  style={{
                    color: C.textPrimary,
                    fontFamily: "'JetBrains Mono', monospace",
                  }}
                >
                  #2026-087
                </p>
              </div>
              <div
                className="h-8 w-px"
                style={{ background: C.surfaceBorder }}
              />
              <div className="text-center">
                <p
                  className="text-[10px] uppercase tracking-wider"
                  style={{ color: C.textMuted }}
                >
                  Genyan
                </p>
                <p
                  className="text-sm font-semibold"
                  style={{ color: C.gold }}
                >
                  3 moun
                </p>
              </div>
            </div>
          </GlassCard>
        </FadeUp>

        {/* Prize tiers */}
        <FadeUp delay={0.3} className="mt-6">
          <GlassCard className="overflow-hidden">
            {/* Table header */}
            <div
              className="grid grid-cols-3 gap-4 px-5 py-3 text-[11px] font-semibold uppercase tracking-wider"
              style={{
                background: "rgba(255,255,255,0.03)",
                color: C.textMuted,
                borderBottom: `1px solid ${C.surfaceBorder}`,
              }}
            >
              <span>Nivo</span>
              <span>Kritè</span>
              <span className="text-right">Pri</span>
            </div>

            {/* Prize rows */}
            {prizeTiers.map((tier, i) => (
              <m.div
                key={tier.label}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.5 + i * 0.1 }}
                className="grid grid-cols-3 items-center gap-4 px-5 py-4"
                style={{
                  borderBottom:
                    i < prizeTiers.length - 1
                      ? `1px solid ${C.surfaceBorder}`
                      : "none",
                  background: tier.highlight
                    ? `linear-gradient(to right, ${C.gold}08, transparent)`
                    : "transparent",
                }}
              >
                <div className="flex items-center gap-2">
                  {tier.highlight && (
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill={C.gold}
                    >
                      <path d="M7 0L8.5 5L14 7L8.5 9L7 14L5.5 9L0 7L5.5 5L7 0Z" />
                    </svg>
                  )}
                  <span
                    className="text-sm font-semibold"
                    style={{
                      color: tier.highlight ? C.gold : C.textPrimary,
                    }}
                  >
                    {tier.label}
                  </span>
                </div>
                <span className="text-sm" style={{ color: C.textSecondary }}>
                  {tier.match}
                </span>
                <span
                  className="text-right text-sm font-bold tabular-nums"
                  style={{
                    color: tier.highlight ? C.gold : C.textPrimary,
                    fontFamily: "'JetBrains Mono', monospace",
                    textShadow: tier.highlight
                      ? `0 0 10px ${C.gold}30`
                      : "none",
                  }}
                >
                  {tier.prize}
                </span>
              </m.div>
            ))}
          </GlassCard>
        </FadeUp>

        {/* Previous draws mini */}
        <FadeUp delay={0.4} className="mt-6">
          <GlassCard className="p-5">
            <h3
              className="mb-4 text-sm font-semibold"
              style={{ color: C.textPrimary }}
            >
              Dènye Tiraj yo
            </h3>
            <div className="space-y-3">
              {[
                { date: "21 Mas 2026", numbers: [12, 28, 33, 7, 45, 19], jackpot: "₲ 18,500,000" },
                { date: "14 Mas 2026", numbers: [3, 16, 22, 38, 41, 9], jackpot: "₲ 15,000,000" },
              ].map((draw) => (
                <div
                  key={draw.date}
                  className="flex flex-col gap-3 rounded-lg px-4 py-3 sm:flex-row sm:items-center sm:justify-between"
                  style={{ background: "rgba(255,255,255,0.02)" }}
                >
                  <div>
                    <p className="text-xs" style={{ color: C.textMuted }}>
                      {draw.date}
                    </p>
                    <div className="mt-1.5 flex gap-1.5">
                      {draw.numbers.map((n, i) => (
                        <span
                          key={i}
                          className="flex size-7 items-center justify-center rounded-full text-[11px] font-bold tabular-nums"
                          style={{
                            background: `${ballColors[i]}25`,
                            color: ballColors[i],
                            fontFamily: "'JetBrains Mono', monospace",
                          }}
                        >
                          {n}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px]" style={{ color: C.textMuted }}>
                      Gwo Lo
                    </p>
                    <p
                      className="text-sm font-bold tabular-nums"
                      style={{
                        color: C.gold,
                        fontFamily: "'JetBrains Mono', monospace",
                      }}
                    >
                      {draw.jackpot}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        </FadeUp>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// PAGE
// ═══════════════════════════════════════════════════════════════════════════
export default function HaitiLotteryDemo() {
  return (
    <>
      {/* eslint-disable-next-line @next/next/no-page-custom-font */}
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
        rel="stylesheet"
      />
      <main
        className="min-h-screen"
        style={{
          background: `linear-gradient(180deg, ${C.bg} 0%, ${C.bgAlt} 30%, ${C.bg} 60%, ${C.bgAlt} 100%)`,
          fontFamily: "'Inter', sans-serif",
        }}
      >
        {/* Fixed ambient glow */}
        <div
          className="pointer-events-none fixed inset-0 z-0"
          aria-hidden="true"
        >
          <div
            className="absolute -top-40 left-1/2 -translate-x-1/2 size-[700px] rounded-full opacity-[0.06] blur-[150px]"
            style={{ background: C.gold }}
          />
          <div
            className="absolute top-1/2 -right-32 size-[500px] rounded-full opacity-[0.04] blur-[120px]"
            style={{ background: C.blue }}
          />
          <div
            className="absolute bottom-0 -left-32 size-[400px] rounded-full opacity-[0.03] blur-[100px]"
            style={{ background: C.red }}
          />
        </div>

        {/* Top bar */}
        <header
          className="relative z-10 border-b"
          style={{ borderColor: C.surfaceBorder }}
        >
          <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-6">
            <div className="flex items-center gap-3">
              <div
                className="flex size-9 items-center justify-center rounded-xl"
                style={{
                  background: `linear-gradient(135deg, ${C.gold}, ${C.goldDark})`,
                  boxShadow: `0 2px 12px ${C.gold}30`,
                }}
              >
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path
                    d="M9 1L11 6.5L17 9L11 11.5L9 17L7 11.5L1 9L7 6.5L9 1Z"
                    fill="white"
                  />
                </svg>
              </div>
              <div>
                <h1
                  className="text-sm font-bold"
                  style={{ color: C.textPrimary }}
                >
                  Lotri Ayiti
                </h1>
                <p className="text-[11px]" style={{ color: C.textMuted }}>
                  Lotri Nasyonal Ofisyèl
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div
                className="hidden items-center gap-4 text-sm sm:flex"
                style={{ color: C.textSecondary }}
              >
                <span className="cursor-pointer transition-colors hover:text-white">
                  Rezilta
                </span>
                <span className="cursor-pointer transition-colors hover:text-white">
                  Kijan pou Jwe
                </span>
              </div>
              <m.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="ml-2 min-h-9 rounded-lg px-4 py-2 text-xs font-bold text-white"
                style={{
                  background: `linear-gradient(135deg, ${C.gold}, ${C.goldDark})`,
                }}
              >
                Achte Tikè
              </m.button>
            </div>
          </div>
        </header>

        {/* Sections */}
        <div className="relative z-10">
          <HeroSection />
          <TicketPickerSection />
          <WinningNumbersSection />
        </div>

        {/* Footer */}
        <footer
          className="relative z-10 border-t py-8"
          style={{ borderColor: C.surfaceBorder }}
        >
          <div className="mx-auto max-w-7xl px-4 text-center md:px-6">
            <div className="mb-4 flex items-center justify-center gap-2">
              <div
                className="flex size-6 items-center justify-center rounded-md"
                style={{ background: `${C.gold}20` }}
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill={C.gold}>
                  <path d="M6 0L7.5 4.5L12 6L7.5 7.5L6 12L4.5 7.5L0 6L4.5 4.5L6 0Z" />
                </svg>
              </div>
              <span
                className="text-xs font-bold uppercase tracking-[0.15em]"
                style={{ color: C.gold }}
              >
                Lotri Ayiti
              </span>
            </div>
            <p className="text-xs" style={{ color: C.textMuted }}>
              &copy; 2026 Lotri Nasyonal Repiblik d&apos;Ayiti. Tout dwa rezève.
            </p>
            <p className="mt-1 text-[11px]" style={{ color: C.textMuted }}>
              Jwe avèk responsablite &middot; 18+ sèlman
            </p>
            <p className="mt-2 text-[11px]" style={{ color: C.textMuted }}>
              Konsepsyon pa{" "}
              <span style={{ color: C.gold }}>Jaspire</span>
            </p>
          </div>
        </footer>
      </main>
    </>
  );
}
