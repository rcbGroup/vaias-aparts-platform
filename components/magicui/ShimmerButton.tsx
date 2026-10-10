import React, { type ComponentPropsWithoutRef, type CSSProperties } from "react";
import { cn } from "./cn";

export interface ShimmerButtonProps extends ComponentPropsWithoutRef<"button"> {
  shimmerColor?: string;
  shimmerDuration?: string;
  borderRadius?: string;
  background?: string;
}

/**
 * Shimmer button, ported from Magic UI (MIT) without container queries so it works on Tailwind 3.
 * A conic-gradient ring rotates behind a masked inner surface. Needs the `spin-around` keyframes.
 */
export const ShimmerButton = React.forwardRef<HTMLButtonElement, ShimmerButtonProps>(
  (
    { shimmerColor = "#ffffff", shimmerDuration = "3s", borderRadius = "9999px", background = "#18181b", className, children, style, ...props },
    ref,
  ) => (
    <button
      ref={ref}
      style={
        {
          "--shimmer-color": shimmerColor,
          "--radius": borderRadius,
          "--speed": shimmerDuration,
          "--bg": background,
          ...style,
        } as CSSProperties
      }
      className={cn(
        "group relative isolate inline-flex cursor-pointer items-center justify-center overflow-hidden whitespace-nowrap px-6 py-3 font-semibold text-white",
        "[border-radius:var(--radius)] [background:var(--bg)]",
        "transition-transform duration-200 ease-out hover:-translate-y-px active:translate-y-px",
        className,
      )}
      {...props}
    >
      {/* rotating conic ring */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-20 overflow-hidden [border-radius:var(--radius)] motion-reduce:hidden"
      >
        <span
          className="absolute left-1/2 top-1/2 aspect-square w-[250%] -translate-x-1/2 -translate-y-1/2 animate-spin-around [animation-duration:calc(var(--speed)*2)] [background:conic-gradient(from_0deg,transparent_0deg,var(--shimmer-color)_60deg,transparent_120deg)] opacity-80 blur-[2px]"
        />
      </span>
      {/* inner surface, inset by 1px to reveal the ring as a thin moving edge */}
      <span aria-hidden className="pointer-events-none absolute inset-px -z-10 [border-radius:var(--radius)] [background:var(--bg)]" />
      {/* soft top highlight */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 [border-radius:var(--radius)] shadow-[inset_0_-8px_10px_#ffffff1f] transition-shadow duration-300 group-hover:shadow-[inset_0_-6px_10px_#ffffff3f]"
      />
      <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
    </button>
  ),
);
ShimmerButton.displayName = "ShimmerButton";
