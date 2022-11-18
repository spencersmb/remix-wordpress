import { fallBackImageEnum, ImageSizeEnums } from "@App/enums/imageEnums"
import { isEmpty } from "lodash"

export const imgixServerRoot = {
  images: `https://et-website.imgix.net/et-website/images`,
  textures: `https://et-website.imgix.net/et-website/textures`,
  defaultImages: `https://et-website.imgix.net/et-website/defaultImages`,
}
export const imgixDir = imgixServerRoot
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

export const fallBackImages = {
  [fallBackImageEnum.THUMBNAIL]: {
    width: '1000',
    height: '888',
    altTitle: 'Every Tuesday Fallback Featured Thumbnail',
    srcSet: '',
    sizes: '',
    sourceUrl: 'https://et-website.imgix.net/defaultImages/default-thumb.jpg',
    placeholder: 'https://et-website.imgix.net/defaultImages/default-thumb.jpg?w=20&h=20&fit=crop&crop=faces&auto=compress&q=80',
    name: 'thumbnail',
  },
  [fallBackImageEnum.LARGE]: {
    width: '1024',
    height: '576',
    altTitle: 'Every Tuesday Fallback Large Image',
    srcSet: '',
    sizes: '',
    sourceUrl: 'https://et-website.imgix.net/defaultImages/default-featured.jpg?w=1024&h=576&fit=crop&auto=compress&q=80',
    placeholder: 'https://et-website.imgix.net/defaultImages/default-featured.jpg?w=20&h=20&fit=crop&crop=faces&auto=compress&q=80',
    name: 'thumbnail',
  },
  [fallBackImageEnum.MEDIUM]: {
    width: '500',
    height: '281',
    altTitle: 'Every Tuesday Fallback Medium Image',
    srcSet: '',
    sizes: '',
    sourceUrl: 'https://et-website.imgix.net/defaultImages/default-featured.jpg?w=500&h=281&fit=crop&auto=compress&q=80',
    placeholder: 'https://et-website.imgix.net/defaultImages/default-featured.jpg?w=20&h=20&fit=crop&crop=faces&auto=compress&q=80',
    name: 'thumbnail',
  }
}

interface ILoadImageSrcArgs { 
  imageSizeName: ImageSizeEnums, 
  imageObject: IFeaturedImage | null, 
  fallbackSize?: ImageSizeEnums, 
  fallbackImage?: ImageLookupReturn 
  disableSrcSet?: boolean
}

/**
 * 
 * @function getImageSize 
 * @tested - 6/4/2022
 * Takes in the ImageSize Array of Objects from the WP IMAGE MEDIA_DETAILS and returns the correct 
 * ImageSize Object based on the ImageSizeEnums requested.
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
 * @function loadImageSrc 
 * @tested - 08/22/2022
 * Primary way to get a readable image object from the WP IMAGE OBJECT sent from the server to be used in the lazyImagebase component.
 * Default fallback image size to look for is LARGE and if that fallback is not found, it will load a grey placeholder image.
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
  },
  disableSrcSet = false
}: ILoadImageSrcArgs): ImageLookupReturn => {

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
    srcSet: disableSrcSet ? '' : imageObject.srcSet,
    altTitle: imageObject.altText,
    sizes: imageObject.sizes,
    placeholder: !isEmpty(placeholder) ? placeholder.sourceUrl : fallbackImage.placeholder
  }
}

/**
 * 
 * @function loadThumbnailSrc 
 * @tested - 6/5/2022
 * @description Primary way to get the thumbnail image of a blog post that comes from the custom ACF field added for the new style of blog posts. The fallback/default image is just the full featured image from the original blog post WP image object.
 * 
 * @param {ITutorialManager} tutorialManager
 * @param {ImageLookupReturn} defaultImage
 * 
 * 
 * @returns {ImageLookupReturn} an Image Object
 */
export function loadThumbnailSrc(tutorialManager: ITutorialManager,
  defaultImage: ImageLookupReturn): ImageLookupReturn {

  if (!tutorialManager.thumbnail || !tutorialManager.thumbnail.image) {
    return {
      ...defaultImage,
    }
  }
  let imageName = tutorialManager.thumbnail.image.sourceUrl.replace('.jpg', '')
  const {image} = tutorialManager.thumbnail
  // @ts-ignore
  delete image.mediaDetails
  return {
    ...image,
    width: '1000',
    height: '888',
    srcSet: '',
    altTitle: image.altText,
    placeholder: `${imageName}-20x20.jpg`,
    sizes: '',
    file: `${imageName}-1000x888.jpg`,
    name: 'thumbnail'
  }

}

