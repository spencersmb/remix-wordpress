import { Link } from "@remix-run/react"
import { memo } from "react";

/**
 * 
 * @component FooterCopyright
 * @tested - 5/30/2022
 */
const FooterCopyright = () => {

  return (
    <div
      data-testid="footer-copyright"
      className='flex flex-col-reverse tablet:flex-row tablet:justify-between text-sage-200 text-sm font-light border-t-[1px] border-sage-400 pt-12'>
      <div >
        © Copyright 2021 Every Tuesday, LLC
      </div>
      <div className='flex pb-6 tablet:pb-0'>
        <Link to={'/privacy-and-cookies'} className='mr-6 hover:text-sage-100 underlined'>Privacy & Cookies</Link>
        <Link to={'/terms-and-conditions'} className='hover:text-sage-100 underlined'>Terms & Conditions</Link>
      </div>
    </div>
  )
}
export default memo(FooterCopyright)