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

        "primary": "#C9B5A9", // cor vermelha

        "secondary": "#f3e9e4", // cor beje original

        "accent": "#DBA071",

        "neutral": "#3b2640",

        "base-100": "#f3e9e4",

        "info": "#94e5f9",

        "success": "#1c8276",

        "warning": "#ce644e", // vermelho botões

        "error": "#df4343",
        "--rounded-box": "0.5rem", // border radius rounded-box utility class, used in card and other large boxes
        "--rounded-btn": "0.5rem", // border radius rounded-btn utility class, used in buttons and similar element
        "--rounded-badge":"0.5rem", // border radius rounded-badge utility class, used in badges and similar

        "textcolor": "000000", // default button animation
      },
    }, ],
  },
  plugins: [require("daisyui")],
}