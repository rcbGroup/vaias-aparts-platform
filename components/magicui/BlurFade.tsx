"use client";
import { createElement, useEffect, useRef, useState, type ComponentPropsWithoutRef } from "react";
import { cn } from "./cn";

interface BlurFadeProps extends ComponentPropsWithoutRef<"div"> {
  /** seconds */
  delay?: number;
  duration?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  /** px */
  offset?: number;
  blur?: string;
  once?: boolean;
  as?: "div" | "section" | "li" | "span";
}

/** Reveal-on-scroll with blur + offset. CSS transitions only; respects prefers-reduced-motion. */
export function BlurFade({
  children,
  className,
  delay = 0,
  duration = 0.5,
  direction = "up",
  offset = 12,
  blur = "6px",
  once = true,
  as: Tag = "div",
  style,
  ...props
}: BlurFadeProps) {
  const ref = useRef<any>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShown(true);
          if (once) io.disconnect();
        } else if (!once) setShown(false);
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.1 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [once]);

  const x = direction === "left" ? offset : direction === "right" ? -offset : 0;
  const y = direction === "up" ? offset : direction === "down" ? -offset : 0;

  return createElement(
    Tag,
    {
      ref,
      className: cn("will-change-[opacity,transform,filter]", className),
      style: {
        opacity: shown ? 1 : 0,
        transform: shown ? "translate3d(0,0,0)" : `translate3d(${x}px, ${y}px, 0)`,
        filter: shown ? "blur(0px)" : `blur(${blur})`,
        transition: `opacity ${duration}s ease-out ${delay}s, transform ${duration}s ease-out ${delay}s, filter ${duration}s ease-out ${delay}s`,
        ...style,
      },
      ...props,
    },
    children,
  );
}
