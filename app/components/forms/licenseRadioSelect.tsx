
interface IProps {
  product: IProduct
  handleSelected: (item: { index: number, license: ILicense }) => void
  state: any
}
const LicenseRadioSelect = ({ state, product, handleSelected }: IProps) => {

  if (!product.details.licences) {
    return (
      <div>
        No Licenses Available
      </div>
    )
  }

  return (
    <div className="flex justify-start">
      <div>
        {product.details.licences.map((license, index) => {
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
    console.log('changed')
    handleSelected({
      index,
      license
    })
  }
  return (
    <div className="form-check">
      <input className="float-left w-4 h-4 mt-1 mr-2 align-top transition duration-200 bg-white bg-center bg-no-repeat bg-contain border border-gray-300 rounded-full appearance-none cursor-pointer form-check-input checked:bg-blue-600 checked:border-blue-600 focus:outline-none" type="radio" name={`radio-${name}`} id={name} onChange={onChange} checked={checked} />
      <label className="inline-block text-gray-800 first-letter:uppercase form-check-label" htmlFor={`box1-${name}`}>
        <span>{license.licenseType} License</span>
        <span>${license.price}</span>
      </label>
    </div>
  )
}