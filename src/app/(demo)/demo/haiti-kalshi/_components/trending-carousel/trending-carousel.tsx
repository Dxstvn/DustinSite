"use client"

import { useCallback, useEffect, useState } from "react"
import useEmblaCarousel from "embla-carousel-react"
import Autoplay from "embla-carousel-autoplay"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { TrendingCarouselSlide, type TrendingSlideData } from "./trending-carousel-slide"
import { CarouselProgress } from "./carousel-progress"

interface TrendingCarouselProps {
  slides: TrendingSlideData[]
  className?: string
}

export function TrendingCarousel({ slides, className }: TrendingCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "start",
      watchDrag: (_emblaApi, event) => {
        const target = event.target as HTMLElement | null
        return !target?.closest("[data-chart-area]")
      },
    },
    [Autoplay({ delay: 7000, stopOnInteraction: true, stopOnMouseEnter: true })]
  )
  const [current, setCurrent] = useState(0)

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setCurrent(emblaApi.selectedScrollSnap())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    emblaApi.on("select", onSelect)
    onSelect()
    return () => {
      emblaApi.off("select", onSelect)
    }
  }, [emblaApi, onSelect])

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])

  if (slides.length === 0) return null

  return (
    <div className={cn("relative group/carousel", className)}>
      <div ref={emblaRef} className="overflow-hidden rounded-2xl">
        <div className="flex">
          {slides.map((slide, i) => (
            <div key={slide.slug} className="flex-[0_0_100%] min-w-0 pl-0">
              <TrendingCarouselSlide data={slide} rank={i} />
            </div>
          ))}
        </div>
      </div>

      {slides.length > 1 && (
        <>
          <button
            type="button"
            onClick={scrollPrev}
            className="hidden md:flex absolute left-0 -translate-x-1/2 top-1/2 -translate-y-1/2 z-10 size-8 rounded-full bg-bg-primary/80 backdrop-blur-sm border border-border-hover items-center justify-center text-text-secondary hover:text-text-primary transition-all opacity-0 group-hover/carousel:opacity-100 hover:scale-110"
            aria-label="Pase"
          >
            <ChevronLeft className="size-4" />
          </button>
          <button
            type="button"
            onClick={scrollNext}
            className="hidden md:flex absolute right-0 translate-x-1/2 top-1/2 -translate-y-1/2 z-10 size-8 rounded-full bg-bg-primary/80 backdrop-blur-sm border border-border-hover items-center justify-center text-text-secondary hover:text-text-primary transition-all opacity-0 group-hover/carousel:opacity-100 hover:scale-110"
            aria-label="Pwochenn"
          >
            <ChevronRight className="size-4" />
          </button>
        </>
      )}

      {slides.length > 1 && (
        <div className="flex justify-center mt-4">
          <CarouselProgress current={current} total={slides.length} />
        </div>
      )}
    </div>
  )
}
