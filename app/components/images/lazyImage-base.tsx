import React from 'react'
import type { ScrollPosition } from 'react-lazy-load-image-component';
import { LazyLoadImage } from 'react-lazy-load-image-component'

interface Props {
  image: IMediaDetailSize
  id: string | number
  scrollPosition?: ScrollPosition
  alt?: string
  reverse?: boolean
  testId?: string
}
const checkForPx = (value: string | number) => {
  let convertedValue = typeof value === 'number' ? value.toString() : value

  if (convertedValue.indexOf('px') !== -1) {
    return value
  } else {
    return `${value}px`
  }
}
function LazyImageBase(props: Props) {
  const { image, id, scrollPosition, alt, reverse, testId } = props


  const imagePadding = reverse ? parseInt(image.width, 10) / parseInt(image.height, 10) : parseInt(image.height, 10) / parseInt(image.width, 10)
  return (
    <div style={{ paddingBottom: `${imagePadding * 100}%` }} className={`relative flex-1`}>
      <div className='absolute w-full lazy-load-wrapper lazy-load-wrapper-block lazy-load-image-full'>
        <LazyLoadImage
          data-testid={testId ? testId : `lazy-load-image-${id}`}
          key={id}
          alt={alt ? alt : image.altTitle}
          effect="blur"
          srcSet={image.srcSet}
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
