import { Link, useLocation, useTransition } from '@remix-run/react'
import { AnimatePresence, calcLength, motion, useReducedMotion } from 'framer-motion'
import React, { useEffect, useRef, useState } from 'react'
import { cssColors } from '@App/enums/colors'
import { ShopPlatformEnum } from '@App/enums/products'
import useSite from '@App/hooks/useSite'
import useTopNav from '@App/hooks/useTopNav'
import { breakpointConvertPX, classNames } from '@App/utils/appUtils'
import EveryTuesdayLogo from '../svgs/everyTuesdayLogo'
import HamburgerSvg from '../svgs/hamburger'
import SearchSvg from '../svgs/searchSvg'
import { PrimaryNav } from './primaryNav'
import { useSearch } from '@App/hooks/useSearch'
import MasterLoginPopOver from './popOver/masterLogin'
import MobileNav from './mobileNav'

function whenAvailable(name: string, callback: any) {
  var interval = 10; // ms
  window.setTimeout(function () {
    // const el = document.getElementsByClassName('.gumroad-scroll-container')
    const el = document.getElementsByClassName(name)

    if (el.length > 0) {
      callback(el);
    } else {
      whenAvailable(name, callback);
    }
  }, interval);
}

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
  const { state: { breakpoint, nav: { mobileNav }, metadata: { serverSettings }, commentsModal }, toggleMobileNav } = useSite()
  const { openSearch, state: { isOpen } } = useSearch()
  const circumference = 28 * 2 * Math.PI
  const strokeDasharray = `${circumference} ${circumference}`
  const shouldReduceMotion = useReducedMotion()
  const [gumroadCartOpen, setGumroadCartOpen] = useState(false)
  const breakPointWidth = breakpointConvertPX(breakpoint)
  const transition = useTransition();
  const html = useRef<HTMLHtmlElement | null>(null)
  const location = useLocation()
  const isTuesdayMakersPage = location.pathname === '/tuesday-makers'
  const { navRef } = useTopNav() // Nav slide in and out
  // ON load listen to when gumroad cart is available and observe it for style changes
  useEffect(() => {
    html.current = document.querySelector('html')

    // openSearch()
    var observer = new MutationObserver(function (mutations) {
      mutations.forEach(function (mutationRecord) {
        // console.log('style changed!', mutationRecord);
        // @ts-ignorew
        const height = mutationRecord.target.style.height
        // @ts-ignore
        const widthPx = mutationRecord.target.style.width
        // console.log('widthPx', widthPx);

        //check if widthPx string contains the string calc
        // remove px from widthPx and convert to number
        const width = widthPx.includes('calc')
          ? 'cart'
          : Number(widthPx.replace('px', ''))

        // console.log('width', width);

        if (width !== 'cart') {
          // console.log('close', close);

          setGumroadCartOpen(false)
        } else if (width === 'cart' && !gumroadCartOpen) {
          // console.log('open', open);

          setGumroadCartOpen(true)
        }
      });
    });

    const gumroad = whenAvailable('gumroad-scroll-container', (el: any) => {
      if (el.length > 0) {
        observer.observe(el[0], { attributes: true, attributeFilter: ['style'] });
      }
    })

    return () => {
      observer.disconnect()
    }

  }, [])

  useEffect(() => {

    if (mobileNav.isOpen && html.current) {
      html.current.style.overflow = 'hidden'
    } else if (!mobileNav.isOpen && html.current) {
      html.current.style.overflow = 'auto'
    }

    if (transition.state === 'loading' && mobileNav.isOpen) {
      toggleMobileNav()
    }
  }, [transition, mobileNav.isOpen, toggleMobileNav])


  useEffect(() => {
    if (mobileNav.isOpen && breakPointWidth > 1024) {
      toggleMobileNav()
    }
  }, [breakPointWidth, breakpoint, mobileNav.isOpen])
  return (
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
              <EveryTuesdayLogo fill={isTuesdayMakersPage ? `var(--peach-300)` : `var(--sage-800)`} aria-label='Every Tuesday Logo' />
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
              {/* {isTuesdayMakersPage ? alternateNav : <PrimaryNav />} */}
              <PrimaryNav />
            </>}

          {/* DESKTOP SEARCH AND COURSE LOGIN */}
          {breakPointWidth >= 1024 &&
            <motion.div
              animate={serverSettings.productPlatform === ShopPlatformEnum.GUMROAD && gumroadCartOpen ? "open" : "closed"}
              variants={gumroadVarients}
              data-testid="desktop-col-3"
              className={'hidden items-center justify-end laptop:flex'}>

              {/* COURSE LOGIN */}
              {/* <div className="">
            <a className={'normal-link mr-2 underlined after:underlined-active hover:bg-grey-100 border-white border-0 text-grey-700 group px-4 pr-3 py-[13px] rounded-lg inline-flex items-center text-sm desktop:text-base font-semibold transition-all duration-300'} href="https://teachable.com">Course Login</a>
          </div> */}

              <MasterLoginPopOver />

              {/* DESKTOP SEARCH ICON */}
              <div
                data-testid="search-icon-desktop"
                onClick={openSearch}
                className="relative inline-flex items-center justify-center flex-none p-1 overflow-hidden rounded-full w-14 h-14 group">
                <div className={`${isTuesdayMakersPage
                  ? 'text-emerald-400'
                  : 'text-sage-600 dark:text-gray-600'} absolute  cursor-pointer `}>
                  <svg width="56" height="56" >
                    <motion.circle
                      stroke="currentColor"
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
                <div className={`${isTuesdayMakersPage
                  ? 'border border-transparent bg-emerald-500 group-hover:bg-emerald-400'
                  : 'border bg-sage-700 group-hover:bg-sage-500'} transition-colors rounded-full cursor-pointer `}>
                  <div className="w-[20px] h-[20px] m-3">
                    <SearchSvg fill={isTuesdayMakersPage ? 'var(--sage-50)' : '#ffffff'} />
                  </div>
                </div>
              </div>

            </motion.div>}
        </div>

        {/* MOBILE NAV */}
        <AnimatePresence>
          {/* {mobileNav.isOpen && <MobileNav />} */}
          {mobileNav.isOpen && breakPointWidth < 1024 &&
            <MobileNav openSearch={openSearch} />}
        </AnimatePresence>
      </div>
    </header>
  )
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