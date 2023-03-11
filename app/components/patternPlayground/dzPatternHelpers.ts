
export const setCanvasSize = (patternType: number, canvas: HTMLCanvasElement, image: HTMLImageElement, dimension = 1000) => {

  let factor = dimension
  switch(patternType) {

    // HALF DROP PATTERN
    case 1:
      // create the scale factor based on the image width for 1000px
      factor = dimension / image.width
      canvas.width = (image.width * factor);
      canvas.height = (image.height * factor) / 2 // cut in half because we scaled the image to 1000px
      break;

    // HALF DROP PATTERN
    case 2:
      // create the scale factor based on the image width for 1000px
      factor = dimension / image.width
      canvas.width = (image.width * factor)
      canvas.height = (image.height * factor)
      break;

    // DROP PATTERN
    default:
      factor = dimension
      const scaleFactor = factor / image.width;
      canvas.width = factor
      canvas.height = image.height * scaleFactor
  }
}

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
  // const imageSize = getPatternTypeSize(patternType)
  let width = 0;
  let height = 0;
  let scaleFactor = 0;
  switch(patternType) {

    case 1:
    case 2:
      scaleFactor = 1000 / image.width;
      width = 1000
      height = image.height * scaleFactor
      break;
    /*
    USE FOR STANDARD DROP PATTERN
    */
    default:
      scaleFactor = (1000 / 2) / image.width;
      width = 1000 / 2
      height = image.height * scaleFactor
  }

  // Calculate the width and height of the pattern based on the image size and aspect ratio
  // const width = imageSize.width / aspectRatio;
  // const height = imageSize.height / aspectRatio;

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