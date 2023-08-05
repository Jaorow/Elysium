/** @type {import('tailwindcss').Config} */


module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fill: {
        'star': 'gray-400', // Change the color to your desired filled color
      }
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
  ],
}

