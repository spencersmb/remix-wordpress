import type { FormProps } from '@remix-run/react'
import { AnimatePresence } from 'framer-motion'
import { useEffect, useRef } from 'react'
import SubmitFetcherBtn from '../../buttons/submitFetchBtn'
import InputBase from '../input/inputBase'
import FormErrorMessage from '../messages/ErrorMessage'

interface Props {
  Form: React.ForwardRefExoticComponent<FormProps & React.RefAttributes<HTMLFormElement>>
  data: FetcherData | undefined
  type: FetcherTypes
  state: FetcherState
  redirectUrl?: string
  onComplete?: (data: FetcherData | undefined) => void
}

const MakersLoginFetchForm = (props: Props) => {

  const { Form, data, state, type, redirectUrl, onComplete } = props
  const ref = useRef<any>();

  useEffect(() => {
    if (type === "done" && data?.pass) {

      //@ts-ignore
      ref.current.reset();

      if (onComplete) {
        onComplete(data)
      }
      // redirect or OnCompleteCallback
    }
  }, [type, data]);



  return (
    <div>
      <Form
        ref={ref}
        method="post"
        className="flex flex-col"
        action="/convertkit/tuesday-makers-login"
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
            className={''}
            label="Email"
            labelCss="text-sm text-grey-600 font-semibold mb-2 block"
            type="email"
            name="email"
            required={true}
            invalid={Boolean(
              data?.fieldErrors?.email
            ) || undefined}
            id={`email-login`}
            placeholder='Enter your email'
          />

        </div>

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

        <div className='hidden'>
          <input type="text" name='url' value={redirectUrl} readOnly className='hidden' />
        </div>
        <div className='flex'>
          <SubmitFetcherBtn
            className='btn btn-primary btn-lg btn-flex btn-primary-ring'
            state={state}
            btnText={`Login`}
          />
        </div>

      </Form>
    </div>
  )
}

export default MakersLoginFetchForm