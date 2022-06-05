import { ImageSizeEnums } from "@App/enums/imageEnums"
import { defaultImages, loadImageSrc } from "@App/utils/imageHelpers"
import { mockPostDataComplete } from "@TestUtils/mock-data/posts"
import { renderUi } from "@TestUtils/renderUtils"
import LazyImageBase from "../lazyImage-base"

describe('LazyImage Base Component', () => {
  const defaultProps = {
    image: loadImageSrc({
      imageSizeName: ImageSizeEnums.FEATURE, // image name to try and get
      imageObject: mockPostDataComplete.featuredImage, // the featured image object
      fallbackSize: ImageSizeEnums.LARGE, // fallback size to use if the image name doesn't exist
      fallbackImage: defaultImages.featured
    }),
    id: 1,
  }
  it('Should calcuate the correct padding-bottom', () => {
    const { getByTestId } = renderUi(<LazyImageBase {...defaultProps} />)
    const width = parseInt(defaultProps.image.width, 10)
    const height = parseInt(defaultProps.image.height, 10)
    const calcPadding = height / width
    const paddingWrapper = getByTestId('padding-bot')
    const paddingBottom = `padding-bottom: ${calcPadding * 100}%;`
    expect(paddingWrapper.getAttribute('style')).toBe(paddingBottom)
  })
  it('Should have image with no correct default props', () => {
    const { getByLabelText } = renderUi(<LazyImageBase {...defaultProps} />)
    const image = getByLabelText('Product Image')
    expect(image.getAttribute('alt')).toBe(defaultProps.image.altTitle)
    expect(image.getAttribute('src')).toBe(defaultProps.image.sourceUrl)
    expect(image.getAttribute('sizes')).toBe(defaultProps.image.sizes)
    expect(image.getAttribute('srcSet')).toBe(defaultProps.image.srcSet)
    expect(image.getAttribute('height')).toBe(`${defaultProps.image.height}px`)
    expect(image.getAttribute('width')).toBe(`${defaultProps.image.width}px`)
    expect(image).toHaveAttribute('data-testid', 'lazy-load-image-1')
  })
  it('Should have alt text override', () => {
    const altProps = { ...defaultProps, alt: 'alt text' }
    const { getByLabelText } = renderUi(<LazyImageBase {...altProps} />)
    const image = getByLabelText('Product Image')
    expect(image.getAttribute('alt')).toBe('alt text')
  })
  it('Should have testid override', () => {
    const testIdProps = { ...defaultProps, testId: 'testid' }
    const { getByLabelText } = renderUi(<LazyImageBase {...testIdProps} />)
    const image = getByLabelText('Product Image')
    expect(image).toHaveAttribute('data-testid', 'testid')
  })
  it('Should have reverse padding calculated', () => {
    const reverseProps = { ...defaultProps, reverse: true }
    const { getByTestId } = renderUi(<LazyImageBase {...reverseProps} />)
    const paddingWrapper = getByTestId('padding-bot')
    const width = parseInt(reverseProps.image.width, 10)
    const height = parseInt(reverseProps.image.height, 10)
    const paddingBottom = `padding-bottom: ${width / height * 100}%;`
    expect(paddingWrapper.getAttribute('style')).toBe(paddingBottom)
  })
})