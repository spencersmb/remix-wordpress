import { useState } from "react"
import usePatternPlayground from "../usePatternProvider"
interface IProps {
  defaultState: number
  changeSize: (size: number) => void
}
const DzRange = () => {
  const { state: { patternSize }, changePatternSize } = usePatternPlayground()
  // const [value, setValue] = useState(0)
  function convertToPercentage(num: number) {
    return Math.ceil((((num - 200) / (1000 - 200)) * 100));
  }
  return (
    <div className="relative flex flex-row py-3 px-4 text-sm font-semibold bg-[#F0EEED] rounded-lg">
      <label htmlFor="customRange2" className="form-label">Tile Size</label>
      <input
        value={patternSize}
        onChange={(e) => {
          const value = parseInt(e.target.value, 10)
          changePatternSize(value)
        }}
        type="range"
        className="flex-1 w-full p-0 mx-10 rounded-sm outline-none focus:outline-none focus:ring-0 focus:shadow-none"
        min="200"
        max="1000"
        step={25}
        id="customRange2"
      />
      <div>
        {convertToPercentage(patternSize)}%
      </div>
    </div>
  )
}

export default DzRange