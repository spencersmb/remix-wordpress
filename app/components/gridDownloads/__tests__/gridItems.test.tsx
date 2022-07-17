import { mockFeatureImageComplete } from "@TestUtils/mock-data/images"
import { renderUi } from "@TestUtils/renderUtils"
import GridItems from "../gridItems"

describe('Grid items', () => {
  const setup = (props: { gridItems: IGridItem[] }) => {
    return renderUi(<GridItems {...props} />)
  }
  it('Should render No Results Found Text', () => {
    const { queryByText } = setup({ gridItems: [] })
    expect(queryByText(/No results found/i)).toBeTruthy()
  })

  it('Should render 2 grid items', () => {
    const { queryAllByTestId } = setup({
      gridItems: [
        {
          downloadLink: 'https://www.google.com',
          image: mockFeatureImageComplete,
          title: 'Test Title',
          excerpt: 'Test Excerpt',
          tags: [
            {
              name: 'Test Tag',
              slug: 'test-tag',
              count: 1
            }
          ]
        },
        {
          downloadLink: 'https://www.google.com',
          image: mockFeatureImageComplete,
          title: 'Test Title 2',
          excerpt: 'Test Excerpt 2',
          tags: [
            {
              name: 'Test Tag 2',
              slug: 'test-tag-2',
              count: 2
            }
          ]
        }
      ]
    })
    expect(queryAllByTestId('card-small')).toHaveLength(2)
  })

})