import type { MutableRefObject } from "react";
import { useCallback, useEffect, useRef, useState } from "react";
//@ts-ignore
import { getDroppedOrSelectedFiles } from 'html5-file-selector'
import { drawImage, setCanvasSize } from "../patternHelpers";
import DzBanner from "../dZbanner/dzBanner";
import Dropzone from "react-dropzone-uploader";
import BackgroundDzCustomLayout from "./backgroundDzLayout";
import BackgroundDzCustomInput from "./backgroundDzCustomInput";
import usePatternPlayground from "../usePatternProvider";

const BackgroundDz = () => {

  const { state: { imageCache, backgroundImage, patternType }, setNewImage, canvasRef, setBackgroundImage } = usePatternPlayground()
  // console.log('test', test)

  // const [image, setImage] = useState<HTMLImageElement | null>(null);
  // const [backgroundImage, setBackgroundImage] = useState<any>(null);
  // const [imageCache, setImageCache] = useState<any>({
  //   0: null,
  //   1: null,
  //   2: null
  // })

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
    // var fileUpload = document?.querySelector(".upload");
    // console.log(fileUpload)

    // fileUpload?.addEventListener("dragover", (e: any) => {
    //   e.currentTarget.classList.add("!bg-red-800");
    //   if (!isHovering) {
    //     setIsHovering(true)
    //   }
    // });

    // fileUpload?.addEventListener("dragleave", (e: any) => {
    //   e.currentTarget.classList.remove("!bg-red-800");
    //   setIsHovering(false)
    // });

    // fileUpload?.addEventListener("drop", (e: any) => {
    //   e.currentTarget.classList.remove("!bg-red-800");
    //   setIsHovering(false)
    // });

    // fileUpload?.addEventListener("change", (e: any) => {
    //   e.currentTarget.classList.remove("!bg-red-800");
    //   setIsHovering(false)
    // }, false);

  }, [])

  // const drawImageBasedOnPattern = useCallback((image: HTMLImageElement | null, canvasRef: MutableRefObject<HTMLCanvasElement | null>) => {
  //   // Exit the function if either the image or the canvas reference is not available
  //   if (!image || !canvasRef.current) {
  //     return;
  //   }

  //   // Get the canvas element from the reference object
  //   const canvas = canvasRef.current
  //   // Get the 2D rendering context from the canvas
  //   const ctx = canvas.getContext("2d")

  //   // Exit the function if the 2D rendering context is not available
  //   if (!ctx) return

  //   let image1Url = ''
  //   let image2Url = ''
  //   let image3Url = ''

  //   // Calculate the aspect ratio of the image
  //   const aspectRatio = image.height / image.width


  //   //// Code for pattern 0
  //   // Set the size of the canvas for pattern 0
  //   setCanvasSize(0, canvas)
  //   // Draw the image onto the canvas with pattern 0
  //   drawImage(ctx, image, 0, aspectRatio)
  //   // Save the image data URL of pattern 0
  //   image1Url = canvas.toDataURL()
  //   // Clear the canvas
  //   ctx.clearRect(0, 0, canvas.width, canvas.height);

  //   //// Code for pattern 1
  //   // Set the size of the canvas for pattern 1
  //   setCanvasSize(1, canvas)
  //   // Draw the image onto the canvas with pattern 1
  //   drawImage(ctx, image, 1, aspectRatio)
  //   // Save the image data URL of pattern 1
  //   image2Url = canvas.toDataURL()
  //   // Clear the canvas
  //   ctx.clearRect(0, 0, canvas.width, canvas.height);

  //   //// Code for pattern 2
  //   // Set the size of the canvas for pattern 2
  //   setCanvasSize(2, canvas)
  //   // Draw the image onto the canvas with pattern 2
  //   drawImage(ctx, image, 2, aspectRatio)
  //   // Save the image data URL of pattern 2
  //   image3Url = canvas.toDataURL()
  //   // Set the image cache object with all three patterns
  //   setImageCache({
  //     0: image1Url,
  //     1: image2Url,
  //     2: image3Url
  //   })
  // }, [])

  // useEffect(() => {
  //   console.log('new image')
  //   drawImageBasedOnPattern(image, canvasRef);
  // }, [image, canvasRef, drawImageBasedOnPattern]);

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

      <DzBanner backgroundImage={backgroundImage} />

      <Dropzone
        getUploadParams={getUploadParams}
        onChangeStatus={handleChangeStatus}
        LayoutComponent={props => <BackgroundDzCustomLayout {...props} backgroundImage={backgroundImage} canvasRef={canvasRef} />}
        onSubmit={handleSubmit}
        classNames={{
          dropzone: 'upload transition-all duration-300 ease-in-out w-full dzBackgroundHeight',
        }}
        accept="image/*,audio/*,video/*"
        inputContent="Drop Files (Custom Layout)"
        InputComponent={BackgroundDzCustomInput}
        //@ts-ignore
        getFilesFromEvent={getFilesFromEvent}
        styles={{
          dropzone: { minHeight: 600, maxHeight: 1250, overflow: 'hidden', position: 'relative' },
          dropzoneReject: { borderColor: 'red', backgroundColor: '#DAA' },
          dropzoneActive: { backgroundColor: 'transparent' }
        }}
      />
    </div>

  )
}

export default BackgroundDz