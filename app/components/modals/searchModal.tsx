import useSite from '@App/hooks/useSite'
import CommentForm from '../comments/commentForm'
import Comment from '../comments/comment'
import { AnimatePresence, motion } from 'framer-motion'
import CloseSvg from '../svgs/closeSvg'
import { useRef, useState } from 'react'
import gql from 'graphql-tag';
import TwSpinnerOne from '../svgs/spinners/twSpinnerOne'
import { getGraphQLString } from '@App/utils/graphqlUtils'
import { parseComment } from '@App/utils/posts'
import SearchLayout from '../search/searchLayout'
import { useSearch } from '@App/hooks/useSearch'
import { classNames } from '@App/utils/appUtils'

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
const SearchModal = () => {
  const { state: { isOpen }, closeSearch } = useSearch()
  const [animationCompleted, setAnimationCompleted] = useState(false)
  const containerRef = useRef<null | HTMLDivElement>(null)

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
              if (e.left === '100%') {
                setAnimationCompleted(true)
              } else {
                setAnimationCompleted(false)
              }
            }}
          >
            <div className='flex flex-col'>
              <div
                className="absolute top-2 right-2 w-full max-w-[38px] tablet:max-w-[46px]"
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


export default SearchModal