/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{html,js}',
    './src/**/*.ts',
  ],
  theme: {
    extend: {
      colors: {
        'custom-red': '#D25B5B',
      }
    },
  },
  plugins: [],
}

