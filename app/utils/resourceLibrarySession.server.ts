import { createCookieSessionStorage, redirect } from "@remix-run/node";

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
  user: IResourceUser,
) {
  let session = await resourceStorage.getSession();
  session.set("user", user); 
  return await resourceStorage.commitSession(session)
}

export function getResourceUserSession(request: Request) {
  return resourceStorage.getSession(request.headers.get("Cookie"));
}

export async function getResourceUserToken(request: Request) {
  let session = await getResourceUserSession(request);
  let userSession = session.get("user");
  if (!userSession) return null;
  return userSession;
}

export async function requireResourceLibraryUser(
  request: Request,
  redirectTo: string
): Promise<IResourceUser> {
  let session = await getResourceUserSession(request);
  let userSession = session.get("user");

  if (!userSession) {
    throw redirect(redirectTo);
  }
  return userSession;
}

export async function logoutResourceLibrary(request: Request) {
  let session = await resourceStorage.getSession(
    request.headers.get("Cookie")
  );
  return redirect("/tuesday-makers/login", {
    headers: {
      "Set-Cookie": await resourceStorage.destroySession(session)
    }
  });
}
