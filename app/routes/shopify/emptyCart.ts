import { ActionFunction, json } from "@remix-run/node";
import { shopifyCartCookie } from "@App/cookies.server";
import { createCart } from "@App/utils/cartUtils";

export let action: ActionFunction = async ({request, params}) => {
  const cart = await createCart()
  const cartId = cart?.cartId || null
  return json({
    cart
  }, {
    headers: {
      "Set-Cookie": await shopifyCartCookie.serialize({ 
        cartId: cartId
      })
    },
  })
}