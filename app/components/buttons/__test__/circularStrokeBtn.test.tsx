import { fireEvent, render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import CircularStrokeBtn from '../circularStrokeBtn'
import { CircularStrokeLink } from '../circularStrokeBtn'
describe('CircularStrokeBtn Component', () => {
  const handleClick = jest.fn()
  const setup = () => {
    const props = {
      text: 'test',
      classes: 'test-class',
      handleClick
    }
    render(<CircularStrokeBtn {...props} />)
    const btn = screen.getByTestId('test-CircularStrokeBtn')
    return { btn }
  }
  it('Should have correct text', () => {
    const { btn } = setup()
    expect(btn).toHaveTextContent('test')
  })

  it('Should have correct css classes', () => {
    const { btn } = setup()
    expect(btn).toHaveClass('test-class')
  })

  it('Should call click handler', () => {
    const { btn } = setup()
    fireEvent.click(btn)
    expect(handleClick).toHaveBeenCalledTimes(1)
  })
})

describe('CircularLinkBtn Component', () => {
  const handleClick = jest.fn()
  const setup = () => {
    const props = {
      text: 'test',
      classes: 'test-class',
      handleClick,
      href: '/test'
    }
    render(
      <MemoryRouter>
        <CircularStrokeLink {...props} />
      </MemoryRouter>

    )
    const btn = screen.getByTestId('test-CircularStrokeBtn')
    return { btn }
  }
  it('Should have correct text', () => {
    const { btn } = setup()
    expect(btn).toHaveTextContent('test')
  })

  it('Should have correct css classes', () => {
    const { btn } = setup()
    expect(btn).toHaveClass('test-class')
  })

  it('Should call correct href', () => {
    const { btn } = setup()
    expect(btn).toHaveProperty('href', 'http://localhost/test')
  })
})