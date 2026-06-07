"use client";

import { motion as m } from "motion/react";
import { useState } from "react";

/* ═══════════════════════════════════════════════════════════════════════════
   PropLend — Tokenized Real Estate Lending DeFi Platform Demo
   Colors: Navy #0A2540 primary, Gold #D4AF37 accent, Deep blues for surfaces
   ═══════════════════════════════════════════════════════════════════════════ */

const NAVY = {
  950: "#050e1a",
  900: "#0A1929",
  800: "#0A2540",
  700: "#0d3259",
  600: "#124272",
  500: "#1a5a99",
  400: "#2878c2",
  300: "#4a9be6",
  200: "#88c0f5",
  100: "#c4dffa",
  50: "#e8f2fd",
};

const GOLD = {
  900: "#7a6320",
  800: "#9c7e25",
  700: "#b8932b",
  600: "#c4a030",
  500: "#D4AF37",
  400: "#e0c35c",
  300: "#ebd680",
  200: "#f2e5a8",
  100: "#f9f1d0",
  50: "#fcf8ea",
};

const BG_DARK = "#060d18";
const SURFACE_DARK = "#0c1829";
const SURFACE_CARD = "#101f36";
const SURFACE_ELEVATED = "#152844";
const BORDER_DARK = "#1a3354";
const BORDER_SUBTLE = "#12294a";
const TEXT_WHITE = "#f0f4f8";
const TEXT_LIGHT = "#b8cce0";
const TEXT_DIM = "#6b8aad";
const POSITIVE = "#22c55e";
const NEGATIVE = "#ef4444";

