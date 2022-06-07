import { lfmMiniCourseCookie } from "@App/cookies.server";
import { checkForCookieLogin, findCookie, getLoginRedirectParams, getLoginRedirectUrl, getPreviewRedirectUrl, getPreviewRedirectUrlFromParams, getPreviewUrlParams, previewLoaderRouteHandler } from "../loaderHelpers";
import { createUserSession } from "../session.server";
import { refreshJWT as mockrefreshJWT, getPreviewPostPageServer as mockPageServer } from "../fetch.server";
import { mockPostDataComplete, mockPostRaw } from "@TestUtils/mock-data/posts";
import { mockFetchPromise } from "@TestUtils/renderUtils";

/**
 * @jest-environment node
 */

describe('Utils: LoaderHelpers', () => {

  it('checkForCookieLogin() have cookie and cookie data so no redirect triggered', async () => {
      const cookie = await lfmMiniCourseCookie.serialize({
        video1: true
      })
     let request = new Request('/login', {
      headers: {
        cookie
      }
    })
    try{
      const result = await checkForCookieLogin(request, lfmMiniCourseCookie, '/login')
      expect(result).toBe(true)
    }catch(e: any){
      const headers = new Headers(e.headers)
      expect(true).toBe(false)

    }
  })
  it('checkForCookieLogin() have cookie and throw redirect with redirect string', async () => {
    
    let request = new Request('/login')
    try{
      await checkForCookieLogin(request, lfmMiniCourseCookie, '/login')
      expect(true).toBe(false)
    }catch(e: any){
      const headers = new Headers(e.headers)
      expect(headers.get('location')).toBe('/login')

    }
  })
  it('checkForCookieLogin() Should not find cookie and throw redirect with redirect string', async () => {
    
    let request = new Request('/login')
    try{
      await checkForCookieLogin(request, null, '/login')
      expect(true).toBe(false)
    }catch(e: any){
      const headers = new Headers(e.headers)
      expect(headers.get('location')).toBe('/login')

    }
  })

  it('findCookie() Should find cookie and return value', async () => {
    const cookie = await lfmMiniCourseCookie.serialize({
          video1: true
        })
    let request = new Request('/login', {
      headers: {
        cookie
      }
    })
    const cookieLookUp = await findCookie(request, lfmMiniCourseCookie)
    expect(cookieLookUp).toEqual({
      data:{
        video1: true
      },
      hasCookie: true,
      expired: false
    })
  })
  it('findCookie() Should not find cookie', async () => {
    let request = new Request('/login')
    const cookieLookUp = await findCookie(request, lfmMiniCourseCookie)
    expect(cookieLookUp).toEqual({
      data:{},
      hasCookie: false,
      expired: false
    })
  })

  it('getPreviewRedirectUrl() Should return correct route from Request Object', () => {
    const request = new Request('https://every-tuesday.com/blog/preview?postType=blog');
    expect(getPreviewRedirectUrl(request)).toBe('/login');
  })
  it('getPreviewRedirectUrl() Should return correct route from Request Object', () => {
    const request = new Request('https://every-tuesday.com/blog/preview?postType=blog&postId=1');
    expect(getPreviewRedirectUrl(request)).toBe('/login?postType=noPostTypeFound');
  })
  it('getPreviewRedirectUrl() Should return correct blog preview route from Request Object', () => {
    const request = new Request('https://every-tuesday.com/login?postType=post&postId=1');
    expect(getPreviewRedirectUrl(request)).toBe('/blog/preview/1/');
  })
  it('getPreviewRedirectUrl() Should return correct page preview route from Request Object', () => {
    const request = new Request('https://every-tuesday.com/login?postType=page&postId=1');
    expect(getPreviewRedirectUrl(request)).toBe('/page/preview/1/');
  })

  it('getLoginRedirectUrl() Should return /Login route from Request Object', () => {
    const request = new Request('https://every-tuesday.com/blog/preview?postType=blog');
    expect(getLoginRedirectUrl(request)).toBe('/login');
  })
  it('getLoginRedirectUrl() Should return /Login route from Request Object', () => {
    const request = new Request('https://every-tuesday.com/blog/preview?postType=blog&postId=1');
    expect(getLoginRedirectUrl(request)).toBe('/login?postType=post&postId=1');
  })

  
  it('getPreviewRedirectUrlFromParams() Should have /login return value', () => {
    expect(getPreviewRedirectUrlFromParams(null,null)).toBe('/login');
  })
  it('getPreviewRedirectUrlFromParams() Should have /login return value', () => {
    expect(getPreviewRedirectUrlFromParams('post','2345')).toBe('/blog/preview/2345/');
  })
  it('getPreviewRedirectUrlFromParams() Should have /login return value', () => {
    expect(getPreviewRedirectUrlFromParams('page','2345')).toBe('/page/preview/2345/');
  })
  it('getPreviewRedirectUrlFromParams() Should have /login return value', () => {
    expect(getPreviewRedirectUrlFromParams('test','2345')).toBe('/');
  })

  it('getLoginRedirectParams() Should have /login return value', () => {
    const params ={
      previewType: undefined,
      id: undefined
    }
    expect(getLoginRedirectParams(params)).toBe('/login');
  })
  it('getLoginRedirectParams() Should have /login with POST param', () =>{
      const params ={
        previewType: 'blog',
        id: '2436'
      }
    expect(getLoginRedirectParams(params)).toBe('/login?postType=post&postId=2436');
  })
  it('getLoginRedirectParams() Should have /login with PAGE param', () =>{
      const params ={
        previewType: 'page',
        id: '2436'
      }
    expect(getLoginRedirectParams(params)).toBe('/login?postType=page&postId=2436');
  })

  it('getPreviewUrlParams() Should get correct ID and postType', () => {
    const url = 'https://localhost:3000/api/preview?postType=post&postId=1'
    const request = new Request(url);
    const preview = getPreviewUrlParams(request);
    expect(preview.id).toEqual("1")
    expect(preview.postType).toEqual("post")
    expect(preview.url).toBeTruthy()
  })
})

