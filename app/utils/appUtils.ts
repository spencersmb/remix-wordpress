import { BPPX, BreakpointEnums } from "@App/enums/breakpointEnums";

/**
 * @function classNames
 * @tested - 6/5/2022
 * 
 * @description Helper function that merges the class names of the passed in strings
 * 
 * @param {string} classNames
 * 
 * @returns {string}
 */
export function classNames(...classes: string[]): string {
  return classes.filter(Boolean).join(' ')
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