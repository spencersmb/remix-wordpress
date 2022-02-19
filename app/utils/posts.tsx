import { isEmpty } from "lodash";
import { classNames } from "./appUtils";

export function flattenAllPosts(posts: any): IPost[] | false {
  const postsFiltered = posts?.edges?.map(({ node = {} }) => node);
  return Array.isArray(postsFiltered) && postsFiltered.map(mapPostData)
}

export function filterNodeFromTags(tags: { edges: [{ node: ITagCount }] }): ITagCount[] {
  return tags.edges.map(({ node }) => {
    return {
      name: node.name,
      slug: node.slug,
      count: node.count,
    };
  });
}

export function rearrangeLicenses(licenses: ILicense[]) {
  return licenses.reduce((acc: any, licence) => {
    // Add it to the beginning of the array
    if (licence.licenseType === 'standard') {
      acc.unshift(licence)
    }
    console.log('licence.licenseType', licence.licenseType);

    // if there is only one item in array, add extended as the 2nd
    if (licence.licenseType === 'extended') {
      acc.push(licence)
    }

    // if the ext is the last item to get looped over
    if (licence.licenseType === 'extended' && acc.length === 2) {
      const standard = acc[0]
      const server = acc[1]
      acc = [
        standard,
        licence,
        server
      ]
    }

    if (licence.licenseType === 'server') {
      acc.push(licence)
    }

    return acc
  }, [])
}

export function mapPostData(post: IPostRaw | {} = {}): IPost {
  const data = { ...post };
  let modifiedData: any = { ...post }

  // Clean up the author object to avoid someone having to look an extra
  // level deeper into the node
  if (data.author) {
    modifiedData.author = {
      ...data.author.node,
    }
  }

  // Clean up the categories to make them more easy to access
  if (data.categories) {
    modifiedData.categories = data.categories.edges.map(({ node }) => {
      return {
        ...node,
      };
    });
  }

  // Clean up the featured image to make them more easy to access
  if (data.featuredImage) {
    modifiedData.featuredImage = data.featuredImage.node;
  }

  if (data.tags) {
    modifiedData.tags = data.tags.edges.map(({ node }) => {
      return {
        name: node.name,
      };
    });
  }

  if (data.relatedPosts) {
    modifiedData.relatedPosts = data.relatedPosts.map((post: IPostRaw) => {
      return mapPostData(post)
    })
  }

  // if(data.downloadManager?.downloads){
  //   modifiedData.downloadManager = data.downloadManager?.downloads.map(download => {
  //     return download.downloadDetails
  //   })
  // }

  if (data.tutorialManager) {
    modifiedData.tutorialManager = {
      ...data.tutorialManager,
      colorPalette: data.tutorialManager?.colorPalette
        ? data.tutorialManager.colorPalette.reduce((previousValue: any, currentValue: any, currentIndex: number) => {
          if (currentIndex === 0) {
            return currentValue
          } else {
            return previousValue
          }
        }, {})
        : data.tutorialManager.colorPalette,
      paidProducts: data.tutorialManager.paidProducts
        ? data.tutorialManager?.paidProducts.map(product => {
          const newProduct = {
            ...product,
            details: {
              ...product.details,
              licences: product.details.licences ? rearrangeLicenses(product.details.licences) : null,
            }
          }
          return newProduct
        })
        : data.tutorialManager.paidProducts
    }
  }


  if (data.comments) {
    modifiedData.comments = {
      pageInfo: data.comments.pageInfo,
      list: data.comments.edges.map(({ node }) => {
        return parseComment(node)
      }),
    }

  }

  return modifiedData

}

export function parseComment(node: IPostCommentRaw): IPostComment {

  return {
    ...node,
    replies: node.replies.edges.map(({ node }) => {
      return {
        ...node,
        parent: node.parent?.node.databaseId || null,
        author: node.author.node
      }
    }),
    parent: node.parent?.node.databaseId || null,
    author: node.author.node
  }
}

