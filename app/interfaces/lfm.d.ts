
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
interface CmGridItem {
	img: string
	link: string
	alt: string
}
interface MiniCoureVideoItem {
  title: string,
  description: string,
  videoId: string,
  image: {
    src: string,
    alt: string,
    width: number,
    height: number,
    placeholder?: string
  },
  link: string
}