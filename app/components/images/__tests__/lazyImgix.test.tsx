import { staticImages } from "@App/lib/imgix/data"
import { screen } from "@testing-library/react"
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
      ...defaultImage,
      srcSet: `${collage2.src} 400w, ${collage2Url}?auto=format&w=1400&fit=clip 900w`
    })
    const srcSetAttr = getByTestId('lazy-load-image-1').getAttribute('srcset')
    expect(srcSetAttr).toBe("https://et-website.imgix.net/et-website/images/photo-collage-2_1-min.png?auto=format&w=900&fit=clip 400w, https://et-website.imgix.net/et-website/images/photo-collage-2_1-min.png?auto=format&w=1400&fit=clip 900w")
  })

  it('Should have sizes string', () => {
    const collage2Url = `https://et-website.imgix.net/et-website/images/photo-collage-2_1-min.png`
    const collage2 = {
      width: 2600,
      height: 2167,
      alt: `Every Tuesday IPad Art`,
      src: `${collage2Url}?auto=format&w=900&fit=clip`,
      placeholder: 'https://et-website.imgix.net/et-website/images/photo-collage-2_1-min.png?auto=format&w=20&fit=clip'
    }
    const sizes = "(max-width: 400px) 150px, 300px, (max-width: 600px) 50vw, (max-width: 900px) 33vw, 900px"
    const { getByTestId } = setup({
      ...defaultImage,
      srcSet: `${collage2.src} 400w, ${collage2Url}?auto=format&w=1400&fit=clip 900w`,
      sizes,
    })
    const sizesAttr = getByTestId('lazy-load-image-1').getAttribute('sizes')
    expect(sizesAttr).toBe(sizes)
  })

  it('Should not be visible by default', () => {
    const collage2Url = `https://et-website.imgix.net/et-website/images/photo-collage-2_1-min.png`
    const collage2 = {
      width: 2600,
      height: 2167,
      alt: `Every Tuesday IPad Art`,
      src: `${collage2Url}?auto=format&w=900&fit=clip`,
      placeholder: 'https://et-website.imgix.net/et-website/images/photo-collage-2_1-min.png?auto=format&w=20&fit=clip'
    }
    const sizes = "(max-width: 400px) 150px, 300px, (max-width: 600px) 50vw, (max-width: 900px) 33vw, 900px"
    const { getByTestId } = setup({
      ...defaultImage,
      // visibleByDefault: true,
      srcSet: `${collage2.src} 400w, ${collage2Url}?auto=format&w=1400&fit=clip 900w`,
      sizes,
    })
    const spanEl = getByTestId('imigx-container').children[0] as HTMLSpanElement
    // does spanEl have stlye attribute background-image
    expect(spanEl.style.backgroundImage).toBe(`url(${staticImages.assets.applePencil.flat.src}?w=20&fit=clip)`)
  })

  it('Should be visible by default', () => {
    const collage2Url = `https://et-website.imgix.net/et-website/images/photo-collage-2_1-min.png`
    const collage2 = {
      width: 2600,
      height: 2167,
      alt: `Every Tuesday IPad Art`,
      src: `${collage2Url}?auto=format&w=900&fit=clip`,
      placeholder: 'https://et-website.imgix.net/et-website/images/photo-collage-2_1-min.png?auto=format&w=20&fit=clip'
    }
    const sizes = "(max-width: 400px) 150px, 300px, (max-width: 600px) 50vw, (max-width: 900px) 33vw, 900px"
    const { getByTestId } = setup({
      ...defaultImage,
      visibleByDefault: true,
      srcSet: `${collage2.src} 400w, ${collage2Url}?auto=format&w=1400&fit=clip 900w`,
      sizes,
    })
    const el = getByTestId('imigx-container').children[0] as HTMLSpanElement
    // does spanEl have stlye attribute background-image
    expect(el.tagName).toBe('IMG')
  })


})