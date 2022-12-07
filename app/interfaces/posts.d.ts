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

interface ICategoryItem {
  [id: string]: {
    posts: any
    pageInfo: {
      page: number,
      endCursor: string,
      hasNextPage: boolean,
    }
  }
}
interface ICategoryState {
  selectedCategory: string;
  category: ICategoryItem
}
interface IFetchCategory {
  endCursor: string | null,
  page: number
}
interface IBreadCrumb {
  url: string
  text: string
}
interface IClipElements {
  name: string
  startOffset: string
  endOffset: string
}
interface IPotentialActions {
  name: string
  startOffset: string
}
interface IYoutubeData {
  id: string | undefined
  addVideoMetadata: boolean | null
  duration: string
  videoObject: {
    description: string
    uploadDate: string
    thumbnailUrl: string
    clipElements: IClipElements[]
    potentialActions: IPotentialActions[]
  }
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
  youtube: IYoutubeData
  resources: IPostResource[] | null
  postExcerpt: string
  quickSummary: string


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
interface IPostResourceLink {
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
    featuredImage: {
      node: IFeaturedImage
    }
    details:{ 
      courseUrl: string
    }
  }
  colorSwatch?: IPostResourceColorSwatch
  download?: IPostResourceDownload
  link?: IPostResourceDownload
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
  quickSummary: string
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
  youtube: IYoutubeData
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
interface IVideoObject {
  //required
    description: string
    name: string
    thumbnailUrl: string
    uploadDate: string

    //Recommended
    // contentUrl: string
    duration: string //The duration of the video in ISO 8601 format. For example, PT00H30M5S represents a duration of "thirty minutes and five seconds".
    embedUrl: string //The EMBED URL of the video.
    url: string //The URL of the video.
    clipElements: IClipElements[]
    potentialActions: IPotentialActions[] | null
}
interface IJsonldVideo {
  videoObject: IVideoObject,
  person: string
}