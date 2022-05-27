import { fireEvent, render, screen } from "@testing-library/react"
import { mockComments, mockPostData } from "@TestUtils/mock-data/posts"
import BlogComments from "../blogComments"

describe('Blog Comments', () => {
  const setup = (props: { post: IPost }) => {
    render(
      <BlogComments {...props} />
    )
    const commentsCount = screen.getByTestId('comments-count')
    return {
      commentsCount
    }
  }

  it('Should have 0 comments, and show Leave Comment', () => {
    const { commentsCount } = setup({
      post: {
        ...mockPostData,
      }
    })
    expect(commentsCount).toHaveTextContent('Leave a comment')
  })

  it('Should comment count', () => {
    const { commentsCount } = setup({
      post: {
        ...mockPostData,
        comments: mockComments
      }
    })
    expect(commentsCount).toHaveTextContent('3 comments')
  })

  it('Should show facebook share btn', () => {
    const { commentsCount } = setup({
      post: {
        ...mockPostData,
        comments: mockComments
      }
    })
    const postUrl = `/${mockPostData.slug}`
    const url = `https://www.facebook.com/sharer/sharer.php?u=${postUrl}`
    const button = screen.getByTestId('facebook-share-btn')
    expect(button).toHaveAttribute('href', url)
    expect(button).toHaveAttribute('data-link', url)
  })

  it('Facebook button should call window.open', () => {
    window.open = jest.fn()

    const { commentsCount } = setup({
      post: {
        ...mockPostData,
        comments: mockComments
      }
    })
    const postUrl = `/${mockPostData.slug}`
    const url = `https://www.facebook.com/sharer/sharer.php?u=${postUrl}`
    const button = screen.getByTestId('facebook-share-btn')
    fireEvent.click(button)

    expect(window.open).toHaveBeenCalledWith(url, 'Facebook', 'width=640,height=580')
    expect(window.open).toHaveBeenCalledTimes(1)
  })

})