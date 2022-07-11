/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      keyframes: {
        correct: {
          '0%': { 'background-color': 'bg-green-500'},
          '100%': { 'background-color': 'bg-white'},
        },
        incorrect: {
          '0%': { 'background-color': 'bg-red-500'},
          '100%': { 'background-color': 'bg-white'},
        }
      },
      animation: {
        correct: 'correct 1s ease-out',
        'spin-slow': 'spin 3s linear infinite',
      }
    },
  },
  plugins: [],
}
