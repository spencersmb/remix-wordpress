import { fireEvent, render, screen } from "@testing-library/react"
import PillSmall from "../pillSmall"

describe('pillSmall Test', () => {
  const clickHanderTest = jest.fn()
  const setup = (props: any) => {
    render(<div data-testid="parent">
      <PillSmall {...props} />
    </div>)
  }
  it('Should Have correct text and not be selected', () => {
    setup({
      text: 'Beginner',
      clickHandler: clickHanderTest,
      selected: false
    })
    const pill = screen.getByTestId('pillTest')
    expect(pill).toBeVisible()
    expect(pill).not.toHaveClass('bg-success-100 text-grey-600')
  })

  it('Should Have correct selected CSS', () => {
    setup({
      text: 'Beginner',
      clickHandler: clickHanderTest,
      selected: true,
      selectedClassName: 'bg-success-100 text-grey-600'
    })
    const pill = screen.getByTestId('pillTest')
    expect(pill).toBeVisible()
    expect(pill).toHaveClass('bg-success-100 text-grey-600')
  })

  it('Should call Click handler', () => {
    setup({
      text: 'Beginner',
      clickHandler: clickHanderTest,
      selected: true,
      selectedClassName: 'bg-success-100 text-grey-600'
    })
    const pill = screen.getByTestId('pillTest')
    fireEvent.click(pill)
    expect(clickHanderTest).toHaveBeenCalled()
  })
})