/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          500: "#392A95",
          400: "#685fde",
          200: "#DFD9FF",
          100: "#EFECFF",
        },
        gray: {
          200: "#F3F4F5",
          400: "#D9D9D9",
          700: "#6C6C6C",
          800: "#2F2F2F",
        },
        text: {
          80: "#555555",
          100: "#333333",
        },
      },
    },
    fontFamily: {
      body: ["PretendardRegular"],
    },
  },
  plugins: [],
};
