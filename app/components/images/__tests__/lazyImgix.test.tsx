import { staticImages } from "@App/lib/imgix/data"
import { renderUi } from "@TestUtils/renderUtils"
import LazyImgix from "../lazyImgix"

describe('Lazy Imgix Tests', () => {
  const defaultImage = {
    id: '1',
    image: staticImages.assets.applePencil.flat,
  }
  const setup = (props: any) => {
    return renderUi(<LazyImgix {...props} />)
  }
  it('Should have correct padding bottom', () => {
    const { getByTestId } = setup(defaultImage)
    const imagePadding = staticImages.assets.applePencil.flat.height / staticImages.assets.applePencil.flat.width
    expect(getByTestId('imigx-padding-bot').style.paddingBottom).toBe(`${imagePadding * 100}%`)
  })

  it('Should have opacity styles', () => {
    const { getByTestId } = setup({
      ...defaultImage,
      blur: false,
    })
    expect(getByTestId('imigx-container').classList.contains('opacity-0')).toBe(true)
  })
})