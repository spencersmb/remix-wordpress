import SignUpSuccess from "@App/components/modals/signUpSuccess";
import useSite from "@App/hooks/useSite";
import { Form, useActionData, useTransition } from "@remix-run/react"
import { AnimatePresence } from "framer-motion";
import { useEffect, useRef } from "react";
import InputBase from "../input/inputBase";
import FormErrorMessage from "../messages/ErrorMessage";

interface Props {
}
// THIS FORM WILL ONLY SUBMIT WHEN AN INDEX PAGE HAS AN ACTION
const LfmMiniCourseSignUpFormFooter = (props: Props) => {
  let actionData = useActionData<MiniCourseSignUpActionData | undefined>();
  const transition = useTransition()
  const { openModal, closeModal } = useSite()
  const formRef: any = useRef()
  useEffect(() => {
    if (actionData?.form?.footer === 'success') {
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
            message={actionData.formError.footer || ''} />
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
          <input type="hidden" name="_action" value={'footer'} />

          <button
            disabled={transition.state !== 'idle'}
            aria-disabled={transition.state !== 'idle'}
            type='submit'
            className="btn btn-sage-600 bg-lfm-blue-700 hover:bg-lfm-blue-700 hover:ring-lfm-blue-700 active:ring-4 active:bg-lfm-blue-700 desktop:max-h-[56px] desktop:ml-4 desktop:flex-1 ring-offset-lfm-pink-200">
            {transition.state === 'idle' ? 'Start Now' : '...Loading'}
          </button>
        </Form>
      </div>
    </>
  )
}

export default LfmMiniCourseSignUpFormFooter