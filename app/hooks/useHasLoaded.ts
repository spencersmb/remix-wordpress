import { useEffect, useState } from "react"

export function useHasLoaded(){
  const [loaded, setLoaded] = useState(false)
  useEffect(() => {
    setLoaded(true)
  }, [])
  return {loaded}
}