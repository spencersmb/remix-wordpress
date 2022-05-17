import React from 'react'

interface Props {
  url: string
  title: string
}

function YouTubeVideo(props: Props) {
  const { url, title } = props

  return (
    <div className='relative mb-8 overflow-hidden youtube_container rounded-2xl'>
      <div className='embed-responsive'>
        <div className='embed-responsive-item'>
          <iframe
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
