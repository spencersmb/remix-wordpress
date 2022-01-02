import React from 'react'
import MakersSignUpForm from '~/components/forms/makersSignUpForm'
import { useFetcher } from '@remix-run/react'

function MakersPostSignUp () {
  const tuesdayMakers = useFetcher();
  return (
    <div>
      <MakersSignUpForm
        Form={tuesdayMakers.Form}
        type={tuesdayMakers.type}
        state={tuesdayMakers.state}
        data={tuesdayMakers.data}
      />
    </div>
  )
}

export default MakersPostSignUp
