async function clearGraphCDN(){
  await fetch('https://admin.graphcdn.io/etheadless',
    {
      method: 'POST',
      headers: {
        "Access-Control-Allow-Origin":"*",
        'Content-Type': 'application/json', // and specify the Content-Type
        'graphcdn-token': 'e3091df5c5aa5bc2cf316875f0a01978513f2ac0cedbcd7ec895ec7aded5e12c',
      },
      mode: 'cors',
      body: JSON.stringify({
        query: `mutation{
            _purgeQuery(queries: [posts])
          }`
      })
    })
}
async function checkCache(){
  await fetch('https://etheadless.graphcdn.app',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // and specify the Content-Type
      },
      mode: 'cors',
      body: JSON.stringify({
        query: `query GetAllPosts {
  posts(first: 1000) {
    edges {
      node {
        title
        excerpt
        databaseId
        slug
        date
        modified
        categories {
          edges {
            node {
              name
            }
          }
        }
      }
    }
  }
}
`
      })
    })
}
const action = () => {
  clearGraphCDN().then(()=>{
    setTimeout(async ()=>{
      await checkCache()
    },10000)
  })
}