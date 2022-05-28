import { render, screen } from "@testing-library/react"
import { mockPostDataComplete } from "@TestUtils/mock-data/posts"
import CardTall from "../cardTall"

describe('Card Tall Component', () => {
  const defaultProps = {
    title: 'Title',
  }
  const propsWithImage = {
    description: 'string',
    image: mockPostDataComplete.featuredImage?.mediaDetails
  }
  const setup = (props: any = {}) => {
    const setupProps = { ...defaultProps, ...props }
    render(<CardTall {...setupProps}>
      <div>Children</div>
    </CardTall>)
    return {
      card: screen.getByTestId('card-tall'),
    }
  }
  it('Should have children', () => {
    const { card } = setup()
    expect(card).toHaveTextContent('Children')
  })

  it('should have correct title', () => {
    const { card } = setup()
    expect(card).toHaveTextContent('Title')
  })

  it('should have correct description', () => {
    const { card } = setup(propsWithImage)
    expect(card).toHaveTextContent('string')
  })

  it('should have correct image', () => {
    setup(propsWithImage)
    const image = screen.getByTestId('tall-image')
    expect(image).toBeVisible()
  })
})