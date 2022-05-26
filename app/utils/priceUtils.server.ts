// FUNCTION EXAMPLE
/**
 * formatePrice
 * @tested - 5/25/2022
 * @param price - number, the price to formate
 * @param removeZeros - boolean, if true, remove the zeros at the end of the number 
 */
export function formatePrice(price: number, removeZeros: boolean = false): string {
  if(removeZeros){
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price).replace(/(\.0*|(?<=(\..*))0*)$/, '');
  }
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price);
}