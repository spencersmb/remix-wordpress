import { screen } from "@testing-library/react"
import { renderUi } from "@TestUtils/renderUtils"
import TextImageTall from "../textImageTall"
const rl1Url = 'https://et-website.imgix.net/et-website/images/tuesday-makers/tm-rl-1_1.jpg'
const rl1 = {
  width: 1600,
  height: 2030,
  alt: `Tuesday Makers Library Preview 1`,
  src: `${rl1Url}?auto=format&w=900&fit=clip`,
  placeholder: `${rl1Url}?auto=format&w=20&fit=clip`
}
const testItem = {
  id: 'tm-rl',
  title: 'Free Procreate Brushes',
  description: 'Download several lettering, illustraion and painting brushes!',
  img: {
    obj: rl1,
    url: 'https://et-website.imgix.net/et-website/images/tuesday-makers/tm-rl-1_1.jpg'
  }
}

describe('TextImageTall', () => {
  const setup = (props: any = {}) => {
    const setupProps = { ...props }
    return renderUi(<TextImageTall {...setupProps} />)
  }

  it('Should have correct index number', () => {
    const { queryByText } = setup({
      index: 0,
      ...testItem
    })
    expect(queryByText('01')).toBeInTheDocument()
  })

  it('Should have an image', () => {
    const { queryByTestId } = setup({
      index: 0,
      ...testItem
    })
    expect(queryByTestId('lazy-load-image-tm-rl-1')).toBeInTheDocument()
  })

  it('Should have an correct title', () => {
    const { queryByText } = setup({
      index: 0,
      ...testItem
    })
    expect(queryByText(testItem.title)).toBeInTheDocument()
  })

  it('Should have an correct description', () => {
    const { queryByText } = setup({
      index: 0,
      ...testItem
    })
    expect(queryByText(testItem.description)).toBeInTheDocument()
  })

})