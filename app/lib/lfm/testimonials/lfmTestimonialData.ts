import { LfmTestimonialNamesEnum, TestimonialTexutreEnum } from "@App/enums/lfm";

const fontsUrl = 'https://et-courses.s3.amazonaws.com/lfm/fonts'
const testimonialProfileUrl = 'https://et-courses.s3.amazonaws.com/lfm/testimonials'
type testimonial = {[key in LfmTestimonialNamesEnum]: ITestimonial}
export const lfmTestimonialData: testimonial = {
  [LfmTestimonialNamesEnum.BeckM]:{
    name: {
      first: 'Beck',
      last: 'M.'
    },
    texture: TestimonialTexutreEnum.Red,
    backgroundColor: '#F5F7FF',
    instagramHandle: '@beckmccormick',
    profileImg: 'https://every-tuesday.com/wp-content/themes/et2017_sage/assets/images/teachable/lfm/mini-course/beckmccormick.jpg',
    img: {
      retina: `${fontsUrl}/beck-font-2x.jpg`,
      desktop: `${fontsUrl}/beck-font-1x.jpg`,
      mobile: `${fontsUrl}/beck-font-mobile.jpg`
    },
    fontLink: 'https://creativemarket.com/BeckMcCormick/1388413-Spring-Market-Rustic-Font?u=everytuesday',
    fontName: 'Spring Market',
    pullQuote: 'This course was the single, greatest investment I\'ve made for my creativity, EVER.',
    quote: 'I\'d always wanted to make hand-lettered fonts but gave up after nearly every attempt because I struggled to learn the programming aspect. Teela made it easy as pie -- the videos are a fantastic visual aid, and her instructions make learning the process so simple. In addition to the course, Teela\'s got an amazing community of fellow designers that provide feedback, suggestions, and experiences -- truly artists supporting artists! Teela also made herself super accessible and responds to any question with helpful information & constructive advice. Sign up -- you won\'t regret it.'
  },
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
  },
  [LfmTestimonialNamesEnum.LizU]:{
    name: {
      first: 'Elizabeth',
      last: 'U.'
    },
    texture: TestimonialTexutreEnum.T1,
    backgroundColor: '#f9eeea',
    instagramHandle: '@luluinkdesigns',
    profileImg: `${testimonialProfileUrl}/liz-u.jpg`,
    img: {
      retina: `${fontsUrl}/liz-font-2x.jpg`,
      desktop: `${fontsUrl}/liz-font-1x.jpg`,
      mobile: `${fontsUrl}/liz-font-mobile.jpg`
    },
    fontLink: 'https://creativemarket.com/luluinkdesigns/1409084-Blooming-Heirloom-A-Handwritten-Font?u=everytuesday',
    fontName: 'Blooming Heirloom',
    pullQuote: 'I have since paid for the course 3 times over with the sales of my fonts in just 6 months',
    quote: 'Taking the course \'Learn Font Making\' with Teela has proven to be invaluable. The attention to detail, and ease of following along, made this course enjoyable and empowering. Not only was the course easy to understand and implement, the continued support from Teela was something I was blown away by. Although font making can be a daunting skill to learn, I finished this course with confidence to go forward, into the font making and font selling world knowing I\'d have success. I have since paid for the course 3 times over with the sales of my fonts in just 6 months. Teela\'s skills and knowledge as well as kind, genuine heart made for the perfect learning experience.'
  }
}