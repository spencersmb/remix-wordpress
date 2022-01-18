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
  gumroadUrl: string
  licenseType: LicenseEnum
  price: number
}
interface IProduct {
  title: string
  slug: string
  details: {
    fonts: IProductFont[]
  }
  licences: ILicense[]
  youtube: {
    url: string
  }
}


