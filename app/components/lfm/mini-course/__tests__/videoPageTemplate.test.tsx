import { BreakpointEnums } from "@App/enums/breakpointEnums"
import { siteInitialState } from "@App/hooks/useSite"
import { miniCourseVideoData } from "@App/utils/lfmUtils"
import { mockPaidProduct } from "@TestUtils/mock-data/products"
import { renderUseSiteProviderUi } from "@TestUtils/providerUtils"
import VideoPageTemplate from "../videoPageTemplate"

describe('LFM: Video Page Template', () => {
  const video1 = miniCourseVideoData[0]
  it('Should have correct video ID', () => {
    const { getByTestId } = renderUseSiteProviderUi(
      <VideoPageTemplate video={video1} />,
      {
        providerProps: {
          ...siteInitialState,
        }
      })

    const video = getByTestId('wistia-video')
    expect(video).toHaveClass(`wistia_embed wistia_async_${video1.videoId} videoFoam=true`)
  })

  it('Should show 2 Alphabet images on desktop size', () => {
    const { queryAllByTestId } = renderUseSiteProviderUi(
      <VideoPageTemplate video={video1} />,
      {
        providerProps: {
          ...siteInitialState,
          breakpoint: BreakpointEnums.desktop
        }
      })

    const images = queryAllByTestId('lazy-load-image-alphabet')
    expect(images).toHaveLength(2)
  })

  it('Should have correct video title', () => {
    const { queryByText } = renderUseSiteProviderUi(
      <VideoPageTemplate video={video1} />,
      {
        providerProps: {
          ...siteInitialState,
        }
      })

    expect(queryByText(video1.title)).toBeInTheDocument()
  })

  it('Should have correct video description', () => {

    const { queryByText } = renderUseSiteProviderUi(
      <VideoPageTemplate video={video1} />,
      {
        providerProps: {
          ...siteInitialState,
        }
      })

    expect(queryByText(video1.description)).toBeInTheDocument()

  })

  it('Should show children div', () => {
    const { queryByText } = renderUseSiteProviderUi(
      <VideoPageTemplate video={video1}>
        <div>Hello</div>
      </VideoPageTemplate>,
      {
        providerProps: {
          ...siteInitialState,
        }
      })
    expect(queryByText('Hello')).toBeInTheDocument()
  })

  it('Should show single product card', () => {
    const { queryByText } = renderUseSiteProviderUi(
      <VideoPageTemplate video={video1} products={[mockPaidProduct]} />,
      {
        providerProps: {
          ...siteInitialState,
        }
      })

    expect(queryByText(mockPaidProduct.title)).toBeInTheDocument()
  })


})