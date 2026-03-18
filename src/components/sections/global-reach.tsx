"use client";

import { useRef } from "react";
import { motion as m, useScroll, useTransform } from "motion/react";
import { MapPin } from "lucide-react";
import { InteractiveGlobe } from "@/components/ui/interactive-globe";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { useMediaQuery } from "@/hooks/use-media-query";

// --- Data ---

const jaspireMarkers = [
  { lat: 40.7128, lng: -74.006, label: "New York" },
  { lat: 35.2271, lng: -80.8431, label: "Charlotte" },
  { lat: 25.7617, lng: -80.1918, label: "Miami" },
  { lat: 18.5944, lng: -72.3074, label: "Port-au-Prince" },
  { lat: 18.4861, lng: -69.9312, label: "Santo Domingo" },
  { lat: 48.8566, lng: 2.3522, label: "Paris" },
];

const jaspireConnections: { from: [number, number]; to: [number, number] }[] = [
  { from: [40.7128, -74.006], to: [35.2271, -80.8431] },  // NYC -> CLT
  { from: [40.7128, -74.006], to: [25.7617, -80.1918] },  // NYC -> MIA
  { from: [40.7128, -74.006], to: [18.5944, -72.3074] },  // NYC -> PAP
  { from: [40.7128, -74.006], to: [18.4861, -69.9312] },  // NYC -> SDQ
  { from: [40.7128, -74.006], to: [48.8566, 2.3522] },    // NYC -> Paris
  { from: [18.5944, -72.3074], to: [18.4861, -69.9312] }, // PAP -> SDQ
];

interface CityInfo {
  name: string;
  state: string;
  services: string[];
  isHQ?: boolean;
}

const cities: CityInfo[] = [
  {
    name: "New York",
    state: "NY",
    services: ["Headquarters"],
    isHQ: true,
  },
  {
    name: "Bergen",
    state: "NJ",
    services: ["Client Projects"],
  },
  {
    name: "Charlotte",
    state: "NC",
    services: ["Client Projects"],
  },
  {
    name: "Miami",
    state: "FL",
    services: ["Client Projects"],
  },
  {
    name: "Port-au-Prince",
    state: "Haiti",
    services: ["Client Projects"],
  },
  {
    name: "Santo Domingo",
    state: "DR",
    services: ["Client Projects"],
  },
  {
    name: "Paris",
    state: "France",
    services: ["Client Projects"],
  },
];

// --- Desktop: scroll-driven layout ---

