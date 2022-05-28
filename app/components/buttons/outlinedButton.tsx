import { AnimatePresence, motion } from 'framer-motion'
import { classNames } from '@App/utils/appUtils'
import TwSpinnerOne from '../svgs/spinners/twSpinnerOne'

interface Props {
  clickHandler: () => Promise<void> | void
  loading: boolean
  text: string
  loadingText: string
  className?: string
}

/**
 * Basic Outlined Button
 * 
 * @tested - 5/27/2022 
 *
 */
function OutlinedButton(props: Props) {
  const { clickHandler, loading, text, loadingText = 'loading', className } = props

  return (
    <button
      data-testid="button"
      className={classNames(className ? className : 'btn btn-primary btn-outlined mx-auto', '')}
      aria-disabled={loading}
      disabled={loading}
      onClick={clickHandler}>
      {/* @ts-ignore */}
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
            className="max-w-[18px]">
            <TwSpinnerOne />
          </motion.span>
        }
      </AnimatePresence>
      <span className={loading ? 'ml-2' : ''}>{loading ? loadingText : text}</span>
    </button>
  )
}

export default OutlinedButton
