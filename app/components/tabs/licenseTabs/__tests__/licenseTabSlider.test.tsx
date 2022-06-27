import { BreakpointEnums } from "@App/enums/breakpointEnums";
import type { ISiteContextState } from "@App/hooks/useSite";
import { siteInitialState } from "@App/hooks/useSite"
import UseSiteProvider from "@App/hooks/useSite/useSiteProvider"
import { render, screen, getQueriesForElement, waitFor } from "@testing-library/react"
import SimpleTabs from "../../SimpleTabs/simpleTabs"
import type { ITabsState } from "../../SimpleTabs/simpleTabsContext"
import LicenseTabSlider from "../licenseTabSlider"
describe('Tab Slider Pill Tests', () => {
  function renderProviderUi(ui: any, { siteProps, tabProps }: { siteProps: ISiteContextState, tabProps: ITabsState }) {
    const { rerender } = render(
      <UseSiteProvider defaultState={siteProps}>
        <SimpleTabs customState={tabProps}>
          <div data-testid="parent">
            {ui}
          </div>
        </SimpleTabs>
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

  it('Should render position left', async () => {
    const { parent } = renderProviderUi(<LicenseTabSlider />, {
      siteProps: siteInitialState,
      tabProps: {
        selectedTab: 'freebie',
        tabs: []
      }
    })
    await new Promise((r) => setTimeout(r, 300));
    await waitFor(() => {
      const slider = parent.children[0]
      expect(slider).toHaveStyle('left: 8px')
    })
  })

  it('Should render position mobile center', async () => {
    const { parent } = renderProviderUi(<LicenseTabSlider />, {
      siteProps: siteInitialState,
      tabProps: {
        selectedTab: 'standard',
        tabs: []
      }
    })
    await new Promise((r) => setTimeout(r, 300));
    await waitFor(() => {
      const slider = parent.children[0]
      expect(slider).toHaveStyle('left: 106.34px')
    })
  })

  it('Should render position mobile right', async () => {
    const { parent } = renderProviderUi(<LicenseTabSlider />, {
      siteProps: siteInitialState,
      tabProps: {
        selectedTab: 'extended',
        tabs: []
      }
    })
    await new Promise((r) => setTimeout(r, 300));
    await waitFor(() => {
      const slider = parent.children[0]
      expect(slider).toHaveStyle('left: 204.68px')
    })
  })

  it('Should render position desktop left', async () => {
    const { parent } = renderProviderUi(<LicenseTabSlider />, {
      siteProps: {
        ...siteInitialState,
        breakpoint: BreakpointEnums.desktop,
      },
      tabProps: {
        selectedTab: 'freebie',
        tabs: []
      }
    })
    await new Promise((r) => setTimeout(r, 300));
    await waitFor(() => {
      const slider = parent.children[0]
      expect(slider).toHaveStyle('left: 12px')
    })
  })

  it('Should render position desktop center', async () => {
    const { parent } = renderProviderUi(<LicenseTabSlider />, {
      siteProps: {
        ...siteInitialState,
        breakpoint: BreakpointEnums.desktop,
      },
      tabProps: {
        selectedTab: 'standard',
        tabs: []
      }
    })
    await new Promise((r) => setTimeout(r, 300));
    await waitFor(() => {
      const slider = parent.children[0]
      expect(slider).toHaveStyle('left: 192px')
    })
  })

  it('Should render position desktop right', async () => {
    const { parent } = renderProviderUi(<LicenseTabSlider />, {
      siteProps: {
        ...siteInitialState,
        breakpoint: BreakpointEnums.desktop,
      },
      tabProps: {
        selectedTab: 'extended',
        tabs: []
      }
    })
    await new Promise((r) => setTimeout(r, 300));
    await waitFor(() => {
      const slider = parent.children[0]
      expect(slider).toHaveStyle('left: 372px')
    })
  })
})