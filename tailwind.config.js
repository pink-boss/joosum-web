/** @type {import('tailwindcss').Config} */

import scrollbar from 'tailwind-scrollbar';

const px0_100 = { ...Array.from(Array(101)).map((_, i) => `${i}px`) };
const zIndex0_9999 = { ...Array.from(Array(10000)).map((_, i) => `${i}`) };

const pxToRem = (px, base = 16) => `${px / base}rem`;
const rem1000 = Array.from({ length: 1001 }, (_, px) => px).reduce((acc, px) => {
  acc[px / 4] = pxToRem(px);
  return acc;
}, {});

const config = {
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
          graphite: '#444444',
        },
        paperabovebg: '#5242bf',
        error: '#e34c4b',
      },
      fontFamily: {
        pretendard: ['var(--font-pretendard)'],
      },
      fontSize: {
        ...rem1000,
        '12-14': [pxToRem(12), { lineHeight: pxToRem(14) }],
        '12-20': [pxToRem(12), { lineHeight: pxToRem(20) }],
        '14-20': [pxToRem(14), { lineHeight: pxToRem(20) }],
        '14-22': [pxToRem(14), { lineHeight: pxToRem(22) }],
        '16-19': [pxToRem(16), { lineHeight: pxToRem(19) }],
        '16-22': [pxToRem(16), { lineHeight: pxToRem(22) }],
        '16-24': [pxToRem(16), { lineHeight: pxToRem(24) }],
        '18-21': [pxToRem(18), { lineHeight: pxToRem(21) }],
        '18-22': [pxToRem(18), { lineHeight: pxToRem(22) }],
        '18-24': [pxToRem(18), { lineHeight: pxToRem(24) }],
        '18-26': [pxToRem(18), { lineHeight: pxToRem(26) }],
        '20-24': [pxToRem(20), { lineHeight: pxToRem(24) }],
        '20-28': [pxToRem(20), { lineHeight: pxToRem(28) }],
        '24-26': [pxToRem(24), { lineHeight: pxToRem(26) }],
        '24-32': [pxToRem(24), { lineHeight: pxToRem(32) }],
        '32-40': [pxToRem(32), { lineHeight: pxToRem(40) }],
      },
      spacing: {
        ...rem1000,
      },
      minHeight: {
        ...rem1000,
        inherit: 'inherit',
      },
      minWidth: {
        ...rem1000,
        inherit: 'inherit',
      },
      maxWidth: {
        ...rem1000,
        320: pxToRem(1280),
      },
      maxHeight: {
        ...rem1000,
      },
      lineHeight: {
        ...rem1000,
      },
      zIndex: {
        ...zIndex0_9999,
        10000: '10000',
        1000000: '1000000',
      },
      borderRadius: {
        ...rem1000,
      },
      borderWidth: {
        ...px0_100,
      },
      boxShadow: {
        '0-4.73-4.73-0': '0px 4.73px 4.73px 0px #00000040',
        '0-2.87-2.87-0': '0px 2.87px 2.87px 0px #00000040',
        '2-16-19-0': '2px 16px 19px 0px #0000001a',
        modal: '0px 19.1px 30.24px 2.39px #00000024, 0px 3.18px 3.18px 0px #00000040',
        '0-19.1-30.24-2.39': '0px 19.1px 30.24px 2.39px #00000024',
        '0-3.18-3.18-0': '0px 3.18px 3.18px 0px #00000040',
      },
    },
  },
  plugins: [scrollbar],
};

export default config;
