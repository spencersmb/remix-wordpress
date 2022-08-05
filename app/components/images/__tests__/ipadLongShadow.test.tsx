import { renderUi, testNames } from "@TestUtils/renderUtils"
import IpadLongShadow from "../ipadLongShadow"

describe('Ipad LongShadow', () => {
  const iPadArt = {
    width: 1400,
    height: 1049,
    alt: `Every Tuesday IPad Art`,
    src: 'https://et-teachable.imgix.net/procreate601/class-projects.jpg?auto=format',
    placeholder: 'https://et-teachable.imgix.net/procreate601/class-projects.jpg?auto=format&w=20&fit=clip'
  }
  const setup = (props: any = {}) => {
    const setupProps = { image: iPadArt, ...props }
    return renderUi(<IpadLongShadow {...setupProps} />)
  }
  it('Should show the ipad device', () => {
    const { getByTestId } = setup()
    expect(getByTestId(`${testNames.default}iPadBlank`)).toBeInTheDocument()
  })

  it('Should show the ipad art img', () => {
    const { getByTestId } = setup()
    expect(getByTestId(`${testNames.default}iPadArt`)).toBeInTheDocument()
  })
})