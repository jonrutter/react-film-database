/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{ts,js,tsx,jsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
    fontFamily: {
        raleway: ['var(--font-raleway)', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
