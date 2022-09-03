import { render, screen } from "@testing-library/react"
import { mockPostData, mockPostDataComplete } from "@TestUtils/mock-data/posts"
import { MemoryRouter } from "react-router-dom"
import PostCardOne from "../postCardOne"

describe('Post Card One Component', () => {
  const defualtProps = {
    post: mockPostDataComplete,
    scrollPosition: {
      x: 0,
      y: 0,
    }
  }
  const setup = (props: any = {}) => {
    const setupProps = { ...defualtProps, ...props }
    render(
      <MemoryRouter>
        <PostCardOne {...setupProps} />
      </MemoryRouter>

    )
    return {
      card: screen.getByTestId('post-card-one'),
      imageWrapper: screen.getByTestId('post-card-one-image-wrapper'),
    }
  }
  it('Should show correct link url', () => {
    setup()
    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', `/${mockPostDataComplete.slug
      }`)
  })

  it('Should show Primary image', () => {
    const { card, imageWrapper } = setup()
    const primaryImage = screen.getByTestId('post-card-one-feature-image')
    expect(primaryImage).toBeInTheDocument()
  })

  it('Should show correct title + split title', () => {
    const { card } = setup()
    const title = screen.getByTestId('post-card-one-title')
    const spliteTitle = screen.queryByLabelText('split-title')
    expect(title).toContainHTML('Create Candy Cane Lettering')
    expect(spliteTitle).toBeDefined()
    expect(spliteTitle).toHaveTextContent('in Procreate')
  })

  it('Should show correct sub title', () => {
    const { card } = setup({
      post: {
        ...mockPostData,
        title: 'Paint Gouache Gardening Supplies in Procreate [New Gardening Series!]'
      }
    })
    const title = screen.getByTestId('post-card-one-title')
    const spliteTitle = screen.queryByLabelText('split-title')
    const subTitle = screen.queryByLabelText('subTitle')
    expect(title).toContainHTML('Paint Gouache Gardening Supplies')
    expect(spliteTitle).toBeDefined()
    expect(spliteTitle).toHaveTextContent('in Procreate')
    expect(subTitle).toBeDefined()
    expect(subTitle).toHaveTextContent('New Gardening Series!')
  })
  it('Should show correct skill level', () => {
    const { card } = setup()
    const skillLevel = screen.queryByLabelText('post-card-skill-level')

    expect(skillLevel).toBeDefined()
    expect(skillLevel).toHaveTextContent('Intermediate')

  })
  it('Should show no skill level', () => {
    setup({
      post: {
        ...mockPostDataComplete,
        categories: [],
      }
    })
    const skillLevel = screen.queryByLabelText('post-card-skill-level')
    expect(skillLevel).toBeNull()
  })
})