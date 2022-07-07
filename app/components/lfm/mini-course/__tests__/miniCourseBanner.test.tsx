import { siteInitialState } from "@App/hooks/useSite"
import { renderUseSiteProviderUi } from "@TestUtils/providerUtils"
import MiniCourseBanner from "../miniCourseBanner"

describe('LFM: MiniCourse Banner', () => {
  beforeEach(() => {
    // IntersectionObserver isn't available in test environment
    const mockIntersectionObserver = jest.fn();
    mockIntersectionObserver.mockReturnValue({
      observe: () => null,
      unobserve: () => null,
      disconnect: () => null
    });
    window.IntersectionObserver = mockIntersectionObserver;
  });

  it('Should not show a signup form', () => {
    const { queryByTestId } = renderUseSiteProviderUi(
      <MiniCourseBanner />,
      {
        providerProps: siteInitialState
      }
    )

    expect(queryByTestId('lfm-mc-signup-footer')).toBeNull()
  })

  it('Should have title text', () => {
    const { queryByText } = renderUseSiteProviderUi(
      <MiniCourseBanner />,
      {
        providerProps: siteInitialState
      }
    )

    expect(queryByText('Free Font Making')).toBeVisible()
  })

  it('Should render child', () => {
    const { queryByText } = renderUseSiteProviderUi(
      <MiniCourseBanner >
        <div>Child</div>
      </MiniCourseBanner>,
      {
        providerProps: siteInitialState
      }
    )

    expect(queryByText('Child')).toBeVisible()
  })
})