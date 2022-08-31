import type { ReactNode } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { staticImages } from "@App/lib/imgix/data";
import { classNames } from "@App/utils/appUtils";
import CloseSvg from "../svgs/closeSvg";
interface IProps {
  className: string
  closeModal?: () => void
  children: ReactNode
}

/**
 * @Component ModalLayoutWrapperWhite
 * @tested - 6/1/2022
 * 
 * A modal wrapper for a white background rounded corners design
 *
 *
 */
const ModalLayoutWrapperWhite = (props: IProps) => {
  const { children, className, closeModal, ...extras } = props;

  return (
    <div
      {...extras}
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

      <div data-testid="custom-class-mw" className={classNames(
        "bg-white p-5 tablet:p-10 relative overflow-hidden shadow-xxl-grey z-0",
        className
      )}>

        {/* CLOSE BUTTON */}
        {closeModal && <div className="closeBtn w-[38px] h-[38px] rounded-full absolute top-4 right-4 bg-navy-500 p-1">
          <button data-testid="close-btn-mw" name="close-modal" onClick={closeModal}>
            <CloseSvg className="text-navy-50" stroke={'var(--navy-50)'} strokeWidth={3} />
          </button>
        </div>}

        {children}
      </div>

    </div>
  )
}

export default ModalLayoutWrapperWhite