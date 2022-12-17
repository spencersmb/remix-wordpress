import { cssColors } from "@App/enums/colors"
import useSite from "@App/hooks/useSite"
import { Link } from "@remix-run/react"
import { memo } from "react"
import SocialLinksList1 from "../social/socialLinksList1"
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
        text: 'Our Story',
        url: '/about/our-story'
      },
      {
        text: 'Things I love',
        url: '/about/things-i-love'
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
                <p className='pb-6 font-sentinel__SemiBoldItal text-h5 text-sage-300'>{block.heading}</p>
                <ul>
                  {block.links.map(link => (
                    <li key={link.url} className='pb-3 text-lg text-sage-500 btn-spencer'>
                      <Link data-testid="footer-link--item" className='hover:text-sage-200 underlined after:underlineAnimation' to={link.url} aria-label={`Footer link to ${link.text}`}>{link.text}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            )
          }


          return (
            <div data-testid="social-links-block" key={index}>
              <p className='pb-6 font-sentinel__SemiBoldItal text-h5 text-sage-300'>{block.heading}</p>
              <SocialLinksList1 svgColor={`var(${cssColors.primaryPlum50})`}
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default memo(FooterLinks)