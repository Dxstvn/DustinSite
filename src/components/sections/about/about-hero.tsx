"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  motion as m,
  useScroll,
  useTransform,
  useSpring,
  useMotionTemplate,
  useReducedMotion,
  type MotionValue,
} from "motion/react";
import { containerWidth } from "@/lib/constants";
import { useMediaQuery } from "@/hooks/use-media-query";
import { ScrollReveal } from "@/components/shared/scroll-reveal";

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const missionText =
  "We believe every brand deserves a digital presence as ambitious as its vision. Great work isn't about trends — it's about craft, clarity, and conviction.";

// The closing clause "craft, clarity, and conviction." carries the brand
// gradient. These are the final word indices in missionText (25 words total).
const GRADIENT_FROM_INDEX = 21;

// ---------------------------------------------------------------------------
// Word component for word-by-word reveal
// ---------------------------------------------------------------------------

function Word({
  word,
  index,
  wordProgress,
  gradient,
  reduce,
}: {
  word: string;
  index: number;
  wordProgress: MotionValue<number>;
  gradient?: boolean;
  reduce: boolean;
}) {
  // Each word transitions from 0.15→1 opacity over a 1.5-word-wide band.
  const opacity = useTransform(wordProgress, [index - 0.5, index + 1], [0.15, 1]);
  // Per-word blur + lift, composed into a CSS filter string. A bare numeric
  // MotionValue on style.filter is invalid — useMotionTemplate gives us a
  // proper `blur(Npx)` string that animates.
  const blur = useTransform(wordProgress, [index - 0.5, index + 1], [6, 0]);
  const filter = useMotionTemplate`blur(${blur}px)`;
  const y = useTransform(wordProgress, [index - 0.5, index + 1], [8, 0]);

  // Under reduced motion, freeze the vestibular bits (blur + lift) but keep
  // the opacity reveal — it's non-vestibular and core to the storytelling.
  const style = reduce
    ? { opacity }
    : { opacity, y, filter };

  return (
    <m.span
      style={style}
      className={
        gradient
          ? "text-gradient mr-[0.3em] inline-block"
          : "mr-[0.3em] inline-block text-white"
      }
    >
      {word}
    </m.span>
  );
}

// ---------------------------------------------------------------------------
// Desktop Hero — single centered text plane over abstract video backdrop
// ---------------------------------------------------------------------------

function DesktopAboutHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion() ?? false;
  // Only fetch the desktop backdrop on a real desktop viewport — this subtree
  // also exists (display:none) on mobile, so without this gate the hidden
  // <video> would still download.
  // useMediaQuery returns false on the server + first client paint and only
  // flips true after mount, so this doubles as the hydration guard: SSR + first
  // paint render the poster, and the <video> only mounts post-hydration on a
  // real desktop viewport (and never under reduced motion).
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // --- Word progress: single transform mapping scroll to word index 0→totalWords ---
  const words = missionText.split(" ");
  const totalWords = words.length;
  const wordProgress = useTransform(
    scrollYProgress,
    [0.05, 0.20, 0.40, 0.55, 0.63],
    [0, 6, 14, 22, totalWords]
  );

  // --- Scroll hint fades out ---
  const scrollHintOpacity = useTransform(scrollYProgress, [0, 0.05], [1, 0]);

  // --- Founder line fades in at end of text reveal ---
  const founderOpacity = useTransform(scrollYProgress, [0.58, 0.68], [0, 1]);
  const founderY = useTransform(scrollYProgress, [0.58, 0.68], [20, 0]);

  // --- Attribution hairline draws in alongside the founder lockup ---
  const hairlineScaleX = useTransform(scrollYProgress, [0.58, 0.68], [0, 1]);

  // --- Video backdrop: slow Ken-Burns drift, spring-smoothed ---
  const videoScaleRaw = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const videoYRaw = useTransform(scrollYProgress, [0, 1], ["0vh", "8vh"]);
  const videoScale = useSpring(videoScaleRaw, { stiffness: 80, damping: 30 });
  const videoY = useSpring(videoYRaw, { stiffness: 80, damping: 30 });

  // --- Analogue "shrink into card": the dark viewport contracts on exit,
  // revealing the cream <section> behind it. heroRadius rounds the corners as
  // it shrinks — integrator may drop heroRadius if it janks on lower-end GPUs.
  const heroScale = useTransform(scrollYProgress, [0.85, 1], [1, 0.96]);
  const heroRadius = useTransform(scrollYProgress, [0.85, 1], [0, 28]);

  // Under reduced motion, every motion-driven layer is static.
  const viewportStyle = reduce
    ? undefined
    : { scale: heroScale, borderRadius: heroRadius };
  const videoLayerStyle = reduce ? undefined : { scale: videoScale, y: videoY };

  return (
    // Keep the cream section bg so the shrinking dark card reveals it behind.
    <section
      ref={sectionRef}
      data-section-id="about-hero"
      className="relative bg-[#f5f3f0]"
      style={{ height: "350vh" }} // pacing can shorten toward ~280vh after manual verification — leave as-is for now
    >
      {/* Sticky dark viewport */}
      <m.div
        data-theme="dark"
        className="dark sticky top-0 flex h-dvh items-center justify-center overflow-hidden bg-[#0a0a0a]"
        style={viewportStyle}
      >
        {/* (1) Video backdrop — full-bleed object-cover. Poster on SSR/first
            paint; real <video> only when !reduce && on a desktop viewport. */}
        {!reduce && isDesktop ? (
          <m.video
            className="absolute inset-0 h-full w-full object-cover"
            style={{ ...videoLayerStyle, opacity: 0.28 }}
            poster="/images/about/hero-poster.webp"
            muted
            autoPlay
            loop
            playsInline
            preload="auto"
            aria-hidden
          >
            <source src="/videos/about-hero.webm" type="video/webm" />
            <source src="/videos/about-hero.mp4" type="video/mp4" />
          </m.video>
        ) : (
          <div className="absolute inset-0 opacity-[0.28]">
            <Image
              src="/images/about/hero-poster.webp"
              alt=""
              fill
              priority
              aria-hidden
              className="object-cover"
            />
          </div>
        )}

        {/* (2) Noise texture */}
        <div className="noise absolute inset-0" />

        {/* (2) Brand-purple radial glow */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 50% 45%, rgba(124,107,240,0.10) 0%, transparent 60%)",
          }}
        />

        {/* (2) 64px white grid */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />

        {/* (3) Vertical legibility scrim — heavier top & bottom */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(10,10,10,0.55) 0%, rgba(10,10,10,0.25) 40%, rgba(10,10,10,0.65) 100%)",
          }}
        />

        {/* (4) Always-on darkening plate behind the text column. White-text
            legibility must NOT depend on which video frame is showing, so this
            sits regardless of the backdrop's brightness. */}
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 h-[80%] w-[min(60rem,90vw)] -translate-x-1/2 -translate-y-1/2"
          style={{
            background:
              "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(10,10,10,0.5) 0%, rgba(10,10,10,0.35) 55%, transparent 100%)",
          }}
        />

        {/* Centered text plane */}
        <div className={`${containerWidth} relative`}>
          <div className="mx-auto max-w-4xl space-y-8 px-8 text-center">
            {/* Mono kicker */}
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-white/40">
              Our Mission
            </p>

            {/* Word-by-word reveal heading */}
            <p className="font-display text-4xl font-bold leading-[1.05] tracking-tight text-white md:text-6xl lg:text-7xl">
              {words.map((word, i) => (
                <Word
                  key={`${word}-${i}`}
                  word={word}
                  index={i}
                  wordProgress={wordProgress}
                  gradient={i >= GRADIENT_FROM_INDEX}
                  reduce={reduce}
                />
              ))}
            </p>

            {/* Founder attribution — fades in at end, with drawn hairline */}
            <m.div
              className="flex items-center justify-center gap-4 pt-4"
              style={
                reduce
                  ? { opacity: founderOpacity }
                  : { opacity: founderOpacity, y: founderY }
              }
            >
              <m.div
                className="h-px w-10 origin-left bg-white/30"
                style={reduce ? undefined : { scaleX: hairlineScaleX }}
              />
              <span className="font-mono text-xs uppercase tracking-[0.15em] text-white/50">
                Dustin Jasmin
              </span>
              <span className="text-white/20">·</span>
              <span className="font-mono text-xs uppercase tracking-[0.15em] text-white/50">
                Founder & Creative Director
              </span>
            </m.div>
          </div>
        </div>

        {/* Scroll hint */}
        <m.div
          className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2"
          style={{ opacity: scrollHintOpacity }}
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/30">
            Scroll to reveal
          </span>
          <m.div
            className="h-8 w-px bg-gradient-to-b from-white/30 to-transparent"
            animate={reduce ? undefined : { scaleY: [0.5, 1, 0.5] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </m.div>
      </m.div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Mobile Hero — stacked: mission text + abstract video backdrop
// ---------------------------------------------------------------------------

function MobileAboutHero() {
  const reduce = useReducedMotion() ?? false;
  // This subtree also exists (display:none) on desktop; only fetch the backdrop
  // video on an actual mobile viewport. False on SSR/first paint → poster first.
  const isMobile = useMediaQuery("(max-width: 767px)");

  return (
    <section
      data-section-id="about-hero"
      data-theme="dark"
      className="dark relative bg-[#0a0a0a] pb-16 pt-32"
    >
      {/* Noise texture */}
      <div className="noise absolute inset-0" />

      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6">
        {/* Mission text */}
        <ScrollReveal>
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-white/40">
            Our Mission
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <p className="mb-10 max-w-md font-display text-3xl font-bold leading-[1.15] tracking-tight text-white sm:text-4xl">
            We believe every brand deserves a digital presence as ambitious as
            its vision. Great work isn&apos;t about trends — it&apos;s about{" "}
            <span className="text-gradient">
              craft, clarity, and conviction.
            </span>
          </p>
        </ScrollReveal>

        {/* Abstract video backdrop (poster only under reduced motion) */}
        <ScrollReveal delay={0.15}>
          <div className="relative mb-8 overflow-hidden rounded-2xl">
            {reduce || !isMobile ? (
              <Image
                src="/images/about/hero-poster.webp"
                alt=""
                width={1280}
                height={720}
                aria-hidden
                className="block h-auto w-full opacity-[0.22]"
              />
            ) : (
              <video
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                poster="/images/about/hero-poster.webp"
                aria-hidden
                className="block h-auto w-full opacity-[0.22]"
              >
                <source src="/videos/about-hero.webm" type="video/webm" />
                <source src="/videos/about-hero.mp4" type="video/mp4" />
              </video>
            )}
            {/* Legibility scrim over the backdrop */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "linear-gradient(180deg, rgba(10,10,10,0.45) 0%, rgba(10,10,10,0.2) 45%, rgba(10,10,10,0.55) 100%)",
              }}
            />
          </div>
        </ScrollReveal>

        {/* Founder attribution */}
        <ScrollReveal delay={0.2}>
          <div className="flex items-center gap-4">
            <div className="h-px w-10 bg-white/20" />
            <span className="font-mono text-xs uppercase tracking-[0.15em] text-white/50">
              Dustin Jasmin
            </span>
            <span className="text-white/20">·</span>
            <span className="font-mono text-xs uppercase tracking-[0.15em] text-white/50">
              Founder & Creative Director
            </span>
          </div>
        </ScrollReveal>
      </div>

      {/* Bottom gradient: dark -> light */}
      <div className="absolute -bottom-32 left-0 right-0 h-32 bg-gradient-to-b from-[#0a0a0a] to-[#f5f3f0] md:-bottom-40 md:h-40" />
    </section>
  );
}

// ---------------------------------------------------------------------------
// Exported component with responsive split
// ---------------------------------------------------------------------------

export function AboutHero() {
  // CSS-driven responsive split (matches AboutFounder): both subtrees render on
  // the server and the wrong one is hidden via CSS from the first paint, so
  // there's no media-query flash or layout/height jump on hydration. Each
  // subtree only fetches its <video> on its own breakpoint (see isDesktop /
  // isMobile gates), so the hidden one never downloads the backdrop.
  return (
    <>
      <div className="hidden md:block">
        <DesktopAboutHero />
      </div>
      <div className="md:hidden">
        <MobileAboutHero />
      </div>
    </>
  );
}
