import { siteInitialState } from "@App/hooks/useSite"
import UseSiteProvider from "@App/hooks/useSite/useSiteProvider"
import { fireEvent, render, screen } from "@testing-library/react"
import { mockComment } from "@TestUtils/mock-data/posts"
import Comment from "../comment"

describe('Comment Component', () => {
  const defualtProps: { comment: IPostComment, postId: number } = {
    comment: mockComment,
    postId: 1,
  }
  const setup = (props: any = {}) => {
    const setupProps = { ...defualtProps, ...props }
    render(
      <UseSiteProvider defaultState={siteInitialState}>
        <Comment {...setupProps} />
      </UseSiteProvider>
    )
    return {
      comment: screen.getByTestId('comment'),
      image: screen.getAllByRole('img')[0],
    }
  }
  it('Should show Comment Image', () => {
    const { image } = setup()
    expect(image).toBeInTheDocument()
    expect(image).toHaveAttribute('src', 'https://secure.gravatar.com/avatar/9119dc766dbfe9f6b05b7f39f9dbd9ce?s=96&d=mm&r=g')
    expect(image).toHaveAttribute('alt', `${defualtProps.comment.author.name}'s Profile `)
  })

  it('Should show comment name & date', () => {
    const { comment } = setup()
    expect(comment).toHaveTextContent(`${defualtProps.comment.author.name}`)
    expect(comment).toHaveTextContent(`January 27, 2022`)
  })
  it('Should show comment reply button', () => {
    const { comment } = setup()
    const replyButton = screen.getByTestId('comment-reply-button')
    expect(replyButton).toBeInTheDocument()
    expect(replyButton).toHaveTextContent('Reply')
  })
  it('Should show comment reply form on click', () => {
    const { comment } = setup()
    const replyButton = screen.getByTestId('comment-reply-button')
    fireEvent.click(replyButton)
    const form = screen.queryByLabelText('Comment Form')
    expect(form).toBeInTheDocument()
  })

  it('Should show comment body', () => {
    const { comment } = setup()
    const commentBody = screen.getByTestId('comment-body')
    expect(commentBody).toHaveTextContent(`Comment Body`)
  })

  it('Should show 0 comment replies', () => {
    const { comment } = setup()
    const commentReplies = screen.getAllByLabelText('comment-replies')
    expect(commentReplies[0].children.length).toBe(0)
  })

  it('Should show 1 comment replies', () => {
    const { comment } = setup({
      comment: {
        ...defualtProps.comment,
        replies: [
          { ...mockComment }
        ]
      }
    })
    const commentReplies = screen.getAllByLabelText('comment-replies')
    expect(commentReplies[0].children.length).toBe(1)
  })

})