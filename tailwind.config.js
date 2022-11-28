const colors = require('tailwindcss/colors')
const plugin = require('tailwindcss/plugin')
const twUtility = require('./tw/tailwindUtilities')
const twComponents = require('./tw/twComponents')
module.exports = {
  content: ["./app/**/*.{ts,tsx}", "./styles/*.css"],
  // darkMode: 'media', // or 'media' or 'class'
  theme: {
    screens: {
      'mobile': '640px',
      // => @media (min-width: 640px) { ... }
      'mobileWide': '600px',
      'tablet': '768px',
      // => @media (min-width: 768px) { ... }

      'laptop': '1024px',
      // => @media (min-width: 1024px) { ... }

      'desktop': '1280px',
      // => @media (min-width: 1280px) { ... }

      'desktopXl': '1536px',
      'desktopMax': '1880px',
      // => @media (min-width: 1536px) { ... }
    },
    fontFamily:{
      'sans': ['ui-sans-serif', 'system-ui', 'Inter', '-apple-system', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'Noto Sans', 'sans-serif', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'],
      'sentinel__Book': ['Sentinel Book', 'serif'],
      'sentinel__SemiBold': ['Sentinel SemiBold', 'serif'],
      'sentinel__SemiBoldItal': ['Sentinel SemiBoldItal', 'serif'],
      'bonVivant': ['Bon Vivant', 'sans-serif'],
    },
    colors: {
      ...colors,
      'grey': {
        50: '#F9FAFB',
        100: '#F3F4F7',
        200: '#E5E6EB',
        300: '#D3D5DB',
        400: '#9DA3AF',
        500: '#6D727F',
        600: '#4D5561',
        700:'#384050',
        800: '#212837'
      },
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
        400: '#9f6262',
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
        300: '#F1D093',
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
      'sage':{
        50: 'var(--sage-50)',
        100: 'var(--sage-100)',
        200: 'var(--sage-200)',
        300: 'var(--sage-300)',
        400: 'var(--sage-400)',
        500: 'var(--sage-500)',
        600: 'var(--sage-600)',
        700: 'var(--sage-700)',
        800: 'var(--sage-800)',
      },
      'emerald':{
        50: 'var(--emerald-50)',
        100: 'var(--emerald-100)',
        200: 'var(--emerald-200)',
        300: 'var(--emerald-300)',
        400: 'var(--emerald-400)',
        500: 'var(--emerald-500)',
        600: 'var(--emerald-600)',
        700: 'var(--emerald-700)',
        800: 'var(--emerald-800)',
      },
      'peach':{
        300: 'var(--peach-300)',
        600: 'var(--peach-600)',
      },
      'navy':{
        50: '#F7F8FA',
        100: '#EEF1F6',
        200: '#DDE2EC',
        500: '#879ABD',
        700: '#4D648D',
        900: '#1E2737'
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
        800: '',
        400: '#F3CB48'
      },
      'blue-slate': '#404764',
      'charcoal':{
        100: '#F7F8FA',
        900: '#1E1E21'
      },
      'lfm-pink':{
        200: 'var(--lfm-pink-200)',
        400: '#b08383'
      },
      'lfm-blue':{
        700: '#35546d'
      },
      'lfm-cinnamon':{
        700: 'var(--lfm-cinnamon-700)',
        // 700: '#934826'
      },
      'cream':{
        100: '#F7F6F7',
        300: '#F3ECE6'
      }
    },
    extend:{
      transformOrigin:{
        'top-center': 'top center',
      },
      minHeight: {
        'fullBot': 'calc(100vh - env(safe-area-inset-bottom))'
      },
      gridTemplateColumns: {
        'navMobile': 'minmax(50px, 1fr) minmax(50px, auto) minmax(50px, auto)',
        'navDesktop': 'minmax(auto, 1fr) minmax(auto, 3.25fr) minmax(auto, 1fr)',
        'navDesktopXl': 'minmax(auto, 1fr) minmax(auto, 3fr) minmax(auto, 1fr)',
        'mobile': 'minmax(0, 1fr) repeat(2, minmax(auto, calc((450px - (1 * 20px)) / 2))) minmax(0, 1fr)',
        'tablet': 'minmax(0,1fr) repeat(12,minmax(30px,72.5px)) minmax(0,1fr)',
        'desktop': 'minmax(0,1fr) repeat(12,minmax(30px,102.5px)) minmax(0,1fr)'
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
        'et_1' : '0px 3px 4px rgba(161, 161, 161, 0.4);',
        'et_2_lg' : '0px 10px 20px rgba(0, 0, 0, 0.1);',
        'et_4': '0px 40px 50px rgba(0, 0, 0, 0.2)',
        'xs': '0px 4px 8px rgba(0, 0, 0, 0.1)',
        'xxl-teal': '27px 28px 43px 13px rgba(131, 176, 171, 0.24)',
        'xxl-red': '27px 28px 43px 13px rgba(176, 131, 131, 0.24)',
        'xxl-grey': '27px 28px 43px 13px rgba(19, 15, 15, 0.34)',
        'cody-sm': '0 0.3px 0.4px hsla(0, 0%, 0%, 0.025),0 0.9px 1.5px hsla(0, 0%, 0%, 0.05),0 3.5px 6px hsla(0, 0%, 0%, 0.1);'
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
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0%' },
          '100%': { opacity: '100%' },
        },
        addPadding: {
          '0%': { padding: '0 0px 0 0' },
          '100%': { 
            overflowY: 'hidden',
            padding: '0 15px 0 0' },
        }
        
      },
      animation: {
        fadeIn: 'fadeIn 300ms ease-in-out',
        addPadding: 'addPadding 0ms 150ms ease-in-out forwards',
      },
      zIndex:{
        '1': '1',
        '2': '2',
        '3': '3',
      },
      gridColumnEnd: {
        'full': '-1'
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
    }),
    plugin(function ({ addUtilities }) {
      addUtilities(twUtility.css)
    }),
    plugin(({addUtilities}) => {
      addUtilities(twUtility.underlined, {
        variants: ["after"],
      })
    }),
    plugin(({ addComponents }) => {
      addComponents(twComponents.classes)
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
