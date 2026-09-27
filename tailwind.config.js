/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      // Shift the whole type scale up one step so every text-* class
      // renders noticeably larger, tuned for TV/projector/interactive-board viewing.
      fontSize: {
        xs: ["0.875rem", { lineHeight: "1.25rem" }],
        sm: ["1rem", { lineHeight: "1.5rem" }],
        base: ["1.125rem", { lineHeight: "1.75rem" }],
        lg: ["1.25rem", { lineHeight: "1.85rem" }],
        xl: ["1.5rem", { lineHeight: "2rem" }],
        "2xl": ["1.875rem", { lineHeight: "2.25rem" }],
        "3xl": ["2.25rem", { lineHeight: "2.5rem" }],
        "4xl": ["3rem", { lineHeight: "1.1" }],
        "5xl": ["3.75rem", { lineHeight: "1.1" }],
        "6xl": ["4.5rem", { lineHeight: "1.05" }],
        "7xl": ["6rem", { lineHeight: "1" }],
        "8xl": ["8rem", { lineHeight: "1" }],
        "9xl": ["10rem", { lineHeight: "1" }],
      },
      colors: {
        confidence: {
          yellow: "#FFC93C",
          orange: "#FF8A3D",
          pink: "#FF5E8E",
          purple: "#7C4DFF",
          blue: "#3DB2FF",
          green: "#22C55E",
        },
      },
      keyframes: {
        "bounce-slow": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-14px)" },
        },
        "wiggle": {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
        "float-down": {
          "0%": { transform: "translateY(-10vh)" },
          "100%": { transform: "translateY(110vh)" },
        },
        "pop": {
          "0%": { transform: "scale(0.6)", opacity: "0" },
          "60%": { transform: "scale(1.08)", opacity: "1" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        "shake": {
          "0%, 100%": { transform: "translateX(0)" },
          "25%": { transform: "translateX(-8px)" },
          "75%": { transform: "translateX(8px)" },
        },
        "glow": {
          "0%, 100%": { boxShadow: "0 0 0px rgba(255,201,60,0.0)" },
          "50%": { boxShadow: "0 0 35px rgba(255,201,60,0.9)" },
        },
        "sway": {
          "0%, 100%": { transform: "rotate(-1.5deg)" },
          "50%": { transform: "rotate(1.5deg)" },
        },
        "bloom": {
          "0%": { transform: "scale(0)", opacity: "0" },
          "70%": { transform: "scale(1.2)", opacity: "1" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
      },
      animation: {
        "bounce-slow": "bounce-slow 1.4s ease-in-out infinite",
        "wiggle": "wiggle 1.8s ease-in-out infinite",
        "float-down": "float-down linear forwards",
        "pop": "pop 0.4s ease-out forwards",
        "shake": "shake 0.5s ease-in-out",
        "glow": "glow 1.6s ease-in-out infinite",
        "sway": "sway 4s ease-in-out infinite",
        "bloom": "bloom 0.6s cubic-bezier(0.34,1.56,0.64,1) forwards",
      },
    },
  },
  plugins: [],
};
