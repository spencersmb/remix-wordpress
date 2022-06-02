import React from 'react'

interface Props {
  closeModal: () => void
}

/**
 * @Component TuesdayMakersSignUpModal
 * @tested - Need to enable in jest.config.js
 * 
 * Tuesday Makers sign up modal with confirmation using CK form and useFetcher
 *
 */
function SignUpInstructionsPopUp(props: Props) {
  const { } = props

  return (
    <div className='w-full h-full min-w-[320px] bg-white tablet:min-w-[753px] laptop:min-w-[1009px] desktop:min-w-[1265px] shadow-et_4'>
      <div>
        Sign up instructions show when people have complete the form on Tuesday Makers and need to know what to do next.

        Confirmation email.

        needs to follow the same process as signing up on the blog with cookie and auto login feature.
      </div>
    </div>
  )
}

export default SignUpInstructionsPopUp
