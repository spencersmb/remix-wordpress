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
  // const { alternateNav } = props
  // const { state: { breakpoint, nav: { mobileNav }, metadata: { serverSettings }, commentsModal }, toggleMobileNav } = useSite()
  // const { openSearch, state: { isOpen } } = useSearch()
  // const circumference = 28 * 2 * Math.PI
  // const strokeDasharray = `${circumference} ${circumference}`
  // const shouldReduceMotion = useReducedMotion()
  // const [gumroadCartOpen, setGumroadCartOpen] = useState(false)
  // const breakPointWidth = breakpointConvertPX(breakpoint)
  // const transition = useTransition();
  // const html = useRef<HTMLHtmlElement | null>(null)
  // const location = useLocation()
  // const isTuesdayMakersPage = location.pathname === '/tuesday-makers'
  // const { navRef } = useTopNav() // Nav slide in and out
  // // ON load listen to when gumroad cart is available and observe it for style changes
  // useEffect(() => {
  //   html.current = document.querySelector('html')

  //   // openSearch()
  //   var observer = new MutationObserver(function (mutations) {
  //     mutations.forEach(function (mutationRecord) {
  //       // console.log('style changed!', mutationRecord);
  //       // @ts-ignorew
  //       const height = mutationRecord.target.style.height
  //       // @ts-ignore
  //       const widthPx = mutationRecord.target.style.width
  //       // console.log('widthPx', widthPx);

  //       //check if widthPx string contains the string calc
  //       // remove px from widthPx and convert to number
  //       const width = widthPx.includes('calc')
  //         ? 'cart'
  //         : Number(widthPx.replace('px', ''))

  //       // console.log('width', width);

  //       if (width !== 'cart') {
  //         // console.log('close', close);

  //         setGumroadCartOpen(false)
  //       } else if (width === 'cart' && !gumroadCartOpen) {
  //         // console.log('open', open);

  //         setGumroadCartOpen(true)
  //       }
  //     });
  //   });

  //   const gumroad = whenAvailable('gumroad-scroll-container', (el: any) => {
  //     if (el.length > 0) {
  //       observer.observe(el[0], { attributes: true, attributeFilter: ['style'] });
  //     }
  //   })

  //   return () => {
  //     observer.disconnect()
  //   }

  // }, [])

  // useEffect(() => {

  //   if (mobileNav.isOpen && html.current) {
  //     html.current.style.overflow = 'hidden'
  //   } else if (!mobileNav.isOpen && html.current) {
  //     html.current.style.overflow = 'auto'
  //   }

  //   if (transition.state === 'loading' && mobileNav.isOpen) {
  //     toggleMobileNav()
  //   }
  // }, [transition, mobileNav.isOpen, toggleMobileNav])


  // useEffect(() => {
  //   if (mobileNav.isOpen && breakPointWidth > 1024) {
  //     toggleMobileNav()
  //   }
  // }, [breakPointWidth, breakpoint, mobileNav.isOpen])
  return (
    <header
      id="header"
    // ref={navRef}
    // className={`${commentsModal.show ? 'laptop:animate-addPadding' : ''} fixed top-0 h-[69px] left-0 z-40 flex w-full transition-transform -translate-y-full ${isTuesdayMakersPage ? 'bg-[#0C2427]' : 'bg-white'} duration-600 inView pr-0 laptop:h-[92px]`}
    >

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
        Post
      </Link>


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