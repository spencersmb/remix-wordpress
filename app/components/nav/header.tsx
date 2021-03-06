import { Link } from '@remix-run/react'
import { motion, useReducedMotion } from 'framer-motion'
import React, { useEffect, useState } from 'react'
import { cssColors } from '@App/enums/colors'
import { ShopPlatformEnum } from '@App/enums/products'
import useSite from '@App/hooks/useSite'
import useTopNav from '@App/hooks/useTopNav'
import { classNames } from '@App/utils/appUtils'
import EveryTuesdayLogo from '../svgs/everyTuesdayLogo'
import HamburgerSvg from '../svgs/hamburger'
import SearchSvg from '../svgs/searchSvg'
import { PrimaryNav } from './primaryNav'
import { useSearch } from '@App/hooks/useSearch'
import useSearchScrollFix from '@App/hooks/useSearch/useSearchScrollFix'

interface Props {
  alternateNav?: React.ReactNode
}
/**
 * @Component Primary Header for the site
 * @tested - 6/2/2022
 * 
 * 
 *
 */
function Header(props: Props) {
  const { alternateNav } = props
  const { state: { metadata: { serverSettings } } } = useSite()
  const { openSearch, state: { isOpen } } = useSearch()
  const circumference = 28 * 2 * Math.PI
  const strokeDasharray = `${circumference} ${circumference}`
  const shouldReduceMotion = useReducedMotion()
  const { navRef } = useTopNav() // Nav slide in and out
  useEffect(() => {
    // openSearch()
  }, [])

  return (
    <header
      ref={navRef}
      className={`fixed top-0 left-0 z-40 flex w-full transition-transform -translate-y-full bg-white duration-600 inView pr-0`}>
      <nav aria-label="Main navigation" className="grid items-center w-full mx-5 my-2 grid-cols-navMobile laptop:my-3 laptop:grid-cols-navDesktop">

        {/* ET LOGO */}
        <div data-testid="logo" className="max-w-[144px] desktop:max-w-[220px]">
          <Link to="/" title="Every Tuesday" prefetch="intent" className="">
            <EveryTuesdayLogo fill={`var(${cssColors.primaryPlum700})`} aria-label='Every Tuesday Logo' />
          </Link>
        </div>

        {/* HAMBURGER / SEARCH ICON FOR MOBILE */}
        <div data-testid="search-mobile" className="flex justify-center px-2 py-4 laptop:hidden">
          <div className="max-w-[20px]">
            <SearchSvg fill={`var(${cssColors.primaryPlum700})`} />
          </div>
        </div>

        <div data-testid="hamburger"
          className={classNames(serverSettings.productPlatform === ShopPlatformEnum.GUMROAD
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
        <div
          data-testid="desktop-col-3"
          className={classNames(serverSettings.productPlatform === ShopPlatformEnum.GUMROAD
            ? 'mr-12'
            : '',
            'hidden items-center justify-end laptop:flex')}>

          {/* COURSE LOGIN */}
          <div className="">
            <a className={'normal-link text-primary-600 mr-4 underlined after:underlined-active hover:text-primary-300'} href="https://teachable.com">Course Login</a>
          </div>

          {/* DESKTOP SEARCH ICON */}
          <div
            data-testid="search-icon-desktop"
            onClick={openSearch}
            className="relative inline-flex items-center justify-center flex-none p-1 w-14 h-14 group">
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
            <div className="transition-colors rounded-full bg-primary-700 borde group-hover:bg-primary-500">
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
