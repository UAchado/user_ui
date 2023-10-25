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

        "primary": "#92D40D",

        "secondary": "#db9e69",

        "accent": "#c46538",

        "neutral": "#3b2640",

        "base-100": "#f6f2f8",

        "info": "#94e5f9",

        "success": "#1c8276",

        "warning": "#f7a650",

        "error": "#df4343",
      },
    }, ],
  },
  plugins: [require("daisyui")],
}