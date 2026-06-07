"use client";

import { motion as m, AnimatePresence } from "motion/react";
import { useState } from "react";

/* ═══════════════════════════════════════════════════════════════════════════
   Colibri — AI-Powered French Literacy Platform for Children (Ages 5-6)
   Demo page showcasing 3 key screens: Lesson View, Syllable Table, Parent Dashboard
   ═══════════════════════════════════════════════════════════════════════════ */

// ─── Color Tokens ───────────────────────────────────────────────────────────
const C = {
  cream: "#fefce8",
  creamDark: "#fef9c3",
  green: "#22c55e",
  greenLight: "#dcfce7",
  greenDark: "#16a34a",
  coral: "#f87171",
  coralLight: "#fee2e2",
  sky: "#38bdf8",
  skyLight: "#e0f2fe",
  sun: "#fbbf24",
  sunLight: "#fef3c7",
  violet: "#a78bfa",
  violetLight: "#ede9fe",
  text: "#1c1917",
  textMuted: "#78716c",
  textLight: "#a8a29e",
  surface: "#ffffff",
  border: "#e7e5e4",
} as const;

// ─── Shared UI ──────────────────────────────────────────────────────────────
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
        style={{ backgroundColor: C.border }}
        aria-hidden="true"
      />
      <span
        className="text-xs font-semibold uppercase tracking-[0.15em]"
        style={{ color: C.textMuted, fontFamily: "'Nunito', sans-serif" }}
      >
        {children}
      </span>
      <div
        className="h-px flex-1"
        style={{ backgroundColor: C.border }}
        aria-hidden="true"
      />
    </m.div>
  );
}

function ColibriLogo() {
  return (
    <div className="flex items-center gap-2">
      {/* Hummingbird icon — simplified SVG */}
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        aria-hidden="true"
      >
        <circle cx="16" cy="16" r="14" fill={C.greenLight} />
        <path
          d="M10 18c2-4 6-6 10-4s4 6 2 8-6 2-8 0-4-4-4-4z"
          fill={C.green}
        />
        <circle cx="19" cy="14" r="1.5" fill={C.text} />
        <path
          d="M8 16c-2-1-3-3-2-4s3 0 4 1"
          stroke={C.green}
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
      <span
        className="text-xl font-bold"
        style={{ color: C.green, fontFamily: "'Nunito', sans-serif" }}
      >
        Colibri
      </span>
    </div>
  );
}

