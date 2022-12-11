import { useEffect } from "react"

interface IUseYouTuveVideoMobile {
  inView: boolean
  buttonRef: Element | null
  touchDevice: boolean
  safariBrowser: boolean
}
export function useYouTubeVideoMobile({
  inView,
  buttonRef,
  touchDevice,
  safariBrowser
}: IUseYouTuveVideoMobile) {
  useEffect(() => {

    if (inView && buttonRef && (touchDevice || safariBrowser)) {
      // console.log('touchDeviceRef.current', touchDevice);
      // console.log('safariRef.current', safariBrowser);
      // console.log('inView', inView);

      // @ts-ignore
      buttonRef.click()
    }

  }, [buttonRef, inView, safariBrowser, touchDevice])
}