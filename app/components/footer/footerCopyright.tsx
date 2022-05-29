import { Link } from "@remix-run/react"

const FooterCopyright = () => {
  return (
    <div className='flex flex-col-reverse tablet:flex-row tablet:justify-between text-sage-400 text-sm font-light border-t-[1px] border-sage-400 pt-12'>
      <div >
        © Copyright 2021 Every Tuesday, LLC
      </div>
      <div className='flex pb-6 tablet:pb-0'>
        <Link to={'/'} className='mr-6 hover:text-sage-300 underlined'>Privacy & Cookies</Link>
        <Link to={'/'} className='hover:text-sage-300 underlined'>Terms & Conditions</Link>
      </div>
    </div>
  )
}
export default FooterCopyright