import SignUpSuccess from "@App/components/modals/signUpSuccess";
import useSite from "@App/hooks/useSite";
import { Form, useActionData, useTransition } from "@remix-run/react"
import type { Transition } from "@remix-run/react/transition";
import { AnimatePresence } from "framer-motion";
import { useEffect, useRef } from "react";
import InputBase from "../input/inputBase";
import FormErrorMessage from "../messages/ErrorMessage";


interface Props {
  inputBg?: string
  type: string
}
// THIS FORM WILL ONLY SUBMIT WHEN AN INDEX PAGE HAS AN ACTION
const LfmMiniCourseSignUpForm = (props: Props) => {
  const { inputBg, type = 'default' } = props
  let actionData = useActionData<MiniCourseSignUpActionData | undefined>();
  const transition = useTransition()

  const { openModal, closeModal, state: { metadata: { courseLaunchBanners: { lfmBanner } } } } = useSite()
  const formRef: any = useRef()
  useEffect(() => {

    if (actionData?.form?.[`${type}`]?.message === 'success') {
      openModal(
        {
          template: <SignUpSuccess
            message='Check your email and click the link inside to watch the first video!'
            closeModal={closeModal} />
        }
      )
    }
  }, [actionData, type])

  useEffect(() => {
    if (transition.state === 'submitting') {
      formRef.current?.reset()
    }
  }, [transition])

  return (
    <>
      {/*ERROR SUBMISSION*/}
      {/* @ts-ignore */}
      <AnimatePresence>
        {actionData?.formError?.[`${type}`]?.message && transition.state === 'idle' &&
          <FormErrorMessage
            id={'subscriberError'}
            message={actionData?.formError?.[`${type}`]?.message || ''} />
        }
        {actionData?.fieldErrors?.email && transition.state === 'idle' &&
          <FormErrorMessage
            id={'passwordError'}
            message={actionData?.fieldErrors.email} />
        }
      </AnimatePresence>
      <div className="login_form relative z-[2] mt-2 w-full">
        <Form
          ref={formRef}
          method='post' className="flex flex-col desktop:flex-row desktop:items-end" aria-describedby={
            actionData?.formError?.[`${type}`]
              ? "form-error-message"
              : undefined
          }>

          <InputBase
            label="Email"
            wrapperCss="desktop:flex-[1_1_45%]"
            labelCss="text-sm text-grey-600 font-semibold"
            className={`mt-2 mb-5 desktop:mb-0 ${inputBg}`}
            invalid={Boolean(
              actionData?.fieldErrors?.email
            ) || undefined}
            id={`email-${type}`}
            name={`email`}
            type='email'
            required={true}
            placeholder='Enter your email'
          />
          <input type="hidden" readOnly name="_action" value={type} />
          <input type="hidden" readOnly name="_openstatus"
            value={lfmBanner.minicourseSignup ? 'true' : 'false'} />

          {/* HONEYPOT */}
          <label className="inpot" htmlFor="lastName">
            <span className="text-sm font-semibold text-grey-600">Email</span>
            <input
              tabIndex={-1}
              className="inpot"
              autoComplete="off"
              type="text"
              id="lastName"
              name="lastName"
              placeholder="Your last name here" />
          </label>

          <button
            disabled={transition.state !== 'idle'}
            aria-disabled={transition.state !== 'idle'}
            type='submit'
            className="btn btn-sage-600 bg-lfm-blue-700 hover:bg-lfm-blue-700 hover:ring-lfm-blue-700 active:ring-4 active:bg-lfm-blue-700 desktop:max-h-[56px] desktop:ml-4 desktop:flex-1">
            {transition.state === 'idle' ? 'Start Now' : '...Loading'}
          </button>
        </Form>
      </div>
    </>
  )
}

export default LfmMiniCourseSignUpForm