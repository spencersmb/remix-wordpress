import { classNames } from "@App/utils/appUtils"
import LazyImgix from "../images/lazyImgix"

interface TextImageProps {
  index: number
  img: {
    obj: ImgixImageType
    url: string
  }
  title: string
  description: string
}

/**
 * 
 * @function TextImageTall 
 * @tested 08/04/2022 
 */
const TextImageTall = (props: TextImageProps) => {
  const { index, img, title, description } = props
  return (
    <div data-testid="textImageTall" className={classNames(index === 1 ? 'tablet:mt-0' : 'tablet:mt-12', 'mb-16 last:mb-0 tablet:mx-4 tablet:mb-0 desktop:mx-7')}>

      {/* IMAGE */}
      <div className='relative'>

        <div className='text-[5.5rem] leading-[1px] italic absolute top-[-20px] left-[25px] z-1 tablet:text-6xl tablet:top-[-42px] laptop:text-7xl laptop:top-[-52px] font-bonVivant'>
          0{index + 1}
        </div>

        {/* https://stackoverflow.com/a/51345189/5794430 */}
        <LazyImgix
          id='tm-rl-1'
          image={img.obj}
          sizes="(max-width: 666px) 100vw, (max-width: 1399px) 38vw, 535px"
          srcSet={`
          ${img.url}?auto=format&w=400&fit=clip 400w,
          ${img.url}?auto=format&w=500&fit=clip 500w,
          ${img.url}?auto=format&w=768&fit=clip 768w,
          `}
        />
      </div>

      <div className='my-4 text-center tablet:mx-4'>
        <div className='mb-4 text-3xl font-sentinel__SemiBoldItal tablet:text-xl tablet:leading-7 laptop:text-3xl laptop:mx-4'>
          {title}
        </div>
        <p className='text-lg tablet:text-base laptop:text-lg'>
          {description}
        </p>
      </div>

    </div>
  )
}

export default TextImageTall