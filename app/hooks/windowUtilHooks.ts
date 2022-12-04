import { useEffect, useRef, useState } from "react"
import { useInView } from 'react-intersection-observer'

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