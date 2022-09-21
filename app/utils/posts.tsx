import type { LicenseEnum } from "@App/enums/products";
import { isEmpty } from "lodash";

/**
 * @function flattenAllPosts
 * @tested - 6/7/2022
 * @description Go over all the posts and flatten the data to remove edges and nodes from the keys
 * 
 *
 * @returns mapped data array of posts
 **/
export function flattenAllPosts(posts: any): IPost[] | false {
  const postsFiltered = posts?.edges?.map(({ node = {} }) => node);
  return Array.isArray(postsFiltered) && postsFiltered.map(mapPostData)
}

/**
 * @function filterNodeFromTags
 * @tested - 6/7/2022
 * @description Remove Edges and nodes from the keys to return a clean array of tags
 * 
 *
 * @returns mapped array of tags
 **/
export function filterNodeFromTags(tags: IWpTags): Itag[] {
  return tags.edges.map(({ node }) => {
    return {
      name: node.name,
      slug: node.slug,
      count: node.count,
    };
  });
}

/**
 * @function rearrangeLicenses
 * @tested - 6/7/2022
 * @description Take in an array of licenses and rearrange them in specific order
 * Standard
 * Extended
 * Server
 * 
 *
 **/
export function rearrangeLicenses(licenses: ILicense[]): ILicense[] {

  return licenses.reduce((acc: any, license) => {

    // Add it to the beginning of the array
    if (license.licenseType === 'standard') {
      acc.unshift(license)
    }

    if (license.licenseType === 'extended') {

      // check if the array has an item in it and make sure its not the standard license because standard is supposed to always be first
      if (acc.length === 1 && acc[0].licenseType !== 'standard') {
        acc.unshift(license) // means that the item in the array is the server license and we need to add the extended license before it

        // if the array has 2 items in it already it means we need to put the extended license in the middle of the array
      } else if (acc.length === 2) {
        const standard = acc[0]
        const server = acc[1]
        acc = [
          standard,
          license,
          server
        ]
      } else {
        acc.push(license)
      }
    }

    // always add server to the end of the array
    if (license.licenseType === 'server') {
      acc.push(license)
    }

    return acc
  }, [])
}

