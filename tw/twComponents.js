const classes = {
  '.btn': {
    display: 'flex',
    flex: '1 1 0%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    textDecorationLine: 'none',
    color: 'var(--primary-plum-600)',
    padding: '1rem 1rem',
    borderRadius: '.5rem',
    fontWeight: '600',
    ' --tw-ring-offset-width': '4px',
    fontSize: '1rem',
    lineHeight: '1.5rem',
    outline: '2px solid transparent',
    outlineOffset: '2px',
    transitionDuration: '200ms',
    transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
    '--tw-bg-opacity': '1',
    backgroundColor: 'rgb(242 192 102 / var(--tw-bg-opacity))',
    '--tw-ring-offset-color': '#FCFAFB',
    '&:hover':{
      color: 'var(--primary-plum-600)',

      //RING COLOR
      '--tw-ring-opacity': '1',
      '--tw-ring-color': 'rgb(242 192 102 / var(--tw-ring-opacity))',

      //RING OFFSET
      '--tw-ring-offset-shadow': 'var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color)',
      '--tw-ring-shadow': 'var(--tw-ring-inset) 0 0 0 calc(3px + var(--tw-ring-offset-width)) var(--tw-ring-color)',
      boxShadow: 'var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000)',

      //BG COLOR
      '--tw-bg-opacity': '1',
      backgroundColor: 'rgb(242 192 102 / var(--tw-bg-opacity))'
    },
    '&:active':{
      backgroundColor: 'var(--secondary-500)',
      '--tw-scale-x': '.97',
      '--tw-scale-y': '.97',
      transform: 'translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))',
      // RING COLOR
      '--tw-ring-color': 'var(--secondary-500)',
    }
  }
//   '.btn-blue': {
//     backgroundColor: '#3490dc',
//     color: '#fff',
//     '&:hover': {
//       backgroundColor: '#2779bd'
//     },
//   },
//   '.btn-red': {
//     backgroundColor: '#e3342f',
//     color: '#fff',
//     '&:hover': {
//       backgroundColor: '#cc1f1a'
//     },
//   },
}
module.exports = { classes }