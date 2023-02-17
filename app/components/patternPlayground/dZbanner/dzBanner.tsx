import { classNames } from "@App/utils/appUtils"
import { FolderAddIcon } from "@heroicons/react/outline"
import { AnimatePresence, motion } from "framer-motion"
import DropZoneTwo from "./dzBannerDnD"

const DzBanner = ({ backgroundImage }: any) => {
  return (
    <>
      <motion.div
        key={`Banner`}
        id={`dz-banner`}
        initial='initial'
        variants={variants}
        animate={backgroundImage ? "loaded" : "initial"}
        className={`absolute z-3 w-full flex flex-col rounded-xl overflow-hidden bg-white shadow-2xl p-3`}
      >
        <div className={classNames(backgroundImage ? 'text-left' : 'text-center', 'relative flex flex-col z-1')}>
          <motion.h1
            className={'font-bold font-sentinel__SemiBoldItal'}
            key={`h1`}
            animate={backgroundImage ? "loaded" : "initial"}
            initial='initial'
            variants={h1Variants}
          >
            Pattern Playground
          </motion.h1>
          <motion.p
            className="pt-3"
            animate={backgroundImage ? "loaded" : "initial"}
            initial='initial'
            variants={taglineVariants}
          >
            by Every Tuesday
          </motion.p>
        </div>
        <AnimatePresence>
          {!backgroundImage ? <motion.div
            className="relative overflow-hidden text-center z-1"
            variants={dzVariants}
            key="dz"
            initial={'initial'}
            exit={'exit'}
            animate={'enter'}
          >
            <p className="px-3 pt-8 text-xl font-semibold">
              Quickly test your patterns in the browser!
            </p>
            <p className="pt-2">
              Simply drag your image into the browser and test it out!
            </p>
            <div className="rounded-2xl bg-[#F7F5F4] flex flex-col text-center justify-center items-center p-4 py-12 mt-8 dz-dashed-outline">
              <div className="flex flex-col w-8">
                <FolderAddIcon stroke={`#007bff`} />
              </div>
              <div className="text-sm font-bold">
                Drag-n-drop your image here
              </div>
            </div>
          </motion.div> : null}
        </AnimatePresence>

        {!backgroundImage &&
          <div className="absolute top-0 left-0 w-full h-full z-2">
            <DropZoneTwo />
          </div>}

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
    lineHeight: '24px'
  },
  initial: {
    fontSize: '36px',
    lineHeight: '42px'
  }
}
const taglineVariants = {
  loaded: {
    fontSize: '14px',
    lineHeight: '14px'
  },
  initial: {
    fontSize: '16px',
    lineHeight: '16px'
  }
}