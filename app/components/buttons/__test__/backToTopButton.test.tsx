import { fireEvent, render, screen } from "@testing-library/react"
import BackToTopButton from "../backToTopButton"

describe('Back to top button', () => {
  const setup = (props: any) => {
    render(<div data-testid="parent">
      <BackToTopButton {...props} />
    </div>)
  }
  const goToTopFn = jest.fn()

  it('It Should not show Button', () => {
    setup({
      handleGoToTop: goToTopFn,
      visible: false
    })
    expect(screen.queryByTestId('backToTopButton-test')).toBeNull()
  })

  it('It Should show Button and call goToTopFn', () => {
    setup({
      handleGoToTop: goToTopFn,
      visible: true
    })
    const container = screen.getByTestId('backToTopButton-test')
    expect(container).toHaveTextContent('Back to Top')
    const btn = container.firstChild as HTMLButtonElement
    fireEvent.click(btn)
    expect(goToTopFn).toHaveBeenCalled()

  })
})