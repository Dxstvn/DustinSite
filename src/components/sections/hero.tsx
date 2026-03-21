"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import {
  motion as m,
  useScroll,
  useTransform,
  AnimatePresence,
} from "motion/react";
import { ArrowUpRight, Play } from "lucide-react";
import { motion as motionPresets } from "@/lib/constants";

// Professional text cycling — clean vertical slide
const cyclingWords = ["Experiences", "Brands", "Growth"];

function CyclingText() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % cyclingWords.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <span className="relative inline-block h-[1.15em] overflow-hidden align-bottom">
      <AnimatePresence mode="wait">
        <m.span
          key={cyclingWords[index]}
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{
            duration: 0.6,
            ease: [0.19, 1, 0.22, 1],
          }}
          className="inline-block text-gradient"
        >
          {cyclingWords[index]}
        </m.span>
      </AnimatePresence>
    </span>
  );
}

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Clean 2-chunk text split
  const leftX = useTransform(scrollYProgress, [0, 0.4], ["0%", "-120%"]);
  const rightX = useTransform(scrollYProgress, [0, 0.4], ["0%", "120%"]);

  // Thoughtful message — fades in as headline splits, holds, then fades out
  const messageOpacity = useTransform(
    scrollYProgress,
    [0.02, 0.08, 0.5, 0.65],
    [0, 1, 1, 0]
  );
  const messageY = useTransform(scrollYProgress, [0.02, 0.65], [80, -500]);

  // Cycling text — fades out earlier and completely before message appears
  const cyclingOpacity = useTransform(scrollYProgress, [0.01, 0.06], [1, 0]);
  const cyclingScale = useTransform(scrollYProgress, [0.01, 0.06], [1, 0.85]);
  const cyclingY = useTransform(scrollYProgress, [0.01, 0.06], [0, -30]);

  // Body content fades in as headline splits (slightly later than message)
  const bodyOpacity = useTransform(scrollYProgress, [0.35, 0.55], [0, 1]);
  const bodyY = useTransform(scrollYProgress, [0.35, 0.55], [40, 0]);

  // Zoom-out card effect — more dramatic minimize
  const heroScale = useTransform(scrollYProgress, [0.5, 0.85], [1, 0.85]);
  const heroRadius = useTransform(scrollYProgress, [0.5, 0.85], [0, 28]);

  return (
    <section
      ref={sectionRef}
      data-section-id="hero"
      className="relative bg-[#f5f3f0]"
      style={{ height: "300vh" }}
    >
      {/* Sticky viewport container */}
      <m.div
        data-theme="dark"
        className="dark sticky top-0 flex h-dvh items-center justify-center overflow-hidden"
        style={{
          scale: heroScale,
          borderRadius: heroRadius,
        }}
      >
        {/* Video background */}
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="absolute inset-0 h-full w-full object-cover"
          style={{ objectPosition: "center 42%" }}
        >
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>

        {/* Dark overlay — lighter to let the vibrant blue rays show through */}
        <div className="absolute inset-0 bg-black/30" />

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)`,
            backgroundSize: "64px 64px",
          }}
        />

        {/* Content — true vertical center */}
        <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center px-4 text-center" style={{ position: "absolute", top: "62%", left: "50%", transform: "translate(-50%, -50%)" }}>
          {/* Headline — clean 2-chunk split on scroll */}
          <div className="overflow-hidden">
            <m.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 1,
                ease: motionPresets.ease.outExpo,
                delay: 0.7,
              }}
              className="text-5xl font-bold leading-[1.05] tracking-tight text-white sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl"
            >
              <m.span className="inline-block" style={{ x: leftX }}>
                We Build
              </m.span>{" "}
              <m.span className="inline-block" style={{ x: rightX }}>
                Digital
              </m.span>
            </m.h1>
          </div>

          {/* Cycling text — professional slide transition */}
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1,
              ease: motionPresets.ease.outExpo,
              delay: 0.9,
            }}
            className="mt-2 text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl"
          >
            <m.div style={{ opacity: cyclingOpacity, scale: cyclingScale, y: cyclingY }}>
              <CyclingText />
            </m.div>
          </m.div>

          {/* Thoughtful message — parallax scroll through headline gap */}
          <m.div
            style={{ opacity: messageOpacity, y: messageY }}
            className="mx-auto mt-8 max-w-xl md:mt-10 md:max-w-2xl"
          >
            <p
              className="text-2xl font-medium leading-snug tracking-tight text-white/95 [text-shadow:_0_2px_20px_rgba(0,0,0,0.6)] md:text-3xl lg:text-4xl"
            >
              Every brand has a story worth telling. We craft digital experiences
              that make yours unforgettable&nbsp;&mdash; through thoughtful design,
              strategic growth, and relentless attention to detail.
            </p>
          </m.div>

          {/* Body copy — fades in as headline splits */}
          <m.div style={{ opacity: bodyOpacity, y: bodyY }}>
            <p className="mx-auto mt-10 max-w-xl text-base leading-relaxed text-white/60 sm:text-lg md:mt-12 md:text-xl">
              Crafting websites, SEO strategies, and social media presence that
              transform brands and drive real results.
            </p>

            {/* CTAs */}
            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center sm:gap-5">
              <Link
                href="/portfolio"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-[var(--primary)] px-7 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:shadow-lg hover:shadow-[var(--primary)]/25 hover:brightness-110"
              >
                View Our Work
                <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="/contact"
                className="group inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:border-white/30 hover:bg-white/10"
              >
                Start a Project
                <Play className="size-3.5 fill-current transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </m.div>
        </div>

      </m.div>
    </section>
  );
}
