import { fireEvent } from "@testing-library/react"
import { mockFeaturedImage } from "@TestUtils/mock-data/images"
import { renderUi } from "@TestUtils/renderUtils"
import GridItem from "../gridItem"

describe('Grid Item Component', () => {
  const props = {
    title: 'Test Title',
    downloadLink: 'https://www.google.com',
    excerpt: 'Test excerpt',
    tags: [
      {
        name: 'test',
        slug: 'test',
        count: 1
      }
    ],
    image: mockFeaturedImage
  }
  it('Should show correct title & excerpt', () => {
    const { parent } = renderUi(<GridItem {...props} />)

    expect(parent).toHaveTextContent(props.title)
    expect(parent).toHaveTextContent(props.excerpt)
    expect(parent).toHaveTextContent('Download')
  })

  it('Should call window.open', () => {
    window.open = jest.fn()
    const { getByText } = renderUi(<GridItem {...props} />)
    const button = getByText('Download')
    fireEvent.click(button)
    expect(window.open).toHaveBeenCalledWith('https://www.google.com')
  })
})