// ─── Screen 1: Phoneme Lesson View ──────────────────────────────────────────
function LessonView() {
  const [showGesture, setShowGesture] = useState(false);

  return (
    <m.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
      className="mx-auto w-full max-w-sm"
      style={{
        borderRadius: "1.5rem",
        backgroundColor: C.surface,
        boxShadow:
          "0 4px 6px -1px rgba(0,0,0,0.04), 0 10px 15px -3px rgba(0,0,0,0.06), 0 20px 25px -5px rgba(0,0,0,0.03)",
      }}
    >
      {/* Status bar */}
      <div
        className="flex items-center justify-between px-5 pt-5"
        style={{ fontFamily: "'Nunito', sans-serif" }}
      >
        <ColibriLogo />
        <span
          className="rounded-full px-3 py-1 text-xs font-semibold"
          style={{ backgroundColor: C.sunLight, color: "#92400e" }}
        >
          Phase 2
        </span>
      </div>

      {/* Progress bar */}
      <div className="px-5 pt-4">
        <div className="flex items-center justify-between text-xs" style={{ color: C.textMuted, fontFamily: "'Nunito', sans-serif" }}>
          <span>Lecon 3 / 53</span>
          <span className="font-semibold" style={{ color: C.green }}>6%</span>
        </div>
        <div
          className="mt-1.5 h-2.5 overflow-hidden"
          style={{ borderRadius: "1rem", backgroundColor: C.greenLight }}
        >
          <m.div
            initial={{ width: 0 }}
            whileInView={{ width: "6%" }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.5 }}
            className="h-full"
            style={{ borderRadius: "1rem", backgroundColor: C.green }}
          />
        </div>
      </div>

      {/* Phoneme display */}
      <div className="flex flex-col items-center px-5 pt-8">
        <m.div
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 15,
            delay: 0.3,
          }}
          className="relative flex items-center justify-center"
          style={{
            width: "8rem",
            height: "8rem",
            borderRadius: "50%",
            background: `linear-gradient(135deg, ${C.greenLight} 0%, ${C.surface} 100%)`,
            border: `3px solid ${C.green}`,
          }}
        >
          <span
            className="text-6xl font-extrabold"
            style={{ color: C.green, fontFamily: "'Nunito', sans-serif" }}
          >
            B
          </span>
          {/* Subtle ring pulse */}
          <m.div
            animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0, 0.3] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0"
            style={{
              borderRadius: "50%",
              border: `2px solid ${C.green}`,
            }}
            aria-hidden="true"
          />
        </m.div>

        {/* Keyword association */}
        <m.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mt-5 flex items-center gap-2"
        >
          <span
            className="text-lg"
            style={{ color: C.text, fontFamily: "'Nunito', sans-serif" }}
          >
            <span className="font-bold" style={{ color: C.green }}>
              B
            </span>{" "}
            comme{" "}
            <span className="font-bold" style={{ color: C.text }}>
              Bateau
            </span>
          </span>
          <span className="text-2xl" role="img" aria-label="bateau">
            {"\u26F5"}
          </span>
        </m.div>

        {/* Dual script display */}
        <div
          className="mt-3 flex items-center gap-4 text-sm"
          style={{ color: C.textMuted, fontFamily: "'Nunito', sans-serif" }}
        >
          <span className="flex items-center gap-1.5">
            <span
              className="inline-block h-1.5 w-1.5 rounded-full"
              style={{ backgroundColor: C.sky }}
              aria-hidden="true"
            />
            <span className="font-semibold">ba</span>
            <span className="text-xs" style={{ color: C.textLight }}>
              imprime
            </span>
          </span>
          <span className="flex items-center gap-1.5">
            <span
              className="inline-block h-1.5 w-1.5 rounded-full"
              style={{ backgroundColor: C.violet }}
              aria-hidden="true"
            />
            <span className="font-semibold italic">ba</span>
            <span className="text-xs" style={{ color: C.textLight }}>
              cursive
            </span>
          </span>
        </div>
      </div>

      {/* Gesture card */}
      <div className="px-5 pt-6">
        <button
          onClick={() => setShowGesture(!showGesture)}
          className="flex w-full items-center gap-3 transition-colors"
          style={{
            padding: "0.875rem 1rem",
            borderRadius: "1rem",
            backgroundColor: showGesture ? C.violetLight : "#fafaf9",
            border: `1px solid ${showGesture ? C.violet : C.border}`,
            fontFamily: "'Nunito', sans-serif",
          }}
          aria-expanded={showGesture}
        >
          {/* Hand gesture icon */}
          <div
            className="flex items-center justify-center"
            style={{
              width: "2.5rem",
              height: "2.5rem",
              borderRadius: "0.75rem",
              backgroundColor: C.violetLight,
            }}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke={C.violet}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 11V6a2 2 0 0 0-4 0v1" />
              <path d="M14 10V4a2 2 0 0 0-4 0v2" />
              <path d="M10 10.5V6a2 2 0 0 0-4 0v8" />
              <path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15" />
            </svg>
          </div>
          <div className="flex-1 text-left">
            <p className="text-sm font-semibold" style={{ color: C.text }}>
              Geste Borel-Maisonny
            </p>
            <p className="text-xs" style={{ color: C.textMuted }}>
              Appuie pour voir le geste
            </p>
          </div>
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            style={{
              transform: showGesture ? "rotate(180deg)" : "rotate(0deg)",
              transition: "transform 0.2s ease",
            }}
          >
            <path
              d="M4 6l4 4 4-4"
              stroke={C.textMuted}
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <AnimatePresence>
          {showGesture && (
            <m.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div
                className="mt-2 flex items-center justify-center"
                style={{
                  padding: "1.25rem",
                  borderRadius: "1rem",
                  backgroundColor: C.violetLight,
                  border: `1px dashed ${C.violet}40`,
                }}
              >
                {/* Stylized hand gesture illustration */}
                <div className="flex flex-col items-center gap-2">
                  <div
                    className="flex items-center justify-center"
                    style={{
                      width: "4rem",
                      height: "4rem",
                      borderRadius: "1rem",
                      backgroundColor: C.surface,
                    }}
                  >
                    <svg
                      width="36"
                      height="36"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke={C.violet}
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M18 11V6a2 2 0 0 0-4 0v1" />
                      <path d="M14 10V4a2 2 0 0 0-4 0v2" />
                      <path d="M10 10.5V6a2 2 0 0 0-4 0v8" />
                      <path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15" />
                    </svg>
                  </div>
                  <p
                    className="text-center text-xs"
                    style={{
                      color: C.textMuted,
                      fontFamily: "'Nunito', sans-serif",
                    }}
                  >
                    Poing ferme, pouce sur le cote
                    <br />
                    <span style={{ color: C.violet }}>
                      Le geste pour &laquo;&nbsp;B&nbsp;&raquo;
                    </span>
                  </p>
                </div>
              </div>
            </m.div>
          )}
        </AnimatePresence>
      </div>

      {/* Audio button */}
      <div className="flex justify-center px-5 pt-5">
        <m.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="flex items-center gap-2 transition-colors"
          style={{
            padding: "0.75rem 2rem",
            borderRadius: "2rem",
            backgroundColor: C.green,
            color: C.surface,
            fontFamily: "'Nunito', sans-serif",
            fontWeight: 700,
            fontSize: "0.9375rem",
          }}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
            <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
          </svg>
          Ecoute
        </m.button>
      </div>

      {/* Navigation */}
      <div
        className="mt-6 flex items-center justify-between border-t px-5 py-4"
        style={{ borderColor: C.border }}
      >
        <button
          className="flex min-h-11 items-center gap-1.5 text-sm font-semibold transition-colors"
          style={{ color: C.textMuted, fontFamily: "'Nunito', sans-serif" }}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M10 12L6 8l4-4" />
          </svg>
          Precedent
        </button>
        <div className="flex gap-1.5">
          {[0, 1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="h-1.5 rounded-full"
              style={{
                width: i === 2 ? "1.5rem" : "0.375rem",
                backgroundColor: i === 2 ? C.green : C.border,
                transition: "all 0.3s ease",
              }}
              aria-hidden="true"
            />
          ))}
        </div>
        <button
          className="flex min-h-11 items-center gap-1.5 text-sm font-semibold transition-colors"
          style={{ color: C.green, fontFamily: "'Nunito', sans-serif" }}
        >
          Suivant
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M6 4l4 4-4 4" />
          </svg>
        </button>
      </div>
    </m.div>
  );
}

