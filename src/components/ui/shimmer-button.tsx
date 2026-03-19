import { cn } from "@/lib/utils";
import type { ButtonHTMLAttributes } from "react";

interface ShimmerButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  shimmerColor?: string;
  shimmerSize?: string;
  borderRadius?: string;
  shimmerDuration?: string;
  background?: string;
}

export function ShimmerButton({
  shimmerColor = "#7c6bf0",
  shimmerSize = "0.1em",
  shimmerDuration = "2.5s",
  borderRadius = "100px",
  background = "rgba(124, 107, 240, 1)",
  className,
  children,
  ...props
}: ShimmerButtonProps) {
  return (
    <button
      style={
        {
          "--shimmer-color": shimmerColor,
          "--shimmer-size": shimmerSize,
          "--shimmer-duration": shimmerDuration,
          "--radius": borderRadius,
          "--bg": background,
        } as React.CSSProperties
      }
      className={cn(
        "group relative inline-flex cursor-pointer items-center justify-center overflow-hidden whitespace-nowrap px-8 py-4 text-sm font-semibold text-white [background:var(--bg)] [border-radius:var(--radius)]",
        "transform-gpu transition-transform duration-300 ease-in-out active:translate-y-px",
        className,
      )}
      {...props}
    >
      {/* Shimmer effect */}
      <div className="absolute inset-0 overflow-hidden [border-radius:var(--radius)]">
        <div className="absolute inset-[-100%] animate-[shimmer-slide_var(--shimmer-duration)_ease-in-out_infinite]">
          <div className="absolute inset-[-10%] bg-[conic-gradient(from_0deg,transparent_0%,var(--shimmer-color)_10%,transparent_20%)] opacity-40" />
        </div>
      </div>

      {/* Background overlay for hover */}
      <div className="absolute inset-px rounded-[calc(var(--radius)-1px)] bg-[var(--bg)] transition-opacity duration-300 group-hover:opacity-90" />

      {/* Content */}
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </button>
  );
}
