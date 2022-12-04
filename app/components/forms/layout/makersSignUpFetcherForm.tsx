import SubmitFetcherBtn from '@App/components/buttons/submitFetchBtn'
import { spinnerColors } from '@App/components/spinners/spinnerColors'
import { useResetForm } from '@App/hooks/formHooks'
import type { FormProps } from '@remix-run/react'
import { AnimatePresence } from 'framer-motion'
import { useRef } from 'react'
import InputBase from '../input/inputBase'
import FormErrorMessage from '../messages/ErrorMessage'


interface IProps {
  Form: React.ForwardRefExoticComponent<FormProps & React.RefAttributes<HTMLFormElement>>
  data: FetcherData | undefined
  state: FetcherState
  type: FetcherTypes
  btnText?: string
}
// This is the form used in the pop-up modal on blog pages
const MakersSignUpFetcherForm = (props: IProps) => {
  const { Form, data, state, type, btnText } = props

  const ref = useRef<any>();

  useResetForm({
    status: type === "done" && Boolean(data?.pass),
    formRef: ref
  })

  return (
    <div>
      <Form
        ref={ref}
        method="post"
        className="flex flex-col"
        action="/convertkit/tuesday-makers"
      >
        {/*ERROR SUBMISSION*/}
        {/* @ts-ignore */}
        <AnimatePresence>
          {data?.formError && state === 'idle' &&
            <FormErrorMessage
              id={'subscriberError'}
              className='mb-4'
              message={data?.formError || ''} />
          }
          {data?.fieldErrors?.email && state === 'idle' &&
            <FormErrorMessage
              id={'passwordError'}
              className='mb-4'
              message={data?.fieldErrors.email} />
          }
        </AnimatePresence>

        <div className='flex-1 mb-5'>
          <InputBase
            label="Email"
            labelCss="text-sm text-grey-600 font-semibold mb-2 block"
            type="email"
            name="email"
            required={true}
            invalid={Boolean(
              data?.fieldErrors?.email
            ) || undefined}
            id={`email-signup`}
            placeholder='Enter your email'
          />

          {/* HONEYPOT */}
          <label className="inpot" htmlFor="firstName">
            <span className="text-sm font-semibold text-grey-600">First Name</span>
            <input
              tabIndex={-1}
              className="inpot"
              autoComplete="off"
              type="text"
              id={`firstName-signup`}
              name="firstName"
              placeholder="Your first name here" />
          </label>
        </div>

        <div className='hidden bg-grey-100'>
          <input type="text" name='type' value='landing-page' readOnly className='hidden' />
        </div>
        <div className='flex'>
          <SubmitFetcherBtn
            className='btn btn-primary btn-lg btn-primary-ring btn-flex'
            spinnerColors={spinnerColors.sageSolid}
            state={state}
            btnText={`${btnText || 'Send the Goods!'}`}
          />
        </div>

      </Form>
    </div>
  )
}

export default MakersSignUpFetcherForm