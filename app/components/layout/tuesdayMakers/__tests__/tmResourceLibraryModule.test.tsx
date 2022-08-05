import { renderUi } from "@TestUtils/renderUtils"
import TmResourceLibraryModule from "../tmResourceLibraryModule"

describe('Resource Library Sell module', () => {

  const setup = (props: any = {}) => {
    const setupProps = { ...props }
    return renderUi(<TmResourceLibraryModule {...setupProps} />)
  }

  it('Should have correct title', () => {
    const { getByText } = setup()
    expect(getByText('The Resource Library')).toBeInTheDocument()

  })

  it('Should have correct description', () => {
    const { queryByTestId } = setup()
    expect(queryByTestId('description')).toBeVisible()
  })

  it('Should have 3 image tallText items', () => {
    const { getAllByTestId } = setup()
    expect(getAllByTestId('textImageTall')).toHaveLength(3)
  })
})