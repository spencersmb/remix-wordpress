import { Link } from '@remix-run/react'
import React from 'react'
import { Sticky, StickyContainer } from 'react-sticky'
import LockedSvg from '~/components/svgs/lockedSvg'
import SquiggleSvg from '~/components/svgs/squiggleSvg'
import useSite from '~/hooks/useSite'

interface Props {
  post: IPost
  style?: any
}

function TutorialDownloads(props: Props) {

  const { post, style } = props
  const { state: { user: { resourceUser } } } = useSite()

  function handleDownload(index: number) {
    return () => {
      if (resourceUser && post.tutorialManager.downloads) {
        window.open(post.tutorialManager.downloads[index].freebie.downloadLink, '_blank')
      }
    }
  }

  if (!post.tutorialManager.downloads || post.tutorialManager.downloads.length === 0) {
    return null
  }

  return (
    <div className='flex flex-col laptop:flex-col desktop:flex-col rounded-2.5xl overflow-hidden shadow-xs' >
      {/* SIGNUP BLOCK */}
      {!resourceUser && <div className='flex flex-col bg-primary-600 text-primary-50 p-9 tablet:max-w-none desktop:max-w-none'>
        <div className='mb-4 text-5xl font-sentinel__SemiBoldItal'>
          Tutorial Downloads
        </div>
        <p className='mb-4'>
          Gain access to all tutorial assets for free by joining Tuesday Makers.
        </p>
        <div className='flex flex-row items-center mt-3 mb-6 button_container'>
          <div className='mr-4'>
            <Link to={`/tuesday-makers?redirect=${post.slug}`} prefetch='intent' className='btn btn-secondary hover:ring-offset-primary-600 active:ring-offset-primary-600'>Subscribe</Link>
          </div>
          <div>
            <p className='text-sm italic text-primary-200'>
              This kit available only for Unlimited Access subscribers
            </p>
          </div>
        </div>

        <div className='login'>
          <p className='text-white'>
            Already a member? <Link to='/tuesday-makers/login' prefetch='intent' className='font-semibold underline text-primary-300 underline-offset-4 hover:text-teal-400'>Sign In</Link>
          </p>
        </div>
      </div>}

      {/* LOCKED CONTENT */}
      <div className='flex-1 bg-white'>
        <div className='border-b font-sentinel__SemiBoldItal text-h5 p-7 border-neutral-300'>
          Free Downloads in the video
        </div>
        <div className='p-6 locked_items_list'>
          {post.tutorialManager.downloads && post.tutorialManager.downloads.map((item, index) => {
            return (
              <div className='flex flex-row items-center mb-4' key={index}>
                <div className="locked_icon flex flex-col justify-center items-center border-[1px] border-neutral-400 rounded-lg p-2.5 mr-4">
                  <div className='w-[30px]'>
                    {!resourceUser ? <LockedSvg fill={`var(--neutral-600)`} /> : <SquiggleSvg fill={`var(--primary-plum-400)`} />}
                  </div>
                </div>
                <div className="flex flex-col items-start justify-start text-left locked_item">
                  <div className='text-lg font-semibold text-primary-600'>
                    {item.title}
                  </div>
                  <button className={!resourceUser ? `text-neutral-500` : `text-primary-500`} onClick={handleDownload(index)}>Download</button>
                </div>
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