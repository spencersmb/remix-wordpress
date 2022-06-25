import React, { useRef } from "react"
import { useEffect } from "react"

function useSearchScrollFix(isOpen:boolean = false){
  const [openAnimationDone, setOpenAnimationDone] = React.useState(false)
  const prevOpenState = useRef<boolean>(false)

  // Track previous open state
  useEffect(() => {

    // if modal is open and animation is done, this means the modal is fully open already
    // so set Animation Done to false to reset it because we want to make the scroll bar appear
    // after the animation is done on close
    if (isOpen && openAnimationDone) {
      setOpenAnimationDone(false)
    }

    // When the modal transitions from open to closed, we want to let the component know the animation is done
    if (prevOpenState.current && !isOpen && !openAnimationDone) {
      setTimeout(() => {
        console.log('set');
        
        setOpenAnimationDone(true)
      }, 290)
    }
    prevOpenState.current = isOpen

  }, [isOpen, openAnimationDone])

  return {
    openAnimationDone,
  }
}

export default useSearchScrollFix