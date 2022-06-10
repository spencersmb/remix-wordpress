import { fireEvent, render, screen } from "@testing-library/react"
import OutlinedButton from "../outlinedButton"

interface Props {
  clickHandler: any
  loading: boolean
  text: string
  loadingText: string
  className?: string
}
describe('Outline Button Component', () => {
  const setup = (props: Props) => {
    render(<OutlinedButton {...props} />)
  }
  it('Should have correct CSS', () => {
    setup({
      clickHandler: () => { },
      loading: false,
      text: 'test',
      loadingText: 'loading',
      className: 'test'
    })
    const button = screen.getByTestId('button')
    expect(button).toHaveClass('test')

  })

  // Example of how to test an element that isn't in the DOM
  it('Should show non-loading state', () => {
    setup({
      clickHandler: () => { },
      loading: false,
      text: 'test',
      loadingText: 'loading',
      className: 'test'
    })
    const spinner = screen.queryByLabelText('TwSpinnerOne')
    const button = screen.queryByTestId('button')
    expect(spinner).toBeNull()
    expect(button).toHaveTextContent('test')
    expect(button).not.toBeDisabled()

  })

  it('Should show loading state / be disabled', () => {
    const clickHandler = jest.fn()
    setup({
      clickHandler,
      loading: true,
      text: 'test',
      loadingText: 'loading',
      className: 'test'
    })
    const spinner = screen.queryByLabelText('TwSpinnerOne')
    const button = screen.getByTestId('button')
    expect(spinner).toBeTruthy()
    expect(button).toHaveTextContent('loading')
    expect(button).toBeDisabled()

  })

  it('Should call clickhandler', () => {
    const clickHandler = jest.fn()
    setup({
      clickHandler,
      loading: false,
      text: 'test',
      loadingText: 'loading',
      className: 'test'
    })
    const button = screen.getByTestId('button')
    fireEvent.click(button)
    expect(clickHandler).toHaveBeenCalledTimes(1)
  })
})