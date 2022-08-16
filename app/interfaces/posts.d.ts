type IPreviewPostType = 'post' | 'page' | null

interface ICategories {
  databaseId: number
  id: string
  name: string
  slug: string
}

interface ICategoryRaw {
  node: ICategories
}
interface IBreadCrumb {
  url: string
  text: string
}

interface IFeaturedImage {
  altText: string
  id: string
  sizes: string
  sourceUrl: string
  srcSet: string
  mimeType: string
  mediaDetails: IMediaDetails
}

interface IFeaturedImageNode {
  node: IFeaturedImage
}
interface Itag {
    name: string
    slug: string
    count: number
}

interface ITag {
  name: string
  slug: string
  count: number
}
interface ITagRaw {
  node: ITag
}
interface IWpTags {
  edges: ITagRaw[]
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
  downloads: {
    title: string
    freebie:{
        downloadLink: string
    }
  }[] | null
  youtube: {
    embedUrl: string,
    id: string
  }
  resources: IPostResource[] | null
  postExcerpt: string


}
 
interface IPostRaw {
  databaseId: number
  id: string
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
  tags: IWpTags
  relatedPosts:IPostRaw[]
  featuredImage: {node: IFeaturedImage} | null
  title: string
  slug: string
  date: string
  content: string
  excerpt: string
  seo: IPostSeo
  comments: {
    pageInfo: {
      endCursor: string
      hasNextPage: boolean
    }
    edges: {node: IPostCommentRaw}[]
  }
  tutorialManager: ITutorialManagerRaw,
  etSocialNav: ISocialNav
}
interface IPostSeo {
  fullHead?: string
  title: string
  opengraphPublishedTime: string
  opengraphModifiedTime: string
  metaDesc: string
  readingTime: number
}

interface IMediaDetailsSize {
  width: string,
  file: string
  height: string
  name: string
  sourceUrl: string
  mimeType: string
}
interface IMediaDetailSize {
  width: number
  height: number
  altTitle: string
  sourceUrl: string
  placeholder: string
  srcSet: string
  sizes: IMediaDetailsSize[]
}

interface IMediaDetails {
  width: number
  height: number
  sizes: IMediaDetailsSize[]
}

interface ImageLookupReturn {
  width: string
  height: string
  altTitle: string
  sourceUrl: string
  placeholder: string
  srcSet: string
  sizes: string
  file?: string
  mimeType?: string
  name: string
}

interface ISocialNav {
  pinterestMeta:{
    description: string
  }
  pinterestImage: IFeaturedImage | null
}
interface IPostResourceProduct {
  product: IProduct
  description: string
}
interface IPostResourceCourse {
  course: ICourse
  description: string
}
interface IPostResourceColorSwatch {
    url: string
}
interface IPostResourceDownload {
  url: string
  name: string
  description: string
}
type IPostResource = {
  description?: string
  product?: IProduct
  course?: {
    link: string
    slug: string
    title: string
    details:{
      courseUrl: string
    }
  }
  colorSwatch?: IPostResourceColorSwatch
  download?: IPostResourceDownload
}

interface IPostResourceObject {
  product?: IProduct & {description: string}
  course?: ICourse & {description: string}
  colorSwatch?: IPostResourceColorSwatch
  download?: IPostResourceDownload
}
// | IPostResourceCourse 
// | IPostResourceColorSwatch 
// | IPostResourceDownload

interface ITutorialManager {
  status: string
  thumbnail:{
    type: string
    image: IFeaturedImage | null
  }
  downloads: {
    title: string
    freebie:{
        downloadLink: string
    }
  }[] | null
  youtube: {
    embedUrl: string
    id: string | undefined
  }
  postExcerpt: string | null
  resources:IPostResource[]
}

interface IPost {
  databaseId: number //postID in wp
  date: string
  excerpt?: string
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
  // startCursor?: string
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