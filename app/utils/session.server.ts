import { createCookieSessionStorage, redirect } from 'remix'

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

export function getUserSession(request: Request) {
  return storage.getSession(request.headers.get("Cookie"));
}

export async function getUserToken(request: Request) {
  let session = await getUserSession(request);
  let userToken = session.get("token");
  if (!userToken || typeof userToken !== "object") return null;
  return userToken;
}

export async function requireToken(
  request: Request,
  redirectTo: string
): Promise<IAuthToken> {
  let session = await getUserSession(request);
  let userToken = session.get("token");
  if (!userToken || typeof userToken !== "object") {
    throw redirect(redirectTo);
  }
  return userToken;
}

export async function isTokenExpired (token: IAuthToken) {
  let currentDate = new Date( Date.now()).getTime()
  console.log('currentDate', currentDate)
  console.log('token.expires', token.expires)


  return token.expires < currentDate
}

export function setFutureDate(mins = 5){
  let currentDate = new Date();
  return new Date(currentDate.getTime() + mins*60000).getTime();
}

export async function refreshCurrentSession(request: Request, token: string){
  let session = await getUserSession(request);
  let oldUserToken:IAuthToken = session.get("token");
  let newToken: IAuthToken = {
    ...oldUserToken,
    token,
    expires: setFutureDate(),
  }
  // update current session with new token data
  session.set('token', newToken)
  return storage.commitSession(session)
}

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
