import { defaultTo } from "lodash"
import { useEffect, useLayoutEffect, useRef } from "react"
import useSite from "./useSite"
export enum BreakpointEnums {
  mobile = "mobile",
  tablet = "tablet",
  laptop = "laptop",
  desktop = "desktop",
  desktopXL = "desktopXL"
}
const useWindowResize = () => {
    const ResizeRef = useRef<any>(null)
    const previousBreakpoint = useRef<any>(null)
    const {updateBreakpoint} = useSite()

    useEffect(() => {

      function checkBreakPoint(windowWidth: number) {
        const hasScrollbar = window.scrollbars.visible
        const w = windowWidth + (hasScrollbar ? 15 : 0) // 15px buffer for scrollbar
        // console.log('w', w);
        
        let bp = BreakpointEnums.mobile
        if (w >= 0) {
          bp = BreakpointEnums.mobile
        }
        if(w >= 768) {
          bp = BreakpointEnums.tablet
        }
        if(w >= 1024) {
          bp = BreakpointEnums.laptop
        }
        if(w >= 1280) {
          bp = BreakpointEnums.desktop
        }
        if(w >= 1536) {
          bp = BreakpointEnums.desktop
        }

        if (bp !== previousBreakpoint.current) {
          previousBreakpoint.current = bp
          updateBreakpoint(bp)
        }
      }

      ResizeRef.current = new ResizeObserver((obj) => {
        
        // console.log('resized', obj[0].contentRect.width)
        checkBreakPoint(obj[0].contentRect.width)

      }).observe(document.body)


      return () => {
        ResizeRef.current.disconnect()
      }
    },[])


}

export default useWindowResize