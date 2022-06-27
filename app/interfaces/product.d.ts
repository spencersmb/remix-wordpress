declare enum LicenseEnum {
  FREE = 'freebie',
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
  productContent:{
    subtitle: string | null
    description: string | null
    productfeatureimage: null | IFeaturedImage
  }
  // fonts: IProductFont[]
  font: {
    name: string | null
  }
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
  productDetails: IProductDetails
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

interface useProductLicenseState {
  price: number
  licenseType: LicenseEnum
  url: string
}


