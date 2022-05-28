import { render, screen } from "@testing-library/react"
import GumroadBtn from "../gumroadBtn"

describe('Gumroad Button Component', () => {
  const setup = () => {
    const props = {
      url: "/test",
      text: 'btnText',
      className: 'test-class',
      href: '/test',
      price: 10
    }
    render(
      <GumroadBtn {...props} />
    )
    const btn = screen.getByTestId('test-GumroadBtn')
    return { btn }
  }
  it('Should have correct css', () => {
    const { btn } = setup()
    expect(btn).toHaveClass('test-class')
  })
  it('Should have correct text', () => {
    const { btn } = setup()
    expect(btn).toHaveTextContent('btnText')
  })
  it('Should have correct href', () => {
    const { btn } = setup()
    expect(btn).toHaveProperty('href', "http://localhost/test")
  })
  it('Should have correct price', () => {
    const { btn } = setup()
    expect(btn).toHaveTextContent('$10')
  })
  it('Should have correct default text', () => {
    const props = {
      url: "/test",
      className: 'test-class',
      href: '/test',
      price: 10
    }
    render(
      <GumroadBtn {...props} />
    )
    const btn = screen.getByTestId('test-GumroadBtn')
    expect(btn).toHaveTextContent('Buy Now')
  })

  it('Should have no price', () => {
    const props = {
      url: "/test",
      className: 'test-class',
      href: '/test',
    }
    render(
      <GumroadBtn {...props} />
    )
    const btn = screen.getByTestId('test-GumroadBtn')
    expect(btn).not.toHaveTextContent('$10')
  })

})