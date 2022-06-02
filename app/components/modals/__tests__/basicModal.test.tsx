import type { ISiteContextState } from "@App/hooks/useSite";
import { siteInitialState } from "@App/hooks/useSite"
import UseSiteProvider from "@App/hooks/useSite/useSiteProvider"
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { renderUi } from "@TestUtils/renderUtils"
import BasicModal from "../BasicModal"

describe('Basic Modal Component', () => {
  const defaultState: ISiteContextState = {
    ...siteInitialState
  }

  const openState = {
    ...defaultState,
    modal: {
      open: true,
      component: <div>Hello</div>
    }
  }

  it('Should not have a modal or overlay in the DOM', () => {
    const { queryByTestId } = renderUi(
      <UseSiteProvider defaultState={defaultState}>
        <BasicModal />
      </UseSiteProvider>
    )

    const overlay = queryByTestId('modalOverlay')
    expect(overlay).toBeNull()

  })

  it('Modal Open and should show component, modal & overlay', () => {
    const { queryByTestId, findByText } = renderUi(
      <UseSiteProvider defaultState={openState}>
        <BasicModal />
      </UseSiteProvider>
    )

    const overlay = queryByTestId('modalOverlay')
    expect(overlay).toBeDefined()

    const modalContent = findByText('Hello')
    expect(modalContent).toBeDefined()

  })

  it('Modal Should close on overlay Click', async () => {
    render(<div data-testid="parent">
      <UseSiteProvider defaultState={openState}>
        <BasicModal />
      </UseSiteProvider>
    </div>)
    const overlay = screen.queryByTestId('modalOverlay')
    if (!overlay) {
      throw expect(overlay).toBeDefined()
    }
    fireEvent.click(overlay)
    await waitFor(() => expect(screen.queryByTestId('modalOverlay')).toBeNull())
  })
})