import { breakpointConvertPX } from "@App/utils/appUtils";
import { whenAvailable } from "@App/utils/timeUtils";
import { consoleHelper } from "@App/utils/windowUtils";
import { useTransition } from "@remix-run/react";
import _ from "lodash";
import type { MutableRefObject} from "react";
import { useCallback} from "react";
import { useEffect, useRef, useState } from "react"
import { useInView } from 'react-intersection-observer'
import { useSearch } from "./useSearch"
import useSite from "./useSite";

export function useGetElementByClassName(className: string) {
  const buttonRef = useRef<null | Element>(null)
  useEffect(() => {
    buttonRef.current = document.getElementsByClassName(className)[0]
  }, [className])
  return {
    buttonRef
  }

}

export function useSetSafariTouchRefs() {
  const touchRef = useRef<boolean>(false)
  const safariRef = useRef<boolean>(false)

  useEffect(() => {

    if (navigator.userAgent.search("Safari") >= 0
      && navigator.userAgent.search("Chrome") < 0
      && navigator.vendor === "Apple Computer, Inc.") {
      // alert("Browser is Safari");
      safariRef.current = true
    }

    if (window.matchMedia("(pointer: coarse)").matches) {
      // touchscreen
      // console.log('TOUCH device');
      // alert('TOUCH device');
      touchRef.current = true;

    }
  }, [])

  return {
    touchDevice: touchRef.current,
    safariBrowser: safariRef.current
  }
}

export function useInViewComponentLoaded(){
  const [ref, inView] = useInView()
  const [loaded, setLoaded] = useState(false)
    useEffect(() => {
    if (inView) {
      setLoaded(true)
    }
  }, [inView])

  return {
    ref,
    loaded
  }
}

interface IuseInputFocusOnTrigger {
  elRef: React.RefObject<HTMLInputElement>
  trigger: boolean
}
export function useInputFocusOnTrigger({
  elRef,
  trigger
}: IuseInputFocusOnTrigger) {
  useEffect(() => {
    if (elRef.current && trigger) {
      // const inputElement: HTMLInputElement = Array.from(elRef.current.elements)
      //   .find((input: any) => input.type === 'search') as HTMLInputElement

      elRef.current.focus();
    }
  }, [trigger, elRef])
}

export function useScrollBarHide({
  htmlDomRef,
  selector
}: { htmlDomRef: MutableRefObject<HTMLElement | null>, selector: string }) {
  const { state: { isOpen } } = useSearch()

  useEffect(() => {

    if (!htmlDomRef.current) {
      htmlDomRef.current = document.querySelector(selector)
    }

    if (isOpen && htmlDomRef.current) {
      const body = htmlDomRef.current.children[1]
      htmlDomRef.current.classList.add('animate-addPadding')
      body.classList.add('overflow-y-hidden')
    }

    if (!isOpen && htmlDomRef.current) {
      const body = htmlDomRef.current.children[1]
      htmlDomRef.current.classList.remove('animate-addPadding')
      body.classList.remove('overflow-y-hidden')
    }
  }, [htmlDomRef, isOpen, selector])
}

export function useCloseModalOnPageTransition() {
  const transition = useTransition();
  const { state: { isOpen }, closeSearch } = useSearch()
  const prevTransitionState = useRef(transition.state)

  // Track last page transition state to determin if page has finished transitioning
  useEffect(() => {
    if (transition.state === 'idle' && isOpen && prevTransitionState.current === 'loading') {
      closeSearch()
    }
    prevTransitionState.current = transition.state

  }, [closeSearch, isOpen, transition])

}

export function useMobileNav() {
  const { state: { breakpoint, nav: { mobileNav } }, toggleMobileNav } = useSite()
  const transition = useTransition();
  const html = useRef<HTMLHtmlElement | null>(null)
  const breakPointWidth = breakpointConvertPX(breakpoint)

  // Set html overflow to hidden when mobile nav is open
  useEffect(() => {
    if (!html.current) {
      console.log('set HTML CURRENT')
      html.current = document.querySelector('html')
    }

    if (mobileNav.isOpen && html.current) {
      html.current.style.overflow = 'hidden'
    } else if (!mobileNav.isOpen && html.current) {
      html.current.style.overflow = 'auto'
    }
  }, [mobileNav.isOpen])

  // if user navigates to a different url and mobile nav is open close it
  useEffect(() => {
    if (transition.state === 'loading' && mobileNav.isOpen) {
      toggleMobileNav()
    }
  }, [transition, mobileNav.isOpen, toggleMobileNav])

  // show nav bsed on breakpoint
  useEffect(() => {
    if (mobileNav.isOpen && breakPointWidth > 1024) {
      toggleMobileNav()
    }
  }, [breakPointWidth, breakpoint, mobileNav.isOpen, toggleMobileNav])

  // TODO: UPDATE FOR NEW Version of GUMROAD
  // is this for mobile nav?


}

export function useGumroadCart(){
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

  }, [gumroadCartOpen])

  return {
    gumroadCartOpen,
  }
}

export function useVisibleOnPageTransition(){
  const transition = useTransition();
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (transition.state === 'loading' && visible) {
      setVisible(false)
    }
  }, [transition, visible])

  
  return {
    visible,
    setVisible
  }
}

export function useWindowOpenUrl({ url, target, open }: { url: string, target: string, open: boolean}){

  useEffect(() => {
    if (open && window) {
      window.open(url, target)
    }
  }, [open, target, url])

}

export function useKeyDown(fn: any) {
  useEffect(() => {
    document.addEventListener('keydown', fn, false);

    return () => {
      document.removeEventListener('keydown', fn, false);
    }
  }, [fn])
}

/**
* updatePosition
* Tracks scroll position and set scrollToTop inView if it reaches the threshold
*/
export function useShowBackToTopBtn(ref: MutableRefObject<HTMLElement | null>) {
  const [showScrollToTopBtn, setShowScrollToTopBtn] = useState<boolean>(false)

  const updatePosition = useCallback(() => {
    if (ref.current && ref.current.scrollTop > 800) {
      setShowScrollToTopBtn(true)
    } else {
      setShowScrollToTopBtn(false)
    }
  }, [ref]);

  useEffect(() => {
    let container = ref.current

    // Tack scroll position of the modal container to hide or show the scroll to top button

    if (container) {
      container.addEventListener("scroll", _.throttle(updatePosition, 500));
    }


    // addResultsRoving()
    return () => {
      if (container) {
        container.removeEventListener("scroll", updatePosition, false);
      }
    }

  }, [ref, updatePosition])

  /**
  * goToTop
  * smooth scroll to the top of the page
  */
  const goToTop = () => {
    if (ref.current) {
      // formRef.current.scrollIntoView({ behavior: "smooth" });
      ref.current.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    }

  };


  return {
    goToTop,
    showScrollToTopBtn
  }
}

export function useLoginOtherTabs(){
  useEffect(() => {

    // Refresh the window if the user logs in on another page
    window.addEventListener('storage', (evt) => {
      consoleHelper('custom fired', evt);
      /**
       * Right now only using Makers_login add or remove storage to trigger logins or logouts
       */
      if (evt.key === 'makers_login' || evt.key === 'makers_logout') {
        window.location.reload();
      }
    });
  }, [])
}