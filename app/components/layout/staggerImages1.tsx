import { staticImages } from '@App/lib/imgix/data'
import React from 'react'
import LazyImgix from '../images/lazyImgix'
import PolaroidImg from '../images/polaroidImg'

interface Props { }

// TODO: Add tests for this component
function StaggerImages1(props: Props) {
  const { } = props

  const headerImage = {
    src: 'https://et-website.imgix.net/et-website/images/teela-spencer-house-1.jpg',
    placeholder: 'https://et-website.imgix.net/et-website/images/teela-spencer-house-1.jpg?w=20&fit=clip',
    width: 806,
    height: 910,
    alt: 'Teela Spencer House',
  }

  return (
    <div className='my-8 overflow-hidden et-grid-basic laptop:my-0'>

      {/* STROKE 1 */}
      <div className='col-span-full tablet:col-start-5 tablet:col-span-9 laptop:col-start-9 laptop:col-span-5'>
        <div className='relative -right-20 tablet:right-0'>
          <LazyImgix id={'scribble 2'} image={{
            ...staticImages.scribbles.scribble_2,
            alt: 'scribble 2',
          }} />
        </div>
      </div>

      {/* QUOTE 1 */}
      <div className='col-span-2 col-start-2 tablet:col-start-5 tablet:col-span-6 laptop:col-start-2 laptop:col-span-4'>
        <h3 className='mb-4 text-2xl text-lfm-blue-700 font-sentinel__SemiBoldItal laptop:text-3xl'>
          In order for us to grow as designers, letterers and artists, consistent dedication to our craft is key
        </h3>
        <p className='text-lg'>
          This is where your Tuesdays come in. A little bit every week really adds up over the course of a year!!
        </p>
      </div>

      {/* IMG COLLECTION 1 */}
      <div className='col-span-2 col-start-2 tablet:col-start-5 tablet:col-span-6 laptop:row-start-2 laptop:row-span-2 laptop:col-start-6 laptop:col-span-4'>
        <div className='relative max-w-[180px] ml-10 mt-20 mb-36 tablet:max-w-[275px] laptop:mt-0 laptop:mx-5 desktop:max-w-[432px]'>

          {/* SMALL IMG 1 */}
          <div className='absolute top-[-50px] right-[-100px] max-w-[126px] w-full z-3 laptop:max-w-[180px] laptop:right-[-140px]'>
            <div className='p-2 bg-white rounded-lg rotate-3'>
              <LazyImgix id={'stagger-1'} image={headerImage} />
            </div>
          </div>

          {/* MAIN IMAGE */}
          <div className='relative z-2'>
            <PolaroidImg imgixImage={headerImage} rotate='left' />
          </div>

          {/* SMALL IMG 2 */}
          <div className='absolute top-[200px] left-[-40px] max-w-[126px] w-full z-1 tablet:max-w-[140px] tablet:top-[300px] tablet:left-[-100px] desktop:max-w-[200px] desktop:left-[-160px] desktop:top-[420px]'>
            <div className='p-2 bg-white rounded-lg rotate-3'>
              <LazyImgix id={'stagger-1'} image={headerImage} />
            </div>
          </div>

          {/* Scribble Bg Texture */}
          <div className='absolute top-0 left-[-40px] w-[420px] z-0 tablet:top-[170px] desktop:top-[330px] desktop:left-[-500px]'>
            <LazyImgix id={'stagger-1'} image={{
              ...staticImages.scribbles.scribble_6,
              alt: 'scribble 6',
            }} />
          </div>

        </div>
      </div>

      {/* QUOTE 2 */}
      <div className='col-span-2 col-start-2 mb-8 tablet:col-start-5 tablet:col-span-6 laptop:row-start-3 laptop:col-start-10 laptop:col-span-4'>
        <h3 className='mb-4 text-2xl text-primary-400 font-sentinel__SemiBoldItal desktop:text-3xl'>
          Life gets crazy. But, at the very least, we should be dedicating one day a week to pursue our side hustles.
        </h3>
        <p className='text-lg'>
          Every-Tuesday began as a way to hold myself accountable to maintain consistency with new blog posts every week.
        </p>
      </div>

      {/* IMG COLLECTION 2 */}
      <div className='col-span-2 col-start-2 tablet:col-start-5 tablet:col-span-6 laptop:col-start-8 laptop:col-span-5 laptop:row-start-4 desktop:col-start-7 desktop:col-span-6'>
        <div className='relative my-8 desktop:ml-16'>
          <div className='relative z-2 max-w-[217px] w-full mr-auto ml-3 tablet:ml-12 laptop:max-w-[257px] desktop:max-w-[432px]'>
            <PolaroidImg imgixImage={headerImage} rotate='right' />
          </div>
          <div className='absolute top-[-20px] max-w-[217px] w-full left-[129px] laptop:max-w-[257px] laptop:-[190px] desktop:max-w-[432px] desktop:left-[240px]'>
            <PolaroidImg imgixImage={headerImage} rotate='left' />
          </div>
        </div>
      </div>

      {/* QUOTE 3 */}
      <div className='col-span-2 col-start-2 tablet:col-start-5 tablet:col-span-6 laptop:col-start-3 laptop:col-span-5 laptop:row-start-4 laptop:self-center desktop:col-start-3 desktop:col-span-4'>
        <h3 className='mb-4 text-2xl text-lfm-blue-700 font-sentinel__SemiBoldItal desktop:text-3xl'>
          It’s the perfect day to exercise your creative muscles
        </h3>
        <p className='mb-8 text-lg'>
          As Every-Tuesday has grown and now extended into digital products and courses (and it’s still just my husband and I), the Every-Tuesday mission has evolved into a public weekly call to creative action.
        </p>
      </div>

      {/* END STROKE */}
      <div className='col-span-full tablet:col-start-5 tablet:col-span-9 laptop:col-start-2 laptop:col-span-6 laptop:row-start-5'>
        <div className='relative -left-20 tablet:right-0 laptop:left-[-200px]'>
          <LazyImgix id={'scribble 2'} image={{
            ...staticImages.scribbles.scribble_2,
            alt: 'scribble 2',
          }} />
        </div>
      </div>

    </div>
  )
}

export default StaggerImages1
