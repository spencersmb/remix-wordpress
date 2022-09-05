import { Link } from '@remix-run/react'
import type { IAddFontFunction } from '@App/hooks/useFontPreivew';
import { useProductLicense } from '@App/hooks/useProductLicense'
import GumroadBtn from '../buttons/gumroadBtn'
import LicenseRadioSelect from '../forms/radio/licenseRadioSelect'
import useSite from '@App/hooks/useSite';
import { LicenseEnum } from '@App/enums/products';

interface Props {
  product: IProduct
  addFontToPreview?: IAddFontFunction
  buttonText?: string | undefined
  licenseControl?: {
    licenseState: useProductLicenseState | null,
    handleSelect: (item: { index: number, license: ILicense }) => void
  }
}
/**
 * @Component License Section Control
 * 
 * @describe - Alternate way to select licenses on Product Cards passing in licenseState and handleSelect functions
 * 
 * GETTING AROUND THE GUMROAD PREVIEW ISSUE BY HAVING 2 seperate buttons added and removed from the DOM
 *
 */
function LicenseSelectControls(props: Props) {
  const { state: { metadata } } = useSite()
  const { product, addFontToPreview, buttonText, licenseControl } = props
  // const { licenseState, handleSelect } = licenseControl
  const { licenseState, handleSelect } = useProductLicense(product.productDetails.licences)
  return (
    <div data-testid="licenseSelection" className='flex flex-col flex-1 LicenseSelectControls__wrapper'>

      {/* License Select options */}
      <div className='flex-1 mb-4'>

        {/* View Licenses */}
        <div className='flex flex-row mb-1 ml-2'>
          <div>License Type</div>
          <div className='pt-1 ml-2 text-xs italic font-semibold text-green-700'>
            <Link
              target={'_blank'}
              className='underlined after:underlineAnimation'
              to={'/licenses'}>What are these?</Link>
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
        {licenseState?.licenseType === LicenseEnum.STANDARD && metadata.serverSettings.productPlatform === 'gumroad' &&
          <GumroadBtn
            text={buttonText}
            className=''
            url={licenseState.url} />
        }
        {licenseState?.licenseType === LicenseEnum.EXTENDED && metadata.serverSettings.productPlatform === 'gumroad' &&
          <GumroadBtn
            text={buttonText}
            className=''
            url={licenseState.url} />
        }

        {/* {licenseState && <a href={licenseState.url}>
          <span>Buy Now</span>
        </a>} */}
      </div>
    </div>
  )
}

export default LicenseSelectControls
