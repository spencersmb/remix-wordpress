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

  it.skip('Should not show a signup form', () => {
    const { queryByTestId } = renderUseSiteProviderUi(
      <MiniCourseBanner />,
      {
        providerProps: siteInitialState
      }
    )

    expect(queryByTestId('lfm-mc-signup-footer')).toBeNull()
  })

  it.skip('Should have title text', () => {
    const { queryByText } = renderUseSiteProviderUi(
      <MiniCourseBanner />,
      {
        providerProps: siteInitialState
      }
    )

    expect(queryByText('Free Font Making')).toBeVisible()
  })

  it.skip('Should have MiniCourse CTA text', () => {
    const { queryByText } = renderUseSiteProviderUi(
      <MiniCourseBanner />,
      {
        providerProps: siteInitialState
      }
    )
    expect(queryByText('Watch the basics of hand lettered font making *and* selling in this 3 part free video series.')).toBeInTheDocument()
  })

  it.skip('Should have alternate MiniCourse CTA text', () => {
    const { queryByText } = renderUseSiteProviderUi(
      <MiniCourseBanner />,
      {
        providerProps: {
          ...siteInitialState,
          metadata: {
            ...siteInitialState.metadata,
            courseLaunchBanners: {
              ...siteInitialState.metadata.courseLaunchBanners,
              lfmBanner: {
                ...siteInitialState.metadata.courseLaunchBanners.lfmBanner,
                minicourseSignup: false
              }
            }
          }
        },
      }
    )
    expect(queryByText('Sign up to get notified as soon as enrollment reopens!')).toBeInTheDocument()
  })

  it.skip('Should render child', () => {
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