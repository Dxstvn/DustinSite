/* ==========================================================================
   Email Design System — Shared Constants
   ========================================================================== */

export const siteUrl = "https://jaspire.co";

// ---------------------------------------------------------------------------
// Colors
// ---------------------------------------------------------------------------

export const colors = {
  // Backgrounds
  bodyBg: "#f5f3f0",
  containerBg: "#ffffff",
  surfaceWarm: "#f0ede8",
  darkZone: "#0a0a0a",
  darkSurface: "#111111",

  // Brand
  brandPurple: "#7c6bf0",
  brandPurpleDark: "#6b5ce0",

  // Text
  textPrimary: "#1a1a1a",
  textSecondary: "#525252",
  textTertiary: "#8a8a8a",
  textMuted: "#a3a3a3",
  textOnDark: "#fafafa",
  textMutedOnDark: "#a3a3a3",
  textTertiaryOnDark: "#737373",

  // Borders
  borderWarm: "#d4d0c8",
  borderLight: "#e5e5e5",
  borderDark: "#262626",

  // Service accents
  accentBlue: "#3b82f6",
  accentGreen: "#22c55e",
  accentOrange: "#f97316",
  accentRed: "#ef4444",

  // Pre-blended badge backgrounds (10% opacity on white)
  badgePurpleBg: "#f0eefe",
  badgeBlueBg: "#ebf1fe",
  badgeGreenBg: "#eaf9ef",
  badgeOrangeBg: "#fef3eb",
  badgeRedBg: "#fdecec",
  badgeAmberBg: "#fef3c7",
  badgeAmberText: "#92400e",
} as const;

// ---------------------------------------------------------------------------
// Typography
// ---------------------------------------------------------------------------

export const fontStack =
  "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif";

export const monoStack =
  "'SF Mono', 'Monaco', 'Inconsolata', 'Courier New', monospace";

// ---------------------------------------------------------------------------
// Spacing & Sizing
// ---------------------------------------------------------------------------

export const containerMaxWidth = "600px";
export const containerRadius = "12px";
export const innerRadius = "8px";
export const pillRadius = "24px";

// ---------------------------------------------------------------------------
// Shared Base Styles
// ---------------------------------------------------------------------------

export const baseStyles = {
  body: {
    backgroundColor: colors.bodyBg,
    fontFamily: fontStack,
    padding: "40px 0",
    margin: "0",
  },
  container: {
    backgroundColor: colors.containerBg,
    borderRadius: containerRadius,
    maxWidth: containerMaxWidth,
    margin: "0 auto",
    padding: "40px 32px",
  },
  heading: {
    fontSize: "28px",
    fontWeight: "700" as const,
    color: colors.textPrimary,
    lineHeight: "1.3",
    margin: "0 0 8px",
  },
  subheading: {
    fontSize: "16px",
    color: colors.textSecondary,
    lineHeight: "1.6",
    margin: "0 0 24px",
  },
  bodyText: {
    fontSize: "15px",
    color: colors.textSecondary,
    lineHeight: "1.65",
    margin: "0 0 16px",
  },
  hr: {
    borderColor: colors.borderLight,
    margin: "32px 0 16px",
  },
  link: {
    color: colors.brandPurple,
    textDecoration: "none" as const,
  },
} as const;

// ---------------------------------------------------------------------------
// Service Accent Color Map
// ---------------------------------------------------------------------------

export const accentColorMap = {
  blue: colors.accentBlue,
  green: colors.accentGreen,
  orange: colors.accentOrange,
} as const;

export const badgeBgMap = {
  blue: colors.badgeBlueBg,
  green: colors.badgeGreenBg,
  orange: colors.badgeOrangeBg,
  purple: colors.badgePurpleBg,
  red: colors.badgeRedBg,
} as const;
