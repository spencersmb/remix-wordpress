
declare enum TestimonialTexutreEnum {
  T1 = 'texture1',
  Red = 'texture2',
  Blue = 'texture3',
  Orange = 'texture4',
  Purple = 'texture5',
  Pink = 'texture6'
}
interface ITestimonial {
  name: {
    first: string,
    last: string
  },
  profileImg: string
  texture: TestimonialTexutreEnum
  instagramHandle: string
  quote: string
  pullQuote: string
  img: {
    retina: string
    desktop: string
    mobile: string
  }
  backgroundColor: string
  fontLink: string
  fontName: string
}