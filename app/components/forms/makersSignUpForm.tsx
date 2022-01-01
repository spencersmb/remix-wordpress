import React, { useEffect, useRef } from 'react'
import { FormProps } from '@remix-run/react/components'
import useSite from '~/hooks/useSite'
type FetcherData = {
  fieldErrors?:{
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

interface Props{
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
function MakersSignUpForm (props: Props) {
  const {Form, data, state, type} = props
  const {openModal} = useSite()
  // console.log('props', props)

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
        className="mb-4"
        action="/convertkit/tuesday-makers"
      >
        <div>
          <label className="leading-7 text-sm text-gray-600" htmlFor="email-input">Email</label>
          <input
            className="mb-2 w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            type="email"
            id="email-input"
            name="email"
            required
            aria-invalid={Boolean(
              data?.fieldErrors?.email
            )}
            aria-describedby={
              data?.fieldErrors?.email
                ? "username-error"
                : undefined
            }
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
        <div>
          <input type="text" name='type' value='footer' readOnly className='hidden' />
        </div>
        <div>
          {!data?.pass && <button
            disabled={state === "submitting"}
            aria-disabled={state === "submitting"}
            type='submit'
            className="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">
            {state === "submitting" ? '...loading' : 'Subscribe'}
          </button>}
        </div>
        {type === "done" ? (
          data?.pass ? (
            <p>Thanks for subscribing!</p>
          ) : data?.formError ? (
            <p data-error>{data?.formError}</p>
          ) : null
        ) : null}
      </Form>
    </div>
  )
}

export default MakersSignUpForm
