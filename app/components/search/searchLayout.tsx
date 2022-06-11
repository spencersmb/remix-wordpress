import { consoleHelper } from "@App/utils/windowUtils";
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

  async function testCall() {
    // GET REQUEST URL
    // const api_url = 'https://api.github.com/repos/spencersmb/remix-wordpress/actions/workflows'
    const api_url = 'https://api.github.com/repos/spencersmb/remix-wordpress/actions/workflows/16167008/dispatches'
    const res = await fetch(api_url, {
      method: 'POST',
      headers: {
        // 'Authorization': 'token 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',
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

  return (
    <div className="search-layout">
      SEARCH LAYOUT
      <button onClick={testCall}>Call</button>
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