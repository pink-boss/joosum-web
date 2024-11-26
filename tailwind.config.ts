import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      tablet: "822px",
      pc: "1240px",
    },
    extend: {
      colors: {
        primary: "#392A95",
        secondary: "#6B5FDE",
        "background-primary": "#EFECFF",
        "background-secondary": "#F3F4F5",
        "background-menu": "#EBECED",
        "text-primary": "#000000",
        "text-secondary": "#6C6C6C",
        "text-tertiary": "#555555",
      },
      fontFamily: {
        pretendard: ["var(--font-pretendard)"],
      },
    },
  },
  plugins: [],
};
export default config;
