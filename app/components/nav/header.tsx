import { Link, useLocation } from '@remix-run/react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import React, { useEffect } from 'react'
import { ShopPlatformEnum } from '@App/enums/products'
import useSite from '@App/hooks/useSite'
import useTopNav from '@App/hooks/useTopNav'
import { breakpointConvertPX, classNames } from '@App/utils/appUtils'
import EveryTuesdayLogo from '../svgs/everyTuesdayLogo'
import HamburgerSvg from '../svgs/hamburger'
import SearchSvg from '../svgs/searchSvg'
import { PrimaryNav } from './primaryNav'
import { siteSearchState, useSearch } from '@App/hooks/useSearch'
import MasterLoginPopOver from './popOver/masterLogin'
import MobileNav from './mobileNav'
import { useGumroadCart, useMobileNav } from '@App/hooks/windowUtilHooks'
import UseSearchProvider from '@App/hooks/useSearch/useSearchProvider'
import { useMatchesLookup } from '@App/hooks/useMatchesLookup'
import { SEARCH_STATE_ENUMS } from '@App/enums/searchEnums'
import SearchButton from '../buttons/searchButton'
import SearchModal from '../modals/searchModal'

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
  const { state: { breakpoint, nav: { mobileNav }, metadata: { serverSettings }, commentsModal }, toggleMobileNav } = useSite()
  // const { openSearch, state: { isOpen } } = useSearch()
  const breakPointWidth = breakpointConvertPX(breakpoint)
  const location = useLocation()
  const isTuesdayMakersPage = location.pathname === '/tuesday-makers'
  const { navRef } = useTopNav() // Nav slide in and out
  const { gumroadCartOpen } = useGumroadCart()
  const rootData = useMatchesLookup('/')
  const searchData = !rootData ? {} : rootData.searchData
  useMobileNav()

  return (
    <UseSearchProvider defaultState={{
      ...siteSearchState,
      status: !searchData ? SEARCH_STATE_ENUMS.ERROR : SEARCH_STATE_ENUMS.LOADED,
      data: searchData,
      // client,
    }}>
      <header
        id="header"
        ref={navRef}
        className={`${commentsModal.show ? 'laptop:animate-addPadding' : ''} fixed top-0 h-[69px] left-0 z-40 flex w-full transition-transform -translate-y-full ${isTuesdayMakersPage ? 'bg-[#0C2427]' : 'bg-white'} duration-600 inView pr-0 laptop:h-[92px]`}
      >
        {/* 
      <Link to={'/'}>
        Home
      </Link>
      <Link to={'/blog'}>
        Blog
      </Link>
      <Link to={'/courses'}>
        Courses
      </Link>
      <Link to={'/post'}>
        Courses
      </Link> */}

        <div className='flex flex-1 h-full'>
          <div className={classNames(mobileNav.isOpen ? 'border-b border-grey-300' : '', 'z-2 grid items-center w-full px-5 py-2 grid-cols-navMobile laptop:my-[10px] laptop:grid-cols-navDesktop desktop:grid-cols-navDesktopXl')}>

            {/* ET LOGO */}
            <div data-testid="logo" className="max-w-[144px] desktop:max-w-[200px]">
              <Link to="/" title="Every Tuesday" prefetch="intent" className="">
                <EveryTuesdayLogo fill={isTuesdayMakersPage ? `var(--tangerine-300)` : `var(--sage-800)`} aria-label='Every Tuesday Logo' />
              </Link>
            </div>

            {/* SEARCH ICON FOR MOBILE */}
            {/* <div data-testid="search-mobile" className="flex justify-center px-2 py-4 laptop:hidden">
            <div className="max-w-[20px]">
              <SearchSvg fill={`var(${cssColors.primaryPlum700})`} />
            </div>
          </div> */}

            {/* HAMBURGER  */}
            <div data-testid="hamburger"
              onClick={toggleMobileNav}
              className={classNames(serverSettings.productPlatform === ShopPlatformEnum.GUMROAD && gumroadCartOpen
                ? 'mr-16'
                : '',
                'flex justify-center px-2 py-4 col-start-3 laptop:hidden')}>
              <div className="max-w-[20px]">
                <HamburgerSvg fill={isTuesdayMakersPage ? 'var(--sage-50)' : 'var(--sage-800)'} />
              </div>
            </div>

            {/* PRIMARY NAV */}
            {breakPointWidth >= 1024 &&
              <>
                <PrimaryNav />
              </>}

            {/* DESKTOP SEARCH AND COURSE LOGIN */}
            {breakPointWidth >= 1024 &&
              <motion.div
                animate={serverSettings.productPlatform === ShopPlatformEnum.GUMROAD && gumroadCartOpen ? "open" : "closed"}
                variants={gumroadVarients}
                data-testid="desktop-col-3"
                className={'hidden items-center justify-end laptop:flex'}>

                <MasterLoginPopOver />

                {/* DESKTOP SEARCH ICON */}
                <SearchButton />

              </motion.div>}
          </div>

          {/* MOBILE NAV */}
          <AnimatePresence>
            {/* {mobileNav.isOpen && <MobileNav />} */}
            {mobileNav.isOpen && breakPointWidth < 1024 &&
              <MobileNav />}
          </AnimatePresence>
        </div>
        <SearchModal />
      </header>


    </UseSearchProvider>
  )

  // return (

  //   <header data-testid="header" className="bg-white">
  //     <Link to={'/'}>
  //       Home
  //     </Link>
  //     <Link to={'/blog'}>
  //       Blog
  //     </Link>
  //     <Link to={'/courses'}>
  //       Courses
  //     </Link>
  //     <Link to={'/post'}>
  //       Courses
  //     </Link>
  //   </header>
  // )
}

export default Header

const gumroadVarients = {
  open: {
    marginRight: "64px",
  },
  closed: {
    marginRight: "0px",
  }
}