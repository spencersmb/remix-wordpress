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
    cookie: {
      data: Cookie,
      key: string
    }
    password: string | undefined
    title: string
  }
}
const parentPath = 'cd'
export const lockedPageServer: ILockedPageLocation = {
  [lockedPageEnumSlugs.beautifulLettering]: {
    title: 'Beautiful Lettering',
    slug: lockedPageEnumSlugs.beautifulLettering,
    cookie: {
      data: createCookie('bl-skillshare-bonuses', {
        maxAge: 60 * 60 * 24 * 360, // one week
        path: '/',
        expires: new Date(Date.now() + 60 * 60 * 24 * 360),
        httpOnly: true,
        sameSite: "lax",
        secrets: [sessionSecret],
        secure: true  
      }),
      key: 'procreateBonusLogin' // used to set on the cookie as data/key/value
    },
    querySlug: "beautiful-lettering",
    membersPath: `/${parentPath}/${lockedPageEnumSlugs.beautifulLettering}/members`,
    password: process.env.BL_PW,
  }
}