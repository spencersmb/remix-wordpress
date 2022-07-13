import { siteInitialState } from "@App/hooks/useSite"
import { renderUseSiteProviderUi } from "@TestUtils/providerUtils"
import { MemoryRouter } from "react-router"
import MiniCourseNav from "../miniCourseNav"

describe('LFM: MiniCourse Nav', () => {
  it('Should have text All Lessons', () => {
    const { queryByText } = renderUseSiteProviderUi(
      <MemoryRouter>
        <MiniCourseNav />
      </MemoryRouter>
      , {
        providerProps: {
          ...siteInitialState
        }
      })
    expect(queryByText('All Lessons')).toBeInTheDocument()
  })

  it('Should have 3 video items', () => {
    const { queryByTestId } = renderUseSiteProviderUi(
      <MemoryRouter>
        <MiniCourseNav />
      </MemoryRouter>
      , {
        providerProps: {
          ...siteInitialState
        }
      })
    expect(queryByTestId('test-minicourse-navList')?.children).toHaveLength(3)
  })
})