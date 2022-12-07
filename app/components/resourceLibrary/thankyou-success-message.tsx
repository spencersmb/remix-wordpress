import { staticImages } from '@App/lib/imgix/data'
import { createImgixSizes } from '@App/utils/imageHelpers'
import React, { useEffect, useRef, useState } from 'react'
import { Link } from '@remix-run/react'
import LazyImgix from '../images/lazyImgix'
import Layout from '../layoutTemplates/layout'
import NavPaddingLayout from '../layoutTemplates/navPaddingLayout'
import confetti from 'canvas-confetti'
import useSite from '@App/hooks/useSite'
import { BreakpointEnums } from '@App/enums/breakpointEnums'
import { useConfettiDeviceParams } from '@App/hooks/useConfettiConfig'

interface Props {
  user: {
    id: number
    email: string
    tags: string[]
  }
}
// TODO: TEST THIS
function ThankyouSuccessMessage(props: Props) {
  const { user } = props
  const canvasRef = useRef(null)

  // const [state, setState] = useState({
  //   loaded: false,
  //   confettiParams: confettiConfig.desktop
  // })

  const authorImg = createImgixSizes({
    width: 800,
    height: 1367,
    alt: `Every Tuesday: Teelas profile picture`,
    src: staticImages.profiles.teela.vertical.src,
    mobileSize: 600,
  })
  const authorScribble = createImgixSizes({
    src: staticImages.scribbles.stroke_2.src,
    alt: `Every Tuesday: Teela's scribble`,
    width: 600,
    height: 628,
    mobileSize: 288,
  })

  useConfettiDeviceParams({
    ref: canvasRef,
  })

  // function manualConfettiFire() {
  //   confettiTest(state.confettiParams)
  // }


  return (
    <NavPaddingLayout bgColor='bg-cream-100'>
      <div className='et-grid-basic grid-rows-[minmax(auto,30px)_auto_1fr] tablet:grid-rows-[minmax(auto,60px)_auto_auto_auto_auto] relative'>
        {/* <div className='absolute top-0 left-0 z-[11]'>
          <button onClick={manualConfettiFire} className="btn btn-sm btn-primary">Fire</button>
        </div> */}
        <canvas ref={canvasRef} className={'absolute w-[400px] h-[600px]  tablet:w-[768px] tablet:h-[800px] laptop:w-[1024px] desktop:w-[1800px] desktop:h-[1000px] top-0 left-1/2 -translate-x-1/2 z-10'} />
        <div className='relative col-span-2 col-start-2 row-span-2 row-start-1 text-3xl mt-9 z-2 rotate-[-15deg] tablet:col-start-3 tablet:col-span-8 tablet:rotate-0 tablet:flex tablet:items-center laptop:text-6xl laptop:my-[160px]'>
          These are a few of my favorite things.
        </div>

        {/* AUTHOR IMG */}
        <div className='relative col-span-2 col-start-2 row-span-2 row-start-2 z-1 max-w-[191px] w-full ml-auto mr-0 h-[290px] tablet:col-start-8 tablet:col-span-6 tablet:max-w-none tablet:h-[400px] tablet:pr-[50px] laptop:h-full laptop:col-start-10 laptop:col-span-4 desktop:col-start-9 desktop:col-span-4 desktop:h-[469px] desktop:row-start-2 desktop:row-span-3 desktopXl:col-start-10 desktopXl:col-span-4 desktopXl:h-[500px] desktopXl:pr-[100px]'>
          <div className='relative w-full h-full overflow-hidden z-2'>
            <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] tablet:w-[300px] desktop:w-[350px]'>
              <LazyImgix
                id={'polaroidImg'}
                image={authorImg.image}
                visibleByDefault={true}
              // sizes={imgOptions ? imgOptions.sizes : ''}
              // srcSet={imgOptions ? imgOptions.srcSet : ''}
              />
            </div>
          </div>
          <div className='w-[200px] top-[210px] left-[40px] absolute z-1 tablet:left-[160px] tablet:top-[-30px] desktop:w-[300px]'>
            <LazyImgix
              id={`scribble`}
              visibleByDefault={true}
              image={authorScribble.image}
              sizes="(max-width: 666px) 30vw, (max-width: 1024px) 10vw, 535px"
              srcSet={
                `${authorScribble.defaultSrc}?auto=format&w=600&fit=clip 1024w,
              `}
            />

          </div>
        </div>

        <div className='hidden self-end bg-white col-span-full row-start-2 row-span-2 h-[28px] tablet:block desktop:row-start-3 desktop:row-span-2'></div>

        {/* CATEGORIES MENU */}
        <div className='relative py-20 bg-white col-span-full et-grid-basic'>

          <div className='flex flex-col col-span-2 col-start-2 text-xl tablet:col-span-10 tablet:col-start-3 laptop:col-start-4 laptop:col-span-8'>

            {/* EMAIL */}
            <div className='flex flex-col items-start mb-4'>
              <div className='mb-2 text-sm'>
                Email Registered
              </div>
              <div className='flex flex-col p-4 px-6 rounded-lg bg-sage-100'>
                <div className='text-xl font-medium'>
                  {user.email}
                </div>
              </div>
            </div>

            <h1 className='pt-6 pb-12 text-5xl font-sentinel__SemiBoldItal text-sage-800'>
              Welcome to the club!
            </h1>


            <p className='mb-8 text-xl'>
              Thank you for confirming to become part of the Tuesday Makers community. Our club comes with some pretty sweet exclusive perks! You’ll now be the first to know about new courses, course and product discounts as well as new freebies (you’ll receive a new one every month)! More than anything, we’re so glad you’re here – start taking advantage of the Tribe right now by signing into the exclusive resource library and picking up some free goods – info below!
            </p>

            <h2 className='pt-4 text-3xl font-sentinel__SemiBoldItal'>
              Next Steps
            </h2>

            <p className='mt-4 text-xl'>
              You’re all setup and ready to go. You should be logged in automatically and you can just close this window when you’re ready. If you ever need to log back in, just click on the Tuesday Makers button in the top navigation, then hit Login and just enter your email:
            </p>

            <p className='mt-4 text-xl'>
              As long as you have an active email account with us, you will continue to have access to all the freebies + Resource Library.
            </p>

            <div className='flex flex-col items-start mt-8'>
              <Link to={'/tuesday-makers/members'} className="btn btn-primary btn-xl">
                Take me to the Resource Library
              </Link>

            </div>

          </div>

        </div>

      </div>
    </NavPaddingLayout>
  )
}

export default ThankyouSuccessMessage
