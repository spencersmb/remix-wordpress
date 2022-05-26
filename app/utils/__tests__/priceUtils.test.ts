import { formatePrice } from "../priceUtils.server"


/**
 * @jest-environment node
 */
describe('priceUtils.server', () => {
  it('Should formate the number correctly', () => {

    // normal number
    expect(formatePrice(12.25)).toBe('$12.25')
    expect(formatePrice(12.00, true)).toBe('$12')

})
})