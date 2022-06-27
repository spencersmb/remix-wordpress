import { LicenseEnum } from "@App/enums/products";
import { mockFeaturedImage } from "./images";
import { mockSeo } from "./posts";

export const mockStandardLicense:ILicense = {
  licenseType: LicenseEnum.STANDARD,
  price: 15,
  url: "https://gum.co/beautiful-lettering"
}
export const mockExtendedLicense:ILicense = {
  licenseType: LicenseEnum.EXTENDED,
  price: 30,
  url: "https://gum.co/beautiful-lettering-extended"
}
export const mockServerLicense:ILicense = {
  licenseType: LicenseEnum.SERVER,
  price: 60,
  url: "https://gum.co/beautiful-lettering-server"
}
export const mockGenericProduct: IProduct = {
    title: 'product 1',
    slug: 'product-1',
    featuredImage: {
      node: mockFeaturedImage
    },
    productDetails: {
      font: {
        name: ''
      },
      licences: [

      ],
      productContent: {
        description: '',
        productfeatureimage: mockFeaturedImage,
        subtitle: ''
      },
      title: 'product 1',
      youtube: {
        url: ''
      }
    },
    seo: {
      metaDesc: '',
      opengraphModifiedTime: '',
      opengraphPublishedTime: '',
      readingTime: 1,
      title: '',
      opengraphImage: {
        altText: '',
        sourceUrl: '',
        id: '',
      },
      schema: {
        raw: ''
      },
      fullHead: ''
    }
}

export const mockPaidProduct: IProduct = {
  title: "Beautiful Lettering Brush Set",
  slug: "beautiful-lettering-brush-set",
  seo:{
    title: "Beautiful Lettering Brush Set",
    metaDesc: "Beautiful Lettering Brush Set",
    opengraphModifiedTime: "2020-01-01T00:00:00.000Z",
    opengraphPublishedTime: "2020-01-01T00:00:00.000Z",
    readingTime: 1,
    schema: {
      raw: 'string'
    },
    opengraphImage: {
      id: 'string',
      altText: 'string',
      sourceUrl: 'string'
    }
  },
  featuredImage: {
    node: {
      mimeType: "image/jpeg",
      mediaDetails: {
        height: 335,
        width: 435,
        sizes: [
          {
            width: "20",
            file: "wp-gumroad-brush-set-20x20.jpg",
            height: "20",
            name: "placeholder",
            sourceUrl: "https://etheadless.local/wp-content/uploads/2021/11/wp-gumroad-brush-set-20x20.jpg",
            mimeType: "image/jpeg"
          },
          {
            width: "150",
            file: "wp-gumroad-brush-set-150x150.jpg",
            height: "150",
            name: "thumbnail",
            sourceUrl: "https://etheadless.local/wp-content/uploads/2021/11/wp-gumroad-brush-set-150x150.jpg",
            mimeType: "image/jpeg"
          },
          {
            width: "100",
            file: "wp-gumroad-brush-set-100x77.jpg",
            height: "77",
            name: "et_thumbnail",
            sourceUrl: "https://etheadless.local/wp-content/uploads/2021/11/wp-gumroad-brush-set-100x77.jpg",
            mimeType: "image/jpeg"
          },
          {
            width: "128",
            file: "wp-gumroad-brush-set-128x86.jpg",
            height: "86",
            name: "readanddigest_thumb",
            sourceUrl: "https://etheadless.local/wp-content/uploads/2021/11/wp-gumroad-brush-set-128x86.jpg",
            mimeType: "image/jpeg"
          },
          {
            width: "421",
            file: "wp-gumroad-brush-set-421x203.jpg",
            height: "203",
            name: "wp_rp_thumbnail",
            sourceUrl: "https://etheadless.local/wp-content/uploads/2021/11/wp-gumroad-brush-set-421x203.jpg",
            mimeType: "image/jpeg"
          }
        ]
      },
      altText: "Beautiful Lettering Brush Set",
      sourceUrl: "https://etheadless.local/wp-content/uploads/2021/11/wp-gumroad-brush-set.jpg",
      srcSet: "https://etheadless.local/wp-content/uploads/2021/11/wp-gumroad-brush-set.jpg 435w, https://etheadless.local/wp-content/uploads/2021/11/wp-gumroad-brush-set-100x77.jpg 100w",
      sizes: "(max-width: 435px) 100vw, 435px",
      id: "cG9zdDoxMDA1Mg=="
    }
  },
  productDetails: {
    font:{
      name: "Arial",
    },
    title: "Beautiful Lettering Brush Set",
    productContent:{
      description: null,
      productfeatureimage: {
        ...mockFeaturedImage
      },
      subtitle:null,
    },
    youtube:{
      url: ''
    },
    licences: [
      {
        licenseType: LicenseEnum.EXTENDED,
        price: 30,
        url: "https://gum.co/beautiful-lettering-extended"
      },
      {
        licenseType: LicenseEnum.STANDARD,
        price: 15,
        url: "https://gum.co/beautiful-lettering"
      }
    ]
  }
}