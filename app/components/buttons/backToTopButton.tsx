import { AnimatePresence, motion } from 'framer-motion'

// TODO: TEST
interface Props {
  handleGoToTop: () => void
  visible: boolean
}

function BackToTopButton(props: Props) {
  const { handleGoToTop, visible } = props

  return (
    // @ts-ignore
    <AnimatePresence>
      {visible
        ? <motion.div
          initial={backToTopMotion.hide}
          animate={backToTopMotion.show}
          exit={backToTopMotion.hide}
          key='backToTopButton'
          className="fixed bottom-6 right-8">
          <button
            onClick={handleGoToTop}
            className="flex flex-col items-center justify-center p-2 text-white transition-all duration-300 rounded-lg shadow-lg w-14 h-14 bg-slate-500 hover:shadow-sm hover:bg-slate-600">
            <span className="w-[20px] h-[20px] flex justify-center items-center">
              <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="chevron-up"
                className="arrowUp"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
              >
                <path
                  fill="currentColor"
                  d="M240.971 130.524l194.343 194.343c9.373 9.373 9.373 24.569 0 33.941l-22.667 22.667c-9.357 9.357-24.522 9.375-33.901.04L224 227.495 69.255 381.516c-9.379 9.335-24.544 9.317-33.901-.04l-22.667-22.667c-9.373-9.373-9.373-24.569 0-33.941L207.03 130.525c9.372-9.373 24.568-9.373 33.941-.001z"
                ></path>
              </svg>
            </span>
            <span className="hidden text-xs text-center">
              Back to Top
            </span>
          </button>
        </motion.div>
        : null}
    </AnimatePresence>
  )
}

export default BackToTopButton

const backToTopMotion = {
  hide: {
    opacity: 0,
    bottom: '0px',
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 30,
      duration: .1
    }
  },
  show: {
    opacity: 1,
    bottom: '24px',
    transition: {
      bottom: {
        type: "spring",
        stiffness: 260,
        damping: 10,
        duration: .2
      }
    }
  }
}