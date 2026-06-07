"use client";

import { motion as m } from "motion/react";
import { useState } from "react";

/* ═══════════════════════════════════════════════════════════════════════════
   ClearHold — Blockchain-Powered Real Estate Escrow Platform
   Demo page showcasing 3 key screens: Transaction Dashboard, Escrow Timeline,
   Smart Contract Summary
   ═══════════════════════════════════════════════════════════════════════════ */

// ─── Color Tokens ───────────────────────────────────────────────────────────
const C = {
  // Core palette
  teal: "#1A3C34",
  tealLight: "#2A5C4C",
  tealMuted: "#1A3C3480",
  gold: "#D4AF37",
  goldLight: "#D4AF3730",
  goldMuted: "#D4AF3760",

  // Backgrounds
  bgDeep: "#0B1A15",
  bgCard: "rgba(255,255,255,0.04)",
  bgCardHover: "rgba(255,255,255,0.07)",
  bgSurface: "#0F231D",

  // Status
  statusGreen: "#22c55e",
  statusGreenBg: "rgba(34,197,94,0.12)",
  statusTeal: "#2dd4bf",
  statusTealBg: "rgba(45,212,191,0.12)",
  statusGold: "#D4AF37",
  statusGoldBg: "rgba(212,175,55,0.12)",

  // Text
  textPrimary: "#f0fdf4",
  textSecondary: "#a7f3d0",
  textMuted: "#6b8f80",
  textDim: "#3d6356",

  // Borders
  borderCard: "rgba(255,255,255,0.06)",
  borderHover: "rgba(255,255,255,0.12)",
  borderGold: "rgba(212,175,55,0.25)",
} as const;

// ─── Utility: Truncate wallet address ───────────────────────────────────────
function truncAddr(addr: string) {
  return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
}

// ─── Shared Components ──────────────────────────────────────────────────────
function ScreenLabel({ children }: { children: React.ReactNode }) {
  return (
    <m.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="mb-6 flex items-center gap-3"
    >
      <div
        className="h-px flex-1"
        style={{ backgroundColor: C.borderCard }}
        aria-hidden="true"
      />
      <span
        className="text-xs font-medium uppercase tracking-[0.15em]"
        style={{ color: C.textMuted }}
      >
        {children}
      </span>
      <div
        className="h-px flex-1"
        style={{ backgroundColor: C.borderCard }}
        aria-hidden="true"
      />
    </m.div>
  );
}

function WalletBadge({ address }: { address: string }) {
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 font-mono text-xs"
      style={{
        backgroundColor: C.bgCard,
        border: `1px solid ${C.borderCard}`,
        color: C.textSecondary,
      }}
    >
      <span
        className="inline-block h-1.5 w-1.5 rounded-full"
        style={{ backgroundColor: C.statusTeal }}
        aria-hidden="true"
      />
      {truncAddr(address)}
    </span>
  );
}

function StatusBadge({
  label,
  variant,
}: {
  label: string;
  variant: "teal" | "gold" | "green";
}) {
  const styles = {
    teal: { bg: C.statusTealBg, color: C.statusTeal, border: `1px solid ${C.statusTeal}30` },
    gold: { bg: C.statusGoldBg, color: C.statusGold, border: `1px solid ${C.statusGold}30` },
    green: { bg: C.statusGreenBg, color: C.statusGreen, border: `1px solid ${C.statusGreen}30` },
  };
  const s = styles[variant];

  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[0.6875rem] font-semibold"
      style={{ backgroundColor: s.bg, color: s.color, border: s.border }}
    >
      <span
        className="inline-block h-1.5 w-1.5 rounded-full"
        style={{ backgroundColor: s.color }}
        aria-hidden="true"
      />
      {label}
    </span>
  );
}

