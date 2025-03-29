import type { Config } from "tailwindcss";

const config: Config = {
  content: [
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
        primary: {
          200: "#DFD9FF",
          400: "#6B5FDE",
          500: "#392A95",
          600: "#2E2277",
          lavender: "#DFD9FF",
        },
        secondary: "#6B5FDE",
        gray: {
          slate: "#909090",
          ink: "#2F2F2F",
          black: "#1D1D1D",
          silver: "#BBBBBB",
          graphite: "#444444",
          vapor: "#EBECED",
          ghost: "#F3F4F5",
          dim: "#6C6C6C",
        },
        paperabovebg: "#5242BF",
        inputactivebg: "#EFECFF",
        error: "#E34C4B",
      },
      fontFamily: {
        pretendard: ["var(--font-pretendard)"],
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
export default config;
