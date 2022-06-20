import React from "react"
import { useEffect } from "react"

function useSearchScrollFix(isOpen:boolean = false){
  const [openAnimationDone, setOpenAnimationDone] = React.useState(false)
  useEffect(() => {
    if (isOpen && openAnimationDone) {
      setOpenAnimationDone(false)
    }

    if (!isOpen && !openAnimationDone) {
      setTimeout(() => {
        setOpenAnimationDone(true)
      }, 290)
    }
  }, [isOpen, openAnimationDone])

  return {
    openAnimationDone,
  }
}

export default useSearchScrollFix