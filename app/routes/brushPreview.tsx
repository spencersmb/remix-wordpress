
import Layout from '@App/components/layoutTemplates/layout'
import type { LoaderFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import type { MutableRefObject } from 'react';
import { useCallback } from 'react';
import React, { Ref, useEffect, useRef, useState } from 'react'

interface Props { }

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  // let searchData = {}
  // searchData = await getBrush(url.origin, 'E-T_Custom_Flat_Marker.brush');
  return json({
    brush: {}
  });
}

const patternTypeSizes = {
  normal: {
    width: 512,
    height: 512
  },
  halfBlock: {
    width: 1024,
    height: 1024
  },
  halfBrick: {
    width: 1024,
    height: 1024
  }
}

const canvasSizes = {
  normal: {
    width: 1024,
    height: 1024
  },
  halfBlock: {
    width: 1024,
    height: 512
  },
  halfBrick: {
    width: 1024,
    height: 1024
  }
}

function getPatternTypeSize(patternType: number) {
  switch (patternType) {
    case 0:
      return patternTypeSizes.normal
    case 1:
      return patternTypeSizes.halfBlock
    case 2:
      return patternTypeSizes.halfBrick
    default:
      return patternTypeSizes.normal
  }
}

function getCanvasSize(patternType: number) {
  switch (patternType) {
    case 0:
      return canvasSizes.normal
    case 1:
      return canvasSizes.halfBlock
    case 2:
      return canvasSizes.halfBrick
    default:
      return canvasSizes.normal
  }
}

