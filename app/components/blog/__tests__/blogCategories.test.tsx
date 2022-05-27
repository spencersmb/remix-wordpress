import { render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import BlogCategories from "../blogCategories"

describe('Blog Categories Tests', () => {
  const setup = (props: { categories: ICategories[] }) => {
    render(
      <MemoryRouter>
        <BlogCategories {...props} />
      </MemoryRouter>
    )
    const catList = screen.getAllByTestId('test-category')
    return {
      catList
    }
  }
  const defaultCategories = [{
    databaseId: 1,
    id: '1',
    name: 'test',
    slug: 'test'
  }, {
    databaseId: 2,
    id: '2',
    name: 'test2',
    slug: 'test2'
  }]
  it('Should show correct amount of categories', () => {
    const { catList } = setup({
      categories: defaultCategories
    })

    expect(catList.length).toBe(2)
  })

  it('Should show correct category name', () => {
    const { catList } = setup({
      categories: defaultCategories
    })

    expect(catList[0]).toHaveTextContent(defaultCategories[0].name)
  })

  it('Should show correct category url and key', () => {
    const { catList } = setup({
      categories: defaultCategories
    })
    const links: HTMLAnchorElement[] = screen.getAllByRole("link")
    expect(links[0].href).toContain(`/category/${defaultCategories[0].slug}`)
  })

})