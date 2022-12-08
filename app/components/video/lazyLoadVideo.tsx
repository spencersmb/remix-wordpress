import { classNames } from '@App/utils/appUtils'
import type { MutableRefObject } from 'react';
import React, { useEffect, useRef, useState } from 'react'
import { useInView } from 'react-intersection-observer'

interface Props {
  video: string
  className?: string
}
function useVideoInView(videoRef: MutableRefObject<null | HTMLVideoElement>) {
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

  }, [inView, loaded, videoRef])

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
  }, [videoRef])

  return {
    loaded,
    ref
  }
}
/**
 * 
 * @function lazyLoadVideo 
 * @tested - 09/08/2022 
 */
function LazyLoadVideo(props: Props) {
  const { video, className } = props
  const videoRef = useRef<null | HTMLVideoElement>(null)
  const { loaded, ref } = useVideoInView(videoRef)

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
