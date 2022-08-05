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

        <div className='text-5xl italic absolute top-[-20px] left-[5px] z-1 tablet:text-3xl laptop:text-5xl laptop:left-[15px]'>
          0{index + 1}
        </div>

        <LazyImgix
          id='tm-rl-1'
          image={img.obj}
          sizes="(max-width: 400px) 150px, 300px, (max-width: 600px) 50vw, (max-width: 900px) 33vw, 900px"
          srcSet={`
                ${img.obj.src} 400w,
                ${img.url}?auto=format&w=1400&fit=clip 900w,
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