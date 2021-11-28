
interface IPreviewParams {
  previewType: string | null,
  id: string | null
  url: URL
}
function previewUrlParams(request: Request): IPreviewParams{
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
