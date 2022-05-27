import { render, screen } from "@testing-library/react"
import { mockPostDataComplete } from "@TestUtils/mock-data/posts"
import { MemoryRouter } from "react-router"
import Breadcrumbs from "../breadcrumbs"

describe('Breadcrumbs Component', () => {

  const setup = (props: { links?: IBreadCrumb[] } | undefined) => {
    render(
      <MemoryRouter>
        <Breadcrumbs {...props} />
      </MemoryRouter>
    )

    const links: HTMLLinkElement[] = screen.getAllByRole('link')

    return { links }
  }

  const defaultLinks = {
    links: [
      {
        text: 'Blog',
        url: '/blog'
      },
      {
        text: mockPostDataComplete.title,
        url: `/${mockPostDataComplete.slug}`
      }
    ]
  }
  it('Should only HOME link', () => {
    const { links } = setup({})
    expect(links.length).toBe(1)
  })
  it('Should show 2 links', () => {
    const { links } = setup(defaultLinks)
    expect(links.length).toBe(2)
  })
  it('Should show correct LINKS breadcrumb title and url', () => {
    const { links } = setup(defaultLinks)
    expect(links[0]).toHaveTextContent('Home')
    expect(links[0]).toHaveAttribute('href', '/')
    expect(links[1]).toHaveTextContent('Blog')
    expect(links[1]).toHaveAttribute('href', '/blog')
  })
  it('Should show last item with correct title and', () => {
    setup(defaultLinks)
    const lastElement = screen.getByTestId('last-element')
    expect(lastElement).toHaveTextContent(mockPostDataComplete.title)
  })
})