// ─── Screen 2: Syllable Table ───────────────────────────────────────────────
function SyllableTable() {
  const [selectedSyllable, setSelectedSyllable] = useState<string | null>("ba");

  const syllables = [
    { text: "ba", bg: C.greenLight, accent: C.green },
    { text: "be", bg: C.skyLight, accent: C.sky },
    { text: "bi", bg: C.violetLight, accent: C.violet },
    { text: "bo", bg: C.sunLight, accent: C.sun },
    { text: "bu", bg: C.coralLight, accent: C.coral },
    { text: "be\u0301", bg: C.greenLight, accent: C.green },
    { text: "be\u0300", bg: C.skyLight, accent: C.sky },
    { text: "be\u0302", bg: C.violetLight, accent: C.violet },
  ];

  return (
    <m.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
      className="mx-auto w-full max-w-sm"
      style={{
        borderRadius: "1.5rem",
        backgroundColor: C.surface,
        boxShadow:
          "0 4px 6px -1px rgba(0,0,0,0.04), 0 10px 15px -3px rgba(0,0,0,0.06), 0 20px 25px -5px rgba(0,0,0,0.03)",
      }}
    >
      {/* Header */}
      <div className="px-5 pt-5">
        <div className="flex items-center justify-between">
          <ColibriLogo />
          <div
            className="flex items-center gap-1.5 text-xs font-semibold"
            style={{
              color: C.textMuted,
              fontFamily: "'Nunito', sans-serif",
            }}
          >
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
              <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
            </svg>
            8 syllabes
          </div>
        </div>

        <m.h2
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mt-4 text-xl font-extrabold"
          style={{ color: C.text, fontFamily: "'Nunito', sans-serif" }}
        >
          Syllabes avec{" "}
          <span style={{ color: C.green }}>B</span>
        </m.h2>
        <p
          className="mt-1 text-sm"
          style={{ color: C.textMuted, fontFamily: "'Nunito', sans-serif" }}
        >
          Appuie sur une syllabe pour l&apos;entendre
        </p>
      </div>

      {/* Syllable grid */}
      <div className="grid grid-cols-4 gap-3 p-5">
        {syllables.map((s, i) => {
          const isSelected = selectedSyllable === s.text;
          return (
            <m.button
              key={s.text}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 18,
                delay: 0.1 + i * 0.06,
              }}
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.94 }}
              onClick={() => setSelectedSyllable(isSelected ? null : s.text)}
              className="relative flex aspect-square items-center justify-center transition-shadow"
              style={{
                borderRadius: "1rem",
                backgroundColor: isSelected ? s.bg : s.bg,
                border: isSelected
                  ? `2.5px solid ${s.accent}`
                  : `1.5px solid transparent`,
                boxShadow: isSelected
                  ? `0 0 0 4px ${s.accent}20`
                  : "none",
              }}
              aria-label={`Syllabe ${s.text}`}
              aria-pressed={isSelected}
            >
              <span
                className="text-2xl font-bold"
                style={{
                  color: isSelected ? s.accent : C.text,
                  fontFamily: "'Nunito', sans-serif",
                }}
              >
                {s.text}
              </span>
              {isSelected && (
                <m.div
                  layoutId="syllable-selected"
                  className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full"
                  style={{ backgroundColor: s.accent }}
                >
                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 16 16"
                    fill="none"
                    stroke={C.surface}
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M3 8.5l3.5 3.5 6.5-8" />
                  </svg>
                </m.div>
              )}
            </m.button>
          );
        })}
      </div>

      {/* Selected syllable detail */}
      <AnimatePresence mode="wait">
        {selectedSyllable && (
          <m.div
            key={selectedSyllable}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden px-5 pb-2"
          >
            <div
              className="flex items-center justify-between"
              style={{
                padding: "0.75rem 1rem",
                borderRadius: "0.75rem",
                backgroundColor: "#fafaf9",
                border: `1px solid ${C.border}`,
              }}
            >
              <div className="flex items-center gap-3">
                <div className="flex items-baseline gap-1.5">
                  <span
                    className="text-lg font-bold"
                    style={{
                      color: C.text,
                      fontFamily: "'Nunito', sans-serif",
                    }}
                  >
                    {selectedSyllable}
                  </span>
                  <span
                    className="text-lg font-bold italic"
                    style={{
                      color: C.violet,
                      fontFamily: "'Nunito', sans-serif",
                    }}
                  >
                    {selectedSyllable}
                  </span>
                </div>
                <span
                  className="text-xs"
                  style={{
                    color: C.textLight,
                    fontFamily: "'Nunito', sans-serif",
                  }}
                >
                  imprime / cursive
                </span>
              </div>
              <button
                className="flex items-center justify-center transition-colors"
                style={{
                  width: "2.25rem",
                  height: "2.25rem",
                  borderRadius: "50%",
                  backgroundColor: C.greenLight,
                  color: C.green,
                }}
                aria-label={`Ecouter ${selectedSyllable}`}
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                  <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                </svg>
              </button>
            </div>
          </m.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <div
        className="mt-2 flex items-center justify-center gap-2 border-t px-5 py-4"
        style={{ borderColor: C.border }}
      >
        <span
          className="text-xs"
          style={{ color: C.textLight, fontFamily: "'Nunito', sans-serif" }}
        >
          Phoneme&nbsp;
        </span>
        <span
          className="rounded-full px-2 py-0.5 text-xs font-bold"
          style={{
            backgroundColor: C.greenLight,
            color: C.greenDark,
            fontFamily: "'Nunito', sans-serif",
          }}
        >
          /b/
        </span>
        <span className="text-xs" style={{ color: C.textLight }}>
          &middot;
        </span>
        <span
          className="text-xs"
          style={{ color: C.textLight, fontFamily: "'Nunito', sans-serif" }}
        >
          Methode Borel-Maisonny
        </span>
      </div>
    </m.div>
  );
}

