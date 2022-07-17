import LiteYouTubeEmbed from 'react-lite-youtube-embed';
import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css'
interface Props {
  url: string
  id: string
  title: string
}
/**
* @Component YouTubeVideo - USed on BLOG article
* @teststed - 5/28/2022
*/
function YouTubeVideo(props: Props) {
  const { url, title, id } = props
  return (
    <div className='relative mb-8 overflow-hidden shadow-xs youtube_container rounded-2xl'>
      <div className='embed-responsive'>
        <div className='embed-responsive-item'>
          <LiteYouTubeEmbed
            wrapperClass={`h-full bg-contain`}
            id={id} // Default none, id of the video or playlist
            adNetwork={true} // Default true, to preconnect or not to doubleclick addresses called by YouTube iframe (the adnetwork from Google)
            params="" // any params you want to pass to the URL, assume we already had '&' and pass your parameters string
            playlist={false} // Use  true when your ID be from a playlist
            // playlistCoverId="L2vS_050c-M" 
            // The ids for playlists did not bring the cover in a pattern to render so you'll need pick up a video from the playlist (or in fact, whatever id) and use to render the cover. There's a programmatic way to get the cover from YouTube API v3 but the aim of this component is do not make any another call and reduce requests and bandwidth usage as much as possibe
            poster="maxresdefault" // Defines the image size to call on first render as poster image. Possible values are "default","mqdefault",  "hqdefault", "sddefault" and "maxresdefault". Default value for this prop is "hqdefault". Please be aware that "sddefault" and "maxresdefault", high resolution images are not always avaialble for every video. See: https://stackoverflow.com/questions/2068344/how-do-i-get-a-youtube-video-thumbnail-from-the-youtube-api
            title={title} // a11y, always provide a title for iFrames: https://dequeuniversity.com/tips/provide-iframe-titles Help the web be accessible ;)
            noCookie={false} //Default false, connect to YouTube via the Privacy-Enhanced Mode using https://www.youtube-nocookie.com
          />
        </div>
      </div>

    </div>

  )
  // return (
  //   <LiteYoutubeEmbed id={'tZce1wvLzDE'} />
  // )
  // return (
  //   <div className='relative mb-8 overflow-hidden shadow-xs youtube_container rounded-2xl'>
  //     <div className='embed-responsive'>
  //       <div className='embed-responsive-item'>
  //         <iframe
  //           data-testid='youtube_video'
  //           loading='lazy'
  //           frameBorder='0'
  //           src={url}
  //           title={`YouTube video: ${title}`}
  //           allow="accelerometer; picture-in-picture"
  //           allowFullScreen={true} />
  //       </div>
  //     </div>
  //   </div>
  // )
}

export default YouTubeVideo
