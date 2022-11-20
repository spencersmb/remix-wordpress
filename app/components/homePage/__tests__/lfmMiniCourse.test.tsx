import { siteInitialState } from "@App/hooks/useSite"
import { renderUseSiteProviderUi } from "@TestUtils/providerUtils"
import LfmMiniCourse from "../lfmMiniCourse"
import { MemoryRouter } from 'react-router-dom'
import renderer from 'react-test-renderer';
import UseSiteProvider from "@App/hooks/useSite/useSiteProvider";


describe('LFM MiniCourse Homepage Section', () => {

  it('Should render Snapshot of lfm-mini-course homepage section', () => {
    const tree = renderer
      .create(
        <MemoryRouter>
          <UseSiteProvider defaultState={siteInitialState}>
            <LfmMiniCourse />
          </UseSiteProvider>
        </MemoryRouter>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  })

  it('Should show View Mini Course Btn when class is closed', () => {
    const { queryByText } = renderUseSiteProviderUi(
      <MemoryRouter>
        <LfmMiniCourse />
      </MemoryRouter>,
      {
        providerProps: siteInitialState
      }
    )

    const btn = queryByText('View Mini Course')
    expect(btn).toBeVisible()
    expect(btn).toHaveAttribute('href', '/learn-font-making')
  })

  it('Should show View Course Btn when class is open w/ External link', () => {
    const { queryByText } = renderUseSiteProviderUi(
      <MemoryRouter>
        <LfmMiniCourse />
      </MemoryRouter>,
      {
        providerProps: {
          ...siteInitialState,
          metadata: {
            ...siteInitialState.metadata,
            courseLaunchBanners: {
              ...siteInitialState.metadata.courseLaunchBanners,
              lfmBanner: {
                ...siteInitialState.metadata.courseLaunchBanners.lfmBanner,
                showBanner: 'true',
              }
            }
          }
        }
      }
    )

    const btn = queryByText('View Course')
    expect(btn).toBeVisible()
    expect(btn).toHaveAttribute('rel', 'noopener noreferrer')
    expect(btn).toHaveAttribute('href', 'https://courses.every-tuesday.com/p/learn-font-making')
  })
})