import { useSearchResults } from "@App/hooks/useSearch/useSearchResults";
import { formatDate } from "@App/utils/posts";
import { consoleColors, consoleHelper } from "@App/utils/windowUtils";
import { Link, useTransition } from "@remix-run/react";
import Fuse from "fuse.js";
import { useCallback, useEffect, useRef, useState } from "react";

const SearchLayout = () => {
  const { query, search, results, clearSearch, closeSearch, state: { isOpen } } = useSearchResults({
    maxResults: 10,
  })
  const transition = useTransition();
  const listRef = useRef<HTMLUListElement | null>(null);
  const [focusedResult, setFocusedResult] = useState<any>(null)
  const formRef = useRef<null | HTMLFormElement>(null)

  consoleHelper('search results', results, 'searchLayout', { bg: consoleColors.orange, text: '#fff' })

  useEffect(() => {
    // When the search box opens up, additionally find the search input and focus
    // on the element so someone can start typing right away
    if (formRef.current) {
      const searchInput: HTMLInputElement = Array.from(formRef.current.elements)
        .find((input: any) => input.type === 'search') as HTMLInputElement

      searchInput.focus();
    }
    document.addEventListener('keydown', escFunction, false);
    // addResultsRoving()
    return () => {
      clearSearch()
      document.removeEventListener('keydown', escFunction, false);
      document.removeEventListener('keydown', handleResultsRoving)
    }

  }, [])

  useEffect(() => {
    if (transition.state === 'loading' && isOpen) {
      closeSearch()
    }
  }, [closeSearch, isOpen, transition])

  async function testCall() {

    const api_url = 'https://api.github.com/repos/spencersmb/remix-wordpress/actions/workflows/17209298/dispatches'
    // const api_url = 'https://api.github.com/repos/spencersmb/remix-wordpress/actions/workflows'
    const res = await fetch(api_url, {
      method: 'POST',
      headers: {
        'Authorization': 'token ',
        'Content-Type': 'application/json',
        "Accept": "application/vnd.github.v3+json"
      },
      body: JSON.stringify({
        'ref': 'main'
      }),
    })

    const json = await res.json()

    consoleHelper('json', json);

  }

  /**
  * handleOnSearch
  */
  function handleOnSearch({ currentTarget }: any) {
    search({
      query: currentTarget.value,
    });
  }


  // pressing esc while search is focused will close it
  const escFunction = useCallback((event: any) => {
    if (event.keyCode === 27) {
      clearSearch()
      closeSearch()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
  * addResultsRoving
  */
  function addResultsRoving() {
    document.body.addEventListener('keydown', handleResultsRoving);
  }

  function handleResultsRoving(e: any) {
    const focusElement: any = document.activeElement;
    console.log('e', e);
    //parentElement = form, nextSibling = div, firstChild = ul
    console.log('focusElement', focusElement.parentElement.nextSibling.firstChild.children[1]);

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      // if user is in the input we select the first element in Results
      if (focusElement.nodeName === 'INPUT') {
        focusElement.parentElement.nextSibling.firstChild.children[1].focus()
        setFocusedResult(1)
      } else {
        setFocusedResult(focusedResult + 1)
      }

    }

  }

  return (
    <div className="search-layout">
      SEARCH LAYOUT
      {/* <button onClick={testCall}>Call</button> */}
      <form
        ref={formRef}
        data-search-is-active={!!query}
      >
        <input
          type="search"
          name="q"
          value={query || ''}
          onChange={handleOnSearch}
          autoComplete="off"
          placeholder="Search..."
          required
        />
      </form>

      <div >
        {results.length > 0 && (
          <ul ref={listRef}>
            {results
              .sort((a: ISearchResult, b: ISearchResult) => Date.parse(b.date) - Date.parse(a.date))
              .map(({ slug, title, date }: ISearchResult, index) => {
                return (
                  <li key={slug} className={`${index === focusedResult ? 'text-red-500' : ''}`}>
                    <Link to={`/${slug}`} prefetch='intent'>
                      <h3>{title}</h3>
                      <p>{formatDate(date)}</p>
                    </Link>
                  </li>
                );
              })}
          </ul>
        )}
        {results.length === 0 && (
          <p>
            Sorry, not finding anything for <strong>{query}</strong>
          </p>
        )}
      </div>
    </div>
  );
}

export default SearchLayout