import { siteInitialState } from "@App/hooks/useSite"
import { renderUseSiteProviderUi } from "@TestUtils/providerUtils"
import { MemoryRouter } from 'react-router-dom'
import renderer from 'react-test-renderer';
import ThankyouErrorMessage from "../thankyou-error-message";


describe('Thank you error message', () => {

  it('Should render Snapshot of Thank you error message layout', () => {
    const tree = renderer
      .create(
        <MemoryRouter>
          <ThankyouErrorMessage
            message="Error Mesage"
          />
        </MemoryRouter>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  })

  it('Should show Error Message', () => {
    const { queryByText } = renderUseSiteProviderUi(
      <MemoryRouter>
        <ThankyouErrorMessage message="Error Mesage" />
      </MemoryRouter>,
      {
        providerProps: siteInitialState
      }
    )

    const text = queryByText('Error Mesage')
    expect(text).toBeVisible()
  })

  it('Should show Sign Up again Button', () => {
    const { queryByText } = renderUseSiteProviderUi(
      <MemoryRouter>
        <ThankyouErrorMessage message="Error Mesage" />
      </MemoryRouter>,
      {
        providerProps: siteInitialState
      }
    )

    const btn = queryByText('Try Sign up again')
    expect(btn).toBeVisible()
    expect(btn).toHaveAttribute('href', '/tuesday-makers')
  })

})