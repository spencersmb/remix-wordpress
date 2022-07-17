import React from 'react'
import LazyImgix from './lazyImgix'

interface Props {
  imgixImage?: ImgixImageType
  children?: React.ReactNode
  rotate?: 'left' | 'right' | 'none'
}
/**
 * 
 * @component PolaroidImg
 * @tested - 07/17/2022 
 */
function PolaroidImg(props: Props) {
  const { imgixImage, children, rotate = 'none' } = props
  const spacing = 64
  function getRotation() {
    switch (rotate) {
      case 'left':
        return '-rotate-3'
      case 'right':
        return 'rotate-3'
      default:
        return 'rotate-0'
    }
  }

  return (
    <div data-testid="polaroid-container" className={`p-2 bg-white rounded-lg shadow-md ${getRotation()} tablet:p-3`}>

      {imgixImage &&
        <div>
          <LazyImgix
            id={'polaroidImg'} image={imgixImage} />
        </div>}

      <div className={`relative`}>
        <div className='pb-[18%]'>
          {children}
        </div>
      </div>
    </div>
  )
}

export default PolaroidImg
