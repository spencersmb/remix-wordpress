import LazyImgix from '@App/components/images/lazyImgix'
import useSite from '@App/hooks/useSite'
import { breakpointConvertPX } from '@App/utils/appUtils'
import { lfmImgRoot } from '@App/utils/lfmUtils'
import { motion } from 'framer-motion'
import React, { useRef } from 'react'
import CmGridItem from './cmGridItem'

interface Props {
  gridItems: CmGridItem[]
}

function CmGrid(props: Props) {
  const { gridItems } = props
  const gridRef = useRef<null | HTMLDivElement>(null)
  const [isOpen, setIsOpen] = React.useState(false)
  const { state: { breakpoint } } = useSite()

  /**
  * toggleOpen
  * Toggle for font Grid
  */
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

      {/* TITLE */}
      <div className="relative col-span-2 col-start-2 pt-5 pr-10 lfm-cmGrid__header z-3 pl-7 tablet:col-span-full w-full tablet:max-w-[768px] mx-auto laptop:row-start-1 laptop:max-w-[1000px] desktop:max-w-[1200px]">
        <div className="header_wrapper tablet:max-w-[500px] ml-0 mr-auto w-full laptop:max-w-[640px] desktop:max-w-[660px]">
          <p className='mt-10 mb-5 text-4xl text-lfm-blue-700 font-sentinel__SemiBoldItal tablet:text-5xl laptop:text-7xl'>Over 2,000 students have enrolled in Learn Font Making!
          </p>
          <p className='mb-5 text-lfm-blue-700 tablet:text-xl'>
            Here are some of their fonts after taking the full course:
          </p>
        </div>

        {/* HEARTS IMG */}
        {breakpoint !== 'mobile' &&
          <div className="lfm-cmGrid__hearts absolute top-[-100px]  left-0 w-[188px]">
            <LazyImgix
              id={'cmGrid-hearts'}
              image={{
                width: 400,
                height: 283,
                alt: 'Every-Tuesday hand drawn hearts',
                src: `${lfmImgRoot.aws}/hearts.png`,
              }}
            />
          </div>
        }
      </div>

      {/* ITEMS GRID */}
      <motion.div
        animate={isOpen ? "open" : "closed"}
        variants={gridVarients}
        custom={breakpoint}
        className="lfm-cmGrid__wrapper col-start-2 col-span-2 mb-5 z-3 relative transition-all tablet:max-w-[768px] tablet:row-start-2 tablet:mx-auto tablet:mb-10 tablet:col-span-full laptop:mb-8 laptop:max-w-[1000px] desktop:row-[2_auto] desktop:max-w-[1200px] overflow-hidden h-[645px] laptop:h-[675px] desktop:h-[810px] w-full">
        <div
          data-testid="cmGrid-items"
          className="flex flex-wrap px-4 pt-4 cmGrid__items">
          {gridItems
            .map((item, index) => (
              <CmGridItem
                key={index}
                index={index}
                gridItem={item} />
            ))}
        </div>
      </motion.div>

      {/* BUTTON */}
      <div className="items-center justify-center col-span-full cmGrid__button">
        <button className='mx-auto btn btn-outline btn-xl' onClick={toggleOpen}>
          {isOpen ? "Close" : "View More!"}
        </button>
      </div>

      {/* PINK BG */}
      <div className="lfm-cmGrid__bg z-2 h-[600px] w-[69%] left-0 top-0 absolute bg-lfm-pink-200 tablet:w-[487px] laptop:h-[800px] laptop:col-start-1 laptop:col-span-6 laptop:w-full" />

      {/* ALPHABET IMAGE */}
      {breakpointConvertPX(breakpoint) >= 1024 &&
        <div className="lfm-cmGrid__alphabet z-1 opacity-80 top-[140px] row-start-1 row-span-3 col-start-11 right-0 w-[800px] relative block">
          <LazyImgix
            id={'cmGrid-alphabet'}
            image={{
              width: 1461,
              height: 833,
              alt: 'Every Tuesday custom hand lettered alphabet font',
              src: `${lfmImgRoot.aws}/sketch-alphabet-notes.jpeg`,
            }}
          />
        </div>}
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