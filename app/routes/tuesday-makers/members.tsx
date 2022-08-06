import { requireResourceLibraryUser } from '../../utils/resourceLibrarySession.server'
import { getBasicPageMetaTags, getHtmlMetadataTags } from '../../utils/seo'
import { fetchAPI } from '../../utils/fetch.server'
import { GetAllFreebiesQuery } from '../../lib/graphql/queries/resourceLibrary'
import { flattenResourceData } from '../../utils/resourceLibraryUtils'
import FreebieFilter from '../../components/resourceLibrary/freebieFilter'
import useFreebies from '../../hooks/useFreebies'
import { getGraphQLString } from '../../utils/graphqlUtils'
import useSite from '@App/hooks/useSite'
import { useEffect } from 'react'
import { addItemToShopifyCart, createCart } from '@App/utils/cartUtils'
import useCart from '@App/hooks/useCart'
import { ADD_ITEM_TO_CART, GET_CART } from '@App/lib/graphql/mutations/cart'
import type { ISelectedMatch } from '@App/interfaces/remix'
import FreebieGrid from '@App/components/resourceLibrary/freebieGrid'
import OutlinedButton from '@App/components/buttons/outlinedButton'
import ExtendedLicenseUpsell from '@App/components/resourceLibrary/extendedLicenseUpsell'
import CardDownload from '@App/components/cards/cardDownload'
import StrokeOneSvg from '@App/components/svgs/strokes/stroke-1'
import type { LoaderFunction, MetaFunction } from '@remix-run/node';
import { json, redirect } from '@remix-run/node'
import { useFetcher, useLoaderData, useMatches } from '@remix-run/react'
import useTuesdayMakersClientSideLogin from '@App/hooks/useTuesdayMakersClientSideLogin'
import AccentHeaderText from '@App/components/layout/accentHeaderText'
import LazyImgix from '@App/components/images/lazyImgix'

export let meta: MetaFunction = (metaData): any => {

  /*
  metaData gets passed in from the root metadata function
   */
  const { data, location, parentsData } = metaData
  if (!data || !parentsData || !location) {
    return {
      title: '404',
      description: 'error: No metaData or Parents Data',
    }
  }

  /*
  Build Metadata tags for the page
   */
  return getBasicPageMetaTags(metaData, {
    title: `Tuesday Makers: Members`,
    desc: `First to nab special deals on courses + products *and* you get instant access to our Resource Library, stocked with over 200 design and lettering files!`,
    slug: `tuesday-makers/members`
  })
};

