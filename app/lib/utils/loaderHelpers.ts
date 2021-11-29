import { isEmpty } from 'lodash'

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
