import type { Config } from 'tailwindcss';

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
      },
      boxShadow: {
        top: '0 0px 2px 1px #fb923c',
      },
      animation: {
        reveal: 'reveal 0.4s ease-in-out forwards',
      },
      keyframes: {
        reveal: {
          '0%': { top: '100%' },
          '100%': { top: '0' },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
