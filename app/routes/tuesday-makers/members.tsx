import { json, LoaderFunction, MetaFunction, redirect, useFetcher, useLoaderData, useMatches } from 'remix'
import { requireResourceLibraryUser } from '../../utils/resourceLibrarySession.server'
import { getHtmlMetadataTags } from '../../utils/seo'
import { fetchAPI } from '../../utils/fetch'
import { GetAllFreebiesQuery } from '../../lib/graphql/queries/resourceLibrary'
import { flattenResourceData } from '../../utils/resourceLibraryUtils'
import FreebieFilter from '../../components/resourceLibrary/freebieFilter'
import useFreebies from '../../hooks/useFreebies'
import Freebie from '../../components/resourceLibrary/freebie'
import { getGraphQLString } from '../../utils/graphqlUtils'
import useSite from '~/hooks/useSite'
import { useEffect } from 'react'
import { addItemToShopifyCart, createCart } from '~/utils/cartUtils'
import useCart from '~/hooks/useCart'
import { ADD_ITEM_TO_CART, GET_CART } from '~/lib/graphql/mutations/cart'
import { ISelectedMatch } from '~/interfaces/remix'

export let meta: MetaFunction = (rootData): any => {

  /*
  rootData gets passed in from the root metadata function
   */
  const { data, location, parentsData } = rootData
  if (!data || !parentsData || !location) {
    return {
      title: '404',
      description: 'error: No metaData or Parents Data',
    }
  }

  // TODO: ADD PAGE COMPONENT
  const page: IPage = {
    id: '24',
    title: 'Resource Library: Members',
    author: {
      id: '22',
      name: 'Teela',
      avatar: {
        url: '',
        width: 24,
        height: 24
      },
      slug: 'resource-library-members'
    },
    slug: 'resource-library-members',
    content: '',
    date: '',
    seo: {
      title: 'Resource Library: Members - Every Tuesday',
      metaDesc: 'Resource Library members only access with over 200+ assets for free!',
      fullHead: '',
      opengraphModifiedTime: '',
      opengraphPublishedTime: '',
      readingTime: '3min'
    }
  }

  /*
  Build Metadata tags for the page
   */
  return getHtmlMetadataTags({
    metadata: parentsData.root.metadata,
    page,
    location
  })
};

export let loader: LoaderFunction = async ({ request, context, params }) => {
  const user = await requireResourceLibraryUser(request, '/tuesday-makers')

  try {
    let data = await fetchAPI(getGraphQLString(GetAllFreebiesQuery))

    return json({
      freebies: flattenResourceData(data.resourceLibraries),
      filterTags: data.cptTags,
      user
    })
  } catch (e) {
    console.error(`e in /tuesday-makers`, e)
    return redirect('/tuesday-makers')
  }
}
interface ILoaderData {
  freebies: IResourceItem[]
  filterTags: IFilterTag[],
  user: IResourceUser,
}

function useCartMatches() {
  const matches = useMatches()
  let selectedMatch: undefined | ISelectedMatch = matches.find(match => match.data?.cart)
  return {
    cart: selectedMatch?.data.cart
  }

}

const ResourceLibraryMembers = () => {
  const data = useLoaderData<ILoaderData>()
  const { state: { user }, resourecLibraryLogin } = useSite()
  const { cart } = useCartMatches()
  console.log('match', cart);

  // const { cart, addItemToCart } = useCart()
  // console.log('cart', cart);

  // console.log('data', data);


  /*
  * Check for user when coming directly from the login page to make sure the user is passed to the global context.
  * Right now user comes from the server side on page refreush and is set in the State, but when you come from a route, it isn't set because the redirect after a form submission happens on the server before the client takes over again. So we must pass the data down to an action manually.
  */
  useEffect(() => {
    // console.log('check for user', user);

    if (!user.resourceUser) {
      resourecLibraryLogin({ user: data.user })
    }
  }, [])

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

  const { filter, handleFilterClick, handlePageClick, posts, pagination } = useFreebies<IResourceItem[]>({ items: data.freebies })

  return (
    <div>
      <h1>Members Area</h1>
      <button onClick={shopifyTestCall}>Test Shopify Call</button>
      <a href="https://transactions.sendowl.com/cart?merchant_id=210642" rel="nofollow"><img src="https://transactions.sendowl.com/assets/external/v2/view-cart.png" /></a> <script type="text/javascript" src="https://transactions.sendowl.com/assets/sendowl.js" ></script>
      <a href="https://transactions.sendowl.com/products/78519232/1DC0A989/add_to_cart" rel="nofollow"><img src="https://transactions.sendowl.com/assets/external/v2/add-to-cart.png" /></a><script type="text/javascript" src="https://transactions.sendowl.com/assets/sendowl.js" ></script>
      <a href="https://transactions.sendowl.com/products/78519232/1DC0A989/purchase" rel="nofollow"><img src="https://transactions.sendowl.com/assets/external/v2/buy-now.png" /></a><script type="text/javascript" src="https://transactions.sendowl.com/assets/sendowl.js" ></script>
      {/* <button onClick={clearCart}>Empty Cart</button> */}
      <div>
        {/* <button onClick={addItem}>Add Item to Cart</button> */}
        <div>Cart items: {cart.lines.edges.length}</div>
      </div>
      {!data.user.tags.includes('Resource Library tag') && <div>Hello Signup </div>}
      <FreebieFilter
        filterTags={data.filterTags}
        selectedFilter={filter}
        handleClick={handleFilterClick}
      />
      <div>
        {posts
          .map(item => (<Freebie key={item.id} {...item} />))}
      </div>
      <div>
        <EmptyCartBtn />
        <AddToCartBtn />
      </div>
      <div>
        {pagination.hasNextPage && <button onClick={handlePageClick}>Show More</button>}
      </div>
    </div>
  )
}
export default ResourceLibraryMembers

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
        className="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">
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
        className="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">
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