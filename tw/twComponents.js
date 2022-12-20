const { red } = require("tailwindcss/colors")

const classes = {
  '.btn': {
    '--tw-scale-x': '1',
    '--tw-scale-y': '1',
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    textDecorationLine: 'none',
    padding: '.6875rem .9rem',
    borderRadius: '.75rem',
    borderWidth: '3px',
    fontWeight: '500',
    fontSize: '1rem',
    lineHeight: '1.5rem',
    transitionDuration: '200ms',
    transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',

    transform: 'translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))',

    '&:hover':{
     
    },
    '&:focus':{
     
    },
    '&:active':{
      '--tw-scale-x': '.96',
      '--tw-scale-y': '.96',
      transform: 'translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))'
    },
  },

  // SIZES
  '.btn-xs': {
    fontWeight: '600',
    padding: '.3125rem .5rem', /* 36px */
    fontSize: '0.875rem',/* 14px */
    lineHeight: '1.25rem',/* 20px */
  },
  '.btn-sm': {
    fontWeight: '600',
    padding: '.288rem .65rem', /* 40px */
    fontSize: '1rem', /* 16px */
    lineHeight: '1.55rem',/* 24px */
  },
  '.btn-lg': {
    fontWeight: '500',
    padding: '.7255rem 1rem', /* 54px */
    fontSize: '1rem', /* 16px */
    lineHeight: '1.55rem',/* 24px */
    
  },
  '.btn-xl': {
    fontWeight: '500',
    padding: '1rem 1.5rem', /* 66px */
    fontSize: '1.125rem', /* 18px */
    lineHeight: '1.75rem',/* 28px */
    borderRadius: '1rem',
  },

  // BTN COLORS
  '.btn-primary': {
    '--tw-bg-opacity': '1',
    '--tw-text-opacity': '1', 
    '--tw-border-opacity': '1', 

    backgroundColor: 'var(--emerald-700)',
    color: 'var(--sage-50)',
    borderColor: 'var(--emerald-700)',

    '&:hover':{
      borderColor: 'var(--emerald-500)',
      backgroundColor: 'var(--emerald-500)',
      color: 'rgb(255 255 255 / var(--tw-text-opacity))'
    },
    '&:focus':{
      borderColor: 'var(--emerald-500)',
      backgroundColor: 'var(--emerald-500)',
      color: 'rgb(255 255 255 / var(--tw-text-opacity))'
    },
    '&:disabled':{
      borderColor: 'var(--sage-200)',
      backgroundColor: 'var(--sage-200)',
      color: 'var(--sage-500)',
      '&:hover':{
        color: 'var(--sage-500)',
        backgroundColor: 'var(--sage-200)',
      }
    }
  },
  '.btn-primary-ring': {
    outline: '2px solid transparent',
    outlineOffset: '2px',
    '--tw-ring-offset-width': '4px',
    '--tw-ring-opacity': '1',
    '--tw-ring-color': 'var(--emerald-500)',
    '--tw-ring-offset-shadow': 'var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color)',
    '--tw-ring-shadow': 'var(--tw-ring-inset) 0 0 0 calc(3px + var(--tw-ring-offset-width)) var(--tw-ring-color)',
    '--tw-ring-offset-color': '#ffffff',

    '&:hover':{
      boxShadow: 'var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000)',
    },
    '&:focus':{
       boxShadow: 'var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000)',
    },
    '&:disabled':{
      '--tw-ring-color': 'var(--sage-200)',
      '--tw-ring-shadow': 'var(--tw-ring-inset) 0 0 0 calc(3px + var(--tw-ring-offset-width)) var(--tw-ring-color)',
      boxShadow: 'var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000)',
    },
    '&.btn-lg':{
      padding: '.9755rem' /* 56px */
    }
  },
  '.btn-secondary': {
    '--tw-bg-opacity': '1',
    '--tw-text-opacity': '1', 
    '--tw-border-opacity': '1', 
   
    backgroundColor: 'rgb(242 192 102 / var(--tw-bg-opacity))',
    color: 'rgb(101 76 31 / var(--tw-text-opacity))',
    borderColor: 'rgb(242 192 102 / var(--tw-border-opacity))',
    '&:hover':{
      backgroundColor: 'rgb(241 208 147 / var(--tw-bg-opacity))',
      borderColor: 'rgb(241 208 147 / var(--tw-border-opacity))',
    },
    '&:disabled':{
      backgroundColor: 'rgb(241 208 147 / var(--tw-bg-opacity))',
      color: 'rgb(151 114 47 / var(--tw-text-opacity))',
      borderColor: 'rgb(241 208 147 / var(--tw-border-opacity))',
      '&:hover':{
        backgroundColor: 'rgb(241 208 147 / var(--tw-bg-opacity))',
        color: 'rgb(151 114 47 / var(--tw-text-opacity))',
        borderColor: 'rgb(241 208 147 / var(--tw-border-opacity))',
      }
    }

  },
  '.btn-secondary-ring':{
    outline: '2px solid transparent',
    outlineOffset: '2px',
    borderWidth: 0,
    
    //RING COLOR
    '--tw-ring-offset-width': '4px',
    '--tw-ring-opacity': '1',
    '--tw-ring-color': 'rgb(242 192 102 / var(--tw-ring-opacity))',
    '--tw-ring-offset-shadow': 'var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color)',
    '--tw-ring-shadow': 'var(--tw-ring-inset) 0 0 0 calc(3px + var(--tw-ring-offset-width)) var(--tw-ring-color)',
    '--tw-ring-offset-color': 'var(--sage-600)',
    '&:hover':{
      backgroundColor: 'rgb(242 192 102 / var(--tw-bg-opacity))',
      boxShadow: 'var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000)',
    },
    '&:focus':{
       boxShadow: 'var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000)',
    },
    '&:disabled':{
      
      '--tw-ring-color': 'rgb(241 208 147 / var(--tw-ring-opacity))',
      '--tw-ring-shadow': 'var(--tw-ring-inset) 0 0 0 calc(3px + var(--tw-ring-offset-width)) var(--tw-ring-color)',
      boxShadow: 'var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000)',
    },
    '&.btn-lg':{
      padding: '.9755rem' /* 56px */
    }
    
  },
  '.btn-outline-reverse':{
    color: '#fff',
    backgroundColor: 'transparent',
    borderColor: '#fff',
    '&:hover':{
      color: 'var(--grey-700)',
      backgroundColor: '#fff',
    },
    '&:active':{
    },
    '&:focus':{
      
    },
    '&:disabled':{}
  },
  '.btn-outline':{
    color: 'var(--sage-700)',
    backgroundColor: 'transparent',
    borderColor: 'var(--sage-700)',
    '&:hover':{
      color: 'var(--sage-50)',
      backgroundColor: 'var(--sage-500)',
      borderColor: 'var(--sage-500)',
    },
    '&:active':{
    },
    '&:focus':{
      
    },
    '&:disabled':{
      borderColor: 'var(--sage-300)',
      color: 'var(--sage-400)',
      '&:hover':{
        backgroundColor: 'transparent',
      }
    }
  },
  '.btn-outlineFill': {
    '--tw-text-opacity': '1', 
    '--tw-bg-opacity': '1',
    '--tw-border-opacity': '1',

    borderColor: 'rgb(211 213 219 / var(--tw-border-opacity))',
    backgroundColor: 'rgb(243 244 247 / var(--tw-bg-opacity))',
    color: 'rgb(77 85 97 / var(--tw-text-opacity))',
    '&:hover':{
      borderColor: 'rgb(77 85 97 / var(--tw-border-opacity))',
    },  
    '&:disabled':{
      color: 'rgb(157 163 175 / var(--tw-text-opacity))',
      borderColor: 'rgb(229 230 235 / var(--tw-border-opacity))'
    }
  },
  '.btn-outlineFill--sage':{
    color: 'var(--sage-700)',
    borderColor: 'var(--sage-300)',
    backgroundColor: 'var(--sage-200)',
    '&:hover':{
      borderColor: 'var(--sage-300)',
    }
  },
  '.btn-cinnamon':{
    '--tw-bg-opacity': '1',
    '--tw-text-opacity': '1', 
    '--tw-border-opacity': '1', 
    backgroundColor: 'var(--lfm-cinnamon-700)',
    color: '#fff',
    borderColor: 'var(--lfm-cinnamon-700)',

    '&:hover':{
      borderColor: 'var(--lfm-cinnamon-500)',
      backgroundColor: 'var(--lfm-cinnamon-500)',
      color: 'rgb(255 255 255 / var(--tw-text-opacity))'
    },
    '&:focus':{
      borderColor: 'var(--lfm-cinnamon-500)',
      backgroundColor: 'var(--lfm-cinnamon-500)',
      color: 'rgb(255 255 255 / var(--tw-text-opacity))'
    },
    '&:disabled':{
      borderColor: 'var(--lfm-cinnamon-100)',
      backgroundColor: 'var(--lfm-cinnamon-100)',
      color: 'var(--lfm-cinnamon-50)',
      '&:hover':{
        color: 'var(--lfm-cinnamon-50)',
        backgroundColor: 'var(--lfm-cinnamon-100)',
      }
    }
  },
  '.btn-emerald-100': {
    '--tw-bg-opacity': '1',
    '--tw-text-opacity': '1', 
    '--tw-border-opacity': '1', 

    backgroundColor: 'var(--emerald-100)',
    color: 'var(--emerald-900)',
    borderColor: 'var(--emerald-100)',

    '&:hover':{
      borderColor: 'var(--emerald-100)',
      backgroundColor: 'var(--emerald-100)',
      color: 'var(--emerald-900)'
    },
    '&:focus':{
      borderColor: 'var(--emerald-100)',
      backgroundColor: 'var(--emerald-100)',
      color: 'var(--emerald-900)'
    },
    '&:disabled':{
      borderColor: 'var(--sage-200)',
      backgroundColor: 'var(--sage-200)',
      color: 'var(--emerald-900)',
      '&:hover':{
        color: 'var(--sage-500)',
        backgroundColor: 'var(--sage-200)',
      }
    }


    
  },
  '.btn-emerald-100-ring': {
    outline: '2px solid transparent',
    outlineOffset: '2px',
    borderWidth: 0,
    '--tw-ring-offset-width': '4px',
    '--tw-ring-opacity': '1',
    '--tw-ring-color': 'var(--emerald-100)',
    '--tw-ring-offset-shadow': 'var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color)',
    '--tw-ring-shadow': 'var(--tw-ring-inset) 0 0 0 calc(3px + var(--tw-ring-offset-width)) var(--tw-ring-color)',
    '--tw-ring-offset-color': 'var(--emerald-700)',

    '&:hover':{
      boxShadow: 'var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000)',
    },
    '&:focus':{
       boxShadow: 'var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000)',
    },
    '&:disabled':{
      '--tw-ring-color': 'var(--sage-200)',
      '--tw-ring-shadow': 'var(--tw-ring-inset) 0 0 0 calc(3px + var(--tw-ring-offset-width)) var(--tw-ring-color)',
      boxShadow: 'var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000)',
    },
    '&.btn-lg':{
      padding: '.9755rem' /* 56px */
    }
  },
  '.btn-tangerine-400': {
    '--tw-bg-opacity': '1',
    '--tw-text-opacity': '1', 
    '--tw-border-opacity': '1', 

    backgroundColor: 'var(--tangerine-400)',
    color: 'var(--tangerine-900)',
    borderColor: 'var(--tangerine-400)',

    '&:hover':{
      borderColor: 'var(--tangerine-400)',
      backgroundColor: 'var(--tangerine-400)',
      color: 'var(--tangerine-900)'
    },
    '&:focus':{
      borderColor: 'var(--tangerine-400)',
      backgroundColor: 'var(--tangerine-400)',
      color: 'var(--tangerine-900)'
    },
    '&:disabled':{
      borderColor: 'var(--sage-200)',
      backgroundColor: 'var(--sage-200)',
      color: 'var(--tangerine-900)',
      '&:hover':{
        color: 'var(--sage-500)',
        backgroundColor: 'var(--sage-200)',
      }
    }


    
  },
  '.btn-tangerine-400-ring': {
    outline: '2px solid transparent',
    outlineOffset: '2px',
    borderWidth: 0,
    '--tw-ring-offset-width': '4px',
    '--tw-ring-opacity': '1',
    '--tw-ring-color': 'var(--tangerine-400)',
    '--tw-ring-offset-shadow': 'var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color)',
    '--tw-ring-shadow': 'var(--tw-ring-inset) 0 0 0 calc(3px + var(--tw-ring-offset-width)) var(--tw-ring-color)',
    '--tw-ring-offset-color': 'var(--emerald-800)',

    '&:hover':{
      boxShadow: 'var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000)',
    },
    '&:focus':{
       boxShadow: 'var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000)',
    },
    '&:disabled':{
      '--tw-ring-color': 'var(--sage-200)',
      '--tw-ring-shadow': 'var(--tw-ring-inset) 0 0 0 calc(3px + var(--tw-ring-offset-width)) var(--tw-ring-color)',
      boxShadow: 'var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000)',
    },
    '&.btn-lg':{
      padding: '.9755rem' /* 56px */
    }
  },

  // inputs
  '.input-field':{
    '--tw-ring-offset-width': '4px',
    '--tw-text-opacity': '1',
    '--tw-bg-opacity': '1',

    color: 'rgb(56 64 80 / var(--tw-text-opacity))',
    width: '100%',
    borderRadius: '0.5rem',/* 8px */
    paddingLeft: '1.25rem',/* 20px */
    paddingRight: '1.25rem',/* 20px */
    backgroundColor: 'rgb(243 244 247 / var(--tw-bg-opacity))',
    paddingTop: '1rem',/* 16px */
    paddingBottom: '1rem',/* 16px */
    transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
    transitionDuration: '200ms',
    outline: '2px solid transparent',
    outlineOffset: '2px',
    fontSize: '1rem',/* 16px */
    lineHeight: '1.5rem',/* 24px */
    transform: 'translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))',

    '&:focus':{
      '--tw-ring-offset-shadow': 'var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color)',
      '--tw-ring-shadow': 'var(--tw-ring-inset) 0 0 0 calc(3px + var(--tw-ring-offset-width)) var(--tw-ring-color)',
      boxShadow: 'var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000)',
    },
    '&:hover':{
      '--tw-ring-offset-shadow': 'var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color)',
      '--tw-ring-shadow': 'var(--tw-ring-inset) 0 0 0 calc(3px + var(--tw-ring-offset-width)) var(--tw-ring-color)',
      boxShadow: 'var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000)'
    }

  },
  '.input-field-xl':{
     borderRadius: '1rem',/* 16px */
     padding: '1.3125rem 1.65rem'
  },
  '.input-onSage':{

    '--tw-ring-offset-color': 'var(--sage-600)',
    '&:hover':{
      '--tw-ring-color': 'var(--sage-400)'
    },
    '&:active':{
      '--tw-ring-color': 'rgb(242 192 102 / var(--tw-ring-opacity))'
    },
    '&:focus':{
      '--tw-ring-color': 'var(--sage-200)'
    }
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
  '.btn-deprecated': {
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
  '.btn-outline-deprecated':{
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
  '.btn-sage-600-deprecated':{
    backgroundColor: 'var(--sage-600)',
    color: 'var(--sage-50)',
    '&:hover':{
      color: 'var(--sage-50)',
      backgroundColor: 'var(--sage-700)',
      '--tw-ring-color': 'var(--sage-700)',
    },
    '&:focus':{
      color: 'var(--sage-50)',
      backgroundColor: 'var(--sage-700)',
      '--tw-ring-color': 'var(--sage-700)',
    },
    '&:active':{
      color: 'var(--sage-50)',
      backgroundColor: 'var(--sage-700)',
      '--tw-ring-color': 'var(--sage-700)'
    }
  },
  '.btn-small-deprecated':{
    padding: '0.5rem 1rem',
    flex: '0 1 auto'
  },
}
module.exports = { classes }