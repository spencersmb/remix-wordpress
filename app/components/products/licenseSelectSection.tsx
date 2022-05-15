import React from 'react'
import { Link } from 'remix'
import useFontPreview, { IAddFontFunction } from '~/hooks/useFontPreivew'
import { useProductLicense } from '~/hooks/useProductLicense'
import GumroadBtn from '../buttons/gumroadBtn'
import LicenseRadioSelect from '../forms/licenseRadioSelect'

interface Props {
  product: IProduct
  addFontToPreview?: IAddFontFunction
}

function LicenseSelectSection(props: Props) {
  const { product, addFontToPreview } = props
  const { licenseState, handleSelect } = useProductLicense(product.details.licences)
  return (
    <div className='flex flex-col flex-1 LicenseSelectSection__wrapper'>

      {/* License Select options */}
      <div className='flex-1 mb-4'>

        {/* View Licenses */}
        <div className='flex flex-row mb-3 ml-2'>
          <div>License Type</div>
          <div className='ml-2 text-sm italic font-semibold text-success-500'>
            <Link className='underlined underlined-active' to={'/'}>View Licenses</Link>
          </div>
        </div>

        {/* License Select */}
        {licenseState && <LicenseRadioSelect
          product={product}
          state={licenseState}
          handleSelected={handleSelect} />
        }

      </div>

      {/* Buttons Container */}
      <div className='flex items-end button_container'>
        {/* FONT PREVIEW  */}
        <div>
          {addFontToPreview && <button onClick={addFontToPreview(product.details.font.name)}>Preview Font</button>}
        </div>

        {/* PRODUCT BUY NOW */}
        {licenseState &&
          <GumroadBtn
            className='py-[13px] font-normal text-center btn'
            url={licenseState.url} />}

        {/* {licenseState && <a href={licenseState.url}>
          <span>Buy Now</span>
        </a>} */}
      </div>
    </div>
  )
}

export default LicenseSelectSection
