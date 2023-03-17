import React, { useEffect } from 'react'
import usePatternPlayground, { starterBgUrl } from '../usePatternProvider';
import { classNames } from '@App/utils/appUtils';
import { AnimatePresence, motion } from 'framer-motion';

function DzPattern() {

  const { state: { imageCache, backgroundImage, patternType, touched, patternRange, blendMode }, setNewImage, canvasRef, setBackgroundImage, getBase64FromUrl } = usePatternPlayground()

  const [loadedState, setLoadedState] = React.useState(false)

  // Tracks when the component has loaded for fade in animations
  useEffect(() => {
    setLoadedState(true)
  }, [])

  // useEffect hook that runs when the 'imageCache', 'patternType', or 'setBackgroundImage' variables change
  useEffect(() => {
    if (!imageCache[0]) return

    // Get the index of the image to use as the background based on the value of patternType
    const index = [0, 1, 2].includes(patternType) ? patternType : 0

    // Set the image at the specified index as the background image and exit the function
    if (imageCache[index]) setBackgroundImage(imageCache[index] as string)

  }, [imageCache, patternType, setBackgroundImage]);

  // ON FIRST LOAD - DRAW STARTER IMAGE FROM AWS URL IMAGE
  useEffect(() => {

    getBase64FromUrl(starterBgUrl).catch(console.error).then((result: any) => {
      const loadedImage = new Image();
      loadedImage.src = result
      setNewImage({ image: loadedImage })
    })

  }, [getBase64FromUrl, setNewImage])

  function getBlendMode(type: string) {
    switch (type) {
      case 'color':
        return 'mix-blend-color'

      case 'color-dodge':
        return 'mix-blend-color-dodge'

      case 'difference':
        return 'mix-blend-difference'

      case 'hue':
        return 'mix-blend-hue'

      case 'luminosity':
        return 'mix-blend-luminosity'

      case 'lighten':
        return 'mix-blend-lighten'

      case 'plus-lighter':
        return 'mix-blend-plus-lighter'

      case 'multiply':
        return 'mix-blend-multiply'

      case 'overlay':
        return 'mix-blend-overlay'

      case 'saturation':
        return 'mix-blend-saturation'

      case 'screen':
        return 'mix-blend-screen'

      case 'soft-light':
        return 'mix-blend-soft-light'

      default:
        return ''
    }
  }

  return (
    <div className='relative h-full'>
      <AnimatePresence>
        {blendMode.type && blendMode.color && <motion.div
          key={'dzBlendModeBackground'}
          initial={{
            opacity: 1,
          }}
          animate={{
            opacity: 1,
            transition: {
              type: "spring",
              stiffness: 260,
              damping: 23,
              duration: 0.1,
            }
          }}
          exit={{
            opacity: 1,
            transition: {
              duration: 0.1,
              type: "spring",
              stiffness: 260,
              damping: 30,
            }
          }}
          style={{
            backgroundColor: blendMode.color.hex,
          }}
          className={`${getBlendMode(blendMode.type.value)} mix absolute top-0 left-0 w-full h-full z-2 transition-all duration-200 `} />
        }
      </AnimatePresence>
      {/* <div
        style={{
          backgroundColor: blendMode.color?.hex,
        }}
        className={classNames(blendMode.type && blendMode.color ? `opacity-100 ${getBlendMode(blendMode.type.value)}` : 'opacity-0', 'mix absolute top-0 left-0 w-full h-full z-2 transition-all duration-200 ')} /> */}
      <div className={classNames(!touched && !loadedState ? 'opacity-0' : 'opacity-100',
        'w-full h-full z-1 transition-all ease-in-out duration-600 relative')}>
        <div
          className={classNames('absolute top-0 left-0 w-full h-full z-1')}
          style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: `${patternRange[0]}px`,
            height: '100%',
            width: '100%',
          }} />

      </div>
      <canvas
        id={'patternCanvas'}
        style={{
          display: 'none'
        }} ref={canvasRef}></canvas>
    </div>
  )
}

export default DzPattern
