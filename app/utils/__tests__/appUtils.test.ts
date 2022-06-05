/**
 * @jest-environment node
 */

import { classNames } from "../appUtils";

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
})