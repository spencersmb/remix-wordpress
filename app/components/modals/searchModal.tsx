import useSite from '@App/hooks/useSite'
import CommentForm from '../comments/commentForm'
import Comment from '../comments/comment'
import { AnimatePresence, motion } from 'framer-motion'
import CloseSvg from '../svgs/closeSvg'
import { useState } from 'react'
import gql from 'graphql-tag';
import TwSpinnerOne from '../svgs/spinners/twSpinnerOne'
import { getGraphQLString } from '@App/utils/graphqlUtils'
import { parseComment } from '@App/utils/posts'
import SearchLayout from '../search/searchLayout'
import { useSearch } from '@App/hooks/useSearch'

/*
2 Forms - main form to leave a comment. 2nd form appears when user clicks reply. That form is for replying a nested comment
*/

/**
 * @Component Search Modal
 * 
 * Large full window modal to Search Site
 *
 *
 */
const SearchModal = () => {
  const { state: { isOpen }, closeSearch } = useSearch()
  const [animationCompleted, setAnimationCompleted] = useState(false)
  return (
    // @ts-ignore
    <AnimatePresence>
      {isOpen
        ? <>
          <motion.div
            data-testid='searchModal'
            key='modalContainer'
            className='bg-white fixed h-screen block z-[1100] opacity-0 translate-x-[0] top-0 right-0 left-auto  overflow-y-auto shadow-xl w-full '
            initial={containerMotion.closed}
            animate={containerMotion.open}
            exit={containerMotion.closed}
            onAnimationComplete={(e: any) => {

              if (e.x === '0%') {
                console.log('e', e);
                setAnimationCompleted(true)
              } else {
                setAnimationCompleted(false)
              }

            }}
          >
            <div className='flex flex-col'>
              <div onClick={closeSearch}>CLOSE</div>
              <SearchLayout animationCompleted={animationCompleted} />
            </div>
          </motion.div>
        </>
        : null}
    </AnimatePresence>

  )
}
const containerMotion = {
  closed: {
    x: '100%',
    right: 0,
    left: 'auto',
    top: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 30,
      duration: .2
    }
  },
  open: {
    x: '0%',
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