import BasicSubmitBtn from "@App/components/buttons/basicSubmitBtn";
import { spinnerColors } from "@App/components/spinners/spinnerColors";
import { useResetForm, useSuccessModal } from "@App/hooks/formHooks";

import useSite from "@App/hooks/useSite";
import { Form, useActionData, useTransition } from "@remix-run/react"
import { AnimatePresence } from "framer-motion";
import { useRef } from "react";
import InputBase from "../input/inputBase";
import FormErrorMessage from "../messages/ErrorMessage";


interface Props {
  inputBg?: string
  type: string
}
// THIS FORM WILL ONLY SUBMIT WHEN AN INDEX PAGE HAS AN ACTION
// INDEX PAGE IS LOCATED /routes/learn-font-making/index.tsx
// ACTION IS CALLED lfmMiniCourseSignUpAction
const LfmMiniCourseSignUpForm = (props: Props) => {
  const { inputBg, type = 'default' } = props
  let actionData = useActionData<MiniCourseSignUpActionData | undefined>();
  const transition = useTransition()

  const { state: { metadata: { courseLaunchBanners: { lfmBanner } } } } = useSite()
  const formRef: any = useRef()

  useSuccessModal({
    status: actionData?.form?.[`${type}`]?.message === 'success',
    modalMessage: 'Check your email and click the link inside to watch the first video!'
  })

  useResetForm({
    status: actionData?.form?.[`${type}`]?.message === 'success',
    formRef
  })

  const ringOffset = type === 'steps' ? 'ring-offset-[#e8f3e9]' : 'ring-offset-white'

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
        {actionData?.fieldErrors?.[`${type}`]?.email && transition.state === 'idle' &&
          <FormErrorMessage
            id={'emailError'}
            message={'Invalid Email used'} />
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
              actionData?.fieldErrors?.[`${type}`]?.email
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
          <label className="inpot" htmlFor={`lastName-${type}`}>
            <span className="text-sm font-semibold text-grey-600">LastName</span>
            <input
              tabIndex={-1}
              className="inpot"
              autoComplete="off"
              type="text"
              id={`lastName-${type}`}
              name="lastName"
              placeholder="Your last name here" />
          </label>

          <BasicSubmitBtn
            loading={transition.state !== 'idle'}
            loadingText='Submitting...'
            text="Start Now"
            className={`text-white btn btn-primary btn-lg btn-primary-ring bg-lfm-blue-700 hover:bg-lfm-blue-700 hover:ring-lfm-blue-700 active:bg-lfm-blue-700 active:ring-lfm-blue-700 focus:bg-lfm-blue-700 focus:ring-lfm-blue-700 ${ringOffset} disabled:bg-lfm-blue-700 disabled:ring-lfm-blue-700 disabled:hover:bg-lfm-blue-700 disabled:text-navy-500 disabled:hover:text-navy-500 desktop:ml-4`}
            spinnerColors={spinnerColors.lfmBlueSolid}
          />

        </Form>
      </div>
    </>
  )
}

export default LfmMiniCourseSignUpForm