import { Auth, REFRESH_LOGIN } from '../lib/graphql/mutations/auth'
import { v4 } from 'uuid';
import https from 'https'
import { consoleHelper } from './windowUtils'
import { QUERY_POST_BY_ID } from '../lib/graphql/queries/posts'
import { QUERY_PAGE_BY_ID } from '../lib/graphql/queries/pages'
import { getGraphQLString } from './graphqlUtils';
import { CREATE_COMMENT } from '@App/lib/graphql/mutations/comments';

const api_url = process.env.PUBLIC_WP_API_URL as string
const root_url = process.env.APP_ROOT_URL as string

if (!api_url || !root_url) {
  throw new Error("APP_ROOT_URL and PUBLIC_WP_API_URL must be set");
}

// const api_url = 'https://etheadless.local/graphql/'
// const root_url = 'http://localhost:3000'

export async function fetchConvertKitSignUp({email, id}: {email: string, id: string}){
  const url = `https://api.convertkit.com/v3/forms/${id}/subscribe`;
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      api_key: process.env.CK_KEY,
      email,
    }),
  })
  const json = await res.json()
  if (json.errors) {
    console.error(json.errors)
    throw new Error('WP QUERY FETCH' + json.errors)
  }
  return json
}

export async function fetchAPI(query: any, { variables }: any = {}) {
  const https = require("https");
  const agent = new https.Agent({
    rejectUnauthorized: false
  })

  const res = await fetch(api_url, {
    method: 'POST',
    // @ts-ignore
    agent,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  })
  const json = await res.json()
  if (json.errors) {
    console.error(json.errors)
    throw new Error('WP QUERY FETCH' + json.errors)
  }
  return json.data
}

export async function getPreviewPostPageServer({previewType, id, userToken}: {previewType: string, id: string, userToken: IAuthToken}){
  consoleHelper('getPreviewPostPageServer', previewType)
  consoleHelper('getPreviewPostPageServer id', id)

  const https = require("https");
  const agent = new https.Agent({
    rejectUnauthorized: false
  })
  const variables = {
    id,
  }

  return fetch(api_url, {
    method: 'POST',
    credentials: 'include',
    // mode: 'cors',
    // @ts-ignore
    agent,
    headers: {
      'Content-Type': 'application/json',
      authorization: userToken ? `Bearer ${userToken.token}` : '',
    },
    body: JSON.stringify({
      query: previewType === 'blog' ? QUERY_POST_BY_ID : QUERY_PAGE_BY_ID,
      variables
    }),
  })
}

/*
JWT LOG USER IN
 */
export async function logUserInJWT({username, password}: {password:string, username: string}){
  const https = require("https");
  const agent = new https.Agent({
    rejectUnauthorized: false
  })

  const variables = {
    input: {
      clientMutationId: v4(), // Generate a unique id
      username,
      password
    },
  }
  return fetch(api_url, {
    method: 'POST',
    mode: 'cors',
    // @ts-ignore
    agent,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query:Auth,
      variables,
    }),
  })
}

/*
JWT Refresh User
 */
export async function refreshJWT({cmid, refresh}: IAuthToken): Promise<Response>{
  const https = require("https");
  const agent = new https.Agent({
    rejectUnauthorized: false
  })

  const variables = {
    input: {
      clientMutationId: cmid,
      jwtRefreshToken: refresh
    },
  }
  return fetch(api_url, {
    method: 'POST',
    mode: 'cors',
    // @ts-ignore
    agent,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query:REFRESH_LOGIN,
      variables,
    }),
  })
}

/*
COmment fetch
*/
interface IFetchSubmitComment {
  errors?: { message: string }[]
  createComment: {
        success: boolean,
        comment: IPostCommentRaw
      } | null
}


/*
  Shopify Fetch
*/
export async function fetchShopifyStoreFrontRequest({query, variables }: {query: string, variables: any}){
  const token = (typeof window !== "undefined" ? window.ENV.SHOPIFY_STOREFRONT_ACCESS_TOKEN : process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN) as string
  const url = `https://everytuesday.myshopify.com/api/2022-01/graphql.json`
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': token
      },
      body: JSON.stringify({
        query,
        variables,
      }),
    })

    if(!res.ok){
      console.error(res)
      throw new Error('Shopify Error' + res)
    }

    const {data} = await res.json()

    return data
}

/*
Font File fetch
*/
export async function fetchFontPreviewFileServer(fontName: string){

  const url = `${root_url}/api/font/file?font=${fontName}`;
  const res = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  })
  const json = await res.json()
  if (json.errors) {
    console.error(json.errors)
    throw new Error('WP QUERY FETCH' + json.errors)
  }
  return json
}

export async function fetchFontPreviewFileB(fontName: string, style: string){

  // const url = `${process.env.APP_ROOT_URL}/api/font/file?font=${fontName}`;
  const url = `${process.env.APP_ROOT_URL}/api/font/fileB?font=${fontName}&style=${style}`;
  const res = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  })
  const json = await res.json()
  if (json.errors) {
    console.error(json.errors)
    throw new Error('WP QUERY FETCH' + json.errors)
  }
  return json
}