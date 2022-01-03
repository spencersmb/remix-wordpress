import { FormEvent, useState } from "react";
import useSite from "~/hooks/useSite";
import { fetchSubmitComment } from "~/utils/fetch";
import { parseComment } from "~/utils/posts";
import { validateEmail } from "~/utils/validation";

interface ICommentResponse {
  createComment: {
    success: boolean,
    comment: IPostCommentRaw
  } | null, // null means they havn't been approved yet
  parent: boolean
}

interface IProps {
  postId: number
  replyToComment?: IPostComment
  onComplete?: (response: ICommentResponse) => void
  primary?: boolean
  // onError: () => void
}

const CommentForm = (props: IProps) => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [comment, setComment] = useState<string>('');
  const [success, setSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [showNotApprovedMsg, setShowNotApprovedMsg] = useState(false)
  const [commentError, setCommentError] = useState<string | undefined>(undefined)
  const { addComment, addCommentReply } = useSite()
  const [formError, setFormError] = useState<{ name: undefined | string, email: undefined | string }>({ name: undefined, email: undefined });

  function handleNameChange(event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) {
    setName(event.target.value)
  }

  function handleEmailChange(event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) {
    setEmail(event.target.value)
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    // reset comment error on submission
    if (commentError) {
      setCommentError(undefined)
    }

    if (typeof name !== 'string') {
      // TOOD: ERROR handling
      setFormError({ email: formError.email, name: 'Invalid Name String type' })
      return
    }
    if (name.length < 4) {
      // TOOD: ERROR handling
      setFormError({ email: formError.email, name: 'Name must be at least 4 letters long.' })
      return
    }
    if (typeof email !== 'string') {
      // TOOD: ERROR handling
      setFormError({ name: formError.name, email: 'Invalid Email String type' })
      return
    }
    const notvalidEmail = validateEmail(email)

    if (notvalidEmail) {
      setFormError({ name: formError.name, email: 'Invalid Email String type' })
      return
    }
    try {
      setSubmitting(true)
      const result = await fetchSubmitComment({
        author: name,
        authorEmail: email,
        commentOn: props.postId,
        content: '',
        parent: props.replyToComment ? props.replyToComment.databaseId : undefined
      })

      setSubmitting(false)

      // check for errors
      if (result.errors) {
        setCommentError(result.errors[0].message)
        return
      }

      // if not the primary form, hide the reply form after a successful submission
      if (!props.primary) {
        setSuccess(true)
      }
      commentOnComplete(result.data)

      // extra onComplete optional callback
      // used in the reply flow to completly close the form after submission because the form is triggered by state in <Comment />
      if (props.onComplete) {
        props.onComplete(result.data)
      }
    } catch (e) {
      console.error(e)
      setSubmitting(false)
    }
  }

  function commentOnComplete(response: ICommentResponse) {
    setName('')
    setEmail('')
    setComment('')
    console.log('response Comment', response);

    // IF no comment response set Message so that the user knows their comment needs to be approved
    if (!response.createComment) {
      setShowNotApprovedMsg(true)
    }

    // If comment data is available and it't not a "reply", add it to the master comment array
    if (response.createComment && !response.parent) {
      // add comment to the top of the comment array
      addComment({
        comment: parseComment(response.createComment.comment)
      })
    } else if (response.createComment && response.parent) {
      // add comment to the top spot of the parent nested item
      addCommentReply({
        comment: parseComment(response.createComment.comment)
      })
    }

  }
  return (
    <div>
      {commentError && <div>{commentError}</div>}
      {!success && <form onSubmit={handleSubmit}>
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
          // aria-invalid={
          //   Boolean(
          //     formError.email
          //   ) || undefined
          // }
          // aria-describedby={
          //   actionData?.fieldErrors?.email
          //     ? "email-error"
          //     : undefined
          // }
          />
        </label>
        <button
          type='submit'
          disabled={submitting}
        >
          Post Comment
        </button>
      </form>}
      {showNotApprovedMsg && <div><p>Comment submitted successfully, but needs to be approved by Teela.</p></div>}
    </div>
  )
}

export default CommentForm