import { useId, type SVGProps } from "react";
import { cn } from "./cn";

interface DotPatternProps extends SVGProps<SVGSVGElement> {
  width?: number;
  height?: number;
  cx?: number;
  cy?: number;
  cr?: number;
}

/** Static SVG dot grid background. Colour via `text-*` class. Server-safe (no JS). */
export function DotPattern({ width = 20, height = 20, cx = 1, cy = 1, cr = 1, className, ...props }: DotPatternProps) {
  const id = useId();
  return (
    <svg aria-hidden className={cn("pointer-events-none absolute inset-0 h-full w-full fill-current text-zinc-500/30", className)} {...props}>
      <defs>
        <pattern id={id} width={width} height={height} patternUnits="userSpaceOnUse">
          <circle cx={cx} cy={cy} r={cr} />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}
