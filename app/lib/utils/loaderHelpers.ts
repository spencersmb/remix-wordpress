import { isEmpty } from 'lodash'
import { redirect } from 'remix'
import { getPreviewPostPageServer } from '../api/fetch'
import { Params } from 'react-router'

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

export function getLoginRedirectParams({previewType, id}:{previewType: string | undefined, id: string | undefined}): string{

  if ( isEmpty( previewType ) || isEmpty( id ) ) {
    return '/login';
  }

  let idType = previewType === 'blog' ? "previewPostId" : 'postId'
  let postType = previewType === 'blog' ? "post" : 'page'
  return `/login?postType=${postType}&${idType}=${id}`
}

export const getPreviewRedirectUrl = ( postType = '', previewPostId = '' ) => {

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
  console.log('loginUrl', loginUrl)

  // check for cookies and params
  // else redirect back to login with original url
  if(!previewType || !id){
    return redirect(loginUrl)
  }

  // try to make DB call
  // set post or page by previewType variable logged in
  // else pass data through
  try{
    // TODO: ADD USER QUERY?
    console.log('previewType', previewType)

    const res = await getPreviewPostPageServer({previewType, id})
    const json = await res.json()
    const postType = previewType === 'blog' ? 'post' : 'page'
    const postPageData = json.data[postType]
    console.log('postPageData', postPageData)

    if(postPageData === null){
      return redirect(loginUrl)
    }

    return {
      // user: await res.json(),
      [previewType]: postPageData
    }

  }catch (e){
    console.error(`e in /${previewType}/preview/$id`, e)
    return redirect(loginUrl)
  }
}
