import { ShopPlatformEnum } from "@App/enums/products"
import { siteInitialState } from "@App/hooks/useSite"
import UseSiteProvider from "@App/hooks/useSite/useSiteProvider"
import { fireEvent } from "@testing-library/react"
import { mockPaidProduct } from "@TestUtils/mock-data/products"
import { renderUi } from "@TestUtils/renderUtils"
import PaidProductPopUp from "../paidProductPopUp"

describe('PaidProducts Pop Up', () => {
  const closeModal = jest.fn()
  const props = {
    closeModal,
    download_link: 'https://test.com',
    product: {
      ...mockPaidProduct,
    }
  }
  const noProductProps = {
    closeModal,
    download_link: 'https://test.com',
    product: null
  }

  it('Should render no product text', () => {
    const { queryByText } = renderUi(
      <UseSiteProvider defaultState={siteInitialState}>
        <PaidProductPopUp {...noProductProps} />
      </UseSiteProvider>
    )
    expect(queryByText('no product found')).toBeTruthy()
  })

  it('Should show header text SAMPLE FREEBIE', () => {
    const { queryByText } = renderUi(
      <UseSiteProvider defaultState={siteInitialState} >
        <PaidProductPopUp {...props} />
      </UseSiteProvider>
    )
    expect(queryByText('Sample Freebie')).toBeTruthy()
  })

  // REMOVED BUTTON
  it.skip('Should call closeModal fn', () => {
    const { queryByTestId } = renderUi(
      <UseSiteProvider defaultState={siteInitialState} >
        <PaidProductPopUp {...props} />
      </UseSiteProvider>
    )
    const button = queryByTestId('close-modal')
    expect(button).not.toBeNull()
    if (button) {
      fireEvent.click(button)
      expect(closeModal).toHaveBeenCalledTimes(1)
    }
  })

  it('Should Have Product Title + Description', () => {
    const { getByTestId } = renderUi(
      <UseSiteProvider defaultState={siteInitialState} >
        <PaidProductPopUp {...props} />
      </UseSiteProvider>
    )
    const container = getByTestId('paid-product-popup')
    expect(container).toHaveTextContent(mockPaidProduct.title)
    expect(container).toHaveTextContent('This item is part of a full set that can be purchased if you want to take full advantage of all it’s elements.')
  })

  it('Should have download button and call window.open', () => {
    window.open = jest.fn()
    const { getByText } = renderUi(
      <UseSiteProvider defaultState={siteInitialState} >
        <PaidProductPopUp {...props} />
      </UseSiteProvider>
    )
    const button = getByText('Continue with free download')
    expect(button).not.toBeNull()
    fireEvent.click(button)
    expect(window.open).toHaveBeenCalledTimes(1)
  })

  it('It should show gumorad Buy Buttons', () => {
    const { queryByText } = renderUi(
      <UseSiteProvider defaultState={siteInitialState} >
        <PaidProductPopUp {...props} />
      </UseSiteProvider>
    )
    const button = queryByText('View')
    const buyButton = queryByText('Buy Now')
    expect(button).not.toBeNull()
    expect(buyButton).not.toBeNull()
  })

  it('It should not show gumorad Buy Button', () => {
    const { queryByText } = renderUi(
      <UseSiteProvider defaultState={{
        ...siteInitialState,
        metadata: {
          ...siteInitialState.metadata,
          serverSettings: {
            productPlatform: ShopPlatformEnum.SENDOWL
          }
        }
      }} >
        <PaidProductPopUp {...props} />
      </UseSiteProvider>
    )
    const button = queryByText('View')
    const buyButton = queryByText('Buy Now')
    expect(button).toBeNull()
    expect(buyButton).toBeNull()
  })
})