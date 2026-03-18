import type { Transition, Variants } from "framer-motion";

// --- Spring Presets ---
export const springs = {
  snappy: { type: "spring", stiffness: 400, damping: 30 } as const,
  smooth: { type: "spring", stiffness: 100, damping: 15, mass: 1 } as const,
  bouncy: { type: "spring", stiffness: 200, damping: 10, mass: 0.5 } as const,
  counter: { type: "spring", stiffness: 75, damping: 15, mass: 0.8 } as const,
  buttonTap: { type: "spring", stiffness: 400, damping: 17 } as const,
  drawer: { type: "spring", stiffness: 380, damping: 32 } as const,
  gentle: { type: "spring", stiffness: 120, damping: 20, mass: 1.2 } as const,
} as const;

// --- Duration Scale ---
export const durations = {
  instant: 100,
  fast: 150,
  normal: 250,
  moderate: 350,
  slow: 500,
  dramatic: 800,
  shimmer: 1500,
} as const;

// --- Framer Motion Variants ---

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.1,
      staggerChildren: 0.06,
    },
  },
};

export const cardEntrance: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: springs.smooth as Transition,
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: durations.normal / 1000 },
  },
  exit: {
    opacity: 0,
    transition: { duration: durations.fast / 1000 },
  },
};

export const slideUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: springs.smooth as Transition,
  },
  exit: {
    opacity: 0,
    y: 20,
    transition: { duration: durations.normal / 1000 },
  },
};
