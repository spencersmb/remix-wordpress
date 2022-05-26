import { consoleHelper } from '../../utils/windowUtils'
import { IModalTemplate } from '../../components/modals/modalTypes'
import { defaultEmptyCartState } from '@App/utils/cartUtils'

export enum IShoppingCartTypes {
  ADD_ITEM_TO_CART = 'ADD_ITEM_TO_CART',
  EMPTY_CART = 'EMPTY_CART',
  NEW_CART = 'NEW_CART',
}
interface IAddItemToCart {
  type: IShoppingCartTypes.ADD_ITEM_TO_CART,
  payload: {
    lines: ICartLines
  }
}

interface IEmptyCart {
  type: IShoppingCartTypes.EMPTY_CART
}

interface INewCart {
  type: IShoppingCartTypes.NEW_CART,
  payload: {
    cartId: string
    checkoutUrl: string
  }
}

export type IShoppingCartActions =
| IAddItemToCart
| IEmptyCart
| INewCart

export const useCartReducer = (cart: IShopifyCart, action: IShoppingCartActions): IShopifyCart => {
  consoleHelper('site reducer action', action)
  switch (action.type) {
  
    // add to cart we need to first make the api query and then we can call this reducer
    case IShoppingCartTypes.ADD_ITEM_TO_CART :
      return {
        ...cart,
        lines: action.payload.lines
      }
    case IShoppingCartTypes.NEW_CART : 
      return{
        ...cart,
        id: action.payload.cartId,
        checkoutUrl: action.payload.checkoutUrl,
      }
    case IShoppingCartTypes.EMPTY_CART : 
      return{
        ...cart,
        ...defaultEmptyCartState,
        isOpen: false
      }
    default: {
      // throw new Error(`Unhandled action type: ${action.type}`)
      return cart
    }
  }
}
