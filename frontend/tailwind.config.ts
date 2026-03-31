import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'grpsi-blue': '#003366', // Original corporate blue
        'grpsi-gold': '#FFD700', // Gold accent
      },
    },
  },
  plugins: [],
};
export default config;