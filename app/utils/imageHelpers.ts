import { isEmpty } from "lodash"

export const defaultImages = {
  thumbnail:{
    width: '1000',
    height: '888',
    altTitle: 'Every Tuesday Fallback Featured Thumbnail',
    srcSet: '',
    sizes: '',
    sourceUrl: 'https://et-website.imgix.net/defaultImages/default-thumb.jpg',
    placeholder: 'https://et-website.imgix.net/defaultImages/default-thumb.jpg?w=20&h=20&fit=crop&crop=faces&auto=compress&q=80'
  },
  featured:{
    width: '1024',
    height: '495',
    altTitle: 'Every Tuesday Fallback Featured Image',
    srcSet: '',
    sizes: '',
    sourceUrl: 'https://et-website.imgix.net/defaultImages/default-featured.jpg?w=1024&h=495&fit=crop&crop=faces&auto=compress&q=80',
    placeholder: 'https://et-website.imgix.net/defaultImages/default-featured.jpg?w=20&h=20&fit=crop&crop=faces&auto=compress&q=80'
  },
  pinterest:{
    width: '300',
    height: '450',
    altTitle: 'Every Tuesday Fallback Pinterest Image',
    srcSet: '',
    sizes: '',
    sourceUrl: 'https://et-website.imgix.net/defaultImages/default-pinterest.jpg?auto=compress&q=80',
    placeholder: 'https://et-website.imgix.net/defaultImages/default-pinterest.jpg?w=20&h=60&fit=crop&crop=faces&auto=compress&q=80'
  }
}
export enum ImageSizeEnums {
  SMALL = 'small',
  MEDIUM = 'medium',
  LARGE = 'large',
  FULL = 'full',
  PLACEHOLDER = 'placeholder',
  THUMBNAIL = 'headless_post_thumbnail',
  FEATURE = 'headless_post_feature_image',
  RESOURCE = 'headless_resource_image',
  WPRP = 'wp_rp_thumbnail',
}


interface ILoadImageSrcArgs { 
  imageSizeName: ImageSizeEnums, 
  imageObject: IFeaturedImage | null, 
  fallbackSize?: ImageSizeEnums, 
  fallbackImage?: IMediaDetailSize }
type IGetImageSize = (props: ILoadImageSrcArgs) => IMediaDetailSize
const getImageSize = (postFeaturedImage: IFeaturedImage, name: string) => {

  return postFeaturedImage.mediaDetails.sizes.reduce((previousValue: any, currentValue: any) => {
    if (currentValue.name === name) {
      return currentValue
    } else {
      return previousValue
    }

  }, {})
}

export const loadImageSrc: IGetImageSize = ({
  imageObject,
  imageSizeName,
  fallbackSize = ImageSizeEnums.LARGE,
  fallbackImage = {
    width: '1024',
    height: '495',
    altTitle: 'Every Tuesday Fallback Featured Image',
    sourceUrl: 'https://et-website.imgix.net/defaultImages/default-featured.jpg?w=1024',
    srcSet: '',
    sizes: '',
    placeholder: 'https://et-website.imgix.net/defaultImages/default-featured.jpg?w=20&h=20&fit=crop&crop=faces&auto=compress&q=80'
  }
}): IMediaDetailSize => {

  if (!imageObject || !imageObject.mediaDetails) {
    return fallbackImage
  }

  const image = getImageSize(imageObject, imageSizeName)
  const placeholder = getImageSize(imageObject, ImageSizeEnums.PLACEHOLDER)

  if (isEmpty(image)) {
    return imageObject.mediaDetails.sizes.reduce((previousValue: any, currentValue: any) => {

      if (currentValue.name === fallbackSize) {
        return currentValue
      } else {
        return previousValue
      }

    }, fallbackImage)
  }

  return {
    ...image,
    srcSet: imageObject.srcSet,
    altTitle: imageObject.altText,
    sizes: imageObject.sizes,
    placeholder: !isEmpty(placeholder) ? placeholder.sourceUrl : fallbackImage.placeholder
  }
}

export function loadThumbnailSrc(tutorialManager: ITutorialManager,
  defaultImage: IMediaDetailSize): IMediaDetailSize {

  if (!tutorialManager.thumbnail || !tutorialManager.thumbnail.image) {
    return {
      ...defaultImage,
    }
  }
  let imageName = tutorialManager.thumbnail.image.sourceUrl.replace('.jpg', '')
  return {
    ...tutorialManager.thumbnail.image,
    width: '1000',
    height: '888',
    srcSet: '',
    altTitle: tutorialManager.thumbnail.image.altText,
    placeholder: `${imageName}-20x20.jpg`,
  }

}