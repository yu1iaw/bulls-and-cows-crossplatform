const plugin = require('tailwindcss/plugin');
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [],
  theme: {
    extend: {
      fontFamily: {
        playfair: ["playfair", "sans-serif"],
        ibm: ["IBM", "monospace"],
        ibmBold: ["IBM_bold", "monospace"],
        caveatSemi: ["caveat_semi", "sans-serif"]
      },
      colors: {
        primary: {
          darkPrimary: "chocolate",
          darkSecondary: "#FFDAB9",
          tint: "floralwhite",
          sandyBrown: "#f4a460",
        },
        secondary: {
          darkPrimary: "#c6d8d3",
          darkSecondary: "#f5f5dc",
          tint: "#568e8f",
          lightSlateGray: "#778899"
        },
        danger: "#992b00",
        darkGray: "#030712"
      }
    },
  },
  plugins: [
    plugin(({ addUtilities }) => {
      addUtilities({
        '.flex-center': `justify-center items-center`,
      });
    }),
  ],
}

