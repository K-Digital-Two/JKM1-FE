/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      backgroundImage :{
        'blue-screen' : "url('./img/back.png')"
      }
    },
  },
  plugins: [],
}