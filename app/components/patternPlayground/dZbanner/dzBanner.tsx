import LazyImgix from "@App/components/images/lazyImgix"
import { classNames } from "@App/utils/appUtils"
import { createImgixSizes } from "@App/utils/imageHelpers"
import { FolderAddIcon } from "@heroicons/react/outline"
import { AnimatePresence, motion } from "framer-motion"
import usePatternPlayground from "../usePatternProvider"

const DzBanner = () => {
  const { state: { touched }, saveImage } = usePatternPlayground()
  const ppLogo = createImgixSizes({
    compress: true,
    height: 333,
    width: 600,
    alt: "Pattern Playground by Every Tuesday",
    mobileSize: 400,
    src: 'https://et-website.imgix.net/et-website/images/pattern-playground/pp-logo.jpg'
  })
  return (
    <div className={classNames(touched ? 'z-[4]' : 'z-3', `absolute w-full overflow-hidden h-[calc(100%_-_var(--pp-nav))]`)}>
      <motion.div
        key={`Banner`}
        id={`dz-banner`}
        initial='initial'
        variants={variants}
        animate={touched ? "loaded" : "initial"}
        className={classNames(touched ? 'z-[4]' : 'z-3', `absolute w-full flex flex-col rounded-xl overflow-hidden bg-white shadow-2xl`)}
      >
        <div className={'relative flex flex-col z-1 text-center'}>
          <motion.h1
            className={'font-bold font-sentinel__SemiBoldItal'}
            key={`h1`}
            animate={touched ? "loaded" : "initial"}
            initial='initial'
            variants={h1Variants}
          >
            <LazyImgix
              id={'pp-logo'}
              image={ppLogo.image}
              sizes="(max-width: 666px) 40vw, (max-width: 1023px) 60vw, (max-width: 1399px) 40vw, 1400px"
              visibleByDefault={true}
              srcSet={
                `
            ${ppLogo.defaultSrc}&w=600&fit=clip 600w,
            `}
            />
          </motion.h1>
          <motion.p
            className="mb-4"
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
              className="relative flex flex-col overflow-hidden text-center z-1 text-grey-800"
              variants={dzVariants}
              key="dz"
              initial={'initial'}
              exit={'exit'}
              animate={'enter'}
            >
              <p className="px-3 mb-0 text-xl font-semibold">
                Design patterns faster
              </p>
              <p className="mb-0">
                Ready to test your pattern? Drag your image into the browser
              </p>
              <div className="rounded-2xl bg-[#F7F5F4] flex flex-col text-center justify-center items-center p-4 py-12 mt-6 dz-dashed-outline">
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
              <div className="flex flex-col">
                <button
                  className={'text-white bg-[#4373F0] font-semibold px-4 py-4 rounded-md text-sm'}
                  onClick={saveImage}
                >
                  <span className=''>Save Image</span>
                </button>
              </div>
            </motion.div >}
        </AnimatePresence>

      </motion.div>
    </div>
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
    fontSize: '12px',
    lineHeight: '12px',
    paddingTop: '4px',
  },
  initial: {
    fontSize: '14px',
    lineHeight: '14px',
    paddingTop: '2px',
  }
}

