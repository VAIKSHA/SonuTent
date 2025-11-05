/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        royal: '#1E3A8A',
        gold: '#FFD700',
      },
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif'],
        'playfair': ['Playfair Display', 'serif'],
        'inter': ['Inter', 'sans-serif'],
        'montserrat': ['Montserrat', 'sans-serif'],
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}