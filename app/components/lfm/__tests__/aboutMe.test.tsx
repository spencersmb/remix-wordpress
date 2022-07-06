import { renderUi } from "@TestUtils/renderUtils"
import AboutMe from "../aboutMe"

describe('LFM: About Me', () => {
  const setup = () => renderUi(<AboutMe />)
  it('Should have profile image', () => {
    const { getByTestId } = setup()
    const img = getByTestId('lazy-load-image-author_image')
    expect(img).toBeInTheDocument()
    expect(img).toHaveAttribute('src', 'https://et-website.imgix.net/et-website/images/teela-profile.jpeg?w=450&fit=clip')
  })

  it('Should have correct texture images', () => {
    const { getByTestId } = setup()
    const watercolorImg = getByTestId('lazy-load-image-author_image_watercolor')
    const scribbleImg = getByTestId('lazy-load-image-scribble_image')

    expect(watercolorImg).toHaveAttribute('src', 'https://et-website.imgix.net/et-website/textures/watercolor-03.png?w=500&fit=clip')

    expect(scribbleImg).toHaveAttribute('src', 'https://et-website.imgix.net/et-website/textures/stroke-10.jpeg')
  })

  it('Should have correct title & text', () => {
    const { queryByText, getByTestId } = setup()
    const descContainer = getByTestId('aboutMe_content')
    expect(queryByText('Your Instructor')).toBeInTheDocument()
    expect(queryByText('Hey, I\'m Teela')).toBeInTheDocument()
    expect(descContainer.children).toHaveLength(3)
  })
})