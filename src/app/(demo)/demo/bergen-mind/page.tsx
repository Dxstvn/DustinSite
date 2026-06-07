"use client";

import { motion as m, useMotionValue, useTransform, animate } from "motion/react";
import { useState, useEffect } from "react";

/* ═══════════════════════════════════════════════════════════════════════════
   Bergen Mind & Wellness — Bilingual Mental Health Platform Demo
   Colors: Teal #14b8a6 primary, Warm cream #FAFAF5 bg, Sage #e8f0ec surface
   ═══════════════════════════════════════════════════════════════════════════ */

const TEAL = {
  50: "#f0fdfa",
  100: "#ccfbf1",
  200: "#99f6e4",
  300: "#5eead4",
  400: "#2dd4bf",
  500: "#14b8a6",
  600: "#0d9488",
  700: "#0f766e",
  800: "#115e59",
  900: "#134e4a",
  950: "#042f2e",
};

const CREAM = "#FAFAF5";
const SURFACE = "#f0f5f2";
const TEXT_PRIMARY = "#1a2e2a";
const TEXT_SECONDARY = "#4a6660";
const TEXT_MUTED = "#7a948e";
const BORDER = "#d4e4de";

// ─── Animated Score Gauge ──────────────────────────────────────────────────
function ScoreGauge({ score, maxScore }: { score: number; maxScore: number }) {
  const motionVal = useMotionValue(0);
  const dashOffset = useTransform(motionVal, (v) => {
    const circumference = 2 * Math.PI * 54;
    const progress = v / maxScore;
    return circumference - progress * circumference * 0.75; // 270deg arc
  });
  const displayScore = useTransform(motionVal, (v) => Math.round(v));
  const [rendered, setRendered] = useState(0);

  useEffect(() => {
    const controls = animate(motionVal, score, {
      duration: 1.4,
      ease: [0.25, 0.1, 0.25, 1],
    });
    const unsub = displayScore.on("change", (v) => setRendered(v));
    return () => {
      controls.stop();
      unsub();
    };
  }, [score, motionVal, displayScore]);

  const circumference = 2 * Math.PI * 54;

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width="160" height="160" viewBox="0 0 120 120" className="-rotate-[135deg]">
        {/* Background track */}
        <circle
          cx="60"
          cy="60"
          r="54"
          fill="none"
          stroke={BORDER}
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference * 0.25}
        />
        {/* Animated fill */}
        <m.circle
          cx="60"
          cy="60"
          r="54"
          fill="none"
          stroke="url(#tealGradient)"
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circumference}
          style={{ strokeDashoffset: dashOffset }}
        />
        <defs>
          <linearGradient id="tealGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={TEAL[400]} />
            <stop offset="100%" stopColor={TEAL[700]} />
          </linearGradient>
        </defs>
      </svg>
      {/* Center text */}
      <div className="absolute flex flex-col items-center">
        <span
          className="text-4xl font-bold tabular-nums"
          style={{ color: TEXT_PRIMARY }}
        >
          {rendered}
        </span>
        <span className="text-xs" style={{ color: TEXT_MUTED }}>
          out of {maxScore}
        </span>
      </div>
    </div>
  );
}

// ─── Section Divider ───────────────────────────────────────────────────────
function SectionDivider() {
  return (
    <div className="flex items-center justify-center py-16 md:py-20">
      <div className="flex items-center gap-3">
        <div className="h-px w-12 md:w-20" style={{ backgroundColor: BORDER }} />
        <div className="size-1.5 rounded-full" style={{ backgroundColor: TEAL[400] }} />
        <div className="h-px w-12 md:w-20" style={{ backgroundColor: BORDER }} />
      </div>
    </div>
  );
}

