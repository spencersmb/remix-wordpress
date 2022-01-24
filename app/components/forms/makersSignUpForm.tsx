import React, { useEffect, useRef } from 'react'
import { FormProps } from '@remix-run/react/components'
import useSite from '~/hooks/useSite'
import InputBase from '../input/inputBase'
import TwSpinnerOne from '../svgs/spinners/twSpinnerOne'
import YellowSubmitBtn from '../buttons/submitBtn'
import SubmitBtn from '../buttons/submitBtn'
type FetcherData = {
  fieldErrors?: {
    email: string
  }
  formError?: string
  pass: boolean
}

type FetcherState =
  | "idle"
  | "submitting"
  | "loading"

type FetcherTypes =
  | "done"
  | "normalLoad"
  | "actionReload"
  | "loaderSubmission"
  | "actionSubmission"
  | "init"

interface Props {
  Form: React.ForwardRefExoticComponent<FormProps & React.RefAttributes<HTMLFormElement>>
  data: FetcherData | undefined
  state: FetcherState
  type: FetcherTypes
}
const MakersPopUp = () => {
  return (
    <div>
      Success
    </div>
  )
}
function MakersSignUpForm(props: Props) {
  const { Form, data, state, type } = props
  const { openModal } = useSite()
  console.log('state', state)
  console.log('type', type)

  const ref = useRef<any>();
  useEffect(() => {
    if (type === "done" && data?.pass) {
      openModal({
        template: <MakersPopUp />
      })
      //@ts-ignore
      ref.current.reset();
    }
  }, [type]);

  return (
    <div>
      <Form
        ref={ref}
        method="post"
        className="flex flex-col tablet:flex-row"
        action="/convertkit/tuesday-makers"
      >
        <div className='flex-1 mb-5 tablet:mr-6 tablet:mb-0'>
          {/* <label className="leading-7 text-sm text-gray-600" htmlFor="email-input">Email</label> */}
          <InputBase
            type="email"
            id="email-input"
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
          <input type="text" name='type' value='footer' readOnly className='hidden' />
        </div>
        <div className='flex'>
          <SubmitBtn
            state={state}
            btnText='Send the Goods!'
          />
        </div>

      </Form>
    </div>
  )
}

export default MakersSignUpForm
