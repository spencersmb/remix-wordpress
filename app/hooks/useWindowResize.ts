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
    const {state} = useSite()
    const {updateBreakpoint} = useSite()



    useEffect(() => {

      function checkBreakPoint(windowWidth: number) {
        const w = windowWidth
        console.log('w', w);
        
        const bp:BreakpointEnums = w < 640 
          ? BreakpointEnums.mobile 
          : w < 768 
          ? BreakpointEnums.tablet
          : w < 1024 
          ? BreakpointEnums.laptop 
          : w < 1280 
          ? BreakpointEnums.desktop 
          : BreakpointEnums.desktopXL
          
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