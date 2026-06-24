/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: '#0f1724',
        muted: '#9aa4b2',
        accent: '#60a5fa',
        text: '#e6eef8',
      },
      keyframes: {
        bounceX: {
          '0%, 100%': { left: '0%' },
          '50%': { left: 'calc(100% - 4rem)' },
        },
      },
      animation: {
        bounceX: 'bounceX 3s ease-in-out forwards',
      },
    },
  },
  plugins: [],
};