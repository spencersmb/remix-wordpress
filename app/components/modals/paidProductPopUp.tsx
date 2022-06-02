import { Link } from "remix";
import { LicenseEnum } from "@App/enums/products";
import { getLicense } from "@App/utils/posts";
import GumroadBtn from "../buttons/gumroadBtn";
import CloseSvg from "../svgs/closeSvg";
import useSite from "@App/hooks/useSite";

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
    <div data-testid="paid-product-popup" className="bg-primary-800 shadow-et_4 rounded-2.5xl p-10 max-w-[500px]">
      {/* TOP HEADER */}
      <div className="relative flex">
        <div className="flex-1">
          <p className="text-lg text-secondary-400">Sample Freebie</p>
        </div>
        <div className="absolute top-[-20px] right-[-20px]">
          <div data-testid="close-modal" onClick={closeModal} className="w-[38px] h-[38px] bg-neutral-700 rounded-full cursor-pointer p-1">
            <CloseSvg stroke="#A1929A" strokeWidth='4' />
          </div>
        </div>
      </div>
      <div className="pr-5 mt-10">
        <h2 className="text-4xl font-sentinel__SemiBoldItal text-neutral-50 mb-7">{product.title}</h2>
      </div>
      <p className="mb-8 text-neutral-50">This item is part of a full set that can be purchased if you want to take full advantage of all it’s elements.</p>
      <div className="flex flex-row">
        <button className="mr-4 btn btn-primary-300 ring-offset-primary-800" onClick={download}>Free Download</button>
        {(metadata.serverSettings.productPlatform === 'gumroad' && extendedLicense) &&
          <GumroadBtn
            className="font-semibold btn ring-offset-primary-800"
            price={extendedLicense.price}
            url={extendedLicense.url}
            text='Quick View'
          />}
      </div>
    </div>
  )
}

export default PaidProductPopUp
