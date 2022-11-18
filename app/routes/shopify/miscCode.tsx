import useCart from '@App/hooks/useCart';
import { useFetcher } from '@remix-run/react';
import React from 'react'

export default function miscCode() {



  async function shopifyTestCall() {
    const url = `https://everytuesday.myshopify.com/api/2022-01/graphql.json`
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': "e45e2c4d0ca39305febec0b1737a7081"
      },
      body: JSON.stringify({
        query: createCheckoutV2,
        variables: {
          // checkoutv2
          checkoutId: "Z2lkOi8vc2hvcGlmeS9DaGVja291dC8zMzJhZTFiMzU5MTBjYjc3MTBkOWQ5MDYwNTIxZDBkZj9rZXk9MTNjYjIwOGQ3Y2RhZWFiYzE5ZjI3NWI1OWIzMTRlZGQ=",
          customerAccessToken: "86bc1f2c7b118529c2dc076e7c37842c"



          // createCheckout
          // input: {
          //   allowPartialAddresses: true,
          //   buyerIdentity: {
          //     countryCode: "US"
          //   },
          //   email: "user@example.com",
          //   lineItems: [
          //     { variantId: "Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC8zOTcyODQ1ODU2Mzc5MQ==", quantity: 1 }
          //   ]
          // }


          // ADD ITEM
          // cartId: "Z2lkOi8vc2hvcGlmeS9DYXJ0LzY0ZjcxZjFmMTIwMzRkYmFkZTJhYzhhM2NlZDNjZmU1",
          // varientId: "Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC8zOTcyODQ1ODU2Mzc5MQ=="

          // GET USER LOGGED IN DATA
          // token: "86bc1f2c7b118529c2dc076e7c37842c"

          // CREATE CART
          // input: {
          //   buyerIdentity: {
          //     customerAccessToken: "86bc1f2c7b118529c2dc076e7c37842c"
          //   }
          // }

          // CREATE USER / SIGN IN for TOKEN
          // input: {
          //   email: "user@example.com",
          //   password: "HiZqFuDvDdQ7"
          // }
        },
      }),
    })
    console.log('res', res);
    const apiRes = await res.json()
    console.log('apiRes', apiRes);
  }

  async function addItem() {
    // Gouache Lovers Brush Set: Extended
    const varientId = "Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC8zOTcyODQ1ODU2Mzc5MQ=="
    // const addCartResponse = await addItemToShopifyCart(varientId, cart.id)
    // addItemToCart(addCartResponse)
  }

  async function clearCart() {
    // empty cart
  }
  return (
    <div>
      {/* <EmptyCartBtn />
        <AddToCartBtn /> */}

      {/* <button onClick={shopifyTestCall}>Test Shopify Call</button>
      <a href="https://transactions.sendowl.com/cart?merchant_id=210642" rel="nofollow"><img src="https://transactions.sendowl.com/assets/external/v2/view-cart.png" /></a> <script type="text/javascript" src="https://transactions.sendowl.com/assets/sendowl.js" ></script>
      <a href="https://transactions.sendowl.com/products/78519232/1DC0A989/add_to_cart" rel="nofollow"><img src="https://transactions.sendowl.com/assets/external/v2/add-to-cart.png" /></a><script type="text/javascript" src="https://transactions.sendowl.com/assets/sendowl.js" ></script>
      <a href="https://transactions.sendowl.com/products/78519232/1DC0A989/purchase" rel="nofollow"><img src="https://transactions.sendowl.com/assets/external/v2/buy-now.png" /></a><script type="text/javascript" src="https://transactions.sendowl.com/assets/sendowl.js" ></script> */}
      {/* <button onClick={clearCart}>Empty Cart</button>
      <div>
        <button onClick={addItem}>Add Item to Cart</button>
        <div>Cart items: {cart?.lines.edges.length}</div>
      </div> */}
    </div>
  )
}


