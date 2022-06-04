import BasicModal from "@App/components/modals/BasicModal"
import { siteInitialState } from "@App/hooks/useSite"
import { fireEvent } from "@testing-library/react"
import { mockResourceFreebie, mockResourceItem } from "@TestUtils/mock-data/posts"
import { renderUseSiteProviderUi } from "@TestUtils/providerUtils"
import { MemoryRouter } from "react-router"
import Freebie from "../freebie"

describe('Freebie Component', () => {
  const defaultProps = {
    resource: {
      ...mockResourceItem
    },
    scrollPosition: {
      x: 0,
      y: 0
    }
  }
  const setup = (props: any) => {
    const queries = renderUseSiteProviderUi(
      <MemoryRouter>
        <Freebie {...props} />
        <BasicModal />
      </MemoryRouter>
      , {
        providerProps: siteInitialState
      }
    )

    return {
      ...queries,
    }
  }

  // NO PRODUCT / NO LICENSE REQUIRED / NO POPUP
  it('Should not modal when clicked and call window.open', () => {
    window.open = jest.fn()
    const { queryByTestId, queryByText } = setup(defaultProps)
    const button = queryByText(/download/i)
    if (button) {
      fireEvent.click(button)
      const modal = queryByTestId('paid-product-popup')
      expect(modal).toBeNull()
      expect(window.open).toHaveBeenCalled()
      expect(window.open).toHaveBeenCalledWith(mockResourceFreebie.downloadLink)
    }
  })

  // LICENSE REQUIRED / POPUP / NO PRODUCT
  it('Should open modal when clicked', async () => {
    window.open = jest.fn()
    const { queryByTestId, queryByText } = setup({
      ...defaultProps,
      resource: {
        ...mockResourceItem,
        freebie: {
          ...mockResourceFreebie,
          licenseRequired: true
        }
      }
    })
    const button = queryByText(/download/i)
    if (button) {
      fireEvent.click(button)
      const modalProduct = queryByTestId('paid-product-popup')
      const modal = queryByTestId('modalWrapper')
      expect(modal).toBeTruthy()
      expect(modalProduct).toBeNull()
    }
  })
})