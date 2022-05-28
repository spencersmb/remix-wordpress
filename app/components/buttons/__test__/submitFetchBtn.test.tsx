import { render, screen } from "@testing-library/react"
import SubmitFetcherBtn from "../submitFetchBtn"

describe('Submit Fetcher Btn Component', () => {

  const defaultState = {
    state: "idle",
  }
  const submittingState = {
    state: "submitting",
  }
  const loadingState = {
    state: "loading",
  }
  const buttonID = 'submit-fetcher-button'
  const setup = (props: any) => {
    render(<div data-testid="parent">
      <SubmitFetcherBtn {...props} />
    </div>)
  }
  it('Should show no btn', () => {
    setup({
      transition: null
    })
    expect(screen.getByTestId('parent')).toBeEmptyDOMElement()
  })
  it('Should show default state', () => {
    setup(defaultState)
    const btn = screen.getByTestId(buttonID)
    const spinner = screen.queryByLabelText('TwSpinnerOne')
    expect(btn).not.toBeDisabled()
    expect(btn).toHaveTextContent('My Button')
    expect(spinner).toBeNull()
  })

  it('Should show submitting state', () => {
    setup(submittingState)
    const btn = screen.getByTestId(buttonID)
    const spinner = screen.queryByLabelText('TwSpinnerOne')
    expect(btn).toBeDisabled()
    expect(btn).toHaveTextContent('Processing...')
    expect(spinner).toBeInTheDocument()

  })
  it('Should show loading state', () => {
    setup(loadingState)
    const btn = screen.getByTestId(buttonID)
    const spinner = screen.queryByLabelText('TwSpinnerOne')
    expect(btn).toBeDisabled()
    expect(btn).toHaveTextContent('Processing...')
    expect(spinner).toBeInTheDocument()
  })

  it('Should have correct css', () => {
    setup({ ...defaultState, className: 'custom-class' })
    const btn = screen.getByTestId(buttonID)
    expect(btn).toHaveClass('custom-class')
  })

  it('Should have custom btn text', () => {
    setup({ ...defaultState, btnText: 'custom-text' })
    const btn = screen.getByTestId(buttonID)
    expect(btn).toHaveTextContent('custom-text')
  })
})