// ─── Shimmer Progress Bar ──────────────────────────────────────────────────
function GoldProgressBar({ percent, height = 8 }: { percent: number; height?: number }) {
  return (
    <div
      className="relative overflow-hidden rounded-full"
      style={{ height, backgroundColor: BORDER_DARK }}
    >
      <m.div
        className="relative h-full rounded-full"
        style={{
          background: `linear-gradient(90deg, ${GOLD[700]}, ${GOLD[500]}, ${GOLD[400]})`,
        }}
        initial={{ width: "0%" }}
        whileInView={{ width: `${percent}%` }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
      >
        {/* Shimmer overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)",
            animation: "shimmer 2.5s infinite",
          }}
        />
      </m.div>
    </div>
  );
}

// ─── Token Badge ───────────────────────────────────────────────────────────
function TokenBadge({ type }: { type: "senior" | "junior" }) {
  const isSenior = type === "senior";
  return (
    <span
      className="inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider"
      style={{
        backgroundColor: isSenior ? `${NAVY[500]}30` : `${GOLD[500]}20`,
        color: isSenior ? NAVY[200] : GOLD[400],
        border: `1px solid ${isSenior ? NAVY[500] + "40" : GOLD[500] + "30"}`,
      }}
    >
      {isSenior ? "sSAFE" : "jYIELD"}
    </span>
  );
}

// ─── Mini Avatar Stack ─────────────────────────────────────────────────────
function AvatarStack({ count }: { count: number }) {
  const colors = [NAVY[500], GOLD[600], NAVY[400], GOLD[500], NAVY[600]];
  return (
    <div className="flex items-center">
      <div className="flex -space-x-2">
        {colors.slice(0, 4).map((color, i) => (
          <div
            key={i}
            className="flex size-7 items-center justify-center rounded-full border-2 text-[9px] font-bold text-white"
            style={{ backgroundColor: color, borderColor: SURFACE_CARD, zIndex: 5 - i }}
          >
            {String.fromCharCode(65 + i)}
          </div>
        ))}
      </div>
      <span className="ml-2 text-xs font-medium" style={{ color: TEXT_DIM }}>
        +{count - 4} investors
      </span>
    </div>
  );
}

// ─── SVG Area Chart (Earnings) ─────────────────────────────────────────────
function EarningsChart() {
  const data = [0, 120, 380, 620, 1050, 1480, 2100];
  const labels = ["Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar"];
  const max = Math.max(...data) * 1.15;
  const w = 400;
  const h = 140;
  const padX = 0;
  const padY = 10;

  const points = data.map((v, i) => ({
    x: padX + (i / (data.length - 1)) * (w - padX * 2),
    y: h - padY - (v / max) * (h - padY * 2),
  }));

  const linePath = points.map((p, i) => (i === 0 ? `M ${p.x} ${p.y}` : `L ${p.x} ${p.y}`)).join(" ");
  const areaPath = `${linePath} L ${points[points.length - 1].x} ${h} L ${points[0].x} ${h} Z`;

  return (
    <div className="relative">
      <svg viewBox={`0 0 ${w} ${h + 24}`} className="w-full" preserveAspectRatio="none">
        <defs>
          <linearGradient id="areaGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={GOLD[500]} stopOpacity="0.25" />
            <stop offset="100%" stopColor={GOLD[500]} stopOpacity="0.02" />
          </linearGradient>
          <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={GOLD[600]} />
            <stop offset="100%" stopColor={GOLD[400]} />
          </linearGradient>
        </defs>

        {/* Grid lines */}
        {[0.25, 0.5, 0.75].map((ratio) => (
          <line
            key={ratio}
            x1={0}
            y1={h - padY - ratio * (h - padY * 2)}
            x2={w}
            y2={h - padY - ratio * (h - padY * 2)}
            stroke={BORDER_DARK}
            strokeWidth="1"
            strokeDasharray="4 4"
          />
        ))}

        {/* Area */}
        <m.path
          d={areaPath}
          fill="url(#areaGrad)"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
        />

        {/* Line */}
        <m.path
          d={linePath}
          fill="none"
          stroke="url(#lineGrad)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
        />

        {/* Current point */}
        <circle
          cx={points[points.length - 1].x}
          cy={points[points.length - 1].y}
          r="4"
          fill={GOLD[500]}
          stroke={SURFACE_CARD}
          strokeWidth="2"
        />

        {/* X-axis labels */}
        {labels.map((label, i) => (
          <text
            key={label}
            x={padX + (i / (labels.length - 1)) * (w - padX * 2)}
            y={h + 18}
            textAnchor="middle"
            fill={TEXT_DIM}
            fontSize="10"
            fontFamily="monospace"
          >
            {label}
          </text>
        ))}
      </svg>
    </div>
  );
}

// ─── Price Line Chart (Trading) ────────────────────────────────────────────
function PriceChart() {
  const data = [9.8, 9.9, 9.7, 10.0, 10.1, 9.95, 10.05, 10.2, 10.15, 10.1, 10.3, 10.24];
  const max = Math.max(...data) * 1.01;
  const min = Math.min(...data) * 0.99;
  const w = 400;
  const h = 100;

  const points = data.map((v, i) => ({
    x: (i / (data.length - 1)) * w,
    y: h - ((v - min) / (max - min)) * h,
  }));

  const path = points.map((p, i) => (i === 0 ? `M ${p.x} ${p.y}` : `L ${p.x} ${p.y}`)).join(" ");

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full" preserveAspectRatio="none">
      <defs>
        <linearGradient id="priceGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={POSITIVE} stopOpacity="0.15" />
          <stop offset="100%" stopColor={POSITIVE} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path
        d={`${path} L ${w} ${h} L 0 ${h} Z`}
        fill="url(#priceGrad)"
      />
      <m.path
        d={path}
        fill="none"
        stroke={POSITIVE}
        strokeWidth="2"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
      />
    </svg>
  );
}

// ─── Section Divider ───────────────────────────────────────────────────────
function SectionDivider() {
  return (
    <div className="flex items-center justify-center py-12 md:py-16">
      <div className="flex items-center gap-3">
        <div className="h-px w-12 md:w-20" style={{ backgroundColor: BORDER_DARK }} />
        <div className="size-1.5 rounded-full" style={{ backgroundColor: GOLD[500] }} />
        <div className="h-px w-12 md:w-20" style={{ backgroundColor: BORDER_DARK }} />
      </div>
    </div>
  );
}

// ─── Section Label ─────────────────────────────────────────────────────────
function SectionLabel({ label, sublabel }: { label: string; sublabel?: string }) {
  return (
    <m.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="px-4 pt-6 pb-2 text-center sm:px-6"
    >
      <span
        className="text-[10px] font-bold uppercase tracking-[0.2em]"
        style={{ color: GOLD[500] }}
      >
        {label}
      </span>
      {sublabel && (
        <p className="mt-1 text-xs" style={{ color: TEXT_DIM }}>
          {sublabel}
        </p>
      )}
    </m.div>
  );
}

