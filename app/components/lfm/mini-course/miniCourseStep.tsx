import LazyImgix from '@App/components/images/lazyImgix'
import useSite from '@App/hooks/useSite'
import { breakpointConvertPX, classNames } from '@App/utils/appUtils'
import { lfmImgRoot } from '@App/utils/lfmUtils'

interface Props {
  stepModule: {
    step: string
    title: string
    description: string
    image: {
      desktop: string,
      mobile: string,
      alt: string
    }

  }
}

function MiniCourseStep(props: Props) {
  const { stepModule } = props
  const { state: { breakpoint } } = useSite()

  const imageClassName = 'relative shadow-et_2_lg z-3 w-full'
  const isStep2 = stepModule.step === 'Video 2'
  const bgClass = isStep2
    ? 'left-auto top-[-30px] right-[-30px] h-[210px] tablet:left-auto tablet:top-[-40px] tablet:right-[-30px] tablet:w-[320px] laptop:h-[360px] laptop:top-[-43px] desktop:w-[546px]'
    : 'top-[30px] left-[-30px] h-full desktop:w-[311px]'
  const descClass = isStep2 ? 'tablet:col-start-2 tablet:col-span-6 laptop:col-start-3 laptop:col-span-5' : 'tablet:col-start-8 tablet:col-span-6 laptop:col-start-8 laptop:col-span-5'

  const imgCss = isStep2 ? 'tablet:row-start-2 tablet:col-start-8 tablet:col-span-6' : 'tablet:col-start-2 tablet:col-span-6 tablet:row-start-2 '

  return (
    <div className={classNames(isStep2 ? 'laptop:mt-28 ' : '', 'relative items-center miniCourse-vids__courseVideo et-grid-basic col-span-full gap-y-7 tablet:mt-8 laptop:mt-20')}>

      <div className={classNames(imgCss, 'miniCourse-vids__courseVideo--img min-h-[240px] z-2 relative col-start-2 col-span-2 tablet:min-h-[214.59px] laptop:min-h-[316px] desktop:min-h-[377.31px]')}>

        {breakpointConvertPX(breakpoint) >= 768 &&
          <div className={imageClassName}>
            <LazyImgix
              blur={false}
              id={`${stepModule.step}-image`}
              image={
                {
                  src: stepModule.image.desktop,
                  alt: stepModule.image.alt,
                  width: 1000,
                  height: 645,
                }
              }
            />
          </div>
        }

        {breakpointConvertPX(breakpoint) < 768 &&
          <div className={imageClassName}>
            <LazyImgix
              blur={false}
              id={`${stepModule.step}-image`}
              image={
                {
                  src: stepModule.image.mobile,
                  alt: stepModule.image.alt,
                  width: 280,
                  height: 181,
                }
              }
            />
          </div>
        }

        {isStep2 && <div className="miniCourse-vids__courseVideo--watercolor absolute z-2 top-[50px] right-[-150px] left-auto w-[300px] laptop:w-[600px] laptop:left-auto laptop:right-[-240px] laptop:top-[180px] laptop:rotate-[-15deg]">
          <LazyImgix
            blur={false}
            id={`${stepModule.step}-image`}
            image={{
              src: `${lfmImgRoot.aws}/textures/watercolor-03.png`,
              width: 800,
              height: 819,
              alt: 'Watercolor Texture',
            }}
          />
        </div>}
        <div
          className={classNames(bgClass, 'miniCourse-vids__courseVideo--imgBg bg-lfm-pink-200 absolute z-1 w-[225px] laptop:top-[40px]')} />

      </div>
      <div className={classNames(descClass, 'relative col-span-2 col-start-2 row-start-2 mt-4 mb-8 miniCourse-vids__courseVideo--desc z-3 tablet:mx-2')}>
        <span className='block my-3 italic text-lfm-blue-700 font-sentinel__SemiBoldItal desktop:text-lg'>{stepModule.step}</span>
        <p className='mb-3 text-3xl text-lfm-blue-700 font-sentinel__SemiBoldItal laptop:text-4xl desktop:text-5xl'>{stepModule.title}</p>
        <p className='max-w-[625px] laptop:text-lg desktop:text-xl'>{stepModule.description}</p>
      </div>
    </div>
  )
}

export default MiniCourseStep
