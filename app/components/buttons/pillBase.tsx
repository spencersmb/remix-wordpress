import { AnimatePresence, motion } from 'framer-motion'
import { classNames } from '@App/utils/appUtils'
import CheckmarkSvg from '../svgs/checkmarkSvg'


interface IPillProps {
  selected: boolean
  clickHandler: () => Promise<void>
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
    <div
      data-testid="pill"
      className={classNames(selected
        ? 'pill_selected_state bg-teal-400 text-neutral-50 ring ring-teal-400 hover:ring-teal-400'
        : 'text-neutral-800 bg-neutral-200 hover:ring-neutral-400 active:bg-neutral-400',
        'cursor-pointer font-medium flex flex-row items-center px-5 py-2.5 justify-center rounded-2xl mr-5 mb-5 last:mr-0 hover:ring  ring-offset-neutral-50 focus:ring ring-offset-4 focus:ring-primary-300 duration-200 ease-in-out active:scale-[.97]')} onClick={clickHandler}>
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
            <CheckmarkSvg fill="var(--neutral-50)" />
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
