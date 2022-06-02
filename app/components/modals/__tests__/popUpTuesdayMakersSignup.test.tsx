import { fireEvent } from "@testing-library/react"
import { renderUi } from "@TestUtils/renderUtils"
import TuesdayMakersSignUpModal from "../popUpTuesdayMakersSignUp"

describe('TuesdayMakers SignUp Modal', () => {
  const closeModal = jest.fn()
  const props = {
    closeModal
  }

  // Form is disable because of Fetcher
  it('Should Show Signup Text', () => {
    const { queryByText, parent } = renderUi(
      <TuesdayMakersSignUpModal {...props} />
    )
    expect(parent).toHaveTextContent('Join the Tuesday Makers')
    expect(parent).toHaveTextContent('Get access to all the tutorial downloads for free. Plus, access our incredible library with over 200 assets!')
  })
  it('Should Show Confirmation Text + call testAnimation fn + call closeModal', () => {
    const { queryByText, parent, getByText } = renderUi(
      <TuesdayMakersSignUpModal {...props} />
    )
    const button = queryByText('Test Animation')
    expect(button).not.toBeNull()
    if (button) {
      fireEvent.click(button)
      expect(parent).toHaveTextContent('Success!')
      expect(parent).toHaveTextContent('Check your email and click the link inside to confirm your new account.')

      const closeBtn = getByText('Got it!')
      fireEvent.click(closeBtn)
      expect(closeModal).toHaveBeenCalledTimes(1)
    }
  })
})