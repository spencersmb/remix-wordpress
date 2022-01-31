import { isEmpty } from "lodash";

export function flattenAllPosts(posts:any): IPost[] | false{
  const postsFiltered = posts?.edges?.map(({ node = {} }) => node);
  return Array.isArray(postsFiltered) && postsFiltered.map(mapPostData)
}

export function mapPostData(post:IPostRaw | {} = {}): IPost {
  const data = { ...post };
  let modifiedData: any = {...post}

  // Clean up the author object to avoid someone having to look an extra
  // level deeper into the node
  if (data.author)  {
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

  if(data.relatedPosts){
    modifiedData.relatedPosts = data.relatedPosts.map((post: IPostRaw) => {
      return mapPostData(post)
    })
  }

  if(data.downloadManager?.downloads){
    modifiedData.downloadManager = data.downloadManager?.downloads.map(download => {
      return download.downloadDetails
    })
  }


  if(data.comments){
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

export function getMediaSizeUrl(socialNav: ISocialNav, name: string): IMediaDetailSize{

  if(!socialNav.pinterestImage){
    return {
      file: '',
      height: '',
      name: '',
      sourceUrl: 'https://every-tuesday.com/wp-content/uploads/2021/12/winter-watercolor-floral-borders-procreate-pinterest.jpg', // TODO: add a default image
      width: '',
    }
  }

  return socialNav.pinterestImage.mediaDetails.sizes.reduce((previousValue: any, currentValue: any) => {
    
    if(currentValue.name === name){
      return currentValue
    }else{ 
      return previousValue
    }
    
  }, {})
}

export function formatDate(date: string): string{
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

export function splitProgramNameInTitle(title: string):{title: string, subTitle: string | undefined} {
  let newTitle = title
  switch (Boolean(title)) {

    case title.includes("in Procreate"):
      newTitle = title.replace("in Procreate", "")
      return {
        title: newTitle,
        subTitle: "in Procreate",
      }
      // return (
      //   <>
      //     <div className='mb-3'>{newTitle}</div>
      //     <div className={`${splitCss}`}>in Procreate</div>
      //   </>
      // )

    case title.includes("in Illustrator"):
      newTitle = title.replace("in Illustrator", "")
      return{
        title: newTitle,
        subTitle: "in Illustrator",
      }
      // return (
      //   <>
      //     <div className='mb-3'>{newTitle}</div>
      //     <div className={`${splitCss}`}>in Illustrator</div>
      //   </>
      // )
    case title.includes("in Adobe Illustrator"):
      newTitle = title.replace("in Adobe Illustrator", "")
      return {
        title: newTitle,
        subTitle: "in Adobe Illustrator",
      }
      // return (
      //   <>
      //     <div className='mb-3'>{newTitle}</div>
      //     <div className={`${splitCss}`}>in Adobe Illustrator</div>
      //   </>
      // )
    case title.includes("in InDesign"):
      newTitle = title.replace("in InDesign", "")
      return {
        title: newTitle,
        subTitle: "in InDesign",
      }
      // return (
      //   <>
      //     <div className='mb-3'>{newTitle}</div>
      //     <div className={`${splitCss}`}>in InDesign</div>
      //   </>
      // )
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
  const skillFound = categories.reduce((previousValue: any, currentValue: ICategories):any => {
    if(currentValue.slug === "tutorials"){
      tutorialsFound = true
    }
    switch(currentValue.slug ){
      case "beginner":
        return currentValue
      case "intermediate":
        return currentValue
      case "advanced":
        return currentValue
      default:
        return previousValue
    }
    // if(currentValue.slug === 'advanced'){
    //   console.log('found', currentValue.slug);
    //   return currentValue
    // }else{
    //   return previousValue
    // }

  }, {})
  
  console.log('skillFound', skillFound);
  

  return !isEmpty(skillFound) 
    ? skillFound 
    : isEmpty(skillFound) && tutorialsFound 
      ? defaultSkill
      : undefined
}