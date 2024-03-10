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
        },
      },
    },
  },
  plugins: [],
};
