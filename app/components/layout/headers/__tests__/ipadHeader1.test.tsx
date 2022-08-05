import { renderUi } from "@TestUtils/renderUtils"
import IpadHeader1 from "../ipadHeader1"

describe('Ipad Header1', () => {
  const setup = (props: any = {}) => {
    const setupProps = { ...props }
    return renderUi(<IpadHeader1 {...setupProps}>
      <div>Hello</div>
    </IpadHeader1>)
  }
  it('Should have Ipad image', () => {
    const { getByTestId } = setup()
    expect(getByTestId('ipadImage')).toBeInTheDocument()
  })

  it('Should have correct title', () => {
    const { queryByText } = setup()
    expect(queryByText('200+ Procreate downloads')).toBeInTheDocument()
  })

  it('Should have correct description', () => {
    const { getByTestId } = setup()
    expect(getByTestId('desc').textContent).toBe('When you’re part of Tuesday Makers, you’re the first to nab special deals on courses + products *and* you get instant access to our Resource Library, stocked with over 200 design and lettering files!')
  })

  it('Should have correct children', () => {
    const { getByText } = setup()
    expect(getByText('Hello')).toBeInTheDocument()
  })
})