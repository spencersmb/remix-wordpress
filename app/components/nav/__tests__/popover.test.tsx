import { siteInitialState } from "@App/hooks/useSite";
import { fireEvent } from "@testing-library/react";
import { renderUseSiteProviderUi, withTransitionsRender } from "@TestUtils/providerUtils";
import { MemoryRouter } from "react-router";
import TuesdayMakersPrimary from "../popOver/tuesdayMakersPrimary";
import popOverMenuItems from "../popOver/popOverMenuItems";
import UseSiteProvider from "@App/hooks/useSite/useSiteProvider";

describe('Tuesday Makers Popover', () => {
  it('Should have Tuesday Makers Button Text', () => {
    const { getByText } = withTransitionsRender(
      <UseSiteProvider defaultState={siteInitialState}>
        <div data-testid="parent">
          <TuesdayMakersPrimary />
        </div>
      </UseSiteProvider>
    )
    expect(getByText('Tuesday Makers')).toBeInTheDocument();
  })
  it('Should open menu when clicked', () => {
    const { getByTestId, queryAllByTestId } = withTransitionsRender(
      <UseSiteProvider defaultState={siteInitialState}>
        <div data-testid="parent">
          <TuesdayMakersPrimary />
        </div>
      </UseSiteProvider>
    )
    const button = getByTestId('tuesday-makers-btn')
    fireEvent.click(button)
    const panelItems = queryAllByTestId('panel-item')
    expect(panelItems).toHaveLength(3)
    // screen.debug()
  })
  it('Should have correct panel items', () => {
    const { getByTestId, queryAllByTestId } = withTransitionsRender(
      <UseSiteProvider defaultState={siteInitialState}>
        <div data-testid="parent">
          <TuesdayMakersPrimary />
        </div>
      </UseSiteProvider>
    )
    const button = getByTestId('tuesday-makers-btn')
    fireEvent.click(button)
    const panelItems = queryAllByTestId('panel-item')

    expect(panelItems[0]).toHaveTextContent(popOverMenuItems[0].name)
    expect(panelItems[0]).toHaveTextContent(popOverMenuItems[0].description)


    expect(panelItems[1]).toHaveTextContent(popOverMenuItems[1].name)
    expect(panelItems[1]).toHaveTextContent(popOverMenuItems[1].description)


    expect(panelItems[2]).toHaveTextContent(popOverMenuItems[2].name)
    expect(panelItems[2]).toHaveTextContent(popOverMenuItems[2].description)

  })
  it('Should have footer items for logout state', () => {
    const { getByTestId, queryAllByTestId } = withTransitionsRender(
      <UseSiteProvider defaultState={siteInitialState}>
        <div data-testid="parent">
          <TuesdayMakersPrimary />
        </div>
      </UseSiteProvider>
    )
    const button = getByTestId('tuesday-makers-btn')
    fireEvent.click(button)
    const panelFooter = getByTestId('panel-footer')
    const panelItems = panelFooter.children
    expect(panelFooter.children.length).toBe(2)
    expect(panelItems[0]).toHaveTextContent('Sign Up')

    expect(panelItems[1]).toHaveTextContent('Login')

  })
  it('Should have footer items for login state', () => {
    const { getByTestId } = withTransitionsRender(
      <UseSiteProvider defaultState={{
        ...siteInitialState,
        user: {
          resourceUser: {
            id: 1,
            tags: []
          },
          wpAdmin: false
        }
      }}>
        <div data-testid="parent">
          <TuesdayMakersPrimary />
        </div>
      </UseSiteProvider>
    )
    const button = getByTestId('tuesday-makers-btn')
    fireEvent.click(button)
    const panelFooter = getByTestId('panel-footer')
    const panelItems = panelFooter.children
    expect(panelFooter.children.length).toBe(1)
    expect(panelItems[0]).toHaveTextContent('Makers Dashboard')
  })
})