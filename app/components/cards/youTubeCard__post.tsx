import React from 'react'

interface Props {
  url: string
  title: string
}
/**
* @Component YouTubeVideo - USed on BLOG article
* @teststed - 5/28/2022
*/
function YouTubeVideo(props: Props) {
  const { url, title } = props

  return (
    <div className='relative mb-8 overflow-hidden shadow-xs youtube_container rounded-2xl'>
      <div className='embed-responsive'>
        <div className='embed-responsive-item'>
          <iframe
            data-testid='youtube_video'
            loading='lazy'
            frameBorder='0'
            src={url}
            title={`YouTube video: ${title}`}
            allow="accelerometer; picture-in-picture"
            allowFullScreen={true} />
        </div>
      </div>
    </div>
  )
}

export default YouTubeVideo
