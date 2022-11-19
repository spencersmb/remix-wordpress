import useSite from '@App/hooks/useSite'
import { getPrimaryMenu } from '@App/lib/wp/nav'
import { Link } from '@remix-run/react'
import { motion } from 'framer-motion'
import React, { useEffect } from 'react'
import SearchSvg from '../svgs/searchSvg'
import FacebookSvg from '../svgs/social/facebookSvg'
import InstagramSvg from '../svgs/social/instagramSvg'
import PinterestSvg from '../svgs/social/pinterestSvg'
import YoutubeSvg from '../svgs/social/youtubeSvg'
import AboutMobileDropDown from './aboutMobileDropdown'
import LoginDropDown from './loginDropDown'
import TuesdayMakersNavAd from './tuesdayMakersNavAd'

interface Props {
  openSearch: () => void
}
/**
 * 
 * @function MobileNav 
 * @description Mobile Nav
 * @tested 11/19/2021
 * 
 */
function MobileNav(props: Props) {
  const { openSearch } = props
  const { state: { menu, metadata } } = useSite()
  const socialkeys = Object.keys(metadata.social)
  const svgColor = 'var(--sage-800)'
  const primaryMenu = getPrimaryMenu(menu)


  return (
    <motion.div
      data-testid='mobileNav'
      key='mobileNav'
      id='mobileNav'
      initial={'initial'}
      exit={'exit'}
      animate={'enter'}
      variants={variants}
      className={`absolute z-1 mt-[var(--nav-top-sm)] top-0 left-0 w-full bg-white shadow-cody-sm origin-top-center  opacity-0 `}>

      <nav aria-label="Mobile navigation" className='pb-4 overflow-auto mobileNav-height'>

        {/* SEARCH */}
        <div
          onClick={openSearch}
          className={`bg-grey-200 rounded-lg px-6 py-4 flex flex-row justify-between text-grey-500 items-center mx-4 mb-8 mt-4`}
        >
          <div className='font-semibold'>Search</div>
          <div className='w-5'><SearchSvg fill={`currentColor`} /></div>
        </div>

        {/* MAIN LINKS */}
        <div data-testid="main-links" className='flex flex-col text-left'>
          <div className='px-4 text-sm font-semibold text-grey-400'>
            Menu
          </div>
          {primaryMenu.map((menuItem) => {
            return (
              <li key={menuItem.id}
                data-testid="menu-item"
                className={`flex text-2xl font-semibold text-sage-800 normal-links transition-all duration-300 px-4`}>
                <Link
                  className="py-4"
                  to={menuItem.path}
                  prefetch="intent">{menuItem.label}</Link>
              </li>
            )
          })}

          <AboutMobileDropDown />

          <li key={'contact'}
            data-testid="menu-item"
            className={`flex text-2xl font-semibold text-sage-800 normal-links transition-all duration-300 px-4`}>
            <Link
              className="py-4"
              to={'/contact'}
              prefetch="intent">{'Contact'}</Link>
          </li>
        </div>

        {/* Additional content wrapper  */}
        <div className='flex flex-col px-4 pb-16 mt-6 text-left gap-y-6'>
          <div>
            <div className='mb-2 text-sm font-semibold text-grey-400'>
              Members
            </div>

            <div className=''>
              <LoginDropDown />
            </div>
          </div>

          {/* TUESDAY MAKERS */}
          <div className=''>
            <TuesdayMakersNavAd />
          </div>

          {/* SOCIAL MEDIA LIST */}
          <div>
            <div className='mb-2 text-sm font-semibold text-grey-400'>
              Follow Us
            </div>
            <ul className='flex flex-row'>
              {socialkeys.map((key) => {
                switch (key) {
                  case 'youtube':
                    return (
                      <li key={key} className='flex' data-testid={'social-item'}>
                        <a data-testid="social-link" href={metadata.social[key]} rel="noreferrer" target={'_blank'} className='flex max-w-[32px] group'>
                          <YoutubeSvg className='transition-all group-hover:svg-[var(--sage-400)] group-hover:scale-[1.2]' fill={svgColor} />
                          <span className="sr-only">Every Tuesday on Youtube</span>
                        </a>
                      </li>
                    )
                  case 'facebook':
                    return (
                      <li key={key} className='flex pl-9' data-testid={'social-item'}>
                        <a data-testid="social-link" href={metadata.social[key]} rel="noreferrer" target={'_blank'} className='flex max-w-[32px] group'>
                          <FacebookSvg className='transition-all group-hover:svg-[var(--sage-400)] group-hover:scale-[1.2]' fill={svgColor} />
                          <span className="sr-only">Every Tuesday on Facebook</span>
                        </a>
                      </li>
                    )
                  case 'instagram':
                    return (
                      <li key={key} className='flex pl-9' data-testid={'social-item'}>
                        <a data-testid="social-link" href={metadata.social[key]} rel="noreferrer" target={'_blank'} className='flex max-w-[32px] group'>
                          <InstagramSvg className='transition-all group-hover:svg-[var(--sage-400)] group-hover:scale-[1.2]' fill={svgColor} />
                          <span className="sr-only">Every Tuesday on Instagram</span>
                        </a>
                      </li>
                    )
                  case 'pinterest':
                    return (
                      <li key={key} className='flex pl-9' data-testid={'social-item'}>
                        <a data-testid="social-link" href={metadata.social[key]} rel="noreferrer" target={'_blank'} className='flex max-w-[32px] group'>
                          <PinterestSvg className='transition-all group-hover:svg-[var(--sage-400)] group-hover:scale-[1.2]' fill={svgColor} />
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

          <div className='text-sm text-grey-400'>
            © Copyright 2021 Every Tuesday, LLC
          </div>

        </div>

      </nav>

    </motion.div>
  )
}
const variants = {
  initial: {
    opacity: 0,
    // visibility: 'hidden',
    scale: 0.95,
    transition: {
      visibility: {
        duration: 0
      },
      opacity: {
        duration: .3
      },
      scale: {
        duration: .3
      }
    }
  },
  exit: {
    opacity: 0,
    // visibility: 'hidden',
    scale: 0.95,
    transition: {
      visibility: {
        duration: 0
      },
      opacity: {
        duration: .3
      },
      scale: {
        duration: .3
      }
    }
  },
  enter: {
    opacity: 1,
    // visibility: 'visible',
    scale: 1,
    transition: {
      visibility: {
        duration: 0
      },
      opacity: {
        duration: .3
      },
      scale: {
        duration: .3
      }
    }
  },
}

export default MobileNav
