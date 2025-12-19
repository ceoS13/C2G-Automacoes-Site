
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    "./index.html",
    "./**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Inter Tight"', 'sans-serif'],
        mono: ['"Space Mono"', 'monospace'],
      },
      colors: {
        brand: {
          dark: '#050505',
          panel: '#0f0f0f',
          accent: '#06b6d4', // Cyan 500
          blue: '#2563eb',   // Blue 600
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'float-subtle': 'float-subtle 6s ease-in-out infinite',
        'meteor': 'meteor 5s linear infinite',
        'border-beam': 'border-beam calc(var(--duration)*1s) infinite linear',
        'pulse-glow-fast': 'pulse-glow 2s ease-in-out infinite',
        'shine': 'shine 4s ease-in-out infinite',
        'grid-scroll': 'grid-scroll 20s linear infinite',
        'text-shimmer': 'text-shimmer 5s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'float-subtle': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        meteor: {
          "0%": { transform: "rotate(215deg) translateX(0)", opacity: "1" },
          "70%": { opacity: "1" },
          "100%": {
            transform: "rotate(215deg) translateX(-500px)",
            opacity: "0",
          },
        },
        'border-beam': {
          '100%': {
            'offset-distance': '100%',
          },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '0.3' },
          '50%': { opacity: '0.7' },
        },
        'shine': {
          '0%': { transform: 'translateX(-200%)', opacity: '0' },
          '5%': { opacity: '0.4' },
          '20%': { transform: 'translateX(200%)', opacity: '0.4' },
          '21%': { opacity: '0' },
          '100%': { transform: 'translateX(200%)', opacity: '0' },
        },
        'grid-scroll': {
          '0%': { backgroundPosition: '0 0' },
          '100%': { backgroundPosition: '0 -50px' },
        },
        'text-shimmer': {
          '0%': { 'background-position': '200% center' },
          '100%': { 'background-position': '-200% center' },
        }
      }
    }
  },
  plugins: [],
};

export default config;
