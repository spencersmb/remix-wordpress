import { BreakpointEnums } from "@App/enums/breakpointEnums"
import { siteInitialState } from "@App/hooks/useSite"
import { fireEvent, getByText } from "@testing-library/react"
import { renderUseSiteProviderUi } from "@TestUtils/providerUtils"
import CmGrid from "../cmGrid"

describe('LFM: Font Grid', () => {

  const defaultProps: CmGridItem[] = [
    {
      alt: "Test 1",
      img: "https://www.example.com/test1.png",
      link: "https://www.example.com/test1",
    },
    {
      alt: "Test 2",
      img: "https://www.example.com/test2.png",
      link: "https://www.example.com/test2",
    }
  ]
  it('Have correct header and subhead text', () => {
    const { getByText } = renderUseSiteProviderUi(
      <CmGrid gridItems={defaultProps} />,
      {
        providerProps: siteInitialState
      }
    )

    expect(getByText('Over 2,000 students have enrolled in Learn Font Making!')).toBeInTheDocument()

    expect(getByText('Here are some of their fonts after taking the full course:')).toBeInTheDocument()

  })

  it('Should have 2 bg images with desktop breakpoing', () => {

    const { queryByTestId } = renderUseSiteProviderUi(
      <CmGrid gridItems={defaultProps} />,
      {
        providerProps: {
          ...siteInitialState,
          breakpoint: BreakpointEnums.desktop
        }
      }
    )
    const image1 = queryByTestId('lazy-load-image-cmGrid-hearts')
    const image2 = queryByTestId('lazy-load-image-cmGrid-alphabet')
    expect(image1).toBeInTheDocument()
    expect(image2).toBeInTheDocument()

  })

  it('Should have correct amount of grid items', () => {
    const { getByTestId } = renderUseSiteProviderUi(
      <CmGrid gridItems={defaultProps} />,
      {
        providerProps: {
          ...siteInitialState,
          breakpoint: BreakpointEnums.desktop
        }
      }
    )
    const items = getByTestId('cmGrid-items')
    expect(items.children).toHaveLength(2)
  })

  it('Should have View More button and switch text when clicked', () => {
    const { getByText } = renderUseSiteProviderUi(
      <CmGrid gridItems={defaultProps} />,
      {
        providerProps: {
          ...siteInitialState,
          breakpoint: BreakpointEnums.desktop
        }
      }
    )
    const button = getByText('View More!')
    expect(button).toBeInTheDocument()

    fireEvent.click(button)
    expect(button).toHaveTextContent('Close')
  })
})