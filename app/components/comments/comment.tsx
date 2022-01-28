import { useState } from "react"
import { formatDate } from "~/utils/posts"
import CommentForm from "./commentForm"

interface ICommentProps {
  comment: IPostComment
  postId: number
}
const Comment = (props: ICommentProps) => {
  const { comment, postId } = props

  const [showReplyForm, setShowReplyForm] = useState(false)

  function handleReplyClick() {
    console.log('comment', comment);

    setShowReplyForm(!showReplyForm)
  }

  function commentOnCompelte(response: any) {

    // if user has already commented before, close the form
    if (!response.createComment) {
      setShowReplyForm(false)
    }
  }

  // Helper to get the user's avatar img, Teela's isn't working
  function getAvatarUrl(comment: IPostComment) {
    if (comment.author.name === 'Teela') {
      return "https://secure.gravatar.com/avatar/64857a955396b7ae5131db1265407d77?s=96&d=mm&r=g"
    }

    return comment.author.gravatar.url

  }

  return (
    <div key={comment.id} className={`mb-12 ${showReplyForm ? '' : ''}`}>

      {/* IMAGE, NAME, DATE */}
      <div className="comment_header flex flex-row justify-between mb-3">
        <div className="flex flex-row justify-center items-center">
          {/* IMAGE */}
          <div className="w-[54px] h-[54px] rounded-full overflow-hidden mr-3">
            <img className="w-full" src={getAvatarUrl(comment)} alt={`${comment.author.name}'s Profile Image`} />
          </div>

          {/* NAME/DATE */}
          <div className="flex flex-col">
            <div className="comment_authorName font-sentinel__SemiBoldItal text-primary-500 text-h5">{comment.author.name}</div>
            <div className="comment_date text-neutral-500 text-sm">{formatDate(comment.date)}</div>
          </div>
        </div>

        {/* REPLY BUTTON */}
        {<div className="hover:cursor-pointer text-sm">
          <button className="underlined underline-offset-4 text-primary-600 outline-none focus:border-0" onClick={handleReplyClick}>Reply</button>
        </div>}
      </div>

      {/* COMMENT */}
      <div className="comment_body text-neutral-700" dangerouslySetInnerHTML={{ __html: comment.content }} />

      {/* REPLY FORM */}
      {showReplyForm &&
        <div className="">
          <CommentForm
            subForm={true}
            btnText="Reply"
            postId={postId}
            onComplete={commentOnCompelte}
            replyToComment={comment} />
        </div>}

      {/* COMMENT REPLIES */}
      <div className="border-l-4 border-neutral-300 pl-8 mt-8">
        {comment.replies?.map((reply) => <Comment key={reply.id} comment={reply} postId={postId} />).reverse()}
      </div>


    </div>
  )
}

export default Comment