// ─── Property Campaign Card ────────────────────────────────────────────────
function PropertyCampaign() {
  return (
    <section className="px-4 pt-8 pb-4 sm:px-6 md:px-8">
      <m.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
        className="mx-auto max-w-xl"
      >
        <div
          className="overflow-hidden rounded-2xl border"
          style={{
            backgroundColor: SURFACE_CARD,
            borderColor: BORDER_DARK,
            boxShadow: `0 4px 24px rgba(0,0,0,0.3), 0 0 0 1px ${BORDER_SUBTLE}`,
          }}
        >
          {/* Property hero */}
          <div
            className="relative h-44 overflow-hidden sm:h-52"
            style={{
              background: `linear-gradient(135deg, ${NAVY[800]} 0%, ${NAVY[700]} 40%, ${NAVY[600]} 100%)`,
            }}
          >
            {/* Abstract property silhouette */}
            <div className="absolute inset-0 flex items-end justify-center opacity-10">
              <svg viewBox="0 0 400 200" className="w-full" preserveAspectRatio="xMidYMax meet">
                <rect x="50" y="60" width="120" height="140" fill="white" rx="4" />
                <rect x="230" y="30" width="100" height="170" fill="white" rx="4" />
                <rect x="140" y="90" width="110" height="110" fill="white" rx="4" />
              </svg>
            </div>
            {/* Pattern overlay */}
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `radial-gradient(circle at 20% 80%, ${GOLD[500]}08 0%, transparent 50%), radial-gradient(circle at 80% 20%, ${NAVY[400]}10 0%, transparent 50%)`,
              }}
            />
            {/* Badge */}
            <div className="absolute top-4 left-4 flex items-center gap-2">
              <span
                className="rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider"
                style={{
                  backgroundColor: `${POSITIVE}20`,
                  color: POSITIVE,
                  border: `1px solid ${POSITIVE}30`,
                }}
              >
                Active
              </span>
              <span
                className="rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider"
                style={{
                  backgroundColor: `${GOLD[500]}18`,
                  color: GOLD[400],
                  border: `1px solid ${GOLD[500]}25`,
                }}
              >
                18 days left
              </span>
            </div>
            {/* Title overlay */}
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-5 pt-12">
              <p className="text-xs font-medium" style={{ color: GOLD[400] }}>
                Austin, TX
              </p>
              <h3 className="mt-1 text-xl font-bold text-white sm:text-2xl">
                Single Family Renovation
              </h3>
            </div>
          </div>

          {/* Campaign progress */}
          <div className="px-5 pt-5 sm:px-6">
            <div className="flex items-baseline justify-between">
              <div>
                <span
                  className="font-mono text-2xl font-bold tabular-nums sm:text-3xl"
                  style={{ color: GOLD[400] }}
                >
                  $156,000
                </span>
                <span className="ml-1 text-sm" style={{ color: TEXT_DIM }}>
                  raised
                </span>
              </div>
              <span className="font-mono text-sm font-medium tabular-nums" style={{ color: TEXT_LIGHT }}>
                $200,000 goal
              </span>
            </div>
            <div className="mt-3">
              <GoldProgressBar percent={78} />
            </div>
            <div className="mt-2 flex items-center justify-between text-xs" style={{ color: TEXT_DIM }}>
              <span className="font-mono font-medium tabular-nums" style={{ color: GOLD[500] }}>78% funded</span>
              <AvatarStack count={47} />
            </div>
          </div>

          {/* Key terms grid */}
          <div className="mx-5 mt-5 grid grid-cols-3 gap-px overflow-hidden rounded-xl sm:mx-6" style={{ backgroundColor: BORDER_DARK }}>
            {[
              { label: "Property Value", value: "$310,000" },
              { label: "Loan-to-Value", value: "64.5%" },
              { label: "Term", value: "12 months" },
            ].map((item) => (
              <div key={item.label} className="p-3 text-center" style={{ backgroundColor: SURFACE_DARK }}>
                <p className="text-[10px] font-medium uppercase tracking-wider" style={{ color: TEXT_DIM }}>
                  {item.label}
                </p>
                <p className="mt-1 font-mono text-sm font-bold tabular-nums" style={{ color: TEXT_WHITE }}>
                  {item.value}
                </p>
              </div>
            ))}
          </div>

          {/* Tranche selector */}
          <div className="px-5 pt-5 sm:px-6">
            <p className="mb-3 text-xs font-bold uppercase tracking-wider" style={{ color: TEXT_DIM }}>
              Select Tranche
            </p>
            <div className="grid grid-cols-2 gap-3">
              {/* Senior */}
              <m.div
                whileHover={{ y: -2 }}
                className="cursor-pointer rounded-xl border-2 p-4 transition-all"
                style={{
                  borderColor: NAVY[500],
                  backgroundColor: `${NAVY[500]}12`,
                  boxShadow: `0 0 0 1px ${NAVY[500]}20, inset 0 1px 0 ${NAVY[500]}10`,
                }}
              >
                <div className="flex items-center justify-between">
                  <TokenBadge type="senior" />
                  <span
                    className="font-mono text-[10px] font-bold tabular-nums"
                    style={{ color: NAVY[200] }}
                  >
                    8.0% APY
                  </span>
                </div>
                <p className="mt-3 text-xs font-semibold" style={{ color: TEXT_WHITE }}>
                  Senior Tranche
                </p>
                <p className="mt-1 text-[11px] leading-snug" style={{ color: TEXT_DIM }}>
                  Lower risk, fixed returns. First-loss protection.
                </p>
                <div className="mt-3 h-px" style={{ backgroundColor: BORDER_DARK }} />
                <p className="mt-2 text-[10px]" style={{ color: TEXT_DIM }}>
                  Min. <span className="font-semibold" style={{ color: TEXT_LIGHT }}>$5,000</span>
                </p>
              </m.div>

              {/* Junior */}
              <m.div
                whileHover={{ y: -2 }}
                className="cursor-pointer rounded-xl border-2 p-4 transition-all"
                style={{
                  borderColor: GOLD[500] + "50",
                  backgroundColor: `${GOLD[500]}08`,
                  boxShadow: `0 0 0 1px ${GOLD[500]}15, inset 0 1px 0 ${GOLD[500]}08`,
                }}
              >
                <div className="flex items-center justify-between">
                  <TokenBadge type="junior" />
                  <span
                    className="font-mono text-[10px] font-bold tabular-nums"
                    style={{ color: GOLD[400] }}
                  >
                    12-18% APY
                  </span>
                </div>
                <p className="mt-3 text-xs font-semibold" style={{ color: TEXT_WHITE }}>
                  Junior Tranche
                </p>
                <p className="mt-1 text-[11px] leading-snug" style={{ color: TEXT_DIM }}>
                  Higher risk, variable returns. Equity upside.
                </p>
                <div className="mt-3 h-px" style={{ backgroundColor: BORDER_DARK }} />
                <p className="mt-2 text-[10px]" style={{ color: TEXT_DIM }}>
                  Min. <span className="font-semibold" style={{ color: TEXT_LIGHT }}>$1,000</span>
                </p>
              </m.div>
            </div>
          </div>

          {/* CTA */}
          <div className="px-5 pt-5 pb-5 sm:px-6">
            <button
              className="flex min-h-12 w-full items-center justify-center gap-2 rounded-xl text-sm font-bold text-white transition-all hover:shadow-lg"
              style={{
                background: `linear-gradient(135deg, ${GOLD[600]}, ${GOLD[500]}, ${GOLD[400]})`,
                boxShadow: `0 4px 14px ${GOLD[500]}30, inset 0 1px 0 ${GOLD[300]}40`,
                color: NAVY[950],
              }}
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path
                  d="M9 2V16M5 6L9 2L13 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Invest Now
            </button>
          </div>
        </div>
      </m.div>
    </section>
  );
}

