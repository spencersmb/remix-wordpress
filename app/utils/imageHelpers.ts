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
    sourceUrl: 'https://et-website.imgix.net/defaultImages/default-featured.jpg?w=1024',
    placeholder: 'https://et-website.imgix.net/defaultImages/default-featured.jpg?w=20&h=20&fit=crop&crop=faces&auto=compress&q=80'
  }
}
export enum ImageSizeEnums {
  SMALL = 'small',
  MEDIUM = 'medium',
  LARGE = 'large',
  FULL = 'full',
  PLACEHOLDER = 'placeholder',
  THUMBNAIL = 'headless_ipad',
  FEATURE = 'headless_post_feature_image'
}


interface ILoadImageSrcArgs { postFeaturedImage: IFeaturedImage | null, name: ImageSizeEnums, fallbackSize?: ImageSizeEnums, fallbackImage?: IMediaDetailSize }
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
  postFeaturedImage,
  name,
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

  if (!postFeaturedImage || !postFeaturedImage.mediaDetails) {
    return fallbackImage
  }

  const image = getImageSize(postFeaturedImage, name)
  const placeholder = getImageSize(postFeaturedImage, ImageSizeEnums.PLACEHOLDER)

  if (isEmpty(image)) {
    return postFeaturedImage.mediaDetails.sizes.reduce((previousValue: any, currentValue: any) => {

      if (currentValue.name === fallbackSize) {
        return currentValue
      } else {
        return previousValue
      }

    }, fallbackImage)
  }

  return {
    ...image,
    srcSet: postFeaturedImage.srcSet,
    altTitle: postFeaturedImage.altText,
    sizes: postFeaturedImage.sizes,
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