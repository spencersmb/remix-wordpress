import FacebookSvg from "@App/components/svgs/social/facebookSvg"
import PinterestSvg from "@App/components/svgs/social/pinterestSvg"
import TwitterSvg from "@App/components/svgs/social/twitterSvg"
import { classNames } from "@App/utils/appUtils"
import { FolderAddIcon } from "@heroicons/react/outline"
import { AnimatePresence, motion } from "framer-motion"
import usePatternPlayground from "../usePatternProvider"
import DropZoneTwo from "./dzBannerDnD"

const DzBanner = () => {
  const { state: { touched }, saveImage } = usePatternPlayground()
  return (
    <>
      <motion.div
        key={`Banner`}
        id={`dz-banner`}
        initial='initial'
        variants={variants}
        animate={touched ? "loaded" : "initial"}
        className={`absolute z-2 w-full flex flex-col rounded-xl overflow-hidden bg-white shadow-2xl`}
      >
        <div className={classNames(touched ? 'text-left' : 'text-center', 'relative flex flex-col z-1')}>
          <motion.h1
            className={'font-bold font-sentinel__SemiBoldItal'}
            key={`h1`}
            animate={touched ? "loaded" : "initial"}
            initial='initial'
            variants={h1Variants}
          >
            Pattern Playground
          </motion.h1>
          <motion.p
            className=""
            animate={touched ? "loaded" : "initial"}
            initial='initial'
            variants={taglineVariants}
          >
            by Every Tuesday
          </motion.p>
        </div>
        <AnimatePresence>
          {!touched
            ? <motion.div
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
            </motion.div>
            : <motion.div
              className="relative overflow-hidden z-1"
              variants={socialVarients}
              key="social"
              initial={'initial'}
              exit={'exit'}
              animate={'enter'} >
              <div className="flex flex-col pt-5">
                <button
                  className={'text-white bg-[#4C8D94] font-semibold px-4 py-4 rounded-md text-sm'}
                  onClick={saveImage}
                >
                  <span className=''>Save Image</span>
                </button>
                {/* <div className="pt-3 font-semibold">Share:</div> */}
                {/* <div className="flex flex-row gap-x-3">
                  <div className="w-[35px] h-[35px] rounded-md">
                    <FacebookSvg fill={`#4373F0`} />
                  </div>
                  <div className="w-[35px] h-[35px] rounded-md">
                    <PinterestSvg fill={`#4373F0`} />
                  </div>
                  <div className="w-[35px] h-[35px] rounded-md">
                    <TwitterSvg fill={`#4373F0`} />
                  </div>
                </div> */}
              </div>
            </motion.div >}
        </AnimatePresence>

        {/* {!touched &&
          <div className="absolute top-0 left-0 w-full h-full z-2">
            <DropZoneTwo />
          </div>} */}

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
    padding: '12px',
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
    padding: '32px',
    maxWidth: '350px',
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 30
    }
  }
}
const socialVarients = {
  initial: {
    height: 0,
    overflow: 'hidden',
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 30,
    }
  },
  exit: {
    height: 0,
    overflow: 'hidden',
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 30,
    }
  },
  enter: {
    height: 'auto',
    overflow: 'hidden',
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 30,
      delay: .36
    }
  },
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
    lineHeight: '14px',
    paddingTop: '4px'
  },
  initial: {
    fontSize: '16px',
    lineHeight: '16px',
    paddingTop: '8px'
  }
}

