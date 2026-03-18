/**
 * Karibeyan 8 — Outcome color palette for multi-outcome markets.
 */

export const OUTCOME_COLORS = [
  { name: "Bleu Syel", key: "0" },
  { name: "Vyolet", key: "1" },
  { name: "Zoranj", key: "2" },
  { name: "Syan", key: "3" },
  { name: "Woz", key: "4" },
  { name: "Jon Limye", key: "5" },
  { name: "Endigo", key: "6" },
  { name: "Ambr", key: "7" },
] as const

export type OutcomeColorKey = (typeof OUTCOME_COLORS)[number]["key"]

export function getOutcomeColorVar(
  index: number | string,
  variant: "" | "bg" | "border" | "glow" = ""
): string {
  const i = typeof index === "string" ? parseInt(index, 10) : index
  const safeIndex = ((i % 8) + 8) % 8
  const suffix = variant ? `-${variant}` : ""
  return `--color-outcome-${safeIndex}${suffix}`
}

export function getOutcomeColor(index: number | string): string {
  return `var(${getOutcomeColorVar(index)})`
}

export function getOutcomeBgColor(index: number | string): string {
  return `var(${getOutcomeColorVar(index, "bg")})`
}

export function getOutcomeBorderColor(index: number | string): string {
  return `var(${getOutcomeColorVar(index, "border")})`
}

export function getOutcomeGlowColor(index: number | string): string {
  return `var(${getOutcomeColorVar(index, "glow")})`
}