// ─── PHQ-9 Screening Section ───────────────────────────────────────────────
function PHQ9Screening() {
  const [selected, setSelected] = useState<number | null>(1);

  const options = [
    { label: "Not at all", value: 0 },
    { label: "Several days", value: 1 },
    { label: "More than half the days", value: 2 },
    { label: "Nearly every day", value: 3 },
  ];

  return (
    <section className="px-4 pt-12 pb-4 sm:px-6 md:px-8">
      <m.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
        className="mx-auto max-w-xl"
      >
        {/* Card */}
        <div
          className="overflow-hidden rounded-2xl border shadow-sm"
          style={{
            backgroundColor: "white",
            borderColor: BORDER,
            boxShadow: "0 1px 3px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.03)",
          }}
        >
          {/* Header */}
          <div
            className="px-6 py-5 sm:px-8 sm:py-6"
            style={{
              background: `linear-gradient(135deg, ${TEAL[700]} 0%, ${TEAL[600]} 100%)`,
            }}
          >
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-lg font-semibold text-white sm:text-xl">
                  Patient Health Questionnaire
                </h2>
                <p className="mt-0.5 text-sm text-white/70">PHQ-9 Depression Screening</p>
              </div>
              {/* Language toggle */}
              <div className="flex items-center rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-medium text-white">
                <span className="border-r border-white/30 pr-2 opacity-100">EN</span>
                <span className="pl-2 opacity-50">ES</span>
              </div>
            </div>
          </div>

          {/* Progress */}
          <div className="px-6 pt-5 sm:px-8">
            <div className="flex items-center justify-between text-xs" style={{ color: TEXT_MUTED }}>
              <span>Question 3 of 9</span>
              <span className="font-medium tabular-nums" style={{ color: TEAL[600] }}>
                33%
              </span>
            </div>
            <div className="mt-2 h-1.5 overflow-hidden rounded-full" style={{ backgroundColor: SURFACE }}>
              <m.div
                className="h-full rounded-full"
                style={{
                  background: `linear-gradient(90deg, ${TEAL[500]}, ${TEAL[400]})`,
                }}
                initial={{ width: "0%" }}
                animate={{ width: "33.3%" }}
                transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              />
            </div>
            {/* Step dots */}
            <div className="mt-3 flex justify-between">
              {Array.from({ length: 9 }).map((_, i) => (
                <div
                  key={i}
                  className="size-2 rounded-full transition-colors"
                  style={{
                    backgroundColor:
                      i < 2
                        ? TEAL[500]
                        : i === 2
                          ? TEAL[400]
                          : "#e2ebe7",
                  }}
                />
              ))}
            </div>
          </div>

          {/* Question */}
          <div className="px-6 pt-6 sm:px-8">
            <p className="text-xs font-medium uppercase tracking-wider" style={{ color: TEXT_MUTED }}>
              Over the last 2 weeks, how often have you been bothered by:
            </p>
            <h3 className="mt-3 text-lg font-semibold leading-snug sm:text-xl" style={{ color: TEXT_PRIMARY }}>
              Little interest or pleasure in doing things
            </h3>
          </div>

          {/* Response options */}
          <div className="space-y-3 px-6 pt-5 pb-6 sm:px-8">
            {options.map((opt, i) => {
              const isSelected = selected === opt.value;
              return (
                <m.button
                  key={opt.value}
                  onClick={() => setSelected(opt.value)}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.06, duration: 0.4 }}
                  className="group flex w-full items-center gap-4 rounded-xl border-2 px-5 py-4 text-left transition-all"
                  style={{
                    borderColor: isSelected ? TEAL[500] : BORDER,
                    backgroundColor: isSelected
                      ? `${TEAL[50]}`
                      : i === 0
                        ? "white"
                        : i === 1
                          ? TEAL[50]
                          : i === 2
                            ? "#e6f5f2"
                            : "#d5f0eb",
                    boxShadow: isSelected ? `0 0 0 1px ${TEAL[500]}` : "none",
                  }}
                >
                  {/* Checkbox */}
                  <div
                    className="flex size-6 shrink-0 items-center justify-center rounded-full border-2 transition-all"
                    style={{
                      borderColor: isSelected ? TEAL[500] : "#c5d8d2",
                      backgroundColor: isSelected ? TEAL[500] : "transparent",
                    }}
                  >
                    {isSelected && (
                      <m.svg
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 400, damping: 20 }}
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                      >
                        <path
                          d="M2.5 6L5 8.5L9.5 3.5"
                          stroke="white"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </m.svg>
                    )}
                  </div>

                  {/* Label & score */}
                  <div className="flex flex-1 items-center justify-between">
                    <span
                      className="text-sm font-medium sm:text-base"
                      style={{ color: isSelected ? TEAL[800] : TEXT_PRIMARY }}
                    >
                      {opt.label}
                    </span>
                    <span
                      className="rounded-full px-2.5 py-0.5 text-xs font-semibold tabular-nums"
                      style={{
                        backgroundColor: isSelected ? TEAL[500] : "#e8f0ec",
                        color: isSelected ? "white" : TEXT_MUTED,
                      }}
                    >
                      {opt.value}
                    </span>
                  </div>
                </m.button>
              );
            })}
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between border-t px-6 py-4 sm:px-8" style={{ borderColor: BORDER }}>
            <button
              className="flex min-h-11 items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors hover:bg-gray-50"
              style={{ color: TEXT_SECONDARY }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Previous
            </button>
            <button
              className="flex min-h-11 items-center gap-2 rounded-lg px-6 py-2.5 text-sm font-semibold text-white transition-all hover:shadow-md"
              style={{
                background: `linear-gradient(135deg, ${TEAL[600]}, ${TEAL[500]})`,
                boxShadow: `0 2px 8px ${TEAL[500]}40`,
              }}
            >
              Next
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>

          {/* Privacy notice */}
          <div
            className="flex items-center justify-center gap-2 border-t px-6 py-3.5"
            style={{ borderColor: BORDER, backgroundColor: SURFACE }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ color: TEAL[600] }}>
              <path
                d="M7 1.75L2.625 3.5V6.417C2.625 9.159 4.441 11.718 7 12.25C9.559 11.718 11.375 9.159 11.375 6.417V3.5L7 1.75Z"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <p className="text-xs" style={{ color: TEXT_MUTED }}>
              Your responses are private and confidential
            </p>
          </div>
        </div>
      </m.div>
    </section>
  );
}

