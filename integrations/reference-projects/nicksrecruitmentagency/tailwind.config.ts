import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          950: "#050B16",
          900: "#0B1F3A",
          800: "#122A4D",
          700: "#1B3A66",
          600: "#264C82",
        },
        gold: {
          400: "#E0BA5A",
          500: "#C9971E",
          600: "#A87A15",
        },
        sand: {
          50: "#FBF9F4",
          100: "#F7F5F0",
          200: "#E8DFCE",
        },
        emerald: {
          600: "#0E7C66",
          700: "#0A5F4F",
        },
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "serif"],
        body: ["var(--font-inter)", "sans-serif"],
      },
      backgroundImage: {
        "flight-path":
          "radial-gradient(circle, currentColor 1.5px, transparent 1.5px)",
      },
      animation: {
        "fade-up": "fadeUp 0.8s ease forwards",
        "flight-dash": "dash 3s linear infinite",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        dash: {
          to: { strokeDashoffset: "-24" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