// ─── Screen 3: Parent Progress Dashboard ────────────────────────────────────
function ParentDashboard() {
  const phases = [
    { name: "Phase 1 — Voyelles", progress: 100, color: C.green },
    { name: "Phase 2 — Consonnes", progress: 60, color: C.sky },
    { name: "Phase 3 — Digraphes", progress: 0, color: C.violet },
  ];

  const recentLessons = [
    {
      date: "Aujourd'hui",
      name: 'Lecon 12 — Lettre "F"',
      score: 94,
      status: "Excellent",
      statusColor: C.green,
    },
    {
      date: "Hier",
      name: 'Lecon 11 — Lettre "D"',
      score: 87,
      status: "Tres bien",
      statusColor: C.sky,
    },
    {
      date: "30 Mars",
      name: 'Lecon 10 — Lettre "T"',
      score: 91,
      status: "Excellent",
      statusColor: C.green,
    },
  ];

  return (
    <m.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
      className="mx-auto w-full max-w-md"
      style={{
        borderRadius: "1.25rem",
        backgroundColor: C.surface,
        boxShadow:
          "0 4px 6px -1px rgba(0,0,0,0.04), 0 10px 15px -3px rgba(0,0,0,0.06), 0 20px 25px -5px rgba(0,0,0,0.03)",
      }}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between px-6 pt-6"
        style={{ fontFamily: "'Inter', sans-serif" }}
      >
        <div>
          <p className="text-xs font-medium uppercase tracking-wider" style={{ color: C.textLight }}>
            Tableau de bord
          </p>
          <h3
            className="mt-0.5 text-lg font-semibold"
            style={{ color: C.text }}
          >
            Progres de Marie
          </h3>
        </div>
        {/* Avatar with progress ring */}
        <div className="relative">
          <svg
            width="48"
            height="48"
            viewBox="0 0 48 48"
            className="-rotate-90"
          >
            <circle
              cx="24"
              cy="24"
              r="20"
              fill="none"
              stroke={C.border}
              strokeWidth="3"
            />
            <m.circle
              cx="24"
              cy="24"
              r="20"
              fill="none"
              stroke={C.green}
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 20}`}
              initial={{ strokeDashoffset: 2 * Math.PI * 20 }}
              whileInView={{
                strokeDashoffset: 2 * Math.PI * 20 * (1 - 0.23),
              }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
            />
          </svg>
          <div
            className="absolute inset-0 flex items-center justify-center"
          >
            <div
              className="flex items-center justify-center rounded-full text-sm"
              style={{
                width: "2rem",
                height: "2rem",
                backgroundColor: C.sunLight,
                fontFamily: "'Inter', sans-serif",
              }}
            >
              {"\uD83D\uDC67"}
            </div>
          </div>
        </div>
      </div>

      {/* Stats row */}
      <div className="mt-5 grid grid-cols-3 gap-3 px-6">
        {[
          { label: "Lecons", value: "12/53", icon: "\uD83D\uDCDA" },
          { label: "Gestes", value: "87%", icon: "\u270B" },
          { label: "Prononciation", value: "92%", icon: "\uD83C\uDFA4" },
        ].map((stat, i) => (
          <m.div
            key={stat.label}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
            className="flex flex-col items-center gap-1 text-center"
            style={{
              padding: "0.75rem 0.5rem",
              borderRadius: "0.75rem",
              backgroundColor: "#fafaf9",
              border: `1px solid ${C.border}`,
              fontFamily: "'Inter', sans-serif",
            }}
          >
            <span className="text-lg">{stat.icon}</span>
            <span
              className="text-lg font-bold tabular-nums"
              style={{ color: C.text }}
            >
              {stat.value}
            </span>
            <span className="text-[0.6875rem]" style={{ color: C.textMuted }}>
              {stat.label}
            </span>
          </m.div>
        ))}
      </div>

      {/* Phase progress */}
      <div className="mt-6 px-6">
        <h4
          className="mb-3 text-xs font-semibold uppercase tracking-wider"
          style={{
            color: C.textMuted,
            fontFamily: "'Inter', sans-serif",
          }}
        >
          Progression par phase
        </h4>
        <div className="flex flex-col gap-3">
          {phases.map((phase, i) => (
            <m.div
              key={phase.name}
              initial={{ opacity: 0, x: -15 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 + i * 0.12, duration: 0.5 }}
            >
              <div
                className="flex items-center justify-between text-sm"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                <span style={{ color: C.text }}>{phase.name}</span>
                <span
                  className="font-semibold tabular-nums"
                  style={{ color: phase.progress > 0 ? phase.color : C.textLight }}
                >
                  {phase.progress}%
                </span>
              </div>
              <div
                className="mt-1.5 h-2 overflow-hidden"
                style={{
                  borderRadius: "1rem",
                  backgroundColor:
                    phase.progress === 0 ? "#f5f5f4" : `${phase.color}20`,
                }}
              >
                <m.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${phase.progress}%` }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 1,
                    ease: "easeOut",
                    delay: 0.7 + i * 0.15,
                  }}
                  className="h-full"
                  style={{
                    borderRadius: "1rem",
                    backgroundColor: phase.color,
                  }}
                />
              </div>
            </m.div>
          ))}
        </div>
      </div>

      {/* Recent lessons */}
      <div className="mt-6 px-6 pb-6">
        <h4
          className="mb-3 text-xs font-semibold uppercase tracking-wider"
          style={{
            color: C.textMuted,
            fontFamily: "'Inter', sans-serif",
          }}
        >
          Activite recente
        </h4>
        <div className="flex flex-col gap-2">
          {recentLessons.map((lesson, i) => (
            <m.div
              key={lesson.name}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8 + i * 0.1, duration: 0.4 }}
              className="flex items-center gap-3"
              style={{
                padding: "0.75rem",
                borderRadius: "0.75rem",
                backgroundColor: "#fafaf9",
                border: `1px solid ${C.border}`,
                fontFamily: "'Inter', sans-serif",
              }}
            >
              {/* Score circle */}
              <div
                className="flex shrink-0 items-center justify-center rounded-full text-sm font-bold"
                style={{
                  width: "2.25rem",
                  height: "2.25rem",
                  backgroundColor: `${lesson.statusColor}15`,
                  color: lesson.statusColor,
                }}
              >
                {lesson.score}
              </div>
              <div className="min-w-0 flex-1">
                <p
                  className="truncate text-sm font-medium"
                  style={{ color: C.text }}
                >
                  {lesson.name}
                </p>
                <p className="text-xs" style={{ color: C.textMuted }}>
                  {lesson.date}
                </p>
              </div>
              <span
                className="shrink-0 rounded-full px-2 py-0.5 text-[0.6875rem] font-semibold"
                style={{
                  backgroundColor: `${lesson.statusColor}15`,
                  color: lesson.statusColor,
                }}
              >
                {lesson.status}
              </span>
            </m.div>
          ))}
        </div>
      </div>
    </m.div>
  );
}