// ─── Screening Results Section ─────────────────────────────────────────────
function ScreeningResults() {
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
          className="overflow-hidden rounded-2xl border shadow-sm"
          style={{
            backgroundColor: "white",
            borderColor: BORDER,
            boxShadow: "0 1px 3px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.03)",
          }}
        >
          {/* Header */}
          <div
            className="px-6 py-5 sm:px-8 sm:py-6"
            style={{
              background: `linear-gradient(135deg, ${TEAL[700]} 0%, ${TEAL[600]} 100%)`,
            }}
          >
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-white sm:text-xl">
                  Your Results
                </h2>
                <p className="mt-0.5 text-sm text-white/70">PHQ-9 Screening Complete</p>
              </div>
              <div className="flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1.5 text-xs font-medium text-white">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M10 3L4.5 8.5L2 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Complete
              </div>
            </div>
          </div>

          {/* Score display */}
          <div className="flex flex-col items-center px-6 pt-8 pb-6 sm:px-8">
            <ScoreGauge score={12} maxScore={27} />

            {/* Severity badge */}
            <m.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8, duration: 0.4, type: "spring", stiffness: 200 }}
              className="mt-5 rounded-full px-5 py-2 text-sm font-semibold"
              style={{
                backgroundColor: `${TEAL[500]}18`,
                color: TEAL[700],
                border: `1px solid ${TEAL[500]}30`,
              }}
            >
              Moderate Depression
            </m.div>

            {/* Interpretation */}
            <p
              className="mt-5 max-w-sm text-center text-sm leading-relaxed"
              style={{ color: TEXT_SECONDARY }}
            >
              Your score of 12 indicates moderate symptoms of depression.
              This is a screening tool, not a diagnosis. A healthcare professional
              can help determine appropriate next steps for your well-being.
            </p>
          </div>

          {/* Separator */}
          <div className="mx-6 h-px sm:mx-8" style={{ backgroundColor: BORDER }} />

          {/* Recommendation cards */}
          <div className="space-y-3 px-6 py-6 sm:px-8">
            <p
              className="mb-1 text-xs font-semibold uppercase tracking-wider"
              style={{ color: TEXT_MUTED }}
            >
              Recommended Next Steps
            </p>

            {[
              {
                icon: (
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <rect x="3" y="4" width="14" height="13" rx="2" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M3 8H17" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M7 2V5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    <path d="M13 2V5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                ),
                title: "Speak with a professional",
                desc: "Consider scheduling an appointment with a mental health provider for a thorough evaluation.",
                primary: true,
              },
              {
                icon: (
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path
                      d="M10 17.5C10 17.5 2.5 13 2.5 7.5C2.5 5 4.5 3 7 3C8.5 3 9.5 3.8 10 4.5C10.5 3.8 11.5 3 13 3C15.5 3 17.5 5 17.5 7.5C17.5 13 10 17.5 10 17.5Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ),
                title: "Self-care strategies",
                desc: "Regular exercise, consistent sleep, and social connection can support your mental health.",
                primary: false,
              },
              {
                icon: (
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path
                      d="M3 15.5V4.5C3 3.672 3.672 3 4.5 3H13L17 7V15.5C17 16.328 16.328 17 15.5 17H4.5C3.672 17 3 16.328 3 15.5Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path d="M7 10H13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    <path d="M7 13H11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                ),
                title: "Learn about depression",
                desc: "Understanding symptoms and treatment options can empower your journey to wellness.",
                primary: false,
              },
            ].map((item, i) => (
              <m.div
                key={item.title}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 1 + i * 0.12, duration: 0.5 }}
                className="flex items-start gap-4 rounded-xl border p-4 transition-all hover:shadow-sm"
                style={{
                  borderColor: item.primary ? TEAL[300] : BORDER,
                  backgroundColor: item.primary ? `${TEAL[50]}` : "white",
                }}
              >
                <div
                  className="flex size-10 shrink-0 items-center justify-center rounded-lg"
                  style={{
                    backgroundColor: item.primary ? `${TEAL[500]}15` : SURFACE,
                    color: item.primary ? TEAL[600] : TEXT_MUTED,
                  }}
                >
                  {item.icon}
                </div>
                <div>
                  <p className="text-sm font-semibold" style={{ color: TEXT_PRIMARY }}>
                    {item.title}
                  </p>
                  <p className="mt-1 text-xs leading-relaxed" style={{ color: TEXT_SECONDARY }}>
                    {item.desc}
                  </p>
                </div>
              </m.div>
            ))}
          </div>

          {/* CTA */}
          <div className="px-6 pb-6 sm:px-8">
            <button
              className="flex min-h-12 w-full items-center justify-center gap-2 rounded-xl text-sm font-semibold text-white transition-all hover:shadow-lg"
              style={{
                background: `linear-gradient(135deg, ${TEAL[600]}, ${TEAL[500]})`,
                boxShadow: `0 4px 14px ${TEAL[500]}35`,
              }}
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <rect x="3" y="4" width="12" height="11" rx="2" stroke="currentColor" strokeWidth="1.5" />
                <path d="M3 7.5H15" stroke="currentColor" strokeWidth="1.5" />
                <path d="M6.5 2V4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M11.5 2V4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              Book an Appointment
            </button>
            <p className="mt-3 text-center text-xs" style={{ color: TEXT_MUTED }}>
              <span className="cursor-pointer underline decoration-dotted underline-offset-2 transition-colors hover:text-teal-700">
                Continuar en Español
              </span>
              {" "}— Switch to Spanish
            </p>
          </div>
        </div>
      </m.div>
    </section>
  );
}

