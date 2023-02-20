import React, { useEffect } from 'react'
import usePatternPlayground, { starterBgUrl } from '../usePatternProvider';
import { classNames } from '@App/utils/appUtils';

function DzPattern() {

  const { state: { imageCache, backgroundImage, patternType, touched, patternRange }, setNewImage, canvasRef, setBackgroundImage, getBase64FromUrl } = usePatternPlayground()

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

  return (
    <div className='relative h-full'>
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
