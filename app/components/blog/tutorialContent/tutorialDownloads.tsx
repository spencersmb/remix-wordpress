import { isEmpty } from 'lodash'
import React, { useEffect, useState } from 'react'
import TuesdayMakersLoginModal from '@App/components/modals/makersLoginModal'
import TuesdayMakersSignUpModal from '@App/components/modals/popUpTuesdayMakersSignUp'
import LockedSvg from '@App/components/svgs/lockedSvg'
import useSite from '@App/hooks/useSite'
import { classNames } from '@App/utils/appUtils'
import { createImgixSizes } from '@App/utils/imageHelpers'
import LazyImgix from '@App/components/images/lazyImgix'
import { ArrowRightIcon, DownloadIcon } from '@heroicons/react/solid'
import { Link } from '@remix-run/react'
import { motion, useAnimation } from 'framer-motion'

interface Props {
  post: IPost
  style?: any // an Object from the scrollWatcher that sets the top style to match on scroll locking
  isMobile?: boolean
}

// Checks if Style object has changed and loads the component once style changes
function useLoadOnMount() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!loaded) {
      setLoaded(true);
      return
    }
  }, [loaded])

  return {
    loaded
  }

}

// TODO: TEST THIS
function TutorialDownloads(props: Props) {

  const { post, style, isMobile } = props
  const { openModal, closeModal, state: { user: { resourceUser } } } = useSite()
  const { loaded } = useLoadOnMount()
  const flowerBouquet = createImgixSizes({
    width: 1312,
    height: 1205,
    alt: 'Every-Tuesday hand drawn flat flower bouquet',
    src: 'https://et-website.imgix.net/et-website/images/flower-bouquet-1.2-min.png',
    mobileSize: 600
  })
  const controls = useAnimation();
  const variants = {
    hover: {
      x: 10,
    },
    initial: {
      x: 0,
    }
  };


  // OPEN MODAL ON LOAD TESTING
  // useEffect(() => {
  //   openModal({
  //     template: <TuesdayMakersLoginModal
  //       closeModal={closeModal}
  //       openSignUpModal={handleSignupClick}
  //     />
  //   })
  // }, [])

  function handleDownload(index: number) {
    return () => {
      if (resourceUser && post.tutorialManager.downloads) {
        window.open(post.tutorialManager.downloads[index].freebie.downloadLink, '_blank')
      }
    }
  }

  function handleSignupClick() {
    openModal({
      template: <TuesdayMakersSignUpModal
        closeModal={closeModal}

      />
    })
  }

  function handleLoginClick() {
    openModal({
      template: <TuesdayMakersLoginModal
        closeModal={closeModal}
        openSignUpModal={handleSignupClick}
      />
    })
  }


  function handleMouseEnterControls() {
    controls.start("hover");
  }

  function handleMouseLeaveControls() {
    controls.start("initial");
  }

  return (
    <div
      data-testid="test-tutorialDownloads"
      className={`transition-opacity flex flex-col tablet:shadow-xs overflow-hidden  ${loaded ? 'opacity-100' : 'opacity-0'} desktop:shadow-2xl desktop:mb-0`} >

      {/* SIGNUP BLOCK */}
      <div className='relative flex flex-col w-full px-8 overflow-hidden bg-emerald-900 text-sage-50 p-7 desktop:max-w-none'>

        {resourceUser &&
          <h2 className='relative mb-0 text-3xl laptop:text-5xl font-sentinel__SemiBoldItal z-2'>
            Tutorial Downloads
          </h2>
        }

        {!resourceUser && <div className='relative z-2 max-w-[305px]'>
          <h2 className='mb-3 text-3xl tablet:text-5xl laptop:text-5xl font-sentinel__SemiBoldItal'>
            Tutorial Downloads
          </h2>
          <p className='mb-4 max-w-[305px]'>
            Gain access to all tutorial assets for free by joining Tuesday Makers.
          </p>
          <div className='flex flex-row items-center mt-3 mb-2 button_container'>
            <div className='mr-4'>
              <button data-testid="subscribe-btn" type='button' onClick={handleSignupClick} className='font-semibold btn btn-tangerine-400 btn-tangerine-400-ring btn-lg ring-offset-emerald-900'>Subscribe</button>
            </div>
            <div>
              <p className='text-sm italic'>
                These freebies are available only for  Every Tuesday subscribers
              </p>
            </div>
          </div>

          {/* <div className='login'>
            <p className='text-sage-50'>
              Already a member? <button data-testid="login-btn" onClick={handleLoginClick} className='italic font-semibold underline text-secondary-400 underline-offset-4'>Sign In</button>
            </p>
          </div> */}
        </div>}

        {loaded && <div className='absolute  z-1 top-[-170px] w-[420px] right-[-160px] rotate-[105deg] tablet:w-[500px] desktop:w-[420px]'>
          <LazyImgix
            id={'ipadFlowerBg'}
            image={flowerBouquet.image}
            visibleByDefault={true}
            sizes="(max-width: 666px) 40vw, 1200px"
            srcSet={
              `
              ${flowerBouquet.defaultSrc}&w=600&fit=clip 600w,
              ${flowerBouquet.defaultSrc}&w=1200&fit=clip 1200w,
              `}
          />
        </div>}

      </div>

      {/* LOCKED CONTENT */}
      {post.tutorialManager.downloads && post.tutorialManager.downloads.length > 0 &&
        <div data-testid="downloads-list" className='flex-1 bg-white'>
          {!resourceUser && <div className='flex flex-row items-center p-5 px-6 text-xl font-bold text-emerald-900'>
            <div>
              Assets in this tutorial
            </div>
          </div>}

          {/* LOCKED ITEMS LIST */}
          <div className='px-6 py-4 pb-2 locked_items_list'>
            {post.tutorialManager.downloads && post.tutorialManager.downloads.map((item, index) => {
              return (
                <div data-testid='test-downloadItem' key={index} className="flex flex-row items-center justify-between mb-7 text-left downloadItem locked_item border-b-[1px] border-sage-200 pb-7  ">
                  <div className={`flex-1 text-base font-semibold pr-4 ${!resourceUser ? 'text-grey-500' : 'text-emerald-600'}`}>
                    {item.title}
                  </div>
                  <button
                    data-testid='download-btn'
                    disabled={!resourceUser}
                    className={classNames(!resourceUser
                      ? `text-grey-400`
                      : `text-tangerine-700`,
                      'w-[30px]')}
                    onClick={handleDownload(index)}>
                    {/* {!resourceUser ? 'Locked' : 'Download'} */}
                    <DownloadIcon fill={'currentColor'} />
                  </button>
                </div>
              )
            })}
          </div>

          <div data-testid='learnMore' className="flex flex-row items-center justify-between px-6 text-left mb-7 downloadItem locked_item text-tangerine-700">
            <motion.div
              onMouseEnter={handleMouseEnterControls}
              onMouseLeave={handleMouseLeaveControls}
            >
              <Link
                to={!resourceUser ? '/tuesday-makers' : '/tuesday-makers/members'}
                prefetch={'intent'}
                className={`flex flex-row flex-1 text-base font-semibold pr-4 items-center hover:cursor-pointer`}>
                <div>
                  {!resourceUser ? 'Learn More' : 'View Full Gallery'}
                </div>
                <motion.div
                  variants={variants}
                  animate={controls}
                  className='w-5 ml-2'>
                  <ArrowRightIcon fill={'currentColor'} />
                </motion.div>
              </Link>
            </motion.div>

          </div>
        </div>
      }

    </div>



  )
}

export default TutorialDownloads