function DesktopGlobalReach() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Helper: clamp 0..1 progress within a scroll sub-range
  const ramp = (v: number, start: number, end: number) =>
    Math.min(1, Math.max(0, (v - start) / (end - start)));

  // Helper: lerp a single channel
  const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

  // Helper: interpolate two rgba colors (r,g,b 0-255, a 0-1)
  const lerpRgba = (
    from: [number, number, number, number],
    to: [number, number, number, number],
    t: number
  ) => {
    const r = Math.round(lerp(from[0], to[0], t));
    const g = Math.round(lerp(from[1], to[1], t));
    const b = Math.round(lerp(from[2], to[2], t));
    const a = lerp(from[3], to[3], t);
    return `rgba(${r},${g},${b},${a})`;
  };

  // Background: light (#f5f3f0) -> dark (#0a0a0a) over first 25% scroll
  const backgroundColor = useTransform(scrollYProgress, (v) => {
    const t = ramp(v, 0, 0.25);
    return lerpRgba([245, 243, 240, 1], [10, 10, 10, 1], t);
  });

  // Text color transitions with background
  const textColor = useTransform(scrollYProgress, (v) => {
    const t = ramp(v, 0, 0.25);
    return lerpRgba([26, 26, 26, 1], [250, 250, 250, 1], t);
  });

  const secondaryTextColor = useTransform(scrollYProgress, (v) => {
    const t = ramp(v, 0, 0.25);
    return lerpRgba([82, 82, 82, 1], [163, 163, 163, 1], t);
  });

  const tertiaryTextColor = useTransform(scrollYProgress, (v) => {
    const t = ramp(v, 0, 0.25);
    return lerpRgba([138, 138, 138, 1], [115, 115, 115, 1], t);
  });

  // Globe: scale up and fade in as section enters
  const globeOpacity = useTransform(scrollYProgress, (v) =>
    Math.min(1, Math.max(0, v / 0.15))
  );
  const globeScale = useTransform(scrollYProgress, (v) => {
    const t = Math.min(1, Math.max(0, (v - 0.05) / 0.35));
    return 0.6 + t * 0.4;
  });

  // City cards: border color transition
  const cardBorderColor = useTransform(scrollYProgress, (v) => {
    const t = ramp(v, 0, 0.25);
    return lerpRgba([212, 208, 200, 0.5], [255, 255, 255, 0.08], t);
  });

  const cardBgColor = useTransform(scrollYProgress, (v) => {
    const t = ramp(v, 0, 0.25);
    return lerpRgba([255, 255, 255, 0.5], [255, 255, 255, 0.03], t);
  });

  // Service pill colors
  const pillBgColor = useTransform(scrollYProgress, (v) => {
    const t = ramp(v, 0, 0.25);
    return lerpRgba([59, 130, 246, 0.08], [59, 130, 246, 0.15], t);
  });

  const pillTextColor = useTransform(scrollYProgress, (v) => {
    const t = ramp(v, 0, 0.25);
    return lerpRgba([59, 130, 246, 1], [96, 165, 250, 1], t);
  });

  // HQ pill
  const hqPillBgColor = useTransform(scrollYProgress, (v) => {
    const t = ramp(v, 0, 0.25);
    return lerpRgba([124, 107, 240, 0.08], [124, 107, 240, 0.15], t);
  });

  const hqPillTextColor = useTransform(scrollYProgress, (v) => {
    const t = ramp(v, 0, 0.25);
    return lerpRgba([124, 107, 240, 1], [167, 139, 250, 1], t);
  });

  // Map pin icon color
  const pinColor = useTransform(scrollYProgress, (v) => {
    const t = ramp(v, 0, 0.25);
    return lerpRgba([59, 130, 246, 1], [96, 165, 250, 1], t);
  });

  return (
    <m.section
      ref={sectionRef}
      data-section-id="globe"
      className="relative"
      style={{ height: "200vh", backgroundColor }}
    >
      {/* Sticky viewport */}
      <div className="sticky top-0 flex h-dvh items-center overflow-hidden">
        <div className="mx-auto flex w-full max-w-7xl items-center gap-12 px-4 sm:px-6 lg:gap-16 lg:px-8 xl:gap-20">
          {/* Left column: text content */}
          <div className="w-1/2 space-y-8">
            {/* Mono kicker */}
            <ScrollReveal>
              <m.p
                className="font-mono text-xs uppercase tracking-[0.2em]"
                style={{ color: tertiaryTextColor }}
              >
                Our Reach
              </m.p>
            </ScrollReveal>

            {/* Heading */}
            <ScrollReveal delay={0.08}>
              <m.h2
                className="font-display text-4xl font-bold tracking-tight md:text-5xl"
                style={{ color: textColor }}
              >
                Global Clients,
                <br />
                Local Craft.
              </m.h2>
            </ScrollReveal>

            {/* Description */}
            <ScrollReveal delay={0.16}>
              <m.p
                className="max-w-md text-base leading-relaxed md:text-lg"
                style={{ color: secondaryTextColor }}
              >
                Based in New York, we partner with clients from the Caribbean
                to Europe — delivering premium digital experiences wherever
                opportunity calls.
              </m.p>
            </ScrollReveal>

            {/* City cards */}
            <div className="space-y-3 pt-2">
              {cities.map((city, i) => (
                <ScrollReveal key={city.name} delay={0.24 + i * 0.08}>
                  <m.div
                    className="flex items-start gap-3 rounded-xl px-4 py-3 backdrop-blur-sm"
                    style={{
                      borderWidth: 1,
                      borderStyle: "solid",
                      borderColor: cardBorderColor,
                      backgroundColor: cardBgColor,
                    }}
                  >
                    {/* Pin icon */}
                    <m.div className="mt-0.5 flex-shrink-0" style={{ color: city.isHQ ? hqPillTextColor : pinColor }}>
                      <MapPin className="size-4" />
                    </m.div>

                    {/* City info */}
                    <div className="min-w-0 flex-1">
                      <m.p
                        className="text-sm font-semibold"
                        style={{ color: textColor }}
                      >
                        {city.name}, {city.state}
                      </m.p>
                      <div className="mt-1.5 flex flex-wrap gap-1.5">
                        {city.services.map((service) => (
                          <m.span
                            key={service}
                            className="inline-block rounded-full px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider"
                            style={{
                              backgroundColor: city.isHQ
                                ? hqPillBgColor
                                : pillBgColor,
                              color: city.isHQ
                                ? hqPillTextColor
                                : pillTextColor,
                            }}
                          >
                            {service}
                          </m.span>
                        ))}
                      </div>
                    </div>
                  </m.div>
                </ScrollReveal>
              ))}
            </div>
          </div>

          {/* Right column: interactive globe */}
          <m.div
            className="flex w-1/2 items-center justify-center"
            style={{
              scale: globeScale,
              opacity: globeOpacity,
              willChange: "transform, opacity",
            }}
          >
            <InteractiveGlobe
              size={560}
              markers={jaspireMarkers}
              connections={jaspireConnections}
              dotColor="rgba(59, 130, 246, ALPHA)"
              arcColor="rgba(59, 130, 246, 0.5)"
              markerColor="rgba(96, 165, 250, 1)"
              autoRotateSpeed={0.002}
            />
          </m.div>
        </div>
      </div>
    </m.section>
  );
}