export default function BrushPreview() {
  let data = useLoaderData()

  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [backgroundImage, setBackgroundImage] = useState<any>(null);
  // set buttonState to Normal
  const [patternState, setPatternState] = useState(1);

  const [imageCache, setImageCache] = useState<any>({
    0: null,
    1: null,
    2: null
  })
  const [savedImage, setSavedImage] = useState<any>(null)

  const handleFileUpload = (event: any) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e: any) => {
      const loadedImage = new Image();
      loadedImage.src = e.target.result;
      loadedImage.onload = () => {
        setImage(loadedImage);
      };
    };

    reader.readAsDataURL(file);
  };

  const drawImageBasedOnPattern = useCallback((image: any, canvasRef: MutableRefObject<HTMLCanvasElement | null>) => {
    if (!image || !canvasRef.current) {
      return;
    }

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    const aspectRatio = image.height / image.width

    if (!ctx) return

    // const selectedCanvasSize = getCanvasSize(patternState)

    // const canvasSize = {
    //   width: selectedCanvasSize.width,
    //   height: selectedCanvasSize.height
    // }

    // canvas.width = canvasSize.width;
    // canvas.height = canvasSize.height;

    // ctx.clearRect(0, 0, canvas.width, canvas.height);

    // drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)

    // switch (patternState) {
    //   case 0:
    //     // Code for pattern 0
    //     ctx.drawImage(image, 0, 0, image.width, image.height,
    //       0, 0, imageSize.width, imageSize.height);

    //     if (imageCache[0]) {
    //       setBackgroundImage(imageCache[0])
    //       return
    //     }
    //     setBackgroundImage(canvas.toDataURL());
    //     setImageCache({
    //       ...imageCache,
    //       0: canvas.toDataURL()
    //     })

    //     break;

    //   case 1:
    //     // Code for pattern 1
    //     // drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)
    //     ctx.drawImage(image, 0, 0, image.width, image.height,
    //       0, 0, imageSize.width / 2, imageSize.height / 2);

    //     const halfImageHeight = imageSize.height / 2
    //     const negativeHalfImageHeight = -halfImageHeight

    //     // drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)
    //     ctx.drawImage(image, 0, 0, image.width, image.height,
    //       imageSize.width / 2,
    //       negativeHalfImageHeight / 2,
    //       imageSize.width / 2,
    //       imageSize.height / 2);

    //     // drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)
    //     ctx.drawImage(image, 0, 0, image.width, image.height,
    //       imageSize.width / 2,
    //       halfImageHeight / 2,
    //       imageSize.width / 2,
    //       imageSize.height / 2);

    //     if (imageCache[1]) {
    //       console.log('useCache')
    //       setBackgroundImage(imageCache[1])
    //       return
    //     }
    //     setBackgroundImage(canvas.toDataURL());
    //     setImageCache({
    //       ...imageCache,
    //       1: canvas.toDataURL()
    //     })

    //     break;

    //   case 2:
    //     // Code for pattern 2

    //     // drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)
    //     ctx.drawImage(image, 0, 0, image.width, image.height,
    //       0, 0, imageSize.width / 2, imageSize.height / 2);

    //     ctx.drawImage(image, 0, 0, image.width, image.height,
    //       imageSize.width / 2, 0, imageSize.width / 2, imageSize.height / 2);

    //     const halfImageWidth = imageSize.width / 2
    //     const negativeHalfImageWidth = -halfImageWidth

    //     // drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)
    //     ctx.drawImage(image, 0, 0, image.width, image.height,
    //       negativeHalfImageWidth / 2,
    //       imageSize.height / 2,
    //       imageSize.width / 2,
    //       imageSize.height / 2);

    //     ctx.drawImage(image, 0, 0, image.width, image.height,
    //       halfImageWidth / 2,
    //       imageSize.height / 2,
    //       imageSize.width / 2,
    //       imageSize.height / 2);

    //     if (imageCache[2]) {
    //       setBackgroundImage(imageCache[2])
    //       return
    //     }

    //     setBackgroundImage(canvas.toDataURL());
    //     setImageCache({
    //       ...imageCache,
    //       2: canvas.toDataURL()
    //     })

    //     break;
    //   default:
    //     // Code for default pattern
    //     break;
    // }

    let image1Url = ''
    let image2Url = ''
    let image3Url = ''

    // Code for pattern 0
    const normalCanvasSize = getCanvasSize(0)
    const normalSizes = {
      width: normalCanvasSize.width,
      height: normalCanvasSize.height
    }
    canvas.width = normalSizes.width;
    canvas.height = normalSizes.height;

    const normalImageSize = getPatternTypeSize(0)

    const normalSize = {
      width: normalImageSize.width / aspectRatio,
      height: normalImageSize.height / aspectRatio
    }

    ctx.drawImage(image, 0, 0, image.width, image.height,
      0, 0, normalSize.width, normalSize.height);

    // drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)
    ctx.drawImage(image, 0, 0, image.width, image.height,
      normalSize.width, 0, normalSize.width, normalSize.height);

    ctx.drawImage(image, 0, 0, image.width, image.height,
      0, normalSize.height, normalSize.width, normalSize.height);

    ctx.drawImage(image, 0, 0, image.width, image.height,
      normalSize.width, normalSize.height, normalSize.width, normalSize.height);

    image1Url = canvas.toDataURL()
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Code for pattern 1
    const halfBlockCanvasSize = getCanvasSize(1)
    const halfBlockSizes = {
      width: halfBlockCanvasSize.width,
      height: halfBlockCanvasSize.height
    }
    canvas.width = halfBlockSizes.width;
    canvas.height = halfBlockSizes.height;

    const getHalfBlockImageSize = getPatternTypeSize(1)

    const halfBlockImageSize = {
      width: getHalfBlockImageSize.width / aspectRatio,
      height: getHalfBlockImageSize.height / aspectRatio
    }

    ctx.drawImage(image, 0, 0, image.width, image.height,
      0, 0, halfBlockImageSize.width / 2, halfBlockImageSize.height / 2);

    const halfImageHeight = halfBlockImageSize.height / 2
    const negativeHalfImageHeight = -halfImageHeight

    // drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)
    ctx.drawImage(image, 0, 0, image.width, image.height,
      halfBlockImageSize.width / 2,
      negativeHalfImageHeight / 2,
      halfBlockImageSize.width / 2,
      halfBlockImageSize.height / 2);

    // drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)
    ctx.drawImage(image, 0, 0, image.width, image.height,
      halfBlockImageSize.width / 2,
      halfImageHeight / 2,
      halfBlockImageSize.width / 2,
      halfBlockImageSize.height / 2);

    image2Url = canvas.toDataURL()
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Code for pattern 2
    const halfBrickCanvasSize = getCanvasSize(2)
    const halfBrickSizes = {
      width: halfBrickCanvasSize.width,
      height: halfBrickCanvasSize.height
    }
    canvas.width = halfBrickSizes.width;
    canvas.height = halfBrickSizes.height;

    const getHalfBrickImageSize = getPatternTypeSize(2)

    const halfBrickImageSize = {
      width: getHalfBrickImageSize.width / aspectRatio,
      height: getHalfBrickImageSize.height / aspectRatio
    }

    ctx.drawImage(image, 0, 0, image.width, image.height,
      0, 0, halfBrickImageSize.width / 2, halfBrickImageSize.height / 2);

    ctx.drawImage(image, 0, 0, image.width, image.height,
      halfBrickImageSize.width / 2, 0, halfBrickImageSize.width / 2, halfBrickImageSize.height / 2);

    const halfImageWidth = halfBrickImageSize.width / 2
    const negativeHalfImageWidth = -halfImageWidth

    // drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)
    ctx.drawImage(image, 0, 0, image.width, image.height,
      negativeHalfImageWidth / 2,
      halfBrickImageSize.height / 2,
      halfBrickImageSize.width / 2,
      halfBrickImageSize.height / 2);

    ctx.drawImage(image, 0, 0, image.width, image.height,
      halfImageWidth / 2,
      halfBrickImageSize.height / 2,
      halfBrickImageSize.width / 2,
      halfBrickImageSize.height / 2);

    ctx.drawImage(image, 0, 0, image.width, image.height,
      (halfImageWidth / 2) + (halfBrickImageSize.width / 2),
      halfBrickImageSize.height / 2,
      halfBrickImageSize.width / 2,
      halfBrickImageSize.height / 2);

    image3Url = canvas.toDataURL()
    setImageCache({
      0: image1Url,
      1: image2Url,
      2: image3Url
    })


  }, [])
  // const callback = useCallback(() => {},
  React.useEffect(() => {
    // if (image && canvasRef.current) {
    //   const canvas = canvasRef.current;
    //   const ctx = canvas.getContext('2d');
    //   const aspectRatio = image.height / image.width;
    //   if (!ctx) return

    //   // HALF DROP SIZE 1024 × 512 px
    //   canvas.width = 1024;
    //   canvas.height = 512;

    //   const halfDropImageSizes = {
    //     width: 1024 / aspectRatio,
    //     height: 1024 / aspectRatio
    //   }

    //   ctx.clearRect(0, 0, canvas.width, canvas.height);

    //   ctx.drawImage(image, 0, 0, image.width, image.height, 0, 0, halfDropImageSizes.width / 2, halfDropImageSizes.height / 2);

    //   const halfImageHeight = halfDropImageSizes.height / 2
    //   const negativeHalfImageHeight = -halfImageHeight

    //   ctx.drawImage(image, 0, 0, image.width, image.height,
    //     halfDropImageSizes.width / 2,
    //     negativeHalfImageHeight / 2,
    //     halfDropImageSizes.width / 2,
    //     halfDropImageSizes.height / 2);

    //   // drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)
    //   ctx.drawImage(image, 0, 0, image.width, image.height,
    //     halfDropImageSizes.width / 2,
    //     halfImageHeight / 2,
    //     halfDropImageSizes.width / 2,
    //     halfDropImageSizes.height / 2);

    //   setBackgroundImage(canvas.toDataURL());
    // }

    drawImageBasedOnPattern(image, canvasRef);
    console.log('setCache')
  }, [image, canvasRef, drawImageBasedOnPattern]);



  React.useEffect(() => {
    console.log('imageCache', imageCache)
    switch (patternState) {
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


  }, [imageCache, patternState]);

  function handleSaveImage() {
    const selectedImage = new Image();
    selectedImage.src = imageCache[patternState]
    const canvas = canvasRef.current
    if (!canvas || !image) return
    const ctx = canvas.getContext("2d")

    if (!ctx) return

    // Set the dimensions of the canvas to match the desired pattern size
    // const imageSize = {
    //   width: patternSize.width / aspectRatio,
    //   height: patternSize.height / aspectRatio
    // }

    canvas.width = 1024;
    canvas.height = 512;
    const aspectRatio = selectedImage.height / selectedImage.width

    console.log('aspectRatio', aspectRatio)

    const dynamicPatternSize = 400
    const selectedImageBaseSize = getCanvasSize(patternState)

    // Draw the pattern on the canvas
    for (let y = 0; y < canvas.height; y += dynamicPatternSize * aspectRatio) {
      for (let x = 0; x < canvas.width; x += dynamicPatternSize) {
        // Draw a 400x400 repeat unit at (x, y)
        // drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)
        ctx.drawImage(selectedImage, 0, 0, selectedImageBaseSize.width, selectedImageBaseSize.height, x, y, dynamicPatternSize, dynamicPatternSize * aspectRatio);
      }
    }

    // Get the data URL for the pattern
    const dataURL = canvas.toDataURL();
    setSavedImage(dataURL)

    // Save the data URL as an image file
    // const link = document.createElement('a');
    // link.href = dataURL;
    // link.download = 'pattern.png';
    // link.click();
  }


  return (
    <Layout >

      {/* CONTACT FORM + TEXT */}
      <div>
        Test brush file

        <div>
          <div>
            <button
              className={patternState === 0 ? 'text-red-700' : 'text-grey-600'}
              onClick={() => setPatternState(0)}
            >
              Normal</button>
            <button
              className={patternState === 1 ? 'text-red-700' : 'text-grey-600'}
              onClick={() => setPatternState(1)}
            >
              Half-Drop</button>
            <button
              className={patternState === 2 ? 'text-red-700' : 'text-grey-600'}
              onClick={() => setPatternState(2)}
            >
              Half-Brick</button>
          </div>

          <div>
            <button onClick={handleSaveImage}>SAVE IMAGE</button>
          </div>
          <div>
            <input type="file" onChange={handleFileUpload} />
            {image && <p>File uploaded successfully!</p>}
          </div>
          <div>
            <canvas style={{
              display: 'none'
            }} ref={canvasRef}></canvas>
            {/* <button onClick={getSettings}>Parse</button> */}

            {savedImage && <img
              src={savedImage}
              alt="saved img"
              // className="transition-all duration-75 ease-linear"
              style={{
                zIndex: 1,
                height: '512px',
                width: '1024px',
              }} />}

            {/* {file && settings && showBrushPreview(settings)} */}
            {<div
              // className="transition-all duration-75 ease-linear"
              style={{
                backgroundImage: `url(${backgroundImage})`,
                zIndex: 1,
                backgroundSize: '400px',
                height: '512px',
                width: '1024px',
              }} />}



          </div>
        </div>
      </div>

    </Layout>
  )
}
