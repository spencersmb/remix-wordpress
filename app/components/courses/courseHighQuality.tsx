import React from 'react'
import BulletListSvg from '../svgs/bulletList'
import PictureFrameSvg from '../svgs/pictureFrameSvg'
import VideoCameraSvg from '../svgs/videoCamera'

interface Props { }
function getBgColors(position: number): string {
  switch (position) {
    case 1:
      return 'bg-secondary-200'

    case 2:
      return 'bg-primary-200'

    default:
      return 'bg-sage-200'
  }
}
function CourseHighQuality(props: Props) {

  return (
    <div className='grid grid-flow-row py-8 bg-sage-50 grid-cols-mobile gap-x-5 tablet:py-24 tablet:grid-cols-tablet tablet:gap-x-5 desktop:grid-cols-desktop'>

      <div className='col-span-2 col-start-2 mb-8 text-center text-sage-700 tablet:col-start-4 tablet:col-span-8 laptop:col-start-5 laptop:col-span-6 laptop:mb-16'>
        <h3 className='mb-8 text-5xl font-sentinel__SemiBoldItal desktop:text-6xl desktop:max-w-[500px] desktop:mx-auto'>High quality video & class assets</h3>
        <p className='tablet:text-lg laptop:text-xl desktop:text-2xl'>We want to provide the best environment for you to learn with high quality videos that show every step with every tool Teela uses during the course so you can follow along perfectly.</p>
      </div>


      <div className='grid grid-cols-1 col-span-2 col-start-2 tablet:grid-cols-3 tablet:col-start-2 tablet:col-span-12 laptop:px-[2%] desktop:max-w-[1000px] desktop:mx-auto'>
        {qualityList.map((item, index) => {

          let bgColor = getBgColors(index)

          return (
            <div key={index} className="flex items-center p-4 mb-4 bg-white rounded-lg shadow-xs tablet:mx-4">
              <div className={`${bgColor} rounded-lg p-2 w-[53px] laptop:p-4 laptop:w-[73px]`}>
                {item.svg}
              </div>
              <div className='flex-1 pl-4 font-bold leading-6 laptop:text-lg text-sage-600'>
                <h4>{item.title}</h4>
              </div>
            </div>
          )
        })}
      </div>

    </div>
  )
}

export default CourseHighQuality

const qualityList = [
  {
    title: 'Pre-recorded videos',
    svg: <VideoCameraSvg stroke={`#000000`} />
  },
  {
    title: 'Step-by-step instructions',
    svg: <BulletListSvg stroke={`#000000`} />
  },
  {
    title: 'Project Based Tutorials',
    svg: <PictureFrameSvg stroke={`#000000`} />
  }
]