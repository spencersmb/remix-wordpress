import { fireEvent, screen } from "@testing-library/react";
import { mockTutorailManager__default } from "@TestUtils/mock-data/posts";
import { renderUi } from "@TestUtils/renderUtils"
import { useRef } from "react"
import SearchForm from "../search/searchForm"

describe('Search Form', () => {
  const handleOnSearch = jest.fn();
  handleOnSearch.mockImplementation(({ currentTarget }: any) => { return currentTarget.value })
  const defaultProps = {
    handleOnSearch,
    query: null,
    results: [],
    category: null,
    animationCompleted: false
  }

  it('It should have input with correct placeholder text and not show results count', () => {
    const { getByLabelText, queryByTestId } = renderUi(<SearchForm {...defaultProps} />)
    const input = getByLabelText(/Search/i)
    const focused = input.getAttribute('data-focused')
    expect(queryByTestId('search-count')).toBeNull()
    expect(input).toHaveProperty('placeholder', 'Watercolor, gouache, lettering......')
    expect(focused).toEqual('false')
  })

  it('It should have input with focus and call handleOnSearch', () => {
    const { getByLabelText } = renderUi(<SearchForm {
      ...{
        ...defaultProps,
        animationCompleted: true
      }
    } />)
    const input = getByLabelText(/Search/i)
    const focused = input.getAttribute('data-focused')
    expect(focused).toEqual('true')

    fireEvent.change(input, { target: { value: 'test' } })

    expect(handleOnSearch).toHaveBeenCalled()
  })

  it('It should show results with correct text and input have correct value', () => {
    const { getByTestId } = renderUi(<SearchForm {
      ...{
        ...defaultProps,
        animationCompleted: true,
        results: [
          {
            refIndex: 1,
            score: .5,
            item: {
              title: 'test',
              categories: [],
              date: '',
              featuredImage: null,
              slug: 'test',
              tutorialManager: {
                ...mockTutorailManager__default
              }
            },
            matches: {
              indicies: [0, 1],
              key: 'title',
              value: 'test'
            }
          }
        ],
        query: 'test',
        category: 'Beginner'
      }
    } />)
    const container = getByTestId('search-count')
    expect(container).toHaveTextContent('Found 1 result in Beginner skill level')



  })
})