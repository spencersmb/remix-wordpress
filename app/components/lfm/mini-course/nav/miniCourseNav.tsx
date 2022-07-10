import HamburgerSvg from '@App/components/svgs/hamburger'
import useSite from '@App/hooks/useSite'
import { classNames } from '@App/utils/appUtils'
import { miniCourseVideoData } from '@App/utils/lfmUtils'
import { ChevronDownIcon } from '@heroicons/react/solid'
import { motion } from 'framer-motion'
import { useState } from 'react'
import MiniCourseNavItem from './miniCourseNavItem'


interface Props {
  video1?: boolean | undefined
  video2?: boolean | undefined
  video3?: boolean | undefined
}

function LfmMiniCourseNavMobile(props: Props) {
  const { video1, video2, video3 } = props
  const [isOpen, setIsOpen] = useState(false)
  const { state: { breakpoint } } = useSite()
  const toggleNav = () => setIsOpen(!isOpen)
  const videoCookiesArray = [video1, video2, video3]


  return (
    <div className='mb-12 et-grid-basic bg-sage-300 tablet:bg-transparent tablet:mb-8'>
      {/* NAV BUTTON */}
      <div
        onClick={toggleNav}
        className='flex flex-row justify-center col-span-2 col-start-2 py-4 tablet:col-start-2 tablet:col-span-12 tablet:pl-5 laptop:col-start-3 laptop:col-span-10 tablet:pb-0 desktop:col-start-4 desktop:col-span-8'>
        {/* ICON */}
        <div className='w-full max-w-[31px] mr-4 tablet:hidden'>
          <HamburgerSvg fill={'var(--sage-700)'} />
        </div>

        {/* TEXT */}
        <div className='flex flex-col justify-center flex-1 font-semibold leading-none text-sage-700'>
          <span className=' tablet:hidden'>View All Lessons</span>
          <span className='hidden tablet:block'>All Lessons</span>
        </div>

        {/* ARROW */}
        <div className='tablet:hidden'>
          <ChevronDownIcon
            className={classNames(isOpen ? 'rotate-[0deg]' : 'text-success-700 rotate-[-90deg]', 'max-w-[28px] transform duration-300')}
            aria-hidden="true"
          />
        </div>
      </div>

      {/* NAV LIST */}
      <motion.div
        animate={isOpen ? 'open' : 'closed'}
        variants={navVarients}
        custom={breakpoint === 'mobile'}
        className='flex flex-col col-span-2 col-start-2 overflow-hidden tablet:col-start-2 tablet:col-span-12 laptop:col-start-3 laptop:col-span-10 desktop:col-start-4 desktop:col-span-8'>
        <div className='py-4 tablet:py-0 tablet:flex tablet:flex-row'>
          {/* NAV LIST ITEMS */}
          {miniCourseVideoData.map((video, index) => {
            return (
              <MiniCourseNavItem key={index} index={index} video={video} cookieUnlock={videoCookiesArray[index]} />
            )
          })}
        </div>

      </motion.div>
    </div>
  )
}
const navVarients = {
  open: {
    height: 'auto',
  },
  closed: (custom: boolean) => ({
    height: custom ? 0 : 'auto',
  })
}
export default LfmMiniCourseNavMobile
