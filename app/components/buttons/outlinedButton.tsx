import { AnimatePresence, motion } from 'framer-motion'
import { classNames } from '~/utils/appUtils'
import TwSpinnerOne from '../svgs/spinners/twSpinnerOne'

interface Props {
  clickHandler: () => Promise<void>
  loading: boolean
  text: string
  loadingText: string
  className?: string
}

function OutlinedButton(props: Props) {
  const { clickHandler, loading, text, loadingText = 'loading', className } = props

  return (
    <button
      className={classNames(className ? className : 'btn btn-primary btn-outlined mx-auto', '')}
      aria-disabled={loading}
      disabled={loading}
      onClick={clickHandler}>
      <AnimatePresence>
        {loading &&
          <motion.span
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
