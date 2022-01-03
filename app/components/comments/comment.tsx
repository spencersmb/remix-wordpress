import { useState } from "react"
import CommentForm from "./commentForm"

interface ICommentProps {
  comment: IPostComment
  postId: number
}
const Comment = (props: ICommentProps) => {
  const { comment, postId } = props
  const [showReplyForm, setShowReplyForm] = useState(false)

  function handleReplyClick() {
    console.log('click', !showReplyForm)
    setShowReplyForm(!showReplyForm)
  }

  function commentOnCompelte(response: any) {

    // if user has already commented before, close the form
    if (response.createComment) {
      setShowReplyForm(false)
    }
    // if first time post, do not close the comment form
  }

  return (
    <div key={comment.id}>
      <h3>{comment.author.name}</h3>
      <button onClick={handleReplyClick}>Reply</button>
      {showReplyForm && <div>
        Reply Form
        <CommentForm
          postId={postId}
          onComplete={commentOnCompelte}
          replyToComment={comment} />
      </div>}
    </div>
  )
}

export default Comment