/**
 * @function mapPostData
 * @tested - 6/7/2022
 * @description Map over POST data, filter and return a clean object
 *
 **/
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
    modifiedData.categories = filterCategories(data.categories.edges);
  }

  // Clean up the featured image to make them more easy to access
  if (data.featuredImage) {
    modifiedData.featuredImage = data.featuredImage.node;
  }

  if (data.tags) {
    modifiedData.tags = data.tags.edges.map(({ node }) => {
      return {
        name: node.name,
        slug: node.slug,
        count: node.count,
      };
    });
  }

  if (data.relatedPosts) {
    modifiedData.relatedPosts = data.relatedPosts.map((post: IPostRaw) => {
      return mapPostData(post)
    })
  }

  if (data.tutorialManager) {
    modifiedData.tutorialManager = {
      ...data.tutorialManager,
      resources: data.tutorialManager.resources ? mapPostResources(data.tutorialManager.resources) : []
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

/**
 * @function parseComment
 * @tested - 6/7/2022
 * @description Return a filtered clean comment object
 * 
 *
 **/
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

/**
 * @function formatDate
 * @tested - 6/7/2022
 * @description Return a readable date from a WP server timestamp
 * 
 *
 **/
export function formatDate(date: string): string {
  const blogDate = new Date(date)
  const monthIndex: number = blogDate.getMonth()
  const day: number = blogDate.getDate()

  const months: string[] = [
    'Jan',
    'Feb',
    'March',
    'April',
    'May',
    'June',
    'July',
    'Aug',
    'Sept',
    'Oct',
    'Nov',
    'Dec'
  ]
  return `${months[monthIndex]} ${day}, ${blogDate.getFullYear()}`
}

/**
 * @function parseStringForSpecialCharacters
 * @tested - 6/7/2022
 * @description Remove certain characters from a string
 * Used on Blog Post titles
 * 
 *
 **/
export function parseStringForSpecialCharacters(string: string): string {
  return string.replace(/&/g, '').replace(/</g, '').replace(/>/g, '').replace(/"/g, '').replace(/'/g, '').replace(/\+/g, '')
  // return string.replace(/\+/g, '');
}

/**
 * @function checkTitleForBrackets
 * @tested - 6/7/2022
 * @description If brackets are in the title, remove them and return the title, then add the text that was in the brackets as a subtitle.
 * 
 *
 **/
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

/**
 * @function splitProgramNameInTitle
 * @tested - 6/7/2022
 * @description If certain key software words are in the title, remove them and return the title, then add the text as a subtitle.
 * 
 *
 **/
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

/**
 * @function findString
 * @tested - 6/7/2022
 * @description Return a string that is in the array if found, otherwise is undefined
 * 
 *
 **/
export function findString(str: string, arr: string[]): string | undefined {
  return arr.find(item => item.includes(str))
}

/**
 * @function findSkillLevel
 * @tested - 6/7/2022
 * @description This function takes the blog catgegories and looks for skill level. Will return the skill level if found from highest to lowest in-case there are multiple skill levels.
 * 
 *
 **/
export function findSkillLevel(categories: ICategories[]): ICategories | undefined {
  let tutorialsFound = false
  let defaultSkill: ICategories = {
    name: 'beginner',
    databaseId: 0,
    slug: 'beginner',
    id: 'beginner',
  }

  // grab the items with skill levels in them
  const skillsFound = categories.reduce((previousValue: any, currentValue: ICategories, index: number): any => {
    let level

    switch (currentValue.slug) {
      case "tutorials":
        tutorialsFound = true
        return previousValue
      case "advanced":
        level = 3
        previousValue.push({
          cat: currentValue,
          level: level,
          index
        })
        return previousValue
      case "intermediate":
        level = 2
        previousValue.push({
          cat: currentValue,
          level: level,
          index
        })
        return previousValue
      case "beginner":
        level = 1
        previousValue.push({
          cat: currentValue,
          level: level,
          index
        })
        return previousValue
      default:
        return previousValue
    }

  }, [])

  // Return default skill if tutorial is found but forgot to add skill level in WP backend.
  if (skillsFound.length === 0 && tutorialsFound) {
    return defaultSkill
  } else if (skillsFound.length === 0 && !tutorialsFound) {
    return undefined
  }

  // find the highest skill level
  return skillsFound.reduce((previousValue: any, currentValue: any): any => {
    if (currentValue.level > previousValue.level) {
      return currentValue
    }
    return previousValue
  }).cat
}

/**
 * @function getLicense
 * @tested - 6/7/2022
 * @description Search the License array for a specific license based on the License Enum
 * 
 *
 **/
export function getLicense(licenses: ILicense[] | null, type: LicenseEnum): ILicense | null {
  if (!licenses) {
    return null
  }

  const foundLicense = licenses.reduce((acc: any, curr: ILicense) => {
    if (curr.licenseType === type) {
      return curr
    }
    return acc
  }, {})

  if (isEmpty(foundLicense)) {
    return null
  }

  return foundLicense
}

/**
 * @function flattenAllCourses
 * @tested - 6/7/2022
 * @description Go over all the courses and flatten the data to remove edges and nodes from the keys
 * 
 *
 **/
export function flattenAllCourses(courses: ICoursesRaw): ICourse[] | false {
  const coursesFiltered = courses?.edges?.map(({ node = {} }) => node);
  return Array.isArray(coursesFiltered) && coursesFiltered.map(mapCourseData)
}

/**
 * @function mapCourseData
 * @tested - 6/7/2022
 * @description Map over Course data, filter and return a clean object
 * 
 *
 **/
export function mapCourseData(course: ICourseRaw | {} = {}): ICourse {
  const data = { ...course };
  let modifiedData: any = { ...course }

  if (data.featuredImage) {
    modifiedData.featuredImage = data.featuredImage.node;
  }

  if (data.details?.courseTags && data.details.courseTags.length > 0) {
    modifiedData.details.courseTags = data.details.courseTags.map(item => {
      return item.tag
    })
  }

  return modifiedData
}

/**
 * @function filterCategories
 * @tested - 6/29/2022
 * @description Map over Categories and return a clean object
 * 
 *
 **/
export function filterCategories(categories: ICategoryRaw[]): ICategories[] {
  return categories.map(({ node }) => {
    return {
      ...node,
    };
  })
}

/**
 * @function removeLastItemFromArray
 * @tested - 6/29/2022
 * @description Removes the last item from an array and return the new array AND the last item both as seperate objects to use in the breadcrumbs component
 * 
 *
 **/
export function removeLastItemFromArray(array: any[] | undefined) {
  if (!array) {
    return { lastElement: null, modifiedArray: null }
  }
  const newArray = [...array]
  const lastElement = newArray.pop()
  return {
    modifiedArray: newArray,
    lastElement
  }
}

export enum POST_RESOURCE_ENUMS {
  PRODUCT = 'product',
  COURSE = 'course',
  DOWNLOAD = 'download',
  SWATCH = 'colorSwatch'
}

/**
 * 
 * @function getResource 
 * @tested - 08/22/2022 
 */
export function getResource({ resources, resourceName }: { resources: IPostResource[], resourceName: POST_RESOURCE_ENUMS }): IPostResource | null {
  let foundResource = null
  resources.forEach(resource => {
    const keys = Object.keys(resource)
    if (keys.includes(resourceName)) {
      foundResource = resource
    }
  })
  return foundResource
}

/**
 * 
 * @function mapPostResources 
 * @tested - 08/22/2022 
 */
export function mapPostResources(resources: IPostResource[]) {
  return resources.map((resource, index) => {
    const keys = Object.keys(resource)

    if (keys.includes('colorSwatch')) {
      return resource
    }

    if (keys.includes('course')) {
      return resource
    }

    if (keys.includes('product')) {
      if (!resource.product) {
        return resource
      }
      return {
        ...resource,
        product: {
          ...resource.product,
          productDetails: {
            ...resource.product.productDetails,
            licences: resource.product.productDetails.licences ? rearrangeLicenses(resource.product.productDetails.licences) : null,
          }
        }
      }
    }

    return resource
  })
}


export function reducePostResourceData(resources: IPostResource[]) {
  return resources.reduce((acc, resource) => {
    const keys = Object.keys(resource)

    if (keys.includes('colorSwatch')) {
      return {
        ...acc,
        colorSwatch: resource.colorSwatch
      }
    }

    if (keys.includes('course')) {
      if (!resource.course) {
        return acc
      }
      return {
        ...acc,
        course: {
          ...resource.course,
          description: resource.description
        }
      }
    }

    if (keys.includes('product')) {
      if (!resource.product) {
        return acc
      }
      return {
        ...acc,
        product: {
          ...resource.product,
          description: resource.description,
          productDetails: {
            ...resource.product.productDetails,
            licences: resource.product.productDetails.licences ? rearrangeLicenses(resource.product.productDetails.licences) : null,
          }
        }
      }
    }

    if (keys.includes('download')) {
      return {
        ...acc,
        download: resource.download
      }
    }

    return acc
  }, {})
}

// export function createThumbnailImage(
//   tutorialManager: ITutorialManager,
//   defaultSource: IMediaDetailSize,
//   title: string,
//   featuredPost: boolean = false
// ) {

//   const defaultImage = () => (
//     // <div className={classNames(featuredPost ? 'rounded-2.5xl' : 'mb-8 h-[250px]', "default_image relative overflow-hidden")}>
//     <div className={classNames(featuredPost ? 'rounded-2.5xl' : 'mb-8', "default_image relative overflow-hidden")}>
//       {defaultSource.sourceUrl.length !== 0 &&
//         // <img className={classNames(featuredPost ? '' : 'absolute max-w-none top-[50%] w-full translate-y-[-50%]', "")}
//         <img className={classNames(featuredPost ? '' : '', "")}
//           src={defaultSource.sourceUrl} alt={title} />}
//     </div>
//   )
//   if (!tutorialManager.thumbnail || !tutorialManager.thumbnail.image) {
//     return defaultImage()
//   }

//   switch (tutorialManager.thumbnail.type) {
//     case "make":
//       return (
//         <>
//           <div className={classNames(featuredPost
//             ? `absolute top-[-20px] left-[15px] w-[45%] rotate-[352deg]`
//             : `absolute top-[10px] left-[15px] w-[40%]`, 'z-10')}>
//             <img className="relative z-10" src="/images/make-this.png" alt={`Make this tutorial: ${title}`} />
//             <span className={classNames(featuredPost
//               ? 'top-[45px]'
//               : 'top-[20px] ',
//               'absolute w-[40%] left-[71%] z-[5]')}>
//               <img src="/images/make-this-arrow-1.png" alt={`Make this tutorial: ${title}`} />
//             </span>
//           </div>
//           {!featuredPost && <div className="absolute top-[15px] right-[30px] w-[25%] opacity-70">
//             <img src="/images/video-tutorial-text.png" alt={`Video tutorial: ${title}`} />
//           </div>}
//           <div className="relative">
//             <div className="rounded-2.5xl overflow-hidden">
//               <img src={tutorialManager.thumbnail.image.sourceUrl} alt={`${tutorialManager.thumbnail.image.altText} Main Image`} />
//             </div>
//             {tutorialManager.colorPalette && <div style={{ backgroundColor: tutorialManager.colorPalette.iconBackgroundColor }} className="absolute rounded-full bottom-[-10px] tablet:bottom-[-10%] right-[30px] w-[100px] h-[100px] laptop:bottom-[-6%] desktop:w-[138px] desktop:h-[138px] bg-slate-500 desktop:top-auto desktop:bottom-[-10px] flex justify-center items-center">
//               <span style={{ color: tutorialManager.colorPalette.iconTextColor }} className="transform rotate-[-8deg] text-center font-sentinel__SemiBoldItal tablet:leading-4 desktop:text-xl desktop:leading-6">
//                 Free Color Swatches
//               </span>
//             </div>}
//           </div>

//         </>
//       )
//     default:
//       return defaultImage()
//   }
// }


// export function findSkillLevelDepricated(categories: ICategories[]): { name: string } | undefined {
//   let tutorialsFound = false
//   let defaultSkill = {
//     name: "beginner",
//   }
//   let skillFoundStopLooking = false

//   const skillFound = categories.reduce((previousValue: any, currentValue: ICategories): any => {
//     if (currentValue.slug === "tutorials") {
//       tutorialsFound = true
//     }
//     if (skillFoundStopLooking) {
//       return previousValue
//     }

//     switch (currentValue.slug) {

//       case "advanced":
//         skillFoundStopLooking = true
//         return currentValue
//       case "intermediate":
//         skillFoundStopLooking = true
//         return currentValue
//       case "beginner":
//         skillFoundStopLooking = true
//         return currentValue
//       default:
//         return previousValue
//     }
//   }, {})

//   return !isEmpty(skillFound)
//     ? skillFound
//     : isEmpty(skillFound) && tutorialsFound
//       ? defaultSkill
//       : undefined
// }
