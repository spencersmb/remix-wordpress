import { useEffect, useRef } from "react";

const SearchLayout = () => {
  const formRef = useRef<null | HTMLFormElement>(null)

  useEffect(() => {
    // When the search box opens up, additionally find the search input and focus
    // on the element so someone can start typing right away
    if (formRef.current) {
      const searchInput: HTMLInputElement = Array.from(formRef.current.elements)
        .find((input: any) => input.type === 'search') as HTMLInputElement

      searchInput.focus();
    }

  }, [])

  return (
    <div className="search-layout">
      SEARCH LAYOUT
      <form
        ref={formRef}
      // data-search-is-active={!!query}
      >
        <input
          type="search"
          name="q"
          // value={query || ''}
          // onChange={handleOnSearch}
          autoComplete="off"
          placeholder="Search..."
          required
        />
      </form>
    </div>
  );
}

export default SearchLayout