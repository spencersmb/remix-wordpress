import { ImageSizeEnums } from "@App/enums/imageEnums"
import { siteInitialState } from "@App/hooks/useSite"
import { staticImages } from "@App/lib/imgix/data"
import { defaultImages, loadImageSrc } from "@App/utils/imageHelpers"
import { screen } from "@testing-library/react"
import { mockPostDataComplete } from "@TestUtils/mock-data/posts"
import { mockPaidProduct } from "@TestUtils/mock-data/products"
import { renderUseSiteProviderUi } from "@TestUtils/providerUtils"
import IpadFeatureImage from "../ipadFeatureImage"

describe('IpadFeatureImage Component', () => {
  const featuredImage = loadImageSrc({
    imageSizeName: ImageSizeEnums.FEATURE, // image name to try and get
    imageObject: mockPostDataComplete.featuredImage, // the featured image object
    fallbackSize: ImageSizeEnums.LARGE, // fallback size to use if the image name doesn't exist
    fallbackImage: defaultImages.featured
  })
  const props = {
    featuredImage,
    product: mockPaidProduct
  }

  it('Should show apple pencil image', () => {
    const { queryByAltText } = renderUseSiteProviderUi(
      <IpadFeatureImage {...props} />,
      {
        providerProps: siteInitialState
      }
    )
    const applePencil = queryByAltText('Apple Pencil')
    expect(applePencil).toBeTruthy()
    expect(applePencil).toHaveAttribute('src', 'https://et-website.imgix.net/et-website/images/apple-pencil-flat-min.png?auto=format&w=28&fit=clip')
  })

  it('Should show apple iPad device', () => {
    const { queryByAltText } = renderUseSiteProviderUi(
      <IpadFeatureImage {...props} />,
      {
        providerProps: siteInitialState
      }
    )
    const applePencil = queryByAltText('Every Tuesday iPad Pro')
    expect(applePencil).toBeTruthy()
    expect(applePencil).toHaveAttribute('src', 'https://et-website.imgix.net/et-website/images/ipad-blank-min.png?auto=format&w=400&fit=clip')
  })

  it('Should show apple iPad art', () => {
    const { queryByLabelText } = renderUseSiteProviderUi(
      <IpadFeatureImage {...props} />,
      {
        providerProps: siteInitialState
      }
    )
    const appleArt = queryByLabelText(`Product Image`)
    expect(appleArt).toBeTruthy()
    expect(appleArt).toHaveAttribute('src', featuredImage.sourceUrl)
  })

  it('Should not show mobile texture image and should show desktop', () => {
    const { queryByTestId } = renderUseSiteProviderUi(
      <IpadFeatureImage {...props} />,
      {
        providerProps: siteInitialState
      }
    )
    const textureImg = queryByTestId(`lazy-load-image-green-mobile`)
    const desktopImg = queryByTestId(`lazy-load-image-green-desktop`)
    expect(textureImg).toBeNull()
    expect(desktopImg).toBeVisible()
  })
})