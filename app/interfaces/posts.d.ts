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
  mediaDetails: {
    sizes: {sourceUrl: string}[]
  }
}

interface IFeaturedImageNode {
  node: IFeaturedImage
}
interface Itag {
    name: string
    slug: string
}

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
  featuredImage: {node: IFeaturedImage}
  title: string
  slug: string
  date: string
  excerpt: string
  seo: IPostSeo
  downloadManager: {downloads: {downloadDetails: IDownload}[] | null}
  comments: {
    pageInfo: {
      endCursor: string
      hasNextPage: boolean
    }
    edges: {node: IPostCommentRaw}[]
  }
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
  name: string
  width: string
  height: string
  file: string
  sourceUrl: string
}

interface ISocialNav {
  pinterestImage?:{
    sourceUrl: string
    mediaDetails:{
      sizes: IMediaDetailSize[]
    }
  }
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
  featuredImage: IFeaturedImage
  title: string
  slug: string
  id: string
  seo:IPostSeo
  downloadManager: IDownloadManager
  comments:{
    pageInfo: {
      endCursor: string
      hasNextPage: boolean
    }
    list:IPostComment[]
  }
  etSocialNav: ISocialNav
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