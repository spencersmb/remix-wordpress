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
  caption: string
  id: string
  sizes: string
  sourceUrl?: string
  srcSet: null | string[]
}

interface IFeaturedImageNode {
  node: IFeaturedImage
}
interface Itag {
    name: string
}
interface IFeaturedImage {
  altText: string
  caption: string
  id: string
  sizes: string
  sourceUrl?: string
  srcSet: null | string[]
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
}
interface IPostSeo {
  fullHead: string
  title: string
  opengraphPublishedTime: string
  opengraphModifiedTime: string
  metaDesc: string
  readingTime: string
}
interface IPost {
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
  categories?: ICategories[]
  tags:Itag[]
  featuredImage: IFeaturedImage
  title: string
  slug: string
  id: string
  seo:IPostSeo
  downloadManager: IDownloadManager
}

interface IwpPageInfo {
  endCursor: string
  hasNextPage: boolean
  hasPreviousPage: boolean
  startCursor: string

}
