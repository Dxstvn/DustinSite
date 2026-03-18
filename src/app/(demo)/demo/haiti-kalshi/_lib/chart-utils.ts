/**
 * Heckbert's "nice numbers" algorithm for generating human-readable axis ticks.
 */
function niceNum(value: number, round: boolean): number {
  const exp = Math.floor(Math.log10(value))
  const frac = value / Math.pow(10, exp)
  let nice: number
  if (round) {
    nice = frac < 1.5 ? 1 : frac < 3 ? 2 : frac < 7 ? 5 : 10
  } else {
    nice = frac <= 1 ? 1 : frac <= 2 ? 2 : frac <= 5 ? 5 : 10
  }
  return nice * Math.pow(10, exp)
}

export function computeNiceTicks(domain: [number, number]): number[] {
  const [lo, hi] = domain
  const range = hi - lo
  if (range <= 0) return [lo, hi]

  const pctRange = range * 100

  for (const targetCount of [4, 6, 8]) {
    const rawInterval = pctRange / (targetCount - 1)
    const niceInterval = niceNum(rawInterval, true)
    const startPct = Math.ceil((lo * 100) / niceInterval) * niceInterval
    const ticks: number[] = []
    for (let pct = startPct; pct <= hi * 100 + 1e-9; pct += niceInterval) {
      const val = Math.round(pct) / 100
      if (val >= lo - 1e-9 && val <= hi + 1e-9) {
        ticks.push(Math.max(0, Math.min(1, val)))
      }
    }
    if (ticks.length >= 3) return ticks
  }

  return [lo, hi]
}
