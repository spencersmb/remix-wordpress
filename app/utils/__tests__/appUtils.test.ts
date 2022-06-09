/**
 * @jest-environment node
 */

import { BPPX, BreakpointEnums } from "@App/enums/breakpointEnums";
import { breakpointConvertPX, classNames } from "../appUtils";

describe('Utils: AppUtils', () => {

  it('Should have default css classnames', () => {
    const result = classNames(
              false
                ? 'desktop:px-8'
                : '',
              'relative')
    expect(result).toBe('relative');
  })

  it('Should merge css classnames', () => {
    const result = classNames(
              true
                ? 'desktop:px-8'
                : '',
              'relative')
    expect(result).toBe('desktop:px-8 relative');
  })

  it('Should return mobile breakpoint when no params foudn', () => {
    const bp = breakpointConvertPX(BreakpointEnums.jest)
    expect(bp).toBe(320);
  })

  it('Should return mobile breakpoint number', () => {
    const bp = breakpointConvertPX(BreakpointEnums.mobile)
    expect(bp).toBe(320);
  })

  it('Should return tablet breakpoint number', () => {
    const bp = breakpointConvertPX(BreakpointEnums.tablet)
    expect(bp).toBe(768);
  })

  it('Should return laptop breakpoint number', () => {
    const bp = breakpointConvertPX(BreakpointEnums.laptop)
    expect(bp).toBe(1024);
  })

  it('Should return desktop breakpoint number', () => {
    const bp = breakpointConvertPX(BreakpointEnums.desktop)
    expect(bp).toBe(1280);
  })

  it('Should return desktop breakpoint number', () => {
    const bp = breakpointConvertPX(BreakpointEnums.desktopXL)
    expect(bp).toBe(1536);
  })
})