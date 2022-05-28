import type { Transition } from "@remix-run/react/transition"
import { render, screen } from "@testing-library/react"
import SubmitBtn from "../submitBtn"

describe('Submit Btn Component', () => {
  const idleTransition: Transition = {
    state: "idle",
    type: "idle",
    submission: undefined,
    location: undefined,
  }
  const defaultState = {
    transition: idleTransition,
  }
  const submittingState = {
    transition: {
      state: "submitting",
      type: "actionSubmission",
      submission: undefined,
      location: undefined,
    }
  }
  const loadingState = {
    transition: {
      state: "loading",
      type: "actionSubmission",
      submission: undefined,
      location: undefined,
    }
  }
  const setup = (props: any) => {
    render(<div data-testid="parent">
      <SubmitBtn {...props} />
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
    const btn = screen.getByTestId('submit-button')
    const spinner = screen.queryByLabelText('TwSpinnerOne')
    expect(btn).not.toBeDisabled()
    expect(btn).toHaveTextContent('My Button')
    expect(spinner).toBeNull()
  })

  it('Should show submitting state', () => {
    setup(submittingState)
    const btn = screen.getByTestId('submit-button')
    const spinner = screen.queryByLabelText('TwSpinnerOne')
    expect(btn).toBeDisabled()
    expect(btn).toHaveTextContent('Processing...')
    expect(spinner).toBeInTheDocument()

  })
  it('Should show completed state', () => {
    setup(loadingState)
    const btn = screen.getByTestId('submit-button')
    const spinner = screen.queryByLabelText('TwSpinnerOne')
    expect(btn).toBeDisabled()
    expect(btn).toHaveTextContent('Completed!')
    expect(spinner).toBeNull()
  })

  it('Should have correct css', () => {
    setup({ ...defaultState, className: 'custom-class' })
    const btn = screen.getByTestId('submit-button')
    expect(btn).toHaveClass('custom-class')
  })

  it('Should have custom btn text', () => {
    setup({ ...defaultState, btnText: 'custom-text' })
    const btn = screen.getByTestId('submit-button')
    expect(btn).toHaveTextContent('custom-text')
  })
})