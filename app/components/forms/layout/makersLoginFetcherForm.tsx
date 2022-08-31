import type { FormProps } from '@remix-run/react'
import { useEffect, useRef } from 'react'
import SubmitFetcherBtn from '../../buttons/submitFetchBtn'
import InputBase from '../input/inputBase'

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

  // const inputCss = "bg-sage-100 transform text-sage-700 w-full px-5 py-4 rounded-lg hover:ring hover:ring-sage-300 ring-offset-white focus:ring ring-offset-4 focus:ring-sage-500 text-base outline-none duration-200 ease-in-out autofill:"

  return (
    <div>
      <Form
        ref={ref}
        method="post"
        className="flex flex-col"
        action="/convertkit/tuesday-makers-login"
      >
        <div className='flex-1 mb-5'>
          <InputBase
            className={''}
            id="email-input"
            type="email"
            name="email"
            required={true}
            placeholder='Enter Email'
            invalid={Boolean(data?.fieldErrors?.email)}
          />
          {data?.fieldErrors?.email ? (
            <p
              className="form-validation-error"
              role="alert"
              id="email-error"
            >
              {data?.fieldErrors?.email}
            </p>
          ) : null}
        </div>
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