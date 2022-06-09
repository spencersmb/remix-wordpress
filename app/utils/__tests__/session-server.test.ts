import { createUserSession, getUserSession, getUserToken, isTokenExpired, logout, refreshCurrentSession, requireAdminUserToken, setFutureDate } from "../session.server";

describe('Utils - Session.server', () => {
  const OLD_ENV = process.env;

  beforeEach(() => {
    jest.resetModules() // Most important - it clears the cache
    process.env = { 
      ...OLD_ENV,
      SESSION_SECRET: undefined
     }; // Make a copy
  });

  afterAll(() => {
    process.env = OLD_ENV; // Restore old environment
  });

  const userId = 'teelac'


  it('Should Throw if SESSION_SECRET is not set', () => {
    const token: IAuthToken = {
      cmid: '2345',
      expires: new Date().getTime() + 60,
      refresh: '2345',
      token: '2345'
    }
    try{
        const testedModule = require('../session.server').default;
        createUserSession(userId, token)
      }catch(e: any){
        expect(e.message).toBe('SESSION_SECRET must be set')
      }
  })

  it('Should create user Session', async () => {
    const token: IAuthToken = {
      cmid: '2345',
      expires: new Date().getTime() + 60,
      refresh: '2345',
      token: '2345'
    }
    try{
        const user = await createUserSession(userId, token)
        expect(user).toContain('wp_session')
        expect(user).toContain('Max-Age=604800')
        expect(user).toContain('HttpOnly;')
        expect(user).toContain('Secure;')
      }catch(e: any){
        expect(false).toBe(true)
      }
  })

  it('Should have user Session', async () => {
    const url = 'https://localhost:3000'
    const token: IAuthToken = {
      cmid: '2345',
      expires: new Date().getTime() + 60,
      refresh: '2345',
      token: '2345'
    }
    const sessionStorage = await createUserSession(userId, token)

    try{

      const request = new Request(url, {
        headers: {
          cookie:  sessionStorage
        }
      })

      const userSession = await getUserSession(request)

      expect(userSession.has('userId')).toBe(true)

      }catch(e: any){
        expect(false).toBe(true)
      }
  })

  it('Should have user token', async () => {
    const token: IAuthToken = {
      cmid: '2345',
      expires: new Date().getTime() + 60,
      refresh: '2345',
      token: '2345'
    }
    const sessionStorage = await createUserSession(userId, token)
    const url = 'https://localhost:3000'
    try{

      const request = new Request(url, {
        headers: {
          cookie:  sessionStorage
        }
      })

      const userToken = await getUserToken(request)
      
      expect(userToken).toEqual(token)

      }catch(e: any){
        expect(e.message).toBe(true)
      }
  })

  it('User token should be null', async () => {
    const url = 'https://localhost:3000'
    try{

      const request = new Request(url)

      const userToken = await getUserToken(request)
      
      expect(userToken).toBeNull()

      }catch(e: any){
        expect(e.message).toBe(true)
      }
  })

  it('Should throw redirect if no user token found', async () => {
    const url = 'https://localhost:3000'
    try{

      const request = new Request(url)

      await requireAdminUserToken(request, '/login')
      
      expect(true).toBe(false)

    }catch(e: any){
      const headers = new Headers(e.headers)
      expect(headers.get('location')).toBe('/login')
    }
  })

  it('Should not redirect if user token found', async () => {
    const token: IAuthToken = {
      cmid: '2345',
      expires: new Date().getTime() + 60,
      refresh: '2345',
      token: '2345'
    }
    const sessionStorage = await createUserSession(userId, token)
    const url = 'https://localhost:3000'
    try{

      const request = new Request(url, {
        headers: {
          cookie:  sessionStorage
        }
      })

      const user = await requireAdminUserToken(request, '/login')
      
      expect(user).toEqual(token)

    }catch(e: any){
      expect(e.message).toBe(false)
    }
  })

  it('Should return true if token is expired', async () => {
    const token: IAuthToken = {
      cmid: '2345',
      expires: new Date().getTime() - 60,
      refresh: '2345',
      token: '2345'
    }
    const isExpired = await isTokenExpired(token)
    
    expect(isExpired).toBe(true)
  })

  it('Should return true if token is expired', async () => {
    const token: IAuthToken = {
      cmid: '2345',
      expires: new Date().getTime() + 60,
      refresh: '2345',
      token: '2345'
    }
    const isExpired = await isTokenExpired(token)
    
    expect(isExpired).toBe(false)
  })

  it('Should set Future date', async () => {
    const futureDate = setFutureDate()
    const token: IAuthToken = {
      cmid: '2345',
      expires: futureDate,
      refresh: '2345',
      token: '2345'
    }
    const istokenExpired = await isTokenExpired(token)

    expect(istokenExpired).toBe(false)
  })

  it('Should refresh the current Session', async () => {
    const auth: IAuthToken = {
      cmid: '2345',
      expires: new Date().getTime() + 60,
      refresh: '2345',
      token: '2345'
    }
    const sessionStorage = createUserSession(userId, auth)

    const request = new Request('https://localhost:3000', {
      headers: {
        cookie:  await sessionStorage
      }
    })

    const session = await refreshCurrentSession(request, auth.token)
    request.headers.set('cookie', session)
    let newSession = await getUserSession(request);
    const newToken = newSession.get("token")

    expect(auth.expires).not.toBe(newToken.expires)
  })

  it('Should logout by redirecting to /login page', async () => {
    const url = 'https://localhost:3000'
    try{

      const request = new Request(url)

      const response = await logout(request)
      const headers = new Headers(response.headers)
      expect(headers.get('location')).toBe('/login')
      
    }catch(e: any){
      expect(true).toBe(false)
    }
  })

})