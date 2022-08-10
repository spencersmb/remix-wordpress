import { createImgixSizes } from "@App/utils/imageHelpers"
import { renderUi, testNames } from "@TestUtils/renderUtils"
import IpadLongShadow from "../ipadLongShadow"

describe('Ipad LongShadow', () => {
  const iPadArt = createImgixSizes({
    width: 1400,
    height: 1049,
    alt: `Every Tuesday IPad Art`,
    src: 'https://et-teachable.imgix.net/procreate601/class-projects.jpg',
    mobileSize: 400,
  })
  const setup = (props: any = {}) => {

    const setupProps = { imigixArt: iPadArt, ...props }
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