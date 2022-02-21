import { json, LoaderFunction, MetaFunction, redirect, useFetcher, useLoaderData, useMatches } from 'remix'
import { requireResourceLibraryUser } from '../../utils/resourceLibrarySession.server'
import { getHtmlMetadataTags } from '../../utils/seo'
import { fetchAPI } from '../../utils/fetch'
import { GetAllFreebiesQuery } from '../../lib/graphql/queries/resourceLibrary'
import { flattenResourceData } from '../../utils/resourceLibraryUtils'
import FreebieFilter from '../../components/resourceLibrary/freebieFilter'
import useFreebies from '../../hooks/useFreebies'
import { getGraphQLString } from '../../utils/graphqlUtils'
import useSite from '~/hooks/useSite'
import { useEffect } from 'react'
import { addItemToShopifyCart, createCart } from '~/utils/cartUtils'
import useCart from '~/hooks/useCart'
import { ADD_ITEM_TO_CART, GET_CART } from '~/lib/graphql/mutations/cart'
import { ISelectedMatch } from '~/interfaces/remix'
import FreebieGrid from '~/components/resourceLibrary/freebieGrid'
import OutlinedButton from '~/components/buttons/outlinedButton'
import { consoleHelper } from '~/utils/windowUtils'

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
      // filterTags: data.cptTags,
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
// TODO: UPDATE GRAPHQL SCHEMA on GRAPHQL API
// TODO: Update plugin on ET and API 
// 
const filterTags = [
  {
    name: 'All',
    slug: 'all',
  },
  {
    name: 'Procreate Brushes',
    slug: "procreate-brushes",
  },
  {
    name: 'Color Palettes',
    slug: "color-palettes",
  },
  {
    name: 'Procreate',
    slug: "procreate",
  },
  {
    name: 'Fonts',
    slug: "fonts",
  },
  {
    name: 'Patterns',
    slug: "patterns",
  },
  {
    name: 'Psd\'s',
    slug: "psds",
  },
  {
    name: 'Style Studies',
    slug: "style-studies",
  },
  {
    name: 'Textures',
    slug: "textures",
  },

]
const ordered = ['lettering-brushes', 'stamp-brushes', 'pattern-brushes', 'scatter-brushes'];

function shuffleResourcePosts(posts: IResourceItem[]): IResourceItem[] | [] {
  // First step organize the posts by category
  // Second step organize the posts by subcategory
  let brushes: IResourceItem[] = []
  let palettes: IResourceItem[] = []
  let styleStudie: IResourceItem[] = []
  let misc: IResourceItem[] = []


  posts.forEach(post => {
    let match = false
    post.categories.forEach(cat => {
      if (cat.slug === 'procreate-brushes') {
        match = true
        brushes.push(post)
      }
      if (cat.slug === 'color-palette') {
        match = true
        palettes.push(post)
      }
      if (cat.slug === 'style-studies') {
        match = true
        styleStudie.push(post)
      }

    })
    if (!match) {
      misc.push(post)
    }

  })

  reshuffleBrushes(brushes)

  return [
    ...brushes,
    ...palettes,
    ...styleStudie,
    ...misc
  ]
}

function reshuffleBrushes(posts: IResourceItem[]) {
  const sorter = (a: IResourceItem, b: IResourceItem) => {
    const aSubCat = a.subCategories[0]?.slug || 'test'
    const bSubCat = b.subCategories[0]?.slug || 'test'

    if (ordered.indexOf(aSubCat) === -1) {
      return 99
    }
    if (ordered.indexOf(bSubCat) === -1) {
      return 98
    }

    return ordered.indexOf(aSubCat) - ordered.indexOf(bSubCat)
  };
  return posts.sort(sorter);
}