export enum ImageSizeEnums {
  SMALL = 'small',
  MEDIUM = 'medium',
  LARGE = 'large',
  FULL = 'full',
  PLACEHOLDER = 'placeholder',
  THUMBNAIL = 'headless_ipad'
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
    name: 'Every Tuesday Fallback Featured Image',
    sourceUrl: 'https://et-website.imgix.net/defaultImages/default-featured.jpg?w=1024',
    placeholder: 'https://et-website.imgix.net/defaultImages/default-featured.jpg?w=20&h=20&fit=crop&crop=faces&auto=compress&q=80'
  }
}) => {

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
    altTitle: tutorialManager.thumbnail.image.altText,
    placeholder: `${imageName}-20x20.jpg`,
  }

}

// DEPRECATED getImageSizeUrl
export function getImageSizeUrl(postFeaturedImage: IFeaturedImage | null, name: string): IMediaDetailSize {

  if (!postFeaturedImage || !postFeaturedImage.mediaDetails) {
    return {
      width: '',
      height: '',
      altTitle: '',
      sourceUrl: '', //TODO: add POST default image
      placeholder: ''
    }
  }

  let ImageSource = postFeaturedImage.mediaDetails.sizes.reduce((previousValue: any, currentValue: any) => {

    if (currentValue.name === name) {
      return currentValue
    } else {
      return previousValue
    }

  }, {})

  if (isEmpty(ImageSource)) {
    return postFeaturedImage.mediaDetails.sizes.reduce((previousValue: any, currentValue: any) => {

      if (currentValue.name === 'large') {
        return currentValue
      } else {
        return previousValue
      }

    }, {
      width: '',
      file: '',
      height: '',
      name: '',
      sourceUrl: 'https://et-website.imgix.net/defaultImages/default-featured.jpg?w=1024'
    })
  }

  return ImageSource
}

export function formatDate(date: string): string {
  const blogDate = new Date(date)
  const monthIndex: number = blogDate.getMonth()
  const day: number = blogDate.getDate()

  const months: string[] = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ]
  return `${months[monthIndex]} ${day}, ${blogDate.getFullYear()}`
}

