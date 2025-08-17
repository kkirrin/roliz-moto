/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    colors: {
      white: {
        default: "#FFFFFF",
        light: "#F5F5F5",
        bg: "#E8E8E8"
      },
      black: "#262626",
      gray: {
        light: "#ACACAC",
        medium: "#CDCDCD",
        dark: "#626262",
      },
      yellow: {
        default: "#FECC00",
        dark: "#FEB700",
      },
    },
  },
  plugins: [],
};
