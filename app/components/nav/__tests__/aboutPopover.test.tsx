import { siteInitialState } from "@App/hooks/useSite";
import { fireEvent } from "@testing-library/react";
import { withTransitionsRender } from "@TestUtils/providerUtils";
import { aboutMenuItems } from "../popOver/popOverMenuItems";
import UseSiteProvider from "@App/hooks/useSite/useSiteProvider";
import AboutPopOver from "../popOver/aboutPopOver";

describe('About Popover', () => {
  it('Should have About Button Text', () => {
    const { getByText } = withTransitionsRender(
      <UseSiteProvider defaultState={siteInitialState}>
        <div data-testid="parent">
          <AboutPopOver />
        </div>
      </UseSiteProvider>
    )
    expect(getByText(/About/i)).toBeInTheDocument();
  })
  it('Should open menu when clicked', () => {
    const { getByTestId, queryAllByTestId, queryByTestId } = withTransitionsRender(
      <UseSiteProvider defaultState={siteInitialState}>
        <div data-testid="parent">
          <AboutPopOver />
        </div>
      </UseSiteProvider>
    )
    const button = getByTestId('aboutNav-btn')
    fireEvent.click(button)

    const panelItems = queryAllByTestId('panel-item')
    expect(panelItems).toHaveLength(3)

    const panelSidebar = queryByTestId('panel-sidbar')
    expect(panelSidebar).toBeInTheDocument()

  })
  it('Should have correct panel items', () => {
    const { getByTestId, queryAllByTestId, queryByText } = withTransitionsRender(
      <UseSiteProvider defaultState={siteInitialState}>
        <div data-testid="parent">
          <AboutPopOver />
        </div>
      </UseSiteProvider>
    )
    const button = getByTestId('aboutNav-btn')
    fireEvent.click(button)

    const panelItems = queryAllByTestId('panel-item')

    expect(panelItems[0]).toHaveTextContent(aboutMenuItems[0].name)
    expect(panelItems[0]).toHaveTextContent(aboutMenuItems[0].description)
    expect(panelItems[0]).toHaveAttribute('href', aboutMenuItems[0].href)


    expect(panelItems[1]).toHaveTextContent(aboutMenuItems[1].name)
    expect(panelItems[1]).toHaveTextContent(aboutMenuItems[1].description)
    expect(panelItems[1]).toHaveAttribute('href', aboutMenuItems[1].href)


    expect(panelItems[2]).toHaveTextContent(aboutMenuItems[2].name)
    expect(panelItems[2]).toHaveTextContent(aboutMenuItems[2].description)
    expect(panelItems[2]).toHaveAttribute('href', aboutMenuItems[2].href)

    const email = queryByText(/Email/i)

    expect(email).toBeInTheDocument()
    expect(email?.parentElement).toHaveAttribute('href', '/contact')

    const youtube = queryByText(/youtube/i)

    expect(youtube).toBeInTheDocument()
    expect(youtube?.parentElement).toHaveAttribute('href', 'https://youtube.com/everytues')

    const instagram = queryByText(/instagram/i)

    expect(instagram).toBeInTheDocument()
    expect(instagram?.parentElement).toHaveAttribute('href', 'https://instagram.com/everytuesday')

    const facebook = queryByText(/facebook/i)

    expect(facebook).toBeInTheDocument()
    expect(facebook?.parentElement).toHaveAttribute('href', 'https://facebook.com/everytuesday')



  })
})