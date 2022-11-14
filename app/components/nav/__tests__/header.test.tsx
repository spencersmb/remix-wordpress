import { siteSearchState } from "@App/hooks/useSearch"
import UseSearchProvider from "@App/hooks/useSearch/useSearchProvider"
import { siteInitialState } from "@App/hooks/useSite"
import { withTransitionsRender } from "@TestUtils/providerUtils"
import Header from "../header"
import UseSiteProvider from "@App/hooks/useSite/useSiteProvider"

describe('Header Component', () => {

  it('Should have SVG logo on home link', () => {
    const { getByTestId, queryByLabelText } = withTransitionsRender(
      <UseSiteProvider defaultState={siteInitialState}>
        <div data-testid="parent">
          <UseSearchProvider defaultState={siteSearchState} >
            <Header />
          </UseSearchProvider>
        </div>
      </UseSiteProvider>)
    const logo = getByTestId('logo')
    const SVGLogo = queryByLabelText('Every Tuesday Logo')
    expect(logo.firstChild).toHaveAttribute('href', '/')
    expect(logo.firstChild).toHaveAttribute('title', 'Every Tuesday')
    expect(SVGLogo).toBeVisible()

  })

  it('Mobile Search', () => {
    const { getByTestId } = withTransitionsRender(
      <UseSiteProvider defaultState={siteInitialState}>
        <div data-testid="parent">
          <UseSearchProvider defaultState={siteSearchState} >
            <Header />
          </UseSearchProvider>
        </div>
      </UseSiteProvider>)
    const mobileSearch = getByTestId('search-mobile')
    expect(mobileSearch).toHaveClass('laptop:hidden')
    expect(mobileSearch).toHaveTextContent('Site Search')

  })

  it('Mobile Hamburger', () => {
    const { getByTestId } = withTransitionsRender(
      <UseSiteProvider defaultState={siteInitialState}>
        <div data-testid="parent">
          <UseSearchProvider defaultState={siteSearchState} >
            <Header />
          </UseSearchProvider>
        </div>
      </UseSiteProvider>)
    const mobileHamburger = getByTestId('hamburger')
    expect(mobileHamburger).toHaveClass('laptop:hidden')
    expect(mobileHamburger).toHaveTextContent('Hamburger Nav')
  })

  it('It should show <Primary Nav />', () => {
    const { queryByLabelText } = withTransitionsRender(
      <UseSiteProvider defaultState={siteInitialState}>
        <div data-testid="parent">
          <UseSearchProvider defaultState={siteSearchState} >
            <Header />
          </UseSearchProvider>
        </div>
      </UseSiteProvider>)
    const primaryNav = queryByLabelText('desktop navigation')
    expect(primaryNav).toBeInTheDocument()
  })

  it('It should show alternate Nav', () => {
    const { queryByText } = withTransitionsRender(
      <UseSiteProvider defaultState={siteInitialState}>
        <div data-testid="parent">
          <UseSearchProvider defaultState={siteSearchState} >
            <Header alternateNav={<div>alternate nav</div>} />
          </UseSearchProvider>
        </div>
      </UseSiteProvider>)

    const alternateNav = queryByText('alternate nav')
    expect(alternateNav).toBeInTheDocument()
  })

  // TODO: REDO TO REFLECT NEW LOGIN MASTER BUTTON
  it.skip('It should have Course Login Btn', () => {
    const { queryByText } = withTransitionsRender(
      <UseSiteProvider defaultState={siteInitialState}>
        <div data-testid="parent">
          <UseSearchProvider defaultState={siteSearchState} >
            <Header />
          </UseSearchProvider>
        </div>
      </UseSiteProvider>)
    const CourseBtn = queryByText('Course Login')
    expect(CourseBtn).toBeInTheDocument()
    expect(CourseBtn).toHaveAttribute('href', 'https://teachable.com')

  })

  it('It should have Search Button desktop', () => {
    const { queryByTestId } = withTransitionsRender(
      <UseSiteProvider defaultState={siteInitialState}>
        <div data-testid="parent">
          <UseSearchProvider defaultState={siteSearchState} >
            <Header />
          </UseSearchProvider>
        </div>
      </UseSiteProvider>)
    const searchBtn = queryByTestId('search-icon-desktop')
    expect(searchBtn).toBeInTheDocument()

  })
})