import { isEmpty } from "lodash";
import { shopifyCartCookie } from "~/cookies.server";
import { CREATE_CART, GET_CART } from "~/lib/graphql/mutations/cart";
import { fetchShopifyStoreFrontRequest } from "./fetch";
import { findCookie } from "./loaderHelpers";


export async function createCart (): Promise<ICartQueryResponse | null> {
  const data = await fetchShopifyStoreFrontRequest({
    query: CREATE_CART,
    variables: null
  })
  console.log('create cart data', data);
  
  if(!data){
    return null
  }

  return {
    cardId: data.cartCreate?.cart?.id,
    checkoutUrl: data.cartCreate?.cart?.checkoutUrl
  }
}

export async function getShopifyCart (cartId: string): Promise<IGetCartQueryResponse | null> {
  
  const data = await fetchShopifyStoreFrontRequest({
    query: GET_CART,
    variables: {
      cartId
    }
  })
  console.log('get cart data', data);
  
  if(!data){
    return null
  }

  return data.cart
}

/*
Check request for cookie and return data or null
*/
interface IGetUserCart {
  cart: IGetCartQueryResponse | null,
  newCart: boolean
}
interface ICartCookie{
  cartId: string
}
export async function getUserCart (request: Request): Promise<IGetUserCart>{
  let cart = null

  // check for a cart ID already set
  const { data } = await findCookie<ICartCookie>(request, shopifyCartCookie)

  // if no cookie found make api call for new cart id
  // do I need to get/load an empty cart api call?
  if(isEmpty(data)){
    try{
      const createdCart = await createCart()
      if(createdCart?.cardId)
      return{
        cart:{
          ...createdCart,
          ...defaultEmptyCartState
        },
        newCart: true
      }
    }catch(e: any){
      console.error('unable to create a cart')
      throw new Error('unable to create a cart')
    }
    
  }

  // if cookie found 
  // get cookieID
  // make api call to get/load cart
  cart = await getShopifyCart(data.cartId)

  return{
    cart,
    newCart: false
  }

  
}

const defaultEmptyCartState = {
  estimatedCost:{
    totalAmount: {
      amount: '0.0'
    }
  },
  lines: {
    edges: []
  }
}