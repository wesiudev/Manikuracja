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
        archivo: ["var(--font-archivo-black)", "sans-serif"],
      },
    },
    backgroundImage: {
      marshmellow: "url('/home/marshmellow.webp')",
      hand: "url('/home/6.webp')",
      woman: "url('/home/woman.png')",
    },
  },
  plugins: [require("@tailwindcss/typography")],
} satisfies Config;
