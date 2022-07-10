import LazyImgix from '@App/components/images/lazyImgix'
import { useNavigate } from '@remix-run/react'
import React from 'react'

interface Props {
  index: number
  video: MiniCoureVideoItem
  cookieUnlock: boolean | undefined
}

function MiniCourseNavItem(props: Props) {
  const { index, video, cookieUnlock } = props
  let navigate = useNavigate();

  const handleNavigate = () => {
    // if cookie is here and its not the current page
    if (cookieUnlock) {
      navigate(`/learn-font-making/mini-course/video${index + 1}`);
    }
  }

  return (
    <div key={index} className="mb-4">
      <div onClick={handleNavigate} className='bg-white shadow-xs rounded-xl hover:cursor-pointer tablet:shadow-none tablet:rounded-none'>
        <div className="flex flex-row items-center p-5 tablet:flex-col">
          {/* IMAGE */}
          <div className='w-full max-w-[78px] rounded-lg overflow-hidden shadow-lg mr-4 tablet:mx-auto tablet:max-w-none'>
            <LazyImgix
              id={`Video-${index + 1}`}
              image={video.image}
            />
          </div>

          {/* TEXT */}
          <div className='flex-1 font-semibold text-sage-700 max-w-[220px]'>
            {video.title}
          </div>
        </div>
      </div>

    </div>
  )
}

export default MiniCourseNavItem
