import BasicModal from "@App/components/modals/BasicModal"
import type { ISiteContextState } from "@App/hooks/useSite"
import { fireEvent, screen } from "@testing-library/react"
import { mockPostData, mockTutorialManagerDownloads } from "@TestUtils/mock-data/posts"
import { mockPaidProduct } from "@TestUtils/mock-data/products"
import { mockUseSiteData_default } from "@TestUtils/mock-data/useSiteMock"
import { UseSiteProviderRender } from "@TestUtils/providerUtils"
import TutorialDownloads from "../tutorialContent/tutorialDownloads"


describe('Tutorial Downloads Component', () => {
  it('Should render no component', () => {

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


    expect(screen.getByTestId('parent')).toBeEmptyDOMElement()
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


    // Locked Button Checks
    const buttons = screen.getAllByTestId('download-btn')
    expect(screen.getByTestId('test-tutorialDownloads')).toHaveTextContent('Sign In')
    expect(buttons[0]).toBeDisabled()

    // locked content title
    const downloadItems = screen.getAllByTestId('test-downloadItem')
    expect(downloadItems[0]).toHaveTextContent(mockTutorialManagerDownloads[0].title)

  })

  it('Should render Subscribe Button and handleClick', () => {

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
    // const spy = jest.spyOn(TutorialDownloads.prototype, 'handleSignupClick');
    UseSiteProviderRender(
      <TutorialDownloads {...tutorialProps} />
      , { props: stateProps })


    // Button Checks
    const subscribeButton = screen.getByTestId('subscribe-btn')
    expect(subscribeButton).toHaveTextContent('Subscribe')
    fireEvent.click(subscribeButton)

    // expect(spy).toHaveBeenCalled();
    // expect(screen.getByTestId('test-tuesdayMakersSignUpModal')).toBeVisible()
  })


})