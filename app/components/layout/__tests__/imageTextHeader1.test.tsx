import { staticImages } from "@App/lib/imgix/data"
import { renderUi } from "@TestUtils/renderUtils"
import ImageTextHeader1 from "../imageTextHeader1"

describe('ImageTextHeader 1', () => {
  const setup = (props: any) => {
    return renderUi(<ImageTextHeader1 {...props} />)
  }
  it('Should render no polaroid img', () => {
    const { queryByTestId } = setup({})
    expect(queryByTestId('polaroid-container')).toBeNull()
  })

  it('Should render Tuesdays just got a little bit better', () => {
    const { queryByText } = setup({})
    expect(queryByText(/tuesdays just got a little bit better/i)).toBeTruthy()
  })

  it('Should render imgix polaroid img', () => {
    const { queryByTestId } = setup({
      imgixImage: staticImages.assets.applePencil.flat
    })
    expect(queryByTestId('polaroid-container')).toBeVisible()
  })
})