import { render, screen } from "@testing-library/react"
import { mockPostDataComplete, mockPostDataComplete_2, mockPostDataComplete_3 } from "@TestUtils/mock-data/posts"
import { MemoryRouter } from "react-router"
import BlogPostGrid from "../blogPostGrid"

const noPosts = {
  posts: [],
  category: 'all',
  categories: {
    'all': {
      posts: [],
      pageInfo: {
        page: 1,
        endCursor: 'string',
        hasNextPage: false,
      }
    }
  }
}
const Posts_2 = {
  posts: [],
  category: 'all',
  categories: {
    'all': {
      posts: [
        { ...mockPostDataComplete },
        { ...mockPostDataComplete_2 },
      ],
      pageInfo: {
        page: 1,
        endCursor: 'string',
        hasNextPage: false,
      }
    }
  }
}
const Posts_Cat_Procreate = {
  posts: [],
  category: 'procreate',
  categories: {
    'procreate': {
      posts: [
        { ...mockPostDataComplete_2 },
      ],
      pageInfo: {
        page: 1,
        endCursor: 'string',
        hasNextPage: false,
      }
    }
  }
}

describe('Blogpost Grid', () => {
  it('Should show no posts with message for Category All', () => {
    render(
      <MemoryRouter>
        <BlogPostGrid {...noPosts} />
      </MemoryRouter>
    )

    const grid = screen.getByTestId('post-grid')
    expect(grid).toHaveTextContent('Sorry, There are no posts in Category: all yet.')

  })

  // because the first post will be the featured post
  it('Should show 2 posts in Category All', () => {
    render(
      <MemoryRouter>
        <BlogPostGrid {...Posts_2} />
      </MemoryRouter>
    )

    const cards = screen.getAllByTestId('post-card-one')
    expect(cards.length).toBe(2)
  })

  it('Should show 1 posts in Category Procreate', () => {
    render(
      <MemoryRouter>
        <BlogPostGrid {...Posts_Cat_Procreate} />
      </MemoryRouter>
    )

    const cards = screen.getAllByTestId('post-card-one')
    expect(cards.length).toBe(1)
  })
})