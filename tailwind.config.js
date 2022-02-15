const colors = require('tailwindcss/colors')
const plugin = require('tailwindcss/plugin')
module.exports = {
  // mode: 'jit',
  content: ["./app/**/*.{ts,tsx}"],
  // darkMode: 'media', // or 'media' or 'class'
  theme: {
    screens: {
      'mobile': '640px',
      // => @media (min-width: 640px) { ... }

      'tablet': '768px',
      // => @media (min-width: 768px) { ... }

      'laptop': '1024px',
      // => @media (min-width: 1024px) { ... }

      'desktop': '1280px',
      // => @media (min-width: 1280px) { ... }

      'desktopXl': '1536px',
      // => @media (min-width: 1536px) { ... }
    },
    fontFamily:{
      'sentinel__Book': ['Sentinel Book', 'serif'],
      'sentinel__SemiBold': ['Sentinel SemiBold', 'serif'],
      'sentinel__SemiBoldItal': ['Sentinel SemiBoldItal', 'serif'],
    },
    colors: {
      ...colors,
      'neutral': {
        50: '#FCFAFB',
        100: '#F6F4F5',
        200: '#EFECEE',
        300: '#DED9DC',
        400: '#D0C9CD',
        500: '#A1929A',
        600: '#8F7D87',
        700: '#675960',
        800: '#3E353A',
        900: '#151213'
      },
      'primary': {
        50: "var(--primary-plum-50)",
        100: '#F0E3DC',
        200: '#F0D6C7',
        300: '#CDA7A7',
        400: '#976969',
        500: '#8d5c5c',
        600: "var(--primary-plum-600)",
        700: "var(--primary-plum-700)",
        800: '#3c2626',
        900: '#130D0D'
      },
      'secondary': {
        50: '#F6ECD8',
        100: '#F2E2C5',
        200: '#EDD8B2',
        300: '#E4C58C',
        400: '#f2c066',
        500: "var(--secondary-500)",
        600: '#97722F',
        700: '#654C1F',
        800: '#322610',
        900: '#191308'
      },
      'success': {
        50: '#ECF2F2',
        100: '#D9E5E5',
        200: '#C7D8D8',
        300: '#B4CBCB',
        400: '#8FB1B1',
        500: '#699797',
        600: '#4F7171',
        700: '#344C4C',
        800: '#273939',
        900: '#1A2626'
      },
      'warning': {
        50: '#FFFBEB',
        100: '#FEF3C7',
        200: '#FDE68A',
        300: '#FCD34D',
        400: '#F3CB48',
        500: '#F59E0B',
        600: '#9E5D11',
        700: '#B45309',
        800: '#92400E',
        900: '#78350F'
      },
      'error': {
        50: '#FEF2F2',
        100: '#FEE2E2',
        200: '#FECACA',
        300: '#FCA5A5',
        400: '#F87171',
        500: '#EF4444',
        600: '#DC2626',
        700: '#B91C1C',
        800: '#991B1B',
        900: '#7F1D1D'
      },
      'yellow': {
        800: ''
      },
      'blue-slate': '#404764'
    },
    extend:{
      minHeight: {
        'fullBot': 'calc(100vh - env(safe-area-inset-bottom))'
      },
      gridTemplateColumns: {
        'navMobile': 'minmax(50px, 1fr) minmax(50px, auto) minmax(50px, auto)',
        'navDesktop': 'minmax(auto, 1fr) minmax(auto, 3fr) minmax(auto, 1fr)',
        'mobile': 'minmax(0, 1fr) repeat(2, minmax(auto, calc((450px - (1 * 20px)) / 2))) minmax(0, 1fr)',
        'tablet': 'minmax(0,1fr) repeat(12,minmax(30px,72.5px)) minmax(0,1fr);',
        'desktop': 'minmax(0,1fr) repeat(12,minmax(auto, calc((1548px - (11 * 30px)) / 12))) minmax(0,1fr);'
      },
      fontSize: {
        'h5': ['1.5rem', '1.75rem'],
        'h4': ['1.75rem', '2.125rem'],
        'h3': ['2.063rem', '2.5rem'],
        'display-1': ['4rem', '4.5rem'],
        'display-2': ['3.375rem', '3.75rem'],
        'heading-3': ['2.063rem', '2.5rem'],
        'xl': ['1.25rem', '2rem'],
        '4.5xl': ['2.375rem', '2.5rem']
      },
      boxShadow: {
        'et_4': '0px 40px 50px rgba(0, 0, 0, 0.2)',
        'xs': '0px 4px 8px rgba(0, 0, 0, 0.1)',
      },
      borderRadius: {
        '2.5xl': '1.25rem'
      },
      'transitionDuration':{
        '600': '600ms'
      },
      //https://tailwindcss.com/docs/plugins#dynamic-utilities
      svgColor: {
          1: '1'
      }
    }
  },
  plugins: [
     plugin(function({ matchUtilities, theme }) {
      matchUtilities(
        {
          svg: (value) => ({
            fill: value
          }),
        },
        { values: theme('svgColor') }
      )
    })
    // plugin(function({ addComponents }) {
    //   addComponents({
    //     '.underlined':{
    //       position: 'relative',
          
    //       '&::after':{
    //         content: "",
    //         height: '2px',
    //         transform: 'scaleX(0)',
    //         transition: 'transform 0.25s ease',
    //         transformOrigin: 'left',
    //         left: '0',
    //         bottom: '-4px',
    //         width: '100%',
    //         display: 'block',
    //         position: 'absolute',
    //         backgroundColor: 'currentColor',
    //       }
    //     }
    //   }
    // )})
  ],
}
