interface IMetaTagName {
  name: string
  content: string
}

interface IMetaTagProperty {
  property: string
  content: string
}

type IMeta = IMetaTagName | IMetaTagProperty

interface ISEOSETTINGS {
  defaultTitle: string,
  title: string
  description: string
  canonical: string
  openGraph: {
    type: string,
    title: string
    description: string
    images: any[],
    article?:{
      publishedTime?: string
      modifiedTime?: string
      authors?: any[]
      tags?: any[]
      video?: string
    }
  },
  twitter:{
    cardType: string
    site: string
    handle: string
  },
  additionalLinkTags?: any[],
  additionalMetaTags?: IMeta[],
}

interface IjsonldWebpage {
  pageUrl: string
  title: string
  domain: string
  publishTime?: string
  modifiedTime?: string
  description: string
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
type ISocialSettings = {
  twitter: ISocialTwitter
  facebook: ISocialFacebook
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
  webmaster?: any
  seo?: any
}

interface IjsonldPersonProps {
  domain: string
  description: string
  avatarUrl: string
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
