import { AnimatePresence, motion } from "framer-motion";
import type { FormEvent } from "react";
import { useEffect, useState } from "react";
import useSite from "@App/hooks/useSite";
import { fetchSubmitComment } from "@App/utils/fetch.cleint";
import { parseComment } from "@App/utils/posts";
import { validateEmail } from "@App/utils/validation";
import InputBase from "../forms/input/inputBase";
import CommentsSvg from "../svgs/commentsSvg";
import TwSpinnerOne from "../svgs/spinners/twSpinnerOne";
import { consoleHelper } from "@App/utils/windowUtils";

interface ICommentResponse {
  createComment: {
    success: boolean,
    comment: IPostCommentRaw | null
  } // null means they havn't been approved yet
}
/**
* @Component CommentForm - USed on BLOG article
* @teststed - Not tested yet 
*/
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

interface IState {
  form: IFormState
  submitting: boolean
  hideForm: boolean
  pendingComment: boolean
  status: string
  // 'idle' | 'submitting' | 'success' | 'error'
  commentError: undefined | string
}
const initFormState = {
  form: {
    ...defaultFormState
  },
  submitting: false,
  hideForm: false,
  pendingComment: false,
  status: 'idle',
  commentError: undefined
}



/**
* @Component CommentForm
* @teststed - 5/31/2022
*/
const CommentForm = (props: IProps) => {
  const { addComment, addCommentReply } = useSite()
  const [globalFormState, setGlobalFormState] = useState<IState>(initFormState)
  const buttonText = 'Post Comment'
  const { submitting, form, pendingComment, commentError, hideForm } = globalFormState

  function handleNameChange(event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) {
    const isValid = validateName(event.target.value);
    let error = undefined;

    if (!isValid) {
      error = {
        name: 'name',
        message: 'Name must be at least 2 characters long'
      }
    }

    setGlobalFormState({
      ...globalFormState,
      form: {
        ...globalFormState.form,
        error,
        name: {
          value: event.target.value,
          touched: true,
          isValid
        }
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
    setGlobalFormState({
      ...globalFormState,
      form: {
        ...globalFormState.form,
        error,
        email: {
          value: emailAddress,
          touched: true,
          isValid: !invalidEmail
        }
      }
    })
    // setFormState({
    //   ...formState,
    //   error,
    //   email: {
    //     value: emailAddress,
    //     touched: true,
    //     isValid: !invalidEmail
    //   }
    // })
  }

  function handleCommentChange(event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) {
    setGlobalFormState({
      ...globalFormState,
      form: {
        ...globalFormState.form,
        comment: {
          value: event.target.value,
          touched: true,
          isValid: true
        }
      }
    })
    // setFormState({
    //   ...formState,
    //   comment: {
    //     value: event.target.value,
    //     touched: true,
    //     isValid: true
    //   }
    // })
  }

  function validateName(name: string) {
    if (typeof name !== 'string' || name.length < 4) {
      return false
    }
    return true
  }

  async function handleSubmitUpdated(event: FormEvent) {
    const { form } = globalFormState
    event.preventDefault();

    setGlobalFormState({
      ...globalFormState,
      submitting: true
    })

    // If we are replying to a comment, we need to get the parent reply comment id
    // Otherwise, we just use the post database id
    let parent = props.replyToComment
      ? props.replyToComment.parent   // if replyToComment.parent is defined, then we are replying to a comment
        ? props.replyToComment.parent
        : props.replyToComment.databaseId
      : undefined

    try {
      const result = await fetchSubmitComment({
        author: form.name.value,
        authorEmail: form.email.value,
        commentOn: props.postId,
        content: form.comment.value,
        parent
      })

      consoleHelper('fetch result', result, '/components/comments/commentForm.tsx')

      // If three is no comment, then the user is not authorized to update the comment right away
      if (!result.createComment.comment) {

        setGlobalFormState({
          ...globalFormState,
          form: {
            ...defaultFormState
          },
          hideForm: true,
          pendingComment: true,
          submitting: false
        })

      }
      // if not the primary form, hide the reply form after a successful submission
      else if (!props.primary) {
        setGlobalFormState({
          ...globalFormState,
          form: {
            ...defaultFormState
          },
          hideForm: true,
          submitting: false
        })
      } else {
        setGlobalFormState({
          ...globalFormState,
          form: {
            ...defaultFormState
          },
          submitting: false
        })
      }

      // after submission update the comment state reducer
      commentOnComplete(result, parent)

      // optionally call the onComplete callback

      if (props.onComplete) {
        props.onComplete(result)
      }
    } catch (e: any) {
      setGlobalFormState({
        ...globalFormState,
        commentError: e.message,
        submitting: false
      })

    }
  }

  function commentOnComplete(response: ICommentResponse, parent: number | undefined) {
    // setFormState(defaultFormState)

    consoleHelper('response Comment', response, '/components/comments/commentForm.tsx');

    // IF no comment response set Message so that the user knows their comment needs to be approved
    // if (!response.createComment.comment) {
    //   setGlobalFormState({
    //     ...initFormState,
    //     hideForm: true,
    //     pendingComment: true
    //   })
    //   // setHideForm(true)
    //   // setPendingComment(true)
    // }

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

  function renderForm() {
    return (
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
          data-testid="comment-form"
          className={`${props.subForm ? 'px-2 py-6' : 'px-6 py-8 tablet:px-12 laptop:pr-10'}`} onSubmit={handleSubmitUpdated}>

          {/* INPUTS */}
          <fieldset>
            <legend>Create Comment</legend>
            <div className="flex flex-col tablet:flex-row tablet:flex-wrap">
              {/* NAME */}
              <div className="flex-auto tablet:flex-[0_1_50%] tablet:pr-5">
                <InputBase
                  placeholder="Enter Name"
                  className={`input-basic ${form.name.isValid && form.name.touched
                    ? 'input-success'
                    : form.name.isValid === false && form.name.touched ? 'input-error' : ''}`}
                  id="name-input"
                  type="text"
                  name='name'
                  label="Comment Name"
                  onChange={handleNameChange}
                  value={form.name.value}
                  invalid={form.name.isValid === false || form.name.value.length < 4}
                  disabled={submitting}
                />
              </div>

              {/* EMAIL */}
              <div className="flex-auto tablet:flex-[0_1_50%]">
                <InputBase
                  placeholder="email@gmail.com"
                  className={`input-basic ${form.email.isValid && form.email.touched
                    ? 'input-success'
                    : form.email.isValid === false && form.email.touched ? 'input-error' : ''}`}
                  id="email-input"
                  type="email"
                  name='email'
                  label="Comment Email"
                  onChange={handleEmailChange}
                  value={form.email.value}
                  required
                  invalid={form.email.isValid === false}
                  disabled={submitting}
                />
              </div>

              {/* TEXTAREA */}
              <div className=" flex-[0_1_100%] mb-2.5">
                <textarea
                  id="comment-input"
                  className="textarea-basic"
                  name="comment"
                  required
                  aria-label="Comment Body"
                  placeholder="Leave comment here..."
                  onChange={handleCommentChange}
                  rows={4}
                  disabled={submitting}
                  value={form.comment.value}
                  // TODO: Fix Invalid status on all inputs
                  aria-invalid={
                    Boolean(
                      form.comment.isValid
                    ) || undefined
                  }
                  aria-describedby={
                    form.comment.isValid
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
                disabled={submitting || !form.name.isValid || !form.email.isValid || !form.comment.isValid}
                data-testid="submit-comment-button"
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
                {commentError && <div
                  data-testid="comment-error"
                  className="overflow-hidden text-sm italic form-validation-error text-error-500">
                  <p className="pb-4 pr-2" dangerouslySetInnerHTML={{ __html: commentError }}></p>
                </div>}

                {/* FORM ERROR */}
                {form.error
                  ?
                  <motion.div
                    data-testid="form-error"
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
                      {form.error.message}
                    </div>
                  </motion.div>
                  : null

                }
              </AnimatePresence>
            </div>
          </div>

        </form>
      </motion.div>
    )
  }

  // IN order to pass test we need to render the form without it being wrapped in AnimatePresence
  // because it blocks the state updaet for some reason.
  if (process.env.NODE_ENV !== 'test') {
    return (
      <div className="mb-4">

        {/* @ts-ignore */}
        <AnimatePresence>
          {!hideForm ?
            renderForm()
            : null
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
  return (
    <div className="mb-4">
      {/* @ts-ignore */}
      {!hideForm && renderForm()}
      {/* {!hideForm && renderForm()} */}
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
    </div>
  )
}

export default CommentForm