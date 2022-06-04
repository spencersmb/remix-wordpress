import SelectRadio from "./radioSelect"

interface IProps {
  product: IProduct
  handleSelected: (item: { index: number, license: ILicense }) => void
  state: useProductLicenseState
}

/**
 * 
 * @component LicenseRadioSelect
 * @tested - 5/30/2022
 */
const LicenseRadioSelect = ({ state, product, handleSelected }: IProps) => {

  if (!product.productDetails.licences) {
    return (
      <div>
        No Licenses Available
      </div>
    )
  }

  return (
    <div
      data-testid="license-radio-select"
      className="flex flex-col rounded-xl border-[1px] border-sage-200 p-4">
      {product.productDetails.licences.map((license, index) => {
        return (
          <SelectRadio
            key={index}
            checked={license.licenseType === state.licenseType}
            name={`license-${product.slug}-${license.licenseType}`}
            index={index}
            license={license}
            handleSelected={handleSelected} />
        )
      })}
    </div>
  )
}
export default LicenseRadioSelect
