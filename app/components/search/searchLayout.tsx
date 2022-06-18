import { useSearchResults } from "@App/hooks/useSearch/useSearchResults";
import { formatDate } from "@App/utils/posts";
import { consoleColors, consoleHelper } from "@App/utils/windowUtils";
import { Link, useTransition } from "@remix-run/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import _ from 'lodash'

interface IProps {
  animationCompleted: boolean;
  containerRef: any
}
const SearchLayout = ({ animationCompleted, containerRef }: IProps) => {
  const { query, search, results, clearSearch, closeSearch, setCategory, state: { isOpen }, pagination } = useSearchResults({
    maxResults: 10,
  })

  const [showScrollToTopBtn, setShowScrollToTopBtn] = useState<boolean>(false)

  const { ref, inView, entry } = useInView({
    /* Optional options */
    threshold: 0,
  });

  const [inputRef, inputInView, inputEntry] = useInView({
    /* Optional options */
    threshold: 0,

  });
  const updatePosition = () => {
    console.log('window.pageYOffset', containerRef.current.scrollTop);

    // setScrollPosition(window.pageYOffset);
    if (containerRef.current.scrollTop > 800) {
      setShowScrollToTopBtn(true)
    } else {
      setShowScrollToTopBtn(false)
    }
  };

  // useed to close the Search when user navigates away from the page
  const transition = useTransition();
  const listRef = useRef<HTMLUListElement | null>(null);
  const formRef = useRef<null | HTMLFormElement>(null)

  consoleHelper('search results', {
    results,
    pagination
  }, 'searchLayout', { bg: consoleColors.orange, text: '#fff' })

  // ON COMPONENT FIRST LOAD
  useEffect(() => {
    // When the search box opens up, additionally find the search input and focus
    // on the element so someone can start typing right away
    document.addEventListener('keydown', escFunction, false);

    containerRef.current.addEventListener("scroll", _.throttle(updatePosition, 500));
    // addResultsRoving()
    return () => {
      clearSearch()
      document.removeEventListener('keydown', escFunction, false);
      // document.removeEventListener('keydown', handleResultsRoving)
    }

  }, [])

  // ON MODAL OPEN/LOAD, BRING INTO FOCUS AFTER THE TRANSITION ANIMATION HAS COMPLETED
  useEffect(() => {
    if (formRef.current && animationCompleted) {
      const searchInput: HTMLInputElement = Array.from(formRef.current.elements)
        .find((input: any) => input.type === 'search') as HTMLInputElement

      searchInput.focus();
    }
  }, [animationCompleted])

  // IF PAGE IS TRANSITIONING, CLOSE THE MODAL
  useEffect(() => {
    if (transition.state === 'loading' && isOpen) {
      closeSearch()
    }
  }, [closeSearch, isOpen, transition])

  // When user scrolls to the bottom of the page, load more results
  useEffect(() => {

    if (results.length && pagination.hasNextPage && inView && !pagination.loading) {
      pagination.nextPage()
    }

  }, [inView, results, pagination])

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
    // document.body.addEventListener('keydown', handleResultsRoving);
  }

  const handleSetCategory = (cat: string) => () => {
    setCategory(cat)
  }

  // function handleResultsRoving(e: any) {
  //   const focusElement: any = document.activeElement;
  //   console.log('e', e);
  //   //parentElement = form, nextSibling = div, firstChild = ul
  //   console.log('focusElement', focusElement.parentElement.nextSibling.firstChild.children[1]);

  //   if (e.key === 'ArrowDown') {
  //     e.preventDefault();
  //     // if user is in the input we select the first element in Results
  //     if (focusElement.nodeName === 'INPUT') {
  //       focusElement.parentElement.nextSibling.firstChild.children[1].focus()
  //       setFocusedResult(1)
  //     } else {
  //       setFocusedResult(focusedResult + 1)
  //     }

  //   }

  // }

  const goToTop = () => {
    if (containerRef.current) {
      console.log('containerRef.current', containerRef.current.clientTop);
      console.log('containerRef.current', containerRef.current.scrollTop);

      // formRef.current.scrollIntoView({ behavior: "smooth" });
      containerRef.current.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    }

  };

  return (
    <div className="search-layout relaitve" >
      SEARCH LAYOUT
      {/* <button onClick={testCall}>Call</button> */}
      {!inputInView && isOpen && showScrollToTopBtn && <button
        onClick={goToTop}
        className="fixed text-white bottom-6 right-6 w-14 h-14 bg-slate-600">Scroll to Top</button>}


      {/* SEARCH INPUT */}
      <form
        ref={formRef}
        data-search-is-active={!!query}
      >
        <input
          ref={inputRef}
          type="search"
          name="q"
          value={query || ''}
          onChange={handleOnSearch}
          autoComplete="off"
          placeholder="Search..."
          data-focused={animationCompleted}
          required
        />
      </form>

      {/* FILTER CATEGORIES */}
      <div>
        <button onClick={handleSetCategory('Beginner')}>Beginner</button>
        <button onClick={handleSetCategory('Intermediate')}>Intermediate</button>
        <button onClick={handleSetCategory('Advanced')}>Intermediate</button>
      </div>

      {/* RESULTS */}
      <div>

        {results.length > 0 && query && query.length > 0 && (
          <>
            <div>{results.length} Results</div>
            <ul ref={listRef}>
              {pagination.pagedResults
                // Sort by date or score?
                // .sort((a: ISearchResult, b: ISearchResult) => Date.parse(b.date) - Date.parse(a.date))
                .map(({ slug, title, date }: ISearchResult, index) => {
                  return (
                    <li key={slug}
                      className='py-10 text-lg'
                    >
                      <Link to={`/${slug}`} prefetch='intent'>
                        <h3>{title}</h3>
                        <p>{formatDate(date)}</p>
                      </Link>
                    </li>
                  );
                })}
            </ul>
          </>
        )}
        {results.length === 0 && query && query.length > 0 && (
          <p>
            Sorry, not finding anything for <strong>{query}</strong>
          </p>
        )}
      </div>
      {/* <div>
        {pagination.hasNextPage && <button onClick={pagination.nextPage}>NextPage results</button>}
      </div> */}
      {results.length > 0 && !pagination.loading && <div ref={ref} className="h-0 opacity-0">
        LOAD MORE POSTS</div>}
    </div>
  );
}

export default SearchLayout