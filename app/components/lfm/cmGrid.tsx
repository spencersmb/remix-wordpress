import useSite from '@App/hooks/useSite'
import { breakpointConvertPX } from '@App/utils/appUtils'
import { lfmImgRoot } from '@App/utils/lfmUtils'
import { motion } from 'framer-motion'
import React, { useEffect, useRef } from 'react'
import LazyImgix from '../images/lazyImgix'

interface Props {
  gridItems: {
    alt: string
    img: string
    link: string
  }[]
}

function CmGrid(props: Props) {
  const { gridItems } = props
  const gridRef = useRef<null | HTMLDivElement>(null)
  const [isOpen, setIsOpen] = React.useState(false)
  const { state: { breakpoint } } = useSite()
  const toggleOpen = () => {
    // if its open, we are about to close it so scroll to top
    if (isOpen) {
      goToTop()
      setTimeout(() => {
        setIsOpen(!isOpen)
      }, 1000)
    } else {
      setIsOpen(!isOpen)
    }

  }
  /**
  * goToTop
  * smooth scroll to the top of the page
  */
  const goToTop = () => {
    if (gridRef.current) {
      window.scrollTo({
        top: gridRef.current.offsetTop - 100,
        behavior: "smooth"
      });
    }
  };

  return (
    <div ref={gridRef} className='et-grid-basic relative grid-rows-[auto_auto_auto] gap-y-0'>
      <div className="relative col-span-2 col-start-2 px-10 pt-5 lfm-cmGrid__header z-3 tablet:pt-5 tablet:pb-10 tablet:max-w-[600px] tablet:ml-5 tablet:col-start-2 tablet:col-span-9 laptop:pt-10 laptop:px-10 laptop:pb-[25px] laptop:row-start-1 laptop:col-start-2 laptop:col-span-9 laptop:max-w-none">
        <p className='mt-10 mb-5 text-3xl text-lfm-blue-700 font-sentinel__SemiBoldItal tablet:text-5xl laptop:text-7xl'>Over 2,000 students have enrolled in Learn Font Making!
        </p>
        <p className='mb-5 text-lfm-blue-700 tablet:text-xl'>
          Here are some of their fonts after taking the full course:
        </p>
      </div>

      <motion.div
        animate={isOpen ? "open" : "closed"}
        variants={gridVarients}
        custom={breakpoint}
        className="lfm-cmGrid__wrapper col-start-2 col-span-2 mb-5 z-3 relative transition-all tablet:max-w-[768px] tablet:mx-auto tablet:mb-10 tablet:col-span-full laptop:mb-8 laptop:max-w-[1000px] desktop:row-[2_auto] desktop:max-w-[1200px] overflow-hidden h-[645px] laptop:h-[675px] desktop:h-[810px] w-full">
        <div className="flex flex-wrap px-4 pt-4 cmGrid__items">
          {gridItems
            .map((item, index) => {
              const url = `${lfmImgRoot.aws}/cm-grid/images`
              return (
                <div
                  className='cm-grid__item px-[7.5px] pb-4 flex-[0_1_50%] tablet:flex-[1_0_33.33333%] tablet:max-w-[25%]'
                  key={index}>
                  <div className='cm-grid__item--shadow rounded-md transition-all duration-300 cursor-pointer shadow-et_1 overflow-hidden bg-white min-h-[91px] tablet:min-h-[113.08px] laptop:min-h-[151.77px] desktop:min-h-[185.13px]'>
                    <a href={item.link} target='_blank' rel="noopener noreferrer">
                      <LazyImgix
                        id={`${index}-cmGrid`}
                        image={{
                          width: 706,
                          height: 471,
                          alt: item.alt,
                          src: `${url}/${item.img}`,
                        }} />
                    </a>
                  </div>
                </div>
              )
            })}
        </div>
      </motion.div>
      <div className="items-center justify-center col-span-full cmGrid__button">
        <button className='mx-auto btn btn-outline' onClick={toggleOpen}>
          {isOpen ? "Close" : "View More!"}
        </button>
      </div>
      <div className="lfm-cmGrid__bg z-2 h-[600px] w-[75%] left-0 top-0 absolute bg-lfm-pink-200 tablet:w-[487px] laptop:h-[800px] laptop:col-start-1 laptop:col-span-6 laptop:w-full" />
    </div>
  )
}

export default CmGrid
const trans = {
  default: { duration: .2 },
}
const gridVarients = {
  open: {
    height: "auto",
  },
  closed: (custom: string) => {
    switch (custom) {
      case "desktop":
        return {
          height: 810,
          transition: trans
        }
      case "laptop":
        return {
          height: 675,
          transition: trans
        }
      case "tablet":
        return {
          height: 660,
          transition: trans
        }
      default:
        return {
          height: 645,
          transition: trans
        }
    }
  }
}