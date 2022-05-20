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

  const ref = useRef<any>();

  useEffect(() => {
    if (type === "done" && data?.pass) {

      //@ts-ignore
      ref.current.reset();
    }
  }, [type, data]);
  const inputCss = "bg-sage-100 transform text-sage-700 w-full px-5 py-4 rounded-lg hover:ring hover:ring-sage-300 ring-offset-white focus:ring ring-offset-4 focus:ring-sage-500 text-base outline-none duration-200 ease-in-out autofill:"
  return (
    <div>
      <Form
        ref={ref}
        method="post"
        className="flex flex-col"
        action="/convertkit/tuesday-makers"
      >
        <div className='flex-1 mb-5'>
          {/* <label className="text-sm leading-7 text-gray-600" htmlFor="email-input">Email</label> */}
          <InputBase
            className={inputCss}
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
            className='btn ring-offset-white'
            state={state}
            btnText={`${btnText || 'Send the Goods!'}`}
          />
        </div>

      </Form>
    </div>
  )
}

export default MakersSignUpFetcherForm