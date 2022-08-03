import { useEffect, useState } from 'react'

function UseProgressiveImage(src: string, inView: boolean) {
  const [sourceLoaded, setSourceLoaded] = useState<null | string>(null)

  useEffect(() => {
    if (!inView) return
    const img = new Image()
    img.src = src
    img.onload = () => setSourceLoaded(src)
  }, [src, inView])

  return sourceLoaded
}

export default UseProgressiveImage
