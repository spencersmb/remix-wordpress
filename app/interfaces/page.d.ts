interface IPageCore {
  title: string
  content: string
  author: {
    avatar: {
      height: number
      url: string
      width: number
    }
    id: string
    name: string,
    slug: string
  }
  featuredImage?: IFeaturedImage 
  date: string | number
  id: string
  slug: string,
  seo:IPostSeo
}

type IPageRaw = IPageCore & {
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
  featuredImage: IFeaturedImageNode
}

type IPage = IPageCore
