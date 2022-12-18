import { staticImages } from '@App/lib/imgix/data'
import { createImgixSizes } from '@App/utils/imageHelpers'
import React from 'react'
import LazyImgix from '../images/lazyImgix'
import SvgBlob1 from '../svgs/blobs/svgBlob-1'
import SvgBlob2 from '../svgs/blobs/svgBlob-2'
import FloralSvgOneBot from '../svgs/florals/floralSimeplBottomSvg'
import FloralSvgOneTop from '../svgs/florals/floralSimpleTopSvg'

interface Props { }

function YourInstructor(props: Props) {
  const { } = props

  const authorImg = createImgixSizes({
    width: 800,
    height: 860,
    alt: `Every Tuesday: Teelas profile picture`,
    src: staticImages.profiles.teela.square.src,
    mobileSize: 600,
  })

  const iPadImage = createImgixSizes({
    compress: true,
    height: 1049,
    width: 1400,
    alt: "Every Tuesday Makers Library",
    mobileSize: 400,
    src: 'https://et-website.imgix.net/et-website/images/footer-ipad-image_1.jpg'
  })

  const iPadDevice = createImgixSizes({
    width: 1000,
    height: 733,
    src: staticImages.assets.ipad.flat.src,
    alt: 'iPad Device',
    mobileSize: 400
  })

  return (
    <div className='relative py-8 pt-16 overflow-hidden et-grid-basic tablet:py-16 laptop:py-28'>

      {/* PROFILE IMAGE */}
      <div className='items-center col-span-2 col-start-2 pb-2 tablet:col-start-2 tablet:col-span-5 tablet:row-span-3 tablet:justify-center tablet:flex laptop:items-start laptop:row-start-1'>
        <div className='relative w-[200px] h-[200px] mx-auto tablet:w-[250px] tablet:h-[250px] desktop:w-[300px] desktop:h-[300px]'>
          <div className='relative w-full h-full overflow-hidden rounded-full z-2'>
            <LazyImgix
              id={'polaroidImg'}
              image={authorImg.image}
            />
          </div>

          <div className='absolute top-0 left-[-110px] w-[200px] rotate-[45deg] z-1 tablet:rotate-[15deg] tablet:w-[290px] tablet:top-[40px] tablet:left-[-121px]'>
            <FloralSvgOneTop />
          </div>

          <div className='absolute top-[-50px] left-[82px] w-[150px] z-1 rotate-[-153deg] tablet:w-[200px] tablet:left-[102px] tablet:top-[-70px]'>
            <FloralSvgOneTop />
          </div>

        </div>
      </div>

      {/* HEY TEELA */}
      <div className="col-span-2 col-start-2 pb-10 text-center tablet:col-start-8 tablet:col-span-7 tablet:-ml-8 tablet:mr-16 laptop:text-left laptop:mt-20 laptop:col-start-7 laptop:row-start-1 z-2 desktop:ml-8 desktop:col-start-6 desktop:pb-0 desktopXl:mt-32">
        <h2 className='text-4xl font-bonVivant tablet:text-5xl'>Hey, I'm Teela!</h2>
      </div>

      {/* HEADLINE */}
      <div className="col-span-2 col-start-2 pb-4 text-center tablet:col-start-8 tablet:col-span-7 tablet:ml-0 tablet:mr-16 laptop:text-left laptop:col-start-6 laptop:col-span-5 laptop:mt-8 laptop:row-start-3 z-2 desktop:col-start-6 desktop:ml-0 desktop:col-span-4 desktop:mr-0 desktopXl:mt-0">
        <p className='text-2xl font-semibold'>
          Download hundreds of free procreate assets and start creating today.
        </p>
      </div>

      {/* TEXT */}
      <div className="col-span-2 col-start-2 pb-8 text-center tablet:col-start-8 tablet:col-span-7 tablet:-ml-8 tablet:mr-16 tablet:pb-0 laptop:text-left laptop:col-start-7 laptop:col-span-5 laptop:row-start-4 z-2 desktop:col-start-6 desktop:col-span-4 desktop:ml-8 desktop:mr-0">
        <p>
          You’re the first to nab special deals on courses + products *and* you get instant access to our Resource Library, stocked with over 500 design and lettering files!
        </p>
      </div>

      {/* IPAD */}
      <div className='hidden col-span-4 col-start-10 row-span-5 row-start-1 z-1 laptop:block'>

        <div className="absolute w-full max-w-[400px] z-20 rotate-6 desktop:max-w-[600px]">

          {/* IPAD ART */}
          <div className="absolute top-[-2.8%] left-[-2.7%] scale-[.81] w-full overflow-hidden rounded-md tablet:rounded-xl art z-20">
            <LazyImgix
              id={'ipadImage'}
              image={iPadImage.image}
              sizes="(max-width: 666px) 40vw, (max-width: 1023px) 60vw, (max-width: 1399px) 40vw, 1400px"
              srcSet={
                `
              ${iPadImage.defaultSrc}&w=500&fit=clip 500w,
              ${iPadImage.defaultSrc}&w=900&fit=clip 900w,
              ${iPadImage.defaultSrc}&w=1200&fit=clip 1200w,
              `}
            />
          </div>

          {/* IPAD DEVICE */}
          <div className="relative z-10 ipad">
            <LazyImgix
              id={'iPadFeature'}
              image={iPadDevice.image}
              sizes="(max-width: 666px) 40vw, (max-width: 1023px) 60vw, (max-width: 1399px) 40vw, 1400px"
              srcSet={
                `
            ${iPadDevice.defaultSrc}&w=500&fit=clip 500w,
            ${iPadDevice.defaultSrc}&w=900&fit=clip 900w,
            ${iPadDevice.defaultSrc}&w=1200&fit=clip 1200w,
            `}
            />
          </div>

          <div className='absolute w-[470px] top-[-130px] left-[-90px]'>
            <SvgBlob2 fill={'var(--tangerine-100)'} />

            <div className='absolute bottom-[-60px] rotate-[-80deg] w-[250px] right-[-90px]'>
              <SvgBlob1 fill={'#F4A78C'} />
            </div>

          </div>

        </div>
      </div>

      {/* BLOB1 */}
      <div className='hidden absolute bottom-[-150px] left-[10%] w-[300px] laptop:block'>
        <SvgBlob1 fill={'#F4A78C'} />
      </div>
    </div>
  )
}

export default YourInstructor
