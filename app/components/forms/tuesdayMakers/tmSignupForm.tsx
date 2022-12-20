import BasicSubmitBtn from '@App/components/buttons/basicSubmitBtn';
import { spinnerColors } from '@App/components/spinners/spinnerColors';
import { useResetForm, useSuccessModal } from '@App/hooks/formHooks';
import { classNames } from '@App/utils/appUtils';
import { Form, useActionData, useTransition } from '@remix-run/react';
import { AnimatePresence } from 'framer-motion';
import { useRef } from 'react'
import InputBase from '../input/inputBase';
import FormErrorMessage from '../messages/ErrorMessage';

interface Props {
  inputBg?: string
  buttonStyles?: string
  formName: string
  row?: boolean
  labelStyles?: string
}

// USED: On the Tuesday Makers Homepage Template
function TmSignupForm(props: Props) {
  const { inputBg, formName = 'default', buttonStyles, labelStyles, row = true } = props
  let actionData = useActionData<RemixSignUpActionData | undefined>();
  const transition = useTransition()
  const formRef: any = useRef()
  const defaultBtnStyles = 'btn-primary btn-primary-ring'
  const btnStyles = classNames(buttonStyles ? buttonStyles : defaultBtnStyles, `btn btn-flex btn-xl`)

  useSuccessModal({
    status: actionData?.form?.[`${formName}`]?.message === 'success',
  })

  useResetForm({
    status: transition.state === 'submitting' && actionData?.form?.[`${formName}`]?.message === 'success',
    formRef
  })

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

      <div className="login_form relative z-[2] w-full">
        <Form
          ref={formRef}
          method='post' className={classNames(row
            ? 'tablet:flex-row tablet:items-end'
            : '', 'flex flex-col ')} aria-describedby={
              actionData?.formError?.[`${formName}`]
                ? "form-error-message"
                : undefined
            }>

          <InputBase
            label="Email"
            wrapperCss={classNames(row ? 'mr-5' : '', 'tablet:flex-[1_1_45%]')}
            labelCss={classNames(labelStyles ? labelStyles : '', 'text-sm font-semibold')}
            className={classNames(row ? '' : 'mb-6', `mt-2 input-field-xl ${inputBg}`)}
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
              id={`lastName-${formName}`}
              name="lastName"
              placeholder="Your last name here" />
          </label>

          <BasicSubmitBtn
            loading={transition.state !== 'idle' && transition.state === 'submitting'}
            loadingText="Submitting..."
            text='Sign Up'
            spinnerColors={spinnerColors.sageSolid}
            className={btnStyles}
          />

        </Form>
      </div>

    </>
  )
}

export default TmSignupForm
