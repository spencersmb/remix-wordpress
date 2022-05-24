import type { ReactNode } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { staticImages } from "~/lib/imgix/data";
import { classNames } from "~/utils/appUtils";
import CloseSvg from "../svgs/closeSvg";
interface IProps {
  className: string
  closeModal?: () => void
  children: ReactNode
}
const ModalLayoutWrapperWhite = (props: IProps) => {
  const { children, className, closeModal } = props;

  return (
    <div
      className="relative">
      {/* BLACK PIN */}
      <div className="w-[100px] absolute top-[-4%] left-[47%] translate-x-[-50%] z-[1]">
        <LazyLoadImage
          key={'blackPin'}
          alt={'Every Tuesday Hand Made Black Pin'}
          effect="blur"
          placeholderSrc={staticImages.assets.pins.black_1.placeholder}
          src={staticImages.assets.pins.black_1.src}
        />
      </div>

      <div className={classNames(
        "bg-white p-10 relative rounded-2.5xl overflow-hidden shadow-xxl-grey z-0",
        className
      )}>

        {/* CLOSE BUTTON */}
        {closeModal && <div className="closeBtn w-[38px] h-[38px] rounded-full absolute top-4 right-4 bg-navy-500 p-1">
          <button name="close-modal" onClick={closeModal}>
            <CloseSvg className="text-navy-50" stroke={'var(--navy-50)'} strokeWidth={3} />
          </button>
        </div>}
        {children}
      </div>

    </div>
  )
}

export default ModalLayoutWrapperWhite