const { colors: defaultColors } = require('tailwindcss/defaultTheme')

module.exports = {
  mode: 'jit',
  purge: ["./app/**/*.{ts,tsx}"],
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    fontFamily:{
      'sentinel__Book': ['Sentinel Book', 'serif'],
      'sentinel__SemiBold': ['Sentinel SemiBold', 'serif'],
      'sentinel__SemiBoldItal': ['Sentinel SemiBoldItal', 'serif'],
    },
    colors:{
      ...defaultColors,
      slateGreen: 'var(--slateGreen)'
    }
  },
  variants: {
    extend: {

    },
  },
  plugins: [],
}
