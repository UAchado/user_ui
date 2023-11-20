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

        "secondary": "#7AB10A",

        "accent": "#DBA071",

        "neutral": "#3b2640",

        "base-100": "#f6f2f8",

        "info": "#94e5f9",

        "success": "#1c8276",

        "warning": "#f7a650",

        "error": "#df4343",
        "--rounded-box": "0.5rem", // border radius rounded-box utility class, used in card and other large boxes
        "--rounded-btn": "0.5rem", // border radius rounded-btn utility class, used in buttons and similar element
        "--rounded-badge":"0.5rem", // border radius rounded-badge utility class, used in badges and similar
      },
    }, ],
  },
  plugins: [require("daisyui")],
}