import { TestimonialTexutreEnum } from "@App/enums/lfm"
import { isArray, isEqual } from "lodash"
import { getLfmTexture, lfmImgRoot, lfmMiniCourseSignUpAction, miniCourseVideoData, shuffleArray } from "../lfmUtils"

describe('LFM: utils', () => {
  it('Should have 3 videos for the mini-course', () => {
    expect(miniCourseVideoData).toHaveLength(3)
  })

  it('Should have img keys of AWS and imgix', () => {
    const imgKeys = Object.keys(lfmImgRoot)

    expect(imgKeys[0]).toBe('aws')
    expect(imgKeys[1]).toBe('imigix')

    expect(lfmImgRoot.aws).toBe('https://et-courses.s3.amazonaws.com/lfm')
    expect(lfmImgRoot.imigix).toBe('https://et-website.imgix.net/images/lfm')
  })

  it('getLfmTexture(): Should return default texture', () => {
    const textureFound = getLfmTexture(TestimonialTexutreEnum.T1)
    expect(textureFound.class).toBe('default-texture')
    expect(textureFound.image.src).toBe(`${lfmImgRoot.aws}/textures/watercolor-03.png`)
  })

  it('getLfmTexture(): Should return color textures', () => {
    const redTexture = getLfmTexture(TestimonialTexutreEnum.Red)
    expect(redTexture.class).toBe('red-texture')
    expect(redTexture.image.src).toBe(`${lfmImgRoot.aws}/textures/red-texture.png`)

    const blueTexture = getLfmTexture(TestimonialTexutreEnum.Blue)
    expect(blueTexture.class).toBe('blue-texture')
    expect(blueTexture.image.src).toBe(`${lfmImgRoot.aws}/textures/blue-texture.png`)

    const orangeTexture = getLfmTexture(TestimonialTexutreEnum.Orange)
    expect(orangeTexture.class).toBe('orange-texture')
    expect(orangeTexture.image.src).toBe(`${lfmImgRoot.aws}/textures/orange-texture.png`)

    const purpleTexture = getLfmTexture(TestimonialTexutreEnum.Purple)
    expect(purpleTexture.class).toBe('red-texture')
    expect(purpleTexture.image.src).toBe(`${lfmImgRoot.aws}/textures/purple-texture.png`)

    const pinkTexture = getLfmTexture(TestimonialTexutreEnum.Pink)
    expect(pinkTexture.class).toBe('orange-texture')
    expect(pinkTexture.image.src).toBe(`${lfmImgRoot.aws}/textures/pink-texture.png`)
  })

  it('shuffleArray(): Should shuffle', () => {
    const startArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    const endArray = shuffleArray(startArray)

    expect(isEqual(startArray, endArray)).toEqual(false)
  })

  // REMIX TEST ACTION EXAMPLE
  it('lfmMiniCourseSignUpAction: Action should return status error', async () => {
    let body = new URLSearchParams({
      name: "Sergio",
    });

    let request = new Request("/path", {
      method: "POST",
      body,
    });

    const response = await lfmMiniCourseSignUpAction(request);
    expect(response.status).toBe('error');

  })

  it('lfmMiniCourseSignUpAction: Action should return status 200', async () => {
    let formData = new FormData()
    formData.append('email', 'spencer.bigum@gmail.com')
    formData.append('_action', 'test')

    let request = new Request("/path", {
      method: "POST",
      body: formData,
    });

    const response = await lfmMiniCourseSignUpAction(request);
    expect(response.status).toBe(200);

  })
})