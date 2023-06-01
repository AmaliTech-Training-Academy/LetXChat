/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      dropShadow: {
        'groupShadow': '-3px 0px 2px -1px rgba(0,0,0,0.25)'
      }
    },
  },
  plugins: [],
}
