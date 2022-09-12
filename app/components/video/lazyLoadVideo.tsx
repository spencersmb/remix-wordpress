import { classNames } from '@App/utils/appUtils'
import React, { useEffect, useRef, useState } from 'react'
import { useInView } from 'react-intersection-observer'

interface Props {
  video: string
  className?: string
}

/**
 * 
 * @function lazyLoadVideo 
 * @tested - 09/08/2022 
 */
function LazyLoadVideo(props: Props) {
  const { video, className } = props
  const videoRef = useRef<null | HTMLVideoElement>(null)
  const [loaded, setLoaded] = useState<boolean>(false)
  const { ref, inView, entry } = useInView({
    /* Optional options */

    threshold: 0,
  });

  useEffect(() => {

    if (inView && videoRef.current && !loaded) {

      const sources = Array.from(videoRef.current.children)

      sources.forEach((source) => {
        if (typeof source.tagName === "string" && source.tagName === "SOURCE") {
          // @ts-ignore
          source.src = source.dataset.src
        }
      })
      // @ts-ignore
      videoRef.current.load()
      setLoaded(true)
    }

  }, [inView, loaded])

  // USED FOR TESTING
  useEffect(() => {
    if (process.env.NODE_ENV === 'test' && videoRef.current) {
      const sources = Array.from(videoRef.current.children)

      sources.forEach((source) => {
        if (typeof source.tagName === "string" && source.tagName === "SOURCE") {
          // @ts-ignore
          source.src = source.dataset.src
        }
      })

      // TESTING ENV DOESN"T LiKE LOADING
      // @ts-ignore
      // videoRef.current.load()
      setLoaded(true)
    }
  }, [])

  return (
    <div
      ref={ref}
      className={classNames(className ? className : '', 'lazyLoad-video')}>
      <video
        data-testid='lazyLoadVideo'
        ref={videoRef}
        className={classNames(loaded ? 'opacity-100' : 'opacity-0', 'transition-opacity duration-600 ease-in-out delay-300')}
        autoPlay={true}
        muted={true}
        loop
        playsInline
      >
        <source data-src={video} type="video/mp4" />
      </video>
    </div>
  )
}

export default LazyLoadVideo
