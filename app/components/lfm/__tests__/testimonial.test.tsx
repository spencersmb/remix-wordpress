import { staticImages } from "@App/lib/imgix/data"
import { lfmTestimonialData } from "@App/lib/lfm/testimonials/lfmTestimonialData"
import { lfmImgRoot } from "@App/utils/lfmUtils"
import { renderUi } from "@TestUtils/renderUtils"
import Testimonial from "../testimonial"

describe('LFM: Testimonial', () => {
  const defaultProps: {
    testimonial: ITestimonial
    direction?: 'left' | 'right' | 'full'
    fontLoadingStatus: string
  } = {
    fontLoadingStatus: 'idle',
    testimonial: lfmTestimonialData.beckM
  }
  const setup = (props: any) => renderUi(
    <Testimonial {...props} />
  )

  it('should have correct BG color', () => {
    const { getByTestId } = setup(defaultProps)
    const bg = getByTestId('lfm-testimonial-bg')
    expect(bg).toHaveStyle('background-color: rgb(245, 247, 255)')
  })
  it('Should have profile pic', () => {
    const { getByTestId } = setup(defaultProps)
    const profilePic = getByTestId('lazy-load-image-@beckmccormick')
    expect(profilePic).toHaveAttribute('src', defaultProps.testimonial.profileImg)
  })

  it('Should have user name + instagramHandle', () => {
    const { queryByText } = setup(defaultProps)
    const name = `${defaultProps.testimonial.name.first} ${defaultProps.testimonial.name.last}`
    const userName = queryByText(name)
    const handle = queryByText(defaultProps.testimonial.instagramHandle)

    expect(userName).toBeInTheDocument()
    expect(handle).toBeInTheDocument()
  })

  it('Should have correct blockQuote + quote', async () => {
    const { queryByTestId } = setup(defaultProps)

    const blockQuote = queryByTestId('lfm-testimonial-blockquote')
    const quote = queryByTestId('lfm-testimonial-quote')

    expect(blockQuote?.innerHTML.length).toBeGreaterThan(0)
    expect(quote?.innerHTML.length).toBeGreaterThan(0)
  })

  it('Should not show miss magnolia element', () => {
    const { queryByTestId } = setup(defaultProps)
    const fontCreater = queryByTestId('lfm-testimonial-font-creator')

    expect(fontCreater).toBeNull()
  })

  it('Should show miss magnolia element with correct name', () => {
    const { queryByTestId } = setup({
      fontLoadingStatus: 'completed',
      testimonial: lfmTestimonialData.beckM
    })
    const fontCreater = queryByTestId('lfm-testimonial-font-creator')
    expect(fontCreater).toBeInTheDocument()
    expect(fontCreater).toHaveTextContent('Beck\'s Font')

  })

  it('Should correct font link', () => {
    const { getByTestId } = setup(defaultProps)
    const link = getByTestId(`lfm-testimonial-font-link`)
    expect(link).toHaveAttribute('href', lfmTestimonialData.beckM.fontLink)
  })

  it('Should have correct font image', () => {
    const { getByTestId } = setup(defaultProps)
    const img = getByTestId(`lazy-load-image-${lfmTestimonialData.beckM.instagramHandle}-font`)
    expect(img).toHaveAttribute('src', lfmTestimonialData.beckM.img.retina)
  })

  it('Should correct font bg texture', () => {
    const { getByTestId } = setup(defaultProps)
    const img = getByTestId(`lazy-load-image-${lfmTestimonialData.beckM.name.first}-texture`)
    expect(img).toHaveAttribute('src', `${lfmImgRoot.aws}/textures/red-texture.png`)
  })

  it('Should correct font scribble texture', () => {
    const { getByTestId } = setup(defaultProps)
    const img = getByTestId(`lazy-load-image-${lfmTestimonialData.beckM.name.first}-scribble`)
    expect(img).toHaveAttribute('src', staticImages.scribbles.stroke_2.src)
  })

  it('should have direction center with full width bg', () => {
    const { queryByTestId } = setup({
      direction: 'full',
      testimonial: lfmTestimonialData.beckM
    })
    const bg = queryByTestId('lfm-testimonial-bg')
    expect(bg).not.toHaveClass('laptop:col-start-1')
    expect(bg).not.toHaveClass('laptop:col-start-4')
  })

  it('should have direction right with correct css', () => {
    const { queryByTestId } = setup({
      direction: 'right',
      testimonial: lfmTestimonialData.beckM
    })
    const bg = queryByTestId('lfm-testimonial-bg')

    // bg new classes
    expect(bg).toHaveClass('laptop:col-start-4 laptop:col-end-[-1]')

    // img container new classes
    const img = queryByTestId('lfm-testimonial-imgContainer')
    expect(img).toHaveClass('laptop:col-start-2 laptop:col-span-6')

    // profile container new classes
    const profile = queryByTestId('lfm-testimonial-profileContainer')
    expect(profile).toHaveClass('laptop:col-start-8 laptop:col-span-6 desktop:col-start-8 desktop:col-span-5')
  })
})