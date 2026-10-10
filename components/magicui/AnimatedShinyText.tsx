import type { ComponentPropsWithoutRef, CSSProperties } from "react";
import { cn } from "./cn";

interface Props extends ComponentPropsWithoutRef<"span"> {
  shimmerWidth?: number;
  /** base text colour class, e.g. "text-zinc-400" */
  baseClassName?: string;
  /** shimmer highlight colour (CSS colour) */
  shine?: string;
}

/** Text with a slow light sweep. Needs the `shiny-text` keyframes. */
export function AnimatedShinyText({ children, className, shimmerWidth = 100, shine = "rgba(255,255,255,0.85)", style, ...props }: Props) {
  return (
    <span
      style={{ "--shiny-width": `${shimmerWidth}px`, "--shine": shine, ...style } as CSSProperties}
      className={cn(
        "inline-block bg-clip-text bg-no-repeat [background-position:0_0] [background-size:var(--shiny-width)_100%]",
        "[background-image:linear-gradient(to_right,transparent,var(--shine)_50%,transparent)]",
        "motion-safe:animate-shiny-text",
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
}