jest.mock("../fetch.server")

describe('Route Handler', () => {
  const url = 'https://localhost:3000/api/preview'
  it('should return a redirect to /login because no params in the URL', async () => {
    const request = new Request(url)
    const params = {}
    try{
      const response = await previewLoaderRouteHandler(request, params)
      expect(response.status).toBe(302)
      expect(response.headers.get('location')).toBe('/login')
    }catch(e: any){
      console.log('error', e);
    }
  })

  // Simulate a full Server Response with JWT Refresh Token
  it('Should call refresh JWT fn() and return new POST data for BLOG preview', async () => {
    const jwtResponse:IAuthRefreshResponse = {
      data: {
        refreshJwtAuthToken:{
          authToken: '0987'
        }
      }
    }
    const pageResponse = {
      data: {
        post:{
          ...mockPostRaw
        }
      }
    }

    // Create FAKE REQUESTS
    const reqPromise = mockFetchPromise(jwtResponse)
    const pagePromise = mockFetchPromise(pageResponse)

    // JEST MOCK FETCH CALL
    // @ts-ignore
    mockrefreshJWT.mockResolvedValueOnce(reqPromise)
    // @ts-ignore
    mockPageServer.mockResolvedValueOnce(pagePromise)

    const url = 'https://localhost:3000/blog?postType=post&postId=1'
    const userId = '1234'
    const paramId = '1'
    const token: IAuthToken = {
      cmid: 'cmid1234',
      expires: new Date(Date.now() - 600).getTime(),
      refresh: '1234',
      token: '1234'
    }

    const sessionStorage = createUserSession(userId, token)
    const request = new Request(url, {
      headers: {
        cookie:  await sessionStorage
      }
    })
    const params = {
      id: paramId
    }

    try{
      const response = await previewLoaderRouteHandler(request, params)
      expect(mockrefreshJWT).toHaveBeenCalledTimes(1)
      expect(mockrefreshJWT).toHaveBeenCalledWith({
        ...token,
        token: jwtResponse.data.refreshJwtAuthToken.authToken // fake new token added from server
      })

      expect(mockPageServer).toHaveBeenCalledTimes(1)
      expect(mockPageServer).toHaveBeenCalledWith({
        previewType: 'blog',
        id: paramId,
        userToken: {
          ...token,
          token: jwtResponse.data.refreshJwtAuthToken.authToken // fake new token added from server
        }
      })
      expect(response.status).toBe(200)

    }catch(e: any){
      console.log('e', e);
      expect(true).toBe(false)
    }
  })

})