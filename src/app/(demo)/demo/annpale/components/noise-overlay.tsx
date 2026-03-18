/**
 * NoiseOverlay -- subtle film grain texture via inlined SVG feTurbulence.
 *
 * Renders a single fixed div that covers the viewport. The texture is a
 * 256 x 256 tile repeated with CSS, so there is zero JS overhead after
 * the initial paint.  Kept at very low opacity + mix-blend-overlay to
 * add organic warmth without interfering with readability.
 *
 * z-index set to 40 (below modals/toasts at z-50).
 */
export function NoiseOverlay() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-[40] opacity-[0.035] mix-blend-overlay"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        backgroundRepeat: 'repeat',
        backgroundSize: '256px 256px',
      }}
      aria-hidden="true"
    />
  )
}
