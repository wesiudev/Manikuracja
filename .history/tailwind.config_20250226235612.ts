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
      backgroundImage: {
        heroImage: "url('/images/page/4.webp')",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
} satisfies Config;
