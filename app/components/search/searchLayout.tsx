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
import SmallPostCard from "../cards/smallPostCard";
import RenderIfVisible from "react-render-if-visible";
import SearchFilterHeader from "./searchFilterHeader";
import BackToTopButton from "../buttons/backToTopButton";
import SearchForm from "../forms/search/searchForm";

interface Props {
  animationCompleted: boolean;
  containerRef: any
}
type IProps = Props
const SearchLayout = ({ animationCompleted, containerRef }: IProps) => {
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
  // const [inputRef, inputInView] = useInView({
  //   /* Optional options */
  //   threshold: 0,
  // });

  // useed to close the Search when user navigates away from the page
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

  useEffect(() => {

    if (!query && category) {
      setCategory(null)
      clearSearch()
    }
  }, [query, category, setCategory, clearSearch])

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
    if (containerRef.current && containerRef.current.scrollTop > 800) {
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
    setCategory(null)
  }

  return (
    <div className='grid grid-flow-row row-auto search-layout relaitve grid-cols-mobile gap-x-5 tablet:grid-cols-tablet tablet:gap-x-5 desktop:grid-cols-desktop'>
      {/* <button onClick={testCall}>Call</button> */}

      <div className="col-span-full border-b-[1px] grid grid-flow-row row-auto grid-cols-mobile gap-x-5 tablet:grid-cols-tablet tablet:gap-x-5 desktop:grid-cols-desktop pb-8">

        {/* SEARCH FORM */}
        <div className="col-span-2 col-start-2 mt-2 tablet:col-span-10 tablet:col-start-3 laptop:col-span-6 laptop:col-start-5 desktop:col-span-6 desktop:col-start-5 desktop:max-w-[600px] desktop:mx-auto desktop:w-full">
          <SearchForm
            formRef={formRef}
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
              className="flex flex-col col-span-2 col-start-2 overflow-hidden tablet:col-span-10 tablet:col-start-3 laptop:col-span-6 laptop:col-start-5 desktop:col-span-6 desktop:col-start-5 desktop:max-w-[600px] desktop:mx-auto desktop:w-full">
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
          {/* RESULT LIST */}
          <div className="grid grid-cols-1 col-span-2 col-start-2 mt-16 mb-8 tablet:col-span-12 tablet:col-start-2 tablet:grid-cols-3 tablet:gap-6 desktop:grid-cols-4 search_results" ref={listRef}>
            {pagination.pagedResults
              .map((result: SearchResult, index) => {
                const { item } = result
                return (
                  <RenderIfVisible stayRendered={true} key={item.slug} defaultHeight={313}>
                    <SmallPostCard post={item} />
                  </RenderIfVisible>
                );
              })}
          </div>
        </>
      )}

      {/* No Results Found Message */}
      {results.length === 0 && query && query.length > 0 && (
        <div className="col-span-2 col-start-2 mt-16 mb-8 tablet:col-span-10 tablet:col-start-3 laptop:col-span-6 laptop:col-start-5 desktop:col-span-6 desktop:col-start-5 desktop:max-w-[600px] desktop:mx-auto desktop:w-full">
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

