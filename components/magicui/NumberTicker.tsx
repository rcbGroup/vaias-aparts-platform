"use client";
import { useEffect, useRef, type ComponentPropsWithoutRef } from "react";
import { cn } from "./cn";

interface NumberTickerProps extends ComponentPropsWithoutRef<"span"> {
  value: number;
  startValue?: number;
  /** seconds */
  duration?: number;
  delay?: number;
  decimalPlaces?: number;
  locale?: string;
  prefix?: string;
  suffix?: string;
}

/** Counts up when scrolled into view. No animation library needed (requestAnimationFrame + ease-out). */
export function NumberTicker({
  value,
  startValue = 0,
  duration = 1.6,
  delay = 0,
  decimalPlaces = 0,
  locale = "en-GB",
  prefix = "",
  suffix = "",
  className,
  ...props
}: NumberTickerProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const fmt = (n: number) =>
    `${prefix}${new Intl.NumberFormat(locale, { minimumFractionDigits: decimalPlaces, maximumFractionDigits: decimalPlaces }).format(n)}${suffix}`;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      el.textContent = fmt(value);
      return;
    }
    let raf = 0;
    let timer: ReturnType<typeof setTimeout> | null = null;
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return;
        io.disconnect();
        timer = setTimeout(() => {
          const t0 = performance.now();
          const tick = (now: number) => {
            const p = Math.min(1, (now - t0) / (duration * 1000));
            const eased = 1 - Math.pow(1 - p, 3);
            el.textContent = fmt(startValue + (value - startValue) * eased);
            if (p < 1) raf = requestAnimationFrame(tick);
          };
          raf = requestAnimationFrame(tick);
        }, delay * 1000);
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      if (timer) clearTimeout(timer);
      cancelAnimationFrame(raf);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, startValue, duration, delay, decimalPlaces, locale, prefix, suffix]);

  return (
    <span ref={ref} className={cn("inline-block tabular-nums", className)} {...props}>
      {fmt(value)}
    </span>
  );
}
