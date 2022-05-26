import { ActionFunction, json } from "@remix-run/node";
import { isEmpty } from "lodash";
import { shopifyCartCookie } from "@App/cookies.server";
import { addItemToCartRequest, createCart } from "@App/utils/cartUtils";
import { findCookie } from "@App/utils/loaderHelpers";
interface ICartCookie{
  cartId: string
}
export let action: ActionFunction = async ({request, params}) => {
  const url = new URL(request.url)
  const productId = url.searchParams.get('id')
  
  const { data } = await findCookie<ICartCookie>(request, shopifyCartCookie)
  if(isEmpty(data) || !data.cartId){
      return json({
        error: 'No cart ID found'
      })
  }

  if(productId){
    const res = await addItemToCartRequest(productId, data.cartId)
      
    return json({
      res
    })
  }

  return json({
    error: 'No cart ID found'
  })

  

}