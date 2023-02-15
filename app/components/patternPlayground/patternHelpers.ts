// Size of the base 64 image used as a background image that is then repeated.
export const patternTypeSizes = {
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

// Size of the Canvas Img Element that contains the pattern type image size
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

export function getPatternTypeSize(patternType: number) {
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

export function getCanvasSize(patternType: number) {
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

export const setCanvasSize = (patternType: number, canvas: HTMLCanvasElement) => {
  const canvasSize = getCanvasSize(patternType);
  canvas.width = canvasSize.width;
  canvas.height = canvasSize.height;
};

export const drawImage = (ctx: CanvasRenderingContext2D, image: HTMLImageElement, patternType: number, aspectRatio: number) => {
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