import { render, screen } from "@testing-library/react"
import { mockPostDataComplete } from "@TestUtils/mock-data/posts"
import PinterestBlock from "../pinterestBlock"

describe('Pinterest Block', () => {
  const setup = () => {
    const props = {
      post: mockPostDataComplete,
      postUrl: `/${mockPostDataComplete.slug}`
    }
    render(<PinterestBlock {...props} />)
  }

  it('Should have pinterest image', () => {
    setup()
    const image = screen.getByTestId('pinterest-image')
    expect(image).toBeInTheDocument()
  })

  it('Should have pinterest link', () => {
    setup()
    const href = `https://pinterest.com/pin/create/button/?url=/create-candy-cane-lettering-procreate&media=https://etheadless.local/wp-content/uploads/2021/11/create-candy-cane-lettering-in-procreate-pinterest-1000x749.jpg&description=Create%20Candy%20Cane%20Lettering%20in%20Procreate%20%20|%20video%20tutorial:%20etheadlessdev.wpengine.com`
    const link = screen.getByTestId('pinterest-link')
    expect(link).toHaveProperty('href', href)
    expect(link).toHaveTextContent('Create your own personal library of my tutorials you love!')
    expect(link).toHaveTextContent('Pin It')
  })
})