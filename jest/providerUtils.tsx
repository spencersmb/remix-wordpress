import SimpleTabs from "@App/components/tabs/SimpleTabs/simpleTabs"
import type { ITabsState } from "@App/components/tabs/SimpleTabs/simpleTabsContext";
import type { ISearchContextState } from "@App/hooks/useSearch";
import UseSearchProvider from "@App/hooks/useSearch/useSearchProvider";
import type { ISiteContextState } from "@App/hooks/useSite"
import UseSiteProvider from "@App/hooks/useSite/useSiteProvider"
import { RemixBrowser } from "@remix-run/react";
import type { RenderOptions } from "@testing-library/react";
import { getQueriesForElement, screen } from "@testing-library/react";
import { render as rtlRender } from "@testing-library/react"

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
  return rtlRender(
    <UseSiteProvider defaultState={props}>{ui}</UseSiteProvider>,
    renderOptions,
  )
}

function renderUseSiteProviderUi(ui: any, { providerProps }: { providerProps: ISiteContextState }) {

  const { rerender } = rtlRender(
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
  const { rerender } = rtlRender(
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
  const { rerender } = rtlRender(
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

function render(ui: React.ReactElement, options?: RenderOptions) {
  function RootComponent() {
    return ui;
  }

  window.__remixManifest = {
    routes: {
      root: {
        hasAction: false,
        hasCatchBoundary: false,
        hasErrorBoundary: false,
        hasLoader: false,
        id: "root",
        imports: [],
        module: "",
        path: "",
      },
    },
    entry: { imports: [], module: "" },
    url: "",
    version: "",
  };
  window.__remixRouteModules = { root: { default: RootComponent } };
  window.__remixContext = {
    matches: [],
    manifest: window.__remixManifest,
    routeModules: window.__remixRouteModules,
    routeData: {},
    appState: {
      catchBoundaryRouteId: null,
      loaderBoundaryRouteId: null,
      renderBoundaryRouteId: "root",
      trackBoundaries: false,
      trackCatchBoundaries: false,
    },
  };

  function Wrapper({ children }: { children: React.ReactNode }) {
    return <RemixBrowser>{children}</RemixBrowser>;
  }
  return rtlRender(ui, {
    wrapper: Wrapper,
  });
}

function withTransitionsRender(ui: React.ReactElement) {
  const { rerender } = render(ui)
  const parent = screen.getByTestId('parent')
  const queries = getQueriesForElement(parent)
  return {
    ...queries,
    rerender,
    parent: screen.getByTestId('parent')
  }
}

export {
  withTransitionsRender,
  renderUseSimpleTabsProviderUi,
  renderUseSearchProviderUi,
  TabsProviderRender,
  UseSiteProviderRender,
  renderUseSiteProviderUi
}