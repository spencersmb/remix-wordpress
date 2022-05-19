import { isEmpty } from "lodash";
import { error } from "xstate/lib/actions";
import { shopifyCartCookie } from "~/cookies.server";
import { ADD_ITEM_TO_CART, CREATE_CART, GET_CART } from "~/lib/graphql/mutations/cart";
import { fetchShopifyStoreFrontRequest } from "./fetch.server";
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
    cartId: data.cartCreate?.cart?.id,
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
const shopifyUrl = `https://everytuesday.myshopify.com/api/2022-01/graphql.json`
export async function getUserCart (request: Request): Promise<IGetUserCart>{
  let cart = null

  // check for a cart ID already set
  const { data } = await findCookie<ICartCookie>(request, shopifyCartCookie)

  // if no cookie found make api call for new cart id
  // do I need to get/load an empty cart api call?
  if(isEmpty(data) || !data.cartId){
    try{
      const createdCart = await createCart()
      if(createdCart?.cartId)
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

export async function addItemToShopifyCart(varientId: string, cartId: string): Promise<ICartLines> {
  const res = await fetch(shopifyUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': window.ENV.SHOPIFY_STOREFRONT_ACCESS_TOKEN
    },
    body: JSON.stringify({
      query: ADD_ITEM_TO_CART,
      variables: {
        cartId,
        varientId
      },
    }),
  })
  if(!res.ok){
    throw new Error('unable to add item to cart')
  }
  const apiRes = await res.json()
  return apiRes.data.cartLinesAdd.cart.lines
}

export async function addItemToCartRequest(varientId: string, cartId: string): Promise<ICartLines> {
  console.log('varientId', varientId);
  
  const res = await fetch(shopifyUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN as string
    },
    body: JSON.stringify({
      query: ADD_ITEM_TO_CART,
      variables: {
        cartId,
        varientId
      },
    }),
  })
  if(!res.ok){
    throw new Error('unable to add item to cart')
  }
  const apiRes = await res.json()
  console.log('apiRes', apiRes);
  
  return apiRes.data
}

export const defaultEmptyCartState = {
  estimatedCost:{
    totalAmount: {
      amount: '0.0'
    }
  },
  lines: {
    edges: []
  }
}