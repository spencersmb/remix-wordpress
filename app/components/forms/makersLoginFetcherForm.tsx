import type { FormProps } from '@remix-run/react'
import { useEffect, useRef } from 'react'
import SubmitFetcherBtn from '../buttons/submitFetchBtn'
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
  console.log('data', data)
  console.log('type', type)
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
        className="flex flex-col tablet:flex-row"
        action="/convertkit/tuesday-makers-login"
      >
        <div className='flex-1 mb-5 tablet:mr-6 tablet:mb-0'>
          {/* <label className="text-sm leading-7 text-gray-600" htmlFor="email-input">Email</label> */}
          <InputBase
            id="email-input"
            type="email"
            name="email"
            required={true}
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
            className='btn ring-offset-primary-600'
            state={state}
            btnText={`Submit`}
          />
        </div>

      </Form>
    </div>
  )
}

export default MakersLoginFetchForm