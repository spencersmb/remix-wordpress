import React from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import useSite from '../../hooks/useSite'

/**
 * @Component BasicModal
 * @tested - 5/31/2022
 * 
 * A Basic modal for displaying content. Just pass a component to the reducer when
 * opening. Example check the NAV component.
 *
 * use the useEssGridAuth hook to use this modal type
 *
 */
const BasicModal = () => {
  const { state: { modal }, closeModal } = useSite()


  return (
    // @ts-ignore
    <AnimatePresence>
      {modal.open
        ? <>
          <motion.div
            data-testid='modalWrapper'
            key='modalContainer'
            className='fixed block top-1/2 right-auto left-1/2 z-[1100] opacity-0 translate-x-[-50%] translate-y-[-50%] rounded-md'
            initial={containerMotion.closed}
            animate={containerMotion.open}
            exit={containerMotion.closed}
          >
            {modal.component
              ? typeof modal.component === 'function'
                ? <modal.component />
                : modal.component
              : null}
          </motion.div>
          <motion.div
            data-testid='modalOverlay'
            id="modalOverlay"
            className={`fixed top-0 right-0 w-0 h-0 bg-slate-900 z-[1050]`}
            key="loginOverlay"
            initial={'initial'}
            exit={'exit'}
            animate={'enter'}
            variants={variants}
            onClick={closeModal}
          />
        </>
        : null}
    </AnimatePresence>

  )
}
const containerMotion = {
  closed: {
    y: '-40%',
    x: '-50%',
    opacity: 0,
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 30,
      duration: .2
    }
  },
  open: {
    y: '-50%',
    x: '-50%',
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

export default BasicModal
