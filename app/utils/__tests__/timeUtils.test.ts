import { countSeconds, countVideoTime } from "../timeUtils"

describe('Utils: Time', () => {
  it('Should valid CountTime string', () => {
    const time = '15:30'
    const result = countVideoTime(time)
    expect(result).toBe('PT15M30S')
  })

  it('Should return default string for no time', () => {
    const result = countVideoTime()
    expect(result).toBe('PT0M0S')
  })

  it('Should convert time into seconds', () => {
    const time = '1:30' // 1 min 30 seconds
    const result = countSeconds(time)
    expect(result).toBe(90)
  })

    it('Should have default time of 0 seconds', () => {
    const result = countSeconds()
    expect(result).toBe(0)
  })
  
})