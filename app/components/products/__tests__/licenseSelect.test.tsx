import { siteInitialState } from "@App/hooks/useSite"
import { fireEvent } from "@testing-library/react"
import { mockPaidProduct } from "@TestUtils/mock-data/products"
import { renderUseSiteProviderUi } from "@TestUtils/providerUtils"
import { MemoryRouter } from "react-router"
import LicenseSelectSection from "../licenseSelectSection"

describe('License Select Component', () => {

  const setup = (props: any, addFontToPreview: any = null) => {
    const queries = renderUseSiteProviderUi(
      <MemoryRouter>
        <LicenseSelectSection
          product={...props}
          addFontToPreview={addFontToPreview} />
      </MemoryRouter>
      , {
        providerProps: siteInitialState
      }
    )

    return {
      ...queries,
    }
  }

  const setup2 = (props: any) => {
    const queries = renderUseSiteProviderUi(
      <MemoryRouter>
        <LicenseSelectSection
          {...props} />
      </MemoryRouter>
      , {
        providerProps: siteInitialState
      }
    )

    return {
      ...queries,
    }
  }

  it('Should have License Type Label', () => {
    const { queryByText } = setup(mockPaidProduct)
    expect(queryByText(/license type/i)).toBeTruthy()

  })

  it('Should have What Are These Link', () => {
    const { queryByText } = setup(mockPaidProduct)
    const link = queryByText(/What are these?/i)
    expect(link).toBeTruthy()
    expect(link).toHaveAttribute('href', '/license-types')
  })

  it('Should show License Radio Select + Gumroad Btn', () => {
    const { queryByTestId } = setup(mockPaidProduct)
    const licenseRadioSelect = queryByTestId('license-radio-select')
    const gumroadBtn = queryByTestId('test-GumroadBtn')
    expect(licenseRadioSelect).toBeTruthy()
    expect(gumroadBtn).toBeTruthy()
  })

  it('Should not show Font Preview Button', () => {
    const { queryByText } = setup(mockPaidProduct)
    const fontBtn = queryByText('Preview Font')
    expect(fontBtn).toBeNull()
  })

  it('Should not show License Radio Select or Gumroad Btn', () => {
    const product = {
      ...mockPaidProduct,
      productDetails: {
        ...mockPaidProduct.productDetails,
        licences: null
      }
    }
    const { queryByTestId } = setup(product)
    const licenseRadioSelect = queryByTestId('license-radio-select')
    const gumroadBtn = queryByTestId('test-GumroadBtn')

    expect(licenseRadioSelect).toBeNull()
    expect(gumroadBtn).toBeNull()
  })

  it('Should show Font Preview Button', () => {
    const fontFn = jest.fn()
    const { queryByText } = setup(mockPaidProduct, fontFn)
    const fontBtn = queryByText('Preview Font')
    expect(fontBtn).toBeTruthy()
    if (fontBtn) {
      fireEvent.click(fontBtn)
      expect(fontFn).toHaveBeenCalled()
      expect(fontFn).toHaveBeenCalledWith(mockPaidProduct.productDetails.font.name)
    }
  })

  it('Should have default button text', () => {
    const { queryByText } = setup2({
      product: mockPaidProduct
    })
    expect(queryByText(/buy now/i)).toBeTruthy()
  })

  it('Should have correct button text', () => {
    const { queryByText } = setup2({
      product: mockPaidProduct,
      buttonText: 'Test Button Text'
    })
    expect(queryByText(/test button text/i)).toBeTruthy()
  })
})