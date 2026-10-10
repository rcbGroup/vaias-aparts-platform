import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          50: "#f3f6f3",
          100: "#e3ebe2",
          200: "#c7d6c5",
          300: "#9bb799",
          400: "#6f9270",
          500: "#4f7553",
          600: "#3d5e42",
          700: "#324c37",
          800: "#2a3e2f",
          900: "#1f2e23",
          950: "#0f1a13"
        },
        walnut: {
          50: "#f9f5f0",
          100: "#f0e6d8",
          200: "#e0caab",
          300: "#cda77a",
          400: "#bd8852",
          500: "#a96f3e",
          600: "#8c5832",
          700: "#70442a",
          800: "#5b3825",
          900: "#4a2f21",
          950: "#291810"
        },
        cream: {
          50: "#fdfcf7",
          100: "#faf6e9",
          200: "#f3ebd0",
          300: "#ead9a8",
          400: "#dfc27b",
          500: "#d3aa54"
        },
        stone: {
          50: "#faf9f7",
          100: "#f0eeea",
          200: "#dcd9d0",
          300: "#bdb6a8",
          400: "#9a9080",
          500: "#7e7464"
        }
      },
      fontFamily: {
        // Cormorant Garamond retired (BRAND.md §4); `serif` resolves to Playfair (italic set in globals.css)
        serif: ["Playfair Display Variable", "Playfair Display", "Georgia", "serif"],
        sans: ["Inter Variable", "Inter", "system-ui", "sans-serif"],
        display: ["Playfair Display Variable", "Playfair Display", "Georgia", "serif"]
      },
      backgroundImage: {
        "hero-grad": "linear-gradient(180deg, rgba(15,26,19,0.15) 0%, rgba(15,26,19,0.55) 100%)"
      },
      animation: {
        "fade-in": "fadeIn 1.2s ease-out",
        "slide-up": "slideUp 0.8s ease-out",
        // Magic UI kit (components/magicui), ported to Tailwind 3
        marquee: "marquee var(--duration,40s) linear infinite",
        "marquee-vertical": "marquee-vertical var(--duration,40s) linear infinite",
        "spin-around": "spin-around 6s linear infinite",
        "shiny-text": "shiny-text 8s infinite",
        shine: "shine var(--duration,14s) linear infinite",
        "border-beam": "border-beam 6s linear infinite"
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" }
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        },
        marquee: { from: { transform: "translateX(0)" }, to: { transform: "translateX(calc(-100% - var(--gap)))" } },
        "marquee-vertical": { from: { transform: "translateY(0)" }, to: { transform: "translateY(calc(-100% - var(--gap)))" } },
        "spin-around": {
          "0%": { transform: "translateZ(0) rotate(0)" },
          "15%, 35%": { transform: "translateZ(0) rotate(90deg)" },
          "65%, 85%": { transform: "translateZ(0) rotate(270deg)" },
          "100%": { transform: "translateZ(0) rotate(360deg)" }
        },
        "shiny-text": {
          "0%, 90%, 100%": { backgroundPosition: "calc(-100% - var(--shiny-width)) 0" },
          "30%, 60%": { backgroundPosition: "calc(100% + var(--shiny-width)) 0" }
        },
        shine: { "0%": { backgroundPosition: "0% 0%" }, "50%": { backgroundPosition: "100% 100%" }, to: { backgroundPosition: "0% 0%" } },
        "border-beam": { to: { offsetDistance: "100%" } }
      }
    }
  },
  plugins: []
};

export default config;