// ─── Portfolio Dashboard ───────────────────────────────────────────────────
function PortfolioDashboard() {
  return (
    <section className="px-4 py-4 sm:px-6 md:px-8">
      <m.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
        className="mx-auto max-w-xl"
      >
        <div
          className="overflow-hidden rounded-2xl border"
          style={{
            backgroundColor: SURFACE_CARD,
            borderColor: BORDER_DARK,
            boxShadow: `0 4px 24px rgba(0,0,0,0.3), 0 0 0 1px ${BORDER_SUBTLE}`,
          }}
        >
          {/* Header */}
          <div className="px-5 pt-5 pb-1 sm:px-6 sm:pt-6">
            <div className="flex items-center justify-between">
              <p className="text-xs font-bold uppercase tracking-wider" style={{ color: TEXT_DIM }}>
                Your Portfolio
              </p>
              {/* Wallet badge */}
              <div
                className="flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] font-mono font-medium"
                style={{
                  backgroundColor: SURFACE_DARK,
                  color: TEXT_DIM,
                  border: `1px solid ${BORDER_DARK}`,
                }}
              >
                <div className="size-1.5 rounded-full" style={{ backgroundColor: POSITIVE }} />
                0x7c6b...f0a2
              </div>
            </div>
          </div>

          {/* Total value */}
          <div className="px-5 pt-3 pb-4 sm:px-6">
            <div className="flex items-baseline gap-3">
              <span
                className="font-mono text-4xl font-bold tabular-nums tracking-tight sm:text-5xl"
                style={{ color: TEXT_WHITE }}
              >
                $45,200
              </span>
              <span
                className="flex items-center gap-1 rounded-full px-2.5 py-1 font-mono text-xs font-bold tabular-nums"
                style={{
                  backgroundColor: `${POSITIVE}18`,
                  color: POSITIVE,
                }}
              >
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                  <path d="M5 8V2M2.5 4.5L5 2L7.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                +12.4%
              </span>
            </div>
            <p className="mt-1 text-xs" style={{ color: TEXT_DIM }}>
              Total portfolio value
            </p>
          </div>

          {/* Holdings */}
          <div className="space-y-2 px-5 sm:px-6">
            {[
              {
                name: "Austin Single Family",
                tokens: "500 sSAFE",
                value: "$5,000",
                apy: "8.0%",
                type: "senior" as const,
                change: "+2.3%",
              },
              {
                name: "Miami Beach Condo",
                tokens: "200 jYIELD",
                value: "$2,000",
                apy: "14.2%",
                type: "junior" as const,
                change: "+5.1%",
              },
              {
                name: "Brooklyn Duplex",
                tokens: "1,000 sSAFE",
                value: "$10,000",
                apy: "8.0%",
                type: "senior" as const,
                change: "+1.8%",
              },
            ].map((holding, i) => (
              <m.div
                key={holding.name}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
                className="flex items-center gap-4 rounded-xl border p-4 transition-all hover:border-opacity-60"
                style={{
                  backgroundColor: SURFACE_DARK,
                  borderColor: BORDER_DARK,
                }}
              >
                {/* Icon */}
                <div
                  className="flex size-10 shrink-0 items-center justify-center rounded-lg"
                  style={{
                    backgroundColor: SURFACE_ELEVATED,
                    border: `1px solid ${BORDER_DARK}`,
                  }}
                >
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" style={{ color: holding.type === "senior" ? NAVY[300] : GOLD[400] }}>
                    <path d="M3 14V7L9 3L15 7V14L9 17L3 14Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                    <path d="M9 10V17" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M3 7L9 10L15 7" stroke="currentColor" strokeWidth="1.5" />
                  </svg>
                </div>

                {/* Info */}
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="truncate text-sm font-semibold" style={{ color: TEXT_WHITE }}>
                      {holding.name}
                    </p>
                    <TokenBadge type={holding.type} />
                  </div>
                  <p className="mt-0.5 font-mono text-xs tabular-nums" style={{ color: TEXT_DIM }}>
                    {holding.tokens}
                  </p>
                </div>

                {/* Value */}
                <div className="text-right">
                  <p className="font-mono text-sm font-bold tabular-nums" style={{ color: TEXT_WHITE }}>
                    {holding.value}
                  </p>
                  <div className="flex items-center justify-end gap-1.5">
                    <span className="font-mono text-xs tabular-nums" style={{ color: POSITIVE }}>
                      {holding.change}
                    </span>
                    <span className="font-mono text-[10px] tabular-nums" style={{ color: TEXT_DIM }}>
                      {holding.apy} APY
                    </span>
                  </div>
                </div>
              </m.div>
            ))}
          </div>

          {/* Earnings chart */}
          <div className="px-5 pt-5 sm:px-6">
            <div className="flex items-center justify-between">
              <p className="text-xs font-bold uppercase tracking-wider" style={{ color: TEXT_DIM }}>
                Cumulative Earnings
              </p>
              <span
                className="font-mono text-sm font-bold tabular-nums"
                style={{ color: GOLD[400] }}
              >
                $2,100
              </span>
            </div>
            <div className="mt-3 overflow-hidden rounded-xl border p-3" style={{ backgroundColor: SURFACE_DARK, borderColor: BORDER_DARK }}>
              <EarningsChart />
            </div>
          </div>

          {/* Next payout */}
          <div className="mx-5 mt-5 sm:mx-6">
            <div
              className="flex items-center justify-between rounded-xl border-2 border-dashed p-4"
              style={{ borderColor: GOLD[500] + "30", backgroundColor: `${GOLD[500]}06` }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="flex size-10 items-center justify-center rounded-lg"
                  style={{ backgroundColor: `${GOLD[500]}15` }}
                >
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" style={{ color: GOLD[500] }}>
                    <circle cx="9" cy="9" r="7" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M9 5V9L12 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs font-semibold" style={{ color: TEXT_WHITE }}>
                    Next Payout
                  </p>
                  <p className="mt-0.5 text-[11px]" style={{ color: TEXT_DIM }}>
                    March 15, 2026
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-mono text-lg font-bold tabular-nums" style={{ color: GOLD[400] }}>
                  $340
                </p>
                <p className="text-[10px]" style={{ color: TEXT_DIM }}>estimated</p>
              </div>
            </div>
          </div>

          <div className="h-5" />
        </div>
      </m.div>
    </section>
  );
}

// ─── Secondary Market Trading ──────────────────────────────────────────────
function TradingView() {
  const [tradeTab, setTradeTab] = useState<"buy" | "sell">("buy");

  const recentTrades = [
    { price: "10.26", amount: "120", time: "2 min ago", type: "buy" },
    { price: "10.24", amount: "85", time: "5 min ago", type: "sell" },
    { price: "10.22", amount: "200", time: "12 min ago", type: "buy" },
    { price: "10.20", amount: "50", time: "18 min ago", type: "buy" },
    { price: "10.18", amount: "310", time: "25 min ago", type: "sell" },
  ];

  return (
    <section className="px-4 py-4 sm:px-6 md:px-8">
      <m.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
        className="mx-auto max-w-xl"
      >
        <div
          className="overflow-hidden rounded-2xl border"
          style={{
            backgroundColor: SURFACE_CARD,
            borderColor: BORDER_DARK,
            boxShadow: `0 4px 24px rgba(0,0,0,0.3), 0 0 0 1px ${BORDER_SUBTLE}`,
          }}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-5 pt-5 sm:px-6 sm:pt-6">
            <div className="flex items-center gap-3">
              <TokenBadge type="senior" />
              <div>
                <p className="text-sm font-bold" style={{ color: TEXT_WHITE }}>
                  sSAFE-Austin
                </p>
                <p className="text-[10px]" style={{ color: TEXT_DIM }}>
                  Senior Token — Austin Property
                </p>
              </div>
            </div>
            <div
              className="flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-medium"
              style={{
                backgroundColor: `${NAVY[500]}20`,
                color: NAVY[200],
                border: `1px solid ${NAVY[500]}30`,
              }}
            >
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <path d="M5 1L5 9M2 4L5 1L8 4" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
              </svg>
              Polygon Amoy Testnet
            </div>
          </div>

          {/* Price */}
          <div className="px-5 pt-4 sm:px-6">
            <div className="flex items-baseline gap-3">
              <span
                className="font-mono text-3xl font-bold tabular-nums"
                style={{ color: TEXT_WHITE }}
              >
                $10.24
              </span>
              <span
                className="flex items-center gap-1 font-mono text-sm font-semibold tabular-nums"
                style={{ color: POSITIVE }}
              >
                +2.1%
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                  <path d="M5 8V2M2.5 4.5L5 2L7.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </div>
            <p className="mt-0.5 text-xs" style={{ color: TEXT_DIM }}>24h change</p>
          </div>

          {/* Price chart */}
          <div className="px-5 pt-3 sm:px-6">
            <div className="overflow-hidden rounded-xl border p-3" style={{ backgroundColor: SURFACE_DARK, borderColor: BORDER_DARK }}>
              <PriceChart />
            </div>
          </div>

          {/* Volume stats */}
          <div className="mx-5 mt-4 grid grid-cols-2 gap-px overflow-hidden rounded-xl sm:mx-6" style={{ backgroundColor: BORDER_DARK }}>
            <div className="p-3 text-center" style={{ backgroundColor: SURFACE_DARK }}>
              <p className="text-[10px] font-medium uppercase tracking-wider" style={{ color: TEXT_DIM }}>
                Total Volume
              </p>
              <p className="mt-1 font-mono text-sm font-bold tabular-nums" style={{ color: TEXT_WHITE }}>
                $1.2M
              </p>
            </div>
            <div className="p-3 text-center" style={{ backgroundColor: SURFACE_DARK }}>
              <p className="text-[10px] font-medium uppercase tracking-wider" style={{ color: TEXT_DIM }}>
                24h Volume
              </p>
              <p className="mt-1 font-mono text-sm font-bold tabular-nums" style={{ color: TEXT_WHITE }}>
                $45K
              </p>
            </div>
          </div>

          {/* Trade form */}
          <div className="px-5 pt-5 sm:px-6">
            {/* Buy/Sell toggle */}
            <div
              className="flex overflow-hidden rounded-lg p-1"
              style={{ backgroundColor: SURFACE_DARK }}
            >
              {(["buy", "sell"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setTradeTab(tab)}
                  className="flex flex-1 min-h-10 items-center justify-center rounded-md text-xs font-bold uppercase tracking-wider transition-all"
                  style={{
                    backgroundColor:
                      tradeTab === tab
                        ? tab === "buy"
                          ? POSITIVE
                          : NEGATIVE
                        : "transparent",
                    color:
                      tradeTab === tab
                        ? "white"
                        : TEXT_DIM,
                  }}
                >
                  {tab === "buy" ? "Buy sSAFE" : "Sell sSAFE"}
                </button>
              ))}
            </div>

            {/* Amount input */}
            <div className="mt-4">
              <label className="text-[10px] font-bold uppercase tracking-wider" style={{ color: TEXT_DIM }}>
                Amount
              </label>
              <div
                className="mt-1.5 flex items-center overflow-hidden rounded-xl border"
                style={{ backgroundColor: SURFACE_DARK, borderColor: BORDER_DARK }}
              >
                <input
                  type="text"
                  defaultValue="100"
                  className="flex-1 bg-transparent px-4 py-3 font-mono text-sm font-semibold tabular-nums outline-none"
                  style={{ color: TEXT_WHITE }}
                  readOnly
                />
                <div
                  className="flex items-center gap-1.5 px-4 text-xs font-medium"
                  style={{ color: TEXT_DIM }}
                >
                  <TokenBadge type="senior" />
                </div>
              </div>
              <div className="mt-1.5 flex items-center justify-between text-[10px]" style={{ color: TEXT_DIM }}>
                <span>
                  Total: <span className="font-mono font-semibold" style={{ color: TEXT_LIGHT }}>$1,024.00</span>
                </span>
                <span>
                  Balance: <span className="font-mono font-medium">500 sSAFE</span>
                </span>
              </div>
            </div>

            {/* Submit */}
            <button
              className="mt-4 flex min-h-12 w-full items-center justify-center rounded-xl text-sm font-bold transition-all"
              style={{
                backgroundColor: tradeTab === "buy" ? POSITIVE : NEGATIVE,
                color: "white",
                boxShadow: `0 4px 14px ${tradeTab === "buy" ? POSITIVE : NEGATIVE}30`,
              }}
            >
              {tradeTab === "buy" ? "Buy 100 sSAFE" : "Sell 100 sSAFE"}
            </button>
          </div>

          {/* Recent trades */}
          <div className="px-5 pt-5 pb-5 sm:px-6">
            <p className="mb-3 text-xs font-bold uppercase tracking-wider" style={{ color: TEXT_DIM }}>
              Recent Trades
            </p>
            <div
              className="overflow-hidden rounded-xl border"
              style={{ borderColor: BORDER_DARK }}
            >
              {/* Table header */}
              <div
                className="grid grid-cols-4 gap-2 px-4 py-2 text-[10px] font-bold uppercase tracking-wider"
                style={{ backgroundColor: SURFACE_DARK, color: TEXT_DIM }}
              >
                <span>Price</span>
                <span>Amount</span>
                <span>Time</span>
                <span className="text-right">Side</span>
              </div>
              {/* Rows */}
              {recentTrades.map((trade, i) => (
                <div
                  key={i}
                  className="grid grid-cols-4 items-center gap-2 border-t px-4 py-2.5"
                  style={{
                    borderColor: BORDER_DARK,
                    backgroundColor: i % 2 === 0 ? "transparent" : `${SURFACE_DARK}80`,
                  }}
                >
                  <span className="font-mono text-xs font-semibold tabular-nums" style={{ color: TEXT_WHITE }}>
                    ${trade.price}
                  </span>
                  <span className="font-mono text-xs tabular-nums" style={{ color: TEXT_LIGHT }}>
                    {trade.amount}
                  </span>
                  <span className="text-[11px]" style={{ color: TEXT_DIM }}>
                    {trade.time}
                  </span>
                  <span className="text-right">
                    <span
                      className="rounded-full px-2 py-0.5 text-[9px] font-bold uppercase"
                      style={{
                        backgroundColor: trade.type === "buy" ? `${POSITIVE}18` : `${NEGATIVE}18`,
                        color: trade.type === "buy" ? POSITIVE : NEGATIVE,
                      }}
                    >
                      {trade.type}
                    </span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </m.div>
    </section>
  );
}

// ─── Nav Bar ───────────────────────────────────────────────────────────────
function DemoNav() {
  return (
    <header
      className="sticky top-0 z-50 border-b backdrop-blur-md"
      style={{
        backgroundColor: `${BG_DARK}ee`,
        borderColor: BORDER_DARK,
      }}
    >
      <div className="mx-auto flex h-14 max-w-xl items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-2.5">
          {/* Logo mark */}
          <div
            className="flex size-8 items-center justify-center rounded-lg"
            style={{
              background: `linear-gradient(135deg, ${GOLD[600]}, ${GOLD[400]})`,
            }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M4 12V6L8 3L12 6V12L8 14.5L4 12Z" stroke={NAVY[950]} strokeWidth="1.5" strokeLinejoin="round" />
              <path d="M8 8.5V14.5" stroke={NAVY[950]} strokeWidth="1.5" />
              <path d="M4 6L8 8.5L12 6" stroke={NAVY[950]} strokeWidth="1.5" />
            </svg>
          </div>
          <span className="text-sm font-bold" style={{ color: TEXT_WHITE }}>
            PropLend
          </span>
        </div>
        <div className="flex items-center gap-3">
          <div
            className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[10px] font-medium"
            style={{
              backgroundColor: SURFACE_DARK,
              border: `1px solid ${BORDER_DARK}`,
              color: TEXT_DIM,
            }}
          >
            <div className="size-1.5 rounded-full" style={{ backgroundColor: POSITIVE }} />
            <span className="font-mono">0x7c6b...f0a2</span>
          </div>
        </div>
      </div>
    </header>
  );
}

// ─── Footer ────────────────────────────────────────────────────────────────
function DemoFooter() {
  return (
    <footer
      className="border-t px-4 py-8 text-center"
      style={{ borderColor: BORDER_DARK, backgroundColor: SURFACE_DARK }}
    >
      <div className="mx-auto max-w-xl">
        <div className="flex items-center justify-center gap-2">
          <div
            className="flex size-6 items-center justify-center rounded"
            style={{
              background: `linear-gradient(135deg, ${GOLD[600]}, ${GOLD[400]})`,
            }}
          >
            <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
              <path d="M4 12V6L8 3L12 6V12L8 14.5L4 12Z" fill={NAVY[950]} />
            </svg>
          </div>
          <span className="text-sm font-bold" style={{ color: TEXT_WHITE }}>
            PropLend
          </span>
        </div>
        <p className="mt-3 text-xs leading-relaxed" style={{ color: TEXT_DIM }}>
          Tokenized real estate lending. Invest in property-backed tokens
          with transparent yields and blockchain-verified ownership.
        </p>
        <div className="mt-4 flex items-center justify-center gap-4 text-[10px]" style={{ color: TEXT_DIM }}>
          <span>Polygon Network</span>
          <span style={{ color: BORDER_DARK }}>|</span>
          <span>SEC Reg D 506(c)</span>
          <span style={{ color: BORDER_DARK }}>|</span>
          <span>Accredited Only</span>
        </div>
        <p className="mt-4 text-[10px]" style={{ color: "#3a5a7a" }}>
          &copy; 2026 PropLend Protocol. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────
export default function PropLendDemo() {
  return (
    <>
      {/* eslint-disable-next-line @next/next/no-page-custom-font */}
      <link
        href="https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=Inter:wght@400;500;600;700;800&family=Roboto+Mono:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />
      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
      <main
        className="min-h-screen antialiased"
        style={{
          backgroundColor: BG_DARK,
          fontFamily: "'Inter', system-ui, sans-serif",
          color: TEXT_WHITE,
        }}
      >
        <DemoNav />

        <SectionLabel
          label="Investment Opportunity"
          sublabel="Property-backed tokenized lending campaign"
        />
        <PropertyCampaign />

        <SectionDivider />

        <SectionLabel
          label="Portfolio Dashboard"
          sublabel="Track your holdings, earnings, and upcoming payouts"
        />
        <PortfolioDashboard />

        <SectionDivider />

        <SectionLabel
          label="Secondary Market"
          sublabel="Trade property tokens on the decentralized exchange"
        />
        <TradingView />

        <div className="h-12" />
        <DemoFooter />
      </main>
    </>
  );
}
