/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
module.exports = {
    purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
    darkMode: true, // or 'media' or 'class'
    theme: {
      extend: {
        colors: {
          "weather-primary": "#00648A",
          "weather-secondary": "004E71"
        }
      },
      fontFamily: {
        Roboto:["Robot,sans serif"]
      },
      container: {
        padding: "2rem",
        center:true
      },
      screens: {
        sm: "640px",
        md:"768px"
      }
    },
    variants: {
      extend: {},
    },
    plugins: [],
}
