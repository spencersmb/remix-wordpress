import { TestimonialTexutreEnum } from "@App/enums/lfm"
import { createImgixSizes } from "./imageHelpers"

export const lfmImgRoot = {
  aws: `https://et-courses.s3.amazonaws.com/lfm`,
  imigix: `https://et-website.imgix.net/images/lfm`,
}

export const miniCourseVideoData: MiniCoureVideoItem[] = [
  {
    title: '3 Steps to choosing a font style that sells',
    description: 'Over the last year and a half, I’ve had the opportunity to teach the basics of typography to undergraduate graphic design students. During this time, I’ve noticed some common mistakes that my students make when first learning how to work with type.',
    videoId: '6hc6iwbssb',
    image: {
      src: `${lfmImgRoot.imigix}/mini-course/video-1.jpg?w=440&fit=crop&q=80`,
      alt: 'Learn Font Making Free Mini Course - Video 1',
      width: 440,
      height: 284,
      placeholder: `${lfmImgRoot.imigix}/mini-course/video-1.jpg?w=20&fit=crop&q=80`,
    },
    link: '/learn-font-making/mini-course/video-1',
  },
  {
    title: '5 Font Making Rookie Mistakes',
    description: 'Learn how to choose a font style that sells',
    videoId: 'rtis9kli4s',
    image: {
      src: `${lfmImgRoot.imigix}/mini-course/video-2.jpg?w=440&fit=crop&q=80`,
      alt: 'Learn Font Making Free Mini Course - Video 2',
      width: 440,
      height: 284,
      placeholder: `${lfmImgRoot.imigix}/mini-course/video-2.jpg?w=20&fit=crop&q=80`,
    },
    link: '/learn-font-making/mini-course/video-1',
  },
  {
    title: 'The tools I use to make hand lettered fonts',
    description: 'Learn how to choose a font style that sells',
    videoId: 'a50qscaago',
    image: {
      src: `${lfmImgRoot.imigix}/mini-course/video-3.jpg?w=440&fit=crop&q=80`,
      alt: 'Learn Font Making Free Mini Course - Video 3',
      width: 440,
      height: 284,
      placeholder: `${lfmImgRoot.imigix}/mini-course/video-3.jpg?w=20&fit=crop&q=80`,
    },
    link: '/learn-font-making/mini-course/video-1',
  },
]

interface LfmTextureReturn {
  class: string,
  image: CreateImgixReturn
}

/**
 * 
 * @function getLfmTexture 
 * @tested  
 */
export const getLfmTexture = (type: TestimonialTexutreEnum): LfmTextureReturn => {
  switch (type) {
    case TestimonialTexutreEnum.Red:

      return {
        class: 'red-texture',
        image: createImgixSizes({
          src: `${lfmImgRoot.aws}/textures/red-texture.png`,
          alt: 'Red Texture',
          width: 800,
          height: 819,
          mobileSize: 500
        })
      }
    case TestimonialTexutreEnum.Blue:
      return {
        class: 'red-texture',
        image: createImgixSizes({
          src: `${lfmImgRoot.aws}/textures/blue-texture.png`,
          alt: 'Blue Texture',
          width: 800,
          height: 819,
          mobileSize: 500
        })
      }

    case TestimonialTexutreEnum.Orange:
      return {
        class: 'orange-texture',
        image: createImgixSizes({
          src: `${lfmImgRoot.aws}/textures/orange-texture.png`,
          alt: 'Orange Texture',
          width: 800,
          height: 819,
          mobileSize: 500
        })
      }
    case TestimonialTexutreEnum.Purple:
      return {
        class: 'red-texture',
        image: createImgixSizes({
          src: `${lfmImgRoot.aws}/textures/purple-texture.png`,
          alt: 'Purple Texture',
          width: 800,
          height: 819,
          mobileSize: 500
        })
      }
    case TestimonialTexutreEnum.Pink:
      return {
        class: 'orange-texture',
        image: createImgixSizes({
          src: `${lfmImgRoot.aws}/textures/pink-texture.png`,
          alt: 'Pink Texture',
          width: 800,
          height: 819,
          mobileSize: 500
        })
      }
    default:
      return {
        class: 'default-texture',
        image: createImgixSizes({
          src: `${lfmImgRoot.aws}/textures/watercolor-03.png`,
          alt: 'Watercolor Texture',
          width: 800,
          height: 819,
          mobileSize: 500
        })
      }

  }
}

/**
 * 
 * @function shuffleArray 
 * @tested  
 */
export function shuffleArray(array: any[]): any[] {
  let modifiedArray = new Array(...array)
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1))
    var temp = modifiedArray[i]
    modifiedArray[i] = modifiedArray[j]
    modifiedArray[j] = temp
  }
  return modifiedArray
}
