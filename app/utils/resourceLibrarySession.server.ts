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

export interface IGetConvertKitUserByID{
  id: number,
  email_address: string,
  state: 'inactive' | 'active' | 'unsubscribed' | 'bounced' | 'soft-bounced' | 'pending' | 'unconfirmed' | 'deleted'
}
export async function getConvertKitUserByID(id: number): Promise<IGetConvertKitUserByID | null> {
  // Fetch Subscriber
  const url = `https://api.convertkit.com/v3/subscribers/${id}?api_secret=${process.env.CK_SECRET}`;
  const res = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  })

  const result = await res.json()
  console.log('result', result);
  
  if (result.error) {
    return null
  }
  return result.subscriber

}
interface IGetConvertKitUserByEmail {
  email: string
}
export async function getConvertKitUserIdByEmail(email: string): Promise<number | null> {
  // Fetch Subscriber
  const url = `https://api.convertkit.com/v3/subscribers?api_secret=${process.env.CK_SECRET}&email_address=${email}`;
  const res = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  })

  const result = await res.json()
  console.log('result', result);

  if (result.total_subscribers === 0 || result.subscribers[0].state !== 'active') {
    return null;
  }

  return result.subscribers[0].id

}

export async function getConvertKitUserTags(userID: number): Promise<string[]> {
  const url = `https://api.convertkit.com/v3/subscribers/${userID}/tags?api_secret=${process.env.CK_SECRET}`;
  const res = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  })

  const result = await res.json()
  console.log('tags result', result);

  if(result.error) {
    return []
  }
  
  return result.tags.map((tag: { id: string, name: string, created_at: string }) => tag.name)
}