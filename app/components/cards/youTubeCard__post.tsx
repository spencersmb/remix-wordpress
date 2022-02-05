import React from 'react'

interface Props {
  url: string
  title: string
}

function YouTubeCard__Post(props: Props) {
  const { url, title } = props

  return (
    <div className='youtube_container overflow-hidden rounded-2xl relative'>
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

export default YouTubeCard__Post