// --- Mobile: static layout, globe on top ---

function MobileGlobalReach() {
  return (
    <section
      data-section-id="globe"
      data-theme="dark"
      className="dark relative bg-[var(--background)] py-24"
    >
      {/* Noise texture */}
      <div className="noise absolute inset-0" />

      {/* Subtle blue glow */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(59, 130, 246, 0.06) 0%, transparent 60%)",
        }}
      />

      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6">
        {/* Globe */}
        <ScrollReveal>
          <div className="mx-auto mb-10 flex justify-center">
            <InteractiveGlobe
              size={280}
              markers={jaspireMarkers}
              connections={jaspireConnections}
              dotColor="rgba(59, 130, 246, ALPHA)"
              arcColor="rgba(59, 130, 246, 0.5)"
              markerColor="rgba(96, 165, 250, 1)"
              autoRotateSpeed={0.002}
            />
          </div>
        </ScrollReveal>

        {/* Mono kicker */}
        <ScrollReveal>
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-[var(--text-tertiary)]">
            Our Reach
          </p>
        </ScrollReveal>

        {/* Heading */}
        <ScrollReveal delay={0.08}>
          <h2 className="mb-4 font-display text-3xl font-bold tracking-tight">
            Global Clients,
            <br />
            Local Craft.
          </h2>
        </ScrollReveal>

        {/* Description */}
        <ScrollReveal delay={0.16}>
          <p className="mb-8 max-w-md text-base leading-relaxed text-[var(--text-secondary)]">
            Based in New York, we partner with clients from the Caribbean to
            Europe — delivering premium digital experiences wherever opportunity
            calls.
          </p>
        </ScrollReveal>

        {/* City cards */}
        <div className="space-y-3">
          {cities.map((city, i) => (
            <ScrollReveal key={city.name} delay={0.24 + i * 0.08}>
              <div className="flex items-start gap-3 rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-3 backdrop-blur-sm">
                {/* Pin icon */}
                <div
                  className={`mt-0.5 flex-shrink-0 ${city.isHQ ? "text-[#a78bfa]" : "text-blue-400"}`}
                >
                  <MapPin className="size-4" />
                </div>

                {/* City info */}
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-[var(--text-primary)]">
                    {city.name}, {city.state}
                  </p>
                  <div className="mt-1.5 flex flex-wrap gap-1.5">
                    {city.services.map((service) => (
                      <span
                        key={service}
                        className={`inline-block rounded-full px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider ${
                          city.isHQ
                            ? "bg-[rgba(124,107,240,0.15)] text-[#a78bfa]"
                            : "bg-blue-500/15 text-blue-400"
                        }`}
                      >
                        {service}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>

      {/* Bottom gradient transition to footer background */}
      <div className="absolute -bottom-32 left-0 right-0 h-32 bg-gradient-to-b from-[#0a0a0a] to-[#f5f3f0] md:-bottom-40 md:h-40" />
    </section>
  );
}

// --- Exported component with responsive split ---

export function GlobalReach() {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  // SSR fallback: render mobile layout (simpler, no scroll-jacking)
  if (typeof window === "undefined") {
    return <MobileGlobalReach />;
  }

  return isDesktop ? <DesktopGlobalReach /> : <MobileGlobalReach />;
}
