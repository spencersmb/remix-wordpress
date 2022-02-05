export function formatePrice(price: number, removeZeros: boolean = false): string {
  if(removeZeros){
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price).replace(/(\.0*|(?<=(\..*))0*)$/, '');
  }
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price);
}