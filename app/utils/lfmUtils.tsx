import { TestimonialTexutreEnum } from "@App/enums/lfm"
import { ckFormIds } from "@App/lib/convertKit/formIds"
import { json } from "@remix-run/node"
import { validateEmail } from "./validation"
import { consoleHelper } from "./windowUtils"

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
      src: `${lfmImgRoot.imigix}/mini-course/video-1.jpg?w=200&fit=crop&q=80`,
      alt: 'Learn Font Making Free Mini Course - Video 1',
      width: 200,
      height: 120,
      placeholder: `${lfmImgRoot.imigix}/mini-course/video-1.jpg?w=20&fit=crop&q=80`,
    },
    link: '/learn-font-making/mini-course/video-1',
  },
  {
    title: '5 Font Making Rookie Mistakes',
    description: 'Learn how to choose a font style that sells',
    videoId: 'rtis9kli4s',
    image: {
      src: `${lfmImgRoot.imigix}/mini-course/video-2.jpg?w=200&fit=crop&q=80`,
      alt: 'Learn Font Making Free Mini Course - Video 2',
      width: 200,
      height: 120,
      placeholder: `${lfmImgRoot.imigix}/mini-course/video-2.jpg?w=20&fit=crop&q=80`,
    },
    link: '/learn-font-making/mini-course/video-1',
  },
  {
    title: 'The tools I use to make hand lettered fonts',
    description: 'Learn how to choose a font style that sells',
    videoId: 'a50qscaago',
    image: {
      src: `${lfmImgRoot.imigix}/mini-course/video-3.jpg?w=200&fit=crop&q=80`,
      alt: 'Learn Font Making Free Mini Course - Video 3',
      width: 200,
      height: 120,
      placeholder: `${lfmImgRoot.imigix}/mini-course/video-3.jpg?w=20&fit=crop&q=80`,
    },
    link: '/learn-font-making/mini-course/video-1',
  },
]

interface LfmTextureReturn {
  class: string,
  image: {
    width: number
    height: number
    alt: string
    src: string
    placeholder?: string
  }
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

/**
 * 
 * @function lfmMiniCourseSignUpAction 
 * @tested  
 */
export async function lfmMiniCourseSignUpAction(request: Request): Promise<Response> {

  let form = await request.formData();
  let formType = form.get('_action') as string | null
  let formStatus = form.get('_openstatus') as string
  let email = form.get('email')
  let honeyPot = form.get('lastName')

  if (!formType) {
    console.error('lfmMiniCourseSignUpAction: formType is null')
    return json({
      status: 500,
      message: 'No form type provided',
    })
  }

  // we do this type check to be extra sure and to make TypeScript happy
  // we'll explore validation next!
  if (
    typeof email !== "string" ||
    typeof honeyPot !== "string" ||
    honeyPot.length !== 0
  ) {
    return json({
      formError: {
        [formType]: {
          message: 'No email provided',
          formId: 'error'
        }
      },

    })
  }

  let fields = { email };
  let fieldErrors = {
    email: validateEmail(email)
  };

  const id = formStatus === 'true'
    ? ckFormIds.miniCourse.signUp
    : ckFormIds.miniCourse.getNotified
  const url = `https://api.convertkit.com/v3/forms/${id}/subscribe`;

  if (Object.values(fieldErrors).some(Boolean))
    return json({ fieldErrors, fields });

  // Intercept the request and respond with a fake response when testing
  if (process.env.NODE_ENV === 'test') {
    return json({
      form: {
        [formType]: {
          message: 'success',
          formId: id
        }
      }
    })
  }

  // Sign user up
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        api_key: process.env.CK_KEY,
        email,
      }),
    })

    return json({
      form: {
        [formType]: {
          message: 'success',
          formId: id
        }
      }
    })
  } catch (error: any) {
    console.error(error.message)
    console.error(error.response)
    return json({
      formError: {
        [formType]: {
          message: `Something went wrong. Please try again later. Error: ${error.message}`,
          formId: id
        }
      }
    })
  }
}