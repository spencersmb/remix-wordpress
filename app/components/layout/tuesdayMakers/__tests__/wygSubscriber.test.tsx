import { BreakpointEnums } from "@App/enums/breakpointEnums"
import type { ISiteContextState } from "@App/hooks/useSite";
import { siteInitialState } from "@App/hooks/useSite"
import { renderUseSiteProviderUi } from "@TestUtils/providerUtils"
import WygSubscriber from "../wygSubscriber"

describe('What you get as a subscriber', () => {
  const setup = ({ providerProps }: { providerProps: ISiteContextState }) => {
    return renderUseSiteProviderUi(<WygSubscriber />, {
      providerProps
    })
  }
  it('Should show collage 1 img', () => {
    const { getByAltText } = setup({
      providerProps: {
        ...siteInitialState,
        breakpoint: BreakpointEnums.desktop
      }
    })

    expect(getByAltText('Every Tuesday Photo Collage Watercolors')).toBeInTheDocument()
  })

  it('Should show collage 2 img', () => {
    const { getByAltText } = setup({
      providerProps: {
        ...siteInitialState,
        breakpoint: BreakpointEnums.desktop
      }
    })

    expect(getByAltText('Every Tuesday Tuesday Makers Products')).toBeInTheDocument()
  })

  it('Should show title', () => {

    const { queryByText } = setup({
      providerProps: {
        ...siteInitialState,
      }
    })

    expect(queryByText('What you get as a subscriber')).toBeInTheDocument()

  })

  it('Should show 3 items', () => {

    const { queryAllByTestId } = setup({
      providerProps: {
        ...siteInitialState,
      }
    })

    expect(queryAllByTestId('wygSubscriberItem')).toHaveLength(5)
  })

  it('Should show no images on mobile layout', () => {
    const { queryAllByTestId } = setup({
      providerProps: {
        ...siteInitialState,
      }
    })
    expect(queryAllByTestId('imigx-container')).toHaveLength(0)
  })
})