import { isEmpty } from 'lodash'
import React, { useEffect, useState } from 'react'
import TuesdayMakersLoginModal from '@App/components/modals/makersLoginModal'
import TuesdayMakersSignUpModal from '@App/components/modals/popUpTuesdayMakersSignUp'
import LockedSvg from '@App/components/svgs/lockedSvg'
import useSite from '@App/hooks/useSite'
import { classNames } from '@App/utils/appUtils'

interface Props {
  post: IPost
  style?: any // an Object from the scrollWatcher that sets the top style to match on scroll locking
  isMobile?: boolean
}

function TutorialDownloads(props: Props) {

  const { post, style, isMobile } = props
  const { openModal, closeModal, state: { user: { resourceUser } } } = useSite()
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // first time
    if (!loaded && (!isEmpty(style) || style?.position)) {
      setLoaded(true);
      return
    }

    if (isMobile) {
      setLoaded(true);
      return
    }
  }, [style, loaded, isMobile])

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

  if (!post.tutorialManager.downloads || post.tutorialManager.downloads.length === 0) {
    return null
  }

  return (
    <div
      data-testid="test-tutorialDownloads"
      className={`transition-opacity flex flex-col mb-8 shadow-xs rounded-2.5xl overflow-hidden  ${loaded ? 'opacity-100' : 'opacity-0'} laptop:flex-row desktop:shadow-2xl desktop:mb-0 desktop:flex-col`} >
      {/* SIGNUP BLOCK */}
      <div className='flex flex-col bg-sage-700 text-sage-50 p-7 laptop:max-w-[375px] desktop:max-w-none'>

        {resourceUser &&
          <h2 className='mb-0 text-3xl laptop:text-5xl font-sentinel__SemiBoldItal'>
            Tutorial Downloads
          </h2>
        }

        {!resourceUser && <>
          <h2 className='mb-3 text-3xl laptop:text-5xl font-sentinel__SemiBoldItal'>
            Tutorial Downloads
          </h2>
          <p className='mb-4'>
            Gain access to all tutorial assets for free by joining Tuesday Makers.
          </p>
          <div className='flex flex-row items-center mt-3 mb-6 button_container'>
            <div className='mr-4'>
              <button data-testid="subscribe-btn" type='button' onClick={handleSignupClick} className='btn btn-secondary hover:ring-offset-sage-700 active:ring-offset-primary-600'>Subscribe</button>
            </div>
            <div>
              <p className='text-sm italic'>
                This kit available only for Unlimited Access subscribers
              </p>
            </div>
          </div>

          <div className='login'>
            <p className='text-sage-50'>
              Already a member? <button data-testid="login-btn" onClick={handleLoginClick} className='italic font-semibold underline text-secondary-400 underline-offset-4'>Sign In</button>
            </p>
          </div>
        </>}

      </div>

      {/* LOCKED CONTENT */}
      <div className='flex-1 bg-white'>

        {!resourceUser && <div className='flex flex-row items-center border-b font-sentinel__SemiBoldItal text-h5 p-7 border-neutral-300 text-sage-700'>
          <div className="locked_icon flex flex-col justify-center items-center border-[1px] border-sage-200 rounded-lg p-2.5 mr-4">
            <div className='w-[30px]'>
              <LockedSvg fill={`var(--sage-700)`} />
            </div>
          </div>
          <div>
            Free Downloads in the video
          </div>
        </div>}

        {/* LOCKED ITEMS LIST */}
        <div className='py-6 locked_items_list'>
          {post.tutorialManager.downloads && post.tutorialManager.downloads.map((item, index) => {
            return (
              <div data-testid='test-downloadItem' key={index} className="px-6 flex flex-row items-center justify-between mb-5 text-left downloadItem locked_item border-b-[1px] border-sage-200 pb-4 last:mb-0 last:border-0 last:pb-0">
                <div className={`flex-1 text-base font-semibold pr-4 ${!resourceUser ? 'text-grey-500' : 'text-sage-600'}`}>
                  {item.title}
                </div>
                <button data-testid='download-btn' disabled={!resourceUser} className={classNames(!resourceUser ? `btn btn-outline` : `btn btn-outline`, 'btn btn-small')} onClick={handleDownload(index)}>
                  {!resourceUser ? 'Locked' : 'Download'}
                </button>
              </div>
            )
          })}
        </div>
      </div>
    </div>



  )
}

export default TutorialDownloads