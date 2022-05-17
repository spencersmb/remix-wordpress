import React from 'react'
import { LazyLoadImage, ScrollPosition } from 'react-lazy-load-image-component'

interface Props {
  image: IMediaDetailSize
  id: string | number
  scrollPosition?: ScrollPosition
  alt?: string
  reverse?: boolean
}

function LazyImageBase(props: Props) {
  const { image, id, scrollPosition, alt, reverse } = props
  console.log('image', image);

  const imagePadding = reverse ? parseInt(image.width, 10) / parseInt(image.height, 10) : parseInt(image.height, 10) / parseInt(image.width, 10)
  return (
    <div style={{ paddingBottom: `${imagePadding * 100}%` }} className={`relative flex-1`}>
      <div className='absolute w-full lazy-load-wrapper lazy-load-wrapper-block lazy-load-image-full'>
        <LazyLoadImage
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
          height={`${image.height}px`}
          width={`${image.width}px`}
        />
      </div>
    </div>
  )
}

export default LazyImageBase
