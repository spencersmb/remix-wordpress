import { classNames } from "@App/utils/appUtils"
import { AnimatePresence, motion } from "framer-motion"
import DropZoneTwo from "./dzBannerDnD"

const DzBanner = ({ backgroundImage }: any) => {
  return (
    <>
      <motion.div
        key={`Banner`}
        initial='initial'
        variants={variants}
        animate={backgroundImage ? "loaded" : "initial"}
        className={`absolute z-3 w-full flex flex-col rounded-xl overflow-hidden bg-white shadow-2xl p-3`}
      >
        <div className="flex flex-col">
          <motion.h1
            className={classNames(backgroundImage ? 'text-left' : 'text-center', 'font-bold font-sentinel__SemiBoldItal')}
            key={`h1`}
            animate={backgroundImage ? "loaded" : "initial"}
            initial='initial'
            variants={h1Variants}
          >
            Pattern Playground
          </motion.h1>
        </div>
        <AnimatePresence>
          {!backgroundImage ? <motion.div
            className="relative overflow-hidden"
            variants={dzVariants}
            key="dz"
            initial={'initial'}
            exit={'exit'}
            animate={'enter'}
          >
            <DropZoneTwo />
          </motion.div> : null}
        </AnimatePresence>

      </motion.div>
    </>
  )
}

export default DzBanner

const dzVariants = {
  initial: {
    width: '100%',
    height: 'auto',
    display: 'block',
    overflow: 'hidden',
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 30,
    }
  },
  exit: {
    width: '100%',
    height: 0,
    display: 'black',
    overflow: 'hidden',
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 30,
    }
  },
  enter: {
    width: '100%',
    height: 'auto',
    display: 'block',
    overflow: 'hidden',
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 30,
    }
  },
}
const variants = {
  loaded: {
    y: '20px',
    x: '20px',
    left: '0',
    top: '0',
    right: 'auto',
    opacity: 1,
    maxWidth: '180px',
    transition: {
      type: "spring",
      stiffness: 360,
      damping: 30,
      duration: .2
    }
  },
  initial: {
    y: '-50%',
    x: '-50%',
    left: '50%',
    top: '50%',
    maxWidth: '285px',
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 30
    }
  }
}
const h1Variants = {
  loaded: {
    fontSize: '21px',
  },
  initial: {
    fontSize: '36px',
  }
}