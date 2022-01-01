import {
createCookieSessionStorage,
} from 'remix'

const { getSession, commitSession, destroySession } =
  createCookieSessionStorage({
    // a Cookie from `createCookie` or the same CookieOptions to create one
    cookie: {
      name: "__session",
      secrets: ["r3m1xr0ck5"],
      sameSite: "lax",
      path: '/',
    }
  });

export { getSession, commitSession, destroySession };
