import { classNames } from '@App/utils/appUtils'
import { AnimatePresence, motion } from 'framer-motion'
import React from 'react'
import TwSpinnerOne from '../svgs/spinners/twSpinnerOne'

interface Props {
  loading: boolean
  text?: string
  spinnerColors?: {
    bg: string
    fg: string
  },
  loadingText?: string
  className?: string
}
/**
 * 
 * @function BasicSubmitBtn
 * @tested - 8/22/2022
 */
function BasicSubmitBtn(props: Props) {
  const { loading, spinnerColors, className, text = 'Submit', loadingText = 'Loading' } = props

  return (
    <button
      data-testid="submit-btn"
      disabled={loading}
      aria-disabled={loading}
      type='submit'
      className={classNames(className ? className : 'btn btn-primary btn-lg', '')}>
      <AnimatePresence>
        {loading &&
          <motion.span
            data-testid="spinner-container"
            key="filterIcon"
            initial={{
              opacity: 0,
              width: 0,
            }}
            animate={{
              opacity: 1,
              width: 'auto',
            }}
            exit={{
              opacity: 0,
              width: 0,
            }}
            className="max-w-[20px] overflow-hidden">
            <TwSpinnerOne loaderColors={spinnerColors} />
          </motion.span>
        }
      </AnimatePresence>
      <span className={loading ? 'ml-3' : ''}>{loading ? loadingText : text}</span>
    </button>
  )
}

export default BasicSubmitBtn
