import React, { useEffect, useRef } from 'react'
import useSite from '@App/hooks/useSite'
import type { Transition } from "@remix-run/react/dist/transition"
import type { FormProps } from '@remix-run/react'
import InputBase from '../input/inputBase'
import SubmitBtn from '@App/components/buttons/submitBtn'
import { spinnerColors } from '@App/components/spinners/spinnerColors'

interface Props {
  Form: React.ForwardRefExoticComponent<FormProps & React.RefAttributes<HTMLFormElement>>
  data: FetcherData | undefined
  // state: FetcherState
  transition: Transition
  type: FetcherTypes
}

// TODO: Move this to a component and finish design
const MakersPopUp = () => {
  return (
    <div>
      Success
    </div>
  )
}
/**
 * Currently Used in the Footer
 * @param props 
 * 
 * @returns 
 */
function MakersSignUpForm(props: Props) {
  const { Form, data, transition, type } = props
  const { openModal } = useSite()
  // console.log('state', state)
  // console.log('type', type)

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
          {/* <label className="text-sm leading-7 text-gray-600" htmlFor="email-input">Email</label> */}
          <InputBase
            type="email"
            name="email"
            className='hover:ring-sage-400 ring-offset-sage-600 focus:ring-sage-200'
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
            spinnerColors={spinnerColors.yellowSolid}
            className='btn btn-secondary btn-lg btn-secondary-ring'
            transition={transition}
            btnText='Send the Goods!'
          />
        </div>

      </Form>
    </div>
  )
}

export default MakersSignUpForm
