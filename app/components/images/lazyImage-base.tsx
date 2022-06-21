import { checkForPx, checkWidthHeight } from '@App/utils/imageHelpers';
import React from 'react'
import type { ScrollPosition } from 'react-lazy-load-image-component';
import { LazyLoadImage } from 'react-lazy-load-image-component';

interface Props {
  image: ImageLookupReturn
  id: string | number
  scrollPosition?: ScrollPosition
  alt?: string
  reverse?: boolean
  testId?: string
  disableSrcSet?: boolean
  blur?: boolean
}

/**
 * @component - LazyImageBase
 * @tested - 5/30/2022
 * // TODO: UPDATE TEST TO INCLUDE SRCSet CCHECK
 */
function LazyImageBase(props: Props) {
  const { image, id, scrollPosition, alt, reverse, testId, disableSrcSet, blur = true } = props
  const { width, height } = checkWidthHeight(image.width, image.height)

  const imagePadding = reverse ? width / height : height / width

  return (
    <div
      data-testid='padding-bot'
      style={{ paddingBottom: `${imagePadding * 100}%` }} className={`relative flex-1`}>
      <div className='absolute w-full lazy-load-wrapper lazy-load-wrapper-block lazy-load-image-full'>
        <LazyLoadImage
          aria-label='Product Image'
          data-testid={testId ? testId : `lazy-load-image-${id}`}
          key={id}
          alt={alt ? alt : image.altTitle}
          effect={blur ? 'blur' : 'opacity'}
          srcSet={disableSrcSet ? '' : image.srcSet}
          sizes={image.sizes}
          placeholderSrc={image.placeholder}
          // Make sure to pass down the scrollPosition,
          // this will be used by the component to know
          // whether it must track the scroll position or not
          scrollPosition={scrollPosition}
          src={image.sourceUrl}
          height={`${checkForPx(image.height)}`}
          width={`${checkForPx(image.width)}`}
        />
      </div>
    </div>
  )
}

export default LazyImageBase
