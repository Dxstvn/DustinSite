"use client"

import { useMemo } from "react"
import {
  Flame,
  Users,
  ArrowRight,
  BarChart3,
  Coins,
} from "lucide-react"
import { formatHTGCompact } from "./_lib/format-htg"
import { getOutcomeColorVar } from "./_lib/outcome-colors"
import { CATEGORY_LABELS, CATEGORY_META } from "./_lib/category-meta"
import { Header } from "./_components/header"
import { MobileBottomNav } from "./_components/mobile-bottom-nav"
import { MarketCard } from "./_components/market-card"
import { MultiMarketCard } from "./_components/multi-market-card"
import { TrendingCarousel } from "./_components/trending-carousel/trending-carousel"
import type { TrendingSlideData } from "./_components/trending-carousel/trending-carousel-slide"
import { GlobalLeaderboard } from "./_components/leaderboard/global-leaderboard"
import {
  MOCK_MARKETS,
  MOCK_OUTCOMES,
  MOCK_SNAPSHOTS,
  MOCK_LEADERBOARD,
} from "./_data/mock-data"

function getBinaryLabelProps(marketId: string): {
  labels?: [string, string]
  colors?: [string, string]
} {
  const outs = MOCK_OUTCOMES[marketId]
  if (!outs || outs.length !== 2) return {}
  const [a, b] = outs
  if (a.label === "Wi" && b.label === "Non") return {}
  return {
    labels: [a.label, b.label],
    colors: [
      `var(${getOutcomeColorVar(a.colorKey ?? "0")})`,
      `var(${getOutcomeColorVar(b.colorKey ?? "1")})`,
    ],
  }
}

