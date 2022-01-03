import useSite from '~/hooks/useSite'
import CommentForm from '../comments/commentForm'
import Comment from '../comments/comment'

function CommentModal() {
  const { state: { commentsModal }, addComment } = useSite()
  console.log('OFficial Comments', commentsModal.comments)
  if (commentsModal.show) {
    return (
      <div>
        Comment MODAL
        <CommentForm postId={commentsModal.commentOn} primary={true} />

        {commentsModal.comments.length > 0 && <div>
          {commentsModal.comments.map((comment: IPostComment) =>
            <Comment
              key={comment.id}
              comment={comment}
              postId={commentsModal.commentOn}
            />
          )
          }
        </div>}
      </div>
    )
  }

  return null

}

export default CommentModal


