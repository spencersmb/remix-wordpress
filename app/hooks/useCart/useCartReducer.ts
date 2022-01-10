import { consoleHelper } from '../../utils/windowUtils'
import { IModalTemplate } from '../../components/modals/modalTypes'

export enum IShoppingCartTypes {
  MODAL_OPEN = 'MODAL_OPEN',
}
interface IOpenModal {
  type: IShoppingCartTypes.MODAL_OPEN,
  payload: {
    template: IModalTemplate
  }
}

export type IShoppingCartActions =
| IOpenModal

export const useCartReducer = (cart: IShopifyCart, action: IShoppingCartActions): IShopifyCart => {
  consoleHelper('site reducer action', action)
  switch (action.type) {
  

    // add to cart we need to first make the api query and then we can call this reducer
    case IShoppingCartTypes.MODAL_OPEN :
      return {
        ...cart,
        // modal:{
        //   ...state.modal,
        //   component: action.payload.template,
        //   open: true,
        // }
      }
    default: {
      // throw new Error(`Unhandled action type: ${action.type}`)
      return cart
    }
  }
}
