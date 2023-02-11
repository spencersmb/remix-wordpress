
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

const setCanvasSize = (patternType: number, canvas: HTMLCanvasElement) => {
  const canvasSize = getCanvasSize(patternType);
  canvas.width = canvasSize.width;
  canvas.height = canvasSize.height;
};

const drawImage = (ctx: CanvasRenderingContext2D, image: HTMLImageElement, patternType: number, aspectRatio: number) => {
  const imageSize = getPatternTypeSize(patternType)
  const width = imageSize.width / aspectRatio;
  const height = imageSize.height / aspectRatio;

  switch (patternType) {
    case 0:
      ctxDrawStandardPattern(ctx, image, width, height)
      break;
    case 1:
      ctxDrawHalfBlockPattern(ctx, image, width, height)
      break;
    case 2:
      ctxDrawHalfBrickPattern(ctx, image, width, height)
      break;
    default:
      ctxDrawStandardPattern(ctx, image, width, height)
  }
}

const ctxDrawHalfBlockPattern = (ctx: CanvasRenderingContext2D, image: HTMLImageElement, newWidth: number, newHeight: number) => {
  ctx.drawImage(image, 0, 0, image.width, image.height,
    0, 0, newWidth / 2, newHeight / 2);

  const halfImageHeight = newHeight / 2
  const negativeHalfImageHeight = -halfImageHeight

  // drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)
  ctx.drawImage(image, 0, 0, image.width, image.height,
    newWidth / 2,
    negativeHalfImageHeight / 2,
    newWidth / 2,
    newHeight / 2);

  // drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)
  ctx.drawImage(image, 0, 0, image.width, image.height,
    newWidth / 2,
    halfImageHeight / 2,
    newWidth / 2,
    newHeight / 2);
}
const ctxDrawStandardPattern = (ctx: CanvasRenderingContext2D, image: HTMLImageElement, newWidth: number, newHeight: number) => {
  ctx.drawImage(image, 0, 0, image.width, image.height,
    0, 0, newWidth, newHeight);

  // drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)
  ctx.drawImage(image, 0, 0, image.width, image.height,
    newWidth, 0, newWidth, newHeight);

  ctx.drawImage(image, 0, 0, image.width, image.height,
    0, newHeight, newWidth, newHeight);

  ctx.drawImage(image, 0, 0, image.width, image.height,
    newWidth, newHeight, newWidth, newHeight);
}
const ctxDrawHalfBrickPattern = (ctx: CanvasRenderingContext2D, image: HTMLImageElement, newWidth: number, newHeight: number) => {
  ctx.drawImage(image, 0, 0, image.width, image.height,
    0, 0, newWidth / 2, newHeight / 2);

  ctx.drawImage(image, 0, 0, image.width, image.height,
    newWidth / 2, 0, newWidth / 2, newHeight / 2);

  const halfImageWidth = newWidth / 2
  const negativeHalfImageWidth = -halfImageWidth

  // drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)
  ctx.drawImage(image, 0, 0, image.width, image.height,
    negativeHalfImageWidth / 2,
    newHeight / 2,
    newWidth / 2,
    newHeight / 2);

  ctx.drawImage(image, 0, 0, image.width, image.height,
    halfImageWidth / 2,
    newHeight / 2,
    newWidth / 2,
    newHeight / 2);

  ctx.drawImage(image, 0, 0, image.width, image.height,
    (halfImageWidth / 2) + (newWidth / 2),
    newHeight / 2,
    newWidth / 2,
    newHeight / 2);
}

export default function BrushPreview() {
  let data = useLoaderData()

  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [backgroundImage, setBackgroundImage] = useState<any>(null);
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

  /**
   * @function drawImageBasedOnPattern()
   * 
   * The function starts by checking if either image or canvasRef.current is null.If either one is 
   * null, the function returns without doing anything.
   * 
   * Then, it declares a variable canvas and sets it equal to canvasRef.current.It also declares a
   * variable ctx and sets it equal to the 2D rendering context of the canvas obtained from canvas
   * getContext("2d").The function returns if ctx is null.
   * 
   * Next, the function declares three variables image1Url, image2Url, and image3Url to store the
   * URLs of the images drawn on the canvas.
   * 
   * It also declares a variable aspectRatio and sets it equal to the aspect ratio of the imag
   * (height divided by width).
   * 
   * The function then starts processing three different patterns for drawing the image on the
   * canvas.For each pattern, it first calls the setCanvasSize function with the pattern number and
   * the canvas as arguments.Then, it calls the drawImage function with ctx, image, the pattern
   * number, and aspectRatio as arguments.Finally, it stores the data URL of the canvas in the
   * corresponding variable(image1Url, image2Url, or image3Url).After each pattern is processed,
   * the function clears the canvas by calling ctx.clearRect(0, 0, canvas.width, canvas.height)
   * 
   * Finally, the function sets the imageCache object with the URLs of the three images stored in
   * image1Url, image2Url, and image3Url.
   * 
   * Note that this function is declared as a useCallback hook, with an empty array of dependencies
   * This means that it will only be re - created when the dependencies change, otherwise it will
   * use the cached version.
   * 
   */
  const drawImageBasedOnPattern = useCallback((image: HTMLImageElement | null, canvasRef: MutableRefObject<HTMLCanvasElement | null>) => {
    // Exit the function if either the image or the canvas reference is not available
    if (!image || !canvasRef.current) {
      return;
    }

    // Get the canvas element from the reference object
    const canvas = canvasRef.current
    // Get the 2D rendering context from the canvas
    const ctx = canvas.getContext("2d")

    // Exit the function if the 2D rendering context is not available
    if (!ctx) return

    let image1Url = ''
    let image2Url = ''
    let image3Url = ''

    // Calculate the aspect ratio of the image
    const aspectRatio = image.height / image.width


    //// Code for pattern 0
    // Set the size of the canvas for pattern 0
    setCanvasSize(0, canvas)
    // Draw the image onto the canvas with pattern 0
    drawImage(ctx, image, 0, aspectRatio)
    // Save the image data URL of pattern 0
    image1Url = canvas.toDataURL()
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    //// Code for pattern 1
    // Set the size of the canvas for pattern 1
    setCanvasSize(1, canvas)
    // Draw the image onto the canvas with pattern 1
    drawImage(ctx, image, 1, aspectRatio)
    // Save the image data URL of pattern 1
    image2Url = canvas.toDataURL()
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    //// Code for pattern 2
    // Set the size of the canvas for pattern 2
    setCanvasSize(2, canvas)
    // Draw the image onto the canvas with pattern 2
    drawImage(ctx, image, 2, aspectRatio)
    // Save the image data URL of pattern 2
    image3Url = canvas.toDataURL()
    // Set the image cache object with all three patterns
    setImageCache({
      0: image1Url,
      1: image2Url,
      2: image3Url
    })
  }, [])

  React.useEffect(() => {
    drawImageBasedOnPattern(image, canvasRef);
  }, [image, canvasRef, drawImageBasedOnPattern]);

  React.useEffect(() => {
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
