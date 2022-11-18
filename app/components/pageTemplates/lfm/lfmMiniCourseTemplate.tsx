import LazyImgix from '@App/components/images/lazyImgix'
import LfmMiniCourseNavMobile from '@App/components/lfm/mini-course/nav/miniCourseNav'
import useSite from '@App/hooks/useSite'
import { staticImages } from '@App/lib/imgix/data'
import { breakpointConvertPX } from '@App/utils/appUtils'
import { Outlet } from '@remix-run/react'
import React from 'react'

interface Props {
  cookie: {
    hasCookie: boolean
    data: {
      video1: boolean
      video2: boolean
      video3: boolean
    } | null
  }
  products: IProduct[]
}

function LfmMiniCourseTemplate(props: Props) {
  const { cookie, products } = props
  const { state: { breakpoint } } = useSite()

  return (

    <div className='bg-[#F7F6F7] flex flex-col'>

      <div className='et-grid-basic'>

        <div className='relative col-span-2 col-start-2 my-4 tablet:col-start-2 tablet:col-span-12 laptop:col-start-3 laptop:col-span-10 tablet:mt-8 tablet:pl-5 desktop:col-start-4 desktop:col-span-8'>
          {breakpointConvertPX(breakpoint) >= 1024 &&
            <div className='absolute top-[-170px] left-[-120px] w-full max-w-[120px]'>
              <LazyImgix
                id={'scribble-5'} image={{
                  width: staticImages.scribbles.scribble_5.width,
                  height: staticImages.scribbles.scribble_5.height,
                  alt: 'Learn Font Making: Free Mini Course',
                  src: staticImages.scribbles.scribble_5.src,
                  placeholder: staticImages.scribbles.scribble_5.placeholder
                }}
              />
            </div>}
          <h1 className='font-semibold text-sage-600'>Learn Font Making</h1>
          <h2 className='text-4xl font-sentinel__SemiBoldItal text-sage-800'>Mini Course</h2>
        </div>
      </div>

      <LfmMiniCourseNavMobile {...cookie.data} />

      <Outlet context={{ cookie: { ...cookie.data }, products }} />

    </div>
  )
}

export default LfmMiniCourseTemplate
