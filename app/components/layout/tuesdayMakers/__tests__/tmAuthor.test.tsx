import { renderUi } from "@TestUtils/renderUtils"
import TmAuthor from "../tmAuthor"

describe('Tuesday Makers Author Layout', () => {
  const setup = (props: any = {}) => {
    const setupProps = { ...props }
    return renderUi(<TmAuthor {...setupProps} />)
  }
  it('Should have poloard img of Teela', () => {
    const { getByAltText } = setup()
    expect(getByAltText('Every Tuesday: Teelas profile picture')).toBeInTheDocument()
  })

  it('Should have Hey, I’m Teela! text', () => {
    const { getByText } = setup()
    expect(getByText('Hey, I’m Teela!')).toBeInTheDocument()
  })

  it('Should have sub text', () => {
    const { getByText } = setup()
    expect(getByText('Artist, Designer, and Teacher for Creatives')).toBeInTheDocument()
  })

  it('Should have desc text', () => {
    const { queryByTestId } = setup()
    expect(queryByTestId('desc')).toBeInTheDocument()
  })


})