const EmptyCartBtn = () => {
  const shopifyForm = useFetcher();
  const { emptyCart, loadNewCart } = useCart()

  // useEffect(() => {
  //   if (shopifyForm.state === 'loading') {
  //     // emptyCart()
  //   }
  //   if (shopifyForm.type === 'done') {
  //     // we created a new cartID and checkoutURL in the API and set it in a new cookie
  //     // pass it down and add it to the emptyCart reduction action
  //     if (shopifyForm.data?.cart) {
  //       // loadNewCart(shopifyForm.data.cart)
  //     }
  //   }
  // }, [shopifyForm.type])
  return (
    <shopifyForm.Form
      method="post"
      className="mb-4"
      action="/shopify/emptyCart"
    >
      {!shopifyForm.data?.pass && <button
        disabled={shopifyForm.state === "submitting"}
        aria-disabled={shopifyForm.state === "submitting"}
        type='submit'
        className="px-8 py-2 text-lg text-white bg-indigo-500 border-0 rounded focus:outline-none hover:bg-indigo-600">
        {shopifyForm.state === "loading" ? '...loading' : 'Empty Cart'}
      </button>}
    </shopifyForm.Form>
  )

}

const AddToCartBtn = () => {

  // Text
  // Price
  // Icon
  // Loading state dancing dots ... or spinner
  // Open Cart after it's added option?
  // dynamic action instead of dynamic varientID

  // Hardcoded productId, but will pass in one when I make it dynamic
  const varientId = "Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC8zOTcyODQ1ODU2Mzc5MQ=="
  const shopifyForm = useFetcher();

  return (
    <shopifyForm.Form
      method="post"
      className="mb-4"
      action={`/shopify/addItemToCart?id=${varientId}`}
    >
      <button
        disabled={shopifyForm.state === "submitting"}
        aria-disabled={shopifyForm.state === "submitting"}
        type='submit'
        className="px-8 py-2 text-lg text-white bg-indigo-500 border-0 rounded focus:outline-none hover:bg-indigo-600">
        {shopifyForm.state === "loading" ? '...loading' : 'Add Item'}
      </button>
    </shopifyForm.Form>
  )

}

const query = `{
  products(first:5) {
    edges {
      node {
        id
      }
    }
  }
}`
// userID "Z2lkOi8vc2hvcGlmeS9DdXN0b21lci81MzcxNDA1MjA1NzEx"
/// token "86bc1f2c7b118529c2dc076e7c37842c"
// expires: "2022-02-22T01:01:46Z"
const createUser = `
  mutation customerCreate($input: CustomerCreateInput!) {
    customerCreate(input: $input) {
      customer {
        id
      }
      customerUserErrors {
        code
        field
        message
      }
    }
  }
`
const login = `
  mutation customerAccessTokenCreate($input: CustomerAccessTokenCreateInput!) {
    customerAccessTokenCreate(input: $input) {
      customerAccessToken {
        accessToken
        expiresAt
      }
      customerUserErrors {
        code
        field
        message
      }
    }
  } 
`
const getUser = `
  query GetUserCart($token: String!){
    customer(customerAccessToken: $token){
      email
    }
  }
`
// cartId: "Z2lkOi8vc2hvcGlmeS9DYXJ0LzY0ZjcxZjFmMTIwMzRkYmFkZTJhYzhhM2NlZDNjZmU1"
const createUserCart = `
  mutation CartTest($input: CartInput) {
    cartCreate(input: $input){
      cart{
        checkoutUrl
        id
      }
    }
  }
`
const createCheckout = `
  mutation checkoutCreate($input: CheckoutCreateInput!) {
    checkoutCreate(input: $input) {
      checkout {
        id
        webUrl
      }
      checkoutUserErrors {
        code
        field
        message
      }
      queueToken
    }
  }
`
const createCheckoutV2 = `
mutation checkoutCustomerAssociateV2($checkoutId: ID!, $customerAccessToken: String!) {
  checkoutCustomerAssociateV2(
    checkoutId: $checkoutId
    customerAccessToken: $customerAccessToken
  ) {
    checkout {
      id
      webUrl
    }
    checkoutUserErrors {
      code
      field
      message
    }
    customer {
      id
    }
  }
}
`