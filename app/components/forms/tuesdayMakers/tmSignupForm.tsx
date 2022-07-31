import SignUpSuccess from '@App/components/modals/signUpSuccess';
import useSite from '@App/hooks/useSite';
import { Form, useActionData, useTransition } from '@remix-run/react';
import { AnimatePresence } from 'framer-motion';
import React, { useEffect, useRef } from 'react'
import InputBase from '../input/inputBase';
import FormErrorMessage from '../messages/ErrorMessage';

interface Props {
  inputBg?: string
  formName: string
}

function TmSignupForm(props: Props) {
  const { inputBg, formName = 'default' } = props
  let actionData = useActionData<RemixSignUpActionData | undefined>();
  const transition = useTransition()

  const { openModal, closeModal } = useSite()
  const formRef: any = useRef()
  useEffect(() => {

    if (actionData?.form?.[`${formName}`]?.message === 'success') {
      openModal(
        {
          template: <SignUpSuccess
            message='Check your email and click the link inside to complete the signup process!'
            closeModal={closeModal} />
        }
      )
    }
  }, [actionData, formName])

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
        {actionData?.formError?.[`${formName}`]?.message && transition.state === 'idle' &&
          <FormErrorMessage
            id={'subscriberError'}
            message={actionData?.formError?.[`${formName}`]?.message || ''} />
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
          method='post' className="flex flex-col tablet:flex-row tablet:items-end" aria-describedby={
            actionData?.formError?.[`${formName}`]
              ? "form-error-message"
              : undefined
          }>

          <InputBase
            label="Email"
            wrapperCss="tablet:flex-[1_1_45%]"
            labelCss="text-sm text-grey-600 font-semibold"
            className={`mt-2 mb-5 tablet:mb-0 ${inputBg}`}
            invalid={Boolean(
              actionData?.fieldErrors?.email
            ) || undefined}
            id={`email-${formName}`}
            name={`email`}
            type='email'
            required={true}
            placeholder='Enter your email'
          />
          <input type="hidden" readOnly name="_action" value={formName} />

          {/* HONEYPOT */}
          <label className="inpot" htmlFor="lastName">
            <span className="text-sm font-semibold text-grey-600">LastName</span>
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
            className="btn btn-sage-600 bg-lfm-blue-700 hover:bg-lfm-blue-700 hover:ring-lfm-blue-700 active:ring-4 active:bg-lfm-blue-700 tablet:max-h-[56px] tablet:ml-4 tablet:flex-1">
            {transition.state === 'idle' ? 'Sign Up' : '...Loading'}
          </button>

        </Form>
      </div>

    </>
  )
}

export default TmSignupForm
