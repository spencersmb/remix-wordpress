import { isEmpty } from 'lodash'
import React, { useEffect, useState } from 'react'
import TuesdayMakersLoginModal from '~/components/modals/makersLoginModal'
import TuesdayMakersSignUpModal from '~/components/modals/popUpTuesdayMakersSignUp'
import LockedSvg from '~/components/svgs/lockedSvg'
import SquiggleSvg from '~/components/svgs/squiggleSvg'
import useSite from '~/hooks/useSite'
import { classNames } from '~/utils/appUtils'

interface Props {
  post: IPost
  style?: any
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
      />
    })
  }

  if (!post.tutorialManager.downloads || post.tutorialManager.downloads.length === 0) {
    return null
  }

  return (
    <div className={`transition-opacity flex flex-col mb-8 shadow-xs rounded-2.5xl overflow-hidden  ${loaded ? 'opacity-100' : 'opacity-0'} laptop:flex-row desktop:shadow-2xl desktop:mb-0 desktop:flex-col`} >
      {/* SIGNUP BLOCK */}
      <div className='flex flex-col bg-sage-700 text-sage-50 p-7 laptop:max-w-[375px] desktop:max-w-none'>

        {resourceUser &&
          <div className='mb-0 text-3xl laptop:text-5xl font-sentinel__SemiBoldItal'>
            Tutorial Downloads
          </div>
        }

        {!resourceUser && <>
          <div className='mb-3 text-3xl laptop:text-5xl font-sentinel__SemiBoldItal'>
            Tutorial Downloads
          </div>
          <p className='mb-4'>
            Gain access to all tutorial assets for free by joining Tuesday Makers.
          </p>
          <div className='flex flex-row items-center mt-3 mb-6 button_container'>
            <div className='mr-4'>
              <button onClick={handleSignupClick} className='btn btn-secondary hover:ring-offset-sage-700 active:ring-offset-primary-600'>Subscribe</button>
            </div>
            <div>
              <p className='text-sm italic'>
                This kit available only for Unlimited Access subscribers
              </p>
            </div>
          </div>

          <div className='login'>
            <p className='text-sage-50'>
              Already a member? <button onClick={handleLoginClick} className='italic font-semibold underline text-secondary-400 underline-offset-4'>Sign In</button>
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

        <div className='py-6 locked_items_list'>
          {post.tutorialManager.downloads && post.tutorialManager.downloads.map((item, index) => {
            return (
              <div key={index} className="px-6 flex flex-row items-center justify-between mb-5 text-left downloadItem locked_item border-b-[1px] border-sage-200 pb-4 last:mb-0 last:border-0 last:pb-0">
                <div className={`flex-1 text-base font-semibold pr-4 ${!resourceUser ? 'text-sage-400' : 'text-sage-600'}`}>
                  {item.title}
                </div>
                <button disabled={!resourceUser} className={classNames(!resourceUser ? `btn-sage-200 btn-disabled-sage-200` : `btn-sage-300`, 'btn btn-small')} onClick={handleDownload(index)}>
                  Download
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


// const TutorialContent = () => {
//   return (
//     // <div className='flex flex-col tablet:flex-row desktop:flex-col rounded-2.5xl overflow-hidden shadow-xs' >
//     //   {/* SIGNUP BLOCK */}
//     //   {!resourceUser && <div className='flex flex-col bg-primary-600 text-primary-50 p-9 laptop:max-w-[410px] desktop:max-w-none'>
//     //     <div className='mb-4 text-5xl font-sentinel__SemiBoldItal'>
//     //       Tutorial Downloads
//     //     </div>
//     //     <p className='mb-4'>
//     //       Gain access to all tutorial assets for free by joining Tuesday Makers.
//     //     </p>
//     //     <div className='flex flex-row items-center mt-3 mb-6 button_container'>
//     //       <div className='mr-4'>
//     //         <Link to={`/tuesday-makers?redirect=${post.slug}`} prefetch='intent' className='btn btn-secondary hover:ring-offset-primary-600 active:ring-offset-primary-600'>Subscribe</Link>
//     //       </div>
//     //       <div>
//     //         <p className='text-sm italic text-primary-200'>
//     //           This kit available only for Unlimited Access subscribers
//     //         </p>
//     //       </div>
//     //     </div>

//     //     <div className='login'>
//     //       <p className='text-white'>
//     //         Already a member? <Link to='/tuesday-makers/login' prefetch='intent' className='font-semibold underline text-primary-300 underline-offset-4 hover:text-teal-400'>Sign In</Link>
//     //       </p>
//     //     </div>
//     //   </div>}

//     //   {/* LOCKED CONTENT */}
//     //   <div className='flex-1 bg-white'>
//     //     <div className='border-b font-sentinel__SemiBoldItal text-h5 p-7 border-neutral-300'>
//     //       Free Downloads in the video
//     //     </div>
//     //     <div className='p-6 locked_items_list'>
//     //       {post.tutorialManager.downloads && post.tutorialManager.downloads.map((item, index) => {
//     //         return (
//     //           <div className='flex flex-row items-center mb-4' key={index}>
//     //             <div className="locked_icon flex flex-col justify-center items-center border-[1px] border-neutral-400 rounded-lg p-2.5 mr-4">
//     //               <div className='w-[30px]'>
//     //                 {!resourceUser ? <LockedSvg fill={`var(--neutral-600)`} /> : <SquiggleSvg fill={`var(--primary-plum-400)`} />}
//     //               </div>
//     //             </div>
//     //             <div className="flex flex-col items-start justify-start text-left locked_item">
//     //               <div className='text-lg font-semibold text-primary-600'>
//     //                 {item.title}
//     //               </div>
//     //               <button className={!resourceUser ? `text-neutral-500` : `text-primary-500`} onClick={handleDownload(index)}>Download</button>
//     //             </div>
//     //           </div>
//     //         )
//     //       })}
//     //     </div>
//     //   </div>
//     // </div>
//   )
// }