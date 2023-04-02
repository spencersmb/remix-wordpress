
const maxAge = 900 // 15 minutes
export const cacheControl = {
  "Cache-Control" : `public, max-age=${maxAge}, stale-while-revalidate`
}
export const cacheControlHeaders = {
  "Cache-Control" : `public, max-age=${maxAge}, stale-while-revalidate`
}
