import React from 'react'
import LazyImgix from './lazyImgix'

interface Props {
  imgixImage?: ImgixImageType
  imgOptions?: {
    sizes: string
    srcSet: string
  }
  children?: React.ReactNode
  rotate?: 'left' | 'right' | 'none'
}
/**
 * 
 * @component PolaroidImg
 * @tested - 07/17/2022 
 */

// TODO:TEST FOR IMG OPTIONS
function PolaroidImg(props: Props) {
  const { imgixImage, children, imgOptions, rotate = 'none' } = props
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
    <div data-testid="polaroid-container" className={`p-3 bg-white shadow-md ${getRotation()} tablet:p-3 laptop:p-4`}>

      {imgixImage &&
        <div>
          <LazyImgix
            id={'polaroidImg'}
            image={imgixImage}
            sizes={imgOptions ? imgOptions.sizes : ''}
            srcSet={imgOptions ? imgOptions.srcSet : ''}
          />
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
