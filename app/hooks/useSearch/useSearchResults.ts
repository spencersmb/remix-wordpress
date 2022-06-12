import Fuse from "fuse.js";
import { useCallback, useEffect, useState } from "react";
import { useSearch } from ".";

export function useSearchResults ({ defaultQuery = null, maxResults = 5 } = {}) {
  const {state, addClient, closeSearch} = useSearch()
  const {client, data } = state

  const [query, setQuery] = useState<null | string>(defaultQuery);
  let results: ISearchResult[] = [];

  useEffect(() => {
    if(data && !client){
      let client = new Fuse(data.posts, {
        keys: ['slug', 'title'],
        minMatchCharLength: 3,
        isCaseSensitive: false,
      });
      addClient(client)
    }
  },[addClient, client, data])

  // If we have a query, make a search. Otherwise, don't modify the
  // results to avoid passing back empty results
  if (client && query) {
    results = client.search(query).map(({ item }: any) => item);
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
    state, // state from useContext
    query, // what userHas Typed into input
    results,
    search: handleSearch, // function called when user types something into input
    clearSearch: handleClearSearch,
    closeSearch,
  };

}