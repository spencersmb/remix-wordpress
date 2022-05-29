import useSite from '@App/hooks/useSite';
import MakersFooterSignUp from './makersSignUpFooter';
import FooterLinks from './footerLinks';
import FooterCopyright from './footerCopyright';

function FooterPrimary() {
  const { state: { user: { resourceUser } } } = useSite()

  return (

    <footer data-testid="footer" className='bg-sage-800 relative pt-[100px] pb-[35px] laptop:pt-[80px] desktop:pt-[120px] laptop:pb-[50px]'>
      <div className='container'>

        {!resourceUser && <MakersFooterSignUp />}

        {/* FOOTER LINKS */}
        <FooterLinks />

        {/* COPYRIGHT */}
        <FooterCopyright />

      </div>


    </footer>
  )
}

export default FooterPrimary