import { siteInitialState } from "@App/hooks/useSite";
import { fireEvent } from "@testing-library/react";
import { renderUseSiteProviderUi } from "@TestUtils/providerUtils";
import { MemoryRouter } from "react-router";
import TuesdayMakersPrimary from "../popOver/tuesdayMakersPrimary";
import popOverMenuItems from "../popOver/popOverMenuItems";

describe('Tuesday Makers Popover', () => {
  it('Should have Tuesday Makers Button Text', () => {
    const { getByText } = renderUseSiteProviderUi
      (<MemoryRouter>
        <TuesdayMakersPrimary />
      </MemoryRouter>, {
        providerProps: siteInitialState
      });
    expect(getByText('Tuesday Makers')).toBeInTheDocument();
  })
  it('Should open menu when clicked', () => {
    const { getByTestId, queryAllByTestId } = renderUseSiteProviderUi
      (<MemoryRouter>
        <TuesdayMakersPrimary />
      </MemoryRouter>, {
        providerProps: siteInitialState
      });
    const button = getByTestId('tuesday-makers-btn')
    fireEvent.click(button)
    const panelItems = queryAllByTestId('panel-item')
    expect(panelItems).toHaveLength(3)
    // screen.debug()
  })
  it('Should have correct panel items', () => {
    const { getByTestId, queryAllByTestId } = renderUseSiteProviderUi
      (<MemoryRouter>
        <TuesdayMakersPrimary />
      </MemoryRouter>, {
        providerProps: siteInitialState
      });
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
    const { getByTestId, queryAllByTestId } = renderUseSiteProviderUi
      (<MemoryRouter>
        <TuesdayMakersPrimary />
      </MemoryRouter>, {
        providerProps: siteInitialState
      });
    const button = getByTestId('tuesday-makers-btn')
    fireEvent.click(button)
    const panelFooter = getByTestId('panel-footer')
    const panelItems = panelFooter.children
    expect(panelFooter.children.length).toBe(2)
    expect(panelItems[0]).toHaveTextContent('Sign Up')

    expect(panelItems[1]).toHaveTextContent('Login')

  })
  it('Should have footer items for login state', () => {
    const { getByTestId } = renderUseSiteProviderUi
      (<MemoryRouter>
        <TuesdayMakersPrimary />
      </MemoryRouter>, {
        providerProps: {
          ...siteInitialState,
          user: {
            resourceUser: {
              id: 1,
              tags: []
            },
            wpAdmin: false
          }
        }
      })
    const button = getByTestId('tuesday-makers-btn')
    fireEvent.click(button)
    const panelFooter = getByTestId('panel-footer')
    const panelItems = panelFooter.children
    expect(panelFooter.children.length).toBe(1)
    expect(panelItems[0]).toHaveTextContent('Makers Dashboard')
  })
})