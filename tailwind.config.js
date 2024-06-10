/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: 'class', // or 'media' or false
  theme: {
    extend: {
      fontFamily: {
        firacode: ['Fira Code', 'monospace'],
      },
      colors: {
        primary: 'var(--primary-color)',
        secondary: 'var(--secondary-color)',
        accent: 'var(--accent-color)',
        background: 'var(--background-color)',
        text: 'var(--text-color)',
        white: 'var(--white-color)',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}