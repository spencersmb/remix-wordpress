import { AnimatePresence, motion } from 'framer-motion'
import { classNames } from '@App/utils/appUtils'
import CheckmarkSvg from '../svgs/checkmarkSvg'


interface IPillProps {
  selected: boolean
  clickHandler: () => void
  children?: any
}
/**
 * Pill Button with SVG Checkmark
 * 
 * @tested - 5/27/2022 
 *
 */
const PillBase = (props: IPillProps) => {
  const { children, clickHandler, selected } = props
  return (
    // <div
    //   data-testid="pill"
    //   className={classNames(selected
    //     ? 'pill_selected_state bg-sage-600 text-white ring ring-sage-600 hover:ring-sage-600'
    //     : 'text-neutral-800 bg-neutral-200 hover:ring-neutral-400 active:bg-neutral-400',
    //     'cursor-pointer font-medium flex flex-row items-center px-5 py-2.5 justify-center rounded-2xl mr-5 mb-5 last:mr-0 hover:ring  ring-offset-neutral-50 focus:ring ring-offset-4 focus:ring-primary-300 duration-200 ease-in-out active:scale-[.97]')} onClick={clickHandler}>
    <div
      data-testid="pill"
      className={classNames(selected
        ? 'pill_selected_state btn-outlineFill--sage bg-emerald-700 text-white border-emerald-700 hover:border-emerald-700'
        : 'bg-sage-50 border-sage-50 hover:border-emerald-500 text-emerald-600',
        'btn btn-outlineFill')} onClick={clickHandler}>
      {/* @ts-ignore */}
      <AnimatePresence>
        {selected &&
          <motion.span
            key="filterIcon"
            initial={{
              opacity: 0,
              width: 0,
            }}
            animate={{
              opacity: 1,
              width: 'auto',
              transition: {
                delay: .1,
              }
            }}
            exit={{
              opacity: 0,
              width: 0,
            }}
            className="max-w-[18px]">
            <CheckmarkSvg fill="currentColor" />
          </motion.span>
        }
      </AnimatePresence>
      <motion.span
        animate={selected ? "open" : "closed"}
        variants={variants}
      >
        {children}
      </motion.span>
    </div>
  )
}
const variants = {
  open: {
    marginLeft: '0.5rem',
  },
  closed: {
    marginLeft: "0rem"
  },
}
export default PillBase
