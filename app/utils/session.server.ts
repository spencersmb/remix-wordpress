import { createCookieSessionStorage, redirect } from "@remix-run/node";
import { consoleHelper } from "./windowUtils";

let sessionSecret = process.env.SESSION_SECRET;

if (!sessionSecret) {
  throw new Error("SESSION_SECRET must be set");
}

let storage = createCookieSessionStorage({
  cookie: {
    name: "wp_session",
    secure: true,
    secrets: [sessionSecret],
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
    httpOnly: true
  }
});

/**
 * @function createUserSession
 * @tested - 6/8/2022
 * @description Main function to create User Session when someone is previewing drafts of posts or pages.
 * 
 *
 *
 **/
export async function createUserSession(
  userId: string,
  token: IAuthToken
) {
  let session = await storage.getSession();
  session.set("userId", userId);
  session.set("token", token);
  // needed for fetch
  // - token
  // - cmid
  // - refresh
  // - expires
  return await storage.commitSession(session)
}

/**
 * @function getUserSession
 * @tested - 6/8/2022
 * @description Helper method to return the user session from the request.
 * Used when needing to check if a user is logged in.
 * 
 *
 *
 **/
export function getUserSession(request: Request) {
  return storage.getSession(request.headers.get("Cookie"));
}

/**
 * @function getUserToken
 * @tested - 6/8/2022
 * @description Checks if a user is logged in and returns the token, else returns null
 * 
 *
 *
 **/
export async function getUserToken(request: Request): Promise<IAuthToken | null> {
  let session = await getUserSession(request);
  let userToken = session.get("token");
  if (!userToken || typeof userToken !== "object") return null;
  return userToken;
}

/**
 * @function requireAdminUserToken
 * @tested - 6/8/2022
 * @description Route Loader helper to redirect to page if user is not logged in.
 * 
 *
 *
 **/
export async function requireAdminUserToken(
  request: Request,
  redirectTo: string
): Promise<IAuthToken> {
  let userToken = await getUserToken(request)
  
  if (!userToken) {
    throw redirect(redirectTo);
  }
  return userToken;
}

/**
 * @function isTokenExpired
 * @tested - 6/8/2022
 * @description Helper method checks if a token is expired.
 * 
 *
 *
 **/
export async function isTokenExpired (token: IAuthToken) {
  let currentDate = new Date( Date.now()).getTime()
  consoleHelper('currentDate', currentDate)
  consoleHelper('token.expires', token.expires)

  return token.expires < currentDate
}

/**
 * @function setFutureDate
 * @tested - 6/8/2022
 * @description Set Futre Date
 * 
 *
 *
 **/
export function setFutureDate(mins = 5){
  let currentDate = new Date();
  return new Date(currentDate.getTime() + mins).getTime();
}

/**
 * @function refreshCurrentSession
 * @tested - 6/8/2022
 * @description After a new JWT token is generated, this function will update the session with the new token and set future expiration date.
 * 
 *
 *
 **/
export async function refreshCurrentSession(request: Request, token: string){
  let session = await getUserSession(request);
  let oldUserToken:IAuthToken = session.get("token");
  let newToken: IAuthToken = {
    ...oldUserToken,
    token,
    expires: setFutureDate(5 * 60000),
  }
  // update current session with new token data
  session.set('token', newToken)
  return storage.commitSession(session)
}

/**
 * @function logout
 * @tested - 6/8/2022
 * @description Destroys the session and redirects to login page.
 * 
 *
 *
 **/
export async function logout(request: Request) {
  let session = await storage.getSession(
    request.headers.get("Cookie")
  );
  return redirect("/login", {
    headers: {
      "Set-Cookie": await storage.destroySession(session)
    }
  });
}
