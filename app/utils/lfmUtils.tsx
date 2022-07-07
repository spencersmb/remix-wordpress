import { TestimonialTexutreEnum } from "@App/enums/lfm"
export const lfmImgRoot = {
  aws: `https://et-courses.s3.amazonaws.com/lfm`
}

// TODO: Test
export const getLfmTexture = (type: TestimonialTexutreEnum): {
  class: string, image: {
    width: number
    height: number
    alt: string
    src: string
    placeholder?: string
  }
} => {
  switch (type) {
    case TestimonialTexutreEnum.Red:
      return {
        class: 'red-texture',
        image: {
          src: `${lfmImgRoot.aws}/textures/red-texture.png`,
          width: 800,
          height: 819,
          alt: 'Red Texture',
        }
      }
    case TestimonialTexutreEnum.Blue:
      return {
        class: 'blue-texture',
        image: {
          src: `${lfmImgRoot.aws}/textures/blue-texture.png`,
          width: 800,
          height: 819,
          alt: 'Blue Texture',
        }
      }
    case TestimonialTexutreEnum.Orange:
      return {
        class: 'orange-texture',
        image: {
          src: `${lfmImgRoot.aws}/textures/orange-texture.png`,
          width: 800,
          height: 819,
          alt: 'Orange Texture',
        }
      }
    case TestimonialTexutreEnum.Purple:
      return {
        class: 'red-texture',
        image: {
          src: `${lfmImgRoot.aws}/textures/purple-texture.png`,
          width: 800,
          height: 819,
          alt: 'Purple Texture',
        }
      }
    case TestimonialTexutreEnum.Pink:
      return {
        class: 'orange-texture',
        image: {
          src: `${lfmImgRoot.aws}/textures/pink-texture.png`,
          width: 800,
          height: 819,
          alt: 'Pink Texture',
        }
      }
    default:
      return {
        class: 'default-texture',
        image: {
          src: `${lfmImgRoot.aws}/textures/watercolor-03.png`,
          width: 800,
          height: 819,
          alt: 'Watercolor Texture',
        }
      }

  }
}

export function shuffleArray(array: any[]): any[] {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1))
    var temp = array[i]
    array[i] = array[j]
    array[j] = temp
  }
  return array
}