import { consoleHelper } from "@App/utils/windowUtils";
import Fuse from "fuse.js";
import { useCallback, useEffect, useState } from "react";
import { useSearch } from ".";

export function useSearchResults ({ defaultQuery = null, maxResults = 5 } = {}) {
  const {state, addClient, closeSearch} = useSearch()
  const {client, data } = state

  const [query, setQuery] = useState<null | string>(defaultQuery);
  const [category, setCategory] = useState<string | null>(null);
  
  let results: ISearchResult[] = [];

  useEffect(() => {
    if(data && !client){
      let client = new Fuse(data.posts, {
        keys: ['slug', 'title', { name: 'categories', weight: 2 }], 
        minMatchCharLength:2,
        useExtendedSearch: true,
        threshold: 0.3,
        isCaseSensitive: false,
        includeScore: true
      });
      addClient(client)
    }
  },[addClient, client, data])

  // If we have a query, make a search. Otherwise, don't modify the
  // results to avoid passing back empty results
  if (client && query) {
    let $and: any[] = [
      {
        $or:[
          {
            title: query,
          }
        ]
      }
    ]
    if(category){
      $and = [
        {
          categories: `"'${category}}"`,
          
        },
        {
          title: query,
        }
      ]
        
    }
    results = client.search({
        $and
      }).map(({ item, score }: {item: IPost, ref: number, score: number}) => {
      return item
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

  if (maxResults && results.length > maxResults) {
    results = results.slice(0, maxResults);
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

  return {
    setCategory,
    state, // state from useContext
    query, // what userHas Typed into input
    results,
    search: handleSearch, // function called when user types something into input
    clearSearch: handleClearSearch,
    closeSearch,
  };

}