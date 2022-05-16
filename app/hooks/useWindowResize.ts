import { defaultTo } from "lodash"
import { useEffect, useLayoutEffect, useRef } from "react"

const useWindowResize = () => {
    const ResizeRef = useRef<any>(null)
    useEffect(() => {

      ResizeRef.current = new ResizeObserver((obj) => {
        console.log('resized', obj[0].contentRect.width)
      }).observe(document.body)


      return () => {
        ResizeRef.current.disconnect()
      }
    },[])

}

export default useWindowResize