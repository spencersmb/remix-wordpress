import useProgressiveImage from "@App/hooks/useProgressiveImage"
import { classNames } from "@App/utils/appUtils"
import { useInView } from "react-intersection-observer"

interface Props {
  source: string
  placeholder: string
  bgColor?: string
}

const BackgroundImage = ({ source, placeholder, bgColor = 'bg-white' }: Props) => {
  const { ref, inView, entry } = useInView({
    /* Optional options */
    threshold: 0,
  });
  const loaded = useProgressiveImage(source, inView)
  // const loaded = false

  return (
    <div data-testid={'bgImage'} ref={ref} className="w-full h-full">

      {/* ORIGINAL */}
      {/* <div
        className={classNames(loaded ? 'animate-fadeIn' : 'opacity-1', 'relative w-full bg-no-repeat bg-cover bg-center h-full transition-opacity duration-500 delay-500')}
        style={{ backgroundImage: `url(${loaded || placeholder})` }} /> */}

      {loaded && <div
        className={classNames(loaded ? 'animate-fadeIn' : 'opacity-0', 'w-full bg-no-repeat bg-cover bg-center h-full transition-opacity duration-500 delay-500 absolute left-0 top-0 z-1')}
        style={{ backgroundImage: `url(${loaded})` }} />}
      <div
        className={'opacity-100 w-full bg-no-repeat bg-cover bg-center h-full transition-opacity duration-500 delay-500 absolute left-0 top-0 z-0'}
        style={{ backgroundImage: `url(${placeholder})` }} />

    </div>
  )
}

export default BackgroundImage
