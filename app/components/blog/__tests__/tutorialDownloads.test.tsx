import BasicModal from "@App/components/modals/BasicModal"
import type { ISiteContextState } from "@App/hooks/useSite"
import { fireEvent, screen, waitFor } from "@testing-library/react"
import { mockPostData, mockTutorialManagerDownloads } from "@TestUtils/mock-data/posts"
import { mockUseSiteData_default } from "@TestUtils/mock-data/useSiteMock"
import { UseSiteProviderRender } from "@TestUtils/providerUtils"
import TutorialDownloads from "../tutorialContent/tutorialDownloads"


describe('Tutorial Downloads Component', () => {

  it('Should not render Downloads list', () => {

    const stateProps: ISiteContextState = {
      ...mockUseSiteData_default
    }
    const tutorialProps: {
      post: IPost
      style?: any
      isMobile?: boolean
    } = {
      post: mockPostData,
      style: {
        top: 0
      },
      isMobile: true

    }
    UseSiteProviderRender(
      <div data-testid="parent">
        <TutorialDownloads {...tutorialProps} />
      </div>
      , { props: stateProps })


    expect(screen.queryByTestId('downloads-list')).toBeNull()
  })

  it('Should render Login Header', () => {

    const stateProps: ISiteContextState = {
      ...mockUseSiteData_default
    }
    const tutorialProps: {
      post: IPost
      style?: any
      isMobile?: boolean
    } = {
      post: {
        ...mockPostData,
        tutorialManager: {
          ...mockPostData.tutorialManager,
          downloads: mockTutorialManagerDownloads
        }
      },
      style: {
        top: 0
      },
      isMobile: true

    }
    UseSiteProviderRender(
      <TutorialDownloads {...tutorialProps} />
      , { props: stateProps })

    expect(screen.getByTestId('test-tutorialDownloads')).toBeVisible()
    expect(screen.getByTestId('test-tutorialDownloads')).toHaveTextContent('Tutorial Downloads')
    expect(screen.getByTestId('test-tutorialDownloads')).toHaveTextContent('Gain access to all tutorial assets for free by joining Tuesday Makers.')
  })

  it('Should render Locked Content', () => {

    const stateProps: ISiteContextState = {
      ...mockUseSiteData_default
    }
    const tutorialProps: {
      post: IPost
      style?: any
      isMobile?: boolean
    } = {
      post: {
        ...mockPostData,
        tutorialManager: {
          ...mockPostData.tutorialManager,
          downloads: mockTutorialManagerDownloads
        }
      },
      style: {
        top: 0
      },
      isMobile: true

    }
    UseSiteProviderRender(
      <TutorialDownloads {...tutorialProps} />
      , { props: stateProps })


    // locked content title
    const downloadItems = screen.getAllByTestId('test-downloadItem')
    expect(downloadItems[0]).toHaveTextContent(mockTutorialManagerDownloads[0].title)

  })

  it('Should render Subscribe/Login Buttons', () => {

    const stateProps: ISiteContextState = {
      ...mockUseSiteData_default
    }
    const tutorialProps: {
      post: IPost
      style?: any
      isMobile?: boolean
    } = {
      post: {
        ...mockPostData,
        tutorialManager: {
          ...mockPostData.tutorialManager,
          downloads: mockTutorialManagerDownloads
        }
      },
      style: {
        top: 0
      },
      isMobile: true

    }

    UseSiteProviderRender(
      <TutorialDownloads {...tutorialProps} />
      , { props: stateProps })


    // Locked Button Checks
    const buttons = screen.getAllByTestId('download-btn')
    expect(screen.getByTestId('test-tutorialDownloads')).toHaveTextContent('Sign In')
    expect(buttons[0]).toBeDisabled()

    // Subscribe Button Checks
    const subscribeButton = screen.getByTestId('subscribe-btn')
    expect(subscribeButton).toHaveTextContent('Subscribe')
  })

  it('Should open & show signin modal onClick', () => {

    const stateProps: ISiteContextState = {
      ...mockUseSiteData_default
    }
    const tutorialProps: {
      post: IPost
      style?: any
      isMobile?: boolean
    } = {
      post: {
        ...mockPostData,
        tutorialManager: {
          ...mockPostData.tutorialManager,
          downloads: mockTutorialManagerDownloads
        }
      },
      style: {
        top: 0
      },
      isMobile: true

    }

    UseSiteProviderRender(
      <div>
        <TutorialDownloads {...tutorialProps} />
        <BasicModal />
      </div>
      , { props: stateProps })


    // Locked Button Checks
    const button = screen.getByTestId('test-tutorialDownloads')
    fireEvent.click(button)
    waitFor(() => expect(screen.queryByTestId('test-tuesdayMakersSignUpModal')).toBeVisible())

  })

  it('Should open & show signUp modal onClick', () => {

    const stateProps: ISiteContextState = {
      ...mockUseSiteData_default
    }
    const tutorialProps: {
      post: IPost
      style?: any
      isMobile?: boolean
    } = {
      post: {
        ...mockPostData,
        tutorialManager: {
          ...mockPostData.tutorialManager,
          downloads: mockTutorialManagerDownloads
        }
      },
      style: {
        top: 0
      },
      isMobile: true

    }

    UseSiteProviderRender(
      <div>
        <TutorialDownloads {...tutorialProps} />
        <BasicModal />
      </div>
      , { props: stateProps })


    // Locked Button Checks
    const button = screen.getByTestId('login-btn')
    fireEvent.click(button)
    waitFor(() => expect(screen.queryByTestId('test-tuesdayMakersLoginModal')).toBeVisible())

  })

  // USER LOGGED IN
  // CHECKS
  it('Should render Unlocked View', () => {

    const stateProps: ISiteContextState = {
      ...mockUseSiteData_default,
      user: {
        ...mockUseSiteData_default.user,
        resourceUser: {
          id: 1,
          tags: [],
        },
      }
    }
    const tutorialProps: {
      post: IPost
      style?: any
      isMobile?: boolean
    } = {
      post: {
        ...mockPostData,
        tutorialManager: {
          ...mockPostData.tutorialManager,
          downloads: mockTutorialManagerDownloads
        }
      },
      style: {
        top: 0
      },
      isMobile: true

    }

    UseSiteProviderRender(
      <TutorialDownloads {...tutorialProps} />
      , { props: stateProps })


    // Button Checks
    const header = screen.getByTestId('test-tutorialDownloads')

    // Has Correct Header Test
    expect(header).toHaveTextContent('Tutorial Downloads')

    // Shouldnt find Subscribe Button Text
    expect(header).not.toHaveTextContent('Subscribe')

    // CHeck Download buttons are enabled
    const downloadItems = screen.getAllByTestId('test-downloadItem')
    expect(downloadItems[0]).toBeEnabled()

  })

  it('Should allow user to download item', () => {

    const stateProps: ISiteContextState = {
      ...mockUseSiteData_default,
      user: {
        ...mockUseSiteData_default.user,
        resourceUser: {
          id: 1,
          tags: [],
        },
      }
    }
    const tutorialProps: {
      post: IPost
      style?: any
      isMobile?: boolean
    } = {
      post: {
        ...mockPostData,
        tutorialManager: {
          ...mockPostData.tutorialManager,
          downloads: mockTutorialManagerDownloads
        }
      },
      style: {
        top: 0
      },
      isMobile: true

    }

    UseSiteProviderRender(
      <TutorialDownloads {...tutorialProps} />
      , { props: stateProps })


    window.open = jest.fn()

    const downloadItems = screen.getAllByTestId('download-btn')
    const button = downloadItems[0]
    fireEvent.click(button)
    expect(window.open)
      .toHaveBeenCalledWith(mockTutorialManagerDownloads[0].freebie.downloadLink, '_blank')

    expect(window.open).toHaveBeenCalledTimes(1)

  })

})