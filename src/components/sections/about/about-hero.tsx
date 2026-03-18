"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import Image from "next/image";
import {
  motion as m,
  useScroll,
  useTransform,
  useMotionValueEvent,
  type MotionValue,
} from "motion/react";
import { containerWidth } from "@/lib/constants";
import { useMediaQuery } from "@/hooks/use-media-query";
import { ScrollReveal } from "@/components/shared/scroll-reveal";

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const TOTAL_FRAMES = 192;
const FRAME_PATH = "/images/about/frames/frame_";
const FRAME_EXT = ".webp";
const CANVAS_WIDTH = 1280;
// Crop bottom 5% to remove Veo watermark
const ORIGINAL_HEIGHT = 2276;
const CROP_RATIO = 0.95;
const CANVAS_HEIGHT = Math.floor(ORIGINAL_HEIGHT * CROP_RATIO); // 2162

const missionText =
  "We believe every brand deserves a digital presence as ambitious as its vision. Great work isn't about trends — it's about craft, clarity, and conviction.";

function getFrameSrc(index: number): string {
  const padded = String(index + 1).padStart(4, "0");
  return `${FRAME_PATH}${padded}${FRAME_EXT}`;
}

// ---------------------------------------------------------------------------
// Word component for word-by-word reveal
// ---------------------------------------------------------------------------

function Word({
  word,
  index,
  wordProgress,
}: {
  word: string;
  index: number;
  wordProgress: MotionValue<number>;
}) {
  // Each word transitions from 0.15→1 opacity over a 1.5-word-wide band
  const opacity = useTransform(wordProgress, [index - 0.5, index + 1], [0.15, 1]);

  return (
    <m.span
      style={{ opacity }}
      className="mr-[0.3em] inline-block text-white"
    >
      {word}
    </m.span>
  );
}

// ---------------------------------------------------------------------------
// Desktop Hero — split-screen: mission text left + canvas video right
// ---------------------------------------------------------------------------

function DesktopAboutHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const framesRef = useRef<HTMLImageElement[]>([]);
  const [framesLoaded, setFramesLoaded] = useState(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // --- Video frame index: non-linear mapping to sync with text pace ---
  // The glass clears front-loaded (most action in frames 30-120), so we slow
  // those down to match the linear word reveal. Piecewise linear interpolation:
  // 0.05-0.20: frames 0-30   (still frosted, ~6 words revealed)
  // 0.20-0.40: frames 30-90  (glass clearing, ~12 words revealed)
  // 0.40-0.55: frames 90-150 (face fully clear, ~18 words revealed)
  // 0.55-0.63: frames 150-191 (static smile hold, final words)
  const frameIndex = useTransform(
    scrollYProgress,
    [0.05, 0.20, 0.40, 0.55, 0.63],
    [0, 30, 90, 150, TOTAL_FRAMES - 1]
  );

  // --- Word progress: single transform mapping scroll to word index 0→totalWords ---
  // Uses the SAME scroll range as video so they finish together
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

  // --- Preload frames ---
  useEffect(() => {
    const images: HTMLImageElement[] = [];
    let loaded = 0;

    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new window.Image();
      img.src = getFrameSrc(i);
      img.onload = () => {
        loaded++;
        if (loaded === TOTAL_FRAMES) setFramesLoaded(true);
      };
      img.onerror = () => {
        loaded++;
        if (loaded === TOTAL_FRAMES) setFramesLoaded(true);
      };
      images[i] = img;
    }

    framesRef.current = images;
  }, []);

  // --- Draw frame to canvas with watermark crop ---
  const drawFrame = useCallback((index: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const frameIdx = Math.round(
      Math.max(0, Math.min(TOTAL_FRAMES - 1, index))
    );
    const img = framesRef.current[frameIdx];

    if (img && img.complete && img.naturalWidth > 0) {
      const cropHeight = Math.floor(img.naturalHeight * CROP_RATIO);
      ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      // Draw only the top 95% of the source image, cropping out the watermark
      ctx.drawImage(
        img,
        0, 0, img.naturalWidth, cropHeight, // source: full width, cropped height
        0, 0, CANVAS_WIDTH, CANVAS_HEIGHT    // destination: full canvas
      );
    }
  }, []);

  // Draw initial frame once loaded
  useEffect(() => {
    if (framesLoaded) drawFrame(0);
  }, [framesLoaded, drawFrame]);

  // Bind scroll to canvas drawing
  useMotionValueEvent(frameIndex, "change", (latest) => {
    drawFrame(latest);
  });

  return (
    <section
      ref={sectionRef}
      data-section-id="about-hero"
      className="relative bg-[#f5f3f0]"
      style={{ height: "350vh" }}
    >
      {/* Sticky viewport */}
      <div
        data-theme="dark"
        className="dark sticky top-0 flex h-dvh items-center overflow-hidden bg-[#0a0a0a]"
      >
        {/* Noise texture */}
        <div className="noise absolute inset-0" />

        {/* Subtle brand glow */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            background:
              "radial-gradient(ellipse at 30% 50%, rgba(124, 107, 240, 0.08) 0%, transparent 60%)",
          }}
        />

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />

        {/* Split-screen content */}
        <div
          className={`${containerWidth} relative flex items-center gap-12 lg:gap-16 xl:gap-20`}
        >
          {/* Left: Mission text with word-by-word reveal */}
          <div className="w-[55%] space-y-8">
            {/* Mono kicker */}
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-white/40">
              Our Mission
            </p>

            {/* Word-by-word reveal heading */}
            <p className="max-w-xl font-display text-4xl font-bold leading-[1.15] tracking-tight lg:text-5xl xl:text-6xl">
              {words.map((word, i) => (
                <Word
                  key={`${word}-${i}`}
                  word={word}
                  index={i}
                  wordProgress={wordProgress}
                />
              ))}
            </p>

            {/* Founder attribution — fades in at end */}
            <m.div
              className="flex items-center gap-4 pt-4"
              style={{ opacity: founderOpacity, y: founderY }}
            >
              <div className="h-px w-10 bg-white/20" />
              <span className="font-mono text-xs uppercase tracking-[0.15em] text-white/50">
                Dustin Jasmin
              </span>
              <span className="text-white/20">·</span>
              <span className="font-mono text-xs uppercase tracking-[0.15em] text-white/50">
                Founder & Creative Director
              </span>
            </m.div>
          </div>

          {/* Right: Canvas video */}
          <div className="w-[45%]">
            <div className="relative mx-auto h-[70vh] w-auto overflow-hidden rounded-2xl shadow-2xl shadow-black/40">
              <canvas
                ref={canvasRef}
                width={CANVAS_WIDTH}
                height={CANVAS_HEIGHT}
                className="block h-full w-auto"
              />

              {/* Loading placeholder */}
              {!framesLoaded && (
                <div className="absolute inset-0">
                  <Image
                    src={getFrameSrc(0)}
                    alt=""
                    fill
                    className="object-cover object-top blur-sm"
                    priority
                  />
                </div>
              )}
            </div>
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
            animate={{ scaleY: [0.5, 1, 0.5] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </m.div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Mobile Hero — stacked: mission text + video autoplay
// ---------------------------------------------------------------------------

function MobileAboutHero() {
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
            {missionText}
          </p>
        </ScrollReveal>

        {/* Video autoplay */}
        <ScrollReveal delay={0.15}>
          <div className="mb-8 overflow-hidden rounded-2xl">
            <video
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              className="block h-auto w-full"
              style={{ objectPosition: "top" }}
            >
              <source
                src="https://yijizsscwkvepljqojkz.supabase.co/storage/v1/object/public/jaspire-media/videos/Glass_Reveal_Video_Generation.mp4"
                type="video/mp4"
              />
            </video>
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
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (typeof window === "undefined") {
    return <MobileAboutHero />;
  }

  return isDesktop ? <DesktopAboutHero /> : <MobileAboutHero />;
}
