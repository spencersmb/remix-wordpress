import { consoleHelper } from "@App/utils/windowUtils";
import Fuse from "fuse.js";
import { useCallback, useEffect, useState } from "react";
import { useSearch } from ".";

export function useSearchResults ({ defaultQuery = null, maxResults = 5 } = {}) {
  const {state, addClient, closeSearch} = useSearch()
  const {client, data } = state

  const [query, setQuery] = useState<null | string>(defaultQuery);
  const [category, setCategory] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false)

  
  let results: SearchResult[] = [];
  let pagedResults: SearchResult[] = [];

  useEffect(() => {
    if(data && !client){
      let client = new Fuse(data.posts, {
        keys: ['categories', {name: 'title', weight: 2}, 'tags'], 
        minMatchCharLength: 2,
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
    let $and: any[] = [
      {
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
    ]
    if(category){
      console.log('CAT', `"'${category} ${query}"`);
      // mySearch = `"'${category} '${query}"`
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

      $and = [
        {
          categories: `"'${category}}"`,
          
        },
        {
          title: query,
        },
        {
          categories: query
        }
      ]
        
    }
    results = client.search(mySearch).map((data: SearchResult) => {
      return data
    });
    
    // results = client.search(query).map(({ item, score }: {item: IPost, ref: number, score: number}) => {
    //   return item
    // });
  }else if(client && category){
    consoleHelper('CAT`', `"'${category}"`);
    
    results = client.search({
        $and:[
          {
            categories: `"'${category}"`
          }
        ]
      }).map(({ item, score }: {item: IPost, ref: number, score: number}) => {
      return item
    });
  }

  // if (maxResults && results.length > maxResults) {
  //   results = results.slice(0, maxResults);
  // }
  if (results.length) {
    // results = results.sort((a: ISearchResult, b: ISearchResult) => Date.parse(b.date) - Date.parse(a.date))
    pagedResults = results.slice(0, page * 10);
  }

  // If the defaultQuery argument changes, the hook should reflect
  // that update and set that as the new state

  useEffect(() => setQuery(defaultQuery), [defaultQuery]);

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

  function nextPage(){
    setLoading(true)
    
    setPage((state) => {
      return state + 1
    })

    setTimeout(()=>{
      setLoading(false)
    }, 500)
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