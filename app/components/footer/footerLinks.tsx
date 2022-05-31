import { cssColors } from "@App/enums/colors"
import useSite from "@App/hooks/useSite"
import { Link } from "@remix-run/react"
import EveryTuesdayLogo from "../svgs/everyTuesdayLogo"
import FacebookSvg from "../svgs/social/facebookSvg"
import InstagramSvg from "../svgs/social/instagramSvg"
import PinterestSvg from "../svgs/social/pinterestSvg"
import YoutubeSvg from "../svgs/social/youtubeSvg"

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

/**
 * 
 * @component FooterLinks
 * @tested - 5/30/2022
 */
const FooterLinks = () => {
  const { state: { metadata } } = useSite()
  return (
    <div className='flex flex-col justify-between pb-12 laptop:flex-row '>

      {/* LOGO / TAGLINE */}
      <div data-testid="footer-logo" className='pb-12 laptop:pb-0'>
        <div className='max-w-[249px]'>
          <Link data-testid="logo-link" to={'/'} prefetch='intent' aria-label='Link to Every-Tuesday Home page'>
            <EveryTuesdayLogo fill={`var(--secondary-500)`} />
            <span className="sr-only">Every Tuesday Home Page</span>
          </Link>
        </div>
        <p className='pt-2 text-primary-50 font-sentinel__SemiBoldItal text-h5'>
          Digital Art + Lettering
        </p>
      </div>

      {/* LINKS */}
      <div data-testid="footer-links" className='flex flex-col font-light text-sage-100 tablet:flex-row'>
        {footerLinks.map((block, index) => {

          // socila icons are the last item in blocks so we skip it here
          if (index !== 2) {
            return (
              <div data-testid="footer-link" key={index} className='pb-7 tablet:pr-16 tablet:pb-0 desktop:pr-24 '>
                <h5 className='pb-6 font-sentinel__SemiBoldItal text-h5'>{block.heading}</h5>
                <ul>
                  {block.links.map(link => (
                    <li key={link.url} className='pb-3 text-lg text-sage-400 btn-spencer'>
                      <Link data-testid="footer-link--item" className='hover:text-sage-300 underlined' to={link.url} aria-label={`Footer link to ${link.text}`}>{link.text}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            )
          }

          const socialkeys = Object.keys(metadata.social)

          return (
            <div data-testid="social-links-block" key={index}>
              <h5 className='pb-6 font-sentinel__SemiBoldItal text-h5'>{block.heading}</h5>
              <ul className='flex flex-row'>
                {socialkeys.map(key => {
                  switch (key) {
                    case 'youtube':
                      return (
                        <li key={key} className='flex'>
                          <a data-testid="social-link" href={metadata.social[key]} rel="noreferrer" target={'_blank'} className='flex max-w-[28px] group'>
                            <YoutubeSvg className='transition-all group-hover:svg-[var(--sage-400)] group-hover:scale-[1.2]' fill={`var(${cssColors.primaryPlum50})`} />
                            <span className="sr-only">Every Tuesday on Youtube</span>
                          </a>
                        </li>
                      )
                    case 'facebook':
                      return (
                        <li key={key} className='flex pl-9'>
                          <a data-testid="social-link" href={metadata.social[key]} rel="noreferrer" target={'_blank'} className='flex max-w-[28px] group'>
                            <FacebookSvg className='transition-all group-hover:svg-[var(--sage-400)] group-hover:scale-[1.2]' fill={`var(${cssColors.primaryPlum50})`} />
                            <span className="sr-only">Every Tuesday on Facebook</span>
                          </a>
                        </li>
                      )
                    case 'instagram':
                      return (
                        <li key={key} className='flex pl-9'> data-testid="social-link"
                          <a data-testid="social-link" href={metadata.social[key]} rel="noreferrer" target={'_blank'} className='flex max-w-[28px] group'>
                            <InstagramSvg className='transition-all group-hover:svg-[var(--sage-400)] group-hover:scale-[1.2]' fill={`var(${cssColors.primaryPlum50})`} />
                            <span className="sr-only">Every Tuesday on Instagram</span>
                          </a>
                        </li>
                      )
                    case 'pinterest':
                      return (
                        <li key={key} className='flex pl-9'>
                          <a data-testid="social-link" href={metadata.social[key]} rel="noreferrer" target={'_blank'} className='flex max-w-[28px] group'>
                            <PinterestSvg className='transition-all group-hover:svg-[var(--sage-400)] group-hover:scale-[1.2]' fill={`var(${cssColors.primaryPlum50})`} />
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
  )
}

export default FooterLinks