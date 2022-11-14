import LicenseSelectSection from "@App/components/products/licenseSelectSection"
import { siteInitialState } from "@App/hooks/useSite"
import { queryByTestId, screen } from "@testing-library/react"
import { renderUseSiteProviderUi } from "@TestUtils/providerUtils"
import { MemoryRouter } from "react-router"
import ExtendedLicenseUpsell from "../extendedLicenseUpsell"

describe('Extended License Upsell Component', () => {
  const setup = (props: any, addFontToPreview: any = null) => {
    const queries = renderUseSiteProviderUi(
      <MemoryRouter>
        <ExtendedLicenseUpsell visible={props} />
      </MemoryRouter>
      , {
        providerProps: siteInitialState
      }
    )

    return {
      ...queries,
    }
  }

  it('Should return Null', () => {
    const { queryByText } = setup(false)
    expect(queryByText(/upgrade license/i)).toBeNull()
  })

  it('Should have Upgrade License Text Headline', () => {
    const { queryByText } = setup(true)
    expect(queryByText(/upgrade license/i)).toBeTruthy()
  })

  it('Should have License Sell Text Copy', () => {
    const { parent } = setup(true)
    expect(parent).toHaveTextContent('When you join Tuesday Makers, you’ll receive instant access to the Resource Library, filled with textures, fonts, vectors, stationery, graphics, cheat sheets and more.')
  })

  it('Should have Card Title & Subtitle', () => {
    const { queryByTestId } = setup(true)
    expect(queryByTestId('ext-card-title')).toHaveTextContent('Resource Library')
    expect(queryByTestId('ext-card-title')).toHaveTextContent('Commercial License')
  })

  it('Should have selling points', () => {
    const { queryByTestId } = setup(true)
    const sellingPoints = queryByTestId('selling-points')
    expect(sellingPoints?.children).toHaveLength(3)
  })

  it('Should have gumroad button', () => {
    const { queryByTestId } = setup(true)
    const gumroadBtn = queryByTestId('gumroad-btn')
    expect(gumroadBtn).toHaveTextContent('Buy Now!$30')
    expect(gumroadBtn).toHaveAttribute('href', 'https://gum.co/freebie-license?wanted=true&locale=false')
  })
})