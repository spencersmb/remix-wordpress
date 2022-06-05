import { ImageSizeEnums } from "@App/enums/imageEnums"
import { staticImages } from "@App/lib/imgix/data"
import { defaultImages, loadImageSrc } from "@App/utils/imageHelpers"
import { screen } from "@testing-library/react"
import { mockFeaturedImage } from "@TestUtils/mock-data/images"
import { mockPostDataComplete } from "@TestUtils/mock-data/posts"
import { mockPaidProduct } from "@TestUtils/mock-data/products"
import { renderUi } from "@TestUtils/renderUtils"
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
    const { queryByAltText } = renderUi(
      <IpadFeatureImage {...props} />
    )
    const applePencil = queryByAltText('Every Tuesday Apple 2 Pencil')
    expect(applePencil).toBeTruthy()
    expect(applePencil).toHaveAttribute('src', staticImages.assets.applePencil.flat.src)
  })

  it('Should show apple iPad device', () => {
    const { queryByAltText } = renderUi(
      <IpadFeatureImage {...props} />
    )
    const applePencil = queryByAltText(`Every Tuesday New Product: ${props.product.title}`)
    expect(applePencil).toBeTruthy()
    expect(applePencil).toHaveAttribute('src', staticImages.assets.ipad.flat.src)
  })

  it('Should show apple iPad art', () => {
    const { queryByLabelText } = renderUi(
      <IpadFeatureImage {...props} />
    )
    const appleArt = queryByLabelText(`Product Image`)
    expect(appleArt).toBeTruthy()
    expect(appleArt).toHaveAttribute('src', featuredImage.sourceUrl)
  })

  it('Should show texture image', () => {
    const { queryByAltText } = renderUi(
      <IpadFeatureImage {...props} />
    )
    const textureImg = queryByAltText(`Every Tuesday Texture Pack: Green`)
    expect(textureImg).toBeTruthy()
    expect(textureImg).toHaveAttribute('data-src', `${staticImages.textures.greenLarge.src}?auto=format&w=100&ixlib=react-9.5.1-beta.1`)
  })
})