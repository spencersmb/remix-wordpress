import { Link, useFetcher } from '@remix-run/react'
import MakersSignUpForm from '~/components/forms/makersSignUpForm'
import useSite from '~/hooks/useSite';
import EveryTuesdayLogo from '../svgs/everyTuesdayLogo';

const footerLinks = [
  {
    heading: 'Discover',
    links: [
      {
        text: 'Blog',
        url: '/blog'
      },
      {
        text: 'Courses',
        url: '/courses'
      },
      {
        text: 'Products',
        url: '/products'
      },
      {
        text: 'Tuesday Makers',
        url: '/tuesday-makers'
      },

    ]
  },
  {
    heading: 'Help + Information',
    links: [
      {
        text: 'About',
        url: '/about'
      },
      {
        text: 'Contact',
        url: '/contact'
      },
      {
        text: 'Licenses',
        url: '/licenses'
      },
    ]
  },
  {
    heading: 'Follow Us',
    links: []
  },
]

function FooterPrimary() {
  const tuesdayMakersSignUp = useFetcher();
  const { state: { metadata } } = useSite()

  return (

    <footer className='bg-primary-800 relative pt-[30px] pb-[35px] laptop:pt-[40px] laptop:pb-[50px]'>
      <div className='container'>
        <MakersSignUpForm
          Form={tuesdayMakersSignUp.Form}
          type={tuesdayMakersSignUp.type}
          state={tuesdayMakersSignUp.state}
          data={tuesdayMakersSignUp.data}
        />

        {/* FOOTER LINKS */}
        <div className='flex flex-col tablet:flex-row justify-between pb-12'>

          {/* LOGO / TAGLINE */}
          <div>
            <div className='max-w-[249px]'>
              <EveryTuesdayLogo fill={`var(--secondary-500)`} />
            </div>
            <p className='text-primary-50 font-sentinel__SemiBoldItal text-heading-h5 pt-2'>
              Digital Art + Lettering
            </p>
          </div>

          {/* LINKS */}
          <div className='flex flex-col text-primary-50 font-light tablet:flex-row'>
            {footerLinks.map((block, index) => {
              if (index !== 2) {
                return (
                  <div key={index} >
                    <h5 className='font-sentinel__SemiBoldItal text-heading-h5'>{block.heading}</h5>
                    {block.links.map(link => (
                      <li key={link.url}>
                        <Link to={link.url}>{link.text}</Link>
                      </li>
                    ))}
                  </div>
                )
              }

              const socialkeys = Object.keys(metadata.social)


              return (
                <div key={index} >
                  <h5 className='font-sentinel__SemiBoldItal text-heading-h5'>{block.heading}</h5>
                  {socialkeys.map(key => {
                    console.log('socialKeys', metadata.social[key]);
                    switch (key) {
                      case 'youtube':
                        return (
                          <li key={key}>
                            <a href={metadata.social[key]} target={'_blank'}>Youtube Icon</a>
                          </li>
                        )
                      default:
                        return null
                    }
                  })}
                </div>
              )
            })}
          </div>
        </div>

        {/* COPYRIGHT */}
        <div className='flex flex-col laptop:flex-row laptop:justify-between text-primary-300 text-sm font-light border-t-[1px] border-primary-300 pt-12'>
          <div>
            © Copyright 2021 Every Tuesday, LLC
          </div>
          <div>
            <Link to={'/'} className='pr-6'>Privacy & Cookies</Link>
            <Link to={'/'}>Terms & Conditions</Link>
          </div>
        </div>

      </div>


    </footer>
  )
}

export default FooterPrimary