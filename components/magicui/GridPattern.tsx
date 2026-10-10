import { useId, type SVGProps } from "react";
import { cn } from "./cn";

interface GridPatternProps extends SVGProps<SVGSVGElement> {
  width?: number;
  height?: number;
  strokeDasharray?: string | number;
}

/** Static SVG line grid background. Colour via `text-*` class. Server-safe. */
export function GridPattern({ width = 40, height = 40, strokeDasharray = 0, className, ...props }: GridPatternProps) {
  const id = useId();
  return (
    <svg aria-hidden className={cn("pointer-events-none absolute inset-0 h-full w-full stroke-current text-zinc-500/20", className)} {...props}>
      <defs>
        <pattern id={id} width={width} height={height} patternUnits="userSpaceOnUse">
          <path d={`M.5 ${height}V.5H${width}`} fill="none" strokeDasharray={strokeDasharray} />
        </pattern>
      </defs>
      <rect width="100%" height="100%" strokeWidth={0} fill={`url(#${id})`} />
    </svg>
  );
}
