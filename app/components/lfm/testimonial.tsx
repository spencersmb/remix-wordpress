import { classNames } from '@App/utils/appUtils'
import { getLfmTexture } from '@App/utils/lfmUtils'
import LazyImgix from '../images/lazyImgix'
import LfmArrowSvg from '../svgs/lfmArrowSvg'
import LfmBannerSvg from '../svgs/lfmBannerSvg'
import InstagramSvg from '../svgs/social/instagramSvg'

interface Props {
  testimonial: ITestimonial
  direction?: 'left' | 'right' | 'full'
  fontLoadingStatus: string
}
// TODO: TEST THIS
function LfmTestimonial(props: Props) {
  const { testimonial, direction = 'left', fontLoadingStatus } = props
  const selectedTexture = getLfmTexture(testimonial.texture)
  function directionCss(direction: 'left' | 'right' | 'full') {
    switch (direction) {
      case 'right':
        return 'col-span-full laptop:col-start-4 laptop:col-end-[-1]'
      case 'left':
        return 'col-span-full laptop:col-start-1 laptop:col-span-11'
      case 'full':
        return 'col-span-full'
    }
  }
  const makerCss = direction === 'right' ? 'laptop:col-start-8 laptop:col-span-6 desktop:col-start-8 desktop:col-span-5 ' : 'laptop:col-start-2 laptop:col-span-6 laptop:pl-0 desktop:col-start-3 desktop:col-span-5 desktop:mb-8'

  const fontContainerCss = direction === 'right' ? 'laptop:col-start-2 laptop:col-span-6' : 'laptop:col-start-7 laptop:col-span-7'

  const authorNameCss = direction === 'right' ? 'laptop:left-auto laptop:right-0' : 'laptop:left-0 laptop:right-auto'

  const fontArrowSvgCss = direction === 'right' ? 'laptop:right-[-40px] laptop:top-[35px] desktop:right-[0]' : 'laptop:right-auto laptop:left-[-55px] laptop:rotate-[320deg]'

  return (
    <>
      <div className="lfm-testimonial lfm-testimonial--alt et-grid-basic z-3 gap-x-0 grid-rows-[auto_minmax(50px,50px)_auto_auto] py-20 relative laptop:overflow-visible laptop:grid-rows-[auto]">

        <div
          className={classNames(directionCss(direction), 'row-span-3 row-start-1 lfm-testimonial__bg')}
          style={{ background: testimonial.backgroundColor }} />

        <div className={classNames(makerCss, 'relative col-span-2 col-start-2 row-start-1 pt-6 mx-auto lfm-testimonial__maker tablet:col-start-3 tablet:col-span-10 laptop:pt-6 laptop:px-6 laptop:pb-6 laptop:row-span-2 laptop:row-start-1 desktop:mb-8')}>

          <div className="lfm-testimonial__banner absolute top-0 left-1/2 w-full max-w-[290px] mx-auto -translate-y-1/2 -translate-x-1/2">
            <LfmBannerSvg />
          </div>

          <div className="flex flex-row items-center justify-center py-5 lfm-testimonial__avatar laptop:pt-10 laptop:pb-5">

            <div className="lfm-testimonial__avatar--img max-w-[72px] w-full mr-4 min-h-[72px] overflow-hidden rounded-full">
              <LazyImgix
                id={`${testimonial.instagramHandle} Instagram Profile`} image={{
                  width: 150,
                  height: 150,
                  alt: `${testimonial.instagramHandle} Instagram Profile`,
                  src: testimonial.profileImg,
                }} />
            </div>

            <div className="flex flex-col items-center lfm-testimonial__user">
              <p className='text-sm text-lfm-blue-700 font-sentinel__SemiBoldItal'>{testimonial.name.first} {testimonial.name.last}</p>
              <div className="flex flex-row items-center lfm-testimonial__instagram">
                <div className='w-5'>
                  <InstagramSvg fill='#8976ff' />
                </div>
                <p className='text-[#634bf9] ml-2'>{testimonial.instagramHandle}</p>
              </div>
            </div>
          </div>

          <blockquote className='text-lfm-blue-700 text-center font-sentinel__SemiBoldItal text-2xl max-w-[457px] mx-[-5px] mb-5 py-3 tablet:mx-auto tablet:mb-5 tablet:py-3 tablet:px-8 laptop:text-3xl laptop:max-w-none'>
            “{testimonial.pullQuote}”
          </blockquote>

          <p className='text-lg text-lfm-blue-700 desktop:text-xl'>{testimonial.quote}</p>
        </div>

        {/* FONT CARD - lfm-testimonial__font */}
        <div className={classNames(fontContainerCss, 'col-span-2 col-start-2 row-span-2 row-start-3 mt-20 lfm-testimonial__font tablet:mt-12 tablet:col-start-3 tablet:col-span-10 laptop:row-start-1 laptop:row-span-3 laptop:flex laptop:items-center')}>

          <div className="lfm-testimonial__fontHeroWrapper w-full relative max-w-[370px] mx-auto min-h-[254.25px] tablet:min-h-[255px] desktop:max-w-none desktop:min-h-[401.47px] desktop:w-full">

            <div className="lfm-testimonial__fontCreator relative z-3 w-full max-w-[557px] ml-auto desktop:max-w-[697px]">

              {fontLoadingStatus === 'completed' && <p className={classNames(authorNameCss, 'absolute left-[50px] top-[-70px] skinnyJeans text-2xl text-[#333F4F] rotate-[-5deg] mt-0 laptop:text-3xl')}>
                {testimonial.name.first}'s Font

                <span className={classNames(fontArrowSvgCss, 'absolute w-full max-w-[55px] right-[-55px] top-0 rotate-[55deg] laptop:top-9')}>
                  <LfmArrowSvg className={direction === 'right' ? '' : 'laptop:scale-x-[-1]'} />
                </span>
              </p>}

            </div>

            <div className="lfm-testimonial__fontHero z-3 relative rounded-2xl overflow-hidden rotate-[-3deg] shadow-2xl laptop:mx-0 laptop:ml-auto laptop:mt-0 desktop:max-w-[545px] desktop:mx-auto">
              <a
                href={testimonial.fontLink}
                target="_blank"
                rel="noopener noreferrer">
                <LazyImgix
                  id={`${testimonial.instagramHandle}-font`}
                  blur={false}
                  image={{
                    src: testimonial.img.retina,
                    alt: `${testimonial.name.first}'s Font`,
                    height: 700,
                    width: 1020,
                    placeholder: testimonial.img.mobile,
                  }}
                />
              </a>
            </div>

            <div className={`lfm-testimonial__watercolor ${selectedTexture.class} absolute w-[450px] top-[-120px] left-1/2 -translate-x-1/2 rotate-[105deg] z-1 laptop:rotate-[455deg] laptop:top-[-70px] laptop:left-[40%] desktop:left-1/2 desktop:w-[677px] desktop:top-[-140px]`}>
              <div className='w-full laptop:scale-x-[-1]'>
                <LazyImgix
                  blur={false}
                  id={`${testimonial.name.first}-texture`}
                  image={selectedTexture.image}
                />
              </div>
            </div>

            {/* TODO: add watercolor to AWS */}
            <div className="lfm-testimonial__scribble max-w-[200px] absolute bottom-[-70px] left-[140px] rotate-[120deg] z-2 min-h-[277.71px] w-full desktop:bottom-[-169px] desktop:w-[350px] desktop:rotate-[130deg] desktop:min-h-[503.25px] desktop:max-w-none desktop:left-[230px]">
              <LazyImgix
                id={`${testimonial.name.first}-scribble`}
                blur={false}
                image={{
                  src: 'https://every-tuesday.com/wp-content/themes/et2017_sage/assets/images/teachable/lfm/mini-course/stroke-02.png',
                  alt: "Every-Tuesday Scribble texture",
                  height: 301,
                  width: 288,
                }}
              />

            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default LfmTestimonial