export let loader: LoaderFunction = async ({ request, context, params }) => {
  // get user, if no user redirect to login
  const user = await requireResourceLibraryUser(request, '/tuesday-makers/login')

  const userId = user.id
  /**
   * Get latest tags
   * Don't want to cache them so we can show and hide other data on page dynamically
   */
  const urlTags = `https://api.convertkit.com/v3/subscribers/${userId}/tags?api_secret=${process.env.CK_SECRET}`;

  const resTag = await fetch(urlTags, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  })
  const tagResults = await resTag.json()
  const newUser = {
    id: userId,
    tags: tagResults.tags.map((tag: { id: string, name: string, created_at: string }) => tag.name)
  }

  try {
    let data = await fetchAPI(getGraphQLString(GetAllFreebiesQuery))

    return json({
      freebies: flattenResourceData(data.resourceLibraries),
      // filterTags: data.cptTags,
      user: {
        ...user,
        tags: newUser.tags
      },
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

// Order of brushes
const ordered = ['lettering-brushes', 'stamp-brushes', 'pattern-brushes', 'scatter-brushes'];

function shuffleResourcePosts(posts: IResourceItem[]): IResourceItem[] | [] {
  // First step organize the posts by category
  // Second step organize the posts by subcategory
  let brushes: IResourceItem[] = []
  let palettes: IResourceItem[] = []
  let styleStudie: IResourceItem[] = []
  let misc: IResourceItem[] = []

  // reorder each item into its own array
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

// Find the index of the subcategory and then sort them based on the value of the index
//         0                    1                 2                  3
//[ 'lettering-brushes', 'stamp-brushes', 'pattern-brushes', 'scatter-brushes'];
// Lettering Brushes should appear first, scatter brushes last
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
  // console.log('data', data);

  // const { cart } = useCartMatches()
  // console.log('match', cart);
  // const { cart, addItemToCart } = useCart()
  // console.log('cart', cart);
  // console.log('data', data);


  /*
  * Check for user when coming directly from the login page to make sure the user is passed to the global context.
  * Right now user comes from the server side on page refreush and is set in the State, but when you come from a route, it isn't set because the redirect after a form submission happens on the server before the client takes over again. So we must pass the data down to an action manually.
  */
  useTuesdayMakersClientSideLogin(data.user, 200)


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
  const { filter, handleFilterClick, handlePageClick, posts, pagination, setFilter } = useFreebies<IResourceItem[]>({ items: reshuffledPosts, itemsPerPage: 12 })

  const featuredDownload = reshuffledPosts[0]

  const bgPaintStrokes = {
    width: 2000,
    height: 2921,
    alt: `Every Tuesday Watercolor textures`,
    src: 'https://et-website.imgix.net/et-website/images/tm-bg-1_1.jpg?auto=format',
    placeholder: 'https://et-website.imgix.net/et-website/images/tm-bg-1_1.jpg?auto=format&w=20&fit=clip'
  }

  function createImigixSizes({ src, mobileSize, width, height, alt }: { src: string, mobileSize: number, width: number, height: number, alt: string }): {
    image: ImgixImageType,
    defaultSrc: string,
  } {
    const defaultSrc = `${src}?auto=format`
    const image = {
      width,
      height,
      alt,
      src: `${defaultSrc}&w=${mobileSize}&fit=clip`,
      placeholder: `${defaultSrc}&w=20&fit=clip`
    }

    return {
      image,
      defaultSrc
    }
  }

  const paintStreakBg = createImigixSizes({
    width: 2000,
    height: 2921,
    mobileSize: 900,
    alt: `Every Tuesday Watercolor textures`,
    src: 'https://et-website.imgix.net/et-website/images/tm-bg-1_1.jpg',
  })


  return (
    <div className='pt-[68px] laptop:pt-[96px] bg-cream-100'>
      <div className='py-16 grid-container grid-resource-header laptop:pb-16 laptop:pt-0'>

        {/* HEADER */}
        <div className='relative z-2 mb-8 col-start-2 col-span-2 tablet:row-start-1 tablet:col-start-4 tablet:col-end-[12] tablet:mb-8 laptop:col-start-2 laptop:col-end-8 laptop:ml-[25px] laptop:mb-0 desktop:ml-[55px] desktop:mr-[35px] desktop:col-start-2 desktop:col-end-[8] laptop:justify-center flex flex-col'>

          <div className='mt-16 mb-8 tablet:mt-28 laptop:mt-0 laptop:mb-16'>
            <h1 style={{ color: '#404764' }} className='relative text-5xl text-center font-sentinel__SemiBoldItal laptop:text-left laptop:text-[56px] desktop:text-[67px] desktopXl:text-[80px]'>
              <span className='relative z-10'>
                <AccentHeaderText text='Welcome to the' />
                Resource Library
              </span>
            </h1>
          </div>
          <div className='relative flex flex-col tablet:flex-row z-2'>

            {/* REQ 1 */}
            <div className='flex-1 mb-8 tablet:mr-4 laptop:mb-0'>
              <h2 className='mb-2 text-lg font-semibold text-blue-slate'>Freebies</h2>
              <p className='text-blue-slate'>All downloads come with a freebie license that you can use on any type of project.</p>
            </div>

            {/* REQ 2 */}
            <div className='flex-1 laptop:ml-4'>
              <h2 className='mb-2 text-lg font-semibold text-blue-slate'>Commerical Usage</h2>
              <p className='text-blue-slate'>A few freeibes are just for personal use and will require an extended license purchase if used commericially.</p>
            </div>
          </div>

          <div className='absolute top-[-560px] left-[-114px] w-[450px] z-1 rotate-[-5deg] tablet:top-[-650px] tablet:left-[-90px] tablet:w-[540px] tablet:rotate-[-5deg] laptop:w-[770px] laptop:left-[418px] laptop:top-[-600px] laptop:rotate-45 desktop:w-[1020px] desktop:left-[558px] desktop:top-[-770px]'>
            <LazyImgix
              visibleByDefault={true}
              id={"download-bg"}
              image={paintStreakBg.image}
              sizes="(max-width: 400px) 150px, 300px, (min-width: 900px) 33vw, 900px"
              srcSet={
                `${paintStreakBg.image.src} 400w,
                ${paintStreakBg.defaultSrc}&w=1400&fit=clip 900w,
              `
              }
            />
          </div>

        </div>

        {/* DOWNLOAD CARD */}
        <div className='z-3 mb-16 relative col-start-2 col-span-2 row-start-2 tablet:flex tablet:col-start-3 tablet:col-end-[13]  laptop:row-start-1 laptop:col-start-8 laptop:col-end-[14] laptop:mx-[40px] laptop:mt-20 laptop:mb-24 desktop:col-start-8 desktop:col-end-[14] desktop:mb-24 desktop:mt-28 desktop:mx-0 flex-col'>

          <div className='relative z-2'>
            <CardDownload
              title={featuredDownload.title}
              buttonText='Download'
              freebie={featuredDownload.freebie}
              featuredImage={featuredDownload.featuredImage} />
          </div>
        </div>

        {/* Check tags on user example for paid Resource Library License */}
        <ExtendedLicenseUpsell visible={!data.user.tags.includes('Tuesday Makers Extended License')} />

        <div className='col-span-2 col-start-2 my-12 tablet:col-start-2 tablet:col-span-12 desktop:col-start-2 desktop:col-span-12'>
          <FreebieFilter
            setFilter={setFilter}
            filterTags={filterTags}
            selectedFilter={filter}
            handleClick={handleFilterClick}
          />
        </div>

        <FreebieGrid freebies={posts} />

        <div className='col-span-2 col-start-2 my-2 tablet:col-start-2 tablet:col-span-12 tablet:mt-5 tablet:mb-12 desktop:col-start-2 desktop:col-span-12'>
          {pagination.hasNextPage &&
            <>
              <OutlinedButton
                className='mx-auto btn btn-teal-600 btn-outlined-teal-600'
                clickHandler={handlePageClick}
                text={'Show More'} loading={false}
                loadingText={'Loading...'}
              />
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