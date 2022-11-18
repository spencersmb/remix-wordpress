import { screen } from "@testing-library/react"
import { renderUi } from "@TestUtils/renderUtils"
import MadeBy from "../madeBy"

describe('LFM: Made by', () => {
  const setup = () => renderUi(<MadeBy />)
  it('Should have correct brush image', () => {
    const { getByTestId } = setup()
    const img = getByTestId('lazy-load-image-madeByBrushes')
    expect(img).toHaveAttribute('src', 'https://et-website.imgix.net/et-website/images/tools/outlined-brushes-full.png?auto=format&w=414&fit=clip')
  })
  it('Should have correct watercolor image', () => {
    const { getByTestId } = setup()
    const img = getByTestId('lazy-load-image-madeByOrangeTexture')
    expect(img).toHaveAttribute('src', 'https://et-website.imgix.net/et-website/textures/watercolor-03.png?auto=format&w=400&fit=clip')
  })

  it('Should have correct Title image', () => {
    const { getByTestId } = setup()
    const img = getByTestId('lazy-load-image-madeByTitle')
    expect(img).toHaveAttribute('src', 'https://s3.amazonaws.com/et-courses/lfm/bydesingerfordesigners.png?auto=format&w=300&fit=clip')
  })

  it('Should have description', async () => {
    const { getByTestId } = setup()
    const text = getByTestId('madeByText')
    expect(text.innerHTML.length).toBeGreaterThan(0)
  })

})