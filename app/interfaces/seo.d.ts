
declare enum ShopPlatformEnum {
  GUMROAD = 'gumroad',
  SHOPIFY = 'shopify',
  SENDOWL = 'sendowl',
}
interface IMetaTagName {
  name: string
  content: string
}

interface IMetaTagProperty {
  property: string
  content: string
}
interface IAuthor {
  avatar: {
    height: number
    url: string
    width: number
  }
  id: string
  name: string,
  slug: string
}
interface ISiteAuthor {
  author: IAuthor
}
interface IjsonldWebpage {
  pageUrl: string
  title: string
  domain: string
  publishTime?: string
  modifiedTime?: string
  description: string
}

interface IjsonldPersonProps {
  domain: string
  description: string
  author: IAuthor
}

interface IjsonldWebProps {
  domain: string
  description: string
  siteTitle: string
}

interface IjsonldImageProps {
  pageUrl: string
  image: {
    url: string
    width: number
    height: number
    altText: string
  }
}

interface IJsonldBlog {
  url: string
  images: string[]
  datePublished: string
  dateModified: string
  author: string
  description: string
  title: string
}

interface IJsonldProduct {
  url: string
  images: string[]
  product: IProduct,
  shopPlatform: string
}

interface ISocialTwitter {
  username: string
  cardType: string
  url: string
}
interface ISocialFacebook {
  url: string
  defaultImage: {
    altText: string
    mediaDetails: {
      height: number
      width: number
    }
    sourceUrl: string
  }
}



interface IBreadcrumb {
  position: number,
  name: string,
  item: string,
}
interface IBreadcrumbList {
  domain: string
  breadcrumbList: IBreadcrumb[]
}

interface IGetMetaTagsFunction{
  metadata: ISiteMetaDataMapped
  post?: IPost
  page?: IPage
  product? : IProduct
  follow?: boolean
}
interface IOgImageType{
  width: string
  height: string
  url: string
  altText: string
}
interface IOgArticle {
  publishedTime: string
  modifiedTime: string
  author: string
  tags: {name: string}[]
}

interface ISocialOptionA {
  url: string
}
interface ISocialOptionB {
  username: string
  cardType: string
}

interface ISocialOptionC {
  metaTag: string
  url: string
}

interface ISocialOptionD {
  url: string
  defaultImage: {
    altText: string
    sourceUrl: string
    mediaDetails: {
      height: number,
      width: number
    }
  }
}
interface ISiteSocialStarter {
  youTube: {
    url: string
  },
  twitter: {
    username: string
    cardType: string
  },
  pinterest: {
    metaTag: string
    url: string
  },
  instagram: {
    url: string
  },
  facebook: {
    url: string
    defaultImage: {
      altText: string
      sourceUrl: string
      mediaDetails: {
        height: number,
        width: number
      }
    }
  }
}
interface ISiteMetaDataStarter {
    generalSettings: {
      description: string
      language: string
      title: string
      shopPlatform: ShopPlatformEnum
      author: IAuthor
    },
  seo: {
    social: ISiteSocialStarter
  },
}

type ISocialSettings = {
  twitter: ISocialTwitter
  facebook: string
  pinterest: string
  instagram: string
  youtube: string
}



interface IMetaData {
  title: string
  domain: string
  siteTitle: string
  description: string
  language: string
  social: ISocialSettings
  shopPlatform: ShopPlatformEnum
  author: IAuthor
  seo?: any
}

type ISiteMetaDataMapped = {
  author: IAuthor
} & IMetaData