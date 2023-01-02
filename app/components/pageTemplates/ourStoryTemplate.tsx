import useSite from '@App/hooks/useSite'
import { staticImages } from '@App/lib/imgix/data'
import { breakpointConvertPX } from '@App/utils/appUtils'
import { createImgixSizes } from '@App/utils/imageHelpers'
import { navStyles } from '@App/utils/pageUtils'
import React from 'react'
import LazyImgix from '../images/lazyImgix'
import PolaroidImg from '../images/polaroidImg'
import ImageTextHeader1 from '../layout/imageTextHeader1'
import StaggerImages1 from '../layout/staggerImages1'
import FloralsBorderSvg3 from '../svgs/florals/floralsBorderSvg-3'

interface Props { }

function OurStoryTemplate(props: Props) {

  const { state: { breakpoint } } = useSite()

  const headerImage = {
    src: 'https://et-website.imgix.net/et-website/images/teela-spencer-house-1.jpg',
    placeholder: 'https://et-website.imgix.net/et-website/images/teela-spencer-house-1.jpg?w=20&fit=clip',
    width: 806,
    height: 910,
    alt: 'Teela Spencer House',
  }
  const wideImageLarge = {
    src: 'https://et-website.imgix.net/et-website/images/about-bg-wide.jpg',
    placeholder: 'https://et-website.imgix.net/et-website/images/about-bg-wide.jpg?w=20&fit=clip',
    width: 2234,
    height: 822,
    alt: 'Teela Spencer House',
  }
  const wideImageMobile = {
    src: 'https://et-website.imgix.net/et-website/images/about-bg-wide.jpg?w=768&fit=clip',
    placeholder: 'https://et-website.imgix.net/et-website/images/about-bg-wide.jpg?w=20&fit=clip',
    width: 768,
    height: 283,
    alt: 'Teela Spencer House',
  }
  const babyImage = {
    src: 'https://et-website.imgix.net/et-website/images/baby-photo-1.jpg',
    placeholder: 'https://et-website.imgix.net/et-website/images/baby-photo-1.jpg?w=20&fit=clip',
    width: 1274,
    height: 898,
    alt: 'Tuesday\'s birthday photos',
  }


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
    <>
      {/* <ImageTextHeader1 imgixImage={headerImage} />
      <StaggerImages1 /> */}
      <section className={`relative et-grid-basic bg-emerald-700 ${navStyles}`}>

        <div className='absolute top-0 left-1/2 -translate-x-1/2 w-[610px] laptop:top-[-20px] laptop:w-[900px] desktopXl:w-[1290px] desktopXl:top-[-100px]'>
          <FloralsBorderSvg3 />
        </div>

        {/* IPAD */}
        <div className='relative tablet:col-span-6 tablet:col-start-8 z-1 desktop:col-start-9 desktop:col-span-5 desktopXl:col-start-9 desktopXl:col-span-5'>
          <div className="absolute w-screen z-20 top-[360px] left-[0px] tablet:top-[140px] tablet:left-[70px] tablet:max-w-[566px] tablet:block laptop:left-[30px] laptop:top-[140px] desktop:max-w-[790px] desktopXl:top-[120px] desktopXl:max-w-[1020px]">

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

          </div>
        </div>

        {/* TITLE */}
        <h1 className='col-span-2 col-start-2 mb-4 text-4xl mt-28 font-sentinel__SemiBoldItal text-tangerine-50 tablet:col-start-3 tablet:col-span-7 tablet:text-5xl tablet:max-w-[390px] laptop:mt-44 desktop:text-7xl desktop:ml-16 desktop:col-start-2 desktop:col-span-7 desktopXl:col-start-3 desktopXl:col-span-7 desktop:max-w-[590px] desktopXl:mt-56 desktopXl:ml-0' >
          Tuesdays just got a little bit better
        </h1>

        {/* CONTENT */}
        <p className='col-span-2 col-start-2 pb-20 text-tangerine-50 tablet:pb-10 tablet:col-start-3 tablet:col-span-6 laptop:col-start-3 laptop:col-span-5 laptop:pb-20 desktop:col-start-4 desktop:col-span-5 desktop:text-lg desktop:mt-8 desktopXl:col-start-4 desktopXl:col-span-5desktopXl:pb-28 desktopXl:text-xl'>
          Every-Tuesday is an education resource for ambitious graphic designers and hand letterers. Why ambitious? Because if you’re someone who’s ready to take action and are willing to put in the work to get there, *you* are my kind of person.
        </p>

      </section>

      <section className="et-grid-basic">

        {/* TITLE */}
        <div className="flex flex-col col-span-2 col-start-2 mb-8 text-left text-gray-700 mt-52 tablet:col-start-3 tablet:col-span-7 tablet:mt-8 laptop:col-start-3 laptop:col-span-9 laptop:mb-16 laptop:mt-16 desktop:col-start-3 desktop:col-span-8 desktopXl:col-start-3 desktopXl:col-span-6">
          <h4 className="mb-4 text-4xl font-sentinel__SemiBoldItal tablet:text-5xl laptop:text-6xl desktop:text-7xl">
            Consistent dedication
          </h4>

          <p className='text-2xl font-medium'>
            In order for us to grow as designers, letterers and artists, consistent dedication to our craft is key
          </p>
        </div>

        {/* INTRO TEXT */}
        <div className="col-span-2 col-start-2 mb-8 tablet:col-start-3 tablet:col-span-10 laptop:col-start-3 laptop:col-span-10 desktop:col-start-4 desktop:col-span-8 desktop:mx-16 laptop:mb-16">

          <h5 className="mb-4 text-2xl font-sentinel__SemiBoldItal desktop:text-3xl">
            Every Tuesday
          </h5>

          <div className="text-lg gap-y-6 tablet:gap-x-8 tablet:gap-y-0 tablet:[&>p]:mb-6 grid tablet:grid-cols-2 tablet:grid-rows-[auto_auto_auto_1fr]">

            <p className="tablet:col-start-1 tablet:row-start-1">
              Every-Tuesday began as a way to hold myself accountable to maintain consistency with new blog posts every week. As Every-Tuesday has grown and now extended into digital products and courses (and I have still remained one person), the Every-Tuesday mission has evolved into a public weekly call to creative action.
            </p>

            <p className="tablet:col-start-1 tablet:row-start-2 tablet:row-span-3">
              Over the next 6 years, I worked as a designer at a startup children’s gaming company, a boutique home furnishings business and a design studio in Atlanta, GA. While at the studio, I had the pleasure of working on many large projects with Coca-Cola, Visa, the winter and summer Olympic Games and many wonderful small businesses.</p>

            <p className='tablet:col-start-2 tablet:row-start-1 tablet:row-span-3'>
              That’s where your Tuesdays come in – by Tuesday, you’ve gotten over the pain of Monday and are feeling the most motivated within the week. It’s the perfect day to exercise your creative muscles by clicking into Illustrator or grabbing that set of watercolors that has been staring you down A little bit every week really adds up over the course of a year!!</p>

            <p className='font-medium tablet:col-start-2 tablet:row-start-4'>
              Join me in making a promise that whether we’re posting our work publicly or not, progress is still being made every week, or…you know, every Tuesday
            </p>
          </div>


        </div>

      </section>

      <section className="et-grid-basic">

        {/* IPAD */}
        <div className='relative col-span-2 col-start-2 tablet:col-span-6 tablet:col-start-8 z-1 desktop:col-start-9 desktop:col-span-5 desktopXl:col-start-9 desktopXl:col-span-5'>
          <div className="absolute top-0 left-[-20px] w-screen z-20 tablet:top-[140px] tablet:left-[70px] tablet:max-w-[566px] tablet:block laptop:left-[30px] laptop:top-[140px] desktop:max-w-[790px] desktopXl:top-[120px] desktopXl:max-w-[1020px]">

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

          </div>
        </div>

        <div className='col-span-2 col-start-2 [&>p]:mb-6 mt-72'>
          <h5 className="mb-8 text-2xl font-sentinel__SemiBoldItal desktop:text-3xl">
            Tell me more about you!
          </h5>
          <p className=''>
            My name is Teela, I’m the second oldest of 4 and I grew up on 30 acres in Upstate NY. The harsh winters got the most of me, so after I completed my associates degree in Graphic Design, I transferred to (much warmer) SCAD in Savannah, GA. I completed my Bachelor of Fine Arts degree in Graphic Design in 2008.
          </p>
          <p className=''>
            Over time, I learned I had a knack for explaining complex tasks within the design programs to my studio coworkers. I thought others would benefit from these tips too, so I started a youtube channel in January of 2014. The kind responses were overwhelming, so I switched to more frequent tutorials soon afterwards. From there, I began teaching online courses.
          </p>
        </div>

      </section>

      <section className="et-grid-basic">

        {/* TEXT */}
        <div className="col-span-2 col-start-2 mb-8 tablet:col-start-3 tablet:col-span-10 laptop:col-start-4 laptop:col-span-8 desktop:col-start-4 desktop:col-span-8 desktop:mx-16 laptop:mb-16">

          <p className="mb-4 text-lg">
            Over time, I learned I had a knack for explaining complex tasks within the design programs to my studio coworkers. I thought others would benefit from these tips too, so I started a youtube channel in January of 2014. The kind responses were overwhelming, so I switched to more frequent tutorials soon afterwards. From there, I began teaching online courses.
          </p>

          <p className="text-lg">
            I met my husband, Spencer, at the studio and we married in the fall of 2014. Spence is originally from Colorado and completed his design education at The Portfolio Center in Atlanta, GA. As a designer, he’s worked on large projects for Coca-Cola, Powerade, FIFA, Visa, and the Olympic Games. He is a self taught web developer and the driving force behind the web design and development of Every-Tuesday. In 2015, we decided to pursue E-T together full time and haven’t let up since!
          </p>
        </div>

        {/* IMG COLLECTION 4 BABY PHOTOS */}
        <div className="flex flex-col mb-8 col-span-full tablet:col-start-2 tablet:col-span-12 laptop:col-start-3 laptop:col-span-10 laptop:mb-16 tablet:flex-row tablet:justify-center">
          <div className="flex-1 mx-10 tablet:mr-2 laptop:flex-[2] laptop:max-w-[644px] laptop:mr-8 rotate-[-4deg] mb-8 tablet:mb-0 flex items-center">
            <LazyImgix id={"baby-1"} image={babyImage} />
          </div>
          <div className="flex-1 w-full mx-auto max-w-[210px] tablet:max-w-[250px] tablet:ml-5 laptop:max-w-[410px]">
            <PolaroidImg imgixImage={headerImage} rotate='right' />
          </div>
        </div>

        {/* TEXT */}
        <div className="col-span-2 col-start-2 mb-8 tablet:col-start-3 tablet:col-span-10 laptop:col-start-4 laptop:col-span-8 desktop:col-start-4 desktop:col-span-8 desktop:mx-16 laptop:mb-16">

          <p className="mb-4 text-lg">
            In December 2018, we welcomed the newest member to our family: our daughter, Tuesday. She’s joined by her big sister + protective pooch, Nuna Petunia, who has been with me since March of 2009.
          </p>

        </div>

      </section>
    </>
  )
}

export default OurStoryTemplate
