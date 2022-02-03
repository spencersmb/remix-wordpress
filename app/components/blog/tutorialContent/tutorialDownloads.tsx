import React from 'react'
import { Link } from 'remix'
import LockedSvg from '~/components/svgs/lockedSvg'
import SquiggleSvg from '~/components/svgs/squiggleSvg'
import useSite from '~/hooks/useSite'

interface Props {
  post: IPost
}

function TutorialDownloads(props: Props) {
  const { post } = props
  const { state: { user: { resourceUser } } } = useSite()

  function handleDownload(index: number) {
    return () => {
      if (resourceUser && post.tutorialManager.downloads) {
        window.open(post.tutorialManager.downloads[index].freebie.downloadLink, '_blank')
      }
    }
  }

  return (
    <div className='pt-8 mb-8 col-start-2 col-span-2 tablet:col-start-3 tablet:col-span-10 desktop:col-start-4 desktop:col-span-8'>
      <h1>RESOURCE USER: {JSON.stringify(resourceUser)}</h1>
      <div className='flex flex-row rounded-2.5xl overflow-hidden shadow-xs' >
        {/* SIGNUP BLOCK */}
        {!resourceUser && <div className='flex flex-col bg-primary-600 text-primary-50 p-9 max-w-[410px]'>
          <div className='font-sentinel__SemiBoldItal text-5xl mb-4'>
            Tutorial Downloads
          </div>
          <p className='mb-4'>
            Gain access to all tutorial assets for free by joining Tuesday Makers.
          </p>
          <div className='button_container flex flex-row mt-3 items-center mb-6'>
            <div className='mr-4'>
              <Link to={`/tuesday-makers?redirect=${post.slug}`} prefetch='intent' className='btn btn-secondary hover:ring-offset-primary-600 active:ring-offset-primary-600'>Subscribe</Link>
            </div>
            <div>
              <p className='text-primary-300 italic text-sm'>
                This kit available only for Unlimited Access subscribers
              </p>
            </div>
          </div>

          <div className='login'>
            <p className='text-white'>
              Already a member? <Link to='/tuesday-makers/login' prefetch='intent' className='text-warning-300 underline'>Sign In</Link>
            </p>
          </div>
        </div>}

        {/* LOCKED CONTENT */}
        <div className='flex-1 bg-white'>
          <div className='font-sentinel__SemiBoldItal text-h5 p-7 border-b border-neutral-300'>
            Free Downloads in the video
          </div>
          <div className='locked_items_list p-6'>
            {post.tutorialManager.downloads && post.tutorialManager.downloads.map((item, index) => {
              return (
                <div className='flex flex-row items-center mb-4' key={index}>

                  <div className="locked_icon flex flex-col justify-center items-center border-[1px] border-neutral-400 rounded-lg p-2.5 mr-4">
                    <div className='w-[30px]'>
                      {!resourceUser ? <LockedSvg fill={`var(--neutral-400)`} /> : <SquiggleSvg fill={`var(--primary-plum-400)`} />}
                    </div>
                  </div>
                  <div className="locked_item flex flex-col text-left justify-start items-start">
                    <div className='font-medium text-lg text-primary-800'>
                      {item.title}
                    </div>
                    <button className='text-primary-500' onClick={handleDownload(index)}>Download</button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default TutorialDownloads
