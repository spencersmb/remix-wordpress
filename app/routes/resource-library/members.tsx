import { json, LoaderFunction, MetaFunction, redirect, useLoaderData } from 'remix'
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
import { createCart } from '~/utils/cartUtils'
import useCart from '~/hooks/useCart'
import { ADD_ITEM_TO_CART } from '~/lib/graphql/mutations/cart'

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
    post: null,
    page,
    location
  })
};

export let loader: LoaderFunction = async ({ request, context, params }) => {
  const user = await requireResourceLibraryUser(request, '/resource-library')

  try {
    let data = await fetchAPI(getGraphQLString(GetAllFreebiesQuery))

    return json({
      freebies: flattenResourceData(data.resourceLibraries),
      filterTags: data.cptTags,
      user
    })
  } catch (e) {
    console.error(`e in /resource-library`, e)
    return redirect('/resource-library')
  }
}
interface ILoaderData {
  freebies: IResourceItem[]
  filterTags: IFilterTag[],
  user: IResourceUser,
}
const ResourceLibraryMembers = () => {
  const data = useLoaderData<ILoaderData>()
  const { state: { user }, resourecLibraryLogin } = useSite()
  const { cart } = useCart()
  console.log('cart', cart);

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
        query,
        variables: null,
      }),
    })
    console.log('res', res);
    const apiRes = await res.json()
    console.log('apiRes', apiRes);


  }

  async function addItem() {
    // Gouache Lovers Brush Set: Extended
    const varientId = "Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC8zOTcyODQ1ODU2Mzc5MQ=="
    const url = `https://everytuesday.myshopify.com/api/2022-01/graphql.json`
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': "e45e2c4d0ca39305febec0b1737a7081"
      },
      body: JSON.stringify({
        query: ADD_ITEM_TO_CART,
        variables: {
          cartId: cart.id,
          varientId
        },
      }),
    })
    console.log('res', res);
    const apiRes = await res.json()
    console.log('apiRes', apiRes);
  }
  interface ICartLine {
    node: {
      id: string
      quantity: number
      merchandise: {
        product: {
          title: string
        }
      }
    }
  }
  interface IAddCartItemResponse {
    cartLinesAdd: {
      cart: {
        lines: {
          edges: ICartLine[]
        }
      }
    }
  }

  const { filter, handleFilterClick, handlePageClick, posts, pagination } = useFreebies<IResourceItem[]>({ items: data.freebies })

  return (
    <div>
      <h1>Members Area</h1>
      <button onClick={shopifyTestCall}>Test Shopify Call</button>
      <div>
        <button onClick={addItem}>Add Item to Cart</button>
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
        {pagination.hasNextPage && <button onClick={handlePageClick}>Show More</button>}
      </div>
    </div>
  )
}
export default ResourceLibraryMembers



const query = `{
  products(first:5) {
    edges {
      node {
        id
      }
    }
  }
}`