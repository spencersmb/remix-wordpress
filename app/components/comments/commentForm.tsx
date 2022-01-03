import { FormEvent, useState } from "react";
import useSite from "~/hooks/useSite";
import { fetchSubmitComment } from "~/utils/fetch";
import { parseComment } from "~/utils/posts";
import { validateEmail } from "~/utils/validation";

interface ICommentResponse {
  createComment: {
    success: boolean,
    comment: IPostCommentRaw | null
  } // null means they havn't been approved yet
}

interface IProps {
  postId: number
  replyToComment?: IPostComment
  onComplete?: (response: ICommentResponse) => void
  primary?: boolean
  // onError: () => void
}
interface IFormError { name: undefined | string, email: undefined | string, comment: string | undefined }
const CommentForm = (props: IProps) => {
  const { addComment, addCommentReply } = useSite()

  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [comment, setComment] = useState<string>('');

  // used on the Reply to Comment flow, to still notify user their pending comment
  const [hideForm, setHideForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [pendingComment, setPendingComment] = useState(false)
  const [commentError, setCommentError] = useState<string | undefined>(undefined)
  const [formError, setFormError] = useState<IFormError>({ name: undefined, email: undefined, comment: undefined });


  function handleNameChange(event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) {
    setName(event.target.value)
  }

  function handleEmailChange(event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) {
    setEmail(event.target.value)
  }

  function handleCommentChange(event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) {
    setComment(event.target.value)
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    // reset comment error on submission
    if (commentError) {
      setCommentError(undefined)
    }

    if (typeof name !== 'string') {
      // TOOD: ERROR handling
      setFormError({
        ...formError,
        name: 'Invalid Name String type'
      })
      return
    }
    if (name.length < 4) {
      setFormError({
        ...formError,
        name: 'Name must be at least 4 letters long.'
      })
      return
    }
    if (typeof email !== 'string') {
      setFormError({
        ...formError,
        email: 'Invalid Email String type'
      })
      return
    }
    if (comment.length < 3) {
      setFormError({
        ...formError,
        comment: 'Comments must be at least 3 letters long.'
      })
      return
    }
    const notvalidEmail = validateEmail(email)

    if (notvalidEmail) {
      setFormError({
        ...formError,
        email: 'Invalid Email'
      })
      return
    }
    let parent = props.replyToComment ? props.replyToComment.databaseId : undefined
    try {
      setSubmitting(true)
      const result = await fetchSubmitComment({
        author: name,
        authorEmail: email,
        commentOn: props.postId,
        content: comment,
        parent
      })
      console.log('fetch result', result)

      setSubmitting(false)

      // if not the primary form, hide the reply form after a successful submission
      if (!props.primary) {
        setHideForm(true)
      }
      commentOnComplete(result, parent)

      // extra onComplete optional callback
      // used in the reply flow to completly close the form after submission because the form is triggered by state in <Comment />
      if (props.onComplete) {
        props.onComplete(result)
      }
    } catch (e: any) {
      commentOnError(e)
      setSubmitting(false)
    }
  }

  function commentOnComplete(response: ICommentResponse, parent: number | undefined) {
    setName('')
    setEmail('')
    setComment('')
    console.log('response Comment', response);

    // IF no comment response set Message so that the user knows their comment needs to be approved
    if (!response.createComment.comment) {
      setPendingComment(true)
    }

    // If comment data is available and it't not a "reply", add it to the master comment array
    if (response.createComment.comment && !parent) {
      // add comment to the top of the comment array
      addComment({
        comment: parseComment(response.createComment.comment)
      })
    } else if (response.createComment.comment && parent) {
      // add comment to the top spot of the parent nested item
      addCommentReply({
        comment: parseComment(response.createComment.comment)
      })
    }

  }

  function commentOnError(response: Error) {
    setCommentError(response.message)
  }
  return (
    <div>
      {commentError && <div><p dangerouslySetInnerHTML={{ __html: commentError }}></p></div>}
      {!hideForm && <form onSubmit={handleSubmit}>
        <label htmlFor="name-input" className="leading-7 text-sm text-gray-600">
          name:
          <input
            id="name-input"
            type="text"
            className="mb-8 w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            name="name"
            onChange={handleNameChange}
            value={name}
            aria-invalid={
              Boolean(
                formError.name
              ) || undefined
            }
            aria-describedby={
              formError.name
                ? "name-error"
                : undefined
            }
          />
          {formError.name ? (
            <p
              className="form-validation-error"
              role="alert"
              id="name-error"
            >
              {formError.name}
            </p>
          ) : null}
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
            aria-invalid={
              Boolean(
                formError.email
              ) || undefined
            }
            aria-describedby={
              formError.email
                ? "email-error"
                : undefined
            }
          />
          {formError.email ? (
            <p
              className="form-validation-error"
              role="alert"
              id="email-error"
            >
              {formError.email}
            </p>
          ) : null}
        </label>
        <label htmlFor="comment-input" className="leading-7 text-sm text-gray-600">
          comment label:
          <textarea
            id="comment-input"
            className="mb-8 w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            name="comment"
            onChange={handleCommentChange}
            value={comment}
            aria-invalid={
              Boolean(
                formError.comment
              ) || undefined
            }
            aria-describedby={
              formError.comment
                ? "comment-error"
                : undefined
            }
          />
          {formError.comment ? (
            <p
              className="form-validation-error"
              role="alert"
              id="comment-error"
            >
              {formError.comment}
            </p>
          ) : null}
        </label>
        <button
          type='submit'
          disabled={submitting}
        >
          {submitting ? 'Submitting Comment...' : 'Post Comment'}
        </button>
      </form>}
      {pendingComment && <div><p>Comment submitted successfully, but needs to be approved by Teela.</p></div>}
    </div>
  )
}

export default CommentForm