import { classNames } from '@App/utils/appUtils'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useInView } from 'react-intersection-observer'

interface Props {
  sources: {
    url: string
    media: string
  }[],
  alt?: string
  className?: string
}

// CURRENTLY NOT USED
function LazyLoadPicture(props: Props) {
  const { sources, alt, className } = props

  const [inViewRef, inView] = useInView()
  const [loaded, setLoaded] = useState(false)
  const ref = useRef<null | HTMLPictureElement>();
  useEffect(() => {
    if (inView) {
      setLoaded(true)

      if (ref.current) {
        const children = ref.current.children
        Array.from(children).forEach(child => {
          console.log('child', child);
          if (child instanceof HTMLSourceElement) {
            const src = child.getAttribute('data-srcset')
            if (src) {
              child.setAttribute('srcset', src)
            }
          }
          if (child instanceof HTMLImageElement) {
            const src = child.getAttribute('data-srcset')
            if (src) {
              child.setAttribute('src', src)
            }
          }
        })
      }

    }
  }, [inView])

  const setRefs = useCallback(
    (node: any) => {
      // Ref's from useRef needs to have the node assigned to `current`
      ref.current = node;
      // Callback refs, like the one from `useInView`, is a function that takes the node as an argument
      inViewRef(node);
    },
    [inViewRef],
  );

  return (
    <picture
      ref={setRefs}
      className="">
      {sources.map((source, index) => {
        return (
          <source
            key={index}
            data-srcset={source.url}
            media={source.media}
          />
        )
      })}
      {/* {loaded && sources.length > 0 && <img
        className={classNames(className ? className : '', 'animate-fadeIn')}
        src={sources[0].url} alt={alt ? alt : 'Every-Tuesday Picture'} />} */}
      <img
        className={classNames(className ? className : '', 'animate-fadeIn')}
        data-srcset={sources[0].url}
        src=""
        alt={alt ? alt : 'Every-Tuesday Picture'}
      />
    </picture>
  )
}

export default LazyLoadPicture
