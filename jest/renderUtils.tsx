import { render, screen, getQueriesForElement } from "@testing-library/react"

export function renderUi(ui: any) {
  render(<div data-testid="parent">
    {ui}
  </div>)
  const parent = screen.getByTestId('parent')
  const queries = getQueriesForElement(parent)
  return {
    ...queries,
    parent: screen.getByTestId('parent')
  }
}