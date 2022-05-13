import { useState } from 'react'
import { getLicense } from '~/utils/posts'
import SelectBox from '../forms/licenseSelectDropdown'
import QuestionMarkCircleSvg from '../svgs/questionMarkCircleSvg'
import ShoppingCartSvg from '../svgs/shoppingCartSvg'
import SvgBorderIconWrapper from '../svgs/svgBorderWrapper'
import { LicenseEnum } from "~/enums/products"
import GumroadBtn from '~/components/buttons/gumroadBtn'


interface Props {
  index: number
  product: IProduct
  multipleProducts: boolean
}
/*
  * @Component ProductCard__sm -- ProductCard for BLOG article purchases
*/

function ProductCard__sm(props: Props) {
  const { index, product, multipleProducts } = props
  const [selectedLicenseType, setSelected] = useState<LicenseEnum>(LicenseEnum.STANDARD)

  // reduce the array to a single object matching the selected State LicenseEnum
  const selectedLicense = getLicense(product.details.licences, selectedLicenseType)

  function handleSelect(item: { index: number, license: ILicense }) {
    setSelected(item.license.licenseType)
  }

  function handleViewLicense() {
    console.log('view license');
  }

  // if multiple products, we need to set extra CSS Styles
  const odd = index % 2 === 0
  const cssMargin = odd ? 'tablet:mr-4' : 'tablet:ml-4'

  if (!selectedLicense) {
    return null
  }

  return (
    <div className={`mb-8 flex ${multipleProducts ? 'flex-[0_1_50%]' : 'laptop:mb-0 laptop:flex-[0_1_41%]'}`}>
      <div className={`wrapper bg-white flex-1 rounded-2.5xl shadow-xs p-6 pb-4 laptop:mb-0 ${multipleProducts ? cssMargin : ''}`}>

        {/* PRODUCT HEADER */}
        <div className="flex flex-row items-center mb-6 product_header">
          <SvgBorderIconWrapper classes={`mr-3 laptop:mr-6 ${multipleProducts ? 'tablet:hidden laptop:block' : ''}`}>
            <ShoppingCartSvg stroke={`#976969`} />
          </SvgBorderIconWrapper>
          <h5 className={`flex flex-col text-2xl font-sentinel__SemiBoldItal laptop:text-h5 ${multipleProducts ? 'tablet:max-w-[237px]' : ''}`}>
            {product.title}
          </h5>
        </div>

        {/* PRODUCT SELECT */}
        <div>
          <SelectBox handleSelected={handleSelect} selected={selectedLicenseType} data={product.details} />
        </div>

        {/* PRODUCT BUY NOW */}
        <div className="flex flex-col flex-1 mt-4">

          {/* {product.details.type === 'gumroad' && <GumroadBtn price={selectedLicense.price} url={selectedLicense.url} />} */}

          <div onClick={handleViewLicense} className="flex flex-row justify-center mt-4 hover:cursor-pointer">
            <span className="w-[22px] mr-1"><QuestionMarkCircleSvg fill={`#ACA4A9`} /></span>
            <p className="flex-1">View License Details</p>
          </div>

        </div>
      </div>
    </div>
  )
}

export default ProductCard__sm
