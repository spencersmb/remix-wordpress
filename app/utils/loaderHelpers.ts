import { isEmpty } from 'lodash'
import { getPreviewPostPageServer, refreshJWT } from './fetch.server'
import type { Params } from 'react-router'
import { isTokenExpired, refreshCurrentSession, requireAdminUserToken } from './session.server'
import { consoleHelper } from './windowUtils'
import { mapPostData } from './posts'
import type { Cookie} from '@remix-run/node';
import { json, redirect } from '@remix-run/node'

/**
 * @Function previewUrlParams
 *
 * Take the URL and convert the params to id & preview type to match the WP plugin
 * on the backend that creates the preview URLS using their query params that get
 * added onto the url (postId for pages & and previewPostId for posts)
 */
interface IPreviewParams {
  postType: string | null,
  id: string | undefined
  url: URL
}
export function getPreviewUrlParams(request: Request): IPreviewParams{

  let url = new URL(request.url);

  return {
    postType: url.searchParams.get("postType"),
    id: url.searchParams.get("postId") || undefined,
    url
  }
}


/**
 * @Function getLoginRedirectParams
 *
 * Check URL for params and created redirect URL for login page
 *
 *
 **/
interface ILoginRedirectParams{
  previewType: string | undefined
  id: string | undefined
}
export function getLoginRedirectParams({previewType, id}:ILoginRedirectParams): string{

  if ( isEmpty( previewType ) || isEmpty( id ) ) {
    return '/login';
  }

  let idType = previewType === 'blog' ? "postId" : 'postId'
  let postType = previewType === 'blog' ? "post" : 'page'
  return `/login?postType=${postType}&${idType}=${id}`
}


/**
 * @Function getPreviewRedirectUrl
 *
 * Determine post or page URL for redirect
 *
 *
 **/
export const getPreviewRedirectUrlFromParams = ( postType : string | null = '', previewPostId : string | null = ''  ): string => {

  if ( isEmpty( postType ) || isEmpty( previewPostId ) ) {
    return '/login';
  }

  switch ( postType ) {
    case 'post':
      return `/blog/preview/${previewPostId}/`;
    case 'page':
      return `/page/preview/${previewPostId}/`;
    default:
      return '/';
  }
};


/**
 * @Function previewLoaderRouteHandler
 *
 * Route Handler for page/post Previews
 *
 * Check the authed user for a token
 * Check token for expired time
 *
 * Try and refresh token else log out and redirect to login page with preview route params in url
 *
 * If tokens are valid, get preview post query and return it via a headers response to the page
 * to retreive the data via useLoader in a page component.
 *
 *
 *
 **/
export const previewLoaderRouteHandler = async (request: Request, params: Params): Promise<Response> => {
  let url = new URL(request.url);

  // if url is /blog this will mean post, else page
  let previewType = url.pathname.split('/').splice(1).shift()
  let id = params.id
  let loginUrl = getLoginRedirectParams({previewType, id})
  let userToken = await requireAdminUserToken(request, loginUrl)
  const customHeaders = new Headers()
  let isExpired = await isTokenExpired(userToken)
  consoleHelper('isExpired', isExpired)

  // check for params
  // else redirect back to login with original url
  if(!previewType || !id){
    return redirect(loginUrl)
  }

  // check token Expired
  if(isExpired){
    try {
      let refresh = await refreshJWT(userToken)
      let res: IAuthRefreshResponse = await refresh.json()
      let newToken = res.data.refreshJwtAuthToken.authToken
      userToken.token = newToken
      consoleHelper('res of refresh', res)

      const sessionStorage = refreshCurrentSession(request, newToken)
      customHeaders.append('Set-Cookie', await sessionStorage)
    }catch (e){
      return redirect(loginUrl);
    }
  }

  // GET POST
  try{

    const res = await getPreviewPostPageServer({
      previewType,
      id,
      userToken
    })
    const jsonResp = await res.json()
    const postType = previewType === 'blog' ? 'post' : 'page'
    const postPageData = jsonResp.data[postType]

    // let body = JSON.stringify({
    //   [postType]: postType === 'post' ? mapPostData(postPageData) : postPageData
    // });

    // return new Response(body, {
    //   headers: customHeaders
    // });

    return json({
        [postType]: mapPostData(postPageData)
      },
  {
        headers: customHeaders
      }
    )

  }catch (e){
    console.error(`e in /${previewType}/preview/$id`, e)
    return redirect(loginUrl)
  }
}

export const getLoginRedirectUrl = (request:Request): string => {
  let url = new URL(request.url);
  let params = getPreviewUrlParams(request)

  // if url is /blog this will mean post, else page
  let previewType = url.pathname.split('/').splice(1).shift()
  let id = params.id

  if(!id){
    return '/login'
  }
  return getLoginRedirectParams({previewType, id})
}

export const getPreviewRedirectUrl = ( request:Request ): string => {
  const {id, postType} = getPreviewUrlParams(request)

  if ( isEmpty( postType ) || isEmpty( id ) ) {
    return '/login';
  }

  switch ( postType ) {
    case 'post':
      return `/blog/preview/${id}/`;
    case 'page':
      return `/page/preview/${id}/`;
    default:
      return '/login?postType=noPostTypeFound';
  }
};

export async function findCookie<T>(request: Request, cookie: Cookie): Promise<{hasCookie: boolean, data: T}>{
  const cookieHeader = request.headers.get("Cookie");
  const cookieData = await cookie.parse(cookieHeader);
  return {
    hasCookie: !isEmpty(cookieData),
    data: {...cookieData}
  };
}
export async function checkForCookieLogin(request: Request, cookie: Cookie, redirectTo: string){
  if (!cookie) {
    throw redirect(redirectTo);
  }
  const cookieLookUp = await findCookie(request, cookie)
  console.log("hasCookie", cookieLookUp);
  
  if (isEmpty(cookieLookUp.data)) {
    console.log("redirect", redirectTo);
    throw redirect(redirectTo);
  }
  return true
}