export default function HaitiKalshiDemo() {
  // Compute derived data
  const allMarketsSorted = useMemo(() => {
    let maxPool = 0
    for (const m of MOCK_MARKETS) {
      const pool = m.market_type === "multi" ? m.total_pool : m.pool_wi + m.pool_non
      if (pool > maxPool) maxPool = pool
    }

    function computeScore(m: (typeof MOCK_MARKETS)[number]): number {
      const bettorScore = m.total_bettors * 0.55
      const pool = m.market_type === "multi" ? m.total_pool : m.pool_wi + m.pool_non
      const volumeScore = (pool / Math.max(maxPool, 1)) * 0.3 * 100
      const hoursSinceUpdate = Math.max((Date.now() - new Date(m.updated_at).getTime()) / 3600000, 1)
      const recencyScore = (1 / hoursSinceUpdate) * 0.05 * 100
      let urgencyScore = 0
      if (m.close_at) {
        const hoursToClose = (new Date(m.close_at).getTime() - Date.now()) / 3600000
        urgencyScore = Math.max(0, 100 - hoursToClose / 2.4) * 0.1
      }
      let score = bettorScore + volumeScore + recencyScore + urgencyScore
      if (m.total_bettors === 0) score *= 0.5
      return score
    }

    return [...MOCK_MARKETS].sort((a, b) => computeScore(b) - computeScore(a))
  }, [])

  // Carousel markets (top 5)
  const trendingMarkets = allMarketsSorted.slice(0, 5)
  const usedIds = new Set(trendingMarkets.map((m) => m.id))

  // Hot markets (next 5)
  const hotMarkets = allMarketsSorted.filter((m) => !usedIds.has(m.id)).slice(0, 5)
  for (const m of hotMarkets) usedIds.add(m.id)

  // Carousel slides
  const carouselSlides: TrendingSlideData[] = trendingMarkets.map((m) => {
    const isMulti = m.market_type === "multi"
    const mOutcomes = MOCK_OUTCOMES[m.id]
    return {
      slug: m.slug,
      title: m.title,
      category: m.category,
      marketType: isMulti ? "multi" as const : "binary" as const,
      probWi: Number(m.implied_prob_wi),
      totalPool: isMulti ? m.total_pool : m.pool_wi + m.pool_non,
      totalBettors: m.total_bettors,
      closeAt: m.close_at,
      outcomes: mOutcomes?.map((o) => ({
        id: o.id,
        label: o.label,
        probability: o.probability,
        colorKey: o.colorKey,
        iconUrl: o.iconUrl,
        sortOrder: o.sortOrder,
      })),
      snapshots: MOCK_SNAPSHOTS[m.id] ?? [],
      chartOutcomes: mOutcomes?.map((o) => ({
        id: o.id,
        label: o.label,
        colorKey: o.colorKey,
        sortOrder: o.sortOrder,
      })),
      newsSnippet: m.news_snippet ?? undefined,
      isLive: false,
    }
  })

  // Remaining markets
  const featuredIds = new Set([
    ...trendingMarkets.map((m) => m.id),
    ...hotMarkets.map((m) => m.id),
  ])
  const remainingMarkets = allMarketsSorted.filter((m) => !featuredIds.has(m.id))

  // Category counts
  const categoryCounts: Record<string, number> = {}
  let totalOpenCount = 0
  let totalPoolAll = 0
  let totalBettorsAll = 0
  for (const m of MOCK_MARKETS) {
    categoryCounts[m.category] = (categoryCounts[m.category] || 0) + 1
    totalOpenCount++
    totalPoolAll += m.market_type === "multi" ? m.total_pool : m.pool_wi + m.pool_non
    totalBettorsAll += m.total_bettors
  }

  return (
    <div className="min-h-screen">
      <Header currentPath="/" activeCategory="tout" />
      <main className="relative z-10 mx-auto max-w-[1280px] px-4 md:px-6">
        <h1 className="sr-only">Parye.com — Platfom Paryaj Prediksyon pou Ayisyen</h1>

        {/* =============================================
            ZONE 1 — TRENDING CAROUSEL
           ============================================= */}
        {carouselSlides.length > 0 && (
          <section className="pt-6 pb-2">
            <TrendingCarousel slides={carouselSlides} />
          </section>
        )}

        {/* =============================================
            STATS BAR
           ============================================= */}
        {totalOpenCount > 0 && (
          <section className="py-2" aria-label="Estatistik platfòm">
            <div className="flex items-center justify-center gap-8 md:gap-12 py-3 px-4 rounded-lg bg-bg-surface/40 backdrop-blur-sm border border-border-divider">
              <div className="flex items-center gap-2">
                <BarChart3 className="size-4 text-brand-primary" />
                <span className="text-sm font-bold text-brand-primary tabular-nums">{totalOpenCount}</span>
                <span className="text-xs text-text-muted">Mache</span>
              </div>
              <div className="flex items-center gap-2">
                <Coins className="size-4 text-accent-gold" />
                <span className="text-sm font-bold text-accent-gold tabular-nums">{formatHTGCompact(totalPoolAll)}</span>
                <span className="text-xs text-text-muted">Poul</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="size-4 text-brand-primary" />
                <span className="text-sm font-bold text-brand-primary tabular-nums">{totalBettorsAll}</span>
                <span className="text-xs text-text-muted">Paryè</span>
              </div>
            </div>
          </section>
        )}

        {/* =============================================
            ZONE 3 — CATEGORY RAIL
           ============================================= */}
        <section className="py-3" aria-label="Kategori yo">
          <div className="flex gap-3 overflow-x-auto scrollbar-none snap-x snap-mandatory pb-1">
            {Object.entries(CATEGORY_LABELS).map(([id, label]) => {
              const count = categoryCounts[id] ?? 0
              const meta = CATEGORY_META[id]
              const Icon = meta?.icon
              const color = meta?.color ?? "rgb(148,163,184)"
              return (
                <div
                  key={id}
                  className={`snap-start shrink-0 relative flex flex-col justify-center w-[140px] h-[88px] rounded-xl backdrop-blur-sm overflow-hidden transition-all duration-200 hover:scale-[1.03] active:scale-[0.98] cursor-pointer cat-rail-${id}`}
                  style={{
                    border: `1.5px solid ${color}`,
                  }}
                >
                  <div className="flex flex-col gap-1.5 pl-4 pr-3">
                    {Icon && (
                      <span style={{ color }}>
                        <Icon className="size-6" />
                      </span>
                    )}
                    <span className="text-sm font-bold text-text-primary leading-tight">
                      {label}
                    </span>
                    <span className="text-[11px] text-text-muted tabular-nums">
                      {count} mache
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        {/* =============================================
            ZONE 4 — MACHE CHO (Hot Markets)
           ============================================= */}
        {hotMarkets.length > 0 && (
          <section className="pt-4 pb-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <Flame className="size-5 text-accent-gold" />
                Mache Cho
              </h2>
              <span
                className="text-sm text-brand-primary hover:text-brand-primary-hover font-medium inline-flex items-center gap-1 group/link cursor-pointer"
              >
                Wè tout
                <ArrowRight className="size-3.5 transition-transform group-hover/link:translate-x-0.5" />
              </span>
            </div>

            {(() => {
              const hero = hotMarkets[0]
              const heroIsMulti = hero.market_type === "multi"
              const heroBinaryProps = !heroIsMulti ? getBinaryLabelProps(hero.id) : {}
              const rest = hotMarkets.slice(1)
              const sidebarCards = rest.slice(0, 2)
              const subCards = rest.slice(2)

              const renderCard = (market: typeof hero, trending = false) => {
                const isMulti = market.market_type === "multi"
                const binaryProps = !isMulti ? getBinaryLabelProps(market.id) : {}
                return isMulti && MOCK_OUTCOMES[market.id] ? (
                  <MultiMarketCard
                    key={market.id}
                    slug={market.slug}
                    title={market.title}
                    description={market.description ?? undefined}
                    category={market.category}
                    outcomes={MOCK_OUTCOMES[market.id]}
                    volume={market.total_bettors}
                    closeAt={market.close_at ? new Date(market.close_at) : undefined}
                    isTrending={trending}
                    newsSnippet={market.news_snippet ?? undefined}
                    isLive={false}
                  />
                ) : (
                  <MarketCard
                    key={market.id}
                    slug={market.slug}
                    title={market.title}
                    description={market.description ?? undefined}
                    category={market.category}
                    probWi={Number(market.implied_prob_wi)}
                    volume={market.total_bettors}
                    closeAt={market.close_at ? new Date(market.close_at) : undefined}
                    isTrending={trending}
                    newsSnippet={market.news_snippet ?? undefined}
                    isLive={false}
                    {...binaryProps}
                  />
                )
              }

              return (
                <div className="flex flex-col lg:flex-row gap-4 stagger-children">
                  <div className="flex flex-col gap-4 lg:w-2/3">
                    <div>
                      {heroIsMulti && MOCK_OUTCOMES[hero.id] ? (
                        <MultiMarketCard
                          slug={hero.slug}
                          title={hero.title}
                          description={hero.description ?? undefined}
                          category={hero.category}
                          outcomes={MOCK_OUTCOMES[hero.id]}
                          volume={hero.total_bettors}
                          closeAt={hero.close_at ? new Date(hero.close_at) : undefined}
                          isTrending
                          newsSnippet={hero.news_snippet ?? undefined}
                          isLive={false}
                        />
                      ) : (
                        <MarketCard
                          slug={hero.slug}
                          title={hero.title}
                          description={hero.description ?? undefined}
                          category={hero.category}
                          probWi={Number(hero.implied_prob_wi)}
                          volume={hero.total_bettors}
                          closeAt={hero.close_at ? new Date(hero.close_at) : undefined}
                          isTrending
                          newsSnippet={hero.news_snippet ?? undefined}
                          isLive={false}
                          {...heroBinaryProps}
                        />
                      )}
                    </div>
                    {subCards.length > 0 && (
                      <div className="grid grid-cols-2 gap-4">
                        {subCards.map((m) => renderCard(m, true))}
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col gap-4 lg:w-1/3">
                    {sidebarCards.map((m) => renderCard(m, true))}
                  </div>
                </div>
              )
            })()}
          </section>
        )}

        {/* =============================================
            ZONE 4.5 — TOP PARYE (Global Leaderboard)
           ============================================= */}
        <GlobalLeaderboard entries={MOCK_LEADERBOARD} />

        {/* =============================================
            ZONE 5 — TOUT MACHE (All Markets)
           ============================================= */}
        {remainingMarkets.length > 0 && (() => {
          const displayMarkets = remainingMarkets.slice(0, 9)
          const hasMore = remainingMarkets.length > 9

          return (
            <section className="pt-4 pb-24 md:pb-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-text-secondary">
                  Tout Mache
                  <span className="ml-2 text-sm font-normal text-text-muted tabular-nums">
                    {remainingMarkets.length} mache
                  </span>
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 stagger-children">
                {displayMarkets.map((market) => {
                  const isMulti = market.market_type === "multi"
                  const binaryProps = !isMulti ? getBinaryLabelProps(market.id) : {}

                  return isMulti && MOCK_OUTCOMES[market.id] ? (
                    <MultiMarketCard
                      key={market.id}
                      slug={market.slug}
                      title={market.title}
                      description={market.description ?? undefined}
                      category={market.category}
                      outcomes={MOCK_OUTCOMES[market.id]}
                      volume={market.total_bettors}
                      closeAt={market.close_at ? new Date(market.close_at) : undefined}
                      newsSnippet={market.news_snippet ?? undefined}
                      isLive={false}
                    />
                  ) : (
                    <MarketCard
                      key={market.id}
                      slug={market.slug}
                      title={market.title}
                      description={market.description ?? undefined}
                      category={market.category}
                      probWi={Number(market.implied_prob_wi)}
                      volume={market.total_bettors}
                      closeAt={market.close_at ? new Date(market.close_at) : undefined}
                      newsSnippet={market.news_snippet ?? undefined}
                      isLive={false}
                      {...binaryProps}
                    />
                  )
                })}
              </div>

              {hasMore && (
                <div className="flex justify-center mt-6">
                  <span
                    className="inline-flex items-center gap-2 rounded-lg bg-brand-primary px-6 py-2.5 text-sm font-semibold text-text-inverse transition-colors hover:bg-brand-primary-hover cursor-pointer"
                  >
                    Wè plis
                    <ArrowRight className="size-4" />
                  </span>
                </div>
              )}
            </section>
          )
        })()}
      </main>
      <MobileBottomNav currentPath="/" />
    </div>
  )
}
