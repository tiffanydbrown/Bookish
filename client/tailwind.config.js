/** @type {import('tailwindcss').Config} */

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'anti-flash-white': '#EDF2F4',
        lilac: '#b0b0f9',
        'dark-lilac': '#8384f5',
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
