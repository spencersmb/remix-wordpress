import { useSearchResults } from "@App/hooks/useSearch/useSearchResults";
import { formatDate } from "@App/utils/posts";
import { consoleColors, consoleHelper } from "@App/utils/windowUtils";
import { Link, useTransition } from "@remix-run/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import _ from 'lodash'
import PillSmall from "../pills/pillSmall";
import CloseSvg from "../svgs/closeSvg";
import { AnimatePresence, motion } from "framer-motion";
import type { LazyComponentProps, ScrollPosition } from "react-lazy-load-image-component";
import { trackWindowScroll } from "react-lazy-load-image-component";
import SmallPostCard from "../cards/smallPostCard";

interface Props {
  animationCompleted: boolean;
  containerRef: any
}
type IProps = LazyComponentProps & Props
const SearchLayout = ({ animationCompleted, containerRef, scrollPosition }: IProps) => {
  const { query, search, results, clearSearch, closeSearch, category, setCategory, state: { isOpen }, pagination } = useSearchResults({
    maxResults: 10,
  })

  const [showScrollToTopBtn, setShowScrollToTopBtn] = useState<boolean>(false)

  // used to simulate Infinite Scroll
  const [postFooterRef, postFooterRefInView] = useInView({
    /* Optional options */
    threshold: 0,
  });

  // Used to track if its in the viewport for help with infinite scroll
  const [inputRef, inputInView] = useInView({
    /* Optional options */
    threshold: 0,
  });

  // useed to close the Search when user navigates away from the page
  const transition = useTransition();
  const listRef = useRef<HTMLDivElement | null>(null);
  const formRef = useRef<null | HTMLFormElement>(null)

  consoleHelper('search results', {
    results,
    pagination
  }, 'searchLayout', { bg: consoleColors.orange, text: '#fff' })

  // ON COMPONENT FIRST LOAD
  useEffect(() => {
    let container = containerRef.current
    // When the search box opens up, additionally find the search input and focus
    // on the element so someone can start typing right away
    document.addEventListener('keydown', escFunction, false);

    // Tack scroll position of the modal container to hide or show the scroll to top button
    container.addEventListener("scroll", _.throttle(updatePosition, 500));


    // addResultsRoving()
    return () => {
      clearSearch()
      document.removeEventListener('keydown', escFunction, false);
      if (container) {
        container.removeEventListener("scroll", updatePosition, false);
      }
      // document.removeEventListener('keydown', handleResultsRoving)
    }

  }, [])

  // ON MODAL OPEN/LOAD, BRING INPUT INTO FOCUS AFTER THE WIDTH TRANSITION ANIMATION HAS COMPLETED
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

    if (results.length && pagination.hasNextPage && postFooterRefInView && !pagination.loading) {
      pagination.nextPage()
    }

  }, [postFooterRefInView, results, pagination])

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
  * updatePosition
  * Tracks scroll position and set scrollToTop inView if it reaches the threshold
  */
  const updatePosition = () => {
    if (containerRef.current.scrollTop > 800) {
      setShowScrollToTopBtn(true)
    } else {
      setShowScrollToTopBtn(false)
    }
  };

  /**
  * handleOnSearch
  */
  function handleOnSearch({ currentTarget }: any) {
    if (currentTarget.value === '') {
      clearSearch()
    } else {
      search({
        query: currentTarget.value,
      });
    }

  }

  /**
  * escFunction
  * pressing esc while search is focused will close it
  */
  const escFunction = useCallback((event: any) => {
    if (event.keyCode === 27) {
      clearSearch()
      closeSearch()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  const handleSetCategory = (cat: string) => () => {
    console.log('set');

    setCategory(cat)
  }

  /**
  * goToTop
  * smooth scroll to the top of the page
  */
  const goToTop = () => {
    if (containerRef.current) {
      // formRef.current.scrollIntoView({ behavior: "smooth" });
      containerRef.current.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    }

  };

  const closeCategory = () => {
    console.log('close');

    setCategory(null)
  }

  return (
    <div className='grid grid-flow-row row-auto search-layout relaitve grid-cols-mobile gap-x-5 tablet:grid-cols-tablet tablet:gap-x-5 desktop:grid-cols-desktop'>
      {/* <button onClick={testCall}>Call</button> */}

      <div className="col-span-full border-b-[1px] grid grid-flow-row row-auto grid-cols-mobile gap-x-5 tablet:grid-cols-tablet tablet:gap-x-5 desktop:grid-cols-desktop pb-8">
        {/* SEARCH FORM */}
        <div className="col-span-2 col-start-2 mt-2">
          <form
            ref={formRef}
            data-search-is-active={!!query}
          >
            <fieldset className="flex flex-col">
              <label className="mt-2 text-xl font-semibold text-grey-800" htmlFor="Search">Search</label>
              <div className="relative mt-4">
                <input
                  className="w-full px-4 py-3 text-base duration-200 ease-in-out transform outline-none bg-grey-100 rounded-2xl text-primary-700 hover:ring focus:ring ring-offset-0 focus:ring-sage-500 focus:bg-transparent autofill:bg-warning-100 tablet:px-5 tablet:py-4"
                  ref={inputRef}
                  type="search"
                  name="Search"
                  value={query || ''}
                  onChange={handleOnSearch}
                  autoComplete="off"
                  placeholder="Watercolor, gouache, lettering......"
                  data-focused={animationCompleted}
                  required
                />
                {/* <span className="absolute top-[50%] translate-y-[-50%] left-[10px]">
                  <PillSmall
                    className="bg-success-100 text-grey-600"
                    clickHandler={handleSetCategory('Beginner')}
                    text={'Beginner'}
                    selected={category === 'Beginner' || category === null}
                  />
                </span> */}
              </div>
            </fieldset>
          </form>
        </div>

        {/* FILTER CATEGORIES */}
        {/* @ts-ignore */}
        <AnimatePresence>
          {query && query.length > 0 &&
            <motion.div
              initial={searchFilterMotion.closed}
              animate={searchFilterMotion.open}
              exit={searchFilterMotion.closed}
              key='searchFilter'
              className="flex flex-col col-span-2 col-start-2 overflow-hidden">
              <div className="flex flex-row flex-wrap justify-between pt-8 pb-4">
                <div className="text-sm font-semibold text-grey-400 h-[24px]">FILTER BY SKILL LEVEL</div>
                {category !== null &&
                  <div onClick={closeCategory} className="flex flex-row items-center">
                    <div className="">Clear</div>
                    <div className="w-full max-w-[20px] ml-1">
                      <CloseSvg stroke="#384050" strokeWidth={3} />
                    </div>
                  </div>}
              </div>
              <div className="flex flex-row ">
                <PillSmall
                  className="bg-success-100 text-grey-600"
                  clickHandler={handleSetCategory('Beginner')}
                  text={'Beginner'}
                  selected={category === 'Beginner' || category === null}
                />
                <PillSmall
                  className="bg-success-100 text-grey-600"
                  clickHandler={handleSetCategory('Intermediate')}
                  text={'Intermediate'}
                  selected={category === 'Intermediate' || category === null}
                />
                <PillSmall
                  className="bg-success-100 text-grey-600"
                  clickHandler={handleSetCategory('Advanced')}
                  text={'Advanced'}
                  selected={category === 'Advanced' || category === null}
                />
              </div>
            </motion.div>
          }
        </AnimatePresence>


      </div>


      {/* RESULTS */}
      <div className="col-span-2 col-start-2 mt-2 mb-8">
        {results.length > 0 && query && query.length > 0 && (
          <>
            <div>Found <span className='font-semibold'>{results.length}</span> Results {category ? <span>within <span className='font-semibold'>{category}</span> skill level</span> : ''}</div>
            <div ref={listRef}>
              {pagination.pagedResults
                // Sort by date or score?
                // .sort((a: ISearchResult, b: ISearchResult) => Date.parse(b.date) - Date.parse(a.date))
                .map((result: ISearchResult, index) => {
                  return (
                    <SmallPostCard key={result.slug} post={result} scrollPosition={scrollPosition} />
                  );
                })}
            </div>
          </>
        )}
        {results.length === 0 && query && query.length > 0 && (
          <p>
            Sorry, not finding anything for <strong>{query}</strong>
          </p>
        )}
      </div>

      {!inputInView && isOpen && showScrollToTopBtn && <button
        onClick={goToTop}
        className="fixed text-white bottom-6 right-6 w-14 h-14 bg-slate-600">Scroll to Top</button>}

      {/* INFINITE SCROLL TRACKER */}
      {results.length > 0 && !pagination.loading &&
        <div className="col-span-2 col-start-2 mt-2 mb-8">
          <div ref={postFooterRef} className="">
            LOAD MORE POSTS</div>
        </div>
      }
    </div>
  );
}

export default trackWindowScroll(SearchLayout)

const searchFilterMotion = {
  closed: {
    // x: '100%',
    height: '0%',
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 30,
      duration: .1
    }
  },
  open: {
    height: 'auto',
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 30,
      duration: .2
    }
  }
}
