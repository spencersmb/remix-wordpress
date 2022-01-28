// If you want to use other PostCSS plugins, see the following:
// https://tailwindcss.com/docs/using-with-preprocessors
// module.exports = {
//   plugins: {
//     // postcssImport: {},
//     tailwindcss: {},
//     autoprefixer: {},
//   },
// }
module.exports = {
  plugins: [
    require('postcss-import'),
    // require('tailwindcss/nesting'),
    require('tailwindcss'),
    require('autoprefixer'),
  ]
}
