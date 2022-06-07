import { isEmpty } from 'lodash'
import { getPreviewPostPageServer, refreshJWT } from './fetch.server'
import type { Params } from 'react-router'
import { isTokenExpired, refreshCurrentSession, requireAdminUserToken } from './session.server'
import { consoleHelper } from './windowUtils'
import { mapPostData } from './posts'
import type {Cookie} from '@remix-run/node';
import { json, redirect } from '@remix-run/node'

/**
 * @function previewUrlParams
 * @tested - 6/6/2022
 * 
 * @description Take the URL and convert the params to id & preview type to match the WP plugin
 * on the backend that creates the preview URLS using their query params that get
 * added onto the url (postId for pages & and previewPostId for posts)
 * 
 * @param {Request} request - The request object
 * 
 * @returns {IPreviewParams} - IPreviewParams object with url, the previewPostId and postId
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
 * @function getLoginRedirectParams
 * @tested - 6/6/2022
 * @description Determine login page url from params
 * 
 * @param {previewType} string - postType
 * @param {id} string - postId
 *
 *
 * @returns {string} - login page url
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
 * @function getPreviewRedirectUrlFromParams
 * @tested - 6/6/2022
 * 
 * @description Determine post or page URL for redirect based on the params passed in
 *
 * @param {postType} string | null - postType of the post or page
 * @param {previewPostId} string | null - id of the post or page
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
 * @function previewLoaderRouteHandler
 * @tested - 6/6/2022
 *
 * Route Handler for page/post Previews
 *
 * @description
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

  // ID passed in from Remix param
  let id = params.id ? params.id : undefined

  console.log('id', !id);
  

  // Create login URL for Redirects
  let loginUrl = getLoginRedirectParams({previewType, id})

  // check for params
  // else redirect back to login with original url
  if(!previewType || !id){
    console.log('redirect');
    
    return redirect(loginUrl)
  }
  // Check for logged in user cookie - else redirect to login page
  let userToken = await requireAdminUserToken(request, loginUrl)

  /*
  Start new headers response
  */
  const customHeaders = new Headers()
  let isExpired = await isTokenExpired(userToken)

  // check token Expired
  if(isExpired){
    try {
      let refresh = await refreshJWT(userToken)
      let res: IAuthRefreshResponse = await refresh.json()
      
      let newToken = res.data.refreshJwtAuthToken.authToken
      userToken.token = newToken
      
      consoleHelper('res of newToken', newToken)

      const sessionStorage = refreshCurrentSession(request, newToken)
      customHeaders.append('Set-Cookie', await sessionStorage)
    }catch (e){
      return redirect(loginUrl);
    }
  }

  // After token is refreshed, get preview post/page query
  try{
    const res = await getPreviewPostPageServer({
      previewType,
      id,
      userToken
    })
    const jsonResp = await res.json()
    const postType = previewType === 'blog' ? 'post' : 'page'
    const postPageData = jsonResp.data[postType]

    return json({
        [postType]: mapPostData(postPageData)
      },{
        headers: customHeaders
      }
    )

  }catch (e){
    console.error(`e in /${previewType}/preview/$id`, e)
    return redirect(loginUrl)
  }
}

/**
 * @function getLoginRedirectUrl
 * @tested - 6/6/2022
 * 
 * @description Helper function that builds the redirect url for the login route based on the Request.
 * We then send this new route as the rediect url if a useer isn't logged in.
 * 
 * @param request 
 * @returns {string}
 */
export const getLoginRedirectUrl = (request: Request): string => {
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


/**
 * @function getPreviewRedirectUrl
 * @tested - 6/6/2022
 * 
 * @description Helper function that builds the redirect url for the preview page/blog based on the Request
 * 
 * @param request 
 * 
 * @returns {string}
 */
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

/**
 * @function findCookie
 * @tested - 6/6/2022
 * 
 * @description Helper function to return cookie data from a request. Must pass in the request and cookie reference
 * 
 * @param request
 * @param cookie
 * 
 * @returns {Promise} 
 */
export async function findCookie<T>(request: Request, cookie: Cookie): Promise<{hasCookie: boolean, data: T, expired: boolean}>{
  const cookieHeader = request.headers.get("Cookie");
  const cookieData = await cookie.parse(cookieHeader);
  const cookieExpire = cookie.expires;
  return {
    expired: cookieExpire ? new Date(cookieExpire).getTime() < Date.now() : false,
    hasCookie: !isEmpty(cookieData),
    data: {
      ...cookieData}
  };
}

/**
 * @function checkForCookieLogin
 * @tested - 6/6/2022
 * 
 * @description Helper function to check for a cookie data on Locked member pages. Mainly use for class-download grid pages.
 * 
 * @param request
 * @param cookie
 * @param redirectTo
 * 
 * @returns {Promise<Response | boolean>} 
 */
export async function checkForCookieLogin(request: Request, cookie: Cookie | null, redirectTo: string): Promise<Response | boolean>{
  // May not need this when testing with a real cookie
  // find cookie might do the same the same thing if we just test for hasCookie! or if data is empty
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