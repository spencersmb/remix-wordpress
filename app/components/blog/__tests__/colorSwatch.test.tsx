import { fireEvent, render, screen } from "@testing-library/react"
import ColorSwatches from "../tutorialContent/colorSwatches"

const defaultProps = {
  multipleLayout: false,
  downloadUrl: 'https://www.google.com'
}
const setup = (props: { multipleLayout: boolean, downloadUrl: string }) => {
  render(<ColorSwatches {...props} />)
  const element = screen.getByTestId('test-colorSwatch')
  const button = screen.getByTestId('test-CircularStrokeBtn')
  return {
    element,
    button
  }
}

describe('Colorswatch component test', () => {
  it('Should show correct headline text', () => {
    const { element } = setup(defaultProps)
    expect(element).toHaveTextContent('Free Color Swatches')
  })

  it('Should show correct body copy', () => {
    const { element } = setup(defaultProps)
    expect(element).toHaveTextContent('Download the free clolor swatches instantly for this tutorial!')
  })

  it('Should call window.open with correct url', () => {
    window.open = jest.fn()
    const { button } = setup(defaultProps)
    fireEvent.click(button)
    expect(window.open).toHaveBeenCalledWith(defaultProps.downloadUrl, '_blank')
    expect(window.open).toHaveBeenCalledTimes(1)
  })
})