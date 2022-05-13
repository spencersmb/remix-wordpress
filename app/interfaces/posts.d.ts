interface ICategories {
  databaseId: number
  id: string
  name: string
  slug: string
}

interface ICategoryRaw {
  node: ICategories
}

interface IFeaturedImage {
  altText: string
  id: string
  sizes: string
  sourceUrl: string
  srcSet: string
  mimeType: string
  mediaDetails: {
    height: string
    width: string
    sizes: {
      width: string
      file: string
      height: string
      name: string
      mimeType: string
      sourceUrl: string
    }[]
  }
}

interface IFeaturedImageNode {
  node: IFeaturedImage
}
interface Itag {
    name: string
    slug: string
}

type ITagCount = Itag & { count: number };

interface IDownload{
  etdmCampaign: string
  etdmDescriptor: string
  etdmFileSize: string
  etdmFileType: string
  etdmLink: string
  etdmSsVersion: string
  etdmTitle: string
  etdmVersion: string
}
interface IDownloadManager {
  downloads: IDownload[] | null
}

interface ITutorialManagerRaw {
  status: string
  thumbnail:{
    type: string
    image: {
      sourceUrl: string
      altText: string
    } | null
  }
  colorPalette: {
    downloadUrl: string
    iconBackgroundColor: string
    iconTextColor: string
  }[] | null // Coming from the server this is acutally an array or null
  downloads: {
    title: string
    freebie:{
        downloadLink: string
    }
  }[] | null
  youtube: {
    embedUrl: string
  }
  paidProducts: IProduct[]| null
  postExcerpt: string


}

interface IPostRaw {
  author: {
    node: {
      avatar: {
        height: number
        url: string
        width: number
      }
      id: string
      name: string,
      slug: string
    }
  }
  categories: {
    edges: ICategoryRaw[]
  }
  tags: {
    edges: [{node: Itag}]
  }
  relatedPosts:IPostRaw[]
  featuredImage: {node: IFeaturedImage}
  title: string
  slug: string
  date: string
  excerpt: string
  seo: IPostSeo
  comments: {
    pageInfo: {
      endCursor: string
      hasNextPage: boolean
    }
    edges: {node: IPostCommentRaw}[]
  }
  tutorialManager: ITutorialManagerRaw
}
interface IPostSeo {
  fullHead?: string
  title: string
  opengraphPublishedTime: string
  opengraphModifiedTime: string
  metaDesc: string
  readingTime: string
}

interface IMediaDetailSize {
  width: string
  height: string
  altTitle: string
  sourceUrl: string
  placeholder: string
  srcSet: string
  sizes: string
}

interface ISocialNav {
  pinterestMeta:{
    description: string
  }
  pinterestImage: IFeaturedImage | null
}

interface ITutorialManager {
  status: string
  thumbnail:{
    type: string
    image: IFeaturedImage | null
  }
  colorPalette: {
    downloadUrl: string
    iconBackgroundColor: string
    iconTextColor: string
  } | null // Coming from the server this is acutally an array or null
  downloads: {
    title: string
    freebie:{
        downloadLink: string
    }
  }[] | null
  youtube: {
    embedUrl: string
  }
  paidProducts: IProduct[]| null
  postExcerpt: string


}

interface IPost {
  databaseId: number //postID in wp
  date: string
  author: {
    avatar: {
      height: number
      url: string
      width: number
    }
    id: string
    name: string,
    slug: string
    uri: string
  }
  content: string
  categories: ICategories[]
  tags:Itag[]
  featuredImage: IFeaturedImage | null
  title: string
  slug: string
  id: string
  seo:IPostSeo
  tutorialManager: ITutorialManager
  comments:IComments
  etSocialNav: ISocialNav
  relatedPosts: IPost[]
}
interface IComments {
  pageInfo: {
      endCursor: string
      hasNextPage: boolean
    }
  list:IPostComment[]
}
interface IwpPageInfo {
  endCursor: string
  hasNextPage: boolean
  hasPreviousPage: boolean
  startCursor: string

}
interface ICommentContent {
  author: {name: string}
  content: string
  databaseId: number
  date: string
  id: string
  
}
interface IPostCommentReply {
  node: ICommentContent
}
interface ICommentAuthor  {
  name: string, 
  id: string , 
  databaseId: string , 
  gravatar: {
    url: string
  }
}
type IPostCommentRaw = {
  author: {node: ICommentAuthor},
  content: string
  databaseId: number
  approved: boolean
  parent: {
    node: {
      databaseId: number
    }
  } | null
  commentedOn:{
    node:{
      databaseId: number
    }
  }
  date: string
  id: string
  replies: {
    edges: {
      node: {
        author: {node: ICommentAuthor}
        content: string
        databaseId: number
        date: string
        id: string
        parent: {
          node: {
            databaseId: number
          }
        } | null
      }
    }[]
  }
}
type IPostComment = {
  author: ICommentAuthor
  content: string
  databaseId: number
  date: string
  id: string
  parent?: number | null
  replies?: IPostComment[]
}

interface IPostComments {
  comments: IPostComment[]
}

interface ICommentResponse {
  createComment: {
    success: boolean,
    comment: IPostCommentRaw | null
  } // null means they havn't been approved yet
}

interface IGQLError{
  message: string
  path: string[]
}