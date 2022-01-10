import { useCartReducer } from './useCartReducer'
import { ReactElement, useReducer } from 'react'
import { CartContext } from './index'

/**
 * @Component UseCartProvider
 *
 * Primary component to provide context to the whole app for things like Navs, Modals, Users
 */

interface IProps {
  children?: ReactElement,
  defaultState: IShopifyCart
}
const UseCartProvider = ({ children, defaultState }: IProps) => {
  const [cart, dispatch] = useReducer(useCartReducer, defaultState)
  const value = { cart, dispatch }
  return <CartContext.Provider value={value}>
    {children}
  </CartContext.Provider>
}

export default UseCartProvider