export function loadThumbnailImage(
  tutorialManager: ITutorialManager, 
  backUpImage: IFeaturedImage | null,
  imageSizeEnum?: ImageSizeEnums,
  ): ImageLookupReturn {

  
  const backUpFeatured = loadImageSrc({
    imageSizeName: imageSizeEnum || ImageSizeEnums.SOURCE, // image name to try and get
    imageObject: backUpImage, // the featured image object
    fallbackSize: ImageSizeEnums.LARGE, // fallback size to use if the image name doesn't exist
    fallbackImage: fallBackImages[fallBackImageEnum.THUMBNAIL]
  })
  if (!tutorialManager.thumbnail || !tutorialManager.thumbnail.image) {
    return {
      ...backUpFeatured,
    }
  }
  const image = loadImageSrc({
    imageSizeName: imageSizeEnum || ImageSizeEnums.SOURCE, // image name to try and get
    imageObject: tutorialManager.thumbnail.image, // the featured image object
    fallbackSize: ImageSizeEnums.LARGE, // fallback size to use if the image name doesn't exist
    fallbackImage: backUpFeatured
  })

  return image
}

/**
 * @function checkForPx
 * @tested - 6/5/2022
 * 
 * @description Helper function that checks if the value is a number or string and returns the value as a string with px on the end.
 * 
 * @param {string | number} value
 * 
 * @returns {string}
 */
export const checkForPx = (value: string | number): string => {

  let convertedValue = typeof value === 'number' ? value.toString() : value

  if (convertedValue.indexOf('px') === -1) {
    return `${value}px`
  } else {
    return convertedValue
  }
}

/**
 * @function checkWidthHeight
 * @tested - 6/5/2022
 * 
 * @description Helper function that checks if the width/height is a number or a string and returns an object with the correct width/height as numbers.
 * 
 * @param {string | number} width
 * @param {string | number} height 
 * 
 * @returns {object}
 */
export function checkWidthHeight(width: string | number, height: string | number): {width: number, height: number} {
  const widthCheck = typeof width === 'number' ? width : parseInt(width, 10)
  const heightCheck = typeof height === 'number' ? height : parseInt(height, 10)
  return {
    width: widthCheck,
    height: heightCheck
  }
}

/**
 * @function createImgixSizes
 * @tested - 8/22/2022
 * 
 * @description Primary helepr function that is used for Imgix images to create the sizes and srcset attributes for either staticImages or manual image entry.
 * 
 * 
 */
export function createImgixSizes(image : CreateImgixParams ): 
CreateImgixReturn {
  const {src, mobileSize, width, height, alt, staticImage, compress = false, params = ''} = image

  let imageUrl = src 
    ? src 
    : staticImage 
      ? staticImage.src 
      : "https://et-website.imgix.net/defaultImages/default-thumb.jpg"

  let defaultSrc = `${imageUrl}?auto=format`

  // default image to show up if the image is not found
  let newImage = {
    width: 1000,
    height: 888,
    alt,
    src: `${defaultSrc}&w=${mobileSize}&fit=clip${compress ? '&auto=compress' : ''}${params}`,
    placeholder: `${defaultSrc}&w=20&fit=clip${compress ? '&auto=compress' : ''}${params}`
  }

  if(staticImage){

    newImage = {
      width: staticImage.width,
      height: staticImage.height,
      alt,
      src: `${defaultSrc}&w=${mobileSize}&fit=clip${compress ? '&auto=compress' : ''}${params}`,
      placeholder: `${defaultSrc}&w=20&fit=clip${compress ? '&auto=compress' : ''}${params}`
    }
  }

  // manual method
  if(src && width && height){

    newImage = {
      width,
      height,
      alt,
      src: `${defaultSrc}&w=${mobileSize}&fit=clip${compress ? '&auto=compress' : ''}${params}`,
      placeholder: `${defaultSrc}&w=20&fit=clip${compress ? '&auto=compress' : ''}${params}`
    }
  }

  return {
    image: newImage,
    defaultSrc
  }
}