// ─── Appointment Booking Section ───────────────────────────────────────────
function AppointmentBooking() {
  const [selectedDate, setSelectedDate] = useState(14); // March 15 = index 14
  const [selectedTime, setSelectedTime] = useState("2:00 PM");

  const daysInMonth = 31;
  const startDay = 6; // March 2026 starts on Saturday
  const availableDates = [3, 5, 8, 10, 12, 14, 17, 19, 21, 24, 26, 28];

  const morningSlots = ["9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM"];
  const afternoonSlots = ["1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM", "3:00 PM"];
  const eveningSlots = ["4:00 PM", "4:30 PM", "5:00 PM"];

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
          className="overflow-hidden rounded-2xl border shadow-sm"
          style={{
            backgroundColor: "white",
            borderColor: BORDER,
            boxShadow: "0 1px 3px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.03)",
          }}
        >
          {/* Header */}
          <div
            className="px-6 py-5 sm:px-8 sm:py-6"
            style={{
              background: `linear-gradient(135deg, ${TEAL[700]} 0%, ${TEAL[600]} 100%)`,
            }}
          >
            <h2 className="text-lg font-semibold text-white sm:text-xl">
              Book Your Appointment
            </h2>
            <p className="mt-0.5 text-sm text-white/70">
              Reservar Cita — Schedule your visit
            </p>
          </div>

          {/* Provider card */}
          <div className="px-6 pt-5 sm:px-8">
            <div
              className="flex items-center gap-4 rounded-xl border p-4"
              style={{ borderColor: BORDER, backgroundColor: SURFACE }}
            >
              {/* Avatar */}
              <div
                className="flex size-14 shrink-0 items-center justify-center rounded-full text-lg font-semibold text-white"
                style={{
                  background: `linear-gradient(135deg, ${TEAL[600]}, ${TEAL[400]})`,
                }}
              >
                DR
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold" style={{ color: TEXT_PRIMARY }}>
                  Dr. Rebecca Torres, PhD
                </p>
                <p className="mt-0.5 text-xs" style={{ color: TEXT_SECONDARY }}>
                  Licensed Clinical Psychologist
                </p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {["CBT", "Depression", "Bilingual"].map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full px-2 py-0.5 text-[10px] font-medium"
                      style={{
                        backgroundColor: `${TEAL[500]}12`,
                        color: TEAL[700],
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Calendar */}
          <div className="px-6 pt-5 sm:px-8">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold" style={{ color: TEXT_PRIMARY }}>
                March 2026
              </h3>
              <div className="flex gap-1">
                <button
                  className="flex size-8 items-center justify-center rounded-lg transition-colors hover:bg-gray-100"
                  style={{ color: TEXT_MUTED }}
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M8.5 10.5L5 7L8.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                <button
                  className="flex size-8 items-center justify-center rounded-lg transition-colors hover:bg-gray-100"
                  style={{ color: TEXT_MUTED }}
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M5.5 3.5L9 7L5.5 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Day headers */}
            <div className="mt-3 grid grid-cols-7 gap-1">
              {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
                <div
                  key={day}
                  className="pb-2 text-center text-[10px] font-semibold uppercase tracking-wider"
                  style={{ color: TEXT_MUTED }}
                >
                  {day}
                </div>
              ))}

              {/* Empty cells for offset */}
              {Array.from({ length: startDay }).map((_, i) => (
                <div key={`empty-${i}`} />
              ))}

              {/* Day cells */}
              {Array.from({ length: daysInMonth }).map((_, i) => {
                const day = i + 1;
                const isAvailable = availableDates.includes(day);
                const isSelected = selectedDate === i;
                const isPast = day < 3;

                return (
                  <button
                    key={day}
                    onClick={() => isAvailable && setSelectedDate(i)}
                    disabled={!isAvailable || isPast}
                    className="flex aspect-square items-center justify-center rounded-lg text-xs font-medium transition-all"
                    style={{
                      backgroundColor: isSelected
                        ? TEAL[500]
                        : isAvailable
                          ? `${TEAL[500]}08`
                          : "transparent",
                      color: isSelected
                        ? "white"
                        : isPast
                          ? "#c5d0cd"
                          : isAvailable
                            ? TEXT_PRIMARY
                            : "#a8b8b3",
                      cursor: isAvailable && !isPast ? "pointer" : "default",
                    }}
                  >
                    {day}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Time slots */}
          <div className="px-6 pt-5 sm:px-8">
            <h3 className="mb-3 text-sm font-semibold" style={{ color: TEXT_PRIMARY }}>
              Available Times
            </h3>
            <div className="space-y-4">
              {[
                { label: "Morning", slots: morningSlots },
                { label: "Afternoon", slots: afternoonSlots },
                { label: "Evening", slots: eveningSlots },
              ].map((group) => (
                <div key={group.label}>
                  <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider" style={{ color: TEXT_MUTED }}>
                    {group.label}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {group.slots.map((time) => {
                      const isActive = selectedTime === time;
                      return (
                        <button
                          key={time}
                          onClick={() => setSelectedTime(time)}
                          className="rounded-lg border px-3 py-2 text-xs font-medium tabular-nums transition-all"
                          style={{
                            borderColor: isActive ? TEAL[500] : BORDER,
                            backgroundColor: isActive ? TEAL[500] : "white",
                            color: isActive ? "white" : TEXT_PRIMARY,
                            boxShadow: isActive ? `0 2px 8px ${TEAL[500]}30` : "none",
                          }}
                        >
                          {time}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Selection confirmation */}
          <div className="px-6 pt-5 sm:px-8">
            <div
              className="rounded-xl border-2 border-dashed p-4"
              style={{ borderColor: TEAL[300], backgroundColor: `${TEAL[50]}` }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="flex size-10 items-center justify-center rounded-lg"
                  style={{ backgroundColor: `${TEAL[500]}15`, color: TEAL[600] }}
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M10 3L4 6V10C4 14 6.5 17 10 18C13.5 17 16 14 16 10V6L10 3Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M7 10L9 12L13 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-semibold" style={{ color: TEAL[800] }}>
                    March 15, 2026 at 2:00 PM
                  </p>
                  <p className="mt-0.5 text-xs" style={{ color: TEAL[600] }}>
                    Dr. Rebecca Torres, PhD — In-person visit
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Confirm button */}
          <div className="px-6 pt-5 pb-6 sm:px-8">
            <button
              className="flex min-h-12 w-full items-center justify-center gap-2 rounded-xl text-sm font-semibold text-white transition-all hover:shadow-lg"
              style={{
                background: `linear-gradient(135deg, ${TEAL[600]}, ${TEAL[500]})`,
                boxShadow: `0 4px 14px ${TEAL[500]}35`,
              }}
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M15 4.5L6.75 12.75L3 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Confirm Appointment
            </button>
          </div>

          {/* Integration badges */}
          <div
            className="flex items-center justify-center gap-4 border-t px-6 py-4"
            style={{ borderColor: BORDER, backgroundColor: SURFACE }}
          >
            <div
              className="flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] font-medium"
              style={{ backgroundColor: `${TEAL[500]}10`, color: TEAL[700] }}
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M10 3L4.5 8.5L2 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Zocdoc Verified
            </div>
            <div
              className="flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] font-medium"
              style={{ backgroundColor: `${TEAL[500]}10`, color: TEAL[700] }}
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <rect x="2" y="2.5" width="8" height="7.5" rx="1" stroke="currentColor" strokeWidth="1" />
                <path d="M2 4.5H10" stroke="currentColor" strokeWidth="1" />
                <path d="M4.5 1V3" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
                <path d="M7.5 1V3" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
              </svg>
              Google Calendar Sync
            </div>
          </div>
        </div>
      </m.div>
    </section>
  );
}

// ─── Page Header / Nav ─────────────────────────────────────────────────────
function DemoNav() {
  return (
    <header
      className="sticky top-0 z-50 border-b backdrop-blur-md"
      style={{
        backgroundColor: `${CREAM}ee`,
        borderColor: BORDER,
      }}
    >
      <div className="mx-auto flex h-14 max-w-xl items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-2.5">
          {/* Logo mark */}
          <div
            className="flex size-8 items-center justify-center rounded-lg"
            style={{
              background: `linear-gradient(135deg, ${TEAL[600]}, ${TEAL[400]})`,
            }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M8 2C4.686 2 2 4.686 2 8s2.686 6 6 6 6-2.686 6-6-2.686-6-6-6zm0 1.5A4.5 4.5 0 0112.5 8 4.5 4.5 0 018 12.5 4.5 4.5 0 013.5 8 4.5 4.5 0 018 3.5z"
                fill="white"
              />
              <circle cx="8" cy="8" r="2" fill="white" />
            </svg>
          </div>
          <div>
            <span className="text-sm font-semibold" style={{ color: TEXT_PRIMARY }}>
              Bergen Mind
            </span>
            <span className="ml-1 text-sm font-normal" style={{ color: TEXT_MUTED }}>
              & Wellness
            </span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span
            className="hidden text-xs sm:inline"
            style={{ color: TEXT_MUTED }}
          >
            bilingual care
          </span>
          <div
            className="flex items-center rounded-full border px-2.5 py-1 text-[10px] font-semibold"
            style={{ borderColor: BORDER, color: TEXT_SECONDARY }}
          >
            EN | ES
          </div>
        </div>
      </div>
    </header>
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
        style={{ color: TEAL[600] }}
      >
        {label}
      </span>
      {sublabel && (
        <p className="mt-1 text-xs" style={{ color: TEXT_MUTED }}>
          {sublabel}
        </p>
      )}
    </m.div>
  );
}

// ─── Footer ────────────────────────────────────────────────────────────────
function DemoFooter() {
  return (
    <footer
      className="border-t px-4 py-8 text-center"
      style={{ borderColor: BORDER, backgroundColor: SURFACE }}
    >
      <div className="mx-auto max-w-xl">
        <div className="flex items-center justify-center gap-2">
          <div
            className="flex size-6 items-center justify-center rounded"
            style={{
              background: `linear-gradient(135deg, ${TEAL[600]}, ${TEAL[400]})`,
            }}
          >
            <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
              <path
                d="M8 2C4.686 2 2 4.686 2 8s2.686 6 6 6 6-2.686 6-6-2.686-6-6-6z"
                fill="white"
              />
            </svg>
          </div>
          <span className="text-sm font-semibold" style={{ color: TEXT_PRIMARY }}>
            Bergen Mind & Wellness
          </span>
        </div>
        <p className="mt-3 text-xs leading-relaxed" style={{ color: TEXT_MUTED }}>
          Compassionate, bilingual mental health care. Serving the Bergen County community
          with evidence-based screening tools and accessible therapy services.
        </p>
        <div className="mt-4 flex items-center justify-center gap-4 text-[10px]" style={{ color: TEXT_MUTED }}>
          <span>HIPAA Compliant</span>
          <span style={{ color: BORDER }}>|</span>
          <span>Telehealth Available</span>
          <span style={{ color: BORDER }}>|</span>
          <span>Se Habla Español</span>
        </div>
        <p className="mt-4 text-[10px]" style={{ color: "#b5c5bf" }}>
          &copy; 2026 Bergen Mind & Wellness. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────
export default function BergenMindDemo() {
  return (
    <>
      {/* eslint-disable-next-line @next/next/no-page-custom-font */}
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />
      <main
        className="min-h-screen antialiased"
        style={{
          backgroundColor: CREAM,
          fontFamily: "'Inter', system-ui, sans-serif",
          color: TEXT_PRIMARY,
        }}
      >
        <DemoNav />

        <SectionLabel
          label="PHQ-9 Screening"
          sublabel="Evidence-based depression assessment tool"
        />
        <PHQ9Screening />

        <SectionDivider />

        <SectionLabel
          label="Results & Insights"
          sublabel="Personalized score interpretation and recommendations"
        />
        <ScreeningResults />

        <SectionDivider />

        <SectionLabel
          label="Appointment Booking"
          sublabel="Schedule with a licensed provider"
        />
        <AppointmentBooking />

        <div className="h-12" />
        <DemoFooter />
      </main>
    </>
  );
}
