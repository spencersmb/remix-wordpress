import type { ReactNode } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { staticImages } from "@App/lib/imgix/data";
import { classNames } from "@App/utils/appUtils";
import CloseSvg from "../svgs/closeSvg";
import FloralSvgOneBot from "../svgs/florals/floralSimeplBottomSvg";
import FloralSvgOneTop from "../svgs/florals/floralSimpleTopSvg";
interface IProps {
  className: string
  showFlorals: boolean
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
// TOOD: TEST showFlorals
const ModalLayoutWrapperWhite = (props: IProps) => {
  const { children, className, closeModal, showFlorals, ...extras } = props;

  return (
    <div
      {...extras}
      // data-testid="custom-class-mw"
      className={classNames(className ? className : '', 'relative w-[100vw] max-w-[440px] mx-auto')}>
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

      {/* SVG TOP */}
      {showFlorals &&
        <div className="absolute z-1 top-[-80px] right-[-70px] w-[150px] tablet:top-[-110px] tablet:right-[-100px] tablet:w-[200px] tablet:rotate-[-14deg]">
          <FloralSvgOneBot />
        </div>
      }

      {/* SVG TOP */}
      {showFlorals &&
        <div className="absolute z-1 bottom-[-80px] left-[-70px] w-[150px] tablet:bottom-[-120px] tablet:left-[-100px] tablet:w-[280px]">
          <FloralSvgOneTop />
        </div>
      }

      <div className={classNames(
        "p-5 tablet:p-10 relative overflow-hidden shadow-xxl-grey z-3"
      )}>

        {/* CLOSE BUTTON */}
        {/* {closeModal && <div className="closeBtn w-[38px] h-[38px] rounded-full absolute top-4 right-4 bg-sage-500 p-1">
          <button data-testid="close-btn-mw" name="close-modal" onClick={closeModal}>
            <CloseSvg stroke={'var(--sage-50)'} strokeWidth={3} />
          </button>
        </div>} */}

        {children}

      </div>

    </div>
  )
}

export default ModalLayoutWrapperWhite