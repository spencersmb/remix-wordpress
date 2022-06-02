import { fireEvent } from "@testing-library/react"
import { renderUi } from "@TestUtils/renderUtils"
import ModalLayoutWrapperWhite from "../modalWrapper-white"

describe('ModalWrapper-White', () => {
  const closeModal = jest.fn()
  const props = {
    className: 'test-class',
  }
  const hasCloseProps = {
    className: 'test-class',
    closeModal
  }
  it('Should have children', () => {
    const { queryByText } = renderUi(
      <ModalLayoutWrapperWhite {...props}>
        <div>test</div>
      </ModalLayoutWrapperWhite>)

    expect(queryByText('test')).toBeTruthy()
  })
  it('Should have no close button', () => {
    const { queryByTestId } = renderUi(
      <ModalLayoutWrapperWhite {...props}>
        <div>test</div>
      </ModalLayoutWrapperWhite>)

    expect(queryByTestId('close-btn-mw')).toBeNull()
  })
  it('Should show close button and call closeModal', () => {
    const { queryByTestId } = renderUi(
      <ModalLayoutWrapperWhite {...hasCloseProps}>
        <div>test</div>
      </ModalLayoutWrapperWhite>)
    const button = queryByTestId('close-btn-mw')
    expect(button).not.toBeNull()
    if (button) {
      fireEvent.click(button)
      expect(closeModal).toHaveBeenCalledTimes(1)
    }
  })
  it('Should show custom class', () => {
    const { queryByTestId } = renderUi(
      <ModalLayoutWrapperWhite data-testid="test" {...hasCloseProps}>
        <div>test</div>
      </ModalLayoutWrapperWhite>)
    const container = queryByTestId('custom-class-mw')
    expect(container).toHaveClass('test-class')
  })
})