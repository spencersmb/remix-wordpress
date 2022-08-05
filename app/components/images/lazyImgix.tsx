import { classNames } from "@App/utils/appUtils";
import { checkForPx, checkWidthHeight } from "@App/utils/imageHelpers"
import { useState } from "react";
import type { ScrollPosition } from "react-lazy-load-image-component";
import { LazyLoadImage } from "react-lazy-load-image-component"

interface Props {
  id: string | number
  image: {
    width: number
    height: number
    alt: string
    src: string
    placeholder?: string
  }
  srcSet?: string
  testId?: string
  scrollPosition?: ScrollPosition
  blur?: boolean
  visibleByDefault?: boolean
  sizes?: string
}

/**
 * 
 * @component LazyImgix
 * @tested - 8/4/2022
 * 
 */
function LazyImgix(props: Props) {
  const { image, id, scrollPosition, testId, srcSet, sizes, blur = true, visibleByDefault = false } = props
  const { width, height } = checkWidthHeight(image.width, image.height)

  const imagePadding = height / width
  const [loaded, setLoaded] = useState(false)
  return (
    <div
      data-testid='imigx-padding-bot'
      style={{ paddingBottom: `${imagePadding * 100}%` }} className={`relative flex-1`}>
      <div
        data-testid={'imigx-container'}
        className={classNames(
          !blur && !loaded
            ? 'opacity-0'
            : !blur && loaded ? 'opacity-1' : '', 'absolute w-full lazy-load-wrapper lazy-load-wrapper-block lazy-load-image-full transition-all duration-300')}>
        <LazyLoadImage
          afterLoad={() => {
            setLoaded(true)
          }}
          aria-label='Image'
          data-testid={testId ? testId : `lazy-load-image-${id}`}
          key={id}
          alt={image.alt ? image.alt : 'Every Tuesday Image'}
          effect={blur ? 'blur' : 'opacity'}
          srcSet={srcSet ? srcSet : ''}
          placeholderSrc={image.placeholder ? image.placeholder : undefined}
          sizes={sizes ? sizes : undefined}
          // Make sure to pass down the scrollPosition,
          // this will be used by the component to know
          // whether it must track the scroll position or not
          scrollPosition={scrollPosition ? scrollPosition : undefined}
          src={image.src}
          height={`${checkForPx(image.height)}`}
          width={`${checkForPx(image.width)}`}
          visibleByDefault={visibleByDefault}
        />
      </div>
    </div>
  )
}

export default LazyImgix