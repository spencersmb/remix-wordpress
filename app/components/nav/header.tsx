import { motion, useReducedMotion } from 'framer-motion'
import React from 'react'
import { Link } from 'remix'
import { cssColors } from '~/enums/colors'
import { ShopPlatformEnum } from '~/enums/products'
import useSite from '~/hooks/useSite'
import useTopNav from '~/hooks/useTopNav'
import { classNames } from '~/utils/appUtils'
import EveryTuesdayLogo from '../svgs/everyTuesdayLogo'
import HamburgerSvg from '../svgs/hamburger'
import SearchSvg from '../svgs/searchSvg'
import { PrimaryNav } from './primaryNav'

interface Props {
  alternateNav?: React.ReactNode
}

function Header(props: Props) {
  const { alternateNav } = props
  const { state: { metadata: { shopPlatform } } } = useSite()
  const circumference = 28 * 2 * Math.PI
  const strokeDasharray = `${circumference} ${circumference}`
  const shouldReduceMotion = useReducedMotion()
  const { navRef } = useTopNav() // Nav slide in and out
  return (
    <header ref={navRef} className="bg-white fixed top-0 left-0 w-full z-30 flex transition-transform duration-600 -translate-y-full inView">
      <nav aria-label="Main navigation" className="w-full grid my-2 mx-5 items-center grid-cols-navMobile laptop:my-4 laptop:grid-cols-navDesktop">

        {/* ET LOGO */}
        <div data-testid="logo" className="max-w-[144px] desktop:max-w-[220px]">
          <Link to="/" title="EveryTuesday" prefetch="intent" className="">
            <EveryTuesdayLogo fill={`var(${cssColors.primaryPlum700})`} />
          </Link>
        </div>

        {/* HAMBURGER / SEARCH ICON FOR MOBILE */}
        <div data-testid="search-mobile" className="flex justify-center px-2 py-4 laptop:hidden">
          <div className="max-w-[20px]">
            <SearchSvg fill={`var(${cssColors.primaryPlum700})`} />
          </div>
        </div>
        <div data-testid="hamburger"
          className={classNames(shopPlatform === ShopPlatformEnum.GUMROAD
            ? 'mr-12'
            : '',
            'flex justify-center px-2 py-4 laptop:hidden')}>
          <div className="max-w-[20px]">
            <HamburgerSvg fill={`var(${cssColors.primaryPlum700})`} />
          </div>
        </div>

        {/* PRIMARY NAV */}
        {alternateNav ? alternateNav : <PrimaryNav />}

        {/* DESKTOP SEARCH AND COURSE LOGIN */}
        <div data-testid="desktop-col-3"
          className={classNames(shopPlatform === ShopPlatformEnum.GUMROAD
            ? 'mr-12'
            : '',
            'hidden items-center justify-end laptop:flex')}>
          <div className="">
            <a className={'normal-link text-primary-600 mr-4 underlined underlined-active hover:text-primary-300'} href="https://teachable.com">Course Login</a>
          </div>
          <div className="relative inline-flex flex-none items-center justify-center p-1 w-14 h-14 group">
            <div className="absolute text-gray-200 dark:text-gray-600">
              <svg width="56" height="56" >
                <motion.circle
                  stroke="var(--primary-plum-600)"
                  strokeWidth="2"
                  fill="transparent"
                  r="26"
                  cx="28"
                  cy="28"
                  style={{ strokeDasharray, rotate: -90 }}
                  initial={{ strokeDashoffset: circumference }}
                  whileHover={'hover'}
                  variants={{
                    initial: { strokeDashoffset: circumference },
                    hover: { strokeDashoffset: 0 },
                    focus: { strokeDashoffset: 0 },
                    active: { strokeDashoffset: 0 },
                  }}
                  transition={{
                    damping: 0,
                    ...(shouldReduceMotion ? { duration: 0 } : null),
                  }}
                />
              </svg>
            </div>
            <div className="bg-primary-700 borde rounded-full group-hover:bg-primary-500 transition-colors">
              <div className="w-[20px] h-[20px] m-3">
                <SearchSvg fill={'#ffffff'} />
              </div>
            </div>
          </div>

        </div>
      </nav>
    </header>
  )
}

export default Header