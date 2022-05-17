import { Cookie, createCookie } from "@remix-run/node";

let sessionSecret = process.env.SESSION_SECRET;
if (!sessionSecret) {
  throw new Error("SESSION_SECRET must be set");
}

export interface ILockedPageLocation {
  [id: string]: {
    slug: string
    querySlug: string
    membersPath: string
    logoutRedirect: string
    cookie: {
      data: Cookie,
      key: string
    }
    password: string | undefined
    title: string
  }
}
export function createLockedPageCookie (name: string){

  let sessionSecret = process.env.SESSION_SECRET;
  if (!sessionSecret) {
    throw new Error("SESSION_SECRET must be set");
  }

  return createCookie(name, {
        maxAge: 60 * 60 * 24 * 360, // one week
        path: '/',
        expires: new Date(Date.now() + 60 * 60 * 24 * 360),
        httpOnly: true,
        sameSite: "lax",
        secrets: [sessionSecret],
        secure: true  
      })
}
