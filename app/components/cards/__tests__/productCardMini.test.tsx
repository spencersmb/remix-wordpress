import { siteInitialState } from "@App/hooks/useSite"
import { mockPaidProduct } from "@TestUtils/mock-data/products"
import { renderUseSiteProviderUi } from "@TestUtils/providerUtils"
import { renderUi } from "@TestUtils/renderUtils"
import { MemoryRouter } from "react-router"
import ProductCardMini from "../productCardMini"

describe('Product Card Mini', () => {

  const setup = () => renderUseSiteProviderUi(
    <MemoryRouter>
      <ProductCardMini index={0} product={mockPaidProduct} />
    </MemoryRouter>,
    {
      providerProps: {
        ...siteInitialState,
      }
    }
  )

  it('Should have license Component', () => {
    const { queryByTestId } = setup()
    const licenseComponent = queryByTestId('licenseSelection')
    if (!mockPaidProduct.productDetails.licences) {
      expect(false).toBe(true)
      return
    }

    expect(licenseComponent).toBeVisible()

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