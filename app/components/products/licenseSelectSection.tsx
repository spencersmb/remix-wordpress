import { Link } from '@remix-run/react'
import type { IAddFontFunction } from '@App/hooks/useFontPreivew';
import { useProductLicense } from '@App/hooks/useProductLicense'
import GumroadBtn from '../buttons/gumroadBtn'
import LicenseRadioSelect from '../forms/radio/licenseRadioSelect'
import useSite from '@App/hooks/useSite';

interface Props {
  product: IProduct
  addFontToPreview?: IAddFontFunction
}
/**
 * @Component License Section Component
 * @tested - 6/2/2022
 * 
 * Main way to select licenses on Product Cards
 *
 */
function LicenseSelectSection(props: Props) {
  const { state: { metadata } } = useSite()
  const { product, addFontToPreview } = props
  const { licenseState, handleSelect } = useProductLicense(product.productDetails.licences)
  return (
    <div data-testid="licenseSelection" className='flex flex-col flex-1 LicenseSelectSection__wrapper'>

      {/* License Select options */}
      <div className='flex-1 mb-4'>

        {/* View Licenses */}
        <div className='flex flex-row mb-3 ml-2'>
          <div>License Type</div>
          <div className='ml-2 text-sm italic font-semibold text-success-500'>
            <Link className='underlined underlined-active' to={'/license-types'}>What are these?</Link>
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
          {addFontToPreview && <button onClick={addFontToPreview(product.productDetails.font.name)}>Preview Font</button>}
        </div>

        {/* PRODUCT BUY NOW */}
        {licenseState && metadata.serverSettings.productPlatform === 'gumroad' &&
          <GumroadBtn
            className='py-[13px] font-normal text-center btn'
            url={licenseState.url} />
        }

        {/* {licenseState && <a href={licenseState.url}>
          <span>Buy Now</span>
        </a>} */}
      </div>
    </div>
  )
}

export default LicenseSelectSection
