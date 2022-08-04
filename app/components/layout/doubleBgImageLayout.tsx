import { staticImages } from '@App/lib/imgix/data'
import React from 'react'
import TmSignupForm from '../forms/tuesdayMakers/tmSignupForm'
import BackgroundImage from '../images/backgroundImage'
import LazyImgix from '../images/lazyImgix'
import AccentHeaderText from './accentHeaderText'

interface Props { }

function DoubleBgImageLayout(props: Props) {
  const { } = props

  const signUpImageUrl = `https://et-website.imgix.net/et-website/images/tuesday-makers/tm-1_1.jpg`
  const signUpImage = {
    width: 1200,
    height: 1616,
    alt: `Every Tuesday Printed Cards`,
    src: `${signUpImageUrl}?auto=format&w=900&fit=clip`,
    placeholder: `${signUpImageUrl}?auto=format&w=20&fit=clip`
  }

  return (
    <div className='et-grid-basic grid-rows-[auto_minmax(60px,auto)auto_minmax(60px,auto)] relative tablet:grid-rows-[auto] tablet:gap-0'>

      {/* BG1 */}
      <div className='relative col-span-full h-[259px] bg-slate-500 row-start-1 row-span-2 z-0 tablet:col-start-1 tablet:col-span-8 tablet:row-span-1 tablet:row-start-1 tablet:h-auto laptop:col-start-1 laptop:col-span-9'>

        <BackgroundImage
          placeholder='https://et-website.imgix.net/et-website/images/tuesday-makers/tm-2_1.jpg?auto=format&w=100&fit=clip'
          source='https://et-website.imgix.net/et-website/images/tuesday-makers/tm-2_1.jpg?auto=format'
        />

      </div>

      {/* CONTENT */}
      <div className='relative col-span-2 col-start-2 row-span-2 row-start-2 bg-white z-1 shadow-et_2_lg tablet:row-start-1 tablet:row-span-1 tablet:col-start-7 tablet:col-span-6 tablet:my-16 laptop:my-16 laptop:max-w-[410px] laptop:col-start-8 laptop:col-span-6 desktop:my-20 desktop:col-start-8 desktop:col-span-5 desktopXl:col-span-4 desktopXl:col-start-8'>

        {/* PIN */}
        <div className='absolute top-[-23px] left-1/2 -translate-x-1/2 w-[65px]'>
          <LazyImgix
            id={'tmPin'}
            image={{
              alt: 'Tuesday Makers Silver Pin',
              ...staticImages.assets.pins.silver
            }}
          />
        </div>

        {/* SIGN UP */}
        <div className='flex flex-col items-center p-8'>
          <div className='text-4xl text-center font-sentinel__SemiBoldItal max-w-[200px] mx-auto mt-8 mb-8 relative laptop:text-5xl'>
            <AccentHeaderText text='Join' />
            Tuesday Makers
          </div>
          <p className='mb-8'>
            When you join the Tuesday Makers, you’ll receive special offers on courses + products and gain access to the Resource Library, stocked with hundres of design and lettering files!
          </p>
          <div className='w-full'>
            <TmSignupForm
              flexRow={false}
              formName={'tmFooter'}
              inputBg={'bg-sage-100 hover:ring-offset-cream-100 tablet:mb-4'} />
          </div>
        </div>
      </div>

      {/* BG2 */}
      <div className='relative z-0 row-span-2 row-start-3 overflow-hidden bg-red-300 col-span-full tablet:row-start-1 tablet:col-start-9 tablet:col-end-full tablet:row-span-1 tablet:h-auto laptop:col-start-10 laptop:col-end-full'>
        <BackgroundImage
          placeholder='https://et-website.imgix.net/et-website/images/tuesday-makers/tm-1_1.jpg?auto=format&w=100&fit=clip'
          source='https://et-website.imgix.net/et-website/images/tuesday-makers/tm-1_1.jpg?auto=format'
        />
      </div>

    </div>
  )
}

export default DoubleBgImageLayout
