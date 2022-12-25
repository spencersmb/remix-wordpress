import Fuse from "fuse.js";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useSearch } from ".";

export function useSearchResults ({ defaultQuery = null, maxResults = 5, postFooterRefInView = false } = {}) {
  const {state, addClient, closeSearch} = useSearch()
  const {client, data } = state
  const [query, setQuery] = useState<null | string>(defaultQuery);
  const [category, setCategory] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false)
  // let results: SearchResult[] = [];
  let results: SearchResult[] = useMemo(() => [], []);
  let pagedResults: SearchResult[] = [];


  // If we have a query, make a search. Otherwise, don't modify the
  // results to avoid passing back empty results
  if (client && query) {
    let mySearch: any = {
        $or:[
          {
            title: query,
          },
          {
            categories: query
          },
          {
            tags: query
          }
        ]
      }

    if(category){
      mySearch = {
        $and:[
          {
            categories: `"'${category}"`,
          },
          {
            $or:[
              {
                title: query,
              },
              {
                tags: `"'${query}"`,
              },
            ]
          }
          // {
          //   title: query,
          // },
          // {
          //   tags: query,
          // },
        ],
      }
    }
    results = client.search(mySearch).map((data: SearchResult) => {
      return data
    });

  }else if(client && category){
    // NOT CURRENTLY USED BECAUSE FILTER IS HIDDEN UNTIL SEARCH IS ACTIVATED   
    results = client.search({
        $and:[
          {
            categories: `"'${category}"`
          }
        ]
      }).map((data: SearchResult) => {
      return data
    });
  }

  // Once we have results, paginate them
  if (results.length) {
    
    pagedResults = results.slice(0, page * maxResults);
  }

  // CREATE new client if not already created
  useEffect(() => {
    if(data && !client){
      let client = new Fuse(data.posts, {
        keys: ['categories', {name: 'title', weight: 2}, 'tags'], 
        minMatchCharLength: 1,
        useExtendedSearch: true,
        includeMatches: true,
        threshold: 0.4,
        isCaseSensitive: false,
        includeScore: true,
        ignoreLocation: true,
      });
      addClient(client)
    }
  },[addClient, client, data])

  // // if use clears query, but has a category selected, clear category
  // useEffect(() => {

  //   if (!query && category) {
  //     setCategory(null)
  //     setQuery(null);
  //   }
  // }, [query, category])

  // Infinite Scroll
  useEffect(() => {
    const hasNextPage = results.length > page * maxResults

    if (results.length && hasNextPage && postFooterRefInView && !loading) {
      nextPage()
    }

  }, [loading, page, postFooterRefInView, results, maxResults])
  
  // // If the defaultQuery argument changes, the hook should reflect
  // // that update and set that as the new state
  // useEffect(() => setQuery(defaultQuery), [defaultQuery]);

  // // CLEAR SEARCH On COMPONENT UNMOUNT
  // useEffect(() => {
  //   return () => {
  //     handleClearSearch()
  //   }
  // }, [])

  /**
   * handleSearch
   */
  const handleSearch = useCallback(({ query }: any) => setQuery(query), [])

  /**
   * handleClearSearch
   */
  function handleClearSearch() {
    setQuery(null);
  }

  /**
   * nextPage
   */
  function nextPage(){
    setLoading(true)
    
    setPage((state) => {
      return state + 1
    })

    setTimeout(()=>{
      setLoading(false)
    }, 700)
  }

  return {
    pagination:{
      page,
      loading,
      nextPage,
      hasNextPage: results.length > page * 10,
      hasPreviousPage: page > 1,
      pagedResults
    },
    setCategory,
    category,
    state, // state from useContext
    query, // what userHas Typed into input
    results,
    search: handleSearch, // function called when user types something into input
    clearSearch: handleClearSearch,
    closeSearch,
  };

}