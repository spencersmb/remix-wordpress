import { createCookieSessionStorage, redirect } from 'remix'

let sessionSecret = process.env.SESSION_SECRET;
if (!sessionSecret) {
  throw new Error("SESSION_SECRET must be set");
}

let resourceStorage = createCookieSessionStorage({
  cookie: {
    name: "resource_session",
    secure: true,
    secrets: [sessionSecret],
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
    httpOnly: true
  }
});

export async function createResourceUserSession(
  userId: string,
) {
  let session = await resourceStorage.getSession();
  session.set("userId", userId);
  return await resourceStorage.commitSession(session)
}

export function getResourceUserSession(request: Request) {
  return resourceStorage.getSession(request.headers.get("Cookie"));
}

export async function getResourceUserToken(request: Request) {
  let session = await getResourceUserSession(request);
  let userToken = session.get("userId");
  if (!userToken || typeof userToken !== "string") return null;
  return userToken;
}

export async function requireResourceLibraryUser(
  request: Request,
  redirectTo: string
): Promise<IAuthToken> {
  let session = await getResourceUserSession(request);
  let userToken = session.get("userId");

  if (!userToken) {
    throw redirect(redirectTo);
  }
  return userToken;
}

export async function logoutResourceLibrary(request: Request) {
  let session = await resourceStorage.getSession(
    request.headers.get("Cookie")
  );
  return redirect("/resource-library/login", {
    headers: {
      "Set-Cookie": await resourceStorage.destroySession(session)
    }
  });
}
