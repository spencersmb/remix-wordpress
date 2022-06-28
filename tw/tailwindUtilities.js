
const css = {
  '.underlined':{
    position: 'relative',
  }
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
  
