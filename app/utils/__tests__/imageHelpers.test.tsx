import { ImageSizeEnums } from "@App/enums/imageEnums"
import { cleanup } from "@testing-library/react"
import { mockFeatureImageComplete } from "@TestUtils/mock-data/images"
import { mockTutorailManager__default } from "@TestUtils/mock-data/posts"
import { checkForPx, checkWidthHeight, defaultImages, getImageSize, loadImageSrc, loadThumbnailSrc } from "../imageHelpers"

/**
 * @jest-environment node
 */
describe('Utils: Image Helpers', () => {

  afterEach(cleanup)

  it('Should return width/height obj using string params', () => {
    const width = '100'
    const height = '200'
    const size = checkWidthHeight(width, height)
    expect(size).toEqual({ width: 100, height: 200 })
  })

  it('Should return width/height obj using number params', () => {
    const width = 100
    const height = 200
    const size = checkWidthHeight(width, height)
    expect(size).toEqual({ width, height })
  })

  it('checkForPx() Should return px string for string params', () => {
    expect(checkForPx('100')).toBe('100px')
  })

  it('checkForPx() Should return px string for number params', () => {
    expect(checkForPx(100)).toBe('100px')
  })

  it('loadImageSrc() should return the ImageSrc Object used for every image', () => {
    const imageSource = loadImageSrc({
      imageSizeName: ImageSizeEnums.FEATURE, // image name to try and get
      imageObject: mockFeatureImageComplete, // the featured image object
      fallbackSize: ImageSizeEnums.LARGE, // fallback size to use if the image name doesn't exist
      fallbackImage: defaultImages.featured
    })
    const result: ImageLookupReturn = {
      altTitle: mockFeatureImageComplete.altText,
      file: "create-candy-cane-lettering-in-procreate-hero-1440x810.jpg",
      height: "810",
      width: "1440",
      mimeType: "image/jpeg",
      name: "headless_post_feature_image",
      sizes: "(max-width: 500px) 100vw, 500px",
      sourceUrl: "https://etheadless.local/wp-content/uploads/2021/11/create-candy-cane-lettering-in-procreate-hero-1440x810.jpg",
      placeholder: "https://etheadless.local/wp-content/uploads/2021/11/create-candy-cane-lettering-in-procreate-hero-20x20.jpg",
      srcSet: "https://etheadless.local/wp-content/uploads/2021/11/create-candy-cane-lettering-in-procreate-hero-500x281.jpg 500w, https://etheadless.local/wp-content/uploads/2021/11/create-candy-cane-lettering-in-procreate-hero-1440x810.jpg 1440w, https://etheadless.local/wp-content/uploads/2021/11/create-candy-cane-lettering-in-procreate-hero-1024x576.jpg 1024w, https://etheadless.local/wp-content/uploads/2021/11/create-candy-cane-lettering-in-procreate-hero-1536x864.jpg 1536w, https://etheadless.local/wp-content/uploads/2021/11/create-candy-cane-lettering-in-procreate-hero-100x56.jpg 100w, https://etheadless.local/wp-content/uploads/2021/11/create-candy-cane-lettering-in-procreate-hero-1200x675.jpg 1200w, https://etheadless.local/wp-content/uploads/2021/11/create-candy-cane-lettering-in-procreate-hero.jpg 1920w",
    }
    expect(imageSource).toEqual(result)
  })

  it('loadImageSrc() should return the named fallbackSize image', () => {
    const imageSource = loadImageSrc({
      imageSizeName: ImageSizeEnums.FULL, // image name to try and get
      imageObject: mockFeatureImageComplete, // the featured image object
      fallbackSize: ImageSizeEnums.LARGE, // fallback size to use if the image name doesn't exist
      fallbackImage: defaultImages.featured
    })
    const result: ImageLookupReturn = {
      altTitle: mockFeatureImageComplete.altText,
      file: "create-candy-cane-lettering-in-procreate-hero-1024x576.jpg",
      height: "576",
      width: "1024",
      mimeType: "image/jpeg",
      name: "large",
      sizes: "(max-width: 500px) 100vw, 500px",
      sourceUrl: "https://etheadless.local/wp-content/uploads/2021/11/create-candy-cane-lettering-in-procreate-hero-1024x576.jpg",
      placeholder: "https://etheadless.local/wp-content/uploads/2021/11/create-candy-cane-lettering-in-procreate-hero-20x20.jpg",
      srcSet: "https://etheadless.local/wp-content/uploads/2021/11/create-candy-cane-lettering-in-procreate-hero-500x281.jpg 500w, https://etheadless.local/wp-content/uploads/2021/11/create-candy-cane-lettering-in-procreate-hero-1440x810.jpg 1440w, https://etheadless.local/wp-content/uploads/2021/11/create-candy-cane-lettering-in-procreate-hero-1024x576.jpg 1024w, https://etheadless.local/wp-content/uploads/2021/11/create-candy-cane-lettering-in-procreate-hero-1536x864.jpg 1536w, https://etheadless.local/wp-content/uploads/2021/11/create-candy-cane-lettering-in-procreate-hero-100x56.jpg 100w, https://etheadless.local/wp-content/uploads/2021/11/create-candy-cane-lettering-in-procreate-hero-1200x675.jpg 1200w, https://etheadless.local/wp-content/uploads/2021/11/create-candy-cane-lettering-in-procreate-hero.jpg 1920w"
    }
    expect(imageSource).toEqual(result)
  })

  it('loadImageSrc() should return the default named fallbackSize imageSize -> LARGE', () => {
    const imageSource = loadImageSrc({
      imageSizeName: ImageSizeEnums.FULL, // image name to try and get
      imageObject: mockFeatureImageComplete, // the featured image object
    })
    const result: ImageLookupReturn = {
      width: '1024',
      height: '576',
      altTitle: "Create Candy Cane Lettering in Procreate",
      file: "create-candy-cane-lettering-in-procreate-hero-1024x576.jpg",
      mimeType: "image/jpeg",
      sourceUrl: "https://etheadless.local/wp-content/uploads/2021/11/create-candy-cane-lettering-in-procreate-hero-1024x576.jpg",
      srcSet: "https://etheadless.local/wp-content/uploads/2021/11/create-candy-cane-lettering-in-procreate-hero-500x281.jpg 500w, https://etheadless.local/wp-content/uploads/2021/11/create-candy-cane-lettering-in-procreate-hero-1440x810.jpg 1440w, https://etheadless.local/wp-content/uploads/2021/11/create-candy-cane-lettering-in-procreate-hero-1024x576.jpg 1024w, https://etheadless.local/wp-content/uploads/2021/11/create-candy-cane-lettering-in-procreate-hero-1536x864.jpg 1536w, https://etheadless.local/wp-content/uploads/2021/11/create-candy-cane-lettering-in-procreate-hero-100x56.jpg 100w, https://etheadless.local/wp-content/uploads/2021/11/create-candy-cane-lettering-in-procreate-hero-1200x675.jpg 1200w, https://etheadless.local/wp-content/uploads/2021/11/create-candy-cane-lettering-in-procreate-hero.jpg 1920w",
      sizes: "(max-width: 500px) 100vw, 500px",
      name: 'large',
      placeholder: "https://etheadless.local/wp-content/uploads/2021/11/create-candy-cane-lettering-in-procreate-hero-20x20.jpg"
    }
    expect(imageSource).toEqual(result)
  })

  it('loadImageSrc() should return the default fallbackSize static grey image', () => {
    const imageSource = loadImageSrc({
      imageSizeName: ImageSizeEnums.FULL, // image name to try and get
      imageObject: mockFeatureImageComplete, // the featured image object,
      fallbackSize: ImageSizeEnums.SMALL, // fallback size to use if the image name doesn't exist
    })
    const result: ImageLookupReturn = {
      width: '1024',
      height: '495',
      altTitle: 'Every Tuesday Fallback Featured Image',
      sourceUrl: 'https://et-website.imgix.net/defaultImages/default-featured.jpg?w=1024',
      srcSet: '',
      sizes: '',
      name: 'fallback',
      placeholder: 'https://et-website.imgix.net/defaultImages/default-featured.jpg?w=20&h=20&fit=crop&crop=faces&auto=compress&q=80'
    }
    expect(imageSource).toEqual(result)
  })

  it('getImageSize() Should have default image Types', () => {
    const imageTypes = Object.keys(defaultImages)
    expect(imageTypes).toHaveLength(3)
    expect(imageTypes).toContain('thumbnail')
    expect(imageTypes).toContain('featured')
    expect(imageTypes).toContain('pinterest')
  })

  it('getImageSize() Should return Full Source Image', () => {
    const image = getImageSize(mockFeatureImageComplete, ImageSizeEnums.SOURCE)
    const result = {
      file: mockFeatureImageComplete.sourceUrl,
      height: mockFeatureImageComplete.mediaDetails.height,
      width: mockFeatureImageComplete.mediaDetails.width,
      mimeType: mockFeatureImageComplete.mimeType,
      name: "source_url",
      sourceUrl: mockFeatureImageComplete.sourceUrl,
    }
    expect(image).toEqual(result)
  })

  it('getImageSize() Should return ImageSizeEnums.FEATURE', () => {
    const image = getImageSize(mockFeatureImageComplete, ImageSizeEnums.FEATURE)
    const result = {
      width: "1440",
      file: "create-candy-cane-lettering-in-procreate-hero-1440x810.jpg",
      height: "810",
      name: "headless_post_feature_image",
      sourceUrl: "https://etheadless.local/wp-content/uploads/2021/11/create-candy-cane-lettering-in-procreate-hero-1440x810.jpg",
      mimeType: "image/jpeg"
    }
    expect(image).toEqual(result)
  })

  it('getImageSize() Should return ImageSizeEnums.LARGE', () => {
    const image = getImageSize(mockFeatureImageComplete, ImageSizeEnums.LARGE)
    const result = {
      width: "1024",
      file: "create-candy-cane-lettering-in-procreate-hero-1024x576.jpg",
      height: "576",
      name: "large",
      sourceUrl: "https://etheadless.local/wp-content/uploads/2021/11/create-candy-cane-lettering-in-procreate-hero-1024x576.jpg",
      mimeType: "image/jpeg"
    }
    expect(image).toEqual(result)
  })

  it('getImageSize() Should return ImageSizeEnums.PLACEHOLDER', () => {
    const image = getImageSize(mockFeatureImageComplete, ImageSizeEnums.PLACEHOLDER)
    const result = {
      width: "20",
      file: "create-candy-cane-lettering-in-procreate-hero-20x20.jpg",
      height: "20",
      name: "placeholder",
      sourceUrl: "https://etheadless.local/wp-content/uploads/2021/11/create-candy-cane-lettering-in-procreate-hero-20x20.jpg",
      mimeType: "image/jpeg"
    }
    expect(image).toEqual(result)
  })

  it('getImageSize() Should return ImageSizeEnums.RESOURCE', () => {
    const image = getImageSize(mockFeatureImageComplete, ImageSizeEnums.RESOURCE)
    const result = {
      width: "600",
      file: "create-candy-cane-lettering-in-procreate-hero-600x360.jpg",
      height: "360",
      name: "headless_resource_image",
      sourceUrl: "https://etheadless.local/wp-content/uploads/2021/11/create-candy-cane-lettering-in-procreate-hero-600x360.jpg",
      mimeType: "image/jpeg"
    }
    expect(image).toEqual(result)
  })

  it('getImageSize() Should return ImageSizeEnums.THUMBNAIL', () => {
    const image = getImageSize(mockFeatureImageComplete, ImageSizeEnums.THUMBNAIL)
    const result = {
      width: "1000",
      file: "create-candy-cane-lettering-in-procreate-hero-1000x749.jpg",
      height: "749",
      name: "headless_post_thumbnail",
      sourceUrl: "https://etheadless.local/wp-content/uploads/2021/11/create-candy-cane-lettering-in-procreate-hero-1000x749.jpg",
      mimeType: "image/jpeg"
    }
    expect(image).toEqual(result)
  })

  it('getImageSize() Should return ImageSizeEnums.WPRP', () => {
    const image = getImageSize(mockFeatureImageComplete, ImageSizeEnums.WPRP)
    const result = {
      width: "421",
      file: "create-candy-cane-lettering-in-procreate-hero-421x203.jpg",
      height: "203",
      name: "wp_rp_thumbnail",
      sourceUrl: "https://etheadless.local/wp-content/uploads/2021/11/create-candy-cane-lettering-in-procreate-hero-421x203.jpg",
      mimeType: "image/jpeg"
    }
    expect(image).toEqual(result)
  })

  it('loadThumbnailSrc() Should load default Post thumbnail preview', () => {
    const imageSource = loadImageSrc({
      imageSizeName: ImageSizeEnums.FEATURE, // image name to try and get
      imageObject: mockFeatureImageComplete, // the featured image object
      fallbackSize: ImageSizeEnums.LARGE, // fallback size to use if the image name doesn't exist
      fallbackImage: defaultImages.featured
    })
    const tutorialSoure: ITutorialManager = {
      ...mockTutorailManager__default
    }
    const image = loadThumbnailSrc(tutorialSoure, imageSource)
    const result: ImageLookupReturn = {
      altTitle: mockFeatureImageComplete.altText,
      file: "create-candy-cane-lettering-in-procreate-hero-1440x810.jpg",
      height: "810",
      width: "1440",
      mimeType: "image/jpeg",
      name: "headless_post_feature_image",
      sizes: "(max-width: 500px) 100vw, 500px",
      sourceUrl: "https://etheadless.local/wp-content/uploads/2021/11/create-candy-cane-lettering-in-procreate-hero-1440x810.jpg",
      placeholder: "https://etheadless.local/wp-content/uploads/2021/11/create-candy-cane-lettering-in-procreate-hero-20x20.jpg",
      srcSet: "https://etheadless.local/wp-content/uploads/2021/11/create-candy-cane-lettering-in-procreate-hero-500x281.jpg 500w, https://etheadless.local/wp-content/uploads/2021/11/create-candy-cane-lettering-in-procreate-hero-1440x810.jpg 1440w, https://etheadless.local/wp-content/uploads/2021/11/create-candy-cane-lettering-in-procreate-hero-1024x576.jpg 1024w, https://etheadless.local/wp-content/uploads/2021/11/create-candy-cane-lettering-in-procreate-hero-1536x864.jpg 1536w, https://etheadless.local/wp-content/uploads/2021/11/create-candy-cane-lettering-in-procreate-hero-100x56.jpg 100w, https://etheadless.local/wp-content/uploads/2021/11/create-candy-cane-lettering-in-procreate-hero-1200x675.jpg 1200w, https://etheadless.local/wp-content/uploads/2021/11/create-candy-cane-lettering-in-procreate-hero.jpg 1920w",
    }
    expect(image).toEqual(result)
  })

  // MUST BE AT THE END BECAUSE FUNCTION USES DELETE TO REMOVE A KEY
  it('loadThumbnailSrc() Should load correct Post thumbnail preview', () => {
    const imageSource = loadImageSrc({
      imageSizeName: ImageSizeEnums.FEATURE, // image name to try and get
      imageObject: mockFeatureImageComplete, // the featured image object
      fallbackSize: ImageSizeEnums.LARGE, // fallback size to use if the image name doesn't exist
      fallbackImage: defaultImages.featured
    })
    const tutorialSoure: ITutorialManager = {
      ...mockTutorailManager__default,
      thumbnail: {
        type: '',
        image: mockFeatureImageComplete
      }

    }
    const image = loadThumbnailSrc(tutorialSoure, imageSource)
    const result = {
      altText: "Create Candy Cane Lettering in Procreate",
      altTitle: "Create Candy Cane Lettering in Procreate",
      file: "https://etheadless.local/wp-content/uploads/2021/11/create-candy-cane-lettering-in-procreate-hero-1000x888.jpg",
      height: "888",
      width: "1000",
      mimeType: "image/jpeg",
      name: "thumbnail",
      id: "cG9zdDoxMDA4NQ==",
      placeholder: "https://etheadless.local/wp-content/uploads/2021/11/create-candy-cane-lettering-in-procreate-hero-20x20.jpg",
      sizes: "",
      srcSet: "",
      sourceUrl: "https://etheadless.local/wp-content/uploads/2021/11/create-candy-cane-lettering-in-procreate-hero.jpg"
    }
    expect(image).toEqual(result)
  })


})