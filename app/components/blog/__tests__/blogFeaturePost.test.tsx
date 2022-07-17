import { formatDate } from "@App/utils/posts"
import { render, screen } from "@testing-library/react"
import { mockPostDataComplete } from "@TestUtils/mock-data/posts"
import { MemoryRouter } from "react-router-dom"
import BlogFeaturedPost from "../blogFeaturedPost"

describe('BlogFeature Post Component', () => {

  const setup = (props: { featuredPost: IPost | undefined }) => {
    render(
      <MemoryRouter >
        <BlogFeaturedPost {...props} />
      </MemoryRouter>
    )
  }

  it('Should not display featured post', () => {
    const props = {
      featuredPost: undefined
    }
    render(
      <div data-testid="parent">
        <BlogFeaturedPost {...props} />
      </div>
    )

    expect(screen.getByTestId('parent')).toBeEmptyDOMElement()

  })

  it('All links should have the same Url', () => {
    render(
      <MemoryRouter>
        <BlogFeaturedPost {...{
          featuredPost: mockPostDataComplete
        }} />
      </MemoryRouter>
    )
    const links: HTMLAnchorElement[] = screen.getAllByRole("link")
    links.forEach(link => {
      expect(link.href).toContain(`/${mockPostDataComplete.slug}`)
    })
  })

  it('Should show correct Blog Default Images', () => {
    render(
      <MemoryRouter>
        <BlogFeaturedPost {...{
          featuredPost: mockPostDataComplete
        }} />
      </MemoryRouter>
    )
    const image = screen.getByTestId("lazy-load-image-make-this")
    const arrow = screen.getByTestId("lazy-load-image-make-this-arrow")
    expect(arrow).toBeVisible()
    expect(image).toBeVisible()

    const featureImage = screen.getByTestId("feature-image")
    expect(featureImage).toBeVisible()
  })

  it('Should show Free Color Swatch Icon', () => {
    const props = {
      featuredPost: mockPostDataComplete
    }
    render(
      <MemoryRouter>
        <BlogFeaturedPost {...props} />
      </MemoryRouter>
    )

    expect(screen.getByTestId('color-swatch')).toHaveTextContent('Free Color Swatches')

  })

  it('should show blog title', () => {
    setup({
      featuredPost: mockPostDataComplete
    })
    expect(screen.getByTestId('blog-title')).toHaveTextContent(mockPostDataComplete.title)
  })

  it('should show blog date', () => {
    setup({
      featuredPost: mockPostDataComplete
    })
    expect(screen.getByTestId('blog-date')).toHaveTextContent(formatDate(mockPostDataComplete.date))
  })

  it('should show blog author title', () => {
    setup({
      featuredPost: mockPostDataComplete
    })
    expect(screen.getByTestId('blog-author')).toHaveTextContent('by Teela Cunningham')
  })

  it('should show blog description', () => {
    setup({
      featuredPost: mockPostDataComplete
    })

    // Set the DIV because the code from WP server is wrapped in a P tag and the 
    // result needs to be just text.
    const div = document.createElement('div')
    if (mockPostDataComplete.tutorialManager.postExcerpt) {
      div.innerHTML = mockPostDataComplete.tutorialManager.postExcerpt
    }
    expect(screen.getByTestId('blog-desc'))
      .toHaveTextContent(div.firstElementChild?.innerHTML as string)
  })

  it('should show blog skill level', () => {
    setup({
      featuredPost: mockPostDataComplete
    })

    // Set the DIV because the code from WP server is wrapped in a P tag and the 
    // result needs to be just text.
    const div = document.createElement('div')
    if (mockPostDataComplete.tutorialManager.postExcerpt) {
      div.innerHTML = mockPostDataComplete.tutorialManager.postExcerpt
    }
    expect(screen.getByTestId('blog-skill-level'))
      .toHaveTextContent('Skill Level:')

    expect(screen.getByTestId('blog-skill-level')).toHaveTextContent("Intermediate")
  })


})