
const maxAge = 31536000
export const cacheControl = {
  "Cache-Control" : `public, max-age=${maxAge}, stale-while-revalidate`
}
