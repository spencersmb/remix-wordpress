import { LfmTestimonialNamesEnum, TestimonialTexutreEnum } from "@App/enums/lfm";

const fontsUrl = 'https://et-courses.s3.amazonaws.com/lfm/fonts'
const testimonialProfileUrl = 'https://et-courses.s3.amazonaws.com/lfm/testimonials'
type testimonial = {[key in LfmTestimonialNamesEnum]: ITestimonial}
export const lfmTestimonialData: testimonial = {
  [LfmTestimonialNamesEnum.joyK]: {
    name: {
      first: 'Joy',
      last: 'K.'
    },
    texture: TestimonialTexutreEnum.T1,
    backgroundColor: '#e8f3e9',
    instagramHandle: '@howjoyful',
    profileImg: `${testimonialProfileUrl}/howjoyful.jpg`,
    img: {
      retina: `${fontsUrl}/joy-font-2x.jpg`,
      desktop: `${fontsUrl}/joy-font-1x.jpg`,
      mobile: `${fontsUrl}/joy-font-mobile.jpg`
    },
    fontLink: 'https://creativemarket.com/howjoyful/1444345-Amapola-script-font?u=everytuesday',
    fontName: 'Amapola',
    pullQuote: 'This has been one of my favorite classes and it paid for itself',
    quote: 'Teela has years of experience teaching, and you can tell right away the course is super easy to follow and the community behind the course is amazing. This has been one of my favorite classes and it paid for itself super fast after I released my first font. If you are thinking about enrolling, think no more, just do it!'
  }
}