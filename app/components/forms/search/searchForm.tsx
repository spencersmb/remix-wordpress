import { useEffect, useRef } from 'react';
import React from 'react'
import { useInputFocusOnTrigger } from '@App/hooks/windowUtilHooks';

interface Props {
  handleOnSearch: (e: React.ChangeEvent<HTMLInputElement>) => void
  query: string | null
  results: SearchResult[]
  category: string | null
  animationCompleted: boolean
}

/**
 * @component SearchForm
 * 
 * @tested - 6/22/2022 
 *
 */
function SearchForm(props: Props) {
  const { query, results, category, animationCompleted, handleOnSearch } = props
  const inputRef = useRef<null | HTMLInputElement>(null)

  // ON MODAL OPEN/LOAD, BRING INPUT INTO FOCUS AFTER THE WIDTH TRANSITION ANIMATION HAS COMPLETED
  useInputFocusOnTrigger({
    elRef: inputRef,
    trigger: animationCompleted
  })

  return (
    <form
      data-search-is-active={!!query}
    >
      <fieldset className="flex flex-col">
        <div className="flex flex-col items-baseline justify-between mt-2 tablet:flex-row">
          <label
            aria-labelledby='search-input'
            className="text-xl font-semibold text-grey-800 laptop:text-2xl" htmlFor="search-input">Search</label>

          {results.length > 0 && query && query.length > 0 && (
            <div
              data-testid='search-count'
              className="text-base text-grey-500">
              Found <span className='font-semibold underline text-grey-800 underline-offset-4'>{results.length}</span> {results.length === 1 ? 'result' : 'results'} {category ? <span>in <span className='font-semibold underline text-grey-800 underline-offset-4'>{category}</span> skill level</span> : ''}
            </div>
          )}

        </div>
        <div className="relative mt-4">
          <input
            ref={inputRef}
            id='search-input'
            className="w-full px-4 py-3 text-base duration-200 ease-in-out transform outline-none bg-grey-100 rounded-2xl text-primary-700 hover:ring focus:ring ring-offset-0 focus:ring-sage-500 focus:bg-transparent autofill:bg-warning-100 tablet:px-5 tablet:py-4"
            type="search"
            name="search-input"
            value={query || ''}
            onChange={handleOnSearch}
            autoComplete="off"
            placeholder="Watercolor, gouache, lettering......"
            data-focused={animationCompleted}
            required
          />
        </div>
      </fieldset>
    </form>
  )
}

export default SearchForm
