"use client";

import { motion as m, useInView } from "motion/react";
import { useRef, useEffect, useState, type ReactNode } from "react";

// ─── Design Tokens ──────────────────────────────────────────────────────────
const C = {
  bg: "#0A1628",
  surface: "rgba(255,255,255,0.04)",
  surfaceBorder: "rgba(255,255,255,0.08)",
  cobalt: "#0D47A1",
  cobaltLight: "#1565C0",
  vermillion: "#C62828",
  gold: "#D4AF37",
  goldMuted: "rgba(212,175,55,0.15)",
  textPrimary: "#E8EDF5",
  textSecondary: "rgba(232,237,245,0.6)",
  textMuted: "rgba(232,237,245,0.4)",
  positive: "#4CAF50",
  negative: "#EF5350",
} as const;

// ─── Utility: Animated Number ───────────────────────────────────────────────
function AnimatedNumber({
  value,
  suffix = "",
  prefix = "",
  duration = 1.6,
}: {
  value: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
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
      // ease-out cubic
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
  glow,
}: {
  children: ReactNode;
  className?: string;
  glow?: string;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-xl border backdrop-blur-sm ${className}`}
      style={{
        background: C.surface,
        borderColor: C.surfaceBorder,
      }}
    >
      {glow && (
        <div
          className="pointer-events-none absolute -top-12 -right-12 size-32 rounded-full opacity-20 blur-3xl"
          style={{ background: glow }}
          aria-hidden="true"
        />
      )}
      {children}
    </div>
  );
}

// ─── Stagger Wrapper ────────────────────────────────────────────────────────
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
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
    >
      {children}
    </m.div>
  );
}

// ─── Section Heading ────────────────────────────────────────────────────────
function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <FadeUp className="mb-8 md:mb-12">
      <p
        className="text-xs font-medium uppercase tracking-[0.2em]"
        style={{ color: C.gold }}
      >
        {eyebrow}
      </p>
      <h2
        className="mt-2 text-2xl font-bold md:text-3xl lg:text-4xl"
        style={{ color: C.textPrimary, fontFamily: "'Inter', sans-serif" }}
      >
        {title}
      </h2>
      {description && (
        <p
          className="mt-3 max-w-xl text-sm md:text-base"
          style={{ color: C.textSecondary }}
        >
          {description}
        </p>
      )}
    </FadeUp>
  );
}

// ─── Trend Arrow ────────────────────────────────────────────────────────────
function TrendBadge({ value, label }: { value: number; label: string }) {
  const isPositive = value >= 0;
  return (
    <div className="flex items-center gap-1.5">
      <span
        className="inline-flex items-center gap-0.5 rounded-full px-2 py-0.5 text-xs font-semibold"
        style={{
          background: isPositive
            ? "rgba(76,175,80,0.12)"
            : "rgba(239,83,80,0.12)",
          color: isPositive ? C.positive : C.negative,
        }}
      >
        <svg
          width="10"
          height="10"
          viewBox="0 0 10 10"
          fill="none"
          style={{
            transform: isPositive ? "none" : "rotate(180deg)",
          }}
        >
          <path
            d="M5 2L8 6H2L5 2Z"
            fill="currentColor"
          />
        </svg>
        {isPositive ? "+" : ""}
        {value}%
      </span>
      <span
        className="text-[11px]"
        style={{ color: C.textMuted }}
      >
        {label}
      </span>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// SECTION 1: DASHBOARD OVERVIEW
// ═══════════════════════════════════════════════════════════════════════════
function DashboardOverview() {
  const stats = [
    {
      label: "Apèl Jodi a",
      value: 1847,
      trend: 12,
      trendLabel: "vs yè",
      icon: (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path
            d="M2 3C2 2.44772 2.44772 2 3 2H7C7.26522 2 7.51957 2.10536 7.70711 2.29289L9.70711 4.29289C9.89464 4.48043 10.1490 4.58579 10.4142 4.58579H17C17.5523 4.58579 18 5.0335 18 5.58579V17C18 17.5523 17.5523 18 17 18H3C2.44772 18 2 17.5523 2 17V3Z"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <path d="M6 11L9 14L14 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
      glow: C.cobalt,
    },
    {
      label: "To Kontak",
      value: 73,
      suffix: "%",
      trend: 5,
      trendLabel: "vs semèn pase",
      icon: (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <circle cx="10" cy="7" r="3.5" stroke="currentColor" strokeWidth="1.5" />
          <path d="M3.5 17.5C3.5 14.4624 6.46243 12 10 12C13.5376 12 16.5 14.4624 16.5 17.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      ),
      glow: C.cobaltLight,
    },
    {
      label: "Santiman Pozitif",
      value: 68,
      suffix: "%",
      trend: -2,
      trendLabel: "vs yè",
      icon: (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.5" />
          <path d="M6.5 12C7.16667 13.3333 8.5 14 10 14C11.5 14 12.8333 13.3333 13.5 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="7.5" cy="8" r="1" fill="currentColor" />
          <circle cx="12.5" cy="8" r="1" fill="currentColor" />
        </svg>
      ),
      glow: C.gold,
    },
    {
      label: "Kanpay Aktif",
      value: 12,
      trend: 3,
      trendLabel: "nouvo semèn sa",
      icon: (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <rect x="2" y="4" width="16" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" />
          <path d="M2 8H18" stroke="currentColor" strokeWidth="1.5" />
          <path d="M6 12H10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      ),
      glow: C.vermillion,
    },
  ];

  // Mock chart data — 7 days
  const chartData = [420, 580, 510, 720, 680, 890, 1847];
  const chartDays = ["Lun", "Mad", "Mèk", "Jed", "Van", "Sam", "Dim"];
  const maxVal = Math.max(...chartData);

  // Recent calls
  const recentCalls = [
    {
      name: "Jean-Baptiste Pierre",
      dept: "Nò",
      duration: "4:32",
      sentiment: "Pozitif",
      sentimentColor: C.positive,
    },
    {
      name: "Marie-Claire Duval",
      dept: "Lwès",
      duration: "2:18",
      sentiment: "Net",
      sentimentColor: C.gold,
    },
    {
      name: "François Auguste",
      dept: "Sid",
      duration: "6:45",
      sentiment: "Pozitif",
      sentimentColor: C.positive,
    },
    {
      name: "Roseline Charles",
      dept: "Grandans",
      duration: "3:12",
      sentiment: "Negatif",
      sentimentColor: C.negative,
    },
  ];

  return (
    <section className="py-12 md:py-20">
      <SectionHeading
        eyebrow="Tablo Debò"
        title="Apèsi Jeneral Kanpay"
        description="Swiv pèfòmans sant apèl la an tan reyèl. Done jodi a reflete aktivite depi minwi."
      />

      {/* Stat Cards */}
      <div className="grid grid-cols-2 gap-3 md:gap-4 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <FadeUp key={stat.label} delay={i * 0.1}>
            <GlassCard className="p-4 md:p-5" glow={stat.glow}>
              <div
                className="mb-3 flex size-9 items-center justify-center rounded-lg"
                style={{
                  background: `${stat.glow}20`,
                  color: stat.glow,
                }}
              >
                {stat.icon}
              </div>
              <p
                className="text-xs font-medium uppercase tracking-wider"
                style={{ color: C.textMuted }}
              >
                {stat.label}
              </p>
              <p
                className="mt-1 text-3xl font-bold tabular-nums md:text-4xl"
                style={{
                  color: C.textPrimary,
                  fontFamily: "'JetBrains Mono', monospace",
                }}
              >
                <AnimatedNumber
                  value={stat.value}
                  suffix={stat.suffix || ""}
                />
              </p>
              <div className="mt-2">
                <TrendBadge
                  value={stat.trend}
                  label={stat.trendLabel}
                />
              </div>
            </GlassCard>
          </FadeUp>
        ))}
      </div>

      {/* Chart + Recent Calls */}
      <div className="mt-6 grid gap-4 lg:grid-cols-5">
        {/* Chart (wider) */}
        <FadeUp delay={0.3} className="lg:col-span-3">
          <GlassCard className="p-5 md:p-6">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h3
                  className="text-sm font-semibold"
                  style={{ color: C.textPrimary }}
                >
                  Volim Apèl — 7 Dènye Jou
                </h3>
                <p className="text-xs" style={{ color: C.textMuted }}>
                  Total: 5,647 apèl
                </p>
              </div>
              <div
                className="rounded-md px-2.5 py-1 text-xs font-medium"
                style={{
                  background: `${C.cobalt}20`,
                  color: C.cobaltLight,
                }}
              >
                Semèn sa a
              </div>
            </div>
            {/* CSS-only bar chart */}
            <div className="flex items-end gap-2 pt-4" style={{ height: 180 }}>
              {chartData.map((val, i) => {
                const height = (val / maxVal) * 140;
                return (
                  <div key={i} className="flex flex-1 flex-col items-center gap-2">
                    <m.div
                      initial={{ height: 0 }}
                      whileInView={{ height }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.8,
                        delay: 0.4 + i * 0.08,
                        ease: [0.25, 0.1, 0.25, 1],
                      }}
                      className="w-full rounded-t-md"
                      style={{
                        background:
                          i === chartData.length - 1
                            ? `linear-gradient(to top, ${C.cobalt}, ${C.cobaltLight})`
                            : `linear-gradient(to top, ${C.cobalt}60, ${C.cobalt}30)`,
                        minWidth: 0,
                      }}
                    />
                    <span
                      className="text-[10px] font-medium"
                      style={{ color: C.textMuted }}
                    >
                      {chartDays[i]}
                    </span>
                  </div>
                );
              })}
            </div>
          </GlassCard>
        </FadeUp>

        {/* Recent Calls */}
        <FadeUp delay={0.4} className="lg:col-span-2">
          <GlassCard className="p-5 md:p-6">
            <h3
              className="mb-4 text-sm font-semibold"
              style={{ color: C.textPrimary }}
            >
              Dènye Apèl yo
            </h3>
            <div className="space-y-3">
              {recentCalls.map((call, i) => (
                <m.div
                  key={call.name}
                  initial={{ opacity: 0, x: 12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.5 + i * 0.1 }}
                  className="flex items-center justify-between rounded-lg px-3 py-2.5"
                  style={{
                    background: "rgba(255,255,255,0.02)",
                    borderBottom: "1px solid rgba(255,255,255,0.04)",
                  }}
                >
                  <div className="flex items-center gap-3 overflow-hidden">
                    {/* Avatar circle */}
                    <div
                      className="flex size-8 shrink-0 items-center justify-center rounded-full text-xs font-bold"
                      style={{
                        background: `${C.cobalt}30`,
                        color: C.cobaltLight,
                      }}
                    >
                      {call.name
                        .split(" ")
                        .map((w) => w[0])
                        .join("")
                        .slice(0, 2)}
                    </div>
                    <div className="min-w-0">
                      <p
                        className="truncate text-sm font-medium"
                        style={{ color: C.textPrimary }}
                      >
                        {call.name}
                      </p>
                      <p className="text-[11px]" style={{ color: C.textMuted }}>
                        {call.dept} &middot; {call.duration}
                      </p>
                    </div>
                  </div>
                  <span
                    className="shrink-0 rounded-full px-2.5 py-0.5 text-[11px] font-semibold"
                    style={{
                      background: `${call.sentimentColor}18`,
                      color: call.sentimentColor,
                    }}
                  >
                    {call.sentiment}
                  </span>
                </m.div>
              ))}
            </div>
          </GlassCard>
        </FadeUp>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// SECTION 2: HAITI MAP VIEW
// ═══════════════════════════════════════════════════════════════════════════

// Simplified department data with center points and SVG paths
const DEPARTMENTS = [
  {
    name: "Nò",
    id: "nord",
    population: 1_070_000,
    registered: 624_000,
    contactRate: 78,
    sentiment: 72,
    cx: 280,
    cy: 65,
    fill: 0.78,
    path: "M220,30 L310,25 L340,50 L330,85 L280,100 L230,90 L210,60 Z",
  },
  {
    name: "Nòdès",
    id: "nord-est",
    population: 393_000,
    registered: 228_000,
    contactRate: 65,
    sentiment: 58,
    cx: 350,
    cy: 55,
    fill: 0.65,
    path: "M310,25 L380,20 L400,55 L370,80 L330,85 L340,50 Z",
  },
  {
    name: "Nòdwès",
    id: "nord-ouest",
    population: 728_000,
    registered: 410_000,
    contactRate: 62,
    sentiment: 55,
    cx: 165,
    cy: 48,
    fill: 0.62,
    path: "M100,15 L220,30 L210,60 L170,75 L120,55 L95,40 Z",
  },
  {
    name: "Atibonit",
    id: "artibonite",
    population: 1_727_000,
    registered: 980_000,
    contactRate: 71,
    sentiment: 64,
    cx: 210,
    cy: 125,
    fill: 0.71,
    path: "M120,55 L170,75 L230,90 L260,120 L240,160 L170,155 L130,120 L110,80 Z",
  },
  {
    name: "Sant",
    id: "centre",
    population: 746_000,
    registered: 420_000,
    contactRate: 58,
    sentiment: 60,
    cx: 295,
    cy: 140,
    fill: 0.58,
    path: "M280,100 L330,85 L370,105 L360,155 L300,170 L260,160 L260,120 L280,100 Z",
  },
  {
    name: "Lwès",
    id: "ouest",
    population: 4_029_000,
    registered: 2_450_000,
    contactRate: 85,
    sentiment: 70,
    cx: 260,
    cy: 215,
    fill: 0.85,
    path: "M240,160 L300,170 L310,210 L290,260 L250,270 L220,240 L210,190 Z",
  },
  {
    name: "Sidès",
    id: "sud-est",
    population: 632_000,
    registered: 350_000,
    contactRate: 54,
    sentiment: 52,
    cx: 335,
    cy: 225,
    fill: 0.54,
    path: "M300,170 L360,155 L390,190 L370,240 L310,260 L290,260 L310,210 Z",
  },
  {
    name: "Nip",
    id: "nippes",
    population: 342_000,
    registered: 195_000,
    contactRate: 60,
    sentiment: 56,
    cx: 200,
    cy: 260,
    fill: 0.6,
    path: "M170,240 L220,240 L250,270 L230,290 L180,280 L160,260 Z",
  },
  {
    name: "Grandans",
    id: "grand-anse",
    population: 468_000,
    registered: 262_000,
    contactRate: 52,
    sentiment: 48,
    cx: 120,
    cy: 280,
    fill: 0.52,
    path: "M70,250 L130,240 L170,240 L160,260 L180,280 L140,310 L80,300 L60,270 Z",
  },
  {
    name: "Sid",
    id: "sud",
    population: 774_000,
    registered: 440_000,
    contactRate: 64,
    sentiment: 62,
    cx: 230,
    cy: 310,
    fill: 0.64,
    path: "M180,280 L230,290 L290,300 L310,260 L290,260 L250,270 L230,290 L180,280 M230,290 L270,330 L220,340 L180,320 L140,310 L180,280 Z",
  },
];

function HaitiMapView() {
  const [selected, setSelected] = useState(DEPARTMENTS[5]); // Default to Lwès

  return (
    <section className="py-12 md:py-20">
      <SectionHeading
        eyebrow="Kat Depatman"
        title="Kouvèti pa Depatman"
        description="Vizualize to kontak ak santiman pa chak depatman nan peyi a."
      />

      <FadeUp delay={0.1}>
        <GlassCard className="overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-5">
            {/* Map */}
            <div className="relative p-4 md:p-8 lg:col-span-3">
              <svg
                viewBox="50 0 380 360"
                className="w-full"
                style={{ maxHeight: 420 }}
                role="img"
                aria-label="Kat depatman Ayiti ki montre to kontak pa rejyon"
              >
                <defs>
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                  <linearGradient id="mapGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={C.cobaltLight} />
                    <stop offset="100%" stopColor={C.cobalt} />
                  </linearGradient>
                </defs>

                {/* Department shapes */}
                {DEPARTMENTS.map((dept) => {
                  const isSelected = selected.id === dept.id;
                  const opacity = 0.2 + dept.fill * 0.7;
                  return (
                    <g key={dept.id}>
                      <path
                        d={dept.path}
                        fill={C.cobalt}
                        fillOpacity={opacity}
                        stroke={isSelected ? C.gold : "rgba(255,255,255,0.15)"}
                        strokeWidth={isSelected ? 2 : 0.8}
                        className="cursor-pointer transition-all duration-300"
                        onClick={() => setSelected(dept)}
                        filter={isSelected ? "url(#glow)" : undefined}
                        role="button"
                        tabIndex={0}
                        aria-label={`${dept.name}: ${dept.contactRate}% to kontak`}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            setSelected(dept);
                          }
                        }}
                      />
                      {/* Department label */}
                      <text
                        x={dept.cx}
                        y={dept.cy}
                        textAnchor="middle"
                        dominantBaseline="central"
                        fill={isSelected ? C.gold : "rgba(255,255,255,0.7)"}
                        fontSize="10"
                        fontWeight={isSelected ? "700" : "500"}
                        fontFamily="'Inter', sans-serif"
                        className="pointer-events-none select-none"
                      >
                        {dept.name}
                      </text>
                      {/* Dot indicator */}
                      <circle
                        cx={dept.cx}
                        cy={dept.cy + 14}
                        r={isSelected ? 4 : 3}
                        fill={
                          dept.contactRate >= 70
                            ? C.positive
                            : dept.contactRate >= 55
                              ? C.gold
                              : C.vermillion
                        }
                        opacity={isSelected ? 1 : 0.6}
                        className="pointer-events-none"
                      />
                    </g>
                  );
                })}
              </svg>

              {/* Legend */}
              <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-[11px]">
                {[
                  { color: C.positive, label: "Wo (>70%)" },
                  { color: C.gold, label: "Mwayen (55-70%)" },
                  { color: C.vermillion, label: "Ba (<55%)" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-1.5">
                    <div
                      className="size-2 rounded-full"
                      style={{ background: item.color }}
                    />
                    <span style={{ color: C.textMuted }}>{item.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Side panel */}
            <div
              className="border-t p-5 md:p-6 lg:col-span-2 lg:border-t-0 lg:border-l"
              style={{ borderColor: C.surfaceBorder }}
            >
              <m.div
                key={selected.id}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="mb-4 flex items-center gap-3">
                  <div
                    className="flex size-10 items-center justify-center rounded-lg text-sm font-bold"
                    style={{
                      background: `${C.cobalt}30`,
                      color: C.cobaltLight,
                    }}
                  >
                    {selected.name.slice(0, 2)}
                  </div>
                  <div>
                    <h3
                      className="text-lg font-bold"
                      style={{ color: C.textPrimary }}
                    >
                      {selected.name}
                    </h3>
                    <p className="text-xs" style={{ color: C.textMuted }}>
                      Depatman seleksyone
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  {[
                    {
                      label: "Popilasyon",
                      value: selected.population.toLocaleString(),
                    },
                    {
                      label: "Elektè Enskri",
                      value: selected.registered.toLocaleString(),
                    },
                    {
                      label: "To Kontak",
                      value: `${selected.contactRate}%`,
                      highlight: true,
                    },
                    {
                      label: "Santiman Pozitif",
                      value: `${selected.sentiment}%`,
                    },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="flex items-center justify-between rounded-lg px-3 py-3"
                      style={{
                        background: item.highlight
                          ? `${C.cobalt}15`
                          : "rgba(255,255,255,0.02)",
                      }}
                    >
                      <span
                        className="text-sm"
                        style={{ color: C.textSecondary }}
                      >
                        {item.label}
                      </span>
                      <span
                        className="text-sm font-bold tabular-nums"
                        style={{
                          color: item.highlight ? C.cobaltLight : C.textPrimary,
                          fontFamily: "'JetBrains Mono', monospace",
                        }}
                      >
                        {item.value}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Contact rate bar */}
                <div className="mt-6">
                  <div className="mb-2 flex items-center justify-between text-xs">
                    <span style={{ color: C.textMuted }}>Pwogrè Kontak</span>
                    <span
                      className="font-bold tabular-nums"
                      style={{
                        color: C.cobaltLight,
                        fontFamily: "'JetBrains Mono', monospace",
                      }}
                    >
                      {selected.contactRate}%
                    </span>
                  </div>
                  <div
                    className="h-2 overflow-hidden rounded-full"
                    style={{ background: "rgba(255,255,255,0.06)" }}
                  >
                    <m.div
                      key={`bar-${selected.id}`}
                      initial={{ width: 0 }}
                      animate={{ width: `${selected.contactRate}%` }}
                      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
                      className="h-full rounded-full"
                      style={{
                        background: `linear-gradient(to right, ${C.cobalt}, ${C.cobaltLight})`,
                      }}
                    />
                  </div>
                </div>

                {/* Sentiment meter */}
                <div className="mt-4">
                  <div className="mb-2 flex items-center justify-between text-xs">
                    <span style={{ color: C.textMuted }}>Santiman</span>
                    <span
                      className="font-bold tabular-nums"
                      style={{
                        color:
                          selected.sentiment >= 60
                            ? C.positive
                            : selected.sentiment >= 50
                              ? C.gold
                              : C.negative,
                        fontFamily: "'JetBrains Mono', monospace",
                      }}
                    >
                      {selected.sentiment}%
                    </span>
                  </div>
                  <div
                    className="h-2 overflow-hidden rounded-full"
                    style={{ background: "rgba(255,255,255,0.06)" }}
                  >
                    <m.div
                      key={`sent-${selected.id}`}
                      initial={{ width: 0 }}
                      animate={{ width: `${selected.sentiment}%` }}
                      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
                      className="h-full rounded-full"
                      style={{
                        background:
                          selected.sentiment >= 60
                            ? `linear-gradient(to right, ${C.positive}80, ${C.positive})`
                            : selected.sentiment >= 50
                              ? `linear-gradient(to right, ${C.gold}80, ${C.gold})`
                              : `linear-gradient(to right, ${C.negative}80, ${C.negative})`,
                      }}
                    />
                  </div>
                </div>
              </m.div>
            </div>
          </div>
        </GlassCard>
      </FadeUp>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// SECTION 3: CAMPAIGN CARD
// ═══════════════════════════════════════════════════════════════════════════
function CampaignSection() {
  const agents = [
    { name: "Michaëlle Bien-Aimé", calls: 312, avatar: "MB" },
    { name: "Ricardo Jean-Louis", calls: 287, avatar: "RJ" },
    { name: "Nadège François", calls: 264, avatar: "NF" },
  ];

  return (
    <section className="pb-16 md:pb-24">
      <SectionHeading
        eyebrow="Kanpay"
        title="Kanpay Aktif: Vòt pou Lavni"
        description="Detay kanpay prensipal la ak pèfòmans ajan yo."
      />

      <div className="grid gap-4 lg:grid-cols-2">
        {/* Main campaign card */}
        <FadeUp delay={0.1}>
          <GlassCard className="p-5 md:p-6" glow={C.cobalt}>
            {/* Header */}
            <div className="mb-5 flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <h3
                    className="text-lg font-bold"
                    style={{ color: C.textPrimary }}
                  >
                    Vòt pou Lavni
                  </h3>
                  <span
                    className="rounded-full px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider"
                    style={{
                      background: `${C.positive}20`,
                      color: C.positive,
                    }}
                  >
                    Aktif
                  </span>
                </div>
                <p className="mt-1 text-sm" style={{ color: C.textMuted }}>
                  Kanpay prensipal — Eleksyon 2026
                </p>
              </div>
              <div
                className="rounded-lg p-2"
                style={{ background: `${C.gold}15` }}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  style={{ color: C.gold }}
                >
                  <path
                    d="M10 2L12.5 7.5L18 8L14 12L15 18L10 15L5 18L6 12L2 8L7.5 7.5L10 2Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>

            {/* Progress */}
            <div className="mb-5">
              <div className="mb-2 flex items-center justify-between text-sm">
                <span style={{ color: C.textSecondary }}>
                  Apèl konplete
                </span>
                <span
                  className="font-bold tabular-nums"
                  style={{
                    color: C.textPrimary,
                    fontFamily: "'JetBrains Mono', monospace",
                  }}
                >
                  14,832 / 25,000
                </span>
              </div>
              <div
                className="h-3 overflow-hidden rounded-full"
                style={{ background: "rgba(255,255,255,0.06)" }}
              >
                <m.div
                  initial={{ width: 0 }}
                  whileInView={{ width: "59.3%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                  className="h-full rounded-full"
                  style={{
                    background: `linear-gradient(to right, ${C.cobalt}, ${C.cobaltLight}, ${C.gold})`,
                  }}
                />
              </div>
              <p
                className="mt-1.5 text-right text-xs font-medium tabular-nums"
                style={{
                  color: C.cobaltLight,
                  fontFamily: "'JetBrains Mono', monospace",
                }}
              >
                59.3%
              </p>
            </div>

            {/* Key metrics grid */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: "Kouvèti", value: "68%", sub: "elektè rive" },
                { label: "To Kontak", value: "73%", sub: "reyisi" },
                { label: "Santiman +", value: "64%", sub: "favorab" },
              ].map((metric, i) => (
                <div
                  key={metric.label}
                  className="rounded-lg p-3 text-center"
                  style={{ background: "rgba(255,255,255,0.03)" }}
                >
                  <p
                    className="text-[11px] font-medium uppercase tracking-wider"
                    style={{ color: C.textMuted }}
                  >
                    {metric.label}
                  </p>
                  <p
                    className="mt-1 text-xl font-bold tabular-nums"
                    style={{
                      color: C.textPrimary,
                      fontFamily: "'JetBrains Mono', monospace",
                    }}
                  >
                    {metric.value}
                  </p>
                  <p
                    className="mt-0.5 text-[10px]"
                    style={{ color: C.textMuted }}
                  >
                    {metric.sub}
                  </p>
                </div>
              ))}
            </div>
          </GlassCard>
        </FadeUp>

        {/* Agent leaderboard */}
        <FadeUp delay={0.2}>
          <GlassCard className="p-5 md:p-6" glow={C.gold}>
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h3
                  className="text-lg font-bold"
                  style={{ color: C.textPrimary }}
                >
                  Top Ajan yo
                </h3>
                <p className="text-xs" style={{ color: C.textMuted }}>
                  Klasman pa kantite apèl semèn sa a
                </p>
              </div>
              <div
                className="rounded-lg p-2"
                style={{ background: `${C.gold}15` }}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  style={{ color: C.gold }}
                >
                  <path
                    d="M6 18V10M10 18V4M14 18V8"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </div>

            <div className="space-y-3">
              {agents.map((agent, i) => {
                const medals = ["🥇", "🥈", "🥉"];
                const barWidth = (agent.calls / agents[0].calls) * 100;
                const colors = [C.gold, "#C0C0C0", "#CD7F32"];
                return (
                  <m.div
                    key={agent.name}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.4 + i * 0.12 }}
                    className="rounded-xl p-4"
                    style={{ background: "rgba(255,255,255,0.03)" }}
                  >
                    <div className="mb-2.5 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className="flex size-10 items-center justify-center rounded-full text-sm font-bold"
                          style={{
                            background: `${colors[i]}20`,
                            color: colors[i],
                            border: `1.5px solid ${colors[i]}40`,
                          }}
                        >
                          {agent.avatar}
                        </div>
                        <div>
                          <p
                            className="text-sm font-semibold"
                            style={{ color: C.textPrimary }}
                          >
                            {agent.name}
                          </p>
                          <p
                            className="text-xs"
                            style={{ color: C.textMuted }}
                          >
                            Ajan Sant Apèl
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{medals[i]}</span>
                        <span
                          className="text-lg font-bold tabular-nums"
                          style={{
                            color: colors[i],
                            fontFamily: "'JetBrains Mono', monospace",
                          }}
                        >
                          {agent.calls}
                        </span>
                      </div>
                    </div>
                    {/* Progress bar */}
                    <div
                      className="h-1.5 overflow-hidden rounded-full"
                      style={{ background: "rgba(255,255,255,0.06)" }}
                    >
                      <m.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${barWidth}%` }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 0.8,
                          delay: 0.6 + i * 0.1,
                          ease: [0.25, 0.1, 0.25, 1],
                        }}
                        className="h-full rounded-full"
                        style={{
                          background: `linear-gradient(to right, ${colors[i]}80, ${colors[i]})`,
                        }}
                      />
                    </div>
                  </m.div>
                );
              })}
            </div>

            {/* Summary */}
            <div
              className="mt-5 flex items-center justify-between rounded-lg px-4 py-3"
              style={{ background: `${C.cobalt}10` }}
            >
              <span className="text-sm" style={{ color: C.textSecondary }}>
                Total Ajan Aktif
              </span>
              <span
                className="text-sm font-bold tabular-nums"
                style={{
                  color: C.cobaltLight,
                  fontFamily: "'JetBrains Mono', monospace",
                }}
              >
                24 ajan
              </span>
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
export default function HaitiPresidentDemo() {
  return (
    <>
      {/* eslint-disable-next-line @next/next/no-page-custom-font */}
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />
      <main
        className="min-h-screen"
        style={{
          background: `linear-gradient(180deg, ${C.bg} 0%, #0D1B2E 50%, ${C.bg} 100%)`,
          fontFamily: "'Inter', sans-serif",
        }}
      >
        {/* Ambient glow effects */}
        <div
          className="pointer-events-none fixed inset-0 z-0"
          aria-hidden="true"
        >
          <div
            className="absolute -top-40 left-1/4 size-96 rounded-full opacity-[0.07] blur-[120px]"
            style={{ background: C.cobalt }}
          />
          <div
            className="absolute top-1/3 -right-20 size-72 rounded-full opacity-[0.05] blur-[100px]"
            style={{ background: C.gold }}
          />
          <div
            className="absolute bottom-1/4 -left-20 size-64 rounded-full opacity-[0.04] blur-[80px]"
            style={{ background: C.vermillion }}
          />
        </div>

        {/* Top bar */}
        <header className="relative z-10 border-b" style={{ borderColor: C.surfaceBorder }}>
          <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-6">
            <div className="flex items-center gap-3">
              <div
                className="flex size-9 items-center justify-center rounded-lg"
                style={{
                  background: `linear-gradient(135deg, ${C.cobalt}, ${C.cobaltLight})`,
                }}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                >
                  <path
                    d="M9 1L11.5 6.5L17 7L13 11L14 17L9 14L4 17L5 11L1 7L6.5 6.5L9 1Z"
                    fill="white"
                    fillOpacity="0.9"
                  />
                </svg>
              </div>
              <div>
                <h1
                  className="text-sm font-bold"
                  style={{ color: C.textPrimary }}
                >
                  Sant Apèl Prezidansyèl
                </h1>
                <p
                  className="text-[11px]"
                  style={{ color: C.textMuted }}
                >
                  Tablo Kontwòl &middot; Eleksyon 2026
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div
                className="flex items-center gap-1.5 rounded-full px-3 py-1.5"
                style={{ background: `${C.positive}15` }}
              >
                <div
                  className="size-2 animate-pulse rounded-full"
                  style={{ background: C.positive }}
                />
                <span
                  className="text-xs font-medium"
                  style={{ color: C.positive }}
                >
                  An Dirèk
                </span>
              </div>
              {/* Avatar */}
              <div
                className="flex size-8 items-center justify-center rounded-full text-xs font-bold"
                style={{
                  background: `${C.gold}20`,
                  color: C.gold,
                  border: `1.5px solid ${C.gold}40`,
                }}
              >
                DJ
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="relative z-10 mx-auto max-w-7xl px-4 md:px-6">
          <DashboardOverview />
          <HaitiMapView />
          <CampaignSection />
        </div>

        {/* Footer */}
        <footer
          className="relative z-10 border-t py-8"
          style={{ borderColor: C.surfaceBorder }}
        >
          <div className="mx-auto max-w-7xl px-4 text-center md:px-6">
            <p className="text-xs" style={{ color: C.textMuted }}>
              &copy; 2026 Sant Apèl Prezidansyèl Ayiti. Tout dwa rezève.
            </p>
            <p className="mt-1 text-[11px]" style={{ color: C.textMuted }}>
              Konsepsyon pa{" "}
              <span style={{ color: C.gold }}>Jaspire</span>
            </p>
          </div>
        </footer>
      </main>
    </>
  );
}
