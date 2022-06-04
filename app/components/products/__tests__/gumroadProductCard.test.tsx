import { siteInitialState } from "@App/hooks/useSite"
import UseSiteProvider from "@App/hooks/useSite/useSiteProvider"
import { mockPaidProduct } from "@TestUtils/mock-data/products"
import { renderUi } from "@TestUtils/renderUtils"
import { MemoryRouter } from "react-router"
import GumroadProductCard from "../gumroadProductCard"

describe('Gumroad Product Card', () => {
  const props = {
    product: mockPaidProduct
  }

  it('Should show product image', () => {
    const { queryByLabelText } = renderUi(
      <MemoryRouter>
        <UseSiteProvider defaultState={siteInitialState}>
          <GumroadProductCard {...props} />
        </UseSiteProvider>
      </MemoryRouter>
    )
    const image = queryByLabelText(`Product Image`)
    expect(image).toBeTruthy()
  })

  it('Should show product title', () => {
    const { queryByTestId } = renderUi(
      <MemoryRouter>
        <UseSiteProvider defaultState={siteInitialState}>
          <GumroadProductCard {...props} />
        </UseSiteProvider>
      </MemoryRouter>
    )
    const title = queryByTestId(`gumroad-title`)
    expect(title).toHaveTextContent(mockPaidProduct.title)

  })

  it('Should show LicenseSelect Component', () => {
    const { queryByTestId } = renderUi(
      <MemoryRouter>
        <UseSiteProvider defaultState={siteInitialState}>
          <GumroadProductCard {...props} />
        </UseSiteProvider>
      </MemoryRouter>
    )
    const licenseSelect = queryByTestId(`licenseSelection`)
    expect(licenseSelect).toBeTruthy()
  })
})