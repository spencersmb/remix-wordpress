import { useState } from "react"
import usePatternPlayground from "./usePatternProvider"
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
  // 200px - 1000px
  return (
    <div className="relative pt-1">
      <label htmlFor="customRange2" className="form-label">Example range</label>
      <input
        value={patternSize}
        onChange={(e) => {
          const value = parseInt(e.target.value, 10)
          changePatternSize(value)
        }}
        type="range"
        className="w-full h-6 p-0 bg-transparent form-range focus:outline-none focus:ring-0 focus:shadow-none"
        min="200"
        max="1000"
        step={25}
        id="customRange2"
      />
      <div>
        Value: {convertToPercentage(patternSize)}%
      </div>
    </div>
  )
}

export default DzRange