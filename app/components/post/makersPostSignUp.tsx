import React from 'react'
import MakersSignUpForm from '@App/components/forms/layout/makersSignUpForm'
import { useFetcher, useTransition } from '@remix-run/react'
/**
 * @Component Makers Post Sign Up
 * @not-tested
 * 
 * Tuesday Makers sign up modal with confirmation using CK form and useFetcher
 *
 */
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
