import LiteYouTubeEmbed from 'react-lite-youtube-embed';

// /**
// * @Component YouTubeVideo - USed on BLOG article
// * @teststed - 5/28/2022
// */
interface Props {
  url: string
  id: string
  title: string
}
function YouTubeVideo(props: Props) {
  const { url, title, id } = props
  return (
    <div className='relative mb-8 overflow-hidden shadow-xs youtube_container rounded-2xl'>
      <div className='relative embed-responsive'>
        <div data-testid="embed-parent" className='relative embed-responsive-item group hover:cursor-pointer z-2'>
          <LiteYouTubeEmbed
            wrapperClass={`lty-wrapper h-full bg-contain`}
            activatedClass={`lty-activated`}
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
        <div className='absolute top-0 left-0 w-full h-full bg-black z-1' />
      </div>

    </div>
  )
}

export default YouTubeVideo
