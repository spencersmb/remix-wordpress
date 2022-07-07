import { renderUi } from "@TestUtils/renderUtils"
import MiniCourse40k from "../miniCourse40k"

describe('LFM: 40k Intro', () => {
  const setup = (status: string = 'idle') =>
    renderUi(<MiniCourse40k fontLoadingState={status} />)
  it('should have 3 images', () => {
    const { getByTestId } = setup()
    const images = getByTestId('lfm-40k-images')
    expect(images.children.length).toBe(3)
  })

  it('Should have correct title', () => {
    const { getByTestId } = setup()
    const title = getByTestId('lfm-40k-title')
    expect(title.textContent).toBe('In my first year creating and selling hand lettered fonts, I made $40,000')
  })

})