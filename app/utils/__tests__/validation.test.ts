import { validateEmail } from "../validation"

describe('Utils: Validation', () => {
  it('Should return false if invalid email', () => {
    const emailAddress = 'spencer.bigum@gmail.com'
    const invalidEmail = Boolean(typeof validateEmail(emailAddress) === 'string')
    expect(invalidEmail).toBe(false)
  })
  it('Should return true if valid email', () => {
    const emailAddress = 'spencer.bigum'
    const validEmail = Boolean(typeof validateEmail(emailAddress) === 'string')
    expect(validEmail).toBe(true)
  })
})