import { siteInitialState } from "@App/hooks/useSite"
import { cleanup, fireEvent, screen } from "@testing-library/react"
import { renderUseSiteProviderUi } from "@TestUtils/providerUtils"
import FreebieFilter from "../freebieFilter"

describe('Freebie Filter', () => {
  const setFilter = jest.fn()
  const handleClick = jest.fn()
  const defaultProps = {
    filterTags: [
      {
        name: 'All',
        slug: 'all'
      },
      {
        name: 'Procreate',
        slug: 'procreate'
      }
    ],
    selectedFilter: { name: 'All', slug: 'all' },
    setFilter,
    handleClick
  }

  afterEach(cleanup)

  const setup = (props: any) => {
    const queries = renderUseSiteProviderUi(
      <FreebieFilter {...props} />
      , {
        providerProps: siteInitialState
      }
    )

    return {
      ...queries,
    }
  }

  it('Should have Filter by category text', () => {
    const { queryByText } = setup(defaultProps)
    expect(queryByText(/filter by category/i)).toBeTruthy()
  })

  it('Should show 2 filter tags, first one selected', () => {
    const { queryByTestId } = setup(defaultProps)
    const tags = queryByTestId('filterTags')
    expect(tags?.children.length).toBe(2)
    expect(tags?.children[0]).toHaveTextContent('All')
    expect(tags?.children[1]).toHaveTextContent('Procreate')
    expect(tags?.children[0].firstChild).toHaveClass('selected-tag')
    expect(tags?.children[1].firstChild).not.toHaveClass('selected-tag')
  })

  it('Should have <SelectDropDown/> in document for mobile view', () => {
    const { queryByTestId } = setup(defaultProps)
    expect(queryByTestId('filterClick')).toBeTruthy()
  })

  it('<SelectDropDown/> should call setFilter', () => {
    const { queryByTestId, queryByRole } = setup(defaultProps)
    const selectDropDown = queryByTestId('filterClick')
    if (selectDropDown?.firstChild) {
      fireEvent.click(selectDropDown?.firstChild)
      const listbox = queryByRole('listbox')
      if (listbox) {
        fireEvent.click(listbox.children[1])
        expect(setFilter).toHaveBeenCalled()
        expect(setFilter).toHaveBeenCalledWith({ name: 'Procreate', slug: 'procreate' })
      }

    }
  })

  it('Should call handleClick fn()', () => {
    const { queryByTestId } = setup(defaultProps)
    const tags = queryByTestId('filterTags')
    const button = tags?.children[1]
    if (button) {
      fireEvent.click(button)
      expect(handleClick).toHaveBeenCalled()
      expect(handleClick).toHaveBeenCalledWith({ name: 'Procreate', slug: 'procreate' })
    }
  })
})