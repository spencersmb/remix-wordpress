import { Auth, REFRESH_LOGIN } from '../graphql/mutations/auth'
import { v4 } from 'uuid';
import https from 'https'
import { consoleHelper } from '../../utils/windowUtils'
import { QUERY_POST_BY_ID } from '../graphql/queries/posts'
import { QUERY_PAGE_BY_ID } from '../graphql/queries/pages'

const api_url = (typeof window !== "undefined" ? window.ENV.PUBLIC_WP_API_URL : process.env.PUBLIC_WP_API_URL) as string
// const api_url = 'https://etheadless.local/graphql/'
console.log(api_url);


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

export async function fetchAPIClientSide(query: any, { variables }: any = {}) {
  const res = await fetch(api_url, {
    method: 'POST',
    // @ts-ignore
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
