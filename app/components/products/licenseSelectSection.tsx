import React from 'react'
import { Link } from 'remix'
import useFontPreview, { IAddFontFunction } from '~/hooks/useFontPreivew'
import { useProductLicense } from '~/hooks/useProductLicense'
import LicenseRadioSelect from '../forms/licenseRadioSelect'

interface Props {
  product: IProduct
  addFontToPreview?: IAddFontFunction
}

function LicenseSelectSection(props: Props) {
  const { product, addFontToPreview } = props
  const { licenseState, handleSelect } = useProductLicense(product.details.licences)
  return (
    <div>

      {/* License Select options */}
      <div>

        {/* View Licenses */}
        <div>
          <div>License Type</div>
          <div><Link to={'/'}>View Licenses</Link></div>
        </div>

        {/* License Select */}
        {licenseState && <div>
          <LicenseRadioSelect
            product={product}
            state={licenseState}
            handleSelected={handleSelect} />
        </div>}

      </div>

      {/* Buttons Container */}
      <div>
        {/* FONT PREVIEW  */}
        <div>
          {addFontToPreview && <button onClick={addFontToPreview(product.details.font.name)}>Preview Font</button>}
        </div>
        {/* PRODUCT BUY NOW */}
        {licenseState && <a href={licenseState.url}>
          <span>Buy Now</span>
        </a>}
      </div>
    </div>
  )
}

export default LicenseSelectSection