function GlassCard({
  children,
  className = "",
  goldBorder = false,
  style = {},
}: {
  children: React.ReactNode;
  className?: string;
  goldBorder?: boolean;
  style?: React.CSSProperties;
}) {
  return (
    <div
      className={`backdrop-blur-sm ${className}`}
      style={{
        backgroundColor: C.bgCard,
        border: `1px solid ${goldBorder ? C.borderGold : C.borderCard}`,
        borderRadius: "0.875rem",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

// ─── Hero ───────────────────────────────────────────────────────────────────
function ClearHoldHero() {
  return (
    <section
      className="relative overflow-hidden"
      style={{
        background: `linear-gradient(160deg, ${C.bgDeep} 0%, ${C.teal} 50%, ${C.bgDeep} 100%)`,
        padding: "3.5rem 1.5rem 3rem",
      }}
    >
      {/* Radial accent glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-64 w-96 -translate-x-1/2 opacity-20 blur-[80px]"
        style={{ backgroundColor: C.gold }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-20 -right-20 h-48 w-48 rounded-full opacity-10 blur-3xl"
        style={{ backgroundColor: C.statusTeal }}
        aria-hidden="true"
      />

      {/* Grid pattern overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-lg text-center">
        {/* Logo */}
        <m.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.1 }}
          className="mb-5 flex justify-center"
        >
          <div
            className="flex items-center justify-center"
            style={{
              width: "4rem",
              height: "4rem",
              borderRadius: "1rem",
              background: `linear-gradient(135deg, ${C.teal} 0%, ${C.tealLight} 100%)`,
              border: `1px solid ${C.borderGold}`,
              boxShadow: `0 0 24px ${C.gold}20`,
            }}
          >
            {/* Shield + chain icon */}
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke={C.gold}
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              <path d="M9 12h6" />
              <path d="M12 9v6" />
            </svg>
          </div>
        </m.div>

        <m.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="text-3xl font-bold tracking-tight sm:text-4xl"
          style={{ color: C.textPrimary }}
        >
          <span style={{ color: C.gold }}>Clear</span>Hold
        </m.h1>

        <m.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mx-auto mt-3 max-w-sm text-sm leading-relaxed"
          style={{ color: C.textMuted }}
        >
          Blockchain-powered real estate escrow. Transparent, trustless,
          and secure settlement for property transactions.
        </m.p>

        {/* Feature pills */}
        <m.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="mt-4 flex flex-wrap justify-center gap-2"
        >
          {[
            { label: "Smart Contracts", color: C.statusTeal },
            { label: "USDC Escrow", color: C.gold },
            { label: "LayerZero Bridge", color: C.statusGreen },
          ].map((pill) => (
            <span
              key={pill.label}
              className="rounded-full px-3 py-1 text-[0.6875rem] font-medium"
              style={{
                backgroundColor: `${pill.color}15`,
                color: pill.color,
                border: `1px solid ${pill.color}25`,
              }}
            >
              {pill.label}
            </span>
          ))}
        </m.div>
      </div>
    </section>
  );
}

// ─── Screen 1: Transaction Dashboard ────────────────────────────────────────
function TransactionDashboard() {
  const stats = [
    {
      label: "Active Escrows",
      value: "3",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={C.statusTeal} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
      ),
      accent: C.statusTeal,
    },
    {
      label: "Total Value Locked",
      value: "$1.2M",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={C.gold} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="12" y1="1" x2="12" y2="23" />
          <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
        </svg>
      ),
      accent: C.gold,
    },
    {
      label: "Avg. Settlement",
      value: "4.2d",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={C.statusGreen} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
      ),
      accent: C.statusGreen,
    },
  ];

  const transactions = [
    {
      name: "Austin Single Family Renovation",
      status: "In Escrow",
      statusVariant: "teal" as const,
      amount: "$200,000 USDC",
      conditionsMet: 3,
      conditionsTotal: 5,
      counterparty: "Sarah M.",
      address: "0x7f2c...9a1b",
    },
    {
      name: "Miami Condo Pre-Construction",
      status: "Pending Buyer Review",
      statusVariant: "gold" as const,
      amount: "$450,000 USDC",
      conditionsMet: 1,
      conditionsTotal: 4,
      counterparty: "James K.",
      address: "0x3e8d...f42c",
    },
    {
      name: "Denver Duplex Flip",
      status: "Completed",
      statusVariant: "green" as const,
      amount: "$175,000 USDC",
      conditionsMet: 5,
      conditionsTotal: 5,
      counterparty: "Marcus T.",
      address: "0x9b1a...2d8e",
    },
  ];

  return (
    <m.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
      className="mx-auto w-full max-w-md"
    >
      {/* Header */}
      <GlassCard className="p-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-wider" style={{ color: C.textMuted }}>
              Dashboard
            </p>
            <h3 className="mt-0.5 text-lg font-semibold" style={{ color: C.textPrimary }}>
              Your Escrow Transactions
            </h3>
          </div>
          <WalletBadge address="0x1a3c8B7d...4f2b" />
        </div>

        {/* Stats */}
        <div className="mt-5 grid grid-cols-3 gap-3">
          {stats.map((stat, i) => (
            <m.div
              key={stat.label}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
              className="flex flex-col items-center gap-2 text-center"
              style={{
                padding: "0.875rem 0.5rem",
                borderRadius: "0.75rem",
                backgroundColor: C.bgSurface,
                border: `1px solid ${C.borderCard}`,
              }}
            >
              <div
                className="flex items-center justify-center rounded-lg"
                style={{
                  width: "2rem",
                  height: "2rem",
                  backgroundColor: `${stat.accent}15`,
                }}
              >
                {stat.icon}
              </div>
              <span
                className="font-mono text-xl font-bold tabular-nums"
                style={{ color: C.textPrimary }}
              >
                {stat.value}
              </span>
              <span className="text-[0.625rem] leading-tight" style={{ color: C.textMuted }}>
                {stat.label}
              </span>
            </m.div>
          ))}
        </div>
      </GlassCard>

      {/* Transaction list */}
      <div className="mt-3 flex flex-col gap-2.5">
        {transactions.map((tx, i) => (
          <m.div
            key={tx.name}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 + i * 0.12, duration: 0.5 }}
          >
            <GlassCard className="p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <p
                    className="truncate text-sm font-semibold"
                    style={{ color: C.textPrimary }}
                  >
                    {tx.name}
                  </p>
                  <div className="mt-1.5">
                    <StatusBadge label={tx.status} variant={tx.statusVariant} />
                  </div>
                </div>
                <p
                  className="shrink-0 font-mono text-sm font-bold tabular-nums"
                  style={{ color: C.gold }}
                >
                  {tx.amount}
                </p>
              </div>

              {/* Progress bar */}
              <div className="mt-3">
                <div
                  className="flex items-center justify-between text-xs"
                  style={{ color: C.textMuted }}
                >
                  <span>Conditions met</span>
                  <span className="font-mono tabular-nums" style={{ color: C.textSecondary }}>
                    {tx.conditionsMet}/{tx.conditionsTotal}
                  </span>
                </div>
                <div
                  className="mt-1.5 h-1.5 overflow-hidden"
                  style={{
                    borderRadius: "1rem",
                    backgroundColor: C.bgSurface,
                  }}
                >
                  <m.div
                    initial={{ width: 0 }}
                    whileInView={{
                      width: `${(tx.conditionsMet / tx.conditionsTotal) * 100}%`,
                    }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 1,
                      ease: "easeOut",
                      delay: 0.7 + i * 0.15,
                    }}
                    className="h-full"
                    style={{
                      borderRadius: "1rem",
                      backgroundColor:
                        tx.conditionsMet === tx.conditionsTotal
                          ? C.statusGreen
                          : C.statusTeal,
                    }}
                  />
                </div>
              </div>

              {/* Counterparty */}
              <div
                className="mt-3 flex items-center gap-2"
                style={{ borderTop: `1px solid ${C.borderCard}`, paddingTop: "0.75rem" }}
              >
                <div
                  className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[0.625rem] font-bold"
                  style={{
                    backgroundColor: C.bgSurface,
                    color: C.textSecondary,
                    border: `1px solid ${C.borderCard}`,
                  }}
                >
                  {tx.counterparty[0]}
                </div>
                <span className="text-xs" style={{ color: C.textMuted }}>
                  {tx.counterparty}
                </span>
                <span
                  className="ml-auto font-mono text-[0.625rem]"
                  style={{ color: C.textDim }}
                >
                  {tx.address}
                </span>
              </div>
            </GlassCard>
          </m.div>
        ))}
      </div>
    </m.div>
  );
}

