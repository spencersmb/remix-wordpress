import React, { useRef } from 'react'
import type { Transition } from "@remix-run/react/dist/transition"
import type { FormProps } from '@remix-run/react'
import InputBase from '../input/inputBase'
import SubmitBtn from '@App/components/buttons/submitBtn'
import { spinnerColors } from '@App/components/spinners/spinnerColors'
import { useResetForm, useSuccessModal } from '@App/hooks/formHooks'

interface Props {
  Form: React.ForwardRefExoticComponent<FormProps & React.RefAttributes<HTMLFormElement>>
  data: FetcherData | undefined
  // state: FetcherState
  transition: Transition
  type: FetcherTypes
}

/**
 * @Currently Used in the Footer
 * @param props 
 * 
 * @returns 
 */
function MakersSignUpForm(props: Props) {
  const { Form, data, transition, type } = props
  // console.log('state', state)
  // console.log('data', data)

  const ref = useRef<any>();

  useSuccessModal({
    status: type === "done" && Boolean(data?.pass),
  })

  useResetForm({
    status: type === "done" && Boolean(data?.pass),
    formRef: ref
  })

  return (
    <div>
      <Form
        ref={ref}
        method="post"
        className="flex flex-col tablet:flex-row"
        action="/convertkit/tuesday-makers"
      >
        <div className='flex-1 mb-5 tablet:mr-6 tablet:mb-0'>
          <InputBase
            type="email"
            name="email"
            className='input-field-xl text-sage-50 bg-emerald-700 hover:ring-emerald-400 ring-offset-emerald-800 focus:ring-emerald-200 placeholder:text-emerald-300'
            placeholder='Enter Email'
            required={true}
            invalid={Boolean(data?.fieldErrors?.email)}
          />
        </div>
        <div className='hidden'>
          <input
            type="text"
            name='firstName'
            className='hidden'
            tabIndex={-1}
            autoComplete="off"
            id={`firstName-signup`}
            placeholder="Your first name here"
          />
        </div>
        <div className='flex'>
          <SubmitBtn
            spinnerColors={spinnerColors.yellowSolid}
            className='btn btn-tangerine-400 btn-xl btn-tangerine-400-ring'
            transition={transition}
            btnText='Send the Goods!'
          />
        </div>

      </Form>
    </div>
  )
}

export default MakersSignUpForm