export function parseStringForSpecialCharacters(string: string): string {
  return string.replace(/&/g, '').replace(/</g, '').replace(/>/g, '').replace(/"/g, '').replace(/'/g, '').replace(/\+/g, '')
  // return string.replace(/\+/g, '');
}

export function checkTitleForBrackets(title: string): { title: string, subTitle: string | undefined } {
  let sqaureBrackets = title.substring(
    title.indexOf("[") + 1,
    title.lastIndexOf("]")
  );

  let roundBrackets = title.substring(
    title.indexOf("(") + 1,
    title.lastIndexOf(")")
  );

  if (sqaureBrackets.length > 0) {
    let newtTitle = title.replace(`[${sqaureBrackets}]`, '')
    return {
      title: newtTitle,
      subTitle: parseStringForSpecialCharacters(sqaureBrackets)
    }
  }

  if (roundBrackets.length > 0) {
    let newtTitle = title.replace(`(${roundBrackets})`, '')
    return {
      title: newtTitle,
      subTitle: parseStringForSpecialCharacters(roundBrackets)
    }
  }

  return {
    title: title,
    subTitle: undefined
  }
}

export function splitProgramNameInTitle(title: string): { title: string, subTitle: string | undefined } {
  let newTitle = title
  switch (Boolean(title)) {

    case title.includes("in Procreate"):
      newTitle = title.replace("in Procreate", "")
      return {
        title: newTitle,
        subTitle: "in Procreate",
      }

    case title.includes("in Illustrator"):
      newTitle = title.replace("in Illustrator", "")
      return {
        title: newTitle,
        subTitle: "in Illustrator",
      }
    case title.includes("in Adobe Illustrator"):
      newTitle = title.replace("in Adobe Illustrator", "")
      return {
        title: newTitle,
        subTitle: "in Adobe Illustrator",
      }
    case title.includes("in InDesign"):
      newTitle = title.replace("in InDesign", "")
      return {
        title: newTitle,
        subTitle: "in InDesign",
      }
    case title.includes("in Photoshop"):
      newTitle = title.replace("in Photoshop", "")
      return {
        title: newTitle,
        subTitle: "in Photoshop",
      }
    default:
      return {
        title: newTitle,
        subTitle: undefined,
      }
  }
}

export function findString(str: string, arr: string[]) {
  return arr.find(item => item.includes(str))
}

export function findSkillLevel(categories: ICategories[]): ICategories | undefined {
  let tutorialsFound = false
  let defaultSkill = {
    name: "beginner",
  }
  let skillFoundStopLooking = false
  const skillFound = categories.reduce((previousValue: any, currentValue: ICategories): any => {
    if (currentValue.slug === "tutorials") {
      tutorialsFound = true
    }
    if (skillFoundStopLooking) {
      return previousValue
    }
    switch (currentValue.slug) {

      case "advanced":
        skillFoundStopLooking = true
        return currentValue
      case "intermediate":
        skillFoundStopLooking = true
        return currentValue
      case "beginner":
        skillFoundStopLooking = true
        return currentValue
      default:
        return previousValue
    }
  }, {})

  return !isEmpty(skillFound)
    ? skillFound
    : isEmpty(skillFound) && tutorialsFound
      ? defaultSkill
      : undefined
}

export function getLicense(licenses: ILicense[] | null, type: LicenseEnum) {
  if (!licenses) {
    return null
  }
  return licenses.reduce((acc, curr) => {
    if (curr.licenseType === type) {
      return curr
    }
    return acc
  }, {
    licenseType: '',
    price: 0,
    url: '',
  })
}

export function createThumbnailImage(
  tutorialManager: ITutorialManager,
  defaultSource: IMediaDetailSize,
  title: string,
  featuredPost: boolean = false
) {

  const defaultImage = () => (
    // <div className={classNames(featuredPost ? 'rounded-2.5xl' : 'mb-8 h-[250px]', "default_image relative overflow-hidden")}>
    <div className={classNames(featuredPost ? 'rounded-2.5xl' : 'mb-8', "default_image relative overflow-hidden")}>
      {defaultSource.sourceUrl.length !== 0 &&
        // <img className={classNames(featuredPost ? '' : 'absolute max-w-none top-[50%] w-full translate-y-[-50%]', "")}
        <img className={classNames(featuredPost ? '' : '', "")}
          src={defaultSource.sourceUrl} alt={title} />}
    </div>
  )
  if (!tutorialManager.thumbnail || !tutorialManager.thumbnail.image) {
    return defaultImage()
  }

  switch (tutorialManager.thumbnail.type) {
    case "make":
      return (
        <>
          <div className={classNames(featuredPost
            ? `absolute top-[-20px] left-[15px] w-[45%] rotate-[352deg]`
            : `absolute top-[10px] left-[15px] w-[40%]`, 'z-10')}>
            <img className="relative z-10" src="/images/make-this.png" alt={`Make this tutorial: ${title}`} />
            <span className={classNames(featuredPost
              ? 'top-[45px]'
              : 'top-[20px] ',
              'absolute w-[40%] left-[71%] z-[5]')}>
              <img src="/images/make-this-arrow-1.png" alt={`Make this tutorial: ${title}`} />
            </span>
          </div>
          {!featuredPost && <div className="absolute top-[15px] right-[30px] w-[25%] opacity-70">
            <img src="/images/video-tutorial-text.png" alt={`Video tutorial: ${title}`} />
          </div>}
          <div className="relative">
            <div className="rounded-2.5xl overflow-hidden">
              <img src={tutorialManager.thumbnail.image.sourceUrl} alt={`${tutorialManager.thumbnail.image.altText} Main Image`} />
            </div>
            {tutorialManager.colorPalette && <div style={{ backgroundColor: tutorialManager.colorPalette.iconBackgroundColor }} className="absolute rounded-full bottom-[-10px] tablet:bottom-[-10%] right-[30px] w-[100px] h-[100px] laptop:bottom-[-6%] desktop:w-[138px] desktop:h-[138px] bg-slate-500 desktop:top-auto desktop:bottom-[-10px] flex justify-center items-center">
              <span style={{ color: tutorialManager.colorPalette.iconTextColor }} className="transform rotate-[-8deg] text-center font-sentinel__SemiBoldItal tablet:leading-4 desktop:text-xl desktop:leading-6">
                Free Color Swatches
              </span>
            </div>}
          </div>

        </>
      )
    default:
      return defaultImage()
  }
}