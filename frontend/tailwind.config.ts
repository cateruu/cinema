import type { Config } from 'tailwindcss';

export default {
    darkMode: ['class'],
    content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
  	extend: {
  		colors: {
  			background: 'var(--background)',
  			foreground: 'var(--foreground)'
  		},
  		boxShadow: {
  			top: '0 0px 2px 1px #fb923c'
  		},
  		animation: {
  			reveal: 'reveal 0.4s ease-in-out forwards',
  			hide: 'hide 0.4s ease-in-out forwards'
  		},
  		keyframes: {
  			reveal: {
  				'0%': {
  					top: '100%'
  				},
  				'100%': {
  					top: '0'
  				}
  			},
  			hide: {
  				'0%': {
  					top: '0'
  				},
  				'100%': {
  					top: '100%'
  				}
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
