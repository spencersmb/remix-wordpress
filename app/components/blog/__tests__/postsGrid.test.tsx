import { render, screen } from "@testing-library/react"
import { mockPostDataComplete, mockPostDataComplete_2, mockPostDataComplete_3 } from "@TestUtils/mock-data/posts"
import { MemoryRouter } from "react-router-dom"
import PostsGrid from "../postsGrid"

interface Props {
  posts: IPost[]
  tabletGrid3x: boolean
}
const postsDefault = {
  posts: [
    { ...mockPostDataComplete },
    { ...mockPostDataComplete_2 },
    { ...mockPostDataComplete_3 },
  ],
  tabletGrid3x: false,
}

describe('PostsGrid component', () => {

  const setup = (props: Props) => {
    render(
      <MemoryRouter>
        <PostsGrid {...props} />
      </MemoryRouter>
    )
  }
  it('Post Grid has 3 posts', () => {
    setup(postsDefault)
    const posts = screen.getAllByTestId('post-card-one')
    expect(posts.length).toBe(3)
  })
  it('Post Grid has default css for grid layout', () => {
    setup(postsDefault)
    const post = screen.getByTestId('post-grid-css')
    expect(post).toHaveClass('tablet_2x_grid')
  })
  it('Post Grid has 3x css for grid layout', () => {
    setup({
      ...postsDefault,
      tabletGrid3x: true,
    })
    const post = screen.getByTestId('post-grid-css')
    expect(post).toHaveClass('tablet_3x_grid')
  })
})