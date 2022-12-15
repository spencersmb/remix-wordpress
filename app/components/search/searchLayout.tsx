import { useSearchResults } from "@App/hooks/useSearch/useSearchResults";
import { consoleColors, consoleHelper } from "@App/utils/windowUtils";
import { useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";
import _ from 'lodash'
import { AnimatePresence, motion } from "framer-motion";
import SmallPostCard from "../cards/smallPostCard";
import SearchFilterHeader from "./searchFilterHeader";
import BackToTopButton from "../buttons/backToTopButton";
import SearchForm from "../forms/search/searchForm";
import { useKeyDown, useShowBackToTopBtn } from "@App/hooks/windowUtilHooks";

interface Props {
  animationCompleted: boolean;
  containerRef: any
}
type IProps = Props


/**
 * @component SearchLayout
 * 
 * @tested - 6/22/2022 
 *
 */
const SearchLayout = ({ animationCompleted, containerRef }: IProps) => {

  // used to simulate Infinite Scroll
  const [postFooterRef, postFooterRefInView] = useInView({
    /* Optional options */
    threshold: 0,
  });

  const { query, search, results, clearSearch, closeSearch, category, setCategory, state: { isOpen }, pagination } = useSearchResults({
    maxResults: 16,
    postFooterRefInView
  })

  // useed to close the Search when user navigates away from the page
  const listRef = useRef<HTMLDivElement | null>(null);

  consoleHelper('search results', {
    results,
    pagination
  }, 'searchLayout', { bg: consoleColors.orange, text: '#fff' })

  const { showScrollToTopBtn, goToTop } = useShowBackToTopBtn(containerRef)

  useKeyDown(escFunction)

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


  // USED FOR TESTING
  // useEffect(() => {
  //   handleOnSearch({ currentTarget: { value: 'Watercolor' } })
  // }, [])

  /**
  * escFunction
  * pressing esc while search is focused will close it
  */
  function escFunction(event: any) {
    if (event.keyCode === 27) {
      clearSearch()
      closeSearch()
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

  const handleSetCategory = (cat: string) => () => {
    setCategory(cat)
  }

  const closeCategory = () => {
    setCategory(null)
  }

  return (
    <div className='grid grid-flow-row row-auto search-layout relaitve grid-cols-mobile gap-x-5 tablet:grid-cols-tablet tablet:gap-x-5 desktop:grid-cols-desktop'>
      {/* <button onClick={testCall}>Call</button> */}

      <div className="col-span-full border-b-[1px] grid grid-flow-row row-auto grid-cols-mobile gap-x-5 tablet:grid-cols-tablet tablet:gap-x-5 desktop:grid-cols-desktop pb-8">

        {/* SEARCH FORM */}
        <div className="col-span-2 col-start-2 mt-2 tablet:col-span-10 tablet:col-start-3 laptop:col-span-6 laptop:col-start-5 desktop:col-span-6 desktop:col-start-5 desktop:max-w-[725px] desktop:mx-auto desktop:w-full">
          <SearchForm
            query={query}
            results={results}
            handleOnSearch={handleOnSearch}
            category={category}
            animationCompleted={animationCompleted}
          />
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
              className="flex flex-col col-span-2 col-start-2 overflow-hidden tablet:col-span-10 tablet:col-start-3 laptop:col-span-6 laptop:col-start-5 desktop:col-span-6 desktop:col-start-5 desktop:max-w-[725px] desktop:mx-auto desktop:w-full">
              <SearchFilterHeader
                category={category}
                closeCategory={closeCategory}
                handleSetCategory={handleSetCategory}
              />
            </motion.div>
          }
        </AnimatePresence>
      </div>

      {/* RESULTS */}
      {results.length > 0 && query && query.length > 0 && (
        <>
          {/* RESULTS LIST */}
          <div
            data-testid='resultsList'
            className="grid grid-cols-1 col-span-2 col-start-2 mt-8 mb-8 gap-y-6 tablet:col-span-12 tablet:col-start-2 tablet:grid-cols-3 tablet:gap-6 laptop:mt-16 desktop:grid-cols-4 search_results"
            ref={listRef}>
            {pagination.pagedResults
              .map((result: SearchResult, index) => {
                const { item } = result
                return (
                  <SmallPostCard key={item.slug} post={item} />
                );
              })}
          </div>
        </>
      )}

      {/* No Results Found Message */}
      {results.length === 0 && query && query.length > 0 && (
        <div className="text-center col-span-2 col-start-2 mt-16 mb-8 tablet:col-span-10 tablet:col-start-3 laptop:col-span-6 laptop:col-start-5 desktop:col-span-6 desktop:col-start-5 desktop:max-w-[600px] desktop:mx-auto desktop:w-full">
          <p className="text-xl">
            Sorry, not finding anything for <strong>{query}</strong>
          </p>
        </div>
      )}

      {/* Back To Top Button */}
      <BackToTopButton handleGoToTop={goToTop} visible={isOpen && showScrollToTopBtn} />

      {/* INFINITE SCROLL TRACKER */}
      {results.length > 0 && !pagination.loading &&
        <div className="mt-2 mb-8 col-span-full">
          <div ref={postFooterRef} className="text-center">
            End of Results</div>
        </div>
      }

      {/* @ts-ignore */}
      <AnimatePresence>
        {results.length > 0 && pagination.loading &&
          <div className="mt-2 mb-8 col-span-full">
            <motion.div
              key="catSpinner"
              initial={{
                opacity: 0,
                scale: 0,
              }}
              animate={{
                opacity: 1,
                scale: 1
              }}
              exit={{
                opacity: 0,
                scale: 0
              }}
              className='rounded-full mx-auto flex items-center justify-center text-center w-[60px] h-[60px] bg-primary-50 p-1'>
              <svg
                className="text-white motion-reduce:hidden animate-spin"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="#b45309" strokeWidth="4"></circle>
                <path className="opacity-75" fill="#845c5c" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </motion.div>
          </div>
        }
      </AnimatePresence>
    </div>
  );
}

export default SearchLayout

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

