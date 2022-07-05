import { checkForPx, checkWidthHeight } from "@App/utils/imageHelpers"
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
  vertical?: boolean
  testId?: string
  scrollPosition?: ScrollPosition
  blur?: boolean
}
//TODO: Test this
function LazyImgix(props: Props) {
  const { image, id, scrollPosition, vertical, testId, srcSet, blur = true } = props
  const { width, height } = checkWidthHeight(image.width, image.height)

  const imagePadding = vertical ? width / height : height / width

  return (
    <div
      data-testid='padding-bot'
      style={{ paddingBottom: `${imagePadding * 100}%` }} className={`relative flex-1`}>
      <div className='absolute w-full lazy-load-wrapper lazy-load-wrapper-block lazy-load-image-full'>
        <LazyLoadImage
          aria-label='Image'
          data-testid={testId ? testId : `lazy-load-image-${id}`}
          key={id}
          alt={image.alt ? image.alt : 'Every Tuesday Image'}
          effect={blur ? 'blur' : 'opacity'}
          srcSet={srcSet ? srcSet : ''}
          placeholderSrc={image.placeholder ? image.placeholder : ''}
          // Make sure to pass down the scrollPosition,
          // this will be used by the component to know
          // whether it must track the scroll position or not
          scrollPosition={scrollPosition}
          src={image.src}
          height={`${checkForPx(image.height)}`}
          width={`${checkForPx(image.width)}`}
        />
      </div>
    </div>
  )
}

export default LazyImgix