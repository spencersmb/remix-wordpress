import React from 'react'
import LazyImageBase from './lazyImage-base'
import LazyImgix from './lazyImgix'

interface Props {
  imgixImage?: ImgixImageType
  wpImage?: ImageLookupReturn
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
 * @tested - 08/05/2022 
 */

function PolaroidImg(props: Props) {
  const { wpImage, imgixImage, children, imgOptions, rotate = 'none' } = props
  const rotateClass = rotate === 'left'
    ? '-rotate-3'
    : rotate === 'right'
      ? 'rotate-3'
      : 'rotate-0'
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
    <div data-testid="polaroid-container" className={`p-3 bg-white shadow-md ${rotateClass} tablet:p-3 laptop:p-4`}>

      {imgixImage &&
        <div>
          <LazyImgix
            visibleByDefault={true}
            id={'polaroidImg'}
            image={imgixImage}
            sizes={imgOptions ? imgOptions.sizes : ''}
            srcSet={imgOptions ? imgOptions.srcSet : ''}
          />
        </div>}

      {wpImage && <div>
        <LazyImageBase
          disableSrcSet={true}
          visibleByDefault={true}
          testId='feature-image'
          id={'polaroidImg'}
          image={wpImage} />
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
