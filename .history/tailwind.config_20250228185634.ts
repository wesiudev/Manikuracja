/* eslint-disable @typescript-eslint/no-require-imports */
import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        alta: ["var(--font-alta)", "sans-serif"],
        tenor: ["var(--font-tenor)", "sans-serif"],
      },
    },
    backgroundImage: {
      marshmellow: "url('/home/marshmellow.webp')",
      search: "url('/search.png')",
      background: "url('/home/background.png')",
      woman: "url('/home/woman.png')",
    },
  },
  plugins: [require("@tailwindcss/typography")],
} satisfies Config;
