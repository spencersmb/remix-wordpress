import { siteInitialState } from "@App/hooks/useSite"
import UseSiteProvider from "@App/hooks/useSite/useSiteProvider"
import { fireEvent, render, screen } from "@testing-library/react"
import { mockPostDataComplete } from "@TestUtils/mock-data/posts"
import CardDownload from "../cardDownload"

interface Props {
  title: string
  buttonText: string
  freebie: IResourceFreebie
  featuredImage: IFeaturedImage | null
}
describe('Card Download Component', () => {
  const defaultProps = {
    title: 'My Title',
    buttonText: 'Download',
    freebie: {
      downloadLink: 'https://google.com',
      excerpt: 'excerpt',
      licenseRequired: false,
      product: null
    },
    featuredImage: null
  }
  const setup = (props: any) => {
    render(
      <UseSiteProvider defaultState={siteInitialState}>
        <CardDownload {...props} />
      </UseSiteProvider>
    )

  }
  it('Should display fallback image', () => {
    setup(defaultProps)
    expect(document.querySelector('[data-testid="download-image"]')).toHaveProperty('alt', 'Every Tuesday Fallback Featured Image')
  })

  it('Should display Main Image', () => {
    setup({
      ...defaultProps,
      featuredImage: mockPostDataComplete.featuredImage
    })
    const image = screen.getByTestId('download-image')
    expect(image).toHaveProperty('alt', mockPostDataComplete.featuredImage?.altText)
  })

  it('Should display title', () => {
    setup(defaultProps)
    expect(screen.getByText('My Title')).toBeInTheDocument()
  })

  it('Should have 2 buttons: one mobile, one desktop', () => {
    setup(defaultProps)
    const buttons = screen.getAllByTestId('download-btn')
    expect(buttons).toHaveLength(2)
    expect(buttons[0].parentElement).toHaveClass('desktop:hidden')
    expect(buttons[1].parentElement).toHaveClass('hidden desktop:flex')
  })

  // This happens because a modal pops up first that I don't 
  // have a way to test that exact behavior.
  it('Should not pop up window to download', () => {
    window.open = jest.fn()
    setup({
      ...defaultProps,
      freebie: {
        ...defaultProps.freebie,
        licenseRequired: true
      }
    })
    const button = screen.getAllByTestId('download-btn')[0]
    fireEvent.click(button)
    expect(window.open).not.toHaveBeenCalled()
  })

  it('Should pop up window to download', () => {
    window.open = jest.fn()
    setup({
      ...defaultProps,
    })
    const buttons = screen.getAllByTestId('download-btn')
    const button = buttons[0]
    const button2 = buttons[1]
    fireEvent.click(button)
    expect(window.open).toHaveBeenCalledWith(defaultProps.freebie.downloadLink)
    fireEvent.click(button2)
    expect(window.open).toBeCalledTimes(2)
  })

})