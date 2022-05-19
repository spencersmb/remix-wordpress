import type { FormProps } from '@remix-run/react'
import { useEffect, useRef } from 'react'
import SubmitFetcherBtn from '../buttons/submitFetchBtn'
import InputBase from '../input/inputBase'

interface IProps {
  Form: React.ForwardRefExoticComponent<FormProps & React.RefAttributes<HTMLFormElement>>
  data: FetcherData | undefined
  state: FetcherState
  type: FetcherTypes
  btnText?: string
}
const MakersSignUpFetcherForm = (props: IProps) => {
  const { Form, data, state, type, btnText } = props
  console.log('data', data);


  const ref = useRef<any>();

  useEffect(() => {
    if (type === "done" && data?.pass) {

      //@ts-ignore
      ref.current.reset();
    }
  }, [type, data]);

  return (
    <div>
      <Form
        ref={ref}
        method="post"
        className="flex flex-col tablet:flex-row"
        action="/convertkit/tuesday-makers"
      >
        <div className='flex-1 mb-5 tablet:mr-6 tablet:mb-0'>
          {/* <label className="text-sm leading-7 text-gray-600" htmlFor="email-input">Email</label> */}
          <InputBase
            type="email"
            name="email"
            placeholder='Enter Email'
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
          <input type="text" name='type' value='landing-page' readOnly className='hidden' />
        </div>
        <div className='flex'>
          <SubmitFetcherBtn
            className='btn ring-offset-primary-600'
            state={state}
            btnText={`${btnText || 'Send the Goods!'}`}
          />
        </div>

      </Form>
    </div>
  )
}

export default MakersSignUpFetcherForm