import { isEmpty } from 'lodash'
import { redirect } from 'remix'
import { getPreviewPostPageServer, refreshJWT } from '../api/fetch'
import { Params } from 'react-router'
import { getUserToken, isTokenExpired, refreshCurrentSession, requireToken } from '../../utils/session.server'

interface IPreviewParams {
  previewType: string | null,
  id: string | null
  url: URL
}
export function previewUrlParams(request: Request): IPreviewParams{
  let url = new URL(request.url);
  let previewType = url.searchParams.get("postType");
  let idSearchParam = previewType === 'post' ? "previewPostId" : 'PostId'
  let id = url.searchParams.get(idSearchParam);

  return {
    id,
    previewType,
    url
  }
}

export function getIDParamName(type: string | null = ''): string {
  return type === 'post' ? "previewPostId" : 'postId'
}
/*
 SERVERSIDE HELPER
 */
export function getPreviewUrlParams(request: Request): {postType: string | null, id: string | null}{

  let url = new URL(request.url);
  let postType = url.searchParams.get("postType");
  let idSearchParam = getIDParamName(postType)
  let id = url.searchParams.get(idSearchParam);

  return {
    postType,
    id
  }
}

export function getLoginRedirectParams({previewType, id}:{previewType: string | undefined, id: string | undefined}): string{

  if ( isEmpty( previewType ) || isEmpty( id ) ) {
    return '/login';
  }

  let idType = previewType === 'blog' ? "previewPostId" : 'postId'
  let postType = previewType === 'blog' ? "post" : 'page'
  return `/login?postType=${postType}&${idType}=${id}`
}

export const getPreviewRedirectUrl = ( postType : string | null = '', previewPostId : string | null = ''  ) => {

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

export const previewLoaderRouteHandler = async (request: Request, params: Params) => {
  let url = new URL(request.url);
  let previewType = url.pathname.split('/').splice(1).shift()
  let id = params.id
  let loginUrl = getLoginRedirectParams({previewType, id})
  let userToken = await requireToken(request, loginUrl)
  const customHeaders = new Headers()
  let isExpired = await isTokenExpired(userToken)
  console.log('isExpired', isExpired)

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
      console.log('res of refresh', res)
      userToken.token = newToken

      const sessionStorage = refreshCurrentSession(request, newToken)
      customHeaders.append('Set-Cookie', await sessionStorage)
    }catch (e){
      throw redirect(loginUrl);
    }
  }

  // GET POST
  try{

    const res = await getPreviewPostPageServer({
      previewType,
      id,
      userToken
    })
    const json = await res.json()
    const postType = previewType === 'blog' ? 'post' : 'page'
    const postPageData = json.data[postType]

    // if(postPageData === null){
    //   return redirect(loginUrl)
    // }

    let body = JSON.stringify({
      [postType]: postPageData
    });

    return new Response(body, {
      headers: customHeaders
    });

  }catch (e){
    console.error(`e in /${previewType}/preview/$id`, e)
    return redirect(loginUrl)
  }
}
