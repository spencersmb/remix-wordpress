import { formatDate } from "@App/utils/posts"
import { render, screen } from "@testing-library/react"
import { mockPostDataComplete } from "@TestUtils/mock-data/posts"
import BlogDateAuthor from "../date"

describe('BlogDateAuthor Component', () => {
  const setup = () => {
    const props = {
      date: mockPostDataComplete.date,
      author: mockPostDataComplete.author.name
    }
    render(<BlogDateAuthor {...props} />)
    const element = screen.getByTestId('blog-date')
    return { element }
  }
  it('Should show correct date', () => {
    const { element } = setup()

    expect(element).toHaveTextContent(formatDate(mockPostDataComplete.date))
  })
  it('Should show correct author name', () => {
    const { element } = setup()

    expect(element).toHaveTextContent(mockPostDataComplete.author.name)
  })
})