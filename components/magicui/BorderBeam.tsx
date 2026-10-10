import type { CSSProperties } from "react";
import { cn } from "./cn";

interface BorderBeamProps {
  size?: number;
  duration?: number;
  delay?: number;
  colorFrom?: string;
  colorTo?: string;
  borderWidth?: number;
  reverse?: boolean;
  className?: string;
}

/**
 * A light beam travelling along the border of its (relative, rounded) parent.
 * Pure CSS via offset-path; ported from Magic UI (MIT). Needs the `border-beam` keyframes.
 */
export function BorderBeam({
  size = 60,
  duration = 6,
  delay = 0,
  colorFrom = "#C9A84C",
  colorTo = "#FBF8EF",
  borderWidth = 1,
  reverse = false,
  className,
}: BorderBeamProps) {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 rounded-[inherit] border-transparent [mask-clip:padding-box,border-box] [mask-composite:intersect] [mask-image:linear-gradient(transparent,transparent),linear-gradient(#000,#000)] motion-reduce:hidden"
      style={{ borderWidth }}
    >
      <div
        className={cn("absolute aspect-square animate-border-beam", className)}
        style={
          {
            width: size,
            offsetPath: `rect(0 auto auto 0 round ${size}px)`,
            backgroundImage: `linear-gradient(to left, ${colorFrom}, ${colorTo}, transparent)`,
            animationDuration: `${duration}s`,
            animationDelay: `${-delay}s`,
            animationDirection: reverse ? "reverse" : "normal",
          } as CSSProperties
        }
      />
    </div>
  );
}
