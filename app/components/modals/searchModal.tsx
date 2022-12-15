
import { AnimatePresence, motion } from 'framer-motion'
import CloseSvg from '../svgs/closeSvg'
import { useRef, useState } from 'react'

import SearchLayout from '../search/searchLayout'
import { useSearch } from '@App/hooks/useSearch'
import { classNames } from '@App/utils/appUtils'
import { useCloseModalOnPageTransition, useScrollBarHide } from '@App/hooks/windowUtilHooks'

/*
2 Forms - main form to leave a comment. 2nd form appears when user clicks reply. That form is for replying a nested comment
*/

/**
 * @Component Search Modal
 * 
 * Large full window modal to Search Site
 *
 * TODO: ADD TEST
 */
import React from 'react'

interface Props { }

function SearchModal(props: Props) {
  const { state: { isOpen }, closeSearch } = useSearch()
  const [animationCompleted, setAnimationCompleted] = useState(false)
  const containerRef = useRef<null | HTMLDivElement>(null)
  const htmlDomRef = useRef<null | HTMLHtmlElement>(null)
  const containerMotion = {
    closed: {
      // x: '100%',
      overflow: 'hidden',
      // width: '0%',
      right: 0,
      left: '100%',
      top: 0,
      opacity: 1,
      transition: {
        duration: .3
      }
    },
    open: {
      // width: '100%',
      // x: '0%',
      overflowY: 'scroll',
      left: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 30
      }
    }
  }
  const variants = {
    initial: {
      opacity: 0,
      width: '100%',
      height: '100%',
      display: 'block',
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 30,
      }
    },
    exit: {
      opacity: 0,
      width: '100%',
      height: '100%',
      display: 'black',
      transition: {
        opacity: {
          duration: 0
        }
      }
    },
    enter: {
      width: '100%',
      height: '100%',
      display: 'block',
      opacity: .5,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 30,
      }
    },
  }
  // Scroll bar adjustment
  useScrollBarHide({
    htmlDomRef,
    selector: 'html'
  })

  // Close an open modal when page transitions
  useCloseModalOnPageTransition()

  return (
    // @ts-ignore
    <AnimatePresence>
      {isOpen
        ? <>
          <motion.div
            data-testid='searchModal'
            key='modalContainer'
            ref={containerRef}
            className={classNames(isOpen ? '' : '', 'bg-white overflow-y-scroll fixed h-screen block z-[1100] opacity-0 top-0 right-0 left-auto shadow-xl w-full ')}
            initial={containerMotion.closed}
            // @ts-ignore
            animate={containerMotion.open}
            exit={containerMotion.closed}
            onAnimationComplete={(e: any) => {

              if (e.left === 0) {
                setAnimationCompleted(true)
              } else {
                setAnimationCompleted(false)
              }
            }}
          >
            <div className='flex flex-col'>
              <div
                className="absolute top-3 right-2 w-full max-w-[38px] tablet:max-w-[46px] hover:cursor-pointer hover:rotate-180 transition-all duration-300"
                onClick={closeSearch}>
                <CloseSvg stroke='#151213' />
              </div>
              <SearchLayout animationCompleted={animationCompleted} containerRef={containerRef} />
            </div>

          </motion.div>

        </>
        : null}
    </AnimatePresence>

  )
}

export default SearchModal

// const SearchModal = () => {
//   // const { state: { isOpen }, closeSearch } = useSearch()
//   // const [animationCompleted, setAnimationCompleted] = useState(false)
//   // const containerRef = useRef<null | HTMLDivElement>(null)
//   // const htmlDomRef = useRef<null | HTMLHtmlElement>(null)

//   // Scroll bar adjustment
//   // useScrollBarHide({
//   //   htmlDomRef,
//   //   selector: 'html'
//   // })

//   // Close an open modal when page transitions
//   // useCloseModalOnPageTransition()


//   return (
//     <div>modal</div>


//   )
// }


