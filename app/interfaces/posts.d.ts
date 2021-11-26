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
  srcSet: null | any[]
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
  srcSet: null | any[]
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
  featuredImage: IFeaturedImage
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
}

