"use client";

import { useState, type FormEvent } from "react";
import { motion as m, AnimatePresence } from "motion/react";
import { ArrowRight, ArrowLeft, Check, Loader2 } from "lucide-react";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { services, accentColorMap, motion as motionPresets } from "@/lib/constants";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type Step = 0 | 1 | 2;

interface FormData {
  services: string[];
  name: string;
  email: string;
  budget: string;
  message: string;
}

const budgetOptions = ["Under $5K", "$5K – $15K", "$15K – $50K", "$50K+"];

const stepTransition = {
  duration: motionPresets.duration.slow,
  ease: motionPresets.ease.outExpo,
};

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function ContactForm() {
  const [step, setStep] = useState<Step>(0);
  const [formData, setFormData] = useState<FormData>({
    services: [],
    name: "",
    email: "",
    budget: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  // --- Service selection ---
  function toggleService(id: string) {
    setFormData((prev) => ({
      ...prev,
      services: prev.services.includes(id)
        ? prev.services.filter((s) => s !== id)
        : [...prev.services, id],
    }));
  }

  // --- Navigation ---
  function next() {
    if (step < 2) setStep((s) => (s + 1) as Step);
  }

  function back() {
    if (step > 0) setStep((s) => (s - 1) as Step);
  }

  // --- Submission ---
  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Something went wrong");
      }

      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  // --- Determine active accent color from selected services ---
  const activeAccent = formData.services.length > 0
    ? accentColorMap[
        services.find((s) => s.id === formData.services[formData.services.length - 1])
          ?.accent ?? "blue"
      ]
    : null;

  // --- Success state ---
  if (status === "success") {
    return (
      <m.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: motionPresets.ease.outExpo }}
        className="text-center"
      >
        <m.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.1 }}
          className="mx-auto mb-6 flex size-16 items-center justify-center rounded-full bg-green-500/10"
        >
          <Check className="size-8 text-green-400" />
        </m.div>
        <h3 className="mb-3 text-2xl font-bold tracking-tight text-white">
          Message sent
        </h3>
        <p className="text-[var(--text-secondary)]">
          We&apos;ll be in touch within 24 hours.
        </p>
      </m.div>
    );
  }

  return (
    <div>
      {/* Progress dots */}
      <div className="mb-10 flex items-center justify-center gap-2">
        {[0, 1, 2].map((i) => (
          <button
            key={i}
            type="button"
            onClick={() => {
              // Only allow going to previous steps or current
              if (i <= step) setStep(i as Step);
            }}
            className="group relative flex items-center justify-center p-1"
            aria-label={`Step ${i + 1}`}
          >
            <span
              className="block size-2 rounded-full transition-all duration-300"
              style={{
                backgroundColor:
                  i === step
                    ? activeAccent?.hex ?? "#7c6bf0"
                    : i < step
                      ? "rgba(255,255,255,0.4)"
                      : "rgba(255,255,255,0.15)",
                transform: i === step ? "scale(1.4)" : "scale(1)",
              }}
            />
          </button>
        ))}
      </div>

      {/* Step content with AnimatePresence */}
      <form onSubmit={handleSubmit}>
        <AnimatePresence mode="wait">
          {step === 0 && (
            <m.div
              key="step-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={stepTransition}
            >
              <p className="mb-6 text-center text-lg text-[var(--text-secondary)]">
                What can we help you with?
              </p>

              {/* Service pills */}
              <div className="flex flex-wrap justify-center gap-3">
                {services.map((service) => {
                  const isSelected = formData.services.includes(service.id);
                  const accent = accentColorMap[service.accent];
                  return (
                    <m.button
                      key={service.id}
                      type="button"
                      onClick={() => toggleService(service.id)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.97 }}
                      className="rounded-full px-6 py-3 text-sm font-medium transition-all duration-300"
                      style={{
                        backgroundColor: isSelected
                          ? `${accent.hex}20`
                          : "rgba(255,255,255,0.05)",
                        color: isSelected ? accent.hex : "rgba(255,255,255,0.6)",
                        borderWidth: 1,
                        borderStyle: "solid",
                        borderColor: isSelected
                          ? `${accent.hex}40`
                          : "rgba(255,255,255,0.1)",
                        boxShadow: isSelected
                          ? `0 0 20px -5px ${accent.hex}30`
                          : "none",
                      }}
                    >
                      {service.title}
                    </m.button>
                  );
                })}
              </div>

              {/* Next button */}
              <div className="mt-10 flex justify-center">
                <m.button
                  type="button"
                  onClick={next}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium text-white transition-colors"
                  style={{
                    backgroundColor: activeAccent
                      ? `${activeAccent.hex}25`
                      : "rgba(255,255,255,0.08)",
                    borderWidth: 1,
                    borderStyle: "solid",
                    borderColor: activeAccent
                      ? `${activeAccent.hex}40`
                      : "rgba(255,255,255,0.12)",
                  }}
                >
                  Continue
                  <ArrowRight className="size-4" />
                </m.button>
              </div>
            </m.div>
          )}

          {step === 1 && (
            <m.div
              key="step-1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={stepTransition}
              className="space-y-6"
            >
              <p className="mb-8 text-center text-lg text-[var(--text-secondary)]">
                Tell us about yourself
              </p>

              {/* Name */}
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block font-mono text-[11px] uppercase tracking-[0.15em] text-[var(--text-tertiary)]"
                >
                  Your name
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, name: e.target.value }))
                  }
                  placeholder="Jane Smith"
                  className="w-full border-b border-white/20 bg-transparent py-3 text-lg text-white placeholder:text-white/30 transition-colors duration-300 focus:border-[var(--primary)] focus:outline-none"
                />
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block font-mono text-[11px] uppercase tracking-[0.15em] text-[var(--text-tertiary)]"
                >
                  Email address
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, email: e.target.value }))
                  }
                  placeholder="jane@company.com"
                  className="w-full border-b border-white/20 bg-transparent py-3 text-lg text-white placeholder:text-white/30 transition-colors duration-300 focus:border-[var(--primary)] focus:outline-none"
                />
              </div>

              {/* Budget */}
              <div>
                <label className="mb-3 block font-mono text-[11px] uppercase tracking-[0.15em] text-[var(--text-tertiary)]">
                  Budget range
                </label>
                <div className="flex flex-wrap gap-2">
                  {budgetOptions.map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() =>
                        setFormData((prev) => ({ ...prev, budget: option }))
                      }
                      className="rounded-full px-4 py-2 text-sm transition-all duration-300"
                      style={{
                        backgroundColor:
                          formData.budget === option
                            ? "rgba(124, 107, 240, 0.2)"
                            : "rgba(255,255,255,0.05)",
                        color:
                          formData.budget === option
                            ? "#a78bfa"
                            : "rgba(255,255,255,0.5)",
                        borderWidth: 1,
                        borderStyle: "solid",
                        borderColor:
                          formData.budget === option
                            ? "rgba(124, 107, 240, 0.4)"
                            : "rgba(255,255,255,0.1)",
                      }}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              {/* Navigation */}
              <div className="flex items-center justify-between pt-4">
                <button
                  type="button"
                  onClick={back}
                  className="inline-flex items-center gap-2 text-sm text-[var(--text-tertiary)] transition-colors hover:text-white"
                >
                  <ArrowLeft className="size-4" />
                  Back
                </button>
                <m.button
                  type="button"
                  onClick={next}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/8 px-6 py-3 text-sm font-medium text-white transition-colors"
                >
                  Continue
                  <ArrowRight className="size-4" />
                </m.button>
              </div>
            </m.div>
          )}

          {step === 2 && (
            <m.div
              key="step-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={stepTransition}
              className="space-y-6"
            >
              <p className="mb-8 text-center text-lg text-[var(--text-secondary)]">
                Tell us about your project
              </p>

              {/* Message */}
              <div>
                <label
                  htmlFor="message"
                  className="mb-2 block font-mono text-[11px] uppercase tracking-[0.15em] text-[var(--text-tertiary)]"
                >
                  Project details
                </label>
                <textarea
                  id="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, message: e.target.value }))
                  }
                  placeholder="What are you looking to build? Any timeline or goals in mind?"
                  className="w-full resize-none border-b border-white/20 bg-transparent py-3 text-lg text-white placeholder:text-white/30 transition-colors duration-300 focus:border-[var(--primary)] focus:outline-none"
                />
              </div>

              {/* Error message */}
              {status === "error" && (
                <p className="text-center text-sm text-red-400">{errorMsg}</p>
              )}

              {/* Navigation + Submit */}
              <div className="flex items-center justify-between pt-4">
                <button
                  type="button"
                  onClick={back}
                  className="inline-flex items-center gap-2 text-sm text-[var(--text-tertiary)] transition-colors hover:text-white"
                >
                  <ArrowLeft className="size-4" />
                  Back
                </button>
                <ShimmerButton
                  type="submit"
                  disabled={status === "loading"}
                  className="min-w-[160px]"
                >
                  {status === "loading" ? (
                    <Loader2 className="size-4 animate-spin" />
                  ) : (
                    <>
                      Send Message
                      <ArrowRight className="size-4" />
                    </>
                  )}
                </ShimmerButton>
              </div>
            </m.div>
          )}
        </AnimatePresence>
      </form>
    </div>
  );
}
