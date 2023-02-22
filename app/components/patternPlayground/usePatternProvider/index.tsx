import type { Dispatch, MutableRefObject } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';
import { useCallback } from 'react';
import { useContext, createContext } from 'react'
import { drawImage, getCanvasSize, setCanvasSize } from '../dzPatternHelpers';
import type { IPPAction } from './usePPReducer';
import { IPPTypes } from './usePPReducer';

export interface IPatternProviderContextState {
  image: HTMLImageElement | null,
  backgroundImage: string | null,
  imageCache: {
    [key: number]: string | null;
  }
  touched: boolean,
  patternType: number
  patternSize: number
  patternRange: [number]
}

interface IPatternProviderContextType {
  state: IPatternProviderContextState,
  dispatch: Dispatch<IPPAction>
}

export const patternPlaygroundInitialState: IPatternProviderContextState = {
  image: null,
  backgroundImage: null,
  imageCache: {
    0: null,
    1: null,
    2: null
  },
  patternType: 1,
  patternSize: 600,
  patternRange: [600],
  touched: false
}

export const PatternProviderContext = createContext<IPatternProviderContextType | undefined>(undefined)
PatternProviderContext.displayName = 'PatternProviderContext'

export const starterBgUrl = 'https://et-website.imgix.net/et-website/images/test-pattern-2.jpg'
const usePatternProviderContext = () => {
  const context = useContext(PatternProviderContext)
  if (!context) {
    throw new Error('usePatternProviderContext must be used within a PatternProviderContext Provider')
  }
  return context
}

/**
 * @Component useSite
 *
 * Primary context to contain global Pattern Playground data.
 *
 */
const usePatternPlayground = () => {
  const { state, dispatch } = usePatternProviderContext()
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const setNewImage = useCallback(({ image }: { image: HTMLImageElement }) => {
    dispatch({
      type: IPPTypes.SAVE_IMAGE,
      payload: {
        image
      }
    })
  }, [dispatch])

  const setBackgroundImage = useCallback((imageUrl: string) => {
    dispatch({
      type: IPPTypes.SET_BG_IMAGE,
      payload: {
        url: imageUrl
      }
    })
  }, [dispatch])

  const setImageCache = useCallback((cache: {
    0: string | null,
    1: string | null,
    2: string | null,
  }) => {
    dispatch({
      type: IPPTypes.SET_IMAGE_CACHE,
      payload: cache
    })
  }, [dispatch])

  // not attached to the reducer
  // explained below
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
    // setImageCache({
    //   0: image1Url,
    //   1: image2Url,
    //   2: image3Url
    // })

    return {
      0: image1Url,
      1: image2Url,
      2: image3Url
    }

  }, [])

  // not attached to the reducer
  const getBase64FromUrl = useCallback(async (url: string) => {
    const data = await fetch(url);
    const blob = await data.blob();
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = () => {
        const base64data = reader.result;
        resolve(base64data);
      }
    });
  }, [])

  const setPatternType = (patternType: number) => {
    dispatch({
      type: IPPTypes.SET_PATTERN_TYPE,
      payload: patternType
    })
  }

  const saveImage = () => {
    const { image, imageCache, patternType, patternSize } = state
    // Create a new Image object from the cached image
    const selectedImage = new Image();
    selectedImage.src = imageCache[patternType] as string

    // Get the canvas and its context
    if (!image) return;

    // DROPZONE REMOVES THE REF SO WE NEED TO GET IT AGAIN
    if (!canvasRef.current) {
      canvasRef.current = document.getElementById('patternCanvas') as HTMLCanvasElement
    }
    let canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set the image file size
    canvas.width = 800;
    canvas.height = 600;

    // Calculate the aspect ratio of the image
    const aspectRatio = selectedImage.height / selectedImage.width;

    // Set the size of the repeat unit
    // This is based on the user scale slider
    const dynamicPatternSize = patternSize;
    const selectedImageBaseSize = getCanvasSize(patternType);

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
    // setSavedImage(dataURL)

    // Save the data URL as an image file
    const link = document.createElement('a');
    link.id = 'downloadLink';
    link.href = dataURL;
    link.download = 'pattern.jpg';
    link.click();

    // Remove the link from the DOM
    document.getElementById('downloadLink')?.remove();

  }

  const changePatternSize = (size: number) => {
    dispatch({
      type: IPPTypes.CHANGE_PATTERN_SIZE,
      payload: size
    })
  }

  const changeRangeSize = (size: [number]) => {
    dispatch({
      type: IPPTypes.CHANGE_PATTERN_RANGE,
      payload: size
    })
  }

  const userTouchedCanvas = () => {
    dispatch({
      type: IPPTypes.SET_TOUCHED
    })
  }

  // When state.image changes, draw the image on the canvas and save the image data URL in the image cache
  useEffect(() => {
    const cache = drawImageBasedOnPattern(state.image, canvasRef);
    if (cache) {
      setImageCache(cache)
    }
  }, [state.image, canvasRef, drawImageBasedOnPattern, setImageCache]);


  return {
    changeRangeSize,
    userTouchedCanvas,
    getBase64FromUrl,
    changePatternSize,
    setBackgroundImage,
    canvasRef,
    setNewImage,
    setPatternType,
    saveImage,
    state,
    dispatch
  }
}

export default usePatternPlayground

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