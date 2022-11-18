import { TestimonialTexutreEnum } from "@App/enums/lfm"
import { isEqual } from "lodash"
import { getLfmTexture, lfmImgRoot, miniCourseVideoData, shuffleArray } from "../lfmUtils"

describe('LFM: utils', () => {

  beforeEach(() => {
    jest.spyOn(console, 'error')
    // @ts-ignore jest.spyOn adds this functionallity
    console.error.mockImplementation(() => null);
  });

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
    expect(textureFound.image.image.src).toBe(`${lfmImgRoot.aws}/textures/watercolor-03.png?auto=format&w=500&fit=clip`)
  })

  it('getLfmTexture(): Should return color textures', () => {
    const redTexture = getLfmTexture(TestimonialTexutreEnum.Red)
    expect(redTexture.class).toBe('red-texture')
    expect(redTexture.image.image.src).toBe(`${lfmImgRoot.aws}/textures/red-texture.png?auto=format&w=500&fit=clip`)

    const blueTexture = getLfmTexture(TestimonialTexutreEnum.Blue)
    expect(blueTexture.class).toBe('red-texture')
    expect(blueTexture.image.image.src).toBe(`${lfmImgRoot.aws}/textures/blue-texture.png?auto=format&w=500&fit=clip`)

    const orangeTexture = getLfmTexture(TestimonialTexutreEnum.Orange)
    expect(orangeTexture.class).toBe('orange-texture')
    expect(orangeTexture.image.image.src).toBe(`${lfmImgRoot.aws}/textures/orange-texture.png?auto=format&w=500&fit=clip`)

    const purpleTexture = getLfmTexture(TestimonialTexutreEnum.Purple)
    expect(purpleTexture.class).toBe('red-texture')
    expect(purpleTexture.image.image.src).toBe(`${lfmImgRoot.aws}/textures/purple-texture.png?auto=format&w=500&fit=clip`)

    const pinkTexture = getLfmTexture(TestimonialTexutreEnum.Pink)
    expect(pinkTexture.class).toBe('orange-texture')
    expect(pinkTexture.image.image.src).toBe(`${lfmImgRoot.aws}/textures/pink-texture.png?auto=format&w=500&fit=clip`)
  })

  it('shuffleArray(): Should shuffle', () => {
    const startArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    const endArray = shuffleArray(startArray)

    expect(isEqual(startArray, endArray)).toEqual(false)
  })

})