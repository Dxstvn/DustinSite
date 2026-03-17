"use client";

import { useState, useEffect } from "react";
import { motion as m, AnimatePresence } from "motion/react";
import { Quote } from "lucide-react";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { motion as motionPresets } from "@/lib/constants";

const testimonials = [
  {
    quote:
      "Jaspire didn't just build us a website — they built us a growth engine. Our organic traffic tripled within six months.",
    name: "Sarah Chen",
    role: "CEO",
    company: "Meridian Studio",
  },
  {
    quote:
      "The attention to detail is extraordinary. Every pixel, every interaction, every word was considered. This is what premium feels like.",
    name: "Marcus Rivera",
    role: "Founder",
    company: "Verdant Organics",
  },
  {
    quote:
      "Our social media presence went from invisible to industry-leading. The strategy was clear, the execution was flawless.",
    name: "Aisha Patel",
    role: "Head of Marketing",
    company: "Resonance Audio",
  },
];

export function Testimonials() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-24 md:py-32 lg:py-40">
      <div className="mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="relative text-center">
            {/* Quote icon */}
            <Quote className="mx-auto mb-8 size-8 text-[var(--primary)] opacity-40" />

            {/* Rotating testimonials */}
            <div className="relative min-h-[200px]">
              <AnimatePresence mode="wait">
                <m.blockquote
                  key={current}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{
                    duration: motionPresets.duration.slow,
                    ease: motionPresets.ease.outExpo,
                  }}
                >
                  <p className="text-xl font-medium leading-relaxed tracking-tight md:text-2xl lg:text-3xl">
                    &ldquo;{testimonials[current].quote}&rdquo;
                  </p>
                  <footer className="mt-8">
                    <p className="text-sm font-semibold text-[var(--text-primary)]">
                      {testimonials[current].name}
                    </p>
                    <p className="mt-1 font-mono text-xs uppercase tracking-[0.15em] text-[var(--text-tertiary)]">
                      {testimonials[current].role},{" "}
                      {testimonials[current].company}
                    </p>
                  </footer>
                </m.blockquote>
              </AnimatePresence>
            </div>

            {/* Dots indicator */}
            <div className="mt-10 flex items-center justify-center gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className="group relative p-1"
                  aria-label={`Go to testimonial ${i + 1}`}
                >
                  <div
                    className={`h-1.5 rounded-full transition-all duration-500 ${
                      i === current
                        ? "w-8 bg-[var(--primary)]"
                        : "w-1.5 bg-[var(--surface-border)] group-hover:bg-[var(--text-tertiary)]"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
