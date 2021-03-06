import SimpleTabs from "@App/components/tabs/SimpleTabs/simpleTabs"
import type { ITabsState } from "@App/components/tabs/SimpleTabs/simpleTabsContext";
import type { ISearchContextState } from "@App/hooks/useSearch";
import UseSearchProvider from "@App/hooks/useSearch/useSearchProvider";
import type { ISiteContextState } from "@App/hooks/useSite"
import UseSiteProvider from "@App/hooks/useSite/useSiteProvider"
import type { RenderOptions } from "@testing-library/react";
import { getQueriesForElement, screen } from "@testing-library/react";
import { render } from "@testing-library/react"

function TabsProviderRender(ui: any, { props, ...renderOptions }: any) {
  return render(
    <SimpleTabs customState={props}>{ui}</SimpleTabs>,
    renderOptions,
  )
}
interface IUseSiteRender {
  props: ISiteContextState,
  renderOptions?: Omit<RenderOptions, 'queries'>
}
function UseSiteProviderRender(ui: any, { props, renderOptions }: IUseSiteRender) {
  return render(
    <UseSiteProvider defaultState={props}>{ui}</UseSiteProvider>,
    renderOptions,
  )
}

function renderUseSiteProviderUi(ui: any, { providerProps }: { providerProps: ISiteContextState }) {
  const { rerender } = render(
    <UseSiteProvider defaultState={providerProps}>
      <div data-testid="parent">
        {ui}
      </div>
    </UseSiteProvider>
  )
  const parent = screen.getByTestId('parent')
  const queries = getQueriesForElement(parent)
  return {
    ...queries,
    rerender,
    parent: screen.getByTestId('parent')
  }
}

function renderUseSearchProviderUi(ui: any, { providerProps }: { providerProps: ISearchContextState }) {
  const { rerender } = render(
    <UseSearchProvider defaultState={providerProps}>
      <div data-testid="parent">
        {ui}
      </div>
    </UseSearchProvider>
  )
  const parent = screen.getByTestId('parent')
  const queries = getQueriesForElement(parent)
  return {
    ...queries,
    rerender,
    parent: screen.getByTestId('parent')
  }
}

function renderUseSimpleTabsProviderUi(ui: any, { providerProps }: { providerProps: ITabsState }) {
  const { rerender } = render(
    <SimpleTabs customState={providerProps}>
      <div data-testid="parent">
        {ui}
      </div>
    </SimpleTabs>
  )
  const parent = screen.getByTestId('parent')
  const queries = getQueriesForElement(parent)
  return {
    ...queries,
    rerender,
    parent: screen.getByTestId('parent')
  }
}

export {
  renderUseSimpleTabsProviderUi,
  renderUseSearchProviderUi,
  TabsProviderRender,
  UseSiteProviderRender,
  renderUseSiteProviderUi
}