import { useContext, createContext, Dispatch, ReactElement, FunctionComponent } from 'react'
import { IShoppingCartActions, IShoppingCartTypes } from './useCartReducer'
import { IModalTemplate } from '../../components/modals/modalTypes'

interface ICartContextType {
  cart: IShopifyCart,
  dispatch: Dispatch<IShoppingCartActions>
}

export const cartInitialState: IShopifyCart  = {
  checkoutUrl: '',
  id: '',
  isOpen: false,
  lines: {
    edges: []
  }
}
export const CartContext = createContext<ICartContextType>({
  cart: cartInitialState,
  dispatch: () => null
})
CartContext.displayName = 'CartContext'

const useCartContext = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCartContext must be used within a Cart Provider app')
  }
  return context
}

/**
 * @Component useSite
 *
 * Primary context to contain global site data like users, site metadata, menus, etc.
 *
 * Currently used to track logged in Admin user as well as Resource Library user.
 *
 */
const useCart = () => {
  const {cart, dispatch} = useCartContext()

  const loadNewCart = ({cartId, checkoutUrl}: {cartId: string, checkoutUrl: string}) => {
    dispatch({
      type: IShoppingCartTypes.NEW_CART,
      payload: {
        cartId,
        checkoutUrl
      }
    })
  }

  const addItemToCart = (lines: ICartLines) => {
    dispatch({
      type: IShoppingCartTypes.ADD_ITEM_TO_CART,
      payload: {
        lines
      }
    })
  }

  const emptyCart = () =>{
    dispatch({
      type: IShoppingCartTypes.EMPTY_CART
    })
  }

  return {
    loadNewCart,
    emptyCart,
    addItemToCart,
    cart,
    dispatch
  }
}

export default useCart
