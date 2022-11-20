import { siteInitialState } from "@App/hooks/useSite"
import UseSiteProvider from "@App/hooks/useSite/useSiteProvider";
import { renderUseSiteProviderUi } from "@TestUtils/providerUtils"
import { MemoryRouter } from 'react-router-dom'
import renderer from 'react-test-renderer';
import ThankyouErrorMessage from "../thankyou-error-message";
import ThankyouSuccessMessage from "../thankyou-success-message";


describe('Thank you success message', () => {
  const fakeUser = {
    email: 'spencer.bigum@gmail.com',
    id: 123456,
    tags: ['tuesdaymakers', 'procreate']
  }
  it('Should render Snapshot of Thank you success message layout', () => {
    const tree = renderer
      .create(
        <MemoryRouter>
          <UseSiteProvider defaultState={siteInitialState}>
            <ThankyouSuccessMessage
              user={fakeUser}
            />
          </UseSiteProvider>
        </MemoryRouter>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  })

  it('Should show correct email address', () => {
    const { queryByText } = renderUseSiteProviderUi(
      <MemoryRouter>
        <ThankyouSuccessMessage user={fakeUser} />
      </MemoryRouter>,
      {
        providerProps: siteInitialState
      }
    )

    const text = queryByText(fakeUser.email)
    expect(text).toBeVisible()
    expect(text?.innerHTML).toEqual(fakeUser.email)
  })

  it('Should show Resource Library Link Btn', () => {
    const { queryByText } = renderUseSiteProviderUi(
      <MemoryRouter>
        <ThankyouSuccessMessage user={fakeUser} />
      </MemoryRouter>,
      {
        providerProps: siteInitialState
      }
    )

    const btn = queryByText('Take me to the Resource Library')
    expect(btn).toBeVisible()
    expect(btn).toHaveAttribute('href', '/tuesday-makers/members')
  })

})