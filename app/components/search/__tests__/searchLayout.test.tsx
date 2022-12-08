import { SEARCH_STATE_ENUMS } from "@App/enums/searchEnums"
import type { ISearchContextState } from "@App/hooks/useSearch"
import { fireEvent, queryByTestId, screen, waitFor } from "@testing-library/react"
import { mockSearchData } from "@TestUtils/mock-data/posts"
import { renderUseSearchProviderUi } from "@TestUtils/providerUtils"
import { MemoryRouter } from "react-router"
import SearchLayout from "../searchLayout"

describe('SearchLayout', () => {
  const defaultProps: ISearchContextState = {
    client: null,
    data: {
      generated: 2,
      posts: [],
    },
    isOpen: true,
    status: SEARCH_STATE_ENUMS.LOADED
  }

  const defaultSearchProps = {
    animationCompleted: true,
    containerRef: {
      current: null
    },
  }

  beforeEach(() => {
    // IntersectionObserver isn't available in test environment
    const mockIntersectionObserver = jest.fn();
    mockIntersectionObserver.mockReturnValue({
      observe: () => null,
      unobserve: () => null,
      disconnect: () => null,
    });
    window.IntersectionObserver = mockIntersectionObserver;
    window.IntersectionObserverEntry = {
      prototype: {
        // @ts-ignore
        isIntersecting: () => null,
      },
    };

    jest.spyOn(Date.prototype, 'getDay').mockReturnValue(2);
    jest.spyOn(Date.prototype, 'getMonth').mockReturnValue(11);
    jest.spyOn(Date.prototype, 'getDate').mockReturnValue(30);
    jest.spyOn(Date.prototype, 'getFullYear').mockReturnValue(2021);
    jest.spyOn(Date.prototype, 'toISOString').mockReturnValue('2000-01-01T00:00:00.000Z');
  });

  afterEach(() => {
    jest.restoreAllMocks()
  });

  it('It should not show filters', () => {
    const { queryByText } = renderUseSearchProviderUi(
      <SearchLayout {...defaultSearchProps} />, {
      providerProps: {
        ...defaultProps
      }
    }
    )
    expect(queryByText(/Filter by Skill level/i)).toBeNull()


  })

  it('It should show filters', () => {
    const { queryByText, getByLabelText } = renderUseSearchProviderUi(
      <SearchLayout {...defaultSearchProps} />, {
      providerProps: {
        ...defaultProps,
      }
    }
    )
    const input = getByLabelText(/Search/i)
    fireEvent.change(input, { target: { value: 'test' } })
    expect(queryByText(/Filter by Skill level/i)).toBeVisible()
  })

  it('It should show no results message', () => {
    const { queryByText, getByLabelText } = renderUseSearchProviderUi(
      <SearchLayout {...defaultSearchProps} />, {
      providerProps: {
        ...defaultProps,

      }
    }
    )
    const input = getByLabelText(/Search/i)
    fireEvent.change(input, { target: { value: 'test' } })
    expect(queryByText(/Sorry, not finding anything for/i)).toBeVisible()
  })

  it('It should show 1 Result and end of results message', async () => {


    const { getByTestId, getByLabelText, queryByText, queryByTestId } = renderUseSearchProviderUi(
      <MemoryRouter>
        <SearchLayout {...defaultSearchProps} />
      </MemoryRouter>
      , {
        providerProps: {
          ...defaultProps,
          data: {
            generated: 2,
            posts: mockSearchData
          },
        }
      }
    )
    const input = getByLabelText(/Search/i)
    fireEvent.change(input, { target: { value: 'test' } })
    waitFor(() => {
      const resultsContainer = queryByTestId('resultsList')
      const results = resultsContainer?.getElementsByClassName('renderIfVisible')
      expect(results?.length).toBe(2)
      expect(queryByText(/End of Results/i)).toBeVisible()
    })


  })
})