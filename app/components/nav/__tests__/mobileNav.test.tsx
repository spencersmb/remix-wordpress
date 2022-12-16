import { siteSearchState } from "@App/hooks/useSearch"
import UseSearchProvider from "@App/hooks/useSearch/useSearchProvider"
import { siteInitialState } from "@App/hooks/useSite"
import { getWPMenu } from "@App/lib/wp/site"
import { fireEvent, getAllByTestId, screen } from "@testing-library/react"
import { renderUseSiteProviderUi } from "@TestUtils/providerUtils"
import { MemoryRouter } from "react-router"
import MobileNav from "../mobileNav"

describe('Mobile Nav Component', () => {

  // TODO: Fix this test
  it.skip('Should have Search component and call OpenSearch fn', () => {

    const { getByTestId, queryByText } = renderUseSiteProviderUi(
      <MemoryRouter>
        <UseSearchProvider defaultState={siteSearchState}>
          <MobileNav />
        </UseSearchProvider>
      </MemoryRouter>, {
      providerProps: siteInitialState
    })
    const search = queryByText('Search')
    expect(search).toBeInTheDocument()
    if (!search) {
      expect(false).toBeTruthy()
      return
    }
    fireEvent.click(search)
    // expect(openSearch).toHaveBeenCalled()

  })

  it('Should have correct main links and menu title', () => {

    const menuObj = getWPMenu(null)
    const { queryByText, queryAllByTestId } = renderUseSiteProviderUi(
      <MemoryRouter>
        <UseSearchProvider defaultState={siteSearchState}>
          <MobileNav />
        </UseSearchProvider>
      </MemoryRouter>, {
      providerProps: {
        ...siteInitialState,
        menu: menuObj.menus
      }
    })
    const menuTitle = queryByText(/menu/i)
    expect(menuTitle).toBeInTheDocument()

    const menuItems = queryAllByTestId('menu-item')
    expect(menuItems.length).toBe(5)
    // screen.debug(menuItems[0].firstChild)
    expect(menuItems[0].firstChild).toContainHTML('Courses')
    expect(menuItems[0].firstChild).toHaveAttribute('href', '/courses')

    expect(menuItems[1].firstChild).toContainHTML('Products')
    expect(menuItems[1].firstChild).toHaveAttribute('href', '/products')

    expect(menuItems[2].firstChild).toContainHTML('Blog')
    expect(menuItems[2].firstChild).toHaveAttribute('href', '/blog')

    expect(menuItems[3].firstChild).toContainHTML('About')

    expect(menuItems[4].firstChild).toContainHTML('Contact')
    expect(menuItems[4].firstChild).toHaveAttribute('href', '/contact')
  })

  it('Should have Login Dropdown', () => {

    const { queryByText } = renderUseSiteProviderUi(
      <MemoryRouter>
        <UseSearchProvider defaultState={siteSearchState}>
          <MobileNav />
        </UseSearchProvider>
      </MemoryRouter>, {
      providerProps: siteInitialState
    })
    const title = queryByText('Login')
    expect(title).toBeInTheDocument()


  })

  it('Should have Tuesday Makers AD block with signup button', () => {

    const { queryByText } = renderUseSiteProviderUi(
      <MemoryRouter>
        <UseSearchProvider defaultState={siteSearchState}>
          <MobileNav />
        </UseSearchProvider>
      </MemoryRouter>, {
      providerProps: siteInitialState
    })
    const membersTitle = queryByText('Members')
    const SignUp = queryByText('Sign Up')
    expect(membersTitle).toBeInTheDocument()
    expect(SignUp).toBeInTheDocument()


  })

  it('Should have Social Media Links + Copyright', () => {

    const { queryByText, queryAllByTestId } = renderUseSiteProviderUi(
      <MemoryRouter>
        <UseSearchProvider defaultState={siteSearchState}>
          <MobileNav />
        </UseSearchProvider>
      </MemoryRouter>, {
      providerProps: siteInitialState
    })
    const title = queryByText('Follow Us')
    const copyright = queryByText(/Copyright/i)
    expect(title).toBeInTheDocument()
    expect(copyright).toBeInTheDocument()
    const socialLinks = queryAllByTestId('social-item')
    expect(socialLinks.length).toBe(4)


  })


})