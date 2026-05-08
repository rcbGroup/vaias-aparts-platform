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
        serif: ["Cormorant Garamond", "Georgia", "serif"],
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Playfair Display", "Georgia", "serif"]
      },
      backgroundImage: {
        "hero-grad": "linear-gradient(180deg, rgba(15,26,19,0.15) 0%, rgba(15,26,19,0.55) 100%)"
      },
      animation: {
        "fade-in": "fadeIn 1.2s ease-out",
        "slide-up": "slideUp 0.8s ease-out"
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" }
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        }
      }
    }
  },
  plugins: []
};

export default config;
