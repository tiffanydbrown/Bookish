/** @type {import('tailwindcss').Config} */

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'anti-flash-white': '#EDF2F4',
        'cool-gray': '#8D99AE',
        'cherry-red': '#EF233C',
        'fire-engine-red': '#D90429',
        blue: '#0007c1',
      },
      fontFamily: {
        sans: ['Lato', 'sans-serif'],
        heading: ['Libre Baskerville', 'sans-serif'],
      },
    },
  },
  plugins: [
    // eslint-disable-next-line no-undef
    require('daisyui'),
    '@tailwindcss/forms',
  ],
};
