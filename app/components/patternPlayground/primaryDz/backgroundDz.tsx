import type { MutableRefObject } from "react";
import { useCallback, useEffect, useRef, useState } from "react";
//@ts-ignore
import { getDroppedOrSelectedFiles } from 'html5-file-selector'
import DzBanner from "../dZbanner/dzBanner";
import Dropzone from "react-dropzone-uploader";
import BackgroundDzCustomLayout from "./backgroundDzLayout";
import BackgroundDzCustomInput from "./backgroundDzCustomInput";
import usePatternPlayground, { starterBgUrl } from "../usePatternProvider";

const BackgroundDz = () => {

  const { state: { imageCache, backgroundImage, patternType, touched }, setNewImage, canvasRef, setBackgroundImage, getBase64FromUrl, userTouchedCanvas } = usePatternPlayground()
  const loadedRef = useRef(false)
  // console.log('test', test)

  // const [image, setImage] = useState<HTMLImageElement | null>(null);
  // const [backgroundImage, setBackgroundImage] = useState<any>(null);
  // const [imageCache, setImageCache] = useState<any>({
  //   0: null,
  //   1: null,
  //   2: null
  // })

  useEffect(() => {
    setTimeout(() => {
      loadedRef.current = true
    }, 1000)
    getBase64FromUrl(starterBgUrl).catch(console.error).then((result: any) => {
      const loadedImage = new Image();
      loadedImage.src = result
      setNewImage({ image: loadedImage })
    })

  }, [getBase64FromUrl, setNewImage])

  const getUploadParams = () => {
    return { url: 'https://httpbin.org/post' }
  }

  const handleChangeStatus = (data: any, status: any) => {
    console.log('status', status)
    // console.log('meta', data)

    if (status === 'getting_upload_params') {
      // if (status === 'done') {
      const file = data.file;
      const reader = new FileReader();

      reader.onload = (e: any) => {
        const loadedImage = new Image();
        loadedImage.src = e.target.result;
        loadedImage.onload = () => {
          setNewImage({ image: loadedImage })

          if (!touched) {
            userTouchedCanvas()
          }
          // setImage(loadedImage)
        };
      };

      reader.readAsDataURL(file);
      // }
    }

  }

  const getFilesFromEvent = (e: any) => {
    return new Promise(resolve => {
      getDroppedOrSelectedFiles(e).then((chosenFiles: any) => {
        resolve(chosenFiles.map((f: any) => f.fileObject))
      })
    })
  }

  const handleSubmit = (files: any, allFiles: any) => {
    console.log(files.map((f: any) => f.data))
    allFiles.forEach((f: any) => f.remove())
  }

  useEffect(() => {
    console.log('imageCache', imageCache)

    switch (patternType) {
      case 0:
        if (imageCache[0]) {
          setBackgroundImage(imageCache[0])
          return
        }
        break;

      case 1:
        if (imageCache[1]) {
          setBackgroundImage(imageCache[1])
          return
        }
        break;

      case 2:
        if (imageCache[2]) {
          setBackgroundImage(imageCache[2])
          return
        }
        break;

      default:
        if (imageCache[0]) {
          setBackgroundImage(imageCache[0])
          return
        }
        break;
    }

  }, [imageCache, patternType, setBackgroundImage]);

  return (
    <div className='relative'>

      <DzBanner />

      <Dropzone
        getUploadParams={getUploadParams}
        onChangeStatus={handleChangeStatus}
        LayoutComponent={props => <BackgroundDzCustomLayout {...props}
          touched={touched}
          backgroundImage={backgroundImage}
          canvasRef={canvasRef}
          loaded={loadedRef.current}
        />}
        onSubmit={handleSubmit}
        classNames={{
          dropzone: 'upload transition-all duration-300 ease-in-out w-full dzBackgroundHeight',
        }}
        accept="image/*"
        inputContent={(files, extra) => (extra.reject ? 'Image files only' : 'Drag Files')}
        InputComponent={BackgroundDzCustomInput}
        //@ts-ignore
        getFilesFromEvent={getFilesFromEvent}
        styles={{
          dropzone: { minHeight: 600, maxHeight: 1250, overflow: 'hidden', position: 'relative' },
          dropzoneReject: { borderColor: 'red', backgroundColor: '#DAA' },
          inputLabel: (files, extra) => (extra.reject ? { color: 'red' } : {}),
          dropzoneActive: { backgroundColor: 'transparent' }
        }}
      />
    </div>

  )
}

export default BackgroundDz