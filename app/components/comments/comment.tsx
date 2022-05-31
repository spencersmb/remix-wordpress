import { useState } from "react"
import { formatDate } from "@App/utils/posts"
import CommentForm from "./commentForm"

interface ICommentProps {
  comment: IPostComment
  postId: number
  isReply?: boolean
}

/**
* @Component Comment - Ued on BLOG article
* @teststed - 5/28/2022
*/
const Comment = (props: ICommentProps) => {
  const { comment, postId, isReply = false } = props

  const [showReplyForm, setShowReplyForm] = useState(false)

  function handleReplyClick() {
    // console.log('comment', comment);

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
  const testID = `comment${isReply ? '-reply' : ""}`
  return (
    <div data-testid={testID} key={comment.id} className={`mb-12`}>

      {/* IMAGE, NAME, DATE */}
      <div className="flex flex-row justify-between mb-3 comment_header">
        <div className="flex flex-row items-center justify-center">
          {/* IMAGE */}
          <div className="w-[54px] h-[54px] rounded-full overflow-hidden mr-3">

            {/* eslint-disable-next-line jsx-a11y/no-redundant-roles */}
            <img role={'img'} className="w-full" src={getAvatarUrl(comment)}
              alt={`${comment.author.name}'s Profile `} />
          </div>

          {/* NAME/DATE */}
          <div className="flex flex-col">
            <div className="comment_authorName font-sentinel__SemiBoldItal text-primary-500 text-h5">{comment.author.name}</div>
            <div className="text-sm comment_date text-neutral-500">{formatDate(comment.date)}</div>
          </div>
        </div>

        {/* REPLY BUTTON */}
        {<div className="text-sm hover:cursor-pointer">
          <button
            data-testid="comment-reply-button"
            className="outline-none underlined underline-offset-4 text-primary-600 focus:border-0" onClick={handleReplyClick}>Reply</button>
        </div>}
      </div>

      {/* COMMENT */}
      <div data-testid="comment-body" className="comment_body text-neutral-700" dangerouslySetInnerHTML={{ __html: comment.content }} />

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
      <div aria-label="comment-replies" className="pl-8 mt-8 border-l-4 border-neutral-300">
        {comment.replies?.map((reply) => <Comment isReply={true} key={reply.id} comment={reply} postId={postId} />).reverse()}
      </div>


    </div>
  )
}

export default Comment