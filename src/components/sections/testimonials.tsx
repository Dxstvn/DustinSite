"use client";

import { Quote } from "lucide-react";
import { CardStack, type CardStackItem } from "@/components/ui/card-stack";
import { ScrollReveal } from "@/components/shared/scroll-reveal";

interface TestimonialItem extends CardStackItem {
  quote: string;
  role: string;
  company: string;
}

const testimonials: TestimonialItem[] = [
  {
    id: 1,
    title: "Sarah Chen",
    quote:
      "Jaspire didn't just build us a website — they built us a growth engine. Our organic traffic tripled within six months.",
    role: "CEO",
    company: "Meridian Studio",
  },
  {
    id: 2,
    title: "Marcus Rivera",
    quote:
      "The attention to detail is extraordinary. Every pixel, every interaction, every word was considered. This is what premium feels like.",
    role: "Founder",
    company: "Verdant Organics",
  },
  {
    id: 3,
    title: "Aisha Patel",
    quote:
      "Our social media presence went from invisible to industry-leading. The strategy was clear, the execution was flawless.",
    role: "Head of Marketing",
    company: "Resonance Audio",
  },
];

function TestimonialCard({
  item,
  active,
}: {
  item: TestimonialItem;
  active: boolean;
}) {
  return (
    <div className="relative flex h-full w-full flex-col justify-between overflow-hidden rounded-2xl bg-gradient-to-br from-[#1a1a1a] to-[#111111] p-8 md:p-10">
      {/* Brand accent left border */}
      <div
        className="absolute left-0 top-0 h-full w-1 transition-opacity duration-500"
        style={{
          background: "linear-gradient(180deg, #7c6bf0, #3b82f6)",
          opacity: active ? 1 : 0,
        }}
      />

      {/* Decorative quote mark */}
      <Quote className="mb-4 size-8 text-[#7c6bf0] opacity-30" />

      {/* Quote text */}
      <blockquote className="flex-1">
        <p className="text-lg font-medium leading-relaxed tracking-tight text-white/90 md:text-xl lg:text-2xl">
          &ldquo;{item.quote}&rdquo;
        </p>
      </blockquote>

      {/* Attribution */}
      <div className="mt-6 border-t border-white/[0.08] pt-5">
        <p className="text-sm font-semibold text-white">{item.title}</p>
        <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.15em] text-white/40">
          {item.role}, {item.company}
        </p>
      </div>
    </div>
  );
}

export function Testimonials() {
  return (
    <section data-section-id="testimonials" className="py-24 md:py-32 lg:py-40">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="mb-8 text-center">
            <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-[var(--text-tertiary)]">
              What they say
            </p>
            <h2 className="mx-auto max-w-lg text-3xl font-bold tracking-tight md:text-4xl">
              Trusted by ambitious brands
            </h2>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <CardStack
            items={testimonials}
            cardWidth={560}
            cardHeight={340}
            autoAdvance
            intervalMs={6000}
            pauseOnHover
            loop
            maxVisible={5}
            overlap={0.55}
            spreadDeg={40}
            activeLiftPx={16}
            activeScale={1.02}
            inactiveScale={0.92}
            showDots
            renderCard={(item, { active }) => (
              <TestimonialCard
                item={item as TestimonialItem}
                active={active}
              />
            )}
          />
        </ScrollReveal>
      </div>
    </section>
  );
}
