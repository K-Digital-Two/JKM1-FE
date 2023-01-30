/** @type {import('tailwindcss').Config} */


module.exports = {
  content: ["./src/**/*.{html,js,jsx}",

],
  theme: {
    fontFamily : {
      display : ['Pretendard-Regular']
    },
    extend: {
      backgroundImage :{
        'blue-screen' : "url('./img/back.png')"
      },
    },
    
  },
  plugins: [
   
  ],
}