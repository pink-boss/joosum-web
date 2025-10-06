import type { Config } from 'tailwindcss';

import scrollbar from 'tailwind-scrollbar';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './layouts/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      tablet: '822px',
      lg: '1024px',
      pc: '1240px',
    },
    extend: {
      colors: {
        primary: {
          100: '#efecff',
          200: '#dfd9ff',
          300: '#a299f6',
          400: '#6b5fde',
          500: '#392a95',
          600: '#2e2277',
          700: '#221959',
          800: '#17113c',
          900: '#0b081e',
        },
        secondary: '#6b5fde',
        gray: {
          100: '#f8f9fa',
          200: '#f3f4f5',
          300: '#ebeced',
          400: '#d9d9d9',
          500: '#bbbbbb',
          600: '#909090',
          700: '#6c6c6c',
          800: '#2f2f2f',
          900: '#1d1d1d',
          // slate: '#909090',
          // ink: '#2f2f2f',
          // black: '#1d1d1d',
          // silver: '#bbbbbb',
          graphite: '#444444',
          // vapor: '#ebeced',
          // ghost: '#f3f4f5',
          // dim: '#6c6c6c',
        },
        paperabovebg: '#5242bf',
        error: '#e34c4b',
      },
      fontFamily: {
        pretendard: ['var(--font-pretendard)'],
      },
    },
  },
  plugins: [scrollbar],
};
export default config;
