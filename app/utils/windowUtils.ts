import { BreakpointEnums } from "~/hooks/useWindowResize";

export const consoleHelper = (data: string, obj: any = null) => {
  if (process.env.NODE_ENV === 'production') return;

  obj
    ? console.log(data, obj)
    : console.log(data)
}

export enum BPPX {
  MOBILE = 320,
  TABLET = 768,
  LAPTOP = 1024,
  DESKTOP = 1280,
  DESKTOPXL = 1536,
}
export const breakpointConvertPX = (breakpoint: BreakpointEnums):BPPX => {
  switch (breakpoint) {
    case BreakpointEnums.mobile:
      return BPPX.MOBILE;
    case BreakpointEnums.tablet:
      return BPPX.TABLET;
    case BreakpointEnums.laptop:
      return BPPX.LAPTOP;
    case BreakpointEnums.desktop:
      return BPPX.DESKTOP;
    case BreakpointEnums.desktopXL:
      return BPPX.DESKTOPXL;
    default:
      return BPPX.MOBILE;
  }
}