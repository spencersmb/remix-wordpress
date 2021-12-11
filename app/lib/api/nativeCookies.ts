import https from 'https'

const api_url = (typeof window !== "undefined" ? window.ENV.PUBLIC_WP_API_URL : process.env.PUBLIC_WP_API_URL) as string

export async function logUserInClient(user: {password:string, username: string}){

  const query = `
  mutation logIn($login: String!, $password: String!) {
      loginWithCookies(input: {
          login: $login
          password: $password
      }) {
          status
      },
  }
  `
  const variables = {
    login: user.username,
    password: user.password
  }
  return fetch(api_url, {
    method: 'POST',
    credentials: 'include',
    mode: 'cors',
    // @ts-ignore
    // agent,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  })
}
export async function logUserInServer(user: {password:string, username: string}){
  const https = require("https");
  const agent = new https.Agent({
    rejectUnauthorized: false
  })
  const query = `
  mutation logIn($login: String!, $password: String!) {
      loginWithCookies(input: {
          login: $login
          password: $password
      }) {
          status
      },
  }
  `
  const variables = {
    login: user.username,
    password: user.password
  }
  return fetch(api_url, {
    method: 'POST',
    credentials: 'include',
    mode: 'cors',
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
}

export async function getViewerServer(cookie: string){
  const https = require("https");
  const agent = new https.Agent({
    rejectUnauthorized: false
  })
  const query = `
    query getUser {
      viewer {
          id
          databaseId
          firstName
          lastName
          email
          capabilities
      }
    }
  `
  return fetch(api_url, {
    method: 'POST',
    credentials: 'include',
    mode: 'cors',
    // @ts-ignore
    agent,
    headers: {
      'Content-Type': 'application/json',
      'Cookie': cookie
    },
    body: JSON.stringify({
      query,
    }),
  })
}

export async function getViewerClientSide(){
  const query = `
    query getUser {
      viewer {
          id
          databaseId
          firstName
          lastName
          email
          capabilities
      }
    }
  `
  return fetch(api_url, {
    method: 'POST',
    credentials: 'include',
    mode: 'cors',
    // @ts-ignore
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query
    }),
  })
}