// ─── Hero Section ───────────────────────────────────────────────────────────
function ColibriHero() {
  return (
    <section
      className="relative overflow-hidden"
      style={{
        background: `linear-gradient(135deg, ${C.cream} 0%, ${C.greenLight} 50%, ${C.cream} 100%)`,
        padding: "4rem 1.5rem 3rem",
      }}
    >
      {/* Decorative blobs */}
      <div
        className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full opacity-30 blur-3xl"
        style={{ backgroundColor: C.green }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-16 -right-16 h-48 w-48 rounded-full opacity-20 blur-3xl"
        style={{ backgroundColor: C.sun }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute right-10 top-20 h-32 w-32 rounded-full opacity-20 blur-2xl"
        style={{ backgroundColor: C.violet }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-lg text-center">
        {/* Logo */}
        <m.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 20,
            delay: 0.1,
          }}
          className="mb-5 flex justify-center"
        >
          <div
            className="flex items-center justify-center"
            style={{
              width: "4.5rem",
              height: "4.5rem",
              borderRadius: "1.25rem",
              backgroundColor: C.surface,
              boxShadow: "0 4px 12px rgba(34, 197, 94, 0.15)",
            }}
          >
            <svg
              width="40"
              height="40"
              viewBox="0 0 32 32"
              fill="none"
              aria-hidden="true"
            >
              <circle cx="16" cy="16" r="14" fill={C.greenLight} />
              <path
                d="M10 18c2-4 6-6 10-4s4 6 2 8-6 2-8 0-4-4-4-4z"
                fill={C.green}
              />
              <circle cx="19" cy="14" r="1.5" fill={C.text} />
              <path
                d="M8 16c-2-1-3-3-2-4s3 0 4 1"
                stroke={C.green}
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </m.div>

        <m.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="text-3xl font-extrabold tracking-tight sm:text-4xl"
          style={{
            color: C.text,
            fontFamily: "'Nunito', sans-serif",
          }}
        >
          <span style={{ color: C.green }}>Colibri</span>
          <br />
          <span className="text-xl font-semibold sm:text-2xl" style={{ color: C.textMuted }}>
            Apprendre a lire en francais
          </span>
        </m.h1>

        <m.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mx-auto mt-4 max-w-sm text-sm leading-relaxed"
          style={{
            color: C.textMuted,
            fontFamily: "'Nunito', sans-serif",
          }}
        >
          Une plateforme d&apos;alphabetisation alimentee par l&apos;IA, concue pour
          les enfants de 5 a 6 ans. Methode phonemique + gestes
          Borel-Maisonny.
        </m.p>

        {/* Feature pills */}
        <m.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="mt-5 flex flex-wrap justify-center gap-2"
        >
          {[
            { label: "53 lecons", bg: C.greenLight, color: C.greenDark },
            { label: "Gestes BM", bg: C.violetLight, color: "#7c3aed" },
            { label: "IA adaptative", bg: C.skyLight, color: "#0284c7" },
            { label: "Suivi parental", bg: C.sunLight, color: "#92400e" },
          ].map((pill) => (
            <span
              key={pill.label}
              className="rounded-full px-3 py-1 text-xs font-semibold"
              style={{
                backgroundColor: pill.bg,
                color: pill.color,
                fontFamily: "'Nunito', sans-serif",
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

// ─── Section Divider ────────────────────────────────────────────────────────
function SectionDivider({
  icon,
  title,
  subtitle,
}: {
  icon: string;
  title: string;
  subtitle: string;
}) {
  return (
    <m.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="py-10 text-center"
    >
      <span className="mb-2 block text-2xl">{icon}</span>
      <h2
        className="text-xl font-bold"
        style={{ color: C.text, fontFamily: "'Nunito', sans-serif" }}
      >
        {title}
      </h2>
      <p
        className="mt-1 text-sm"
        style={{ color: C.textMuted, fontFamily: "'Nunito', sans-serif" }}
      >
        {subtitle}
      </p>
    </m.div>
  );
}

// ─── Footer ─────────────────────────────────────────────────────────────────
function ColibriFooter() {
  return (
    <footer
      className="py-10 text-center"
      style={{
        backgroundColor: C.surface,
        borderTop: `1px solid ${C.border}`,
      }}
    >
      <ColibriLogo />
      <p
        className="mx-auto mt-3 max-w-xs text-xs leading-relaxed"
        style={{ color: C.textLight, fontFamily: "'Nunito', sans-serif" }}
      >
        Colibri est un outil pedagogique numerique pour l&apos;apprentissage de
        la lecture en francais, destine aux enfants de 5 a 6 ans.
      </p>
      <p
        className="mt-4 text-[0.6875rem]"
        style={{ color: C.textLight, fontFamily: "'Inter', sans-serif" }}
      >
        &copy; {new Date().getFullYear()} Colibri. Projet developpe par{" "}
        <a
          href="https://jaspire.co"
          className="underline transition-colors"
          style={{ color: C.green }}
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
export default function TutorSiteDemo() {
  return (
    <>
      {/* Load Nunito + Inter for child & parent views */}
      {/* eslint-disable-next-line @next/next/no-page-custom-font */}
      <link
        href="https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,400;0,600;0,700;0,800;1,400;1,700&family=Inter:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />
      <main
        style={{
          backgroundColor: C.cream,
          fontFamily: "'Nunito', sans-serif",
          minHeight: "100dvh",
        }}
      >
        <ColibriHero />

        {/* Screen 1: Lesson View */}
        <section className="px-4 pb-4 pt-6 sm:px-6">
          <ScreenLabel>Ecran 1 — Presentation du phoneme</ScreenLabel>
          <SectionDivider
            icon={"\uD83D\uDD24"}
            title="Vue Lecon"
            subtitle="Presentation phonemique avec geste associe"
          />
          <LessonView />
        </section>

        {/* Screen 2: Syllable Table */}
        <section className="px-4 pb-4 pt-2 sm:px-6">
          <ScreenLabel>Ecran 2 — Tableau des syllabes</ScreenLabel>
          <SectionDivider
            icon={"\uD83D\uDCDD"}
            title="Tableau de Syllabes"
            subtitle="Grille interactive avec ecoute audio"
          />
          <SyllableTable />
        </section>

        {/* Screen 3: Parent Dashboard */}
        <section className="px-4 pb-8 pt-2 sm:px-6">
          <ScreenLabel>Ecran 3 — Tableau de bord parental</ScreenLabel>
          <SectionDivider
            icon={"\uD83D\uDCCA"}
            title="Tableau de Bord Parent"
            subtitle="Suivi detaille de la progression"
          />
          <ParentDashboard />
        </section>

        <ColibriFooter />
      </main>
    </>
  );
}
