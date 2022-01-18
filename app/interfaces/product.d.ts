declare enum LicenseEnum {
  STANDARD = 'standard',
  EXTENDED = 'extended',
  SERVER = 'server'
}
interface IProductFont {
  name: string
  styles: { name: string }[]
}
interface ILicense {
  licenseType: LicenseEnum
  url: string
  price: number
}
interface IProduct {
  id: string
  title: string
  slug: string
  featuredImage: {
    node: IFeaturedImage
  }
  details: {
    // fonts: IProductFont[]
    licences: ILicense[]
    youtube: {
      url: string
    }
  }
  seo: IPostSeo & {
    schema: {
      raw: string
    }
    opengraphImage: {
      id: string
      altText: string
      sourceUrl: string
    }
  }
}


