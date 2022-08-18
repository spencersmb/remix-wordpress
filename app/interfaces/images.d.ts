interface ImgixImageType {
  src: string,
  placeholder?: string
  width: number,
  height: number
  alt: string
}

interface CreateImgixParams { 
  staticImage?: {
    src: string,
    width: number,
    height: number
    placeholder: string
  }
  src?: string, 
  mobileSize: number, 
  width?: number, 
  height?: number, 
  alt: string,
  compress?: boolean
}

interface CreateImgixReturn {image: ImgixImageType, defaultSrc: string}