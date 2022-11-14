import { createCookie } from "@remix-run/node";

let sessionSecret = process.env.SESSION_SECRET;
if (!sessionSecret) {
  throw new Error("SESSION_SECRET must be set");
}
// TODO: NOT USED ATM
const procreateCookieName = "etBonuses-procreate-5x"
export const procreateBonusCookie = createCookie(procreateCookieName, {
  maxAge: 60 * 60 * 24 * 360, // one week
  path: '/',
  // expires: new Date(Date.now() + 60 * 60 * 24 * 360),
  httpOnly: true,
  sameSite: "lax",
  secrets: [sessionSecret],
  secure: true  
});

const miniCourseName = "et-lfm-mcc"
export const lfmMiniCourseCookie = createCookie(miniCourseName, {
  maxAge: 60 * 60 * 24 * 360, // one week
  path: '/',
  // expires: new Date(Date.now() + 60 * 60 * 24 * 360),
  httpOnly: true,
  sameSite: "lax",
  secrets: [sessionSecret],
  secure: true
});

export const shopifyCartCookieName = "et-shopfiy-cart"
export const shopifyCartCookie = createCookie(shopifyCartCookieName, {
  maxAge: 60 * 60 * 24 * 360, // one week
  path: '/',
  // expires: new Date(Date.now() + 60 * 60 * 24 * 360),
  httpOnly: true,
  sameSite: "lax",
  secrets: [sessionSecret],
  secure: true  
});

const signUpCookieID = "etck-signup"
export const ckSignUpCookie = createCookie(signUpCookieID, {
  maxAge: 60 * 60, // one week
  path: '/',
  // expires: new Date(Date.now() + 60 * 60),
  httpOnly: true,
  sameSite: "lax",
  secrets: [sessionSecret],
  secure: true
});