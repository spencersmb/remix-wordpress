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
    '&:focus':{
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
      // backgroundColor: 'var(--secondary-500)',
      '--tw-scale-x': '.97',
      '--tw-scale-y': '.97',
      transform: 'translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))',
      // RING COLOR
      // '--tw-ring-color': 'var(--secondary-500)',
    }
  },
  '.btn-outline':{
    color: 'var(--sage-600)',
    maxHeight: '56px',
    // height: '100%',
    marginTop: '3px',
    paddingTop: '.81rem',
    paddingBottom: '.81rem',
    transitionProperty: 'color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter',
    transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
    transitionDuration: '300ms',
    '--tw-bg-opacity': '1',
    backgroundColor: 'rgb(255 255 255 / var(--tw-bg-opacity))',
    //RING
    '--tw-ring-color': 'var(--sage-600)',
    '--tw-ring-offset-width': '0px',
    '--tw-ring-offset-shadow': 'var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color)',
    '--tw-ring-shadow': 'var(--tw-ring-inset) 0 0 0 calc(3px + var(--tw-ring-offset-width)) var(--tw-ring-color)',
    boxShadow: 'var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000)',
    '&:hover':{
      '--tw-ring-offset-width': '4px',
      '--tw-ring-color': 'var(--sage-700)',
      backgroundColor: 'var(--sage-700)',
      '--tw-text-opacity': '1',
      color: 'rgb(255 255 255 / var(--tw-text-opacity))',
    },
    '&:active':{
      '--tw-ring-color': 'var(--sage-700)',
    },
    '&:focus':{
      color: 'rgb(255 255 255 / var(--tw-text-opacity))',
      backgroundColor: 'var(--sage-700)',
      '--tw-ring-color': 'var(--sage-700)',
    },
    '&:disabled':{
      '--tw-text-opacity': '1',
      color: 'rgb(255 255 255 / var(--tw-text-opacity))',
      '--tw-ring-offset-width': '4px',
      backgroundColor: 'var(--sage-700)',
      '--tw-ring-color': 'var(--sage-700)',
    }
  },
  '.btn-sage-600':{
    backgroundColor: 'var(--sage-600)',
    color: 'var(--sage-50)',
    '&:hover':{
      color: 'var(--sage-50)',
      backgroundColor: 'var(--sage-600)',
      '--tw-ring-color': 'var(--sage-600)',
    },
    '&:focus':{
      color: 'var(--sage-50)',
      backgroundColor: 'var(--sage-600)',
      '--tw-ring-color': 'var(--sage-600)',
    },
    '&:active':{
      color: 'var(--sage-50)',
      backgroundColor: 'var(--sage-700)',
      '--tw-ring-color': 'var(--sage-700)'
    }
  },
  '.btn-small':{
    padding: '0.5rem 1rem',
    flex: '0 1 auto'
  },
  '.linkChildren':{
    '& a':{
      color: '#2465D8',
      fontWeight: '600',
      textUnderlineOffset: '4px',
      '-webkit-text-decoration-line': 'underline',
      textDecorationLine: 'underline',
      fontStyle: 'italic',
      '&:hover':{
        color: '#5491FE',
      }
    }
  },
  // NOT USED
  '.btn-disabled-outline':{
    '&:hover':{
      '&:disabled':{
        '--tw-bg-opacity': '1',
        backgroundColor: 'rgb(161 146 154 / var(--tw-bg-opacity))',
        '--tw-ring-opacity': '1',
        '--tw-ring-color': 'rgb(161 146 154 / var(--tw-ring-opacity))'
      }
    },
    //RING COLOR
    '&:disabled':{
      '--tw-ring-opacity': '1',
      '--tw-ring-color': 'rgb(161 146 154 / var(--tw-ring-opacity))',
      transform: 'translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))',
      '--tw-bg-opacity': '1',
      backgroundColor: 'rgb(161 146 154 / var(--tw-bg-opacity))'
    }
  },
}
module.exports = { classes }