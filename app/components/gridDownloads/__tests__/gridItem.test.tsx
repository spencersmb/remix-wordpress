import { fireEvent } from "@testing-library/react"
import { mockFeaturedImage } from "@TestUtils/mock-data/images"
import { renderUi } from "@TestUtils/renderUtils"
import type { ScrollPosition } from "react-lazy-load-image-component"
import GridItem from "../gridItem"

describe('Grid Item Component', () => {
  const props: {
    item: IGridItem
    scrollPosition: ScrollPosition
  } = {
    scrollPosition: {
      x: 0,
      y: 0
    },
    item: {
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
  }
  it('Should show correct title & excerpt', () => {
    const { parent } = renderUi(<GridItem {...props} />)

    expect(parent).toHaveTextContent(props.item.title)
    expect(parent).toHaveTextContent(props.item.excerpt)
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