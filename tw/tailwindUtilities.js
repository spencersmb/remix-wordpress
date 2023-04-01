
const css = {
  '.underlined':{
    position: 'relative',
  },
  '.et-grid-basic':{
    display: 'grid',
    gridAutoFlow: 'row',
    gridRow: 'auto',
    gridTemplateColumns: 'minmax(0, 1fr) repeat(2, minmax(auto, calc((450px - (1 * 20px)) / 2))) minmax(0, 1fr)',
    '-moz-column-gap': '1.25rem',
    columnGap: '1.25rem',

    //TABLET
    '@media (min-width: 768px)': {
      gridTemplateColumns: 'minmax(0,1fr) repeat(12,minmax(30px,72.5px)) minmax(0,1fr)',
    },

    '@media (min-width: 1280px)': {
      gridTemplateColumns: 'minmax(0,1fr) repeat(12,minmax(30px,102.5px)) minmax(0,1fr)'
    },


  },
  '.img-child-w-auto':{
    '& img':{
      width: 'auto !important',
    }
  },
  '.inpot':{
    opacity: 0,
    position: 'absolute',
    top: 0,
    left: 0,
    height: 0,
    width: 0,
    zIndex: -1
    },
  '.btn-flex':{
    flex: '1 1 0%',
  },
  '.video-objectFit':{
    '& video':{
      objectFit: 'cover',
      width: '100%',
      height: '100%',
      top: '0px',
      left: '0px',
      position: 'absolute',
    }
  },

  '.dzBackgroundHeight': {
    height: 'calc(var(--app-height) - var(--nav-top-sm))',
    // height: 'calc(100vh - (var(--nav-top-sm) + var(--pp-nav)))',
    //TABLET
    '@media (min-width: 1024px)': {
      // height: 'calc(100vh - (var(--nav-top-lg) + var(--pp-nav)))',
      height: 'calc(var(--app-height) - var(--nav-top-lg))',
    },
  },
  
}
const underlined = {
  ".underlineAnimation": {
      content: "''",
      height: '2px',
      transform: 'scaleX(0)',
      transitionDuration: '0.25s',
      transitionTimingFunction: ' ease',
      transformOrigin: 'left',
      left: 0,
      bottom: '-4px',
      width: '100%',
      display: 'block',
      position: 'absolute',
      backgroundColor: 'currentColor',
      '&:hover':{
        backgroundColor: 'currentColor',
        transform: 'scaleX(1)',
        display: 'inline-block'
      }
  },
  ".underlined-active":{
    backgroundColor: 'currentColor',
    transform: 'scaleX(1)',
    display: 'inline-block'
  }
}
module.exports = { css, underlined }

