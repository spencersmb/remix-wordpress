import { siteInitialState } from "@App/hooks/useSite"
import UseSiteProvider from "@App/hooks/useSite/useSiteProvider"
import { screen } from "@testing-library/react"
import { withTransitionsRender } from "@TestUtils/providerUtils"
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
})