import { Link } from '@remix-run/react'
import { calcLength, motion, useReducedMotion } from 'framer-motion'
import React, { useEffect, useRef, useState } from 'react'
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

function whenAvailable(name: string, callback: any) {
  var interval = 10; // ms
  window.setTimeout(function () {
    // const el = document.getElementsByClassName('.gumroad-scroll-container')
    const el = document.getElementsByClassName(name)
    // console.log('el', el);

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
  const { state: { metadata: { serverSettings }, commentsModal } } = useSite()
  const { openSearch, state: { isOpen } } = useSearch()
  const circumference = 28 * 2 * Math.PI
  const strokeDasharray = `${circumference} ${circumference}`
  const shouldReduceMotion = useReducedMotion()
  const { navRef } = useTopNav() // Nav slide in and out
  const [gumroadCartOpen, setGumroadCartOpen] = useState(false)

  // ON load listen to when gumroad cart is available and observe it for style changes
  useEffect(() => {
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

  return (
    <header
      ref={navRef}
      className={classNames(commentsModal.show ? 'laptop:animate-addPadding' : '', `fixed top-0 left-0 z-40 flex w-full transition-transform -translate-y-full bg-white duration-600 inView pr-0`)}>
      <nav aria-label="Main navigation" className="grid items-center w-full mx-5 my-2 grid-cols-navMobile laptop:my-[10px] laptop:grid-cols-navDesktop desktop:grid-cols-navDesktopXl">

        {/* ET LOGO */}
        <div data-testid="logo" className="max-w-[144px] desktop:max-w-[200px]">
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
          className={classNames(serverSettings.productPlatform === ShopPlatformEnum.GUMROAD && gumroadCartOpen
            ? 'mr-16'
            : '',
            'flex justify-center px-2 py-4 laptop:hidden')}>
          <div className="max-w-[20px]">
            <HamburgerSvg fill={`var(${cssColors.primaryPlum700})`} />
          </div>
        </div>

        {/* PRIMARY NAV */}
        {alternateNav ? alternateNav : <PrimaryNav />}

        {/* DESKTOP SEARCH AND COURSE LOGIN */}
        <motion.div
          animate={serverSettings.productPlatform === ShopPlatformEnum.GUMROAD && gumroadCartOpen ? "open" : "closed"}
          variants={gumroadVarients}
          data-testid="desktop-col-3"
          className={'hidden items-center justify-end laptop:flex'}>

          {/* COURSE LOGIN */}
          <div className="">
            <a className={'normal-link mr-2 underlined after:underlined-active hover:bg-grey-100 border-white border-0 text-grey-700 group px-4 pr-3 py-[13px] rounded-lg inline-flex items-center text-sm desktop:text-base font-semibold transition-all duration-300'} href="https://teachable.com">Course Login</a>
          </div>

          {/* DESKTOP SEARCH ICON */}
          <div
            data-testid="search-icon-desktop"
            onClick={openSearch}
            className="relative inline-flex items-center justify-center flex-none p-1 overflow-hidden rounded-full w-14 h-14 group">
            <div className="absolute text-gray-200 cursor-pointer dark:text-gray-600">
              <svg width="56" height="56" >
                <motion.circle
                  stroke="var(--sage-600)"
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
            <div className="transition-colors border rounded-full cursor-pointer bg-sage-700 group-hover:bg-sage-500">
              <div className="w-[20px] h-[20px] m-3">
                <SearchSvg fill={'#ffffff'} />
              </div>
            </div>
          </div>

        </motion.div>
      </nav>
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