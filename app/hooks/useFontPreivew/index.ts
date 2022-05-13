import { createContext, Dispatch, useContext } from "react"
import { IFontPreviewActions } from "./useFontPreviewReducer"

export interface IFpState {
  status: string
  font: null | IFontFamily
  fontName: null | string
  previewerOpen: false
}
interface IFontPreviewContextType {
  fontPreview: IFpState,
  dispatch: Dispatch<IFontPreviewActions> // add actions
}

export const fontPreviewInitialState: IFpState  = {
  status: 'idle',
  font: null,
  fontName: null,
  previewerOpen: false
}

export const FontPreviewContext = createContext<IFontPreviewContextType>({
  fontPreview: fontPreviewInitialState,
  dispatch: () => null
})

FontPreviewContext.displayName = 'FontPreviewContext'

const useFontPreviewContext = () => {
  const context = useContext(FontPreviewContext)
  if (!context) {
    throw new Error('useFontPreviewContext must be used within a FontPreview Provider')
  }
  return context
}


export type IAddFontFunction = (fontSlug: string | null) => (event: IClickEvent) => void;

/**
 * @Component useSite
 *
 * Primary context to contain global site data like users, site metadata, menus, etc.
 *
 * Currently used to track logged in Admin user as well as Resource Library user.
 *
 */
const useFontPreview = () => {
  const {fontPreview, dispatch} = useFontPreviewContext()

  // const loadNewCart = ({cartId, checkoutUrl}: {cartId: string, checkoutUrl: string}) => {
  //   dispatch({
  //     type: IShoppingCartTypes.NEW_CART,
  //     payload: {
  //       cartId,
  //       checkoutUrl
  //     }
  //   })
  // }

  // const addItemToCart = (lines: ICartLines) => {
  //   dispatch({
  //     type: IShoppingCartTypes.ADD_ITEM_TO_CART,
  //     payload: {
  //       lines
  //     }
  //   })
  // }

  // const emptyCart = () =>{
  //   dispatch({
  //     type: IShoppingCartTypes.EMPTY_CART
  //   })
  // }

  const addFontToPreview:IAddFontFunction = (fontName) => (event: IClickEvent) => {
    console.log('addFont', fontName);
  }

  return {
    // loadNewCart,
    // emptyCart,
    // addItemToCart,
    addFontToPreview,
    fontPreviewState: fontPreview,
    dispatch
  }
}

export default useFontPreview