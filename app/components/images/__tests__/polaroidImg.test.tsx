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


  it('Should have srcSet string', () => {
    const collage2Url = `https://et-website.imgix.net/et-website/images/photo-collage-2_1-min.png`
    const collage2 = {
      width: 2600,
      height: 2167,
      alt: `Every Tuesday IPad Art`,
      src: `${collage2Url}?auto=format&w=900&fit=clip`,
      placeholder: 'https://et-website.imgix.net/et-website/images/photo-collage-2_1-min.png?auto=format&w=20&fit=clip'
    }
    const { getByTestId } = setup({
      imgixImage: staticImages.assets.applePencil.flat,
      imgOptions: {
        srcSet: `${collage2.src} 400w, ${collage2Url}?auto=format&w=1400&fit=clip 900w`
      }

    })
    const srcSetAttr = getByTestId('lazy-load-image-polaroidImg').getAttribute('srcset')
    expect(srcSetAttr).toBe("https://et-website.imgix.net/et-website/images/photo-collage-2_1-min.png?auto=format&w=900&fit=clip 400w, https://et-website.imgix.net/et-website/images/photo-collage-2_1-min.png?auto=format&w=1400&fit=clip 900w")
  })

  it('Should have sizes string', () => {
    const sizes = "(max-width: 400px) 150px, 300px, (max-width: 600px) 50vw, (max-width: 900px) 33vw, 900px"
    const { getByTestId } = setup({
      imgixImage: staticImages.assets.applePencil.flat,
      imgOptions: {
        sizes,
      }
    })
    const sizesAttr = getByTestId('lazy-load-image-polaroidImg').getAttribute('sizes')
    expect(sizesAttr).toBe(sizes)
  })


})