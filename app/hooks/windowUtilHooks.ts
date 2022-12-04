import { useEffect, useRef } from "react"

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