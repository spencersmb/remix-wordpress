import React from 'react'
import MakersSignUpForm from '@App/components/forms/makersSignUpForm'
import { useFetcher, useTransition } from '@remix-run/react'

function MakersPostSignUp() {
  const tuesdayMakers = useFetcher();
  const transition = useTransition()
  return (
    <div>
      <MakersSignUpForm
        Form={tuesdayMakers.Form}
        type={tuesdayMakers.type}
        transition={transition}
        data={tuesdayMakers.data}
      />
    </div>
  )
}

export default MakersPostSignUp
