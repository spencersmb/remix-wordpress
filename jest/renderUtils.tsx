import { render, screen, getQueriesForElement } from "@testing-library/react"

export function renderUi(ui: any) {
  const { rerender } = render(<div data-testid="parent">
    {ui}
  </div>)
  const parent = screen.getByTestId('parent')
  const queries = getQueriesForElement(parent)
  return {
    ...queries,
    rerender,
    parent: screen.getByTestId('parent')
  }
}

export function mockFetchPromise(customResponse: any) {
  return new Promise((resolve) => {
    resolve({
      json: () => customResponse,
    })
  })
}

export function mockFetchError(error: string | null) {
  const errorResponse = error ? error : "API is down"
  return Promise.reject(errorResponse)
}