// ─── Screen 2: Escrow Timeline ──────────────────────────────────────────────
function EscrowTimeline() {
  const steps = [
    {
      label: "Seller Created Escrow",
      description: "Smart contract deployed on Polygon Amoy",
      time: "Mar 28, 2026 — 10:24 AM",
      status: "completed" as const,
    },
    {
      label: "Buyer Reviewed Conditions",
      description: "All 5 conditions acknowledged and signed",
      time: "Mar 29, 2026 — 2:15 PM",
      status: "completed" as const,
    },
    {
      label: "Funds Deposited — $200,000 USDC",
      description: "Buyer deposited full escrow amount via USDC",
      time: "Mar 30, 2026 — 9:03 AM",
      status: "completed" as const,
      highlight: true,
    },
    {
      label: "Conditions Being Verified",
      description: "Automated oracle checks in progress",
      time: "In progress...",
      status: "active" as const,
    },
    {
      label: "48-Hour Dispute Window",
      description: "Both parties can raise disputes during this window",
      time: "Pending",
      status: "pending" as const,
    },
    {
      label: "Funds Released",
      description: "USDC transferred to seller upon completion",
      time: "Pending",
      status: "pending" as const,
    },
  ];

  const conditions = [
    { label: "Title Deed Transfer", done: true },
    { label: "Inspection Report", done: true },
    { label: "Appraisal Confirmation", done: false },
    { label: "Insurance Certificate", done: false },
  ];

  return (
    <m.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
      className="mx-auto w-full max-w-md"
    >
      {/* Timeline card */}
      <GlassCard className="p-5">
        <div className="flex items-center justify-between">
          <div>
            <p
              className="text-xs font-medium uppercase tracking-wider"
              style={{ color: C.textMuted }}
            >
              Escrow Timeline
            </p>
            <h3
              className="mt-0.5 text-base font-semibold"
              style={{ color: C.textPrimary }}
            >
              Austin Single Family Renovation
            </h3>
          </div>
          <StatusBadge label="In Escrow" variant="teal" />
        </div>

        {/* Timeline */}
        <div className="relative mt-6">
          {steps.map((step, i) => {
            const isLast = i === steps.length - 1;

            return (
              <m.div
                key={step.label}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.1, duration: 0.4 }}
                className="relative flex gap-3 pb-5"
              >
                {/* Vertical line */}
                {!isLast && (
                  <div
                    className="absolute left-[0.5625rem] top-6 w-px"
                    style={{
                      height: "calc(100% - 0.75rem)",
                      backgroundColor:
                        step.status === "completed"
                          ? C.statusTeal
                          : step.status === "active"
                            ? `${C.statusTeal}40`
                            : C.borderCard,
                    }}
                    aria-hidden="true"
                  />
                )}

                {/* Node */}
                <div className="relative shrink-0 pt-0.5">
                  {step.status === "completed" ? (
                    <div
                      className="flex h-[1.125rem] w-[1.125rem] items-center justify-center rounded-full"
                      style={{
                        backgroundColor: step.highlight
                          ? C.gold
                          : C.statusTeal,
                      }}
                    >
                      <svg
                        width="10"
                        height="10"
                        viewBox="0 0 16 16"
                        fill="none"
                        stroke="#fff"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M3 8.5l3.5 3.5 6.5-8" />
                      </svg>
                    </div>
                  ) : step.status === "active" ? (
                    <div className="relative">
                      <m.div
                        animate={{
                          scale: [1, 1.4, 1],
                          opacity: [0.4, 0, 0.4],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                        className="absolute inset-0 rounded-full"
                        style={{ backgroundColor: C.statusTeal }}
                        aria-hidden="true"
                      />
                      <div
                        className="relative h-[1.125rem] w-[1.125rem] rounded-full"
                        style={{
                          backgroundColor: C.bgSurface,
                          border: `2.5px solid ${C.statusTeal}`,
                        }}
                      >
                        <div
                          className="absolute left-1/2 top-1/2 h-1 w-1 -translate-x-1/2 -translate-y-1/2 rounded-full"
                          style={{ backgroundColor: C.statusTeal }}
                        />
                      </div>
                    </div>
                  ) : (
                    <div
                      className="h-[1.125rem] w-[1.125rem] rounded-full"
                      style={{
                        backgroundColor: C.bgSurface,
                        border: `2px solid ${C.borderCard}`,
                      }}
                    />
                  )}
                </div>

                {/* Content */}
                <div className="min-w-0 flex-1">
                  <p
                    className="text-sm font-semibold"
                    style={{
                      color:
                        step.status === "pending"
                          ? C.textMuted
                          : step.highlight
                            ? C.gold
                            : C.textPrimary,
                    }}
                  >
                    {step.label}
                  </p>
                  <p
                    className="mt-0.5 text-xs"
                    style={{ color: C.textDim }}
                  >
                    {step.description}
                  </p>
                  <p
                    className="mt-1 font-mono text-[0.625rem] tabular-nums"
                    style={{
                      color:
                        step.status === "active"
                          ? C.statusTeal
                          : C.textDim,
                    }}
                  >
                    {step.time}
                  </p>
                </div>
              </m.div>
            );
          })}
        </div>
      </GlassCard>

      {/* Condition checklist */}
      <GlassCard className="mt-3 p-5">
        <h4
          className="text-xs font-semibold uppercase tracking-wider"
          style={{ color: C.textMuted }}
        >
          Condition Checklist
        </h4>
        <div className="mt-3 flex flex-col gap-2">
          {conditions.map((c, i) => (
            <m.div
              key={c.label}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8 + i * 0.08, duration: 0.4 }}
              className="flex items-center gap-3"
              style={{
                padding: "0.625rem 0.75rem",
                borderRadius: "0.5rem",
                backgroundColor: c.done ? `${C.statusTeal}08` : C.bgSurface,
                border: `1px solid ${c.done ? `${C.statusTeal}20` : C.borderCard}`,
              }}
            >
              {c.done ? (
                <div
                  className="flex h-5 w-5 shrink-0 items-center justify-center rounded"
                  style={{ backgroundColor: C.statusTealBg }}
                >
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 16 16"
                    fill="none"
                    stroke={C.statusTeal}
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M3 8.5l3.5 3.5 6.5-8" />
                  </svg>
                </div>
              ) : (
                <div
                  className="h-5 w-5 shrink-0 rounded"
                  style={{
                    backgroundColor: C.bgSurface,
                    border: `1.5px solid ${C.borderCard}`,
                  }}
                />
              )}
              <span
                className="text-sm"
                style={{
                  color: c.done ? C.textSecondary : C.textMuted,
                }}
              >
                {c.label}
              </span>
              {c.done && (
                <span
                  className="ml-auto font-mono text-[0.625rem]"
                  style={{ color: C.textDim }}
                >
                  Verified
                </span>
              )}
            </m.div>
          ))}
        </div>
        <div className="mt-3 flex items-center justify-between">
          <span className="text-xs" style={{ color: C.textDim }}>
            Progress
          </span>
          <span
            className="font-mono text-xs font-semibold tabular-nums"
            style={{ color: C.textSecondary }}
          >
            2 / 4
          </span>
        </div>
        <div
          className="mt-1.5 h-1.5 overflow-hidden"
          style={{ borderRadius: "1rem", backgroundColor: C.bgSurface }}
        >
          <m.div
            initial={{ width: 0 }}
            whileInView={{ width: "50%" }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut", delay: 1 }}
            className="h-full"
            style={{ borderRadius: "1rem", backgroundColor: C.statusTeal }}
          />
        </div>
      </GlassCard>
    </m.div>
  );
}

