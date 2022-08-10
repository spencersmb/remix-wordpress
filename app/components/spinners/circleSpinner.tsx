import { classNames } from '@App/utils/appUtils'
import { AnimatePresence, motion } from 'framer-motion'
import React from 'react'

interface Props {
  className?: string
  visible: boolean
}
// TODO: Test this  
function CircleSpinner(props: Props) {
  const { visible, className } = props

  return (
    <>
      {/* @ts-ignore */}
      <AnimatePresence>
        {visible && <motion.div
          data-testid={'circle-spinner'}
          key="circleSpinner"
          initial={{
            opacity: 0,
            height: 0,
          }}
          animate={{
            opacity: 1,
            height: 60,
          }}
          exit={{
            opacity: 0,
            height: 0,
            transition: {
              duration: .3,
            }
          }}
          className={classNames(className ? className : '', 'rounded-full mx-auto flex items-center justify-center text-center w-[60px] h-[60px] p-1 overflow-hidden')}>
          <svg
            className="text-white motion-reduce:hidden animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="#b45309" strokeWidth="4"></circle>
            <path className="opacity-75" fill="#845c5c" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </motion.div>
        }
      </AnimatePresence>
    </>
  )
}

export default CircleSpinner
