import { fireEvent, render, screen } from "@testing-library/react"
import { mockPostDataComplete } from "@TestUtils/mock-data/posts"
import CardSmall from "../cardSmall"

describe('Card Small Component', () => {
  const defaultProps = {
    image: mockPostDataComplete.featuredImage?.mediaDetails,
    title: 'My Title',
    excerpt: 'excerpt',
    id: 1,
    scrollPosition: {
      x: 0,
      y: 0
    },
    buttonText: 'button-text',
    handleButtonClick: jest.fn()
  }
  const setup = (props: any) => {
    render(<CardSmall {...props} />)
    const card = screen.getByTestId('card-small')
    const button = screen.getByTestId('card-button')

    return {
      card,
      button
    }
  }
  it('It should display the right title/excerpt/button text', () => {
    const { card } = setup(defaultProps)
    expect(card).toHaveTextContent('My Title')
    expect(card).toHaveTextContent(defaultProps.excerpt)
    expect(card).toHaveTextContent(defaultProps.buttonText)
  })

  it('Should call handleClick fn', () => {
    const { button } = setup(defaultProps)
    fireEvent.click(button)
    expect(defaultProps.handleButtonClick).toHaveBeenCalled()
  })
})