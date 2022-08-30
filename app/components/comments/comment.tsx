import { useState } from "react"
import { formatDate } from "@App/utils/posts"
import CommentForm from "./commentForm"
import { AnimatePresence, motion } from "framer-motion"
import { classNames } from "@App/utils/appUtils"

interface ICommentProps {
  comment: IPostComment
  postId: number
  isReply?: boolean
  index: number
}

/**
* @Component Comment - Used on BLOG article
* @teststed - 5/28/2022
*/
const Comment = (props: ICommentProps) => {
  const { comment, postId, index, isReply = false } = props

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
    <div data-testid={testID} key={comment.id} className={`mb-6`}>

      {/* IMAGE, NAME, DATE */}
      <div className={classNames(isReply ? 'px-3 tablet:px-6' : 'px-6 tablet:px-12', 'flex flex-row justify-between mb-3 comment_header')}>
        <div className="flex flex-row items-center justify-center">
          {/* IMAGE */}
          <div className="w-[54px] h-[54px] rounded-full overflow-hidden mr-3">

            {/* eslint-disable-next-line jsx-a11y/no-redundant-roles */}
            <img role={'img'} className="w-full" src={getAvatarUrl(comment)}
              alt={`${comment.author.name}'s Profile `} />
          </div>

          {/* NAME/DATE */}
          <div className="flex flex-col">
            <div className="comment_authorName font-sentinel__SemiBoldItal text-sage-600 text-h5">{comment.author.name}</div>
            <div className="text-sm comment_date text-grey-500">{formatDate(comment.date)}</div>
          </div>
        </div>

        {/* REPLY BUTTON */}
        {<div className="text-sm hover:cursor-pointer">
          <button
            data-testid="comment-reply-button"
            className="font-semibold outline-none underlined underline-offset-4 text-sage-700 focus:border-0 after:underlineAnimation"
            onClick={handleReplyClick}>
            Reply
          </button>
        </div>}
      </div>

      {/* COMMENT */}
      <div data-testid="comment-body" className="px-6 comment_body text-grey-700 tablet:px-12" dangerouslySetInnerHTML={{ __html: comment.content }} />

      {/* REPLY FORM */}
      <AnimatePresence>
        {showReplyForm &&
          <motion.div
            variants={{
              enter: { height: "auto" },
              exit: { height: 0 },
              initial: { height: 0 },
            }}
            key="content"
            initial={'initial'}
            exit={'exit'}
            animate={'enter'}
            id="form-motion"
            className="overflow-hidden"
          >
            <div className="mt-4">
              <div className="px-6 py-4 bg-grey-100">
                <CommentForm
                  subForm={true}
                  btnText="Reply"
                  postId={postId}
                  onComplete={commentOnCompelte}
                  index={index}
                  replyToComment={comment} />
              </div>
            </div>
          </motion.div>}
      </AnimatePresence>

      {/* COMMENT REPLIES */}
      <div aria-label="comment-replies" className="ml-6 tablet:ml-12">
        {comment.replies?.map((reply) =>
          <div key={postId} className='mt-8 border-l-4 border-grey-300'>
            <Comment
              index={index}
              isReply={true}
              comment={reply}
              postId={postId} />
          </div>
        ).reverse()}
      </div>


    </div>
  )
}

export default Comment