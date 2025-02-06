/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/**/*.html",
    "./src/**/*.css"
  ],
  theme: {
    extend: {
      colors: {
        kindly: {
          primary: '#e91e63',
          hover: '#d81b60'
        }
      }
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false
  }
}
