import useSite from '~/hooks/useSite'
import CommentForm from '../comments/commentForm'
import Comment from '../comments/comment'

/*
2 Forms - main form to leave a comment. 2nd form appears when user clicks reply. That form is for replying a nested comment
*/
function CommentModal() {
  const { state: { commentsModal }, addComment } = useSite()
  if (commentsModal.show) {
    return (
      <div>
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


