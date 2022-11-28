interface IRadioProps {
  index: number
  name: string,
  license: ILicense
  checked: boolean
  handleSelected: (item: { index: number, license: ILicense }) => void
}

/**
 * 
 * @component SelectRadio
 * Radio Select option for License Select Radio Group
 * @tested - 5/30/2022
 */
const SelectRadio = ({ checked, index, name, license, handleSelected }: IRadioProps) => {
  const onChange = () => {
    // item: { index: number, license: ILicense }
    handleSelected({
      index,
      license
    })
  }
  return (
    <div className="flex flex-row items-center px-4 transition-all duration-300 cursor-pointer radio form-check group" onClick={onChange}>
      <input
        aria-label={`${license.licenseType} $${license.price}`}
        role={'button'}
        className="float-left w-4 h-4 mr-2 align-top transition-all duration-300 bg-white bg-center bg-no-repeat bg-contain border-2 border-gray-300 rounded-full appearance-none cursor-pointer form-check-input group-hover:border-success-500 checked:bg-success-500 checked:border-success-500 focus:outline-none"
        type="radio" name={`radio-${name}`} id={`box1-${name}`} checked={checked} readOnly />
      <label
        className="flex flex-row items-center justify-between flex-1 text-gray-800 cursor-pointer first-letter:uppercase form-check-label" htmlFor={`box1-${name}`}>
        <span className="transition-all duration-300 first-letter:uppercase group-hover:text-success-600 ">{license.licenseType} </span>
        <span className="text-[22px] font-sentinel__SemiBoldItal text-slate-800 group-hover:text-success-600 transition-all duration-300 ">${license.price}</span>
      </label>
    </div>
  )
}

export default SelectRadio