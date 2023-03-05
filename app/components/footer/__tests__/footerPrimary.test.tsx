import type { ISiteContextState } from "@App/hooks/useSite";
import { siteInitialState } from "@App/hooks/useSite"
import UseSiteProvider from "@App/hooks/useSite/useSiteProvider"
import { screen } from "@testing-library/react"
import { mockUseSiteData_default } from "@TestUtils/mock-data/useSiteMock"
import { renderUseSiteProviderUi, UseSiteProviderRender, withTransitionsRender } from "@TestUtils/providerUtils"
import { MemoryRouter } from "react-router"
import FooterPrimary from "../FooterPrimary"

describe('Footer Primary test', () => {

  it('Should Show Form', () => {

    const { getByText } = withTransitionsRender(
      <UseSiteProvider defaultState={siteInitialState}>
        <div data-testid="parent">
          <FooterPrimary />
        </div>
      </UseSiteProvider>
    )
    expect(getByText(/Send the goods!/i)).toBeInTheDocument()

  })

  it('Should Not Show Form', () => {

    const { queryByText } = withTransitionsRender(
      <UseSiteProvider defaultState={siteInitialState}>
        <div data-testid="parent">
          <FooterPrimary hideSignUp={true} />
        </div>
      </UseSiteProvider>
    )
    expect(queryByText(/Send the goods!/i)).toBeNull()

  })

  it('Should Show FooterLinks Component', () => {
    const { queryByTestId } = withTransitionsRender(
      <UseSiteProvider defaultState={siteInitialState}>
        <div data-testid="parent">
          <FooterPrimary />
        </div>
      </UseSiteProvider>
    )
    expect(queryByTestId('footer-links')).toBeInTheDocument()
  })

  it('Should Show FooterCopy Right Component', () => {
    const { queryByTestId } = withTransitionsRender(
      <UseSiteProvider defaultState={siteInitialState}>
        <div data-testid="parent">
          <FooterPrimary />
        </div>
      </UseSiteProvider>
    )
    expect(queryByTestId('footer-copyright')).toBeInTheDocument()
  })

  /*
  * Disbled the Footer SignUp Form just to test the footer route because of conflicts with the useFetcher hook and the MemoryRouter.
  */
  it('Should Not Show Footer For specific routes', () => {
    const stateProps: ISiteContextState = {
      ...mockUseSiteData_default
    }
    const { queryByTestId } = renderUseSiteProviderUi(
      <MemoryRouter initialEntries={['/brushPreview']}>
        <UseSiteProvider defaultState={siteInitialState}>
          <FooterPrimary hideSignUp={true} />
        </UseSiteProvider>
      </MemoryRouter>
      , { providerProps: stateProps })


    expect(queryByTestId('footer')).toBeFalsy()
  })

  it('Should Show Footer for all other routes', () => {
    const stateProps: ISiteContextState = {
      ...mockUseSiteData_default
    }
    const { queryByTestId } = renderUseSiteProviderUi(
      <MemoryRouter initialEntries={['/products']}>
        <UseSiteProvider defaultState={siteInitialState}>
          <FooterPrimary hideSignUp={true} />
        </UseSiteProvider>
      </MemoryRouter>
      , { providerProps: stateProps })


    expect(queryByTestId('footer')).toBeInTheDocument()
  })
})