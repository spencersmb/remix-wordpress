import { createCookie } from "remix";

let sessionSecret = process.env.SESSION_SECRET;
if (!sessionSecret) {
  throw new Error("SESSION_SECRET must be set");
}
const cookieName = "etBonuses-procreate-5x"
export const procreateBonusCookie = createCookie(cookieName, {
  maxAge: 604_800, // one week
  path: '/',
  expires: new Date(Date.now() + 60),
  httpOnly: true,
  sameSite: "lax",
  secrets: [sessionSecret],
  secure: true
});
