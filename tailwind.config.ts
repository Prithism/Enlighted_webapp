import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#22819A",
          hover: "#1B6B7F",
          light: "#90C2E7",
        },
        background: "#F7FAFC",
        card: "#FEF7F8",
        border: "#CDD4DD",
        sky: "#90C2E7",
        ocean: "#22819A",
        offWhite: "#FEF7F8",
        coolGray: "#CDD4DD",
        // difficulty helper colors
        easy: "#A8E6CF",
        medium: "#FFD166",
        hard: "#FF6F61",
      },
      borderRadius: {
        "3xl": "1.5rem",
        xl: "1rem",
      },
      boxShadow: {
        soft: "0 4px 20px -2px rgba(34, 129, 154, 0.1)",
        "soft-xl": "0 10px 40px -10px rgba(34, 129, 154, 0.15)",
      },
      animation: {
        "fade-up": "fadeUp 0.6s ease-out",
        "float": "float 3s ease-in-out infinite",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
    },
  },
  plugins: [],
}
export default config