import https from 'https'

export async function fetchAPI(query: any, { variables }: any = {}) {
  const https = require("https");
  const agent = new https.Agent({
    rejectUnauthorized: false
  })
  // const api_url = 'https://etheadless.local/graphql/'
  const api_url = 'https://etheadless.graphcdn.app/'
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
