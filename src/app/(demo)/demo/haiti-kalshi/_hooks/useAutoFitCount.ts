"use client"

import { useState, useEffect, useCallback, type RefObject } from "react"

export function useAutoFitCount(
  containerRef: RefObject<HTMLElement | null>,
  measureRef: RefObject<HTMLElement | null>,
  totalCount: number,
  gap = 12,
  badgeReserve = 44
): number {
  const [visibleCount, setVisibleCount] = useState(totalCount)

  const calculate = useCallback(() => {
    const container = containerRef.current
    const measure = measureRef.current
    if (!container || !measure || totalCount === 0) return

    const containerWidth = container.offsetWidth
    const chips = measure.querySelectorAll<HTMLElement>("[data-chip-index]")
    if (chips.length === 0) return

    let usedWidth = 0
    let fitCount = 0

    for (let i = 0; i < chips.length; i++) {
      const chipWidth = chips[i].offsetWidth
      const widthWithGap = i === 0 ? chipWidth : gap + chipWidth

      const isLast = i === chips.length - 1
      const neededExtra = isLast ? 0 : gap + badgeReserve

      if (usedWidth + widthWithGap + neededExtra <= containerWidth) {
        usedWidth += widthWithGap
        fitCount++
      } else if (isLast && usedWidth + widthWithGap <= containerWidth) {
        fitCount++
      } else {
        break
      }
    }

    setVisibleCount(Math.max(1, fitCount))
  }, [containerRef, measureRef, totalCount, gap, badgeReserve])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const rafId = requestAnimationFrame(calculate)

    const observer = new ResizeObserver(() => {
      requestAnimationFrame(calculate)
    })
    observer.observe(container)

    return () => {
      cancelAnimationFrame(rafId)
      observer.disconnect()
    }
  }, [containerRef, calculate])

  return visibleCount
}
