
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
      sourceUrl: '', // TODO: add a default image
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