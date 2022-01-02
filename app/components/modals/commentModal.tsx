import { ChangeEventHandler, FormEvent, FormEventHandler, MouseEventHandler, useState } from 'react'
import { log } from 'xstate/lib/actions'
import useSite from '~/hooks/useSite'
import { CREATE_COMMENT } from '~/lib/graphql/mutations/comments'
import { fetchAPIClientSide } from '~/utils/fetch'
import { getGraphQLString } from '~/utils/graphqlUtils'
import { validateEmail } from '~/utils/validation'

interface ISubmitComment {
  commentOn: number
  content: string
  author: string
  authorEmail: string
  parent?: number
}
interface IProps {
  postId: number
  replyToComment?: IPostComment
  submitComment: (comment: ISubmitComment) => Promise<any>
}
const CommentForm = (props: IProps) => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [formError, setFormError] = useState<string>('');
  function handleNameChange(event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) {
    setName(event.target.value)
  }
  function handleEmailChange(event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) {
    setEmail(event.target.value)
  }
  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (typeof name !== 'string' || typeof email !== 'string') {
      // TOOD: ERROR handling
      setFormError('name or email not a string')
      return
    }
    const validEmail = validateEmail(email)

    if (validEmail) {
      setFormError('invalid email')
      return
    }
    await props.submitComment({
      author: name,
      authorEmail: email,
      commentOn: props.postId,
      content: '',
      parent: props.replyToComment ? props.replyToComment.databaseId : undefined
    })

  }
  return (
    <div>
      {formError && <div>{formError}</div>}
      <form onSubmit={handleSubmit}>
        <label htmlFor="name-input" className="leading-7 text-sm text-gray-600">
          name:
          <input
            id="name-input"
            type="text"
            className="mb-8 w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            name="name"
            onChange={handleNameChange}
            value={name}
          // aria-invalid={
          //   Boolean(
          //     actionData?.fieldErrors?.email
          //   ) || undefined
          // }
          // aria-describedby={
          //   actionData?.fieldErrors?.email
          //     ? "email-error"
          //     : undefined
          // }
          />
        </label>
        <label htmlFor="email-input" className="leading-7 text-sm text-gray-600">
          email:
          <input
            id="email-input"
            type="email"
            className="mb-8 w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            name="email"
            value={email}
            onChange={handleEmailChange}
          // aria-invalid={
          //   Boolean(
          //     actionData?.fieldErrors?.email
          //   ) || undefined
          // }
          // aria-describedby={
          //   actionData?.fieldErrors?.email
          //     ? "email-error"
          //     : undefined
          // }
          />
        </label>
        <label htmlFor="comment-input" className="leading-7 text-sm text-gray-600">
          comment label:
          <textarea
            id="comment-input"
            className="mb-8 w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            name="comment"
          // aria-invalid={
          //   Boolean(
          //     actionData?.fieldErrors?.email
          //   ) || undefined
          // }
          // aria-describedby={
          //   actionData?.fieldErrors?.email
          //     ? "email-error"
          //     : undefined
          // }
          />
        </label>
        <button type='submit'>Post Comment</button>
      </form>
    </div>
  )
}

function CommentModal() {
  const { state: { commentsModal } } = useSite()
  const [showReplyForm, setShowReplyForm] = useState(false)
  const testComment = {
    commentOn: commentsModal.commentOn,
    content: "This is a test reply pending, yo",
    author: "Spencer",
    authorEmail: "spencer.bigum@gmail.com",
    // parent: 36666 // HAD TO CHANGE THIS TO Int in plugin to work which is the databaseId in the comment
  }
  async function sendComment(comment: {
    commentOn: number
    content: string
    author: string
    authorEmail: string
    parent?: number
  }) {
    // must have name, email check in form
    console.log('send Comment', comment);
    // const res = await fetchAPIClientSide(getGraphQLString(CREATE_COMMENT), {
    //   variables: {
    //     input: { ...comment }
    //   }
    // })
    // console.log(res)
    if (comment.parent) {
      setShowReplyForm(false);
    }
    // IF no response set REsp so that the user knows their comment needs to be approved

    // If res has comment, then check for parent to place under the correct comment? Mabye create comments as an object instead
    // of an array to easily find the parent comment?

    // If comment is there, then add it to the responses below manually?

  }

  function handleReplyClick() {
    console.log('click', !showReplyForm)
    setShowReplyForm(!showReplyForm)
  }

  const replyToComment = (comment: any) => async (e: IClickEvent) => {
    e.preventDefault();
    const newComment = {

    }
    console.log('comment', comment)
  }

  if (commentsModal.show) {
    return (
      <div>
        Comment MODAL
        <CommentForm postId={commentsModal.commentOn} submitComment={sendComment} />

        {commentsModal.comments.length > 0 && <div>
          {commentsModal.comments.map((comment: IPostComment) =>
            <div key={comment.id}>
              <h3>{comment.author.name}</h3>
              <button onClick={handleReplyClick}>Reply</button>

              {showReplyForm && <div>
                Reply Form
                <CommentForm postId={commentsModal.commentOn} submitComment={sendComment} replyToComment={comment} />
              </div>}
            </div>
          )
          }
        </div>}
      </div>
    )
  }

  return null

}

export default CommentModal
