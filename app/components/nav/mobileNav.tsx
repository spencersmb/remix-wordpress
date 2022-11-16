import useSite from '@App/hooks/useSite'
import { Link } from '@remix-run/react'
import { motion } from 'framer-motion'
import React from 'react'
import FacebookSvg from '../svgs/social/facebookSvg'
import InstagramSvg from '../svgs/social/instagramSvg'
import PinterestSvg from '../svgs/social/pinterestSvg'
import YoutubeSvg from '../svgs/social/youtubeSvg'
import LoginDropDown from './loginDropDown'
import TuesdayMakersNavAd from './tuesdayMakersNavAd'

interface Props {
  openSearch: () => void
}
//TODO: TEST THIS
function MobileNav(props: Props) {
  const { openSearch } = props
  const { state: { menu, metadata } } = useSite()
  const socialkeys = Object.keys(metadata.social)
  const svgColor = 'var(--sage-800)'
  const menuData = menu[0]

  return (
    <motion.div
      data-testid='mobileNav'
      key='mobileNav'
      id='mobileNav'
      initial={'initial'}
      exit={'exit'}
      animate={'enter'}
      variants={variants}
      className={`absolute z-1 mt-[var(--nav-top-sm)] top-0 left-0 w-full h-[500px] bg-white shadow-cody-sm origin-top-center  opacity-0 `}>

      <nav className='p-4'>
        {/* MAIN LINKS */}
        <div className='flex flex-col text-left'>
          <div className='text-sm font-semibold text-grey-400'>
            Menu
          </div>
          {menuData.menuItems.map((menuItem) => {
            return (
              <li key={menuItem.id}
                data-testid="menu-item"
                className={`flex text-2xl font-semibold text-sage-800 normal-links transition-all duration-300`}>
                <Link
                  className="py-2"
                  to={menuItem.path}
                  prefetch="intent">{menuItem.label}</Link>
              </li>
            )
          })}
        </div>

        {/* LOGIN DROP DOWN  */}
        <div className='flex flex-col mt-6 text-left'>
          <div className='text-sm font-semibold text-grey-400'>
            Members
          </div>

          <LoginDropDown />

          <div>
            <TuesdayMakersNavAd />
          </div>

          <div onClick={openSearch}>
            Search Trigger Test
          </div>

          {/* SOCIAL MEDIA LIST */}
          <ul className='flex flex-row'>
            {socialkeys.map((key) => {
              switch (key) {
                case 'youtube':
                  return (
                    <li key={key} className='flex'>
                      <a data-testid="social-link" href={metadata.social[key]} rel="noreferrer" target={'_blank'} className='flex max-w-[32px] group'>
                        <YoutubeSvg className='transition-all group-hover:svg-[var(--sage-400)] group-hover:scale-[1.2]' fill={svgColor} />
                        <span className="sr-only">Every Tuesday on Youtube</span>
                      </a>
                    </li>
                  )
                case 'facebook':
                  return (
                    <li key={key} className='flex pl-9'>
                      <a data-testid="social-link" href={metadata.social[key]} rel="noreferrer" target={'_blank'} className='flex max-w-[32px] group'>
                        <FacebookSvg className='transition-all group-hover:svg-[var(--sage-400)] group-hover:scale-[1.2]' fill={svgColor} />
                        <span className="sr-only">Every Tuesday on Facebook</span>
                      </a>
                    </li>
                  )
                case 'instagram':
                  return (
                    <li key={key} className='flex pl-9'>
                      <a data-testid="social-link" href={metadata.social[key]} rel="noreferrer" target={'_blank'} className='flex max-w-[32px] group'>
                        <InstagramSvg className='transition-all group-hover:svg-[var(--sage-400)] group-hover:scale-[1.2]' fill={svgColor} />
                        <span className="sr-only">Every Tuesday on Instagram</span>
                      </a>
                    </li>
                  )

                default:
                  return null
              }
            })}
            <li className='flex pl-9'>
              <Link to={`/contact`} className='flex max-w-[32px] group'>
                <PinterestSvg className='transition-all group-hover:svg-[var(--sage-400)] group-hover:scale-[1.2]' fill={svgColor} />
                <span className="sr-only">Every Tuesday on Pinterest</span>
              </Link>
            </li>
          </ul>

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
