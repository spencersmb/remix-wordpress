import { useRef } from 'react'

export default function useTopNavObs() {
  // nav oberservable
  const navRef = useRef<null | HTMLDivElement>(null)
  let lastScrollTop: number = 0;
}
