import { fireEvent, render, screen } from "@testing-library/react"
import PillBase from "../pillBase"

const defaultState = {
  selected: false,
  clickHandler: jest.fn(),
}
describe('PillBase Button Component', () => {
  const setup = (props: any) => {
    render(<PillBase {...props} />)

    const pill = screen.getByTestId('pill')

    return {
      pill,
    }
  }

  it('Should show non-selected state', () => {
    const { pill } = setup(defaultState)
    const svg = screen.queryByLabelText('checkmark')
    expect(pill).not.toHaveClass('pill_selected_state')
    expect(svg).toBeNull()
  })
  it('Should show selected state', () => {
    const { pill } = setup(
      {
        ...defaultState,
        selected: true,
      })
    const svg = screen.queryByLabelText('checkmark')
    expect(pill).toHaveClass('pill_selected_state')
    expect(svg).toBeInTheDocument()
  })

  it('should handle click', () => {
    const { pill } = setup(defaultState)
    fireEvent.click(pill)
    expect(defaultState.clickHandler).toHaveBeenCalled()
  })
})