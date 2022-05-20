import type { ReactNode } from "react";
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
        <img src="/images/black-pin.png" alt="Every-Tuesday Black Pin" />
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