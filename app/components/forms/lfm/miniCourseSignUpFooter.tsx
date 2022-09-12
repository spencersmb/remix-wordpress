import BasicSubmitBtn from "@App/components/buttons/basicSubmitBtn";
import SignUpSuccess from "@App/components/modals/signUpSuccess";
import { spinnerColors } from "@App/components/spinners/spinnerColors";
import useSite from "@App/hooks/useSite";
import { Form, useActionData, useTransition } from "@remix-run/react"
import { AnimatePresence } from "framer-motion";
import { useEffect, useRef } from "react";
import InputBase from "../input/inputBase";
import FormErrorMessage from "../messages/ErrorMessage";

interface Props {
}
// TODO: TRY TESTING WITH NEW WRAPPER
// THIS FORM WILL ONLY SUBMIT WHEN AN INDEX PAGE HAS AN ACTION
const LfmMiniCourseSignUpFormFooter = (props: Props) => {
  let actionData = useActionData<MiniCourseSignUpActionData | undefined>();
  const transition = useTransition()
  const { openModal, closeModal, state: { metadata: { courseLaunchBanners: { lfmBanner } } } } = useSite()
  const formRef: any = useRef()

  useEffect(() => {
    if (actionData?.form?.footer?.message === 'success') {
      openModal(
        {
          template: <SignUpSuccess
            message='Check your email and click the link inside to watch the first video!'
            closeModal={closeModal} />
        }
      )
    }
  }, [actionData])

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
        {actionData?.formError?.footer && transition.state === 'idle' &&
          <FormErrorMessage
            id={'subscriberError'}
            message={actionData.formError.footer.message || ''} />
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
          method='post'
          data-testid="lfm-mc-signup-footer"
          className="flex flex-col desktop:flex-row desktop:items-end" aria-describedby={
            actionData?.formError?.footer
              ? "form-error-message"
              : undefined
          }>

          <InputBase
            label="Email"
            wrapperCss="desktop:flex-[1_1_45%]"
            labelCss="text-sm text-grey-600 font-semibold"
            className={`mt-2 mb-5 desktop:mb-0 bg-grey-100 tablet:bg-white tablet:ring-offset-lfm-pink-200`}
            invalid={Boolean(
              actionData?.fieldErrors?.email
            ) || undefined}
            id={`email-footer`}
            name={`email`}
            type='email'
            required={true}
            placeholder='Enter your email'
          />
          <input type="hidden" readOnly name="_action" value={'footer'} />
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

          <BasicSubmitBtn
            loading={transition.state !== 'idle'}
            loadingText='Submitting...'
            text="Start Now"
            className="text-white btn btn-primary btn-lg btn-primary-ring bg-lfm-blue-700 hover:bg-lfm-blue-700 hover:ring-lfm-blue-700 active:bg-lfm-blue-700 active:ring-lfm-blue-700 focus:bg-lfm-blue-700 focus:ring-lfm-blue-700 ring-offset-lfm-pink-200 disabled:bg-lfm-blue-700 disabled:ring-lfm-blue-700 disabled:hover:bg-lfm-blue-700 disabled:text-navy-500 disabled:hover:text-navy-500 desktop:ml-4"
            spinnerColors={spinnerColors.lfmBlueSolid}
          />
        </Form>
      </div>
    </>
  )
}

export default LfmMiniCourseSignUpFormFooter