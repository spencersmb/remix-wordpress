import { BreakpointEnums } from "@App/enums/breakpointEnums"
import { siteInitialState } from "@App/hooks/useSite"
import { lfmImgRoot } from "@App/utils/lfmUtils"
import { screen } from "@testing-library/react"
import { renderUseSiteProviderUi } from "@TestUtils/providerUtils"
import MiniCourseStep from "../miniCourseStep"

describe('LFM: MiniCourse Step Layout', () => {
  const step = {
    step: 'Video 1',
    title: 'How to Choose a Font Style that Sells',
    description: 'How I discovered + implemented these steps, which led to over $40,000 in font sales my first year creating + selling hand lettered fonts.',
    image: {
      desktop: `${lfmImgRoot.aws}/mini-course/video-1.jpg`,
      mobile: `${lfmImgRoot.aws}/mini-course/video-1-mobile.jpg`,
      alt: 'Mini Course Step 1',
    }
  }
  const step2 = {
    step: 'Video 2',
    title: '5 Font Making Rookie Mistakes',
    description: '5 of the biggest font making myths + mistakes. Avoid them now to save time and money creating your fonts later.',
    image: {
      desktop: `${lfmImgRoot.aws}/mini-course/video-2.jpg`,
      mobile: `${lfmImgRoot.aws}/mini-course/video-2-mobile.jpg`,
      alt: 'Mini Course Step 2',
    }
  }
  it('It Should have Mobile image shown', () => {
    const { queryByTestId } = renderUseSiteProviderUi(
      <MiniCourseStep key={1} stepModule={step} />,
      {
        providerProps: siteInitialState
      }
    )
    expect(queryByTestId('lazy-load-image-video-1-mobile')).toBeInTheDocument()
  })

  it('It Should have Desktop image shown', () => {
    const { queryByTestId } = renderUseSiteProviderUi(
      <MiniCourseStep key={1} stepModule={step} />,
      {
        providerProps: {
          ...siteInitialState,
          breakpoint: BreakpointEnums.desktop
        }
      }
    )
    expect(queryByTestId('lazy-load-image-video-1')).toBeInTheDocument()
    expect(queryByTestId('lazy-load-image-video-1-mobile')).toBeNull()
  })

  it('It should have correct video number', () => {
    const { queryByText } = renderUseSiteProviderUi(
      <MiniCourseStep key={1} stepModule={step} />,
      {
        providerProps: siteInitialState
      }
    )
    expect(queryByText('Video 1')).toBeInTheDocument()
  })

  it('It should have correct title', () => {
    const { queryByText } = renderUseSiteProviderUi(
      <MiniCourseStep key={1} stepModule={step} />,
      {
        providerProps: siteInitialState
      }
    )
    expect(queryByText(step.title)).toBeInTheDocument()
  })

  it('It should have correct description', () => {
    const { queryByText } = renderUseSiteProviderUi(
      <MiniCourseStep key={1} stepModule={step} />,
      {
        providerProps: siteInitialState
      }
    )
    expect(queryByText(step.description)).toBeInTheDocument()
  })

  it('Should render step 2 layout with texture image', () => {
    const { getByTestId, queryByTestId } = renderUseSiteProviderUi(
      <MiniCourseStep key={2} stepModule={step2} />,
      {
        providerProps: siteInitialState
      }
    )

    const stepContainer = getByTestId('video-2-container')
    expect(stepContainer).toHaveClass('laptop:mt-28')

    const imgContainer = getByTestId('video-2-img-container')
    expect(imgContainer).toHaveClass('tablet:row-start-2 tablet:col-start-8 tablet:col-span-6')

    expect(queryByTestId('lazy-load-image-video-2-watercolor-image')).toBeInTheDocument()

    const bg = getByTestId('video-2-bg')
    expect(bg).toHaveClass('left-auto top-[-30px] right-[-30px] h-[210px] tablet:left-auto tablet:top-[-40px] tablet:right-[-30px] tablet:w-[320px] laptop:h-[360px] laptop:top-[-43px] desktop:w-[546px]')

    const contentContainer = getByTestId('video-2-content')
    expect(contentContainer).toHaveClass('tablet:col-start-2 tablet:col-span-6 laptop:col-start-3 laptop:col-span-5')

  })
})