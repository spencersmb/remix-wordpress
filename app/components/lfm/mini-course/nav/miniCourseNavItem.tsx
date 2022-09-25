import LazyImgix from '@App/components/images/lazyImgix'
import LockedSvg from '@App/components/svgs/lockedSvg'
import { classNames } from '@App/utils/appUtils'
import { useNavigate } from '@remix-run/react'
import React from 'react'

interface Props {
  index: number
  video: MiniCoureVideoItem
  cookieUnlock: boolean | undefined
  toggleNav: () => void
}
/**
 * 
 * @component MiniCourseNavItem
 * @tested - 07/12/2022 
 */
function MiniCourseNavItem(props: Props) {
  const { index, video, cookieUnlock, toggleNav } = props
  let navigate = useNavigate();

  const handleNavigate = () => {
    // if cookie is here and its not the current page
    if (cookieUnlock) {
      toggleNav()
      navigate(`/learn-font-making/mini-course/video${index + 1}`);
    }
  }

  return (
    <div key={index} className="mb-4">
      <div onClick={handleNavigate} className='bg-white shadow-xs rounded-xl hover:cursor-pointer tablet:shadow-none tablet:rounded-none tablet:bg-transparent'>
        <div className="flex flex-row items-center p-5 tablet:flex-col">
          {/* IMAGE */}
          <div className='w-full max-w-[78px] rounded-lg overflow-hidden shadow-lg mr-4 tablet:mx-auto tablet:max-w-none tablet:mb-4 relative'>

            {!cookieUnlock && <div
              data-testid='test-lockedSvg'
              className='absolute flex items-center justify-center p-2 -translate-x-1/2 -translate-y-1/2 rounded-lg top-1/2 left-1/2 bg-sage-200 z-3'>
              <div className='w-full max-w-[32px]'>
                <LockedSvg fill='var(--sage-600)' />
              </div>
            </div>}

            {/* locked background */}
            {!cookieUnlock &&
              <div
                data-testid='test-locked-bg'
                className='absolute top-0 left-0 w-full h-full bg-sage-700 opacity-60 z-2' />}

            {/* LAZYIMAGE */}
            <div
              data-testid='test-lazyImgix'
              className={classNames(!cookieUnlock ? 'opacity-50' : '', 'relative z-1')}>
              <LazyImgix
                id={`Video-${index + 1}`}
                image={video.image}
              />
            </div>
          </div>

          {/* TEXT */}
          <h3 className='flex-1 font-semibold text-sage-700 max-w-[220px]'>
            {video.title}
          </h3>
        </div>
      </div>

    </div>
  )
}

export default MiniCourseNavItem
