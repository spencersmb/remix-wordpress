import { Link } from "remix";
import { LicenseEnum } from "@App/enums/products";
import { getLicense } from "@App/utils/posts";
import GumroadBtn from "../buttons/gumroadBtn";
import CloseSvg from "../svgs/closeSvg";
import useSite from "@App/hooks/useSite";
import { ArrowRightIcon } from "@heroicons/react/solid";
import FloralSvgOneBot from "../svgs/florals/floralSimeplBottomSvg";
import FloralSvgOneTop from "../svgs/florals/floralSimpleTopSvg";

interface IProps {
  closeModal: () => void
  download_link: string
  product: IProduct | null
}

/**
 * @Component PaidProductPopUp
 * @tested - 6/2/2022
 * 
 * A modal that pops up when a user clicks on a freebie that has a paid product associated with it
 *
 */
const PaidProductPopUp = ({ download_link, product, closeModal }: IProps) => {
  const { state: { metadata } } = useSite()
  const download = () => {
    window.open(download_link, "_blank");
  }
  if (!product) {
    return <div>
      no product found
    </div>
  }

  const extendedLicense = getLicense(product.productDetails.licences, LicenseEnum.EXTENDED)

  return (
    <div data-testid="paid-product-popup" className="bg-white w-[100vw] mx-auto shadow-et_4 py-10 px-5 tablet:p-10 max-w-[500px]">

      {/* SVG TOP */}
      <div className="absolute z-1 top-[-80px] right-[-70px] w-[150px] tablet:top-[-110px] tablet:right-[-100px] tablet:w-[200px] tablet:rotate-[-14deg]">
        <FloralSvgOneBot />
      </div>

      {/* SVG TOP */}
      <div className="absolute z-1 bottom-[-80px] left-[-70px] w-[150px] tablet:bottom-[-120px] tablet:left-[-100px] tablet:w-[280px]">
        <FloralSvgOneTop />
      </div>

      {/* TOP HEADER */}
      <div className="relative flex">
        <div className="flex-1">
          <p className="text-sm font-semibold text-sage-700">Sample Freebie</p>
        </div>
        {/* <div className="absolute top-[-20px] right-[-10px] tablet:right-[-20px]">
          <div data-testid="close-modal" onClick={closeModal} className="w-[38px] h-[38px] bg-sage-400 rounded-full cursor-pointer p-1">
            <CloseSvg stroke="var(--sage-50" strokeWidth='4' />
          </div>
        </div> */}
      </div>
      <div className="mt-10 tablet:pr-5">
        <h2 className="text-4xl font-sentinel__SemiBoldItal text-sage-800 mb-7">{product.title}</h2>
      </div>
      <p className="mb-8 text-lg text-sage-700">This item is part of a full set that can be purchased if you want to take full advantage of all it’s elements.</p>
      <div className="relative flex flex-col z-2">
        {(metadata.serverSettings.productPlatform === 'gumroad' && extendedLicense) &&
          <div className="mb-4">
            <GumroadBtn
              stackOnMobile={true}
              price={extendedLicense.price}
              url={extendedLicense.url}
              text='Buy Now'
              viewBtnClassName='btn btn-xl bg-sage-400 hover:bg-sage-500 text-sage-50 btn-flex border-sage-400 hover:border-sage-500'
            />
          </div>
        }
        <div className="mt-4">
          <button className="flex flex-row items-center justify-center mx-auto font-semibold text-sage-700 hover:text-sage-500" onClick={download}>
            <span>Continue with free download</span>
            <span className="w-[20px] ml-2"><ArrowRightIcon /></span>
          </button>
        </div>

      </div>
    </div>
  )
}

export default PaidProductPopUp
