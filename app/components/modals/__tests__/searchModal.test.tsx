import type { ISearchContextState } from "@App/hooks/useSearch";
import { siteSearchState } from "@App/hooks/useSearch"
import { renderUseSearchProviderUi } from "@TestUtils/providerUtils";
import { MemoryRouter } from "react-router-dom";
import SearchModal from "../searchModal";

describe('Search Modal', () => {
  const defaultState: ISearchContextState = {
    ...siteSearchState
  }
  const openState: ISearchContextState = {
    ...defaultState,
    isOpen: true
  }
  it('Should not have a modal in the DOM', () => {
    const { queryByTestId } = renderUseSearchProviderUi(
      <SearchModal />, {
      providerProps: defaultState
    }
    )
    const modal = queryByTestId('searchModal')
    expect(modal).toBeNull()
  })
  it('Should not have a modal in the DOM', () => {
    const { queryByTestId } = renderUseSearchProviderUi(
      <MemoryRouter>
        <SearchModal />
      </MemoryRouter>
      , {
        providerProps: openState
      }
    )
    const modal = queryByTestId('searchModal')
    expect(modal).toBeVisible()
  })
})