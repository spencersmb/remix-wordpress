import { AnimatePresence, motion } from "framer-motion";
import { FormEvent, useEffect, useState } from "react";
import useSite from "~/hooks/useSite";
import { fetchSubmitComment } from "~/utils/fetch";
import { parseComment } from "~/utils/posts";
import { validateEmail } from "~/utils/validation";
import { consoleHelper } from "~/utils/windowUtils";
import SubmitBtn from "../buttons/submitBtn";
import InputBase from "../input/inputBase";
import TwSpinnerOne from "../svgs/spinners/twSpinnerOne";

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
interface InputError {
  name: string
  message: string
}
interface IFormError { name: undefined | string, email: undefined | string, comment: string | undefined }
interface IFormState {
  error: undefined | InputError
  name: {
    value: string
    touched: boolean
    isValid: boolean | undefined
  }
  email: {
    value: string
    touched: boolean
    isValid: boolean | undefined
  }
  comment: {
    value: string
    touched: boolean
    isValid: boolean | undefined
  }
}
const CommentForm = (props: IProps) => {
  const { addComment, addCommentReply } = useSite()

  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [formState, setFormState] = useState<IFormState>({
    error: undefined,
    name: {
      value: '',
      touched: false,
      isValid: undefined
    },
    email: {
      value: '',
      touched: false,
      isValid: undefined
    },
    comment: {
      value: '',
      touched: false,
      isValid: undefined
    }
  });
  const [emailTouched, setEmailTouched] = useState<boolean>(false);
  const [comment, setComment] = useState<string>('');

  // used on the Reply to Comment flow, to still notify user their pending comment
  const [hideForm, setHideForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [pendingComment, setPendingComment] = useState(false)
  const [commentError, setCommentError] = useState<string | undefined>(undefined)
  const [formError, setFormError] = useState<IFormError>({ name: undefined, email: undefined, comment: undefined });


  function handleNameChange(event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) {
    const isValid = validateName(event.target.value);
    let error = undefined;

    if (!isValid) {
      error = {
        name: 'name',
        message: 'Name must be at least 2 characters long'
      }
    }
    setFormState({
      ...formState,
      error,
      name: {
        value: event.target.value,
        touched: true,
        isValid
      }
    })
  }

  useEffect(() => {

  }, [formState.name.isValid, formState.email.isValid, formState.comment.isValid])

  function handleEmailChange(event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) {
    let emailAddress = event.target.value
    const invalidEmail = Boolean(typeof validateEmail(emailAddress) === 'string')
    let error = undefined;
    if (invalidEmail) {
      error = {
        name: 'email',
        message: 'Email is invalid'
      }
    }
    setFormState({
      ...formState,
      error,
      email: {
        value: emailAddress,
        touched: true,
        isValid: !invalidEmail
      }
    })
  }

  function handleCommentChange(event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) {
    setFormState({
      ...formState,
      comment: {
        value: event.target.value,
        touched: true,
        isValid: true
      }
    })
  }

  function validateName(name: string) {
    if (typeof name !== 'string' || name.length < 4) {
      return false
    }
    return true
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

        {/* INPUTS */}
        <div className="flex flex-col mt-8 tablet:flex-row  tablet:flex-wrap">
          {/* NAME */}
          <div className=" flex-auto tablet:flex-[0_1_50%] tablet:pr-5">
            <InputBase
              placeholder="Name"
              className={`input-basic ${formState.name.isValid && formState.name.touched
                ? 'input-success'
                : formState.name.isValid === false && formState.name.touched ? 'input-error' : ''}`}
              id="name-input"
              type="text"
              name='name'
              onChange={handleNameChange}
              value={formState.name.value}
              invalid={formError.name !== undefined || name.length < 4}
              disabled={submitting}
            />
          </div>

          {/* EMAIL */}
          <div className="flex-auto tablet:flex-[0_1_50%]">
            <InputBase
              placeholder="Email"
              className={`input-basic ${formState.email.isValid && formState.email.touched
                ? 'input-success'
                : formState.email.isValid === false && formState.email.touched ? 'input-error' : ''}`}
              id="email-input"
              type="email"
              name='email'
              onChange={handleEmailChange}
              value={formState.email.value}
              required
              invalid={formError.email !== undefined}
              disabled={submitting}
            />
          </div>

          {/* TEXTAREA */}
          <div className=" flex-[0_1_100%]">
            <textarea
              id="comment-input"
              className="text-neutral-500 bg-neutral-100 outline-none border-0 py-4 px-5 rounded-lg w-full mb-2.5"
              name="comment"
              placeholder="Leave comment here..."
              onChange={handleCommentChange}
              rows={4}
              value={formState.comment.value}
              // TODO: Fix Invalid status on all inputs
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
          </div>
        </div>
        {/* END INPUTS */}

        {/* SUBMIT BUTTON */}
        <div className="flex justify-end flex-col-reverse items-end">
          <div>
            <button
              disabled={submitting || !formState.name.isValid || !formState.email.isValid || !formState.comment.isValid}
              aria-disabled={submitting || !formState.name.isValid || !formState.email.isValid || !formState.comment.isValid}
              type='submit'
              className={`text-primary-600 font-semibold px-5 py-4 rounded-lg hover:ring focus:ring ring-offset-4 text-base outline-none duration-200 ease-in-out flex flex-1 flex-row justify-center items-center disabled:bg-neutral-200 disabled:text-neutral-400 disabled:hover:ring-0 disabled:hover:ring-offset-0 active:scale-[.98] ${'bg-secondary-400 hover:ring-secondary-400 hover:bg-secondary-400 ring-offset-white focus:ring-secondary-400 active:bg-secondary-500 active:scale-[.98]'}`}>
              {(submitting) && <TwSpinnerOne />}
              {submitting ? '...processing' : 'Post Comment'}
            </button>
          </div>
          <div>
            <AnimatePresence >
              {formState.error
                ?
                <motion.div
                  variants={{
                    visible: { height: "auto" },
                    initial: { height: 0 },
                  }}
                  key="content"
                  initial="initial"
                  animate="visible"
                  exit="initial"
                  className="form-validation-error text-error-500 italic text-sm overflow-hidden"
                  role="alert"
                  id="name-error"
                  transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
                >
                  <div className="pb-4">
                    {formState.error.message}
                  </div>
                </motion.div>
                : null

              }
            </AnimatePresence>

          </div>
        </div>
      </form>}
      {pendingComment && <div><p>Comment submitted successfully, but needs to be approved by Teela.</p></div>}
    </div>
  )
}

export default CommentForm