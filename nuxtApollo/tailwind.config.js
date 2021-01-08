const colors = require('tailwindcss/colors')
let currentColor = 'orange'

module.exports = {
  purge: {},
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    colors: {
      transparent: 'transparent',
      customize: currentColor,
      black: '#000',
      white: '#fff',
      gray: colors.trueGray,
      indigo: colors.indigo,
      red: colors.rose,
      yellow: colors.amber,
      green: colors.green,
      pink: {
        light: '#ff7ce5',
        DEFAULT: '#ff49db',
        dark: '#ff16d1',
      }
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
