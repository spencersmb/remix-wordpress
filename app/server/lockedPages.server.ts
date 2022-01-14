import { Cookie, createCookie } from "remix"
import { lockedPageEnumSlugs } from "~/enums/lockedPages";

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
const parentPath = 'cd'
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
export const lockedPageServer: ILockedPageLocation = {
  [lockedPageEnumSlugs.beautifulLettering]: {
    title: 'Beautiful Lettering', // title to know we are on the right page
    slug: lockedPageEnumSlugs.beautifulLettering, // ex: bl
    cookie: {
      data: createLockedPageCookie('bl-skillshare-bonuses'),
      key: 'beautifulLetteringBonusLogin' // used to set on the cookie as data/key/value
    },
    querySlug: "bl", // used to target the correct grid
    membersPath: `/${parentPath}/${lockedPageEnumSlugs.beautifulLettering}/members`, // ex: /class-downloads/bl/members
    logoutRedirect: `/${parentPath}/${lockedPageEnumSlugs.beautifulLettering}`, // ex: /class-downloads/bl
    password: process.env.BL_PW, // added in as a secret
  }
}