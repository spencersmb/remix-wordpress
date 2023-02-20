


/*
  Size of the base 64 image used inside the canvas element.
  Determining this size helps to make sure everything is drawn at the same scale.
*/
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
const patternTypes = [
  patternTypeSizes.normal,
  patternTypeSizes.halfBlock,
  patternTypeSizes.halfBrick
]
export function getPatternTypeSize(patternType: number) {
  return patternTypes[patternType] || patternTypes[0]
}


/*
Size of the Canvas Img Element that contains the pattern type image size
*/
export const canvasSizes = {
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
const canvasSizesArray = [
  canvasSizes.normal,
  canvasSizes.halfBlock,
  canvasSizes.halfBrick
]
export function getCanvasSize(patternType: number) {
  return canvasSizesArray[patternType] || canvasSizesArray[0]
}
export const setCanvasSize = (patternType: number, canvas: HTMLCanvasElement) => {
  const canvasSize = getCanvasSize(patternType);
  canvas.width = canvasSize.width;
  canvas.height = canvasSize.height;
};

/**
 * Draws an image on a canvas context with a specific pattern type and aspect ratio.
 *
 * @param ctx The canvas context to draw on.
 * @param image The image to draw.
 * @param patternType The type of pattern to use.
 * @param aspectRatio The aspect ratio of the image.
 */
export const drawImage = (ctx: CanvasRenderingContext2D, image: HTMLImageElement, patternType: number, aspectRatio: number) => {

  // Get the size of the pattern based on the pattern type
  const imageSize = getPatternTypeSize(patternType)

  // Calculate the width and height of the pattern based on the image size and aspect ratio
  const width = imageSize.width / aspectRatio;
  const height = imageSize.height / aspectRatio;

  // Draw the image on the canvas context with the appropriate pattern based on the pattern type
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

export const ctxDrawHalfBlockPattern = (ctx: CanvasRenderingContext2D, image: HTMLImageElement, newWidth: number, newHeight: number) => {
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
export const ctxDrawStandardPattern = (ctx: CanvasRenderingContext2D, image: HTMLImageElement, newWidth: number, newHeight: number) => {
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
export const ctxDrawHalfBrickPattern = (ctx: CanvasRenderingContext2D, image: HTMLImageElement, newWidth: number, newHeight: number) => {
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

export function convertToPercentage(num: number) {
  return Math.ceil((((num - 200) / (1000 - 200)) * 100));
}