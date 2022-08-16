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
    const href = `https://pinterest.com/pin/create/button/?url=/create-candy-cane-lettering-procreate&media=https://etheadless.local/wp-content/uploads/2021/11/create-candy-cane-lettering-in-procreate-pinterest-333x500.jpg&description=Create Candy Cane Lettering in Procreate  | video tutorial: etheadlessdev.wpengine.com`

    const link = screen.getByTestId('pinterest-link')
    expect(link.getAttribute('href')).toBe(href)
    expect(link).toHaveTextContent('Create your own personal library of my tutorials you love!')
    expect(link).toHaveTextContent('Pin It')
  })
})