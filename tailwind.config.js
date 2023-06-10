/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        slide: {
          "0%": { transform: "translateX(-32px)", opacity: "0" },
          "100%": { transform: "translateX(0px)", opacity: "1" },
        },
        topSlide: {
          "0%": { transform: "translateY(-32px)", opacity: "0" },
          "100%": { transform: "translateY(0px)", opacity: "1" },
        },
        downSlide: {
          "0%": { transform: "translateY(32px)", opacity: "1" },
          "100%": { transform: "translateY(0px)", opacity: "0" },
        },
      },
      animation: {
        slide: "slide .4s ease-in-out",
        topslide: "topSlide .4s ease-in-out",
        downslide: "downSlide .4s ease-in-out",
      },
    },
  },
  plugins: [],
}