import { fireEvent, waitFor } from "@testing-library/react"
import { renderUi } from "@TestUtils/renderUtils"
import MakersLoginModal from "../makersLoginModal"

describe('Makers Login Modal', () => {
  const closeModal = jest.fn()
  const openSignUpModal = jest.fn()
  const props = {
    closeModal,
    openSignUpModal
  }

  it('Should show welcome text', () => {
    const { getByTestId } = renderUi(
      <MakersLoginModal {...props} />
    )

    const modal = getByTestId('test-tuesdayMakersLoginModal')
    expect(modal).toHaveTextContent('Welcome Back!')
    expect(modal).toHaveTextContent('The Tuesday Makers Library is constantly growing with new assets uploaded weekly.')

  })

  it('Should show sign up text', () => {
    const { getByTestId } = renderUi(
      <MakersLoginModal {...props} />
    )

    const modal = getByTestId('test-tuesdayMakersLoginModal')
    expect(modal).toHaveTextContent('Not a subscriber?')
    expect(modal).toHaveTextContent('Create an account!')

  })

  it('Should call prop functions', async () => {
    const { getByText } = renderUi(
      <MakersLoginModal {...props} />
    )

    const button = getByText('Create an account!')
    expect(button).toHaveTextContent('Create an account!')
    fireEvent.click(button)
    expect(closeModal).toHaveBeenCalled()
    await waitFor(() => {
      expect(openSignUpModal).toHaveBeenCalled()
    }, { timeout: 500 })

  })

})