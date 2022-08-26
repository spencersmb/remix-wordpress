import { render, screen } from "@testing-library/react"
import GumroadBtn from "../gumroadBtn"

describe('Gumroad Button Component', () => {
  const setup = (customProps?: any) => {
    const props = {
      url: "/test",
      text: 'btnText',
      className: 'test-class',
      href: '/test',
      price: 10,
      ...customProps
    }
    render(
      <GumroadBtn {...props} />
    )
    const btn = screen.getByTestId('test-GumroadBtn-buy')
    return {
      btn,
      viewBtn: screen.queryByTestId('test-GumroadBtn-view'),
    }
  }
  it('Should have correct css', () => {
    const { btn } = setup()
    expect(btn).toHaveClass('test-class')
  })
  it('Should have correct text for both buttons', () => {
    const { btn, viewBtn } = setup()
    expect(btn).toHaveTextContent('btnText')
    expect(viewBtn).toHaveTextContent(/view/i)
  })
  it('Should have correct href', () => {
    const { btn, viewBtn } = setup()
    expect(btn).toHaveProperty('href', "http://localhost/test?wanted=true&locale=false")
    expect(viewBtn).toHaveProperty('href', "http://localhost/test")
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
    const btn = screen.getByTestId('test-GumroadBtn-buy')
    expect(btn).toHaveTextContent('Buy Now')
  })
  it('Should have no price and not show view btn', () => {
    const props = {
      url: "/test",
      className: 'test-class',
      href: '/test',
      doubleBtn: false
    }
    render(
      <GumroadBtn {...props} />
    )
    const btn = screen.getByTestId('test-GumroadBtn-buy')
    const view = screen.queryByTestId('test-GumroadBtn-view')
    expect(btn).not.toHaveTextContent('$10')
    expect(view).toBeNull()
  })

})