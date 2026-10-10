import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "./cn";

interface MarqueeProps extends ComponentPropsWithoutRef<"div"> {
  reverse?: boolean;
  pauseOnHover?: boolean;
  vertical?: boolean;
  repeat?: number;
  /** seconds for one full loop */
  duration?: number;
  children: ReactNode;
}

/** Ported from Magic UI (MIT) to Tailwind 3 syntax. Needs `marquee` + `marquee-vertical` keyframes in tailwind.config. */
export function Marquee({
  className,
  reverse = false,
  pauseOnHover = false,
  vertical = false,
  repeat = 4,
  duration = 40,
  children,
  style,
  ...props
}: MarqueeProps) {
  return (
    <div
      {...props}
      style={{ ["--duration" as string]: `${duration}s`, ["--gap" as string]: "1.5rem", ...style }}
      className={cn(
        "group flex overflow-hidden p-2 [gap:var(--gap)]",
        vertical ? "flex-col" : "flex-row",
        className,
      )}
    >
      {Array.from({ length: repeat }).map((_, i) => (
        <div
          key={i}
          aria-hidden={i > 0}
          className={cn(
            "flex shrink-0 justify-around [gap:var(--gap)]",
            vertical ? "animate-marquee-vertical flex-col" : "animate-marquee flex-row",
            pauseOnHover && "group-hover:[animation-play-state:paused]",
            reverse && "[animation-direction:reverse]",
            "motion-reduce:animate-none",
          )}
        >
          {children}
        </div>
      ))}
    </div>
  );
}
