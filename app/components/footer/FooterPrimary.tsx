import useSite from '@App/hooks/useSite';
import MakersFooterSignUp from './makersSignUpFooter';
import FooterLinks from './footerLinks';
import FooterCopyright from './footerCopyright';
interface IProps {
  hideSignUp?: boolean
}

/**
 * 
 * @function FooterPrimary 
 * @tested - 8/22/2022 
 */
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
      className='bg-emerald-900 overflow-hidden relative pt-[100px] pb-[35px] laptop:pt-[80px] desktop:pt-[120px] laptop:pb-[50px] z-3'>
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