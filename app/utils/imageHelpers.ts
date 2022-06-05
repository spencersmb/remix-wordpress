import { ImageSizeEnums } from "@App/enums/imageEnums"
import { isEmpty } from "lodash"

type IDefaultImage = {
  [id: string]: ImageLookupReturn
}
export const defaultImages:IDefaultImage = {
  thumbnail:{
    width: '1000',
    height: '888',
    altTitle: 'Every Tuesday Fallback Featured Thumbnail',
    srcSet: '',
    sizes: '',
    sourceUrl: 'https://et-website.imgix.net/defaultImages/default-thumb.jpg',
    placeholder: 'https://et-website.imgix.net/defaultImages/default-thumb.jpg?w=20&h=20&fit=crop&crop=faces&auto=compress&q=80',
    name: 'thumbnail',
  },
  featured:{
    width: '1024',
    height: '495',
    altTitle: 'Every Tuesday Fallback Featured Image',
    srcSet: '',
    sizes: '',
    sourceUrl: 'https://et-website.imgix.net/defaultImages/default-featured.jpg?w=1024&h=495&fit=crop&crop=faces&auto=compress&q=80',
    placeholder: 'https://et-website.imgix.net/defaultImages/default-featured.jpg?w=20&h=20&fit=crop&crop=faces&auto=compress&q=80',
    name: 'featured',
  },
  pinterest:{
    width: '300',
    height: '450',
    altTitle: 'Every Tuesday Fallback Pinterest Image',
    srcSet: '',
    sizes: '',
    sourceUrl: 'https://et-website.imgix.net/defaultImages/default-pinterest.jpg?auto=compress&q=80',
    placeholder: 'https://et-website.imgix.net/defaultImages/default-pinterest.jpg?w=20&h=60&fit=crop&crop=faces&auto=compress&q=80',
    name: 'pinterest',
  }
}

interface ILoadImageSrcArgs { 
  imageSizeName: ImageSizeEnums, 
  imageObject: IFeaturedImage | null, 
  fallbackSize?: ImageSizeEnums, 
  fallbackImage?: ImageLookupReturn 
}

/**
 * 
 * @component getImageSize 
 * @tested - 6/4/2022
 * Takes in the ImageSize Array of Objects from the WP IMAGE OBJECT and returns the correct 
 * ImageSize Object based on the ImageSizeEnums Sizes definitions
 * 
 * Exported Only because we need to test this function
 * 
 * @returns an Image Object
 */
export const getImageSize = (postFeaturedImage: IFeaturedImage, name: string) => {
  // opt out to just return the sourceURL image
  if(name === ImageSizeEnums.SOURCE){
    return {
      file: postFeaturedImage.sourceUrl,
      height: postFeaturedImage.mediaDetails.height,
      width: postFeaturedImage.mediaDetails.width,
      mimeType: postFeaturedImage.mimeType,
      name: "source_url",
      sourceUrl: postFeaturedImage.sourceUrl,
    }
  }

  return postFeaturedImage.mediaDetails.sizes.reduce((previousValue: any, currentValue: any) => {
    if (currentValue.name === name) {
      return currentValue
    } else {
      return previousValue
    }

  }, {})
}

/**
 * 
 * @component loadImageSrc 
 * @tested - 6/4/2022
 * Primary way to get a readable image object from the WP IMAGE OBJECT sent from the server.
 * Default fallback image size to look for is LARGE and if the fallback is not found, it will load a placeholder image.
 * 
 * 
 * @returns an Image Object
 */
export const loadImageSrc = ({
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
    name: 'fallback',
    placeholder: 'https://et-website.imgix.net/defaultImages/default-featured.jpg?w=20&h=20&fit=crop&crop=faces&auto=compress&q=80'
  }
}: ILoadImageSrcArgs) => {

  if (!imageObject || !imageObject.mediaDetails) {
    return fallbackImage
  }

  let image = getImageSize(imageObject, imageSizeName)
  const placeholder = getImageSize(imageObject, ImageSizeEnums.PLACEHOLDER)

  if (isEmpty(image)) {
    return imageObject.mediaDetails.sizes.reduce((previousValue: any, currentValue: any) => {
          
      if (currentValue.name === fallbackSize) {
        return {
          ...currentValue,
          altTitle: imageObject.altText,
          srcSet: imageObject.srcSet,
          sizes: imageObject.sizes,
          placeholder: !isEmpty(placeholder) ? placeholder.sourceUrl : fallbackImage.placeholder
        }
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
  defaultImage: ImageLookupReturn): ImageLookupReturn {

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
    sizes: '',
    file: `${imageName}-1000x888.jpg`,
    name: 'thumbnail'
  }

}

export const checkForPx = (value: string | number) => {

  let convertedValue = typeof value === 'number' ? value.toString() : value

  if (convertedValue.indexOf('px') !== -1) {
    return value
  } else {
    return `${value}px`
  }
}

export function checkWidthHeight(width: string | number, height: string | number) {
  const widthCheck = typeof width === 'number' ? width : parseInt(width, 10)
  const heightCheck = typeof height === 'number' ? height : parseInt(height, 10)
  return {
    width: widthCheck,
    height: heightCheck
  }
}