const ResourceLibraryMembers = () => {
  const data = useLoaderData<ILoaderData>()
  console.log('data', data);

  const { state: { user }, resourecLibraryLogin } = useSite()
  // const { cart } = useCartMatches()
  // que other tabs to sync up with logged in user
  function setStorage() {
    localStorage.setItem('makers_login', 'login' + Math.random());
  }
  // console.log('match', cart);
  console.log('test', -1 > 1);

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

    setStorage() // Set storage to an arbitrary value so we can log user in on other open tabs.
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


  const reshuffledPosts = shuffleResourcePosts(data.freebies)
  console.log('reshuffledPosts', reshuffledPosts);

  const { filter, handleFilterClick, handlePageClick, posts, pagination } = useFreebies<IResourceItem[]>({ items: reshuffledPosts, itemsPerPage: 12 })




  return (
    <div className='bg-neutral-50 grid-container grid-resource-header'>
      <div className='mb-8 col-start-2 col-span-2 tablet:row-start-1 tablet:col-start-2 tablet:col-end-[9] desktop:col-start-2 desktop:col-end-[8] flex flex-col'>
        <div className='mt-16 mb-16'>
          <h1 style={{ color: '#404764' }} className='font-sentinel__SemiBoldItal text-display-2'>Welcome to the Makers Library</h1>
        </div>
        <div className='flex flex-col tablet:flex-row'>
          <div className='mb-8 tablet:mr-4 tablet:mb-0 flex-1'>
            <h2 className='text-blue-slate font-semibold text-lg mb-2'>Freebies</h2>
            <p className='text-blue-slate'>All downloads come with a freebie license that you can use on any type of project.</p>
          </div>
          <div className='tablet:ml-4 flex-1'>
            <h2 className='text-blue-slate font-semibold text-lg mb-2'>Commerical Usage</h2>
            <p className='text-blue-slate'>A few freeibes are just for personal use and will require an extended license purchase if used commericially.</p>
          </div>
        </div>
      </div>

      <div className='hidden z-10 relative col-start-2 col-span-2 row-start-1 row-span-2 tablet:flex tablet:col-start-9 tablet:col-end-[14] desktop:col-start-8 desktop:col-end-[14] flex-col'>
        <div className='p-3 bg-white rounded-2.5xl shadow-md max-w-[547px] mx-auto'>
          <img className='rounded-2xl' src="/images/tuesday-makers-welcome-1.jpg" alt="Welcome to the Tuesday Makers Free resource library" />
        </div>
      </div>

      {!data.user.tags.includes('Tuesday Makers Extended License') &&
        <div className='bg-green-500 col-span-full tablet:row-start-2 tablet:row-span-2'>
          <div className='my-16'>
            UPGRADE LICENSE AREA

            On purchase - need to refresh the user or something
          </div>
        </div>}

      {/* Check tags on user example for paid Resource Library License */}
      <div className='col-start-2 col-span-2 mt-2 mb-8 tablet:col-start-2 tablet:col-span-12 tablet:mt-5 tablet:mb-12 desktop:col-start-2 desktop:col-span-12'>

        <FreebieFilter
          filterTags={filterTags}
          selectedFilter={filter}
          handleClick={handleFilterClick}
        />

      </div>

      {/* <div className='col-start-2 col-span-2 mt-2 mb-8 tablet:col-start-2 tablet:col-span-12 tablet:mt-5 tablet:mb-12 desktop:col-start-2 desktop:col-span-12'>
        {posts.length === 0 && <div className='text-center text-blue-slate'>No results found</div>}
        {posts
          .map(item => (<Freebie key={item.id} {...item} />))}
      </div> */}
      <FreebieGrid freebies={posts} />

      <div className='col-start-2 col-span-2 mt-2 mb-8 tablet:col-start-2 tablet:col-span-12 tablet:mt-5 tablet:mb-12 desktop:col-start-2 desktop:col-span-12'>
        {pagination.hasNextPage &&
          <>
            <OutlinedButton clickHandler={handlePageClick} text={'Show More'} loading={false} loadingText={'Loading...'} />
          </>
        }
      </div>

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