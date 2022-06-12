import { siteSearchState } from "@App/hooks/useSearch"
import UseSearchProvider from "@App/hooks/useSearch/useSearchProvider"
import { siteInitialState } from "@App/hooks/useSite"
import { renderUseSiteProviderUi } from "@TestUtils/providerUtils"
import { MemoryRouter } from "react-router"
import Header from "../header"

describe('Header Component', () => {

  it('Should have SVG logo on home link', () => {
    const { getByTestId, queryByLabelText } = renderUseSiteProviderUi(
      <MemoryRouter>
        <UseSearchProvider defaultState={siteSearchState} >
          <Header />
        </UseSearchProvider>
      </MemoryRouter>
      , { providerProps: siteInitialState }
    )
    const logo = getByTestId('logo')
    const SVGLogo = queryByLabelText('Every Tuesday Logo')
    expect(logo.firstChild).toHaveAttribute('href', '/')
    expect(logo.firstChild).toHaveAttribute('title', 'Every Tuesday')
    expect(SVGLogo).toBeVisible()

  })

  it('Mobile Search', () => {
    const { getByTestId, queryByLabelText } = renderUseSiteProviderUi(
      <MemoryRouter>
        <UseSearchProvider defaultState={siteSearchState} >
          <Header />
        </UseSearchProvider>
      </MemoryRouter>
      , { providerProps: siteInitialState }
    )
    const mobileSearch = getByTestId('search-mobile')
    expect(mobileSearch).toHaveClass('laptop:hidden')
    expect(mobileSearch).toHaveTextContent('Site Search')

  })

  it('Mobile Hamburger', () => {
    const { getByTestId } = renderUseSiteProviderUi(
      <MemoryRouter>
        <UseSearchProvider defaultState={siteSearchState} >
          <Header />
        </UseSearchProvider>
      </MemoryRouter>
      , { providerProps: siteInitialState }
    )
    const mobileHamburger = getByTestId('hamburger')
    expect(mobileHamburger).toHaveClass('laptop:hidden')
    expect(mobileHamburger).toHaveTextContent('Hamburger Nav')

  })

  it('It should show <Primary Nav />', () => {
    const { queryByLabelText } = renderUseSiteProviderUi(
      <MemoryRouter>
        <UseSearchProvider defaultState={siteSearchState} >
          <Header />
        </UseSearchProvider>
      </MemoryRouter>
      , { providerProps: siteInitialState }
    )
    const primaryNav = queryByLabelText('desktop navigation')
    expect(primaryNav).toBeInTheDocument()
  })

  it('It should show alternate Nav', () => {
    const { queryByText } = renderUseSiteProviderUi(
      <MemoryRouter>
        <UseSearchProvider defaultState={siteSearchState} >
          <Header alternateNav={<div>alternate nav</div>} />
        </UseSearchProvider>
      </MemoryRouter>
      , { providerProps: siteInitialState }
    )
    const alternateNav = queryByText('alternate nav')
    expect(alternateNav).toBeInTheDocument()
  })

  it('It should have Course Login Btn', () => {
    const { queryByText } = renderUseSiteProviderUi(
      <MemoryRouter>
        <UseSearchProvider defaultState={siteSearchState} >
          <Header />
        </UseSearchProvider>
      </MemoryRouter>
      , { providerProps: siteInitialState }
    )
    const CourseBtn = queryByText('Course Login')
    expect(CourseBtn).toBeInTheDocument()
    expect(CourseBtn).toHaveAttribute('href', 'https://teachable.com')

  })

  it('It should have Search Button desktop', () => {
    const { queryByTestId } = renderUseSiteProviderUi(
      <MemoryRouter>
        <UseSearchProvider defaultState={siteSearchState} >
          <Header />
        </UseSearchProvider>
      </MemoryRouter>
      , { providerProps: siteInitialState }
    )
    const searchBtn = queryByTestId('search-icon-desktop')
    expect(searchBtn).toBeInTheDocument()

  })
})