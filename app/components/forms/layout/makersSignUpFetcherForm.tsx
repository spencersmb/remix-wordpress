import SubmitFetcherBtn from '@App/components/buttons/submitFetchBtn'
import { spinnerColors } from '@App/components/spinners/spinnerColors'
import type { FormProps } from '@remix-run/react'
import { useEffect, useRef } from 'react'
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
  const inputCss = "bg-sage-100 text-sage-700 hover:ring-sage-300 ring-offset-white ring-offset-4 focus:ring-sage-500"
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