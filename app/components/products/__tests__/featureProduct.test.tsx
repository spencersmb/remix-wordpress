import { BreakpointEnums } from "@App/enums/breakpointEnums"
import { siteInitialState } from "@App/hooks/useSite"
import { screen } from "@testing-library/react"
import { mockPaidProduct } from "@TestUtils/mock-data/products"
import { renderUseSiteProviderUi } from "@TestUtils/providerUtils"
import { MemoryRouter } from "react-router"
import FeatureProduct from "../featureProduct"

describe('Feature Product', () => {
  const props = {
    product: mockPaidProduct
  }

  it('Should show mobile feature image and not laptop feature image', () => {
    const { queryByTestId } = renderUseSiteProviderUi(
      <MemoryRouter>
        <FeatureProduct {...props} />
      </MemoryRouter>, {
      providerProps: siteInitialState
    })
    const mobileImage = queryByTestId('featured-image-mobile')
    const laptopImage = queryByTestId('featured-image-laptop')
    expect(mobileImage).toBeTruthy()
    expect(laptopImage).toBeNull()
  })

  it('Should not show mobile feature image and should show laptop feature image', () => {
    const { queryByTestId } = renderUseSiteProviderUi(
      <MemoryRouter>
        <FeatureProduct {...props} />
      </MemoryRouter>, {
      providerProps: {
        ...siteInitialState,
        breakpoint: BreakpointEnums.laptop
      }
    }
    )
    const mobileImage = queryByTestId('featured-image-mobile')
    const laptopImage = queryByTestId('featured-image-laptop')
    const blackPin = queryByTestId('featured-black-pin')
    expect(laptopImage).toBeTruthy()
    expect(blackPin).toBeTruthy()
    expect(mobileImage).toBeNull()
  })

  it('Should have New text + Title and not show subtitle and description', () => {
    const { queryByTestId, queryByLabelText } = renderUseSiteProviderUi(
      <MemoryRouter>
        <FeatureProduct {...props} />
      </MemoryRouter>, {
      providerProps: siteInitialState
    })
    const contentWrapper = queryByTestId('featured-product-content')
    const subtitle = queryByLabelText(`${props.product.title} subtitle`)
    const description = queryByLabelText(`${props.product.title} description`)
    expect(contentWrapper).toHaveTextContent(mockPaidProduct.title)
    expect(contentWrapper).toHaveTextContent(/new/i)
    expect(subtitle).toBeNull()
    expect(description).toBeNull()

  })

  it('Should show subtitle + description', () => {
    const productWDesc = {
      product: {
        ...mockPaidProduct,
        productDetails: {
          ...mockPaidProduct.productDetails,
          productContent: {
            ...mockPaidProduct.productDetails.productContent,
            subtitle: 'new product subtitle',
            description: 'new product description'
          }
        }
      }
    }
    const { queryByTestId, queryByLabelText } = renderUseSiteProviderUi(
      <MemoryRouter>
        <FeatureProduct {...productWDesc} />
      </MemoryRouter>, {
      providerProps: siteInitialState
    })
    const subtitle = queryByLabelText(`${props.product.title} subtitle`)
    const description = queryByLabelText(`${props.product.title} description`)
    expect(subtitle).not.toBeNull()
    expect(subtitle).toHaveTextContent(/new product subtitle/i)
    expect(description).not.toBeNull()
    expect(description).toHaveTextContent(/new product description/i)
  })

  it('Should show License Component', () => {
    const { queryByTestId } = renderUseSiteProviderUi(
      <MemoryRouter>
        <FeatureProduct {...props} />
      </MemoryRouter>, {
      providerProps: siteInitialState
    })
    const contentWrapper = queryByTestId('licenseSelection')
    expect(contentWrapper).toBeVisible()

  })
})