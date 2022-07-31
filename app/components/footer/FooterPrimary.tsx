import useSite from '@App/hooks/useSite';
import MakersFooterSignUp from './makersSignUpFooter';
import FooterLinks from './footerLinks';
import FooterCopyright from './footerCopyright';
interface IProps {
  hideSignUp?: boolean
}

// TODO: TEST NEW SIGNUP PROP
function FooterPrimary({ hideSignUp = false }: IProps) {
  const { state: { user: { resourceUser } } } = useSite()

  function displaySignup() {

    if (hideSignUp) {
      return null
    }

    if (resourceUser) {
      return null
    }
    return <MakersFooterSignUp />
  }

  return (

    <footer
      data-testid="footer"
      className='bg-sage-800 relative pt-[100px] pb-[35px] laptop:pt-[80px] desktop:pt-[120px] laptop:pb-[50px]'>
      <div className='container'>

        {displaySignup()}

        {/* FOOTER LINKS */}
        <FooterLinks />

        {/* COPYRIGHT */}
        <FooterCopyright />

      </div>


    </footer>
  )
}

export default FooterPrimary