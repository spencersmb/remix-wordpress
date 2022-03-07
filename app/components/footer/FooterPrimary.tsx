import { Link, useFetcher } from '@remix-run/react'
import MakersSignUpForm from '~/components/forms/makersSignUpForm'
import { cssColors } from '~/enums/colors';
import useSite from '~/hooks/useSite';
import EveryTuesdayLogo from '../svgs/everyTuesdayLogo';
import FacebookSvg from '../svgs/social/facebookSvg';
import InstagramSvg from '../svgs/social/instagramSvg';
import PinterestSvg from '../svgs/social/pinterestSvg';
import YoutubeSvg from '../svgs/social/youtubeSvg';
import MakersFooterSignUp from './makersSignUpFooter';

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
  const { state: { metadata, user: { resourceUser } } } = useSite()

  return (

    <footer className='bg-primary-800 relative pt-[100px] pb-[35px] laptop:pt-[80px] desktop:pt-[120px] laptop:pb-[50px]'>
      <div className='container'>

        {!resourceUser && <MakersFooterSignUp />}

        {/* FOOTER LINKS */}
        <div className='flex flex-col justify-between pb-12 laptop:flex-row '>

          {/* LOGO / TAGLINE */}
          <div className='pb-12 laptop:pb-0'>
            <div className='max-w-[249px]'>
              <Link to={'/'} prefetch='intent' aria-label='Link to Every-Tuesday Home page'>
                <EveryTuesdayLogo fill={`var(--secondary-500)`} />
                <span className="sr-only">Every Tuesday Home Page</span>
              </Link>
            </div>
            <p className='pt-2 text-primary-50 font-sentinel__SemiBoldItal text-h5'>
              Digital Art + Lettering
            </p>
          </div>

          {/* LINKS */}
          <div className='flex flex-col font-light text-primary-50 tablet:flex-row'>
            {footerLinks.map((block, index) => {
              if (index !== 2) {
                return (
                  <div key={index} className='pb-7 tablet:pr-16 tablet:pb-0 desktop:pr-24 '>
                    <h5 className='pb-6 font-sentinel__SemiBoldItal text-h5'>{block.heading}</h5>
                    <ul>
                      {block.links.map(link => (
                        <li key={link.url} className='pb-3 text-lg text-primary-300 btn-spencer'>
                          <Link className='hover:text-primary-400 underlined' to={link.url} aria-label={`Footer link to ${link.text}`}>{link.text}</Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )
              }

              const socialkeys = Object.keys(metadata.social)


              return (
                <div key={index}>
                  <h5 className='pb-6 font-sentinel__SemiBoldItal text-h5'>{block.heading}</h5>
                  <ul className='flex flex-row'>
                    {socialkeys.map(key => {
                      switch (key) {
                        case 'youtube':
                          return (
                            <li key={key} className='flex'>
                              <a href={metadata.social[key]} rel="noreferrer" target={'_blank'} className='flex max-w-[28px] group'>
                                <YoutubeSvg className='transition-all group-hover:svg-[var(--primary-plum-300)] group-hover:scale-[1.2]' fill={`var(${cssColors.primaryPlum50})`} />
                                <span className="sr-only">Every Tuesday on Youtube</span>
                              </a>
                            </li>
                          )
                        case 'facebook':
                          return (
                            <li key={key} className='flex pl-9'>
                              <a href={metadata.social[key]} rel="noreferrer" target={'_blank'} className='flex max-w-[28px] group'>
                                <FacebookSvg className='transition-all group-hover:svg-[var(--primary-plum-300)] group-hover:scale-[1.2]' fill={`var(${cssColors.primaryPlum50})`} />
                                <span className="sr-only">Every Tuesday on Facebook</span>
                              </a>
                            </li>
                          )
                        case 'instagram':
                          return (
                            <li key={key} className='flex pl-9'>
                              <a href={metadata.social[key]} rel="noreferrer" target={'_blank'} className='flex max-w-[28px] group'>
                                <InstagramSvg className='transition-all group-hover:svg-[var(--primary-plum-300)] group-hover:scale-[1.2]' fill={`var(${cssColors.primaryPlum50})`} />
                                <span className="sr-only">Every Tuesday on Instagram</span>
                              </a>
                            </li>
                          )
                        case 'pinterest':
                          return (
                            <li key={key} className='flex pl-9'>
                              <a href={metadata.social[key]} rel="noreferrer" target={'_blank'} className='flex max-w-[28px] group'>
                                <PinterestSvg className='transition-all group-hover:svg-[var(--primary-plum-300)] group-hover:scale-[1.2]' fill={`var(${cssColors.primaryPlum50})`} />
                                <span className="sr-only">Every Tuesday on Pinterest</span>
                              </a>
                            </li>
                          )
                        default:
                          return null
                      }
                    })}
                  </ul>
                </div>
              )
            })}
          </div>
        </div>

        {/* COPYRIGHT */}
        <div className='flex flex-col-reverse tablet:flex-row tablet:justify-between text-primary-300 text-sm font-light border-t-[1px] border-primary-300 pt-12'>
          <div >
            © Copyright 2021 Every Tuesday, LLC
          </div>
          <div className='flex pb-6 tablet:pb-0'>
            <Link to={'/'} className='mr-6 hover:text-primary-400 underlined'>Privacy & Cookies</Link>
            <Link to={'/'} className='hover:text-primary-400 underlined'>Terms & Conditions</Link>
          </div>
        </div>

      </div>


    </footer>
  )
}

export default FooterPrimary