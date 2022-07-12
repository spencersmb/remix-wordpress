import { mockPaidProduct } from "@TestUtils/mock-data/products"
import { renderUi } from "@TestUtils/renderUtils"
import ProductCardMini from "../productCardMini"

describe('Product Card Mini', () => {
  const setup = () => (renderUi(<ProductCardMini index={0} product={mockPaidProduct} />))

  it('Should have correct gumroad url', () => {
    const { getByTestId } = setup()
    const gumroadLink = getByTestId('test-gumroadLink')
    expect(gumroadLink.getAttribute('href')).toBe(mockPaidProduct.productDetails.licences[0].url)
  })

  it('Should have correct image url', () => {

    const { getByTestId } = setup()
    const image = getByTestId(`lazy-load-image-${mockPaidProduct.slug}`)
    expect(image.getAttribute('src')).toBe(mockPaidProduct.featuredImage.node.sourceUrl)

  })

  it('Should have correct product title', () => {
    const { queryByText } = setup()
    expect(queryByText(mockPaidProduct.title)).toBeTruthy()
  })
})