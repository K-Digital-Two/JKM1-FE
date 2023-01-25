/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}",
  require.resolve('react-widgets/styles.css')
],
  theme: {
    extend: {
      backgroundImage :{
        'blue-screen' : "url('./img/back.png')"
      }
      ,
    },
  },
  plugins: [],
}