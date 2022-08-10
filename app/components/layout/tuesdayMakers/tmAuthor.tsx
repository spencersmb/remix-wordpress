import LazyImgix from '@App/components/images/lazyImgix'
import PolaroidImg from '@App/components/images/polaroidImg'
import EucalyptusSvg from '@App/components/svgs/eucalyptusSvg'
import { staticImages } from '@App/lib/imgix/data'
import { createImgixSizes } from '@App/utils/imageHelpers'
import React from 'react'

interface Props { }

/**
 * 
 * @function TmAuthor 
 * @tested 08/05/2022 
 */
function TmAuthor(props: Props) {


  const authorImg = createImgixSizes({
    width: 800,
    height: 860,
    alt: `Every Tuesday: Teelas profile picture`,
    src: staticImages.profiles.teela.square.src,
    mobileSize: 600,
  })

  return (
    <div className='relative my-10 et-grid-basic tablet:mt-20 tablet:mb-40'>

      {/* MAIN CONTENT */}
      <div className='relative col-span-2 col-start-2 mb-12 mt-[23rem] tablet:mt-0 tablet:mb-0 tablet:col-start-5 tablet:col-span-8 tablet:row-start-1 laptop:col-start-6 laptop:col-span-7 z-1 laptop:max-w-[780px] laptop:ml-auto desktop:mr-10'>

        <div className='relative p-8 pt-12 bg-white tablet:pl-32 laptop:py-16 laptop:pr-20 desktop:pr-32 z-1'>

          {/* PROFILE IMG */}
          <div className='absolute top-[-350px] -translate-x-1/2 z-1 left-1/2 w-[300px] tablet:top-[-30px] tablet:left-[-70px] laptop:w-[418px] laptop:left-[-130px] laptop:top-[60px]'>

            <div className='absolute left-[45%] -translate-x-1/2 top-[-50px] z-2 w-full max-w-[100px]'>
              <LazyImgix
                id={'black-pin'}
                image={{
                  ...staticImages.assets.pins.black_1,
                  alt: 'Black Pin'
                }}
              />
            </div>

            <PolaroidImg
              rotate='left'
              imgixImage={authorImg.image}
              imgOptions={
                {
                  sizes: "(max-width: 666px) 60vw, (max-width: 1399px) 38vw, 535px",
                  srcSet: `
                ${authorImg.defaultSrc}&w=600&fit=clip&auto=compress 600w,
                ${authorImg.defaultSrc}&w=800&fit=clip&auto=compress 800w,
              `
                }
              }
            />
          </div>

          <p className='mb-4 text-4xl font-sentinel__SemiBoldItal laptop:text-5xl desktop:text-6xl laptop:mb-8'>
            Hey, I’m Teela!
          </p>
          <p className='mb-4 text-xl laptop:text-2xl laptop:mb-8'>
            Artist, Designer, and Teacher for Creatives
          </p>
          <p data-testid="desc" className='text-lg laptop:text-xl'>
            If you’re familiar with Every Tuesday, then you know my love for lettering, design and illustration runs deep. In fact, in the last 7 years, I’ve taught over 200,000 students and my tutorials on YouTube have accumulated over 20 million views.
          </p>
        </div>

        {/* SVG LRG */}
        <div className='absolute hidden tablet:block w-[640px] z-0 left-[-620px] top-[-190px] rotate-[-15deg]'>
          <EucalyptusSvg fill='#fff' />
        </div>

        {/* SVG SMALL */}
        <div className='absolute hidden tablet:block w-[300px] z-0 right-[-120px] bottom-[-150px] rotate-[15deg]'>
          <EucalyptusSvg fill='#fff' />
        </div>

      </div>


    </div>
  )
}

export default TmAuthor
