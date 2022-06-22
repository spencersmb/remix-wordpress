import type { MutableRefObject } from 'react';
import React from 'react'

interface Props {
  formRef: MutableRefObject<HTMLFormElement | null>
  handleOnSearch: (e: React.ChangeEvent<HTMLInputElement>) => void
  query: string | null
  results: SearchResult[]
  category: string | null
  animationCompleted: boolean
}

function SearchForm(props: Props) {
  const { formRef, query, results, category, animationCompleted, handleOnSearch } = props

  return (
    <form
      ref={formRef}
      data-search-is-active={!!query}
    >
      <fieldset className="flex flex-col">
        <div className="flex flex-row items-baseline justify-between mt-2">
          <label className="text-xl font-semibold text-grey-800 laptop:text-2xl" htmlFor="Search">Search</label>

          {results.length > 0 && query && query.length > 0 && (
            <div className="text-base text-grey-500">
              Found <span className='font-semibold underline text-grey-800 underline-offset-4'>{results.length}</span> Results {category ? <span>in <span className='font-semibold underline text-grey-800 underline-offset-4'>{category}</span> skill level</span> : ''}
            </div>
          )}

        </div>
        <div className="relative mt-4">
          <input
            className="w-full px-4 py-3 text-base duration-200 ease-in-out transform outline-none bg-grey-100 rounded-2xl text-primary-700 hover:ring focus:ring ring-offset-0 focus:ring-sage-500 focus:bg-transparent autofill:bg-warning-100 tablet:px-5 tablet:py-4"
            type="search"
            name="Search"
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