// ─── Screen 3: Smart Contract Summary ───────────────────────────────────────
function SmartContractSummary() {
  const [copied, setCopied] = useState(false);

  const contractAddress = "0x7B4f...3E9a2D1c";

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <m.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
      className="mx-auto w-full max-w-md"
    >
      {/* Animated gold border card */}
      <div
        className="relative overflow-hidden"
        style={{ borderRadius: "0.875rem", padding: "1px" }}
      >
        {/* Animated border gradient */}
        <m.div
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          className="absolute inset-[-100%]"
          style={{
            background: `conic-gradient(from 0deg, transparent 0%, ${C.gold} 10%, transparent 20%, transparent 50%, ${C.gold}60 60%, transparent 70%)`,
          }}
          aria-hidden="true"
        />

        {/* Inner card */}
        <div
          className="relative"
          style={{
            backgroundColor: C.bgSurface,
            borderRadius: "calc(0.875rem - 1px)",
            padding: "1.25rem",
          }}
        >
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <p
                className="text-xs font-medium uppercase tracking-wider"
                style={{ color: C.textMuted }}
              >
                Smart Contract
              </p>
              <h3
                className="mt-0.5 text-base font-semibold"
                style={{ color: C.textPrimary }}
              >
                Escrow Contract
              </h3>
            </div>
            {/* Network badge */}
            <span
              className="flex items-center gap-1.5 rounded-full px-3 py-1 text-[0.6875rem] font-medium"
              style={{
                backgroundColor: `${C.statusTeal}15`,
                color: C.statusTeal,
                border: `1px solid ${C.statusTeal}25`,
              }}
            >
              <svg
                width="10"
                height="10"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
              </svg>
              Polygon Amoy
            </span>
          </div>

          {/* Contract address */}
          <div
            className="mt-4 flex items-center justify-between"
            style={{
              padding: "0.75rem",
              borderRadius: "0.5rem",
              backgroundColor: C.bgCard,
              border: `1px solid ${C.borderCard}`,
            }}
          >
            <div className="flex items-center gap-2">
              <span className="text-xs" style={{ color: C.textMuted }}>
                Address
              </span>
              <span
                className="font-mono text-sm font-medium"
                style={{ color: C.textSecondary }}
              >
                {contractAddress}
              </span>
            </div>
            <button
              onClick={handleCopy}
              className="flex min-h-8 min-w-8 items-center justify-center rounded-md transition-colors"
              style={{
                backgroundColor: copied
                  ? C.statusGreenBg
                  : "transparent",
                color: copied ? C.statusGreen : C.textMuted,
              }}
              aria-label="Copy contract address"
            >
              {copied ? (
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M3 8.5l3.5 3.5 6.5-8" />
                </svg>
              ) : (
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                </svg>
              )}
            </button>
          </div>

          {/* Key terms grid */}
          <div className="mt-4 grid grid-cols-2 gap-2">
            {[
              { label: "Escrow Amount", value: "$200,000 USDC", accent: C.gold },
              { label: "Dispute Period", value: "48 hours", accent: C.statusTeal },
              { label: "Expiry Date", value: "Apr 30, 2026", accent: C.textSecondary },
              { label: "Deployment Cost", value: "0.002 ETH", accent: C.textSecondary },
            ].map((term, i) => (
              <m.div
                key={term.label}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 + i * 0.08, duration: 0.4 }}
                style={{
                  padding: "0.75rem",
                  borderRadius: "0.5rem",
                  backgroundColor: C.bgCard,
                  border: `1px solid ${C.borderCard}`,
                }}
              >
                <p className="text-[0.625rem] uppercase tracking-wider" style={{ color: C.textDim }}>
                  {term.label}
                </p>
                <p
                  className="mt-1 font-mono text-sm font-semibold tabular-nums"
                  style={{ color: term.accent }}
                >
                  {term.value}
                </p>
              </m.div>
            ))}
          </div>

          {/* Participants */}
          <div className="mt-4">
            <p
              className="mb-2 text-[0.625rem] font-semibold uppercase tracking-wider"
              style={{ color: C.textDim }}
            >
              Participants
            </p>
            <div className="flex flex-col gap-2">
              {[
                { role: "Buyer", name: "Sarah M.", address: "0x7f2c...9a1b" },
                { role: "Seller", name: "Michael R.", address: "0x3e8d...f42c" },
              ].map((p) => (
                <div
                  key={p.role}
                  className="flex items-center justify-between"
                  style={{
                    padding: "0.625rem 0.75rem",
                    borderRadius: "0.5rem",
                    backgroundColor: C.bgCard,
                    border: `1px solid ${C.borderCard}`,
                  }}
                >
                  <div className="flex items-center gap-2">
                    <div
                      className="flex h-6 w-6 items-center justify-center rounded-full text-[0.625rem] font-bold"
                      style={{
                        backgroundColor: C.bgSurface,
                        color: C.textSecondary,
                        border: `1px solid ${C.borderCard}`,
                      }}
                    >
                      {p.name[0]}
                    </div>
                    <div>
                      <span className="text-xs font-medium" style={{ color: C.textPrimary }}>
                        {p.name}
                      </span>
                      <span className="ml-2 text-[0.625rem]" style={{ color: C.textMuted }}>
                        {p.role}
                      </span>
                    </div>
                  </div>
                  <span
                    className="font-mono text-[0.625rem]"
                    style={{ color: C.textDim }}
                  >
                    {p.address}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Cross-chain badge */}
          <m.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="mt-4 flex items-center justify-between"
            style={{
              padding: "0.75rem",
              borderRadius: "0.5rem",
              background: `linear-gradient(135deg, ${C.gold}08 0%, ${C.statusTeal}08 100%)`,
              border: `1px solid ${C.borderGold}`,
            }}
          >
            <div className="flex items-center gap-2">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke={C.gold}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
              </svg>
              <div>
                <p className="text-xs font-semibold" style={{ color: C.gold }}>
                  LayerZero Bridge Available
                </p>
                <p className="text-[0.625rem]" style={{ color: C.textDim }}>
                  Cross-chain settlement supported
                </p>
              </div>
            </div>
            <svg
              width="14"
              height="14"
              viewBox="0 0 16 16"
              fill="none"
              stroke={C.textDim}
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M6 4l4 4-4 4" />
            </svg>
          </m.div>
        </div>
      </div>
    </m.div>
  );
}

