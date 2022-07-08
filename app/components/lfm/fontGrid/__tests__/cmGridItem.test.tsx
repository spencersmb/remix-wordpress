import { renderUi } from "@TestUtils/renderUtils"
import CmGridItem from "../cmGridItem"

describe('LFM:Font Grid item', () => {
  const defaultItem = {
    img: 'video-1.jpg',
    alt: 'Mini Course Step 1',
    link: 'https://www.youtube.com/watch?v=_Q-_Q-_Q-_Q',
  }
  const setup = (props: {
    index: number
    gridItem: CmGridItem
  }) => renderUi(<CmGridItem {...props} />)
  it('Should have correct Image', () => {
    const { getByAltText } = setup({
      index: 0,
      gridItem: defaultItem,
    })
    expect(getByAltText(defaultItem.alt)).toBeInTheDocument()
  })

  it('Should have correct link', () => {
    const { getByTestId } = setup({
      index: 0,
      gridItem: defaultItem,
    })
    expect(getByTestId(`cm-grid-item-0`)).toHaveAttribute('href', defaultItem.link)

  })
})