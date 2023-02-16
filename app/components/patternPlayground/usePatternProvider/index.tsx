import type { Dispatch, MutableRefObject } from 'react';
import { useEffect } from 'react';
import { ReactElement, FunctionComponent, useRef } from 'react';
import { useCallback } from 'react';
import { useContext, createContext } from 'react'
import { drawImage, getCanvasSize, setCanvasSize } from '../patternHelpers';
import type { IPPAction } from './usePPReducer';
import { IPPTypes } from './usePPReducer';

export interface IPatternProviderContextState {
  image: HTMLImageElement | null,
  backgroundImage: string | null,
  imageCache: {
    [key: number]: string | null;
  }
  patternType: number
  patternSize: number
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
  patternSize: 600
}

export const PatternProviderContext = createContext<IPatternProviderContextType | undefined>(undefined)
PatternProviderContext.displayName = 'PatternProviderContext'

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
 * Primary context to contain global site data like users, site metadata, menus, etc.
 *
 * Currently used to track logged in Admin user as well as Resource Library user.
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

  const setPatternType = (patternType: number) => {
    dispatch({
      type: IPPTypes.SET_PATTERN_TYPE,
      payload: patternType
    })
  }

  const saveImage = () => {
    const { image, imageCache, patternType } = state
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
    const dynamicPatternSize = 400;
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

  useEffect(() => {
    const cache = drawImageBasedOnPattern(state.image, canvasRef);
    if (cache) {
      setImageCache(cache)
    }
  }, [state.image, canvasRef, drawImageBasedOnPattern, setImageCache]);


  return {
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