// ─── Section Divider ────────────────────────────────────────────────────────
function SectionDivider({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <m.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="py-8 text-center"
    >
      <h2
        className="text-lg font-semibold"
        style={{ color: C.textPrimary }}
      >
        {title}
      </h2>
      <p className="mt-1 text-sm" style={{ color: C.textMuted }}>
        {subtitle}
      </p>
    </m.div>
  );
}

// ─── Footer ─────────────────────────────────────────────────────────────────
function ClearHoldFooter() {
  return (
    <footer
      className="py-10 text-center"
      style={{ borderTop: `1px solid ${C.borderCard}` }}
    >
      <div className="flex items-center justify-center gap-2">
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke={C.gold}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <path d="M9 12h6" />
          <path d="M12 9v6" />
        </svg>
        <span
          className="text-base font-semibold"
          style={{ color: C.textPrimary }}
        >
          <span style={{ color: C.gold }}>Clear</span>Hold
        </span>
      </div>
      <p
        className="mx-auto mt-3 max-w-xs text-xs leading-relaxed"
        style={{ color: C.textDim }}
      >
        Transparent, trustless escrow for real estate. Built on Polygon with
        LayerZero cross-chain support.
      </p>
      <p className="mt-4 text-[0.6875rem]" style={{ color: C.textDim }}>
        &copy; {new Date().getFullYear()} ClearHold. Built by{" "}
        <a
          href="https://jaspire.co"
          className="underline transition-colors"
          style={{ color: C.gold }}
          target="_blank"
          rel="noopener noreferrer"
        >
          Jaspire
        </a>
      </p>
    </footer>
  );
}

// ─── Page ───────────────────────────────────────────────────────────────────
export default function ClearHoldDemo() {
  return (
    <main
      style={{
        backgroundColor: C.bgDeep,
        minHeight: "100dvh",
        color: C.textPrimary,
      }}
    >
      <ClearHoldHero />

      {/* Screen 1: Transaction Dashboard */}
      <section className="px-4 pb-4 pt-8 sm:px-6">
        <ScreenLabel>Screen 1 — Transaction Dashboard</ScreenLabel>
        <SectionDivider
          title="Transaction Dashboard"
          subtitle="Real-time overview of all escrow positions"
        />
        <TransactionDashboard />
      </section>

      {/* Screen 2: Escrow Timeline */}
      <section className="px-4 pb-4 pt-4 sm:px-6">
        <ScreenLabel>Screen 2 — Escrow Lifecycle</ScreenLabel>
        <SectionDivider
          title="Escrow Timeline"
          subtitle="Transparent step-by-step progress tracking"
        />
        <EscrowTimeline />
      </section>

      {/* Screen 3: Smart Contract Summary */}
      <section className="px-4 pb-8 pt-4 sm:px-6">
        <ScreenLabel>Screen 3 — Smart Contract</ScreenLabel>
        <SectionDivider
          title="Contract Details"
          subtitle="On-chain escrow parameters and participants"
        />
        <SmartContractSummary />
      </section>

      <ClearHoldFooter />
    </main>
  );
}
