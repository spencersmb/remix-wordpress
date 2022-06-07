
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