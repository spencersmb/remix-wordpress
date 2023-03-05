import useSite from '@App/hooks/useSite';
import MakersFooterSignUp from './makersSignUpFooter';
import FooterLinks from './footerLinks';
import FooterCopyright from './footerCopyright';
import { useLocation } from '@remix-run/react';
interface IProps {
  hideSignUp?: boolean
}

/**
 * 
 * @function FooterPrimary 
 * @tested - 8/22/2022 
 */

const PagesToHideFooter = [
  'brushPreview'
]

function FooterPrimary({ hideSignUp = false }: IProps) {
  const { state: { user: { resourceUser } } } = useSite()
  const location = useLocation()
  function displaySignup() {

    if (hideSignUp) {
      return null
    }

    if (resourceUser) {
      return null
    }
    return <MakersFooterSignUp />
  }
  console.log('location.pathname', location.pathname)
  function hideFooterCheck() {
    const path = location.pathname.replace('/', '')
    if (PagesToHideFooter.includes(path)) {
      return true
    }
    return false
  }

  // CHECK IF FOOTER SHOULD BE HIDDEN FOR CERTAIN PAGES
  if (hideFooterCheck()) {
    return null
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