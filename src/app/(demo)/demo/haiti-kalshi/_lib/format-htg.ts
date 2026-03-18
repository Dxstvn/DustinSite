/**
 * Format centimes (BIGINT) to display as HTG currency.
 * 100 centimes = 1 HTG
 */
export function formatHTG(centimes: number): string {
  const htg = centimes / 100
  return (
    htg.toLocaleString("fr-HT", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }) + " HTG"
  )
}

/**
 * Format centimes to a compact display (no decimals if whole number).
 */
export function formatHTGCompact(centimes: number): string {
  const htg = centimes / 100
  const hasDecimals = htg % 1 !== 0
  return (
    htg.toLocaleString("fr-HT", {
      minimumFractionDigits: hasDecimals ? 2 : 0,
      maximumFractionDigits: 2,
    }) + " HTG"
  )
}
