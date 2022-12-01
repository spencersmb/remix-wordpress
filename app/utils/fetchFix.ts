const api_url = process.env.PUBLIC_WP_API_URL as string
const root_url = process.env.APP_ROOT_URL as string

// const api_url = 'https://api.every-tuesday.com/graphql' as string
// const root_url = 'https://api.every-tuesday.com' as string

if (!api_url || !root_url) {
  throw new Error("APP_ROOT_URL and PUBLIC_WP_API_URL must be set");
}

export async function fetchFixAPI(query: any, { variables }: any = {}) {
  const https = require("https");
  let headers = new Headers();

  headers.append('Content-Type', 'application/json');
  headers.append('Accept', 'application/json');
  const agent = new https.Agent({
    rejectUnauthorized: false
  })
  console.log(JSON.stringify({
      variables,
    }))
  const res = await fetch(api_url, {
    method: 'POST',
    mode: 'cors',
    
    // @ts-ignore
    agent,
    headers: headers,
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