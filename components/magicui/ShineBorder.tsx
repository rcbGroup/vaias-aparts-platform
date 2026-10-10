import type { CSSProperties, HTMLAttributes } from "react";
import { cn } from "./cn";

interface ShineBorderProps extends HTMLAttributes<HTMLDivElement> {
  borderWidth?: number;
  duration?: number;
  shineColor?: string | string[];
}

/** Soft travelling highlight around a card edge. Parent must be `relative` with a border-radius. Needs the `shine` keyframes. */
export function ShineBorder({ borderWidth = 1, duration = 14, shineColor = "#C9A84C", className, style, ...props }: ShineBorderProps) {
  const colours = Array.isArray(shineColor) ? shineColor.join(",") : shineColor;
  return (
    <div
      aria-hidden
      style={
        {
          "--border-width": `${borderWidth}px`,
          "--duration": `${duration}s`,
          backgroundImage: `radial-gradient(transparent,transparent,${colours},transparent,transparent)`,
          backgroundSize: "300% 300%",
          mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
          padding: "var(--border-width)",
          ...style,
        } as CSSProperties
      }
      className={cn("pointer-events-none absolute inset-0 size-full rounded-[inherit] will-change-[background-position] motion-safe:animate-shine", className)}
      {...props}
    />
  );
}
