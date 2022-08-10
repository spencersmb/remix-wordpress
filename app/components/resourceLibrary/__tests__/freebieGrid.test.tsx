import { siteInitialState } from "@App/hooks/useSite"
import { mockResourceItem } from "@TestUtils/mock-data/posts"
import { renderUseSiteProviderUi } from "@TestUtils/providerUtils"
import FreebieGrid from "../freebieGrid"

describe('Freebie Grid Component', () => {
  const defaultProps = {
    selectedFilter: 'procreate-brushes',
    categories: {
      "procreate-brushes": {
        pageInfo: {
          page: 1,
          endCursor: '1234',
          hasNextPage: false,
        },
        freebies: []
      }
    }
  }

  const setup = (props: any) => {
    const queries = renderUseSiteProviderUi(
      <FreebieGrid {...props} />
      , {
        providerProps: siteInitialState
      }
    )

    return {
      ...queries,
    }
  }
  it('Should show no freebies with text No results found', () => {
    const { queryByText } = setup(defaultProps)
    expect(queryByText('No results found')).toBeTruthy()
  })
  it('Should show one freebies result found', () => {
    const props = {
      selectedFilter: 'procreate-brushes',
      categories: {
        "procreate-brushes": {
          pageInfo: {
            page: 1,
            endCursor: '1234',
            hasNextPage: false,
          },
          freebies: [
            { ...mockResourceItem }
          ]
        }
      }
    }
    const { queryByText, queryAllByTestId } = setup(props)
    expect(queryByText('No results found')).toBeNull()
    expect(queryAllByTestId('card-small')).toHaveLength(1)
  })
})