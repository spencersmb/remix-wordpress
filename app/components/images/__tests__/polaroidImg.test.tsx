import { staticImages } from "@App/lib/imgix/data"
import { renderUi } from "@TestUtils/renderUtils"
import PolaroidImg from "../polaroidImg"

describe('PolaroidImg Tests', () => {
  const setup = (props: any) => {
    return renderUi(<PolaroidImg {...props} />)
  }
  it('Should render no image', () => {
    const { queryByTestId } = setup({})
    expect(queryByTestId('imigx-container')).toBeNull()
  })

  it('Should render imgix image', () => {
    const { queryByTestId } = setup({
      imgixImage: staticImages.assets.applePencil.flat,
    })
    expect(queryByTestId('imigx-container')).toBeVisible()
  })

  it('Should render correct rotation none', () => {
    const { getByTestId } = setup({
      imgixImage: staticImages.assets.applePencil.flat,
    })
    expect(getByTestId('polaroid-container').classList.contains('rotate-0')).toBe(true)
  })

  it('Should render correct rotation right', () => {
    const { getByTestId } = setup({
      imgixImage: staticImages.assets.applePencil.flat,
      rotate: 'right',
    })
    expect(getByTestId('polaroid-container').classList.contains('rotate-3')).toBe(true)
  })

  it('Should render correct rotation left', () => {
    const { getByTestId } = setup({
      imgixImage: staticImages.assets.applePencil.flat,
      rotate: 'left',
    })
    expect(getByTestId('polaroid-container').classList.contains('-rotate-3')).toBe(true)
  })

  it('Should render children', () => {
    const { queryByTestId } = setup({
      imgixImage: staticImages.assets.applePencil.flat,
      children: <div data-testid="child">Child</div>,
    })

    expect(queryByTestId('child')).toBeVisible()
  })
})