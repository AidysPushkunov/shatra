import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "white-field": "var(--white-field)",
        "black-field": "var(--black-field)",
        "active-field": "var(--active-field)",
        "fortress-field": "var(--fortress-field)",
      },
    },
  },
  plugins: [],
};
export default config;
