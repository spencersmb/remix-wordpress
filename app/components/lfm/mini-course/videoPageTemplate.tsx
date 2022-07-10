import React from 'react'

interface Props {
  children?: React.ReactNode
  video: MiniCoureVideoItem
}

function VideoPageTemplate(props: Props) {
  const { video, children } = props

  return (
    <div className='mb-12 et-grid-basic'>

      <div className='col-span-2 col-start-2 tablet:col-start-2 tablet:col-span-12 tablet:px-5 laptop:col-start-3 laptop:col-span-10 laptop:px-5 desktop:col-start-4 desktop:col-span-8'>

        {/* VIDEO */}
        <div className="relative w-full mb-8 content">
          <div className=" embed-responsive-16by9 pb-[56.25%] h-0 block mx-auto text-center">
            <div className="wistia_responsive_padding">
              <div className="wistia_responsive_wrapper"
                style={{ height: '100%', left: '0', position: 'absolute', top: '0', width: '100%' }}>
                <div className={`wistia_embed wistia_async_${video.videoId} videoFoam=true`} style={{ height: ' 100%', width: ' 100%' }}>
                  &nbsp;
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* TITLE */}
        <div className='mb-4 text-3xl font-sentinel__SemiBoldItal'>
          {video.title}
        </div>

        {/* DESCRIPTION */}
        <p className='text-lg tablet:text-xl'>
          {video.description}
        </p>

        {children}
      </div>

    </div>
  )
}

export default VideoPageTemplate
