/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [{
      mytheme: {

        "primary": "#AE7951",

        "secondary": "#BD8A5D",

        "accent": "#7951AE",

        "neutral": "#251726",

        "base-100": "#d0dee9",

        "info": "#a5c7e9",

        "success": "#176456",

        "warning": "#f6d52c",

        "error": "#ef3e76",
      },
    }, ],
  },
  plugins: [require("daisyui")],
}