import { siteInitialState } from "@App/hooks/useSite"
import { getWPMenu } from "@App/lib/wp/site"
import { renderUseSiteProviderUi } from "@TestUtils/providerUtils"
import { MemoryRouter } from "react-router-dom"
import { PrimaryNav } from "../primaryNav"

describe('Primary Nav Component', () => {

  it('Should have correct menu items', () => {
    const menuData = getWPMenu(null)

    const { queryAllByTestId } = renderUseSiteProviderUi(
      <MemoryRouter>
        <PrimaryNav />
      </MemoryRouter>,
      {
        providerProps: {
          ...siteInitialState,
          menu: [
            ...menuData.menus
          ]

        }
      })
    const menuItems = queryAllByTestId('menu-item')
    expect(menuItems.length).toBe(3)
    const item1 = menuItems[0].firstChild
    const item2 = menuItems[1].firstChild
    const item3 = menuItems[2].firstChild

    expect(item1).toHaveTextContent('Courses')
    expect(item1).toHaveAttribute('href', '/courses')

    expect(item2).toHaveTextContent('Products')
    expect(item2).toHaveAttribute('href', '/products')

    expect(item3).toHaveTextContent('Blog')
    expect(item3).toHaveAttribute('href', '/blog')

  })

  it('Should have Tuesday Makers Popup menu', () => {
    const { queryByText } = renderUseSiteProviderUi(
      <MemoryRouter>
        <PrimaryNav />
      </MemoryRouter>,
      {
        providerProps: {
          ...siteInitialState,
        }
      })
    expect(queryByText('Tuesday Makers')).toBeInTheDocument()
  })

  it('Should Not have user logged in', () => {
    const { queryByText } = renderUseSiteProviderUi(
      <MemoryRouter>
        <PrimaryNav />
      </MemoryRouter>,
      {
        providerProps: {
          ...siteInitialState,
        }
      })
    expect(queryByText('Logout')).not.toBeInTheDocument()

  })

  it('Should show user logged in', () => {
    const { queryByText } = renderUseSiteProviderUi(
      <MemoryRouter>
        <PrimaryNav />
      </MemoryRouter>,
      {
        providerProps: {
          ...siteInitialState,
          user: {
            resourceUser: null,
            wpAdmin: true
          }
        }
      })
    expect(queryByText('Logout')).toBeInTheDocument()
  })
})