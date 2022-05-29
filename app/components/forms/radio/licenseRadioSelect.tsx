
interface IProps {
  product: IProduct
  handleSelected: (item: { index: number, license: ILicense }) => void
  state: any
}
const LicenseRadioSelect = ({ state, product, handleSelected }: IProps) => {

  if (!product.productDetails.licences) {
    return (
      <div>
        No Licenses Available
      </div>
    )
  }

  return (
    <div className="flex flex-col rounded-xl border-[1px] border-sage-200 p-4">
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

interface IRadioProps {
  index: number
  name: string,
  license: ILicense
  checked: boolean
  handleSelected: (item: { index: number, license: ILicense }) => void
}
const SelectRadio = ({ checked, index, name, license, handleSelected }: IRadioProps) => {
  const onChange = () => {
    // item: { index: number, license: ILicense }
    handleSelected({
      index,
      license
    })
  }
  return (
    <div className="flex flex-row items-center mb-2 form-check last:mb-0" onClick={onChange}>
      <input className="float-left w-4 h-4 mr-2 align-top transition duration-200 bg-white bg-center bg-no-repeat bg-contain border-2 border-gray-300 rounded-full appearance-none cursor-pointer form-check-input checked:bg-success-500 checked:border-success-500 focus:outline-none" type="radio" name={`radio-${name}`} id={name} checked={checked} readOnly />
      <label aria-label="license-radio" className="flex flex-row justify-between flex-1 text-lg text-gray-800 first-letter:uppercase form-check-label" htmlFor={`box1-${name}`}>
        <span className="first-letter:uppercase">{license.licenseType}</span>
        <span className="text-[22px] font-sentinel__SemiBoldItal text-slate-800">${license.price}</span>
      </label>
    </div>
  )
}