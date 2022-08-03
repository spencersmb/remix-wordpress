import useProgressiveImage from "@App/hooks/useProgressiveImage"
import { classNames } from "@App/utils/appUtils"
import { useInView } from "react-intersection-observer"

interface Props {
  source: string
  placeholder: string
}
const BackgroundImage = ({ source, placeholder }: Props) => {
  const { ref, inView, entry } = useInView({
    /* Optional options */
    threshold: 0,
  });
  const loaded = useProgressiveImage(source, inView)
  // const loaded = false

  return (
    <div ref={ref} className="w-full h-full bg-green-400">
      <div
        className={classNames(loaded ? 'animate-fadeIn' : 'opacity-1', 'relative w-full bg-no-repeat bg-cover bg-center h-full transition-opacity duration-500 delay-500')}
        style={{ backgroundImage: `url(${loaded || placeholder})` }} />
    </div>
  )
}

export default BackgroundImage
