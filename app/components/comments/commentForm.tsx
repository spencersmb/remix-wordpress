import { AnimatePresence, motion } from "framer-motion";
import type { FormEvent } from "react";
import { useEffect, useState } from "react";
import useSite from "@App/hooks/useSite";
import { fetchSubmitComment } from "@App/utils/fetch.cleint";
import { parseComment } from "@App/utils/posts";
import { validateEmail } from "@App/utils/validation";
import InputBase from "../input/inputBase";
import CommentsSvg from "../svgs/commentsSvg";
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
  btnText?: string
  subForm?: boolean
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
const defaultFormState: IFormState = {
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
}
const CommentForm = (props: IProps) => {
  const { addComment, addCommentReply } = useSite()
  const [formState, setFormState] = useState<IFormState>(defaultFormState);

  // used on the Reply to Comment flow, to still notify user their pending comment
  const [hideForm, setHideForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [pendingComment, setPendingComment] = useState(false)
  const [commentError, setCommentError] = useState<string | undefined>(undefined)

  const buttonText = props.btnText || 'Post Comment'


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

    let parent = props.replyToComment
      ? props.replyToComment.parent   // if replyToComment.parent is defined, then we are replying to a comment
        ? props.replyToComment.parent
        : props.replyToComment.databaseId
      : undefined

    try {
      setSubmitting(true)
      const result = await fetchSubmitComment({
        author: formState.name.value,
        authorEmail: formState.email.value,
        commentOn: props.postId,
        content: formState.comment.value,
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
    setFormState(defaultFormState)
    console.log('response Comment', response);

    // IF no comment response set Message so that the user knows their comment needs to be approved
    if (!response.createComment.comment) {
      setHideForm(true)
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
    <div className="mb-4">
      {/* @ts-ignore */}
      <AnimatePresence>
        {!hideForm ?
          <motion.div
            variants={{
              visible: { height: "auto" },
              hidden: { height: 0 },
            }}
            key="content"
            initial="visible"
            animate="visible"
            exit="hidden"
            id="form-motion"
            className="overflow-hidden"
          >

            <form
              aria-label="Comment Form"
              className={`${props.subForm ? 'px-2 py-6' : 'px-6 py-8 tablet:px-12 laptop:pr-10'}`} onSubmit={handleSubmit}>

              {/* INPUTS */}
              <fieldset>
                <legend>Create Comment</legend>
                <div className="flex flex-col tablet:flex-row tablet:flex-wrap">
                  {/* NAME */}
                  <div className="flex-auto tablet:flex-[0_1_50%] tablet:pr-5">
                    <InputBase
                      placeholder="Enter Name"
                      className={`input-basic ${formState.name.isValid && formState.name.touched
                        ? 'input-success'
                        : formState.name.isValid === false && formState.name.touched ? 'input-error' : ''}`}
                      id="name-input"
                      type="text"
                      name='name'
                      onChange={handleNameChange}
                      value={formState.name.value}
                      invalid={formState.name.isValid === false || formState.name.value.length < 4}
                      disabled={submitting}
                    />
                  </div>

                  {/* EMAIL */}
                  <div className="flex-auto tablet:flex-[0_1_50%]">
                    <InputBase
                      placeholder="email@gmail.com"
                      className={`input-basic ${formState.email.isValid && formState.email.touched
                        ? 'input-success'
                        : formState.email.isValid === false && formState.email.touched ? 'input-error' : ''}`}
                      id="email-input"
                      type="email"
                      name='email'
                      onChange={handleEmailChange}
                      value={formState.email.value}
                      required
                      invalid={formState.email.isValid === false}
                      disabled={submitting}
                    />
                  </div>

                  {/* TEXTAREA */}
                  <div className=" flex-[0_1_100%] mb-2.5">
                    <textarea
                      id="comment-input"
                      className="textarea-basic"
                      name="comment"
                      placeholder="Leave comment here..."
                      onChange={handleCommentChange}
                      rows={4}
                      disabled={submitting}
                      value={formState.comment.value}
                      // TODO: Fix Invalid status on all inputs
                      aria-invalid={
                        Boolean(
                          formState.comment.isValid
                        ) || undefined
                      }
                      aria-describedby={
                        formState.comment.isValid
                          ? "comment-error"
                          : undefined
                      }
                    />
                  </div>
                </div>
              </fieldset>

              {/* END INPUTS */}

              {/* SUBMIT BUTTON */}
              <div className="flex flex-col-reverse tablet:items-end">
                <div>
                  <button
                    disabled={submitting || !formState.name.isValid || !formState.email.isValid || !formState.comment.isValid}
                    aria-disabled={submitting || !formState.name.isValid || !formState.email.isValid || !formState.comment.isValid}
                    type='submit'
                    className={`w-full text-primary-600 font-semibold px-5 py-4 rounded-lg hover:ring focus:ring ring-offset-4 text-base outline-none duration-200 ease-in-out flex flex-1 flex-row justify-center items-center disabled:bg-neutral-200 disabled:text-neutral-400 disabled:hover:ring-0 disabled:hover:ring-offset-0 active:scale-[.98] ${'bg-secondary-400 hover:ring-secondary-400 hover:bg-secondary-400 ring-offset-white focus:ring-secondary-400 active:bg-secondary-500 active:scale-[.98]'} tablet:w-auto`}>
                    {(submitting) && <TwSpinnerOne />}
                    {submitting ? '...processing' : buttonText}
                  </button>
                </div>

                {/* Error MESSAGE */}
                <div>
                  {/* @ts-ignore */}
                  <AnimatePresence>
                    {/* SERVER ERROR */}
                    {commentError && <div className="overflow-hidden text-sm italic form-validation-error text-error-500">
                      <p className="pb-4 pr-2" dangerouslySetInnerHTML={{ __html: commentError }}></p>
                    </div>}

                    {/* FORM ERROR */}
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
                        className="overflow-hidden text-sm italic form-validation-error text-error-500"
                        role="alert"
                        id="name-error"
                        transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
                      >
                        <div className="pb-4 pr-4">
                          {formState.error.message}
                        </div>
                      </motion.div>
                      : null

                    }
                  </AnimatePresence>
                </div>
              </div>

            </form>
          </motion.div> : null
        }

        {pendingComment &&
          <motion.div
            variants={{
              visible: { height: "auto", opacity: 1 },
              hidden: { height: 0, opacity: 0 },
            }}
            key="form-notify"
            initial="hidden"
            animate="visible"
            exit="hidden"
            id="form-notify"
            className={`overflow-hidden`}>
            <div className={`${props.subForm ? 'mt-4' : 'm-6'} bg-teal-200 text-teal-600 flex flex-row justify-center items-center rounded-lg px-3 py-3`}>
              <div className="w-[24px] h-[24px] mr-4">
                <CommentsSvg stroke={`#0c9488`} />
              </div>
              <p>Comment submitted successfully, but needs to be approved by Teela.</p>
            </div>

          </motion.div>
        }
      </AnimatePresence>



    </div>
  )
}

export default CommentForm