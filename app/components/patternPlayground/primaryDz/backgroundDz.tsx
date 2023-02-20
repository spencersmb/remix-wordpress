import type { MutableRefObject } from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import DzBanner from "../dZbanner/dzBanner";
import Dropzone from "react-dropzone-uploader";
import BackgroundDzCustomLayout from "./backgroundDzLayout";
import BackgroundDzCustomInput from "./backgroundDzCustomInput";
import usePatternPlayground, { starterBgUrl } from "../usePatternProvider";
import DzPattern from "./dzPattern";
import DzMaster from "./dzMaster";

const BackgroundDz = () => {


  // console.log('test', test)

  // const [image, setImage] = useState<HTMLImageElement | null>(null);
  // const [backgroundImage, setBackgroundImage] = useState<any>(null);
  // const [imageCache, setImageCache] = useState<any>({
  //   0: null,
  //   1: null,
  //   2: null
  // })



  return (
    <div className='relative dzBackgroundHeight'>

      <DzBanner />

      <DzPattern />

      <DzMaster />
    </div>

  )
}

export default BackgroundDz