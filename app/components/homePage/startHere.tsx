import { staticImages } from '@App/lib/imgix/data'
import LazyImgix from '../images/lazyImgix'
import AccentHeaderText from '../layout/accentHeaderText'
import LazyLoadVideo from '../video/lazyLoadVideo'


// TODO: TEST THIS
export default function StartHere() {
  return (
    <section className='relative flex bg-grey-200 tablet:p-0 et-grid-basic'>

      {/* BG VIDEO */}
      <div className='absolute top-0 left-1/2 -translate-x-1/2 h-[400px] w-[730px] overflow-hidden tablet:h-full tablet:w-full tablet:left-auto tablet:translate-x-0 tablet:relative tablet:col-start-1 tablet:col-end-full tablet:row-start-1'>
        <div className='relative block w-full h-full p-0 overflow-hidden'>
          <div className='relative h-full'>
            {process.env.NODE_ENV !== 'test' && <LazyLoadVideo
              className='h-full video-objectFit'
              video={'https://static.showit.co/file/E0ybNlpeQ8qUB00gPpkPEg/124817/bonnie_b_roll_1_-_web.mp4'} />}
            {process.env.NODE_ENV === 'test' && <video
              data-testid='lazyLoadVideo'
              className={'opacity-100 transition-opacity duration-600 ease-in-out delay-300'}
              autoPlay={true}
              muted={true}
              loop
              playsInline
            >
              <source data-src={'https://static.showit.co/file/E0ybNlpeQ8qUB00gPpkPEg/124817/bonnie_b_roll_1_-_web.mp4'} type="video/mp4" />
            </video>}
          </div>
        </div>
      </div>

      {/* CARD CONTENT */}
      <div className='relative flex flex-col col-span-2 col-start-2 gap-6 p-6 mb-8 text-center bg-white pt-28 z-2 mt-60 tablet:col-start-4 tablet:col-span-8 tablet:row-start-1 tablet:my-16 tablet:self-center laptop:col-start-8 laptop:col-span-5 max-w-[433px] mx-auto laptop:items-center' >

        {/* PIN */}
        <div className='absolute top-[-23px] left-1/2 -translate-x-1/2 w-[65px]'>
          <LazyImgix
            id={'tm-pin'}
            image={{
              alt: 'Tuesday Makers Silver Pin',
              width: staticImages.assets.pins.silver.width,
              height: staticImages.assets.pins.silver.height,
              src: staticImages.assets.pins.silver.src,
              placeholder: staticImages.assets.pins.silver.placeholder,
            }}
          />
        </div>

        {/* TITLE */}
        <div className='max-w-[250px] mx-auto relative text-5xl font-sentinel__SemiBoldItal text-sage-600'>
          <AccentHeaderText text='Start Here!' cssOverride='text-4xl text-grey-800' />
          New to Procreate?
        </div>

        {/* SUBTEXT */}
        <p className='text-lg font-semibold leading-7'>
          Take the ultimate beginner’s course for beautiful Procreate 5X artwork.
        </p>

        {/* DESCRIPTION */}
        <p data-testid={'desc'}>
          We take a slower pace and go through everything in detail. After lessons describing tools or methods, we follow them right afterwards with a project to hit everything home.
        </p>

        {/* LINK */}
        <a
          target={'_blank'}
          href={'https://learn.every-tuesday.com/procreate-for-beginners'} className='mt-3 btn btn-primary btn-xl' rel="noreferrer">
          Start Here
        </a>
      </div>

    </section>
  )
}
