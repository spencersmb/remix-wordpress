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
interface IProductDetails{
  title: string
  // fonts: IProductFont[]
  type: string
  licences: ILicense[]
  youtube: {
    url: string
  }
}
interface IProduct {
  title: string
  slug: string
  featuredImage: {
    node: IFeaturedImage
  }
  details: IProductDetails
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


