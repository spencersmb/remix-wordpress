import { useFetcher } from '@remix-run/react'
import MakersSignUpForm from '~/components/forms/makersSignUpForm'
function FooterPrimary() {
  const tuesdayMakersSignUp = useFetcher();
  return (
    <footer>
      <MakersSignUpForm
        Form={tuesdayMakersSignUp.Form}
        type={tuesdayMakersSignUp.type}
        state={tuesdayMakersSignUp.state}
        data={tuesdayMakersSignUp.data}
      />
    </footer>
  )
